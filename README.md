<div align="center">
  <img src=".github/hanzo-logo.svg" alt="Hanzo AI" width="120" />
  <h1>Hanzo AI Research Papers</h1>
</div>

Academic and technical papers for Hanzo AI infrastructure and protocols.

**Organization**: https://github.com/hanzoai
**Website**: https://hanzo.ai
**Contact**: contact@hanzo.ai

## Papers

Hanzo AI research is organized into three focused papers covering complementary aspects of the ecosystem:

### 1. Hanzo ASO (Active Semantic Optimization)

**File**: `hanzo-aso.pdf`
**LaTeX Source**: `hanzo-aso.tex`
**HIP**: [HIP-002-aso.md](../hips/HIP-002-aso.md)
**Status**: Published October 2025

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

**File**: `hanzo-dso.pdf`
**LaTeX Source**: `hanzo-dso.tex`
**HIP**: [HIP-003-dso.md](../hips/HIP-003-dso.md)
**Status**: Published October 2025

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

**File**: `hanzo-hmm.pdf`
**LaTeX Source**: `hanzo-hmm.tex`
**HIP**: [HIP-004-hmm.md](../hips/HIP-004-hmm.md)
**Status**: Published October 2025

**Title**: "Hamiltonian Market Maker for Decentralized AI Compute Exchange"

**Abstract**: An automated market maker for pricing heterogeneous AI compute resources via conserved Hamiltonian invariants.

**Key Contributions**:
- Hamiltonian invariant H(Ψ,Θ) = κ for oracle-free pricing
- Multi-asset routing with SLA-aware path solver
- Risk-adjusted fee structure for inventory management
- PoAI integration for verifiable job settlement
- **< 200ms quote latency**, **98.7% price stability** (vs 89.2% oracle-based)

**Sections**: hmm.tex, poai.tex, token-economics.tex

## Building Papers

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

## Makefile Commands

```bash
# Build all papers
make                  # Build all PDFs (ASO, DSO, HMM) - auto-detects native/Docker
make all              # Same as above

# Build individual papers
make aso              # Build hanzo-aso.pdf only
make dso              # Build hanzo-dso.pdf only
make hmm              # Build hanzo-hmm.pdf only

# Cleaning
make clean            # Remove intermediate files (.aux, .log, etc.)
make distclean        # Remove all generated files including PDFs

# Utilities
make view             # Open all PDFs (macOS)
make help             # Show all targets with descriptions
make docker-pull      # Pull Docker image (first time setup)
```

## LaTeX Packages Used

All papers use standard LaTeX packages included in TeX Live:

- **Math**: amsmath, amssymb, amsthm, mathtools, bm
- **Graphics**: graphicx, xcolor
- **Tables**: booktabs, multirow
- **Algorithms**: algorithm, algpseudocode
- **Navigation**: hyperref (with colored links)
- **Lists**: enumitem
- **Layout**: geometry

## Contributing

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

## Version Control

- **Tracked**: LaTeX source (`.tex`), generated PDFs (`.pdf`), build scripts
- **Ignored**: Intermediate files (`.aux`, `.log`, `.out`, `.toc`, `.bbl`, `.blg`, etc.)
- **Best Practice**: Run `make clean` before committing

## File Organization

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
│
└── sections/                        # Reusable LaTeX sections (shared across papers)
    ├── tf-grpo.tex                  # Training-Free GRPO formulation
    ├── poe-decoding.tex             # Product-of-Experts decoding
    ├── bitdelta.tex                 # 1-bit compression (BitDelta)
    ├── swe-bench-eval.tex           # SWE-bench evaluation protocol
    ├── dso-core.tex                 # DSO protocol specification
    ├── hmm.tex                      # Hamiltonian Market Maker mechanics
    ├── poai.tex                     # Proof of AI attestations
    └── token-economics.tex          # $AI token economics
