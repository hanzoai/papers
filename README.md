# Hanzo AI Research Papers

Academic and technical papers for Hanzo AI infrastructure and protocols.

**Organization**: https://github.com/hanzoai  
**Website**: https://hanzo.ai  
**Contact**: contact@hanzo.ai

## Papers

### Hanzo Network Whitepaper

**File**: `hanzo-network-whitepaper.pdf`  
**LaTeX Source**: `hanzo-network-whitepaper.tex`  
**Status**: Published October 2025

**Title**: "Hanzo Network: A Hamiltonian Market Maker Layer-1 for Decentralized AI Compute and Semantic Learning"

**Abstract**: We present Hanzo Network, a specialized Layer-1 (L1) blockchain for AI compute exchange and decentralized semantic learning. Hanzo introduces a **Hamiltonian Market Maker (HMM)**—a provably-stable, oracle-minimal automated market maker that prices heterogeneous compute resources via a Hamiltonian invariant.

**Key Contributions**:

1. **Hamiltonian Market Maker (HMM)**
   - Oracle-minimal pricing for heterogeneous compute resources
   - Multi-asset support with continuous-time price dynamics
   - Provably stable via convex Hamiltonian invariant
   - Split fee structure (market + risk fees)

2. **Proof of AI (PoAI)**
   - Consensus extension for verifiable inference/training work
   - TEE-anchored attestations with Merkle commitments
   - Optional ZK proofs for compute verification
   - Slashing mechanism for fraudulent attestations

3. **Training-Free GRPO (TF-GRPO)**
   - Bayesian product-of-experts (PoE) decoding
   - Token/embedding-level experiential priors
   - Zero-training adaptation across models
   - Active Semantic Optimization (ASO)

4. **1-Bit Semantic Compression**
   - BitDelta-inspired sign compression
   - 29.5× storage savings
   - Multi-tenant serving efficiency
   - Per-matrix scale distillation

5. **Token Economics ($AI)**
   - Protocol token for staking, fees, rewards
   - Compute credits minted by locking $AI
   - PoAI bonus rewards for verified work
   - Fee burns to offset emissions

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
make                  # Build all PDFs (auto-detects native/Docker)
make clean            # Remove intermediate files
make distclean        # Remove all generated files including PDFs
make rebuild          # Clean and rebuild
make view             # Open PDF (macOS)
make install-latex    # Install BasicTeX via Homebrew (macOS)
make help             # Show all targets
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
├── BUILD_INSTRUCTIONS.md            # Detailed build guide
├── Makefile                         # Build automation
├── .gitignore                       # LaTeX artifacts
├── hanzo-network-whitepaper.tex     # Hanzo Network source
├── hanzo-network-whitepaper.pdf     # Hanzo Network PDF
└── [future papers...]
```

## Citation

If you use Hanzo Network in your research, please cite:

```bibtex
@techreport{hanzo2025network,
  title={Hanzo Network: A Hamiltonian Market Maker Layer-1 for Decentralized AI Compute and Semantic Learning},
  author={Hanzo Industries Inc.},
  year={2025},
  month={October},
  institution={Hanzo Industries Inc.},
  address={995 Market St, San Francisco, CA},
  url={https://github.com/hanzoai/papers}
}
```

## Related Projects

- **Hanzo Node**: https://github.com/hanzoai/hanzo (Rust blockchain implementation)
- **Agent SDK**: https://github.com/hanzoai/agent (Python multi-agent framework)
- **MCP Tools**: https://github.com/hanzoai/mcp (Model Context Protocol)
- **Jin**: Multimodal LLM architecture (text/vision/audio/3D)

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
**Co-developed by**: Hanzo AI Inc (Techstars '24) & Zoo Labs Foundation (501c3)

Zen AI is a comprehensive family of ultra-efficient language models serving as the **base underlying frontier models** for both Hanzo AI and Zoo Labs ecosystems. All models are based on Qwen3 architectures with innovative optimizations.

- **Main Whitepaper**: [ZEN_WHITEPAPER_2025.md](https://github.com/zenlm/papers/blob/main/ZEN_WHITEPAPER_2025.md) (v1.0.1)
  - Complete Zen ecosystem: 600M to 480B parameters
  - 95% reduction in energy consumption
  - Recursive AI Self-Improvement System (RAIS)
  - Partnership: Hanzo AI (Techstars '24) & Zoo Labs Foundation

- **Model Documentation**: Visit https://github.com/zenlm/papers for:
  - Core Models: Nano, Eco, Coder, Omni, Next, Guard
  - Specialized Models: Artist, Designer, Scribe, Director, and more
  - Architecture papers and technical specifications
  - Deployment guides and optimization strategies

