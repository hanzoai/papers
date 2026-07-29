#!/bin/sh
# Regenerate INDEX.md — the catalogue of every standalone paper.
#
# The paper set is the Makefile's ALL_TEX, read from `make list`. This script
# used to re-derive it with its own grep, so the index and the build could
# disagree about what a paper is; they cannot now.
#
# There is no "has a PDF" column any more. Every paper here is built by CI, so
# the answer is always yes for a run that passed, and the column only ever
# reported whether a stale artifact happened to be lying in the working tree.
set -eu
cd "$(dirname "$0")/.."

tmp=$(mktemp)
make --no-print-directory list > "$tmp"

papers=0
{
  echo '# Hanzo Papers Index'
  echo
  echo 'Auto-generated catalogue of research papers. Regenerate: `scripts/gen-index.sh` (or `make index`).'
  echo
  echo '| Paper | Path |'
  echo '|-------|------|'
  while IFS= read -r tex; do
    slug=$(basename "$tex" .tex)
    [ "$slug" = main ] && slug=$(basename "$(dirname "$tex")")
    papers=$((papers+1))
    printf '| `%s` | `%s` |\n' "$slug" "$tex"
  done < "$tmp"
  echo
  printf '**Total**: %s papers\n' "$papers"
} > INDEX.md
rm -f "$tmp"
echo "INDEX.md: $papers papers"
