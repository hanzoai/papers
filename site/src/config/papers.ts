export interface PaperConfig {
  id: string
  title: string
  subtitle: string
  abstract: string
  pdfUrl: string
  latexUrl?: string
  githubUrl: string
  date: string
  authors: string[]
  tags: string[]
  relatedLinks?: {
    label: string
    url: string
  }[]
}

export interface SiteConfig {
  name: string
  fullName: string
  description: string
  website: string
  github: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  logo: string
  papers: PaperConfig[]
}

export const siteConfig: SiteConfig = {
  name: 'Hanzo AI',
  fullName: 'Hanzo AI Inc (Techstars \'17)',
  description: 'Owned, self-hostable AI and post-quantum cryptography — sovereign infrastructure for regulated industries, critical infrastructure, and government. Technical papers, measured case studies, and formal proofs.',
  website: 'https://hanzo.ai',
  github: 'https://github.com/hanzoai',
  primaryColor: '#FF6B35',
  secondaryColor: '#004E89',
  accentColor: '#00D9FF',
  logo: '/logos/hanzo-logo.svg',
  papers: [
    {
      id: 'hanzo-ai-chain',
      title: 'Hanzo AI Chain (AIVM)',
      subtitle: 'Useful-Work Mining, the Native AI Coin, and Post-Quantum Omnichain Settlement',
      abstract: 'The canonical Proof-of-AI architecture: a real workload is admitted before mining, any conforming CPU or GPU executes its deterministic integer profile, and A-Chain alone validates the canonical transcript, consumes the global work nullifier, and authorizes AI. Z-Chain compresses finalized receipts through P3Q while Lux Quasar supplies post-quantum finality; destination chains consume receipts and never become mining authorities.',
      pdfUrl: '/pdfs/hanzo-ai-chain.pdf',
      latexUrl: 'https://github.com/hanzoai/papers/blob/main/hanzo-ai-chain/hanzo-ai-chain.tex',
      githubUrl: 'https://github.com/hanzoai/papers',
      date: '2026-08-18',
      authors: ['Hanzo AI Research'],
      tags: ['Proof of AI', 'A-Chain', 'P3Q', 'AI Mining'],
      relatedLinks: [
        { label: 'Lux AIVM settlement paper', url: 'https://papers.lux.network' },
        { label: 'Hanzo Network', url: 'https://hanzo.network' },
      ],
    },
    // --- Sovereign AI, Security & Infrastructure ---
    {
      id: 'hanzo-cloud-economics',
      title: 'Cloud Economics of a Sovereign OSS Stack',
      subtitle: 'A Regulated Capital-Markets Migration Case Study',
      abstract: 'Cut cloud spend ~90% — from ~$35K/mo to ~$3.5K/mo (~$380,000/yr) — migrating a regulated capital-markets platform off a sprawling public-cloud footprint (200+ microservices, 185 projects on GCP) onto a consolidated, self-hostable open-source stack on owned hardware. Decomposes where the savings come from (no metered model markup, no hyperscaler margin, efficient transport, consolidation) and shows the same mechanism applies to any organization carrying a metered-API plus hyperscaler-sprawl cost structure.',
      pdfUrl: '/pdfs/hanzo-cloud-economics.pdf',
      latexUrl: 'https://github.com/hanzoai/papers/blob/main/defense/hanzo-cloud-economics.tex',
      githubUrl: 'https://github.com/hanzoai/papers',
      date: '2026-06-15',
      authors: ['Hanzo AI Research'],
      tags: ['Sovereign AI', 'Cloud Economics', 'Sovereign Stack', 'OSS'],
    },

    // --- Engine / AI Infrastructure (measured, on-device) ---
    {
      id: 'hanzo-native-stack-thesis',
      title: 'One Native Stack for Private, Continuously-Learning AI',
      subtitle: 'Inference at the Bandwidth Wall, On-Device QLoRA, One Engine',
      abstract: 'A synthesis paper: train and serve collapse into a single Rust engine with one tensor type, one quantization core, and one device backend — eliminating the format-break tax of training in PyTorch, exporting to GGUF/ONNX, and serving on a third engine. Formalizes a unified bandwidth-budget theorem and QLoRA bit-exactness, with every claim sourced to a measured ROCm campaign on consumer hardware. Scrupulously scoped: claims no speed win over NVIDIA and no zero-leakage guarantee.',
      pdfUrl: '/pdfs/hanzo-native-stack-thesis.pdf',
      latexUrl: 'https://github.com/hanzoai/papers/blob/main/hanzo-native-stack-thesis.tex',
      githubUrl: 'https://github.com/hanzoai/papers',
      date: '2026-06-15',
      authors: ['Hanzo AI Research'],
      tags: ['Engine', 'Inference', 'On-Device', 'Privacy'],
    },
    {
      id: 'hanzo-rocm-inference',
      title: 'Native ROCm Inference on a Consumer RDNA3.5 APU',
      subtitle: 'Reaching llama.cpp Decode Parity via a Unified 1-bit-to-Full Quant Core',
      abstract: 'A measurement-driven engineering campaign that took native-ROCm LLM inference on a consumer AMD Ryzen AI Max+ 395 "Strix Halo" (Radeon 8060S, gfx1151) from the slowest of five backends to decode parity (0.98×) and 0.86× prefill versus llama.cpp on the same GPU. A lane-strided decode kernel reaches 245.8 GB/s — 97% of the memory-bandwidth wall. Documents negative results in detail and derives the physical ~25 tok/s ceiling that bounds both engines.',
      pdfUrl: '/pdfs/hanzo-rocm-inference.pdf',
      latexUrl: 'https://github.com/hanzoai/papers/blob/main/hanzo-rocm-inference.tex',
      githubUrl: 'https://github.com/hanzoai/papers',
      date: '2026-06-15',
      authors: ['Hanzo AI Research'],
      tags: ['Engine', 'ROCm', 'Inference', 'Benchmarks'],
    },
    {
      id: 'hanzo-cross-backend-inference',
      title: 'Edge LLM Inference Across Commodity Accelerators',
      subtitle: 'Measured AMD, NVIDIA, and Apple Performance',
      abstract: 'Measured single-GPU inference for one 8B dense transformer at Q8_0 across three commodity edge accelerators — AMD "Strix Halo", NVIDIA GB10 "Grace Blackwell", and Apple M4 Max — comparing the Hanzo engine to llama.cpp on identical model and metric. Two findings: decode parity on all three backends, and the fastest box flips by workload (NVIDIA wins prefill, Apple wins decode ~2.5×). Includes a full reproducibility appendix with exact hardware, commands, and git SHA.',
      pdfUrl: '/pdfs/hanzo-cross-backend-inference.pdf',
      latexUrl: 'https://github.com/hanzoai/papers/blob/main/hanzo-cross-backend-inference.tex',
      githubUrl: 'https://github.com/hanzoai/papers',
      date: '2026-06-15',
      authors: ['Hanzo AI Research'],
      tags: ['Engine', 'Inference', 'Edge', 'Benchmarks'],
      relatedLinks: [
        { label: 'The numbers, live: hanzo.ai/benchmarks/inference', url: 'https://hanzo.ai/benchmarks/inference' },
      ],
    },
    {
      id: 'hanzo-native-training',
      title: 'Native Training in the Hanzo Engine',
      subtitle: 'One Engine, One Quant Format, One Backend',
      abstract: 'The architecture for training language models natively inside the Hanzo Rust inference stack, eliminating the conversion boundary between a Python training stack and a separate serving engine. Shows the QLoRA primitive already exists in the engine\'s reverse-mode autograd, and formalizes QLoRA parameter/memory accounting plus additive LoRA-soup composition. Unusually candid: an entire section names the stack\'s own non-functional stubs to replace.',
      pdfUrl: '/pdfs/hanzo-native-training.pdf',
      latexUrl: 'https://github.com/hanzoai/papers/blob/main/hanzo-native-training.tex',
      githubUrl: 'https://github.com/hanzoai/papers',
      date: '2026-06-15',
      authors: ['Hanzo AI Research'],
      tags: ['Engine', 'Training', 'QLoRA', 'On-Device'],
    },
    {
      id: 'hanzo-continuous-learning-privacy',
      title: 'Continuously-Learning Private AI',
      subtitle: 'Self-Improvement and Privacy in the Hanzo Native Stack',
      abstract: 'A private continuously-learning model as three loops: an inference loop that serves and captures its own interactions, a curation loop that filters/redacts/de-duplicates into safe training data, and a training loop that folds it back into cheap swappable adapters. Formalizes a privacy invariant (no PII token enters the training set under a sound gate) and bounded-forgetting (frozen base → zero base drift), and is honest about model-collapse and delta-leakage failure modes and which components are still research.',
      pdfUrl: '/pdfs/hanzo-continuous-learning-privacy.pdf',
      latexUrl: 'https://github.com/hanzoai/papers/blob/main/hanzo-continuous-learning-privacy.tex',
      githubUrl: 'https://github.com/hanzoai/papers',
      date: '2026-06-15',
      authors: ['Hanzo AI Research'],
      tags: ['Engine', 'Privacy', 'Continual Learning', 'On-Device'],
    },
    {
      id: 'hanzo-platform-infra-desktop',
      title: 'Economical Serving and the hanzo.ai Platform',
      subtitle: 'A Bandwidth-Optimal Unified Train-and-Serve Runtime',
      abstract: 'The serving economics, platform architecture, and on-device thesis that follow from a native Rust train-and-inference engine whose decode kernel runs at the memory-bandwidth wall. Derives a cost law (tokens/$/s ∝ B / (q·N_active)) showing quantization — not bigger accelerators — is the primary cost lever, and proves paged-attention tenant concurrency and a structural egress bound (raw data never crosses the wire). Honestly marks train/personalize/federate as stub/roadmap.',
      pdfUrl: '/pdfs/hanzo-platform-infra-desktop.pdf',
      latexUrl: 'https://github.com/hanzoai/papers/blob/main/hanzo-platform-infra-desktop.tex',
      githubUrl: 'https://github.com/hanzoai/papers',
      date: '2026-06-15',
      authors: ['Hanzo AI Research'],
      tags: ['Engine', 'Economics', 'Platform', 'On-Device'],
    },

    {
      id: 'hanzo-unified-tenant-cloud',
      title: 'The Unified Sovereign-Tenant Cloud',
      subtitle: 'Linear Shared-Nothing Scaling via Per-Tenant SQLite and In-Process Composition',
      abstract: 'The measured memory-and-scaling case for running an entire multi-tenant cloud as one Go binary — 56 in-process subsystems over shared-nothing storage, where every tenant is its own post-quantum-encrypted SQLite file and writes shard embarrassingly with no global lock. Measured through the production open path: an actively-served tenant costs ≈0.25 MB of RAM and an idle tenant essentially zero, so memory scales with concurrency, not registrations — one billion registered tenants at 1% peak concurrency fits ≈20 commodity 128 GB nodes. Measures the shared-Postgres microservice-mesh alternative at 11–32× the memory footprint, and is explicit about writer-pinning failover, hot-tenant skew, and cross-tenant query limits.',
      pdfUrl: '/pdfs/hanzo-unified-tenant-cloud.pdf',
      latexUrl: 'https://github.com/hanzoai/papers/blob/main/hanzo-unified-tenant-cloud.tex',
      githubUrl: 'https://github.com/hanzoai/papers',
      date: '2026-07-08',
      authors: ['Hanzo AI Research'],
      tags: ['Cloud', 'Multi-Tenancy', 'SQLite', 'Benchmarks'],
    },

    // --- One Source, Every Backend (kernel-DSL campaign) ---
    {
      id: 'refutation-driven-perf',
      title: 'Refutation-Driven Performance Engineering',
      subtitle: 'An Empirical Study of a Multi-Week GPU Kernel Campaign',
      abstract: 'An N=1 observational study of a multi-week campaign to close the llama.cpp inference gap on three accelerators (AMD gfx1151 RDNA3.5, NVIDIA GB10 Blackwell, Apple M4 Max) inside a one-source GPU kernel DSL. The primary artifact is not a kernel but a refutation log: twenty-five numbered hypotheses, most plausible, each killed by a cheap decisive experiment. Reports a Vulkan-prefill win ladder (212→1734 tok/s, 8.2× of the gap closed in one ~36-hour cadence), a CUDA decode gap closed to parity by a single model-eligibility entry with zero kernel work, and an instrument fix that collapsed prefill benchmark noise from ±42% to ±0.8% (52×). Formalizes three recurring algorithms — a multi-fidelity Gate Ladder, a decisive-experiment selection rule, and refutation-log-as-prior — and a measurement doctrine of same-run, sustained-only ratios. Honest about standing: two wins, one parity, three open gaps.',
      pdfUrl: '/pdfs/refutation-driven-perf.pdf',
      latexUrl: 'https://github.com/hanzoai/papers/blob/main/refutation-driven-perf.tex',
      githubUrl: 'https://github.com/hanzoai/papers',
      date: '2026-07-18',
      authors: ['Hanzo AI Research'],
      tags: ['Engine', 'GPU Kernels', 'Benchmarks', 'Methodology'],
      relatedLinks: [
        { label: 'Companion: Evolutionary Schedule Search', url: 'https://papers.hanzo.ai/evolutionary-schedule-search' },
        { label: 'The numbers, live: hanzo.ai/benchmarks/inference', url: 'https://hanzo.ai/benchmarks/inference' },
      ],
    },
    {
      id: 'evolutionary-schedule-search',
      title: 'Evolutionary Schedule Search in a One-Source Kernel DSL',
      subtitle: 'And the Continual-Improvement Loop It Anchors',
      abstract: 'A one-source kernel DSL exposes each operation\'s schedule — tile dimensions, buffering depth, vector width, per-shape selection — as compile-time knobs, so schedule search becomes a discrete search over monomorphized, bit-exact kernels. Building on an existing per-(device, op, shape) winner cache, this paper extracts the constants such a search must respect from the campaign\'s ~15 hand-evaluated configurations (free static rejection, a ±0.4% per-op fitness signal, strongly non-additive lever interaction, and hard device non-transfer), specifies a multi-fidelity evolutionary schedule search (~300 configurations/night against ~15 by hand), and embeds it in a continual-improvement loop where a calibrated judge flock — weighted by measured ground truth rather than preference — selects training signal under a Goodhart tripwire, framed as the small-N precursor of a mean-field game. The search is specified, not yet run; that boundary is marked throughout.',
      pdfUrl: '/pdfs/evolutionary-schedule-search.pdf',
      latexUrl: 'https://github.com/hanzoai/papers/blob/main/evolutionary-schedule-search.tex',
      githubUrl: 'https://github.com/hanzoai/papers',
      date: '2026-07-18',
      authors: ['Hanzo AI Research'],
      tags: ['Engine', 'Autotuning', 'Evolutionary Search', 'Kernels'],
      relatedLinks: [
        { label: 'Companion: Refutation-Driven Performance Engineering', url: 'https://papers.hanzo.ai/refutation-driven-perf' },
      ],
    },
    {
      id: 'hanzo-router',
      title: 'Hanzo Router',
      subtitle: 'Memory-Aware, Local-First LLM Routing with a Learned SLO-Constrained Policy',
      abstract: 'A production request stream is dominated by its easiest queries — short chats, classification, formatting, boilerplate — yet frontier pricing charges the hardest-query rate on every token. Describes the router hanzo-node uses to place each request across a swappable pool of local and cloud models, decomplecting mechanism from brain: the mechanism is pure logic over value inputs (a model registry, a memory snapshot, the set of already-loaded models, a per-request SLO) that prefers reusing a resident model at zero marginal cost, then loading a local model that fits available memory, then the cheapest usable cloud model; the brain is a swappable policy behind a one-method seam — a rule-based cold-start policy, a learned bilinear utility with per-user online LinUCB adaptation, or a small trainable routing encoder. Gives the SLO-constrained objective the learned policy optimizes (quality − λ·cost − μ·latency under hard feasibility ceilings), the memory-aware fit check that makes local-first placement deterministic and unit-testable, and a usage-plane signal that biases routing away from providers near their rate limits. Claims no measured benchmark saving: instead an itemized cost model that goes beyond API token prices — serving simple traffic locally for the price of electricity rather than a rented GPU — whose arithmetic yields roughly a 90% reduction in total AI spend for a mixed workload.',
      pdfUrl: '/pdfs/hanzo-router.pdf',
      latexUrl: 'https://github.com/hanzoai/papers/blob/main/hanzo-router/main.tex',
      githubUrl: 'https://github.com/hanzoai/papers',
      date: '2026-07-07',
      authors: ['Hanzo AI Research'],
      tags: ['Router', 'Routing', 'Economics', 'On-Device', 'SLO'],
    },

    // --- What an agent costs when it is doing nothing ---
    {
      id: 'hanzo-dormant-agents',
      title: 'What a Dormant Agent Costs',
      subtitle: 'State, Execution and Isolation Measured Separately at a Fleet of One Million',
      abstract: 'An agent platform is usually costed as though an agent were a process, which sets the per-agent floor at a container runtime\'s minimum reservation — 128–512 MB on commodity platforms. At that floor a fleet of a million agents is a datacenter, and every design decision downstream of the estimate is made in its shadow. We take the estimate apart. An idle agent is three separable things: the state it will resume from, the execution context that holds its loop, and the isolation boundary its code runs behind. These have no reason to cost the same, and measured on one laptop they differ by five orders of magnitude. State at rest is a row: 477 bytes on disk, so a million dormant agents occupy 454.6 MiB, written at 309,789 agents/s and resumed in 0.034 ms in-process. Execution at rest is a goroutine: 601 bytes of heap, identical on every run, so a million live loops are 573.0 MB and each starts in 187 ns. Isolation is the expensive one, and it is expensive for a reason: an in-process V8 context costs 0.15 ms but runs only JavaScript, while an OCI container costs 150.80 ms — 1016× more — and is the only one of the two that can run a test suite, a package manager or a shell. The conclusion is not that containers are wasteful. It is that a fleet pays for isolation per running agent, not per registered one, while the industry estimate charges the isolation price to every agent whether or not it is doing anything. We give the capacity model this implies, and we are explicit about what 601 bytes is: a floor for an agent holding nothing, not a forecast for an agent holding a conversation.',
      pdfUrl: '/pdfs/hanzo-dormant-agents.pdf',
      latexUrl: 'https://github.com/hanzoai/papers/blob/main/hanzo-dormant-agents/hanzo-dormant-agents.tex',
      githubUrl: 'https://github.com/hanzoai/papers',
      date: '2026-09-07',
      authors: ['Hanzo AI Research'],
      tags: ['Agents', 'Cost', 'Isolation', 'Benchmarks', 'Measurement'],
      relatedLinks: [
        { label: 'State at rest, live: hanzo.ai/benchmarks/fleet', url: 'https://hanzo.ai/benchmarks/fleet' },
        { label: 'Execution at rest, live: hanzo.ai/benchmarks/goroutine', url: 'https://hanzo.ai/benchmarks/goroutine' },
        { label: 'Isolation, live: hanzo.ai/benchmarks/sandbox', url: 'https://hanzo.ai/benchmarks/sandbox' },
        { label: 'Harness: hanzoai/cloud · bench', url: 'https://github.com/hanzoai/cloud/tree/main/bench' },
      ],
    },

    // --- Conversational memory, measured on LoCoMo ---
    {
      id: 'hanzo-multi-hop-retrieval',
      title: 'Hops Do Not Fix Multi-Hop Retrieval',
      subtitle: 'A Negative Result on Long-Horizon Conversational Memory, and What the Failure Actually Is',
      abstract: 'On LoCoMo, a dense retriever answering single-hop questions finds every required turn 78.2% of the time at k=20. On multi-hop questions the same retriever over the same index finds every required turn 22.7% of the time — but finds at least one of them 80.1% of the time, essentially the single-hop rate. It reliably finds a relevant turn and reliably misses the rest. The textbook fix is to search more than once and let the first result inform the second; we implemented four retrieval policies over one index — a single search, pseudo-relevance feedback, a union over neighbours of the top hits, and a two-deep chain — so that the only variable is the policy. None of them fixes it: the best gained 0.7 percentage points on multi-hop at double the latency, two were worse than a single search, and the one that gained on multi-hop lost 3.1 points on single-hop. The diagnostic says why. Multi-hop questions need 3.1 gold turns on average (up to 19), and 95.4% of that evidence spans more than one conversation session; the median gold turn sits at rank 24 and the median worst gold turn at rank 67, beyond k=20 for 77.2% of questions and beyond k=100 for 43.1%. Additional hops re-search the same similarity space, and a turn that is far away in that space stays far however many times it is queried. The missing signal is linkage, not similarity — a structure to be built, not a search to be repeated. We publish this because the negative result is the useful part: it rules out the cheap fix and names the expensive one.',
      pdfUrl: '/pdfs/hanzo-multi-hop-retrieval.pdf',
      latexUrl: 'https://github.com/hanzoai/papers/blob/main/hanzo-multi-hop-retrieval/hanzo-multi-hop-retrieval.tex',
      githubUrl: 'https://github.com/hanzoai/papers',
      date: '2026-09-07',
      authors: ['Hanzo AI Research'],
      tags: ['Memory', 'Retrieval', 'LoCoMo', 'Benchmarks', 'Negative Result'],
      relatedLinks: [
        { label: 'The numbers, live: hanzo.ai/benchmarks/locomo', url: 'https://hanzo.ai/benchmarks/locomo' },
        { label: 'Harness: hanzoai/cloud · bench/brain', url: 'https://github.com/hanzoai/cloud/tree/main/bench/brain' },
      ],
    },
    {
      id: 'locomo-subject-scope',
      title: 'Retrieval Scoped by Subject',
      subtitle: 'A factorial measurement of conversational memory on LoCoMo, and the negative controls that locate the effect',
      abstract: 'We measure a graph-structured conversational memory against a flat nearest-neighbour index on LoCoMo — 10 conversations, 272 sessions, 5,882 turns, 1,986 questions — using the benchmark\'s own scorer, ported to Go and verified against the original Python on all 1,986 questions and every system reported. Three results follow, and the negative controls are the substance of the paper. First, the aggregate over all five question categories is degenerate: a system that replies “No information available” to every question scores 0.228, above every system here that has to find its own evidence, and only an oracle handed the dataset\'s own annotated evidence scores higher, at 0.252. A quarter of LoCoMo\'s questions are adversarial and the official metric awards a point for declining them, so any mean over the full set measures the abstention rate before it measures the memory; the answerable and adversarial halves have to be reported apart. Second, the effect that survives is subject scope. Restricting retrieval to the person a question names scores 0.502 against 0.200 on the 446 adversarial questions (95% CI over conversations [+0.247, +0.347]) at no measurable cost on the 1,540 answerable ones (0.142 against 0.144, CI [-0.010, +0.006]). The mechanism is reader-independent: with the result limit lifted, the graph memory reaches 76% of the annotated evidence for answerable questions and 27% for adversarial ones, where the flat index reaches 99% and 96%. It is selectively blind, and the blindness falls where the trap turns are. Third, the graph itself is inert — empty it entirely and every number is byte-identical.',
      pdfUrl: '/pdfs/locomo-subject-scope.pdf',
      latexUrl: 'https://github.com/hanzoai/papers/blob/main/locomo-subject-scope/main.tex',
      githubUrl: 'https://github.com/hanzoai/papers',
      date: '2026-09-09',
      authors: ['Hanzo AI Research'],
      tags: ['Memory', 'Retrieval', 'LoCoMo', 'Negative Controls', 'Go'],
      relatedLinks: [
        { label: 'The numbers, live: hanzo.ai/benchmarks/locomo-subject-scope', url: 'https://hanzo.ai/benchmarks/locomo-subject-scope' },
        { label: 'Harness: hanzoai/semantic · bench/locomo', url: 'https://github.com/hanzoai/semantic/tree/v0.2.4/bench/locomo' },
      ],
    },

    {
      id: 'network-whitepaper',
      title: 'Hanzo Network Whitepaper',
      subtitle: 'L1 Blockchain for Decentralized AI Compute',
      abstract: 'Comprehensive whitepaper describing Hanzo Network\'s Layer-1 blockchain infrastructure, integrating HMM for compute pricing and supporting PoAI consensus for quality verification.',
      pdfUrl: 'https://github.com/hanzoai/papers/raw/main/pdfs/hanzo-network-whitepaper.pdf',
      latexUrl: 'https://github.com/hanzoai/papers/blob/main/hanzo-network-whitepaper.tex',
      githubUrl: 'https://github.com/hanzoai/papers',
      date: '2024-10-20',
      authors: ['Hanzo AI Team'],
      tags: ['Blockchain', 'Infrastructure', 'Network', 'Architecture'],
    },

  ],
}
