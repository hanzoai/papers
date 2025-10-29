# Makefile for building Hanzo Network whitepaper PDF

# Variables
LATEX = pdflatex
BIBTEX = bibtex
MAIN = hanzo-network-whitepaper
TEX_FILES = $(wildcard *.tex)
PDF = $(MAIN).pdf

# LaTeX build flags
LATEX_FLAGS = -interaction=nonstopmode -halt-on-error

# Docker image for LaTeX compilation (if native tools not available)
DOCKER_IMAGE = texlive/texlive:latest
DOCKER_RUN = docker run --rm -v "$(PWD):/workdir" -w /workdir $(DOCKER_IMAGE)

# Check if pdflatex is available
LATEX_AVAILABLE := $(shell command -v pdflatex 2> /dev/null)

# Default target
.PHONY: all
all: $(PDF)

# Build PDF (requires 2-3 passes for references)
$(PDF): $(TEX_FILES)
ifdef LATEX_AVAILABLE
	@echo "Building $(MAIN).pdf using native LaTeX..."
	$(LATEX) $(LATEX_FLAGS) $(MAIN).tex
	$(LATEX) $(LATEX_FLAGS) $(MAIN).tex
else
	@echo "Building $(MAIN).pdf using Docker (native LaTeX not found)..."
	$(DOCKER_RUN) pdflatex $(LATEX_FLAGS) $(MAIN).tex
	$(DOCKER_RUN) pdflatex $(LATEX_FLAGS) $(MAIN).tex
endif
	@echo "PDF built successfully: $(PDF)"

# Build with bibliography (if we add references later)
.PHONY: full
full: $(TEX_FILES)
ifdef LATEX_AVAILABLE
	@echo "Building $(MAIN).pdf with bibliography using native LaTeX..."
	$(LATEX) $(LATEX_FLAGS) $(MAIN).tex
	$(BIBTEX) $(MAIN)
	$(LATEX) $(LATEX_FLAGS) $(MAIN).tex
	$(LATEX) $(LATEX_FLAGS) $(MAIN).tex
else
	@echo "Building $(MAIN).pdf with bibliography using Docker..."
	$(DOCKER_RUN) pdflatex $(LATEX_FLAGS) $(MAIN).tex
	$(DOCKER_RUN) bibtex $(MAIN)
	$(DOCKER_RUN) pdflatex $(LATEX_FLAGS) $(MAIN).tex
	$(DOCKER_RUN) pdflatex $(LATEX_FLAGS) $(MAIN).tex
endif
	@echo "PDF built successfully: $(PDF)"

# Clean intermediate files
.PHONY: clean
clean:
	@echo "Cleaning intermediate files..."
	rm -f *.aux *.log *.out *.toc *.bbl *.blg *.synctex.gz *.fls *.fdb_latexmk
	@echo "Clean complete."

# Clean everything including PDF
.PHONY: distclean
distclean: clean
	@echo "Removing PDF..."
	rm -f $(PDF)
	@echo "Distclean complete."

# Quick rebuild
.PHONY: rebuild
rebuild: clean all

# View PDF (macOS)
.PHONY: view
view: $(PDF)
	@echo "Opening $(PDF)..."
	open $(PDF)

# Install LaTeX via Homebrew (macOS)
.PHONY: install-latex
install-latex:
	@echo "Installing BasicTeX via Homebrew..."
	@echo "This requires Homebrew and may take several minutes."
	brew install --cask basictex
	@echo "Updating PATH for current session..."
	@echo "Add /Library/TeX/texbin to your PATH in ~/.zshrc or ~/.bashrc"
	@echo "Then run: tlmgr update --self && tlmgr install collection-latexextra"

# Help
.PHONY: help
help:
	@echo "Hanzo Network Whitepaper Build System"
	@echo ""
	@echo "Targets:"
	@echo "  all (default)  - Build PDF with 2 LaTeX passes (auto-detects native/Docker)"
	@echo "  full           - Build PDF with bibliography (3 passes + bibtex)"
	@echo "  clean          - Remove intermediate files (.aux, .log, etc.)"
	@echo "  distclean      - Remove all generated files including PDF"
	@echo "  rebuild        - Clean and rebuild"
	@echo "  view           - Open PDF in default viewer (macOS)"
	@echo "  install-latex  - Install BasicTeX via Homebrew (macOS only)"
	@echo "  help           - Show this help message"
	@echo ""
	@echo "Note: If pdflatex is not found, Docker will be used automatically."
