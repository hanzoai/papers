# Setting Up GitHub Repository

## Create Repository

### Option 1: GitHub Web Interface

1. Go to https://github.com/hanzoai
2. Click "New repository"
3. Repository name: `papers`
4. Description: "Academic and technical papers for Hanzo AI infrastructure and protocols"
5. Public repository
6. **DO NOT** initialize with README (we have one)
7. **DO NOT** add .gitignore (we have one)
8. **DO NOT** choose a license (papers use CC BY 4.0)
9. Click "Create repository"

### Option 2: GitHub CLI

```bash
# From /Users/z/work/hanzo/papers
gh repo create hanzoai/papers --public --description "Academic and technical papers for Hanzo AI infrastructure" --source=. --remote=origin --push
```

## Initialize and Push

If you created via web interface:

```bash
cd /Users/z/work/hanzo/papers

# Initialize git (if not already initialized)
git init

# Add files
git add .
git commit -m "Initial commit: Hanzo Network whitepaper"

# Add remote
git remote add origin git@github.com:hanzoai/papers.git

# Push
git branch -M main
git push -u origin main
```

## Repository Settings

### Topics (GitHub Tags)

Add these topics to help discoverability:
- `blockchain`
- `ai`
- `machine-learning`
- `whitepaper`
- `research`
- `decentralized`
- `compute-marketplace`
- `amm`
- `latex`
- `academic-paper`

### About

**Description**: Academic and technical papers for Hanzo AI infrastructure and protocols

**Website**: https://hanzo.ai

### License

Add `LICENSE` file with CC BY 4.0:

```markdown
# Creative Commons Attribution 4.0 International

Copyright (c) 2025 Hanzo Industries Inc.

This work is licensed under a Creative Commons Attribution 4.0 International License.

You are free to:
- Share — copy and redistribute the material in any medium or format
- Adapt — remix, transform, and build upon the material for any purpose, even commercially

Under the following terms:
- Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made.

Full license: https://creativecommons.org/licenses/by/4.0/
```

### GitHub Pages (Optional)

To host PDFs directly:

1. Go to Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main`, folder: `/` (root)
4. Save

PDFs will be accessible at:
- https://hanzoai.github.io/papers/hanzo-network-whitepaper.pdf

### Branch Protection

For main branch:
1. Settings → Branches → Add rule
2. Branch name pattern: `main`
3. Enable:
   - Require pull request reviews before merging
   - Require status checks to pass before merging
   - Include administrators

### CI/CD (Optional)

Add `.github/workflows/build.yml` to auto-build PDFs:

```yaml
name: Build Papers

on:
  push:
    branches: [ main ]
    paths:
      - '**.tex'
  pull_request:
    branches: [ main ]
    paths:
      - '**.tex'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build PDFs
        uses: xu-cheng/latex-action@v2
        with:
          root_file: "*.tex"
          glob_root_file: true
      
      - name: Upload PDFs
        uses: actions/upload-artifact@v3
        with:
          name: papers
          path: "*.pdf"
```

## Linking from Main Hanzo Repo

### As Git Submodule (Recommended)

```bash
cd /Users/z/work/hanzo
git submodule add git@github.com:hanzoai/papers.git papers
git commit -m "Add papers as submodule"
git push
```

### Update LLM.md Reference

Already done! The papers directory is documented in `/Users/z/work/hanzo/LLM.md`.

## Promoting the Repository

### README Badges

Add to top of README.md:

```markdown
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![GitHub stars](https://img.shields.io/github/stars/hanzoai/papers?style=social)](https://github.com/hanzoai/papers)
[![Twitter Follow](https://img.shields.io/twitter/follow/hanzoai?style=social)](https://twitter.com/hanzoai)
```

### Share

- Tweet from @hanzoai account
- Post on Hanzo blog
- Submit to arXiv (if appropriate)
- Share on relevant subreddits (r/blockchain, r/MachineLearning)
- Post on LinkedIn
- Share in relevant Discord/Telegram communities

## Maintenance

### Regular Updates

When adding new papers:
1. Create LaTeX source
2. Build PDF locally
3. Update README.md
4. Commit both .tex and .pdf
5. Push to GitHub

### Versioning

Consider tagging releases for major paper updates:

```bash
git tag -a v1.0.0 -m "Hanzo Network Whitepaper v1.0"
git push origin v1.0.0
```

## Questions?

Contact: contact@hanzo.ai
