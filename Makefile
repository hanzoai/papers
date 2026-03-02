# Makefile for Hanzo Papers
# Compiles all standalone .tex papers (with \documentclass) to PDF.
# Excludes sections/*.tex (included fragments, no \documentclass).
#
# Usage:
#   make all                            # Build all 42 papers
#   make pdfs/hanzo-aso.pdf             # Build one root paper
#   make pdfs/zen/zen-coder_whitepaper.pdf  # Build one zen paper
#   make clean                          # Remove aux files
#   make clean-all                      # Remove aux + PDFs
#
# Docker (no local TeX install needed):
#   docker run --rm -v "$$PWD:/workdir" -w /workdir texlive/texlive:latest make all

# Discover standalone .tex files (root + zen/, exclude sections/)
ROOT_TEX := $(wildcard *.tex)
ZEN_TEX  := $(wildcard zen/*.tex)
ALL_TEX  := $(ROOT_TEX) $(ZEN_TEX)

# Map to output PDFs under pdfs/
ALL_PDFS := $(patsubst %.tex,pdfs/%.pdf,$(ALL_TEX))

# Default: build everything
.PHONY: all
all: $(ALL_PDFS)
	@echo ""
	@echo "=== Build complete ==="
	@echo "Papers compiled: $(words $(ALL_PDFS))"
	@echo ""
	@find pdfs -name '*.pdf' | sort

# Rule for root-level papers: pdfs/foo.pdf from foo.tex
pdfs/%.pdf: %.tex
	@mkdir -p $(dir $@)
	@echo "Compiling $< ..."
	@pdflatex -interaction=nonstopmode -output-directory=$(dir $@) $< > /dev/null 2>&1 || true
	@cd $(dir $@) && bibtex $(basename $(notdir $@)) > /dev/null 2>&1 || true
	@pdflatex -interaction=nonstopmode -output-directory=$(dir $@) $< > /dev/null 2>&1 || true
	@if [ -f "$@" ]; then \
		echo "  OK  $@"; \
	else \
		echo "  FAIL $@"; \
	fi

# Clean auxiliary files (keep PDFs)
.PHONY: clean
clean:
	@echo "Cleaning auxiliary files..."
	@find pdfs -type f ! -name '*.pdf' -delete 2>/dev/null || true
	@find . -maxdepth 1 -name '*.aux' -o -name '*.log' -o -name '*.out' \
		-o -name '*.toc' -o -name '*.bbl' -o -name '*.blg' \
		-o -name '*.lof' -o -name '*.lot' | xargs rm -f 2>/dev/null || true
	@echo "Done"

# Clean everything
.PHONY: clean-all
clean-all:
	@echo "Removing all generated files..."
	@rm -rf pdfs
	@echo "Done"

# List papers
.PHONY: list
list:
	@echo "Root papers ($(words $(ROOT_TEX))):"
	@for f in $(ROOT_TEX); do echo "  $$f"; done
	@echo ""
	@echo "Zen papers ($(words $(ZEN_TEX))):"
	@for f in $(ZEN_TEX); do echo "  $$f"; done
	@echo ""
	@echo "Total: $(words $(ALL_TEX)) papers"

.PHONY: help
help:
	@echo "Hanzo Papers Makefile"
	@echo ""
	@echo "Targets:"
	@echo "  make all                  - Compile all $(words $(ALL_TEX)) papers"
	@echo "  make pdfs/<name>.pdf      - Compile a specific paper"
	@echo "  make list                 - List all discovered papers"
	@echo "  make clean                - Remove auxiliary files"
	@echo "  make clean-all            - Remove all generated files"
	@echo ""
	@echo "Docker:"
	@echo "  docker run --rm -v \"\$$PWD:/workdir\" -w /workdir texlive/texlive:latest make all"