```

**Modular Design**: Papers use `\input{sections/...}` to share common sections, reducing duplication and ensuring consistency across the research ecosystem.

## Citation

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

## Related Projects

### Hanzo AI Projects
- **Hanzo Node**: https://github.com/hanzoai/hanzo (Rust blockchain implementation)
- **Agent SDK**: https://github.com/hanzoai/agent (Python multi-agent framework)
- **MCP Tools**: https://github.com/hanzoai/mcp (Model Context Protocol)
- **Jin**: Multimodal LLM architecture (text/vision/audio/3D)

### Zoo Labs Foundation (Partner Organization)
- **Zoo Papers**: https://github.com/zooai/papers
- **Zoo ZIPs**: Zoo Improvement Proposals for decentralized learning protocols
- **DSO (ZIP-001)**: Decentralized Semantic Optimization - Byzantine-robust prior aggregation
  - *Built on Hanzo's ASO (HIP-002) and HMM (HIP-004)*
  - *Years of co-development between Hanzo AI Inc and Zoo Labs Foundation (501c3)*

### ZenLM (Co-developed Models)
- **Zen Models**: https://github.com/zenlm/papers
- **Base Frontier Models**: Shared foundation for both Hanzo and Zoo ecosystems
- **Partnership**: Hanzo AI Inc (Techstars '17) & Zoo Labs Foundation (501c3)

## License

Papers are published under Creative Commons Attribution 4.0 International (CC BY 4.0).

Code examples and implementations referenced in papers follow their respective project licenses.

## Contact

- **Email**: contact@hanzo.ai
- **Website**: https://hanzo.ai
- **GitHub**: https://github.com/hanzoai
- **Twitter**: @hanzoai

---

**Hanzo Industries Inc.**  
995 Market St, San Francisco, CA  
https://hanzo.ai

### 4. Hanzo Network Whitepaper

**File**: `hanzo-network-whitepaper.pdf`  
**LaTeX Source**: `hanzo-network-whitepaper.tex`  
**Status**: Published

Comprehensive overview of Hanzo's decentralized AI infrastructure, including network architecture, consensus mechanism, and economic model.

---

### 5. Jin Architecture Papers

**Directory**: [`jin/`](https://github.com/hanzoai/papers/tree/main/jin)

Jin represents Hanzo's multimodal AI framework with vision-language-audio-3D capabilities:

- **JIN-TAC Technical Whitepaper** (`jin/JIN_TAC_Technical_Whitepaper.md`)
  - Joint Intelligence Network for Tactical Autonomous Command
  - Hierarchical z-JEPA architecture for military edge deployment
  - 85.7% accuracy on military target identification

- **Jin Hypermodal Paper** (`jin/jin_hypermodal_fair.pdf`)
  - Multi-modal AI architecture paper
  - Covers text, vision, audio, and 3D modalities

- **AAL A2V2 Whitepaper** (`jin/aal_a2v2_whitepaper.md`)
  - Army Application Laboratory research
  - Vision-audio-action integration

---

### 6. Zen AI Model Family (Base Frontier Models)

**Repository**: https://github.com/zenlm/papers  
**Co-developed by**: Hanzo AI Inc (Techstars '17) & Zoo Labs Foundation (501c3)

Zen AI is a comprehensive family of ultra-efficient language models serving as the **base underlying frontier models** for both Hanzo AI and Zoo Labs ecosystems. All models are based on Qwen3 architectures with innovative optimizations.

- **Main Whitepaper**: [ZEN_WHITEPAPER_2025.md](https://github.com/zenlm/papers/blob/main/ZEN_WHITEPAPER_2025.md) (v1.0.1)
  - Complete Zen ecosystem: 600M to 480B parameters
  - 95% reduction in energy consumption
  - Recursive AI Self-Improvement System (RAIS)
  - Partnership: Hanzo AI (Techstars '17) & Zoo Labs Foundation

- **Model Documentation**: Visit https://github.com/zenlm/papers for:
  - Core Models: Nano, Eco, Coder, Omni, Next, Guard
  - Specialized Models: Artist, Designer, Scribe, Director, and more
  - Architecture papers and technical specifications
  - Deployment guides and optimization strategies

