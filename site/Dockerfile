# papers.hanzo.ai — Next.js static export served by hanzoai/static.
#
# Paths are from the REPOSITORY ROOT, not from site/. The build door's context
# is the whole repo at one commit and it refuses anything narrower, so a root
# context is the price of building each architecture natively in-cluster
# instead of emulating one of them on a runner. .dockerignore keeps it cheap.
#
# Built on Hanzo's own hardware (platform.hanzo.ai → arcd / in-cluster kaniko),
# never on GitHub builders. Multi-stage: produce the static export, then bake it
# into the scratch-based hanzoai/static image at /public. The image IS the site.
FROM node:20-alpine AS build
WORKDIR /app
COPY site/package.json site/package-lock.json ./
RUN npm ci
COPY site/ .
ENV NEXT_PUBLIC_BRAND=hanzo
RUN npm run build          # next.config.mjs: output:'export' → writes ./out

# hanzoai/static: FROM scratch, ENTRYPOINT ["/static"], serves -root (default
# /public) on -port (set by the operator Service CR args). Pinned to the tag the
# cluster already runs (see universe crs/cdn.yaml).
FROM ghcr.io/hanzoai/static:0.5.15
COPY --from=build /app/out /public
