# papers.hanzo.ai — Next.js static export served by hanzoai/static.
#
# Built on Hanzo's own hardware (platform.hanzo.ai → arcd / in-cluster kaniko),
# never on GitHub builders. Multi-stage: produce the static export, then bake it
# into the scratch-based hanzoai/static image at /public. The image IS the site.
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ENV NEXT_PUBLIC_BRAND=hanzo
RUN npm run build          # next.config.mjs: output:'export' → writes ./out

# hanzoai/static: FROM scratch, ENTRYPOINT ["/static"], serves -root (default
# /public) on -port (set by the operator Service CR args). Pinned to the tag the
# cluster already runs (see universe crs/cdn.yaml).
FROM ghcr.io/hanzoai/static:0.5.15
COPY --from=build /app/out /public
