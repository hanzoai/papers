# Makefile for Hanzo Papers
# Automatically compiles all LaTeX papers to PDF

# Find all .tex files in current directory (excludes sections/, zen/ subdirs)
TEX_FILES := $(wildcard *.tex)
PDF_FILES := $(patsubst %.tex,pdfs/%.pdf,$(TEX_FILES))

# Default target: compile all papers
.PHONY: all
all: $(PDF_FILES)
	@echo "All papers compiled successfully"
	@echo ""
	@echo "Generated PDFs:"
	@ls -lh pdfs/

# Create pdfs directory
pdfs:
	@mkdir -p pdfs

# Compile a single .tex file to PDF
pdfs/%.pdf: %.tex | pdfs
	@echo "Compiling $<..."
	@pdflatex -interaction=nonstopmode -output-directory=pdfs $< > /dev/null || true
	@cd pdfs && bibtex $(*F) 2>/dev/null || true
	@pdflatex -interaction=nonstopmode -output-directory=pdfs $< > /dev/null || true
	@pdflatex -interaction=nonstopmode -output-directory=pdfs $< > /dev/null || true
	@if [ -f pdfs/$(*F).pdf ]; then \
		echo "  Successfully compiled $(*F).pdf"; \
	else \
		echo "  Failed to compile $(*F).pdf"; \
	fi

# Clean auxiliary files
.PHONY: clean
clean:
	@echo "Cleaning auxiliary files..."
	@rm -f pdfs/*.aux pdfs/*.log pdfs/*.bbl pdfs/*.blg pdfs/*.out pdfs/*.toc pdfs/*.lof pdfs/*.lot
	@rm -f *.aux *.log *.bbl *.blg *.out *.toc *.lof *.lot
	@echo "Cleaned"

# Clean everything including PDFs
.PHONY: clean-all
clean-all: clean
	@echo "Removing all PDFs..."
	@rm -f pdfs/*.pdf
	@echo "All files cleaned"

# Help target
.PHONY: help
help:
	@echo "Hanzo Papers Makefile"
	@echo ""
	@echo "Targets:"
	@echo "  make all              - Compile all papers (default)"
	@echo "  make clean            - Remove auxiliary files"
	@echo "  make clean-all        - Remove all files including PDFs"
	@echo "  make pdfs/<name>.pdf  - Compile a specific paper"
	@echo ""
	@echo "Papers found: $(words $(TEX_FILES))"
	@echo ""
	@echo "Docker usage:"
	@echo "  docker run --rm -v \"\$$PWD:/workdir\" -w /workdir texlive/texlive:latest make all"
