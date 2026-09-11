# Papers

Hanzo's research papers: LaTeX sources at the repo root and in `zen/` and
`defense/`, built to `pdfs/` by `make -k all`, indexed by `INDEX.md`, and the
site at https://papers.hanzo.ai built from `site/`.

## How this ships

One way, and it runs on our own stack:

    push  ->  git.hanzo.ai/hanzoai/papers    CANONICAL — push here
              .hanzo/workflows/ci.yml         compiles every paper
              .hanzo/workflows/deploy.yml     builds ghcr.io/hanzoai/papers
      ->  github.com/hanzoai/papers           a mirror, fed by the forge
      ->  hanzoai/universe charts/app/values/hanzo/papers.yaml
                                                pins the live tag + digest
      ->  fleet CD / hanzoai/operator          reconciles the App
      ->  hanzoai/static behind hanzoai/ingress serves papers.hanzo.ai

**git.hanzo.ai is canonical; GitHub is a mirror, and refs travel forge to
GitHub, not the other way.** The forge holds a push mirror on this repo that
sends `main` to github.com on commit. There is no path back: `.github/workflows/`
holds no workflow at all — `bb8ad96` ("ci: drop the Gitea mirror-sync nudge")
removed the `sync.yml` that used to nudge the forge to pull.

**So a commit pushed to GitHub reaches no CI.** It is not built, and the forge
never learns of it. As of this commit the forge is at `fec5ac6` while GitHub
`main` is two commits ahead, which is what pushing to the mirror buys. Push to
git.hanzo.ai.

Every build, check and deploy is a workflow under `.hanzo/workflows/`, which the
forge reads. `.hanzo/workflows` uses GitHub Actions syntax, so a workflow moves
between the two by changing directory and nothing else.

No GitHub Pages and no Cloudflare Pages. The site is an image the operator runs,
like every other Hanzo surface.

## Why both workflows had to be restored

Neither existed. Two commits both titled *"ci: remove GitHub CI — native
git.hanzo.ai + cd.hanzo.ai only"* deleted them without writing the native
replacement they named:

- `65f58e9` removed `build-papers.yml`, the only thing that compiled the papers.
- `9b417a3` removed `deploy-site.yml`, the only producer of
  `ghcr.io/hanzoai/papers`. Its last successful build was 2026-07-19.

So `papers.hanzo.ai` served a frozen Cloudflare Pages build and nothing in the
repo could update it — and because the workflows were gone rather than broken,
there was no failing run anywhere to say so. Deleting a workflow before its
replacement exists buys silent staleness; moving one costs nothing. Both files
here are those two, restored from `9b417a3^` and `65f58e9^` into the native
directory.

## What ci.yml checks

`make -k all` compiles all 219 papers in the repo and that is the entire gate.
`-k` so one broken paper does not hide the rest; a nonzero status if any of them
did not come out. A paper is any `.tex` with a `\documentclass`, wherever it
lives — one definition, in the `Makefile`, which `scripts/gen-index.sh` reads
rather than restates.

A paper compiles when `latexmk` says so. The rule runs it once per paper with
`-halt-on-error` (stop at the first error rather than nonstopmode's "carry on and
emit a PDF anyway"), `-bibtex` (a declared bibliography must resolve, rather than
being silently skipped when the `.bib` is absent), `-Werror` (an undefined
citation or cross-reference is a defect in a paper, not a note in a log nobody
reads) and `-cd` (each paper compiles from its own directory, so its relative
paths mean to make what they mean to a human reading the file).

**The gate this replaced could not fail, at four depths.** Every rule in the
`Makefile` ended in `|| true` and printed `FAIL` instead of exiting, so
`make all` returned 0 over any number of broken papers. The `defense/` papers
were compiled by a second copy of the same swallowing loop, written inline in
`ci.yml`. The step that checked the PDFs existed was satisfied by the 100 stale
PDFs that used to be committed under `pdfs/` — the checkout handed the gate its
answer before anything was compiled. And discovery was three wildcards over the
root, `zen/` and `defense/`, so 69 of the 219 papers were compiled by nothing at
all. Run against the tree it was guarding, the honest gate fails 24 papers.

`pdfs/` is therefore a build output and is no longer tracked.

Adding a paper requires it to compile: drop a `.tex` with a `\documentclass`
anywhere but `sections/`, `shared/`, `site/` or `pdfs/`, and its PDF is expected
from then on.

