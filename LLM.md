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

**The eighty-one `zen/` papers hold the other 321,** in three recurring shapes:
training and inference attributed to H100 and A100 fleets of 8 to 16,384 GPUs;
efficiency, energy and carbon figures with no baseline named; and abstracts whose
headline number contradicts the paper's own table. Some are checkable without any
estate fact — decode throughput above the memory-bandwidth ceiling of the part it
names, FP8 on Ampere, AIME scores that are not multiples of 1/30 on a 30-problem
exam, INT4 requiring more memory than FP16. That checkable subset is now corrected;
see below.

The rest are left alone deliberately. `zenlm/papers` already had a sweeping
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

## The provable subset of the zen papers

A second pass corrected twenty-seven of the eighty-one, on one rule: change a claim
only where the proof is in the paper itself or in arithmetic, never because a run
could not be found. Every correction quotes a number the paper already carries, or
one derived from the paper's own numbers by a division a reader can repeat.

**A figure that appears in no row of the table it summarises.** Twelve papers.
`zen-agent` averaged GAIA 83.1/68.4/42.3 to 71.2 while its four baseline rows are
the plain mean of their own three levels; the mean is 64.6. `zen-embeddings-retrieval`
and `zen3-embedding` state MTEB averages of 72.4 and 74.3 over tables that supply
their task counts, where the 56-task weighted means are 67.1 and 67.4.
`zen-mathematical-reasoning` opened with five figures, none of which was any row,
and explained one of them as best-of-32 when its own sampling table puts best-of-32
elsewhere. `zen-dso-protocol` claimed 94% of centralized quality and a 78% bandwidth
cut against tables reading 99.4% and 99.8%-and-better. Also `zen-hallucination-reduction`
(reductions attached to the wrong benchmarks, one attached to nothing),
`zen-synthetic-data` (an 8.4-point MT-Bench gain on a 1-to-10 scale from a 7.84
baseline, where the table says 0.88), `zen-distributed-training`, `zen-finetuning`,
`zen-legal-ai`, `zen-coder-flash`, `zen-3d` (the abstract quoted the Chair column as
the ShapeNet result) and `zen-multilingual`, whose XNLI average was understated.

**Arithmetic that the silicon or the scale forbids.** `zen-nano`, `zen-eco` and
`zen-scribe` each report INT4 needing as much memory as FP16 or more, while their own
FP16 and INT8 rows are exactly two and one bytes per parameter; `zen_family_overview`
already carried the right values. Both `zen-designer` papers size a stated 235B model
at 220 GB in FP16, which is a 110B model; `zen-quantization` puts the same model at
470 GB. `zen-omni` and `zen-next` recommend cards smaller than the memory the same
row requires. `zen-live` captions a latency table to an A10G when its own deployment
table assigns that 98 ms to the H100 and gives the A10G 113 ms.
`zen-hardware-optimization` calls a throughput table FP8+INT4 when its own cumulative
table reaches the identical 31,200 tok/s figure through INT4 + FP16.

**A metric that cannot describe the paper's subject.** Six papers share one template
whose "Visual Understanding Benchmarks" block bundles two metrics computed over images
a model generates (FID, CLIP score) with one computed over text a model emits about an
image (VQA v2). No model produces all three. The block went to four papers across four
modalities, so each got at least one metric it cannot compute: the diffusion papers
`zen-artist` and `zen-artist-edit` reported VQA v2 and a token rate, and the
vision-language papers `zen-designer-instruct` and `zen-designer-thinking` reported FID
and CLIP score. Each paper now keeps the rows its own stated output type can produce.

**Throughput, where the defect is the missing condition rather than the number.**
Decode reads the active weight set once per token, so one stream cannot outrun
bandwidth over footprint. `zen4-mini`, `zen3-nano` and `zen-coder-flash` report figures
above their own bound, but batched serving would make them legal and none of the three
records a batch size. The numbers stand; each table now carries its bound and the
arithmetic behind it. This is the same treatment AIME gets in
`zen-mathematical-reasoning`, where a score that is not a multiple of 1/30 is legal
under averaging and the caption now says so.

**Left alone, and why.** Training fleets absent from this estate prove nothing about
models trained on rented capacity. `zen-reranker`'s 98% semantic preservation appears
in no table, but the only "preserved" figure in the paper describes a different model
at a different dimension, so it is uncited rather than contradicted.
`zen-safety-evaluation`'s attack-vector average does not match the mean of its rows,
but the table states no per-vector counts, so no weighting is determined.
`zen-vision-architecture`'s MMMU overall covers 30 topics while listing 19, so the
average is not determined either. `zen4-coder-flash` puts FP8 on an A100: Ampere has
no FP8 tensor cores, but its claims there are footprint claims, and FP8 weight-only
storage with dequantisation does run on Ampere.

Two arithmetic problems are real and were not corrected, because fixing them means
choosing which of several numbers is wrong. The template's pretraining sentence claims
7 trillion tokens over 60 days on 128 A100 for a 22B-active model, which needs about
4.5 times the peak BF16 throughput of the hardware it names before any utilisation
discount; the same sentence in `zen-scribe` implies about 6% utilisation. And the
derived tables in the two embedding papers quote the corrected MTEB average as their
uncompressed baseline, so their compression and Matryoshka columns still sit above it
and need the authors' per-configuration data to re-base.

Of the twenty-seven corrected here, nineteen have diverged from `zenlm/papers`,
six exist only in this repository, and two — `zen-3d.tex` and `zen-agent.tex` — were
byte-identical to their counterparts there before this pass and now are not. Those two
are the ones worth mirroring first.

Note also that 69 of the 86 `zen/*.tex` here have diverged from their
counterparts in `zenlm/papers`, so the two sites publish different text under the
same titles. A fix applied in one place does not reach the other.
