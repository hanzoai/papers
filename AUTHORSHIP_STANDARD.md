# Authorship Standards for Hanzo Ecosystem Papers

## Overview

All research papers across Hanzo, Lux, Zoo, and Zen should follow consistent authorship attribution. Hanzo Industries Inc is the parent holding company (Techstars '17), with subsidiary organizations as co-authors where appropriate.

## Primary Author

**Zach Kelling** - Founder & CEO, Hanzo Industries Inc
- Email: zach@hanzo.ai
- ORCID: [Add ORCID]
- GitHub: @zeekay

## Institutional Authors

### Hanzo Papers (AI Infrastructure)
```latex
\author{
    Zach Kelling\thanks{Corresponding author: research@hanzo.ai} \\
    \textit{Hanzo Industries Inc (Techstars '17)} \\
    Los Angeles, California \\
    \texttt{https://hanzo.ai}
}
```

### Lux Papers (Blockchain/Crypto)
```latex
\author{
    Zach Kelling\thanks{Corresponding author: research@lux.network} \\
    \textit{Lux Partners} \\
    \textit{A subsidiary of Hanzo Industries Inc} \\
    \texttt{https://lux.network}
}
```

### Zoo Papers (Open AI Research)
```latex
\author{
    Zach Kelling\thanks{Corresponding author: research@zoo.ngo} \\
    \textit{Zoo Labs Foundation} \\
    \textit{A 501(c)(3) non-profit, in partnership with Hanzo Industries Inc} \\
    \texttt{https://zoo.ngo}
}
```

### Zen Papers (Language Models)
```latex
\author{
    Zach Kelling\thanks{Corresponding author: research@hanzo.ai} \\
    \textit{Zen LM} \\
    \textit{In collaboration with Hanzo Industries Inc \& Zoo Labs Foundation} \\
    \texttt{https://zenlm.ai} \quad \texttt{https://huggingface.co/zenlm}
}
```

## Multi-Organization Papers

For papers spanning multiple organizations:

```latex
\author{
    Zach Kelling\textsuperscript{1,2,3}\thanks{Corresponding author: research@hanzo.ai} \\
    \\
    \textsuperscript{1}\textit{Hanzo Industries Inc (Techstars '17), Los Angeles, CA} \\
    \textsuperscript{2}\textit{Lux Partners, \texttt{research@lux.network}} \\
    \textsuperscript{3}\textit{Zoo Labs Foundation (501(c)(3)), \texttt{research@zoo.ngo}}
}
```

## Contact Emails

| Organization | Research Email | Website |
|-------------|----------------|---------|
| Hanzo Industries | research@hanzo.ai | hanzo.ai |
| Hanzo AI (subsidiary) | research@hanzo.ai | hanzo.ai |
| Lux Partners | research@lux.network | lux.network |
| Zoo Labs Foundation | research@zoo.ngo | zoo.ngo |
| Zen LM | research@hanzo.ai | zenlm.ai |

## History

- **2014**: Verus Media founded (predecessor)
- **2016**: Hanzo Industries Inc incorporated
- **2017**: Techstars Boulder accelerator
- **2022**: Lux Network launch
- **2023**: Zoo Labs Foundation 501(c)(3) established
- **2024-2025**: Zen LM model family development

## Paper Categories

### Hanzo Papers (5)
- hanzo-aso.tex - Active Semantic Optimization
- hanzo-dso.tex - Decentralized Semantic Optimization
- hanzo-hmm.tex - Hamiltonian Market Maker
- hanzo-network-architecture.tex - Network Architecture
- hanzo-network-whitepaper.tex - Network Whitepaper

### Lux Papers (24)
- Consensus protocols (Wave, Focus, Quasar, FPC)
- Chain architectures (A-Chain, G-Chain, M-Chain, Z-Chain)
- Post-quantum cryptography (ETHFALCON, NTT, Ringtail)
- DeFi protocols (DEX, Credit, Oracle, Perpetuals)
- Identity (IAM, DID)
- Governance (DAO)

### Zoo Papers (8)
- Foundation mission
- Network architecture
- Tokenomics
- Gym training platform
- HLLM with Training-Free GRPO
- Experience Ledger & DSO
- Zen-Reranker (ZIP-002)

### Zen Papers (22)
- Model family overview
- Individual model whitepapers (Nano, Eco, Coder, Omni, Next, Guard, etc.)
- Specialized models (3D, Video, Audio, Agent)
