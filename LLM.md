# Papers

Hanzo's research papers: LaTeX sources at the repo root and in `zen/` and
`defense/`, compiled PDFs under `pdfs/`, indexed by `INDEX.md`, and the site at
https://papers.hanzo.ai built from `site/`.

## How this ships

One way, and it runs on our own stack:

    push  ->  github.com/hanzoai/papers      (a mirror)
              .github/workflows/sync.yml      carries refs onward
      ->  git.hanzo.ai/hanzoai/papers         CANONICAL
              .hanzo/workflows/ci.yml         compiles every paper
              .hanzo/workflows/deploy.yml     builds ghcr.io/hanzoai/papers
      ->  hanzoai/universe crs/papers.yaml    names the tag that is live
      ->  hanzoai/operator                    reconciles the App
      ->  hanzoai/static behind hanzoai/ingress serves papers.hanzo.ai

**git.hanzo.ai is canonical; GitHub is a mirror.** `.github/workflows/` holds
exactly one file, `sync.yml`, and its only job is getting refs to the forge. Every
build, check and deploy is a workflow under `.hanzo/workflows/`, which the forge
reads. `.hanzo/workflows` uses GitHub Actions syntax, so a workflow moves between
the two by changing directory and nothing else.

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

`make -k all` compiles all 131 discovered papers, `-k` so one broken paper does
not hide the rest, then the gate asserts every expected PDF exists.

The predecessor could not fail. Every rule in the `Makefile` ends in `|| true`
and prints `FAIL` instead of exiting, so `make all` returned 0 no matter how many
papers were missing. The gate reads `make manifest` — the Makefile's own
`ALL_PDFS` — so the paper set has one definition and the check cannot drift from
the build.

Adding a paper therefore requires it to compile: drop `foo.tex` at the root or in
`zen/`, and `pdfs/foo.pdf` is expected from then on.

`ci.yml` does not write to the repo. The predecessor pushed a `v<run_number>`
GitHub Release and committed the PDFs back to `main`; both wrote to what is now a
mirror. The PDFs are the run's artifact, and the site image bakes its own.

## Deploying the site

A build never deploys itself. `deploy.yml` publishes
`ghcr.io/hanzoai/papers:<sha>` from `site/Dockerfile`; a human sets
`spec.image.tag` in `hanzoai/universe`
`infra/k8s/operator/crs/papers.yaml` and adds `- papers.yaml` to that directory's
`kustomization.yaml`. The CR is inert until both are done, which is deliberate:
an App promoted with an empty tag takes the host down instead of leaving it
alone.

Order: publish an image -> set the tag -> add the line -> confirm the pod is
Running -> only then repoint `papers.hanzo.ai` off Cloudflare Pages, which today
still answers from `infra/cf-zones/hanzo-ai.yaml` and `site/public/CNAME`.
