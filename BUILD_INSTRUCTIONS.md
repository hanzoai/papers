# Building the Hanzo Network Whitepaper

## Quick Start Options

### Option 1: Use Docker (Recommended)

If Docker/Colima is installed but not running:

```bash
# Start Colima (if using Colima)
colima start

# Build the PDF
make

# View the result
make view
```

### Option 2: Install Native LaTeX (Best Performance)

#### macOS (using Homebrew)

```bash
# Install BasicTeX (smaller, ~100MB)
make install-latex

# Or install full MacTeX (larger, ~4GB)
brew install --cask mactex

# Add to PATH
echo 'export PATH="/Library/TeX/texbin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Install additional packages
sudo tlmgr update --self
sudo tlmgr install collection-latexextra

# Build the PDF
make
```

#### Linux (Ubuntu/Debian)

```bash
# Install TeX Live
sudo apt-get update
sudo apt-get install texlive-latex-extra texlive-science

# Build the PDF
make
```

### Option 3: Use Overleaf (No Installation)

1. Go to [Overleaf](https://www.overleaf.com)
2. Create a new project
3. Upload `hanzo-network-whitepaper.tex`
4. Click "Recompile"
5. Download the PDF

### Option 4: Manual Docker Command

If you want to build without the Makefile:

```bash
docker run --rm -v "$(pwd):/workdir" -w /workdir texlive/texlive:latest \
  sh -c "pdflatex -interaction=nonstopmode hanzo-network-whitepaper.tex && \
         pdflatex -interaction=nonstopmode hanzo-network-whitepaper.tex"
```

## Current System Status

Based on your environment:

- ✅ Docker is installed at `/usr/local/bin/docker`
- ❌ Docker daemon (Colima) is not running
- ❌ Native LaTeX (pdflatex) is not installed

### Recommended Action

**For quick one-time build:**
```bash
colima start
make
make view
```

**For regular use:**
```bash
# Install native LaTeX for faster builds
make install-latex
```

## Troubleshooting

### "colima is not running"

```bash
colima start
```

### "pdflatex: command not found"

Install LaTeX using one of the methods above, or use Docker.

### "Cannot connect to Docker daemon"

```bash
# Check if Docker Desktop or Colima is running
docker ps

# If not, start Colima
colima start

# Or start Docker Desktop from Applications
```

### Docker image download takes long

The `texlive/texlive:latest` image is ~3GB on first download. Subsequent builds are fast.

Alternative smaller image (~400MB):

```bash
# Edit Makefile and change DOCKER_IMAGE to:
DOCKER_IMAGE = aergus/latex
```

### Permission errors with Docker

```bash
# Run Docker command with proper permissions
docker run --rm -v "$(pwd):/workdir" -w /workdir --user $(id -u):$(id -g) \
  texlive/texlive:latest pdflatex hanzo-network-whitepaper.tex
```

## Makefile Targets

```bash
make              # Build PDF (auto-detects native/Docker)
make full         # Build with bibliography
make clean        # Remove intermediate files
make distclean    # Remove all generated files
make rebuild      # Clean and rebuild
make view         # Open PDF (macOS)
make help         # Show all targets
```

## Manual Compilation

If you prefer not to use the Makefile:

```bash
# Native LaTeX
pdflatex -interaction=nonstopmode hanzo-network-whitepaper.tex
pdflatex -interaction=nonstopmode hanzo-network-whitepaper.tex

# View
open hanzo-network-whitepaper.pdf  # macOS
xdg-open hanzo-network-whitepaper.pdf  # Linux
```

## Package Requirements

The whitepaper uses these LaTeX packages:

- **Core**: article, geometry, hyperref
- **Math**: amsmath, amssymb, amsthm, mathtools, bm
- **Tables**: booktabs, multirow
- **Graphics**: graphicx, xcolor
- **Algorithms**: algorithm, algpseudocode
- **Lists**: enumitem

All are included in standard TeX Live distributions.

## CI/CD Integration

For automated builds in GitHub Actions:

```yaml
- name: Build PDF
  uses: xu-cheng/latex-action@v2
  with:
    root_file: hanzo-network-whitepaper.tex
    working_directory: papers/
```

## File Size

- Source `.tex`: ~15KB
- Generated PDF: ~200-300KB
- Docker image: ~3GB (one-time download)
- Native LaTeX: ~100MB (BasicTeX) or ~4GB (full MacTeX)