`ci.yml` does not write to the repo. The predecessor pushed a `v<run_number>`
GitHub Release and committed the PDFs back to `main`; both wrote to what is now a
mirror. The PDFs are the run's artifact, and the site image bakes its own.

## Deploying the site

A build never deploys itself. `deploy.yml` publishes
`ghcr.io/hanzoai/papers:<short-sha>` from `site/Dockerfile`. Promotion is declarative:
set both `image.tag` and `image.digest` in
`hanzoai/universe/charts/app/values/hanzo/papers.yaml`, push universe `main`, and let
fleet CD reconcile the release. The older operator-CR path is historical and is not the
deployment source of truth.

The website is a curated, externally checkable catalog rather than an automatic dump of
every TeX file. Publishing a new paper therefore requires both its card in
`site/src/config/papers.ts` and its compiled artifact in `site/public/pdfs/`. The root
`pdfs/` directory remains CI output and is ignored.

## The 86d8915 batch

Ninety-six papers landed in one commit — fifteen product papers, plus a sync of
fifty-eight from `zenlm/papers`. Two of the fifteen (`hanzo-base`,
`hanzo-operate-computer`) were replaced in `dbf6fc9` by rewritten papers under
`hanzo-base-runtime/` and `hanzo-operative/`. The other ninety-four were audited
for numbers presented as measurements: every quantitative performance claim was
put in one of four places — traceable to a run, a harness or a commit; someone
else's published number, attributed; a target or a model, labelled as one in the
text; or presented as a result with nothing behind it.

**353 claims are in the last place, and none is in the first.** No paper in the
batch names an evaluation harness, a run identifier, a checkpoint, a seed or a
date. None cites `bench/brain` (hanzoai/cloud) or `bench/locomo`
(hanzoai/semantic), the two harnesses in the estate that declare their splits and
publish bootstrap intervals, nor `hanzoai/benchmarks`, which backs
`hanzo-cloud-network-bench.tex`. That paper is what the house standard looks
like: two machines named, the tuning published as one idempotent script, raw
numbers in a public repo. The batch does not follow it.

**The thirteen product papers at the repository root are corrected.** Each
carried a production-operations figure in its abstract — 48 GPUs and 99.9%
availability, 2M authentications daily across 1,200 tenants, \$240M processed at
99.97%, 15TB across 400 tenants, three years of ledger operation without a
discrepancy — for services whose repositories hold no benchmark, whose
deployments record no such volume, and several of which were first committed
years after the paper's own date. Those claims cannot be relabelled as targets,
because a target is a statement about the future and these were statements about
a past that did not happen, so they are removed and each paper now carries a
short section saying what was removed and why. Two are different: `pubsub` and
`ledger` ship harnesses that measure exactly the quantities their tables report,
so those tables stay with their provenance stated. The gap there is a run, not a
mechanism.

**The eighty-one `zen/` papers are not corrected and need a decision.** They hold
321 of the 353 defects, in three recurring shapes: training and inference
attributed to H100 and A100 fleets of 8 to 16,384 GPUs; efficiency, energy and
carbon figures with no baseline named; and abstracts whose headline number
contradicts the paper's own table. Some are checkable without any estate fact —
decode throughput above the memory-bandwidth ceiling of the part it names, FP8 on
Ampere, AIME scores that are not multiples of 1/30 on a 30-problem exam, INT4
requiring more memory than FP16.

They are left alone deliberately. `zenlm/papers` already had a sweeping
withdrawal pass, `5deeeaa`, which the owner reverted in `f34f609`: *"That commit
asserted it; nothing verified it... a paper that disclaims its own results is
worse than one that under-cites them. Where these papers are thin it is in
provenance — the runs need citing, not retracting."* The subject models are
mostly real; 78 are published under the `zenlm` org. What is needed is a decision
about a family of papers — several of which are template-generated, with the same
pretraining sentence and the same energy table filled in for different models —
and that is not an edit to make one paper at a time. Two of the eighty-one show
what the rest could be: `zen-mixture-of-experts.tex` states plainly that it
publishes no number it has not measured and names its harness, and
`zen-coder_whitepaper.tex` reports no scores and labels its costs as estimates.

Note also that 69 of the 86 `zen/*.tex` here have diverged from their
counterparts in `zenlm/papers`, so the two sites publish different text under the
same titles. A fix applied in one place does not reach the other.
