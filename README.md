<div align="center">
  <img src=".github/hanzo-logo.svg" alt="Hanzo AI" width="120" />
  <h1>Hanzo AI Research Papers</h1>
</div>

[![Papers](https://img.shields.io/badge/papers-5-blue)](https://github.com/hanzoai/papers)
[![License](https://img.shields.io/badge/license-CC--BY--4.0-green)](LICENSE)

Academic and technical papers for Hanzo AI compute infrastructure and protocols.

**Organization**: https://github.com/hanzoai
**Website**: https://hanzo.ai
**Contact**: contact@hanzo.ai

---

## 📚 Overview

Hanzo AI research is organized into **5 comprehensive papers** covering the complete AI compute infrastructure stack (Layer-1) that enables decentralized model training and inference.

---

## 📄 Papers Collection (5 Papers)

### 1. Hanzo ASO (Active Semantic Optimization)

**File**: [`hanzo-aso.tex`](hanzo-aso.tex) → `hanzo-aso.pdf`
**HIP**: [HIP-002-aso.md](../hips/HIP-002-aso.md)
**Status**: ✅ Published October 2025

**Title**: "Training-Free Adaptation via Active Semantic Optimization and Product-of-Experts Decoding"

**Abstract**: A training-free adaptation framework for agentic code generation built on TF-GRPO and PoE decoding.

**Key Contributions**:
- Training-Free GRPO (TF-GRPO) with epistemic utility
- Product-of-Experts (PoE) decoding at token level
- 1-bit semantic compression (BitDelta) - 29.5× savings
- Hanzo Dev CLI agent with SWE-bench integration
- **18.2% resolved rate** on SWE-bench Verified

**Sections**: tf-grpo.tex, poe-decoding.tex, bitdelta.tex, swe-bench-eval.tex

---

### 2. Hanzo DSO (Decentralized Semantic Optimization)

**File**: [`hanzo-dso.tex`](hanzo-dso.tex) → `hanzo-dso.pdf`
**HIP**: [HIP-003-dso.md](../hips/HIP-003-dso.md)
**Status**: ✅ Published October 2025

**Title**: "Decentralized Semantic Optimization with Byzantine-Robust Prior Aggregation"

**Abstract**: A protocol for sharing and aggregating experiential priors across distributed language model agents without parameter updates.

**Key Contributions**:
- Byzantine-robust median voting with stake weighting
- ExperienceRegistry smart contract (IPFS/Arweave storage)
- P2P gossip protocol for prior synchronization
- Quality scoring and slashing mechanism
- **15.2% improvement** in multi-agent tasks vs isolated operation

**Sections**: dso-core.tex, bitdelta.tex

---

### 3. Hanzo HMM (Hamiltonian Market Maker)

**File**: [`hanzo-hmm.tex`](hanzo-hmm.tex) → `hanzo-hmm.pdf`
**HIP**: [HIP-004-hmm.md](../hips/HIP-004-hmm.md)
**Status**: ✅ Published October 2025

**Title**: "Hamiltonian Market Maker for Decentralized AI Compute Exchange"

**Abstract**: An automated market maker for pricing heterogeneous AI compute resources via conserved Hamiltonian invariants.

**Key Contributions**:
- Hamiltonian invariant H(Ψ,Θ) = κ for oracle-free pricing
- Multi-asset routing with SLA-aware path solver
- Risk-adjusted fee structure for inventory management
- PoAI integration for verifiable job settlement
- **< 200ms quote latency**, **98.7% price stability** (vs 89.2% oracle-based)

**Sections**: hmm.tex, poai.tex, token-economics.tex

---

### 4. Hanzo Network Architecture

**File**: [`hanzo-network-architecture.tex`](hanzo-network-architecture.tex) → `hanzo-network-architecture.pdf`
**Status**: ✅ Published

**Title**: "Hanzo Network: Decentralized AI Compute Infrastructure"

**Abstract**: Complete architectural specification of Hanzo's Layer-1 compute infrastructure, including consensus mechanism, TEE attestation, GPU node management, and integration with Lux (L0) and Zoo (L2).

**Key Contributions**:
- Layered architecture design (Lux → Hanzo → Zoo)
- Self-mining consensus (0 token requirement for validators)
- GPU compute verification via Lux A-Chain TEE attestation
- Integration with Zoo's Experience Ledger and HLLM framework
- Multi-GPU support (tensor/pipeline/sequence parallelism)

---

### 5. Hanzo Network Whitepaper

**File**: [`hanzo-network-whitepaper.tex`](hanzo-network-whitepaper.tex) → `hanzo-network-whitepaper.pdf`
**Status**: ✅ Published

**Title**: "Hanzo Network: Economic Model and Tokenomics"

**Abstract**: Comprehensive overview of Hanzo's economic model, validator incentives, and governance mechanisms.

**Key Contributions**:
- Self-mining model (validators earn through compute contribution)
- Integration with HMM for dynamic pricing
- Cross-chain economic settlement via Lux Bridge
- Governance framework for network parameters

---

## 🌐 Cross-Ecosystem Research

The Lux-Hanzo-Zoo-Zen ecosystem has published **58 comprehensive research papers**:

- **[Lux](https://github.com/luxfi/papers)** (L0): **24 papers** on consensus, post-quantum crypto, DeFi, cross-chain
- **[Hanzo](https://github.com/hanzoai/papers)** (L1): **5 papers** on compute infrastructure, ASO/DSO, HMM
- **[Zoo](https://github.com/zooai/gym/tree/main/papers)** (L2): **7 papers** on AI training, tokenomics, HLLM
- **[Zen](https://github.com/zenlm/papers)**: **22 papers** on efficient LLMs with spatial reasoning

### Cross-Layer Innovations

**Validator Economics**:
- Lux validators: **1M LUX stake** (high security, L0 foundation)
- Hanzo validators: **1 AI token** (self-mined on any device, then participate in HMM compute market)
- Zoo validators: **1,000 ZOO stake** (democratic participation, accessible)

**Research Integration**:
- Lux A-Chain provides TEE attestation for Hanzo compute verification
- Hanzo ASO/DSO powers Zoo's Training-Free GRPO implementation
- Hanzo HMM enables economic settlement for Zoo Experience Ledger
- Zen models (7680-dim embeddings) serve as base frontier models

---

## 🔗 Related Papers by Ecosystem

### Lux Network (Base Layer - L0)
**24 foundational papers** covering consensus, post-quantum cryptography, DeFi, and cross-chain:
- [**Consensus**](https://github.com/luxfi/papers): Multi-consensus, Quantum, Quasar, FPC (4 papers)
- [**Chain Architecture**](https://github.com/luxfi/papers): A-Chain (TEE), G-Chain (GraphQL), M-Chain (MPC), Z-Chain (Privacy) (4 papers)
- [**DeFi**](https://github.com/luxfi/papers): Lightspeed DEX, Credit Lending, Oracle, Perpetuals (4 papers)
- [**Web3**](https://github.com/luxfi/papers): NFT Market, ID IAM, DID Specification (3 papers)
- [**Governance**](https://github.com/luxfi/papers): DAO frameworks (2 papers)
- [**Post-Quantum**](https://github.com/luxfi/papers): NTT, ETHFALCON, Threshold Signatures (3 papers)
- [**Scalability**](https://github.com/luxfi/papers): Verkle Trees, Fraud Proofs, TEE Mesh (3 papers)

### Zoo Network (AI/ML Specialization - L2)
**7 papers** on AI training infrastructure and tokenomics:
- [**Foundation Mission**](https://github.com/zooai/gym/blob/main/papers/zoo-foundation-mission.tex): 501(c)(3) non-profit charter
- [**Network Architecture**](https://github.com/zooai/gym/blob/main/papers/zoo-network-architecture.tex): Layered AI infrastructure
- [**Tokenomics**](https://github.com/zooai/gym/blob/main/papers/zoo-tokenomics.tex): $AI token economics & governance
- [**Gym Platform**](https://github.com/zooai/gym/blob/main/papers/gym-training-platform.tex): AI training infrastructure
- [**HLLM Training-Free GRPO**](https://github.com/zooai/gym/blob/main/papers/hllm-training-free-grpo.tex): Hamiltonian LLM framework
- [**Experience Ledger DSO**](https://github.com/zooai/gym/blob/main/papers/dso_whitepaper/main.tex): Semantic memory system
- [**ZIP-002 Zen Reranker**](https://github.com/zooai/gym/blob/main/papers/zip-002-zen-reranker.tex): Cross-model ranking

### Zen Language Models (Base Frontier Models)
**22 papers** on efficient LLMs with spatial reasoning:
- [**Family Overview**](https://github.com/zenlm/papers/blob/main/zen_family_overview.tex): Complete ecosystem (600M-480B params)
- **Core Models** (6): Nano, Eco, Coder, Omni, Next, Guard
- **Creative Models** (4): Artist, Artist-Edit, Designer-Instruct, Designer-Thinking
- **Specialized Models** (7): Scribe, Director, Foley, Musician, Video, Voyager, World
- **Advanced** (4): 3D, Agent, Technical, Reranker
- **Complete listing**: [Zen Papers Repository](https://github.com/zenlm/papers)

---

## 🛠️ Building Papers

### Requirements

- LaTeX distribution (TeX Live, MacTeX, BasicTeX) **OR**
- Docker/Colima for containerized builds

### Quick Build

```bash
# Using Docker (auto-detected if LaTeX not installed)
cd papers
make

# View PDF (macOS)
make view

# Clean intermediate files
make clean
```

### Native LaTeX (Recommended for Regular Use)

```bash
# Install LaTeX (macOS)
brew install --cask basictex
# or
make install-latex

# Add to PATH
echo 'export PATH="/Library/TeX/texbin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Install additional packages
sudo tlmgr update --self
sudo tlmgr install collection-latexextra

# Build
make
```

### Docker Build

```bash
# Start Docker daemon (if using Colima)
colima start

# Build (Docker auto-detected)
make
```

---

## 📦 Makefile Commands

```bash
# Build all papers
make                  # Build all PDFs (ASO, DSO, HMM, Architecture, Whitepaper)
make all              # Same as above

# Build individual papers
make aso              # Build hanzo-aso.pdf only
make dso              # Build hanzo-dso.pdf only
make hmm              # Build hanzo-hmm.pdf only
make architecture     # Build hanzo-network-architecture.pdf only
make whitepaper       # Build hanzo-network-whitepaper.pdf only

# Cleaning
make clean            # Remove intermediate files (.aux, .log, etc.)
make distclean        # Remove all generated files including PDFs

# Utilities
make view             # Open all PDFs (macOS)
make help             # Show all targets with descriptions
make docker-pull      # Pull Docker image (first time setup)
```

---

## 📝 LaTeX Packages Used

All papers use standard LaTeX packages included in TeX Live:

- **Math**: amsmath, amssymb, amsthm, mathtools, bm
- **Graphics**: graphicx, xcolor
- **Tables**: booktabs, multirow
- **Algorithms**: algorithm, algpseudocode
- **Navigation**: hyperref (with colored links)
- **Lists**: enumitem
- **Layout**: geometry

---

## 🤝 Contributing

### Adding New Papers

1. Create LaTeX source file `paper-name.tex`
2. Update Makefile if needed
3. Build PDF: `make`
4. Update this README with paper description
5. Commit both `.tex` source and `.pdf` output

### Paper Style Guidelines

- Use 11pt article class
- 1-inch margins (geometry package)
- Colored hyperlinks (black text, blue citations/URLs)
- Algorithms in pseudocode format
- Tables with booktabs styling
- Include abstract and conclusion
- Provide Solidity interfaces for protocol papers
- Include implementation plan/roadmap

---

## 📂 File Organization

```
papers/
├── README.md                        # This file
├── Makefile                         # Build automation (multi-paper support)
├── .gitignore                       # LaTeX artifacts
│
├── hanzo-aso.tex                    # ASO paper source
├── hanzo-aso.pdf                    # ASO paper PDF (7 pages)
├── hanzo-dso.tex                    # DSO paper source
├── hanzo-dso.pdf                    # DSO paper PDF (6 pages)
├── hanzo-hmm.tex                    # HMM paper source
├── hanzo-hmm.pdf                    # HMM paper PDF (7 pages)
├── hanzo-network-architecture.tex   # Architecture paper source
├── hanzo-network-architecture.pdf   # Architecture paper PDF
├── hanzo-network-whitepaper.tex     # Whitepaper source
├── hanzo-network-whitepaper.pdf     # Whitepaper PDF
│
└── sections/                        # Reusable LaTeX sections (shared across papers)
    ├── tf-grpo.tex                  # Training-Free GRPO formulation
    ├── poe-decoding.tex             # Product-of-Experts decoding
    ├── bitdelta.tex                 # 1-bit compression (BitDelta)
    ├── swe-bench-eval.tex           # SWE-bench evaluation protocol
    ├── dso-core.tex                 # DSO protocol specification
    ├── hmm.tex                      # Hamiltonian Market Maker mechanics
    ├── poai.tex                     # Proof of AI attestations
    └── token-economics.tex          # Token economics
```

**Modular Design**: Papers use `\input{sections/...}` to share common sections, reducing duplication and ensuring consistency across the research ecosystem.

---

## 📖 Citation

If you use Hanzo in your research, please cite the relevant paper(s):

```bibtex
@techreport{hanzo2025aso,
  title={Training-Free Adaptation via Active Semantic Optimization and Product-of-Experts Decoding},
  author={Hanzo Industries Inc.},
  year={2025},
  month={October},
  institution={Hanzo Industries Inc.},
  address={995 Market St, San Francisco, CA},
  note={HIP-002},
  url={https://github.com/hanzoai/papers}
}

@techreport{hanzo2025dso,
  title={Decentralized Semantic Optimization with Byzantine-Robust Prior Aggregation},
  author={Hanzo Industries Inc.},
  year={2025},
  month={October},
  institution={Hanzo Industries Inc.},
  address={995 Market St, San Francisco, CA},
  note={HIP-003},
  url={https://github.com/hanzoai/papers}
}

@techreport{hanzo2025hmm,
  title={Hamiltonian Market Maker for Decentralized AI Compute Exchange},
  author={Hanzo Industries Inc.},
  year={2025},
  month={October},
  institution={Hanzo Industries Inc.},
  address={995 Market St, San Francisco, CA},
  note={HIP-004},
  url={https://github.com/hanzoai/papers}
}
```

**Cross-ecosystem citations**:
- Lux: https://github.com/luxfi/papers (24 papers on L0 infrastructure)
- Zoo: https://github.com/zooai/gym/tree/main/papers (7 papers on AI/ML)
- Zen: https://github.com/zenlm/papers (22 papers on efficient LLMs)

---

## 🔗 Related Projects

### Hanzo AI Projects
- **Hanzo Node**: https://github.com/hanzoai/hanzo (Rust blockchain implementation)
- **Agent SDK**: https://github.com/hanzoai/agent (Python multi-agent framework)
- **MCP Tools**: https://github.com/hanzoai/mcp (Model Context Protocol)
- **Jin**: Multimodal LLM architecture (text/vision/audio/3D)

### Zoo Labs Foundation (Partner Organization)
- **Zoo Papers**: https://github.com/zooai/gym/tree/main/papers
- **Zoo ZIPs**: Zoo Improvement Proposals for decentralized learning protocols
- **DSO (ZIP-001)**: Decentralized Semantic Optimization - Byzantine-robust prior aggregation
  - *Built on Hanzo's ASO (HIP-002) and HMM (HIP-004)*
  - *Years of co-development between Hanzo AI Inc and Zoo Labs Foundation (501c3)*

### ZenLM (Co-developed Models)
- **Zen Models**: https://github.com/zenlm/papers
- **Base Frontier Models**: Shared foundation for both Hanzo and Zoo ecosystems
- **Partnership**: Hanzo AI Inc (Techstars '17) & Zoo Labs Foundation (501c3)

---

## 📜 License

Papers are published under Creative Commons Attribution 4.0 International (CC BY 4.0).

Code examples and implementations referenced in papers follow their respective project licenses.

---

## 📧 Contact

- **Email**: contact@hanzo.ai
- **Website**: https://hanzo.ai
- **GitHub**: https://github.com/hanzoai
- **Twitter**: @hanzoai

---

**Hanzo Industries Inc.**
995 Market St, San Francisco, CA
https://hanzo.ai

---

**Last Updated**: January 28, 2025
**Total Papers**: 5
**Status**: Active Development

*Building decentralized AI compute infrastructure for the next generation of language models.*
