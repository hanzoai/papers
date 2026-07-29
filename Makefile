# Makefile for Hanzo Papers
# Compiles every standalone .tex paper in the repo to a PDF under pdfs/.
#
# Usage:
#   make -k all                         # Build every paper, report all failures
#   make pdfs/hanzo-aso.pdf             # Build one paper
#   make list                           # Every paper, one path per line
#   make clean                          # Remove aux files
#   make clean-all                      # Remove aux + PDFs
#
# A paper that does not compile fails. Every recipe line here used to end in
# `|| true` and the rule printed "FAIL" instead of exiting, so `make all`
# returned 0 over any number of broken papers — the gate in
# .hanzo/workflows/ci.yml was green for as long as it existed. Use -k to build
# the rest after one breaks; that is what -k is for, and it is the only reason
# the old rule had to swallow the status.
#
# Docker (no local TeX install needed):
#   docker run --rm -v "$$PWD:/workdir" -w /workdir texlive/texlive:latest make -k all

# A paper is any .tex with a \documentclass, wherever it lives. This is the one
# definition of the paper set; scripts/gen-index.sh reads it from here rather
# than restating it. Excluded: sections/ and shared/ hold fragments with no
# \documentclass of their own, site/ is the website, pdfs/ is output, and
# defense/logo-convert.tex is a helper that rasterises the logo through inkscape.
#
# The previous discovery was three wildcards over the root, zen/ and defense/,
# which is 150 of the 219 papers in the repo. The other 69 live in per-paper
# directories and were compiled by nothing.
ALL_TEX := $(shell grep -rl '^\\documentclass' --include='*.tex' . \
             | sed 's|^\./||' \
             | grep -v -e '^sections/' -e '/sections/' -e '^shared/' -e '^site/' \
                       -e '^pdfs/' -e 'node_modules/' -e '^defense/logo-convert\.tex$$' \
             | sort)

# Map to output PDFs under pdfs/
ALL_PDFS := $(patsubst %.tex,pdfs/%.pdf,$(ALL_TEX))

# A recipe that exits nonzero leaves no PDF behind, so a stale artifact can
# never stand in for a build that did not happen.
.DELETE_ON_ERROR:

# Default: build everything
.PHONY: all
all: $(ALL_PDFS)
	@echo ""
	@echo "=== Build complete ==="
	@echo "Papers compiled: $(words $(ALL_PDFS))"

# One paper, one rule, wherever it lives. latexmk decides how many passes are
# needed and runs bibtex; its exit status is the answer to "did this paper
# compile?", which is the whole gate.
#
#   -halt-on-error  stop at the first error rather than nonstopmode's "carry on
#                   and emit a PDF anyway" — a broken paper leaves no PDF
#   -bibtex         run bibtex whenever a paper declares a bibliography, so
#                   naming a .bib that does not exist fails instead of being
#                   quietly skipped (latexmk's default)
#   -Werror         an undefined citation or cross-reference is a defect in a
#                   paper, not a note in a log nobody reads
#   -cd             compile each paper from its own directory, so a paper's
#                   relative paths mean the same thing to make as they do to a
#                   human opening the file: zen/ finds references.bib, defense/
#                   finds hanzo-defense.sty, the root finds shared/
#   -outdir         absolute, because -cd moved us: PDF and aux land together
#                   under pdfs/, never at the repo root
pdfs/%.pdf: %.tex
	@mkdir -p $(dir $@)
	@echo "Compiling $< ..."
	@latexmk -pdf -halt-on-error -bibtex -Werror -interaction=nonstopmode -quiet \
		-cd -outdir=$(CURDIR)/$(dir $@) $< > $(dir $@)$(*F).latexmk 2>&1 \
		|| { echo "  FAIL $<"; \
		     grep -A5 '^!' $(dir $@)$(*F).log; \
		     sed -n '/^Latexmk: Summary/,/^----/p' $(dir $@)$(*F).latexmk; \
		     false; }
	@echo "  OK   $@"

# Clean auxiliary files (keep PDFs). The second sweep clears what the previous
# rule left at the repo root; latexmk writes beside the PDF and never there.
.PHONY: clean
clean:
	@mkdir -p pdfs
	@find pdfs -type f ! -name '*.pdf' -delete
	@find . -maxdepth 1 \( -name '*.aux' -o -name '*.log' -o -name '*.out' \
		-o -name '*.toc' -o -name '*.bbl' -o -name '*.blg' \
		-o -name '*.fls' -o -name '*.fdb_latexmk' \) -delete
	@echo "Cleaned."

# Clean everything
.PHONY: clean-all
clean-all:
	@echo "Removing all generated files..."
	@rm -rf pdfs
	@echo "Done"

# Every paper, one per line. scripts/gen-index.sh reads this.
.PHONY: list
list:
	@printf '%s\n' $(ALL_TEX)

.PHONY: help
help:
	@echo "Hanzo Papers Makefile"
	@echo ""
	@echo "Targets:"
	@echo "  make -k all               - Compile all $(words $(ALL_TEX)) papers, report every failure"
	@echo "  make pdfs/<name>.pdf      - Compile a specific paper"
	@echo "  make list                 - List all discovered papers"
	@echo "  make clean                - Remove auxiliary files"
	@echo "  make clean-all            - Remove all generated files"
	@echo ""
	@echo "Docker:"
	@echo "  docker run --rm -v \"\$$PWD:/workdir\" -w /workdir texlive/texlive:latest make -k all"

.PHONY: index
index:
	@scripts/gen-index.sh
