#!/bin/sh
# Regenerate INDEX.md — the catalogue of every standalone paper.
# A paper is any .tex containing \documentclass; sections/ fragments excluded.
set -eu
cd "$(dirname "$0")/.."

tmp=$(mktemp)
grep -rl '^\\documentclass' --include='*.tex' . \
  | sed 's|^\./||' \
  | grep -v -e '/sections/' -e '^sections/' -e '^pdfs/' -e 'node_modules/' -e '^site/' -e '^shared/' \
  | sort > "$tmp"

papers=0
compiled=0
{
  echo '# Hanzo Papers Index'
  echo
  echo 'Auto-generated catalogue of research papers. Regenerate: `scripts/gen-index.sh` (or `make index`).'
  echo
  echo '| Paper | PDF | Path |'
  echo '|-------|-----|------|'
  while IFS= read -r tex; do
    slug=$(basename "$tex" .tex)
    [ "$slug" = main ] && slug=$(basename "$(dirname "$tex")")
    mark='—'
    if [ -f "pdfs/${tex%.tex}.pdf" ] || [ -f "${tex%.tex}.pdf" ] || [ -f "pdfs/$slug.pdf" ]; then
      mark='✓'
      compiled=$((compiled+1))
    fi
    papers=$((papers+1))
    printf '| `%s` | %s | `%s` |\n' "$slug" "$mark" "$tex"
  done < "$tmp"
  echo
  printf '**Total**: %s papers, %s with compiled PDFs\n' "$papers" "$compiled"
} > INDEX.md
rm -f "$tmp"
echo "INDEX.md: $papers papers, $compiled compiled"
