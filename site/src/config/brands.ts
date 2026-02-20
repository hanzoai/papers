export type Brand = 'hanzo' | 'zoo' | 'zen' | 'lux'

export interface BrandConfig {
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

export const brandConfigs: Record<Brand, BrandConfig> = {
  hanzo: {
    name: 'Hanzo AI',
    fullName: 'Hanzo AI Inc (Techstars \'17)',
    description: 'AI compute infrastructure and market mechanisms for decentralized AI workloads',
    website: 'https://hanzo.ai',
    github: 'https://github.com/hanzoai',
    primaryColor: '#FF6B35',
    secondaryColor: '#004E89',
    accentColor: '#00D9FF',
    logo: '/logos/hanzo-logo.svg',
    papers: [
      {
        id: 'hmm',
        title: 'Hamiltonian Market Maker (HMM)',
        subtitle: 'Oracle-Minimal Pricing for AI Compute Marketplace',
        abstract: 'A novel AMM design for heterogeneous compute resources with provably-stable pricing via Hamiltonian invariants. Enables oracle-minimal economic settlement for AI inference and training workloads.',
        pdfUrl: 'https://github.com/hanzoai/papers/raw/main/hanzo-hmm.pdf',
        latexUrl: 'https://github.com/hanzoai/papers/blob/main/hanzo-hmm.tex',
        githubUrl: 'https://github.com/hanzoai/papers',
        date: '2024-10-28',
        authors: ['Hanzo AI Research'],
        tags: ['Economics', 'DeFi', 'Compute Marketplace', 'AMM'],
        relatedLinks: [
          { label: 'HIP-004 Specification', url: 'https://github.com/hanzoai/papers/blob/main/hips/HIP-004-hmm.md' },
          { label: 'Hanzo Network', url: 'https://hanzo.ai' },
        ],
      },
      {
        id: 'aso',
        title: 'Active Semantic Optimization (ASO)',
        subtitle: 'Training-Free GRPO for Single-Agent Adaptation',
        abstract: 'Training-free adaptation via Bayesian product-of-experts (PoE) decoding with token/embedding-level experiential priors. Foundation for Zoo\'s DSO multi-agent coordination.',
        pdfUrl: 'https://github.com/hanzoai/papers/raw/main/hanzo-aso.pdf',
        latexUrl: 'https://github.com/hanzoai/papers/blob/main/hanzo-aso.tex',
        githubUrl: 'https://github.com/hanzoai/papers',
        date: '2024-06-15',
        authors: ['Hanzo AI Research'],
        tags: ['Machine Learning', 'LLMs', 'Active Learning', 'GRPO'],
        relatedLinks: [
          { label: 'HIP-002 Specification', url: 'https://github.com/hanzoai/papers/blob/main/hips/HIP-002-aso.md' },
          { label: 'Zoo DSO (builds on ASO)', url: 'https://github.com/zooai/papers' },
        ],
      },
      {
        id: 'network',
        title: 'Hanzo Network Whitepaper',
        subtitle: 'L1 Blockchain for Decentralized AI Compute',
        abstract: 'Comprehensive whitepaper describing Hanzo Network\'s Layer-1 blockchain infrastructure, integrating HMM for compute pricing and supporting PoAI consensus for quality verification.',
        pdfUrl: 'https://github.com/hanzoai/papers/raw/main/hanzo-network-whitepaper.pdf',
        latexUrl: 'https://github.com/hanzoai/papers/blob/main/hanzo-network-whitepaper.tex',
        githubUrl: 'https://github.com/hanzoai/papers',
        date: '2024-10-20',
        authors: ['Hanzo AI Team'],
        tags: ['Blockchain', 'Infrastructure', 'Network', 'Architecture'],
        relatedLinks: [
          { label: 'Hanzo Network', url: 'https://hanzo.ai' },
          { label: 'GitHub', url: 'https://github.com/hanzoai' },
        ],
      },
    ],
  },
  zoo: {
    name: 'Zoo Labs',
    fullName: 'Zoo Labs Foundation (501c3)',
    description: 'Democratizing AI through decentralized training and open source frontier models',
    website: 'https://zoo.ngo',
    github: 'https://github.com/zooai',
    primaryColor: '#2ECC71',
    secondaryColor: '#27AE60',
    accentColor: '#F39C12',
    logo: '/logos/zoo-logo.svg',
    papers: [
      {
        id: 'dso',
        title: 'Decentralized Semantic Optimization (DSO)',
        subtitle: 'Byzantine-Robust Prior Aggregation for Collective Intelligence',
        abstract: 'A decentralized protocol for aggregating AI model priors with Byzantine fault tolerance, enabling collective intelligence at network scale. Builds on Hanzo\'s ASO with multi-agent coordination.',
        pdfUrl: 'https://github.com/zooai/papers/raw/main/zoo-dso.pdf',
        latexUrl: 'https://github.com/zooai/papers/blob/main/zoo-dso.tex',
        githubUrl: 'https://github.com/zooai/papers',
        date: '2024-10-28',
        authors: ['Zoo Labs Foundation'],
        tags: ['Machine Learning', 'Multi-Agent', 'Byzantine Fault Tolerance', 'Collective Intelligence'],
        relatedLinks: [
          { label: 'ZIP-001 Specification', url: 'https://github.com/zooai/zips/blob/main/ZIP-001-dso.md' },
          { label: 'Hanzo ASO (foundation)', url: 'https://github.com/hanzoai/papers' },
        ],
      },
      {
        id: 'genesis',
        title: 'Zoo Labs Genesis Paper',
        subtitle: 'AI-Powered Asset-Backed NFTs and Agent Wallets (October 2021)',
        abstract: 'The foundational whitepaper establishing Zoo Labs as one of the first AI-powered NFT ecosystems. Each NFT represents an autonomous AI agent with its own crypto wallet. Launched October 2021 as 100% airdrop to CryptoZoo users.',
        pdfUrl: 'https://github.com/zooai/papers/raw/main/zoo-genesis-whitepaper.md',
        githubUrl: 'https://github.com/zooai/papers',
        date: '2021-10-01',
        authors: ['Zoo Labs Foundation'],
        tags: ['NFT', 'AI Agents', 'Game-Fi', 'Genesis', 'Historical'],
        relatedLinks: [
          { label: 'ZIP-003 Documentation', url: 'https://github.com/zooai/zips/blob/main/ZIP-003-genesis.md' },
          { label: 'Zoo Website', url: 'https://zoo.ngo' },
          { label: 'AI Chat', url: 'https://ai.zoo.ngo' },
        ],
      },
    ],
  },
  zen: {
    name: 'Zen AI',
    fullName: 'Zen AI Model Family',
    description: 'Ultra-efficient frontier language models (600M-480B parameters) co-developed by Hanzo AI and Zoo Labs',
    website: 'https://zenlm.ai',
    github: 'https://github.com/zenlm',
    primaryColor: '#9B59B6',
    secondaryColor: '#8E44AD',
    accentColor: '#E74C3C',
    logo: '/logos/zen-logo.svg',
    papers: [
      {
        id: 'whitepaper',
        title: 'Zen AI Whitepaper v1.0.1',
        subtitle: 'Ultra-Efficient Frontier Language Models',
        abstract: 'Complete Zen ecosystem documentation covering 600M to 480B parameter models with 95% reduction in energy consumption, RAIS achieving 94% effectiveness, and edge deployment capabilities.',
        pdfUrl: 'https://github.com/zenlm/papers/raw/main/ZEN_WHITEPAPER_2025.md',
        githubUrl: 'https://github.com/zenlm/papers',
        date: '2025-01-15',
        authors: ['Hanzo AI Inc', 'Zoo Labs Foundation'],
        tags: ['LLMs', 'Efficiency', 'Edge Computing', 'Model Architecture'],
        relatedLinks: [
          { label: 'Model Hub', url: 'https://huggingface.co/zenlm' },
          { label: 'Documentation', url: 'https://zenlm.ai' },
        ],
      },
    ],
  },
  lux: {
    name: 'Lux',
    fullName: 'Lux Network',
    description: 'Post-quantum secure, high-performance blockchain infrastructure - Layer-0 for Hanzo (AI Compute) and Zoo (AI/ML Specialization)',
    website: 'https://lux.network',
    github: 'https://github.com/luxfi',
    primaryColor: '#3498DB',
    secondaryColor: '#2980B9',
    accentColor: '#E67E22',
    logo: '/logos/lux-logo.svg',
    papers: [
      // Foundation & Consensus
      {
        id: 'quantum-consensus',
        title: 'Quantum Consensus',
        subtitle: 'Post-Quantum Cryptography with Dilithium Signatures',
        abstract: 'Implementation of NIST-standardized Dilithium post-quantum signatures for validator consensus, ensuring security against quantum computer attacks.',
        pdfUrl: 'https://github.com/luxfi/papers/raw/main/pdfs/lux-quantum-consensus.pdf',
        latexUrl: 'https://github.com/luxfi/papers/blob/main/lux-quantum-consensus.tex',
        githubUrl: 'https://github.com/luxfi/papers',
        date: '2024-06-01',
        authors: ['Lux Partners'],
        tags: ['Consensus', 'Post-Quantum', 'Cryptography', 'Dilithium'],
      },
      {
        id: 'quasar-consensus',
        title: 'Quasar Consensus',
        subtitle: 'Dual-Certificate Quantum-Secure Finality (BLS + Ringtail)',
        abstract: 'Novel consensus mechanism combining BLS signatures with post-quantum Ringtail signatures for quantum-safe finality with efficient verification.',
        pdfUrl: 'https://github.com/luxfi/papers/raw/main/pdfs/lux-quasar-consensus.pdf',
        latexUrl: 'https://github.com/luxfi/papers/blob/main/lux-quasar-consensus.tex',
        githubUrl: 'https://github.com/luxfi/papers',
        date: '2024-09-01',
        authors: ['Lux Partners'],
        tags: ['Consensus', 'Post-Quantum', 'BLS', 'Ringtail', 'Finality'],
      },
      {
        id: 'fpc-consensus',
        title: 'FPC Consensus',
        subtitle: 'Fast Probabilistic Consensus with Adaptive Thresholds',
        abstract: 'High-throughput probabilistic consensus protocol with adaptive security thresholds and sub-second finality for optimal performance.',
        pdfUrl: 'https://github.com/luxfi/papers/raw/main/pdfs/lux-fpc-consensus.pdf',
        latexUrl: 'https://github.com/luxfi/papers/blob/main/lux-fpc-consensus.tex',
        githubUrl: 'https://github.com/luxfi/papers',
        date: '2024-12-01',
        authors: ['Lux Partners'],
        tags: ['Consensus', 'Performance', 'Probabilistic', 'Low-Latency'],
      },
      // Chain Architecture
      {
        id: 'achain',
        title: 'A-Chain: Attestation Chain',
        subtitle: 'TEE Attestation & AI Compute Verification',
        abstract: 'Trusted Execution Environment attestation chain supporting Intel SGX, AMD SEV-SNP, NVIDIA H100 CC, and ARM CCA for verifiable AI compute.',
        pdfUrl: 'https://github.com/luxfi/papers/raw/main/pdfs/lux-achain-attestation.pdf',
        latexUrl: 'https://github.com/luxfi/papers/blob/main/lux-achain-attestation.tex',
        githubUrl: 'https://github.com/luxfi/papers',
        date: '2024-10-01',
        authors: ['Lux Partners'],
        tags: ['TEE', 'Attestation', 'AI Compute', 'SGX', 'SEV-SNP', 'H100'],
      },
      {
        id: 'gchain',
        title: 'G-Chain: GraphQL Chain',
        subtitle: 'Universal GraphQL Query Engine with BadgerDB',
        abstract: 'High-performance query layer with GraphQL API and BadgerDB storage for efficient blockchain data access and indexing.',
        pdfUrl: 'https://github.com/luxfi/papers/raw/main/pdfs/lux-gchain-graphql.pdf',
        latexUrl: 'https://github.com/luxfi/papers/blob/main/lux-gchain-graphql.tex',
        githubUrl: 'https://github.com/luxfi/papers',
        date: '2024-08-01',
        authors: ['Lux Partners'],
        tags: ['GraphQL', 'Indexing', 'BadgerDB', 'Query Engine'],
      },
      {
        id: 'mchain',
        title: 'M-Chain: MPC Chain',
        subtitle: 'MPC Threshold Custody (CGG21, MuSig2, FROST, Ringtail)',
        abstract: 'Multi-party computation chain for threshold custody supporting multiple protocols including post-quantum Ringtail signatures.',
        pdfUrl: 'https://github.com/luxfi/papers/raw/main/pdfs/lux-mchain-mpc.pdf',
        latexUrl: 'https://github.com/luxfi/papers/blob/main/lux-mchain-mpc.tex',
        githubUrl: 'https://github.com/luxfi/papers',
        date: '2024-09-15',
        authors: ['Lux Partners'],
        tags: ['MPC', 'Threshold Signatures', 'CGG21', 'MuSig2', 'FROST'],
      },
      {
        id: 'zchain',
        title: 'Z-Chain: Zero-Knowledge Chain',
        subtitle: 'Privacy-Preserving Smart Contracts (zkEVM, FHE, TEE)',
        abstract: 'Privacy layer combining zkEVM, fully homomorphic encryption, and trusted execution environments for confidential smart contracts.',
        pdfUrl: 'https://github.com/luxfi/papers/raw/main/pdfs/lux-zchain.pdf',
        latexUrl: 'https://github.com/luxfi/papers/blob/main/lux-zchain.tex',
        githubUrl: 'https://github.com/luxfi/papers',
        date: '2024-11-01',
        authors: ['Lux Partners'],
        tags: ['Privacy', 'zkEVM', 'FHE', 'TEE', 'Smart Contracts'],
      },
      // Cross-Chain
      {
        id: 'bridge',
        title: 'Lux Bridge',
        subtitle: 'Cross-Chain with ZK Light Clients & IBC Integration',
        abstract: 'Trustless cross-chain bridge using zero-knowledge light clients and IBC protocol for interoperability with Cosmos and Ethereum.',
        pdfUrl: 'https://github.com/luxfi/papers/raw/main/pdfs/lux-bridge.pdf',
        latexUrl: 'https://github.com/luxfi/papers/blob/main/lux-bridge.tex',
        githubUrl: 'https://github.com/luxfi/papers',
        date: '2024-07-01',
        authors: ['Lux Partners'],
        tags: ['Bridge', 'IBC', 'Zero-Knowledge', 'Interoperability'],
      },
      // DeFi Protocols
      {
        id: 'lightspeed-dex',
        title: 'Lightspeed DEX',
        subtitle: 'HFT-Optimized DEX with 261ms Latency & FPGA Matching',
        abstract: 'Ultra-low latency decentralized exchange with FPGA-accelerated order matching achieving institutional-grade performance.',
        pdfUrl: 'https://github.com/luxfi/papers/raw/main/pdfs/lux-lightspeed-dex.pdf',
        latexUrl: 'https://github.com/luxfi/papers/blob/main/lux-lightspeed-dex.tex',
        githubUrl: 'https://github.com/luxfi/papers',
        date: '2024-05-01',
        authors: ['Lux Partners'],
        tags: ['DeFi', 'DEX', 'HFT', 'FPGA', 'Low-Latency'],
      },
      {
        id: 'credit',
        title: 'Lux Credit',
        subtitle: 'Self-Repaying Lending with 90% LTV & 11% APY',
        abstract: 'Novel lending protocol with self-repaying mechanism, high loan-to-value ratios, and attractive yields on LUX staking.',
        pdfUrl: 'https://github.com/luxfi/papers/raw/main/pdfs/lux-credit-lending.pdf',
        latexUrl: 'https://github.com/luxfi/papers/blob/main/lux-credit-lending.tex',
        githubUrl: 'https://github.com/luxfi/papers',
        date: '2024-08-15',
        authors: ['Lux Partners'],
        tags: ['DeFi', 'Lending', 'Credit', 'Self-Repaying'],
      },
      {
        id: 'oracle',
        title: 'Oracle Infrastructure',
        subtitle: 'AI Oracle (LP-106) + Traditional Price Feeds',
        abstract: 'Hybrid oracle system combining AI-powered LP-106 protocol with Chainlink and Pyth for reliable price feeds.',
        pdfUrl: 'https://github.com/luxfi/papers/raw/main/pdfs/lux-oracle-infrastructure.pdf',
        latexUrl: 'https://github.com/luxfi/papers/blob/main/lux-oracle-infrastructure.tex',
        githubUrl: 'https://github.com/luxfi/papers',
        date: '2024-09-01',
        authors: ['Lux Partners'],
        tags: ['Oracle', 'AI', 'Price Feeds', 'Chainlink', 'Pyth'],
      },
      {
        id: 'perpetuals',
        title: 'Perpetuals & Derivatives',
        subtitle: 'GMX2 Integration with Funding Rates & Liquidation Engine',
        abstract: 'Perpetual futures and derivatives platform integrated with GMX v2 architecture for advanced trading capabilities.',
        pdfUrl: 'https://github.com/luxfi/papers/raw/main/pdfs/lux-perpetuals-derivatives.pdf',
        latexUrl: 'https://github.com/luxfi/papers/blob/main/lux-perpetuals-derivatives.tex',
        githubUrl: 'https://github.com/luxfi/papers',
        date: '2024-10-15',
        authors: ['Lux Partners'],
        tags: ['DeFi', 'Perpetuals', 'Derivatives', 'GMX', 'Trading'],
      },
      // Web3 Infrastructure
      {
        id: 'market',
        title: 'Lux.market NFT',
        subtitle: 'NFT Marketplace with Reservoir Aggregation',
        abstract: 'Multi-chain NFT marketplace aggregating liquidity from 14+ chains using Reservoir protocol for optimal pricing.',
        pdfUrl: 'https://github.com/luxfi/papers/raw/main/pdfs/lux-market-nft.pdf',
        latexUrl: 'https://github.com/luxfi/papers/blob/main/lux-market-nft.tex',
        githubUrl: 'https://github.com/luxfi/papers',
        date: '2024-07-15',
        authors: ['Lux Partners'],
        tags: ['NFT', 'Marketplace', 'Reservoir', 'Multi-Chain'],
      },
      {
        id: 'id-iam',
        title: 'Lux ID IAM',
        subtitle: 'Identity & Access Management',
        abstract: 'Enterprise-grade identity and access management supporting OAuth 2.0, OIDC, SAML, WebAuthn, and multi-factor authentication.',
        pdfUrl: 'https://github.com/luxfi/papers/raw/main/pdfs/lux-id-iam.pdf',
        latexUrl: 'https://github.com/luxfi/papers/blob/main/lux-id-iam.tex',
        githubUrl: 'https://github.com/luxfi/papers',
        date: '2024-06-15',
        authors: ['Lux Partners'],
        tags: ['Identity', 'IAM', 'OAuth', 'WebAuthn', 'SSO'],
      },
      {
        id: 'id-did',
        title: 'Lux ID DID Specification',
        subtitle: 'Decentralized Identifiers (did:lux:)',
        abstract: 'W3C-compliant DID specification for Lux Network enabling self-sovereign identity and verifiable credentials.',
        pdfUrl: 'https://github.com/luxfi/papers/raw/main/pdfs/lux-id-did-specification.pdf',
        latexUrl: 'https://github.com/luxfi/papers/blob/main/lux-id-did-specification.tex',
        githubUrl: 'https://github.com/luxfi/papers',
        date: '2024-06-20',
        authors: ['Lux Partners'],
        tags: ['DID', 'Identity', 'W3C', 'Verifiable Credentials'],
      },
      // Governance & DAO
      {
        id: 'governance',
        title: 'Governance & DAO',
        subtitle: 'Multi-Ecosystem DAO (Lux, Zoo, Hanzo)',
        abstract: 'Holographic consensus-based governance spanning Lux, Zoo, and Hanzo ecosystems for unified decision-making.',
        pdfUrl: 'https://github.com/luxfi/papers/raw/main/pdfs/lux-governance-dao.pdf',
        latexUrl: 'https://github.com/luxfi/papers/blob/main/lux-governance-dao.tex',
        githubUrl: 'https://github.com/luxfi/papers',
        date: '2024-08-01',
        authors: ['Lux Partners'],
        tags: ['Governance', 'DAO', 'Holographic Consensus', 'Multi-Ecosystem'],
      },
      {
        id: 'dao-framework',
        title: 'DAO Governance Framework',
        subtitle: 'Azorius Framework with ERC6551 NFT Governance',
        abstract: 'Advanced DAO governance using Azorius framework with ERC6551 token-bound accounts for NFT-based voting.',
        pdfUrl: 'https://github.com/luxfi/papers/raw/main/pdfs/lux-dao-governance-framework.pdf',
        latexUrl: 'https://github.com/luxfi/papers/blob/main/lux-dao-governance-framework.tex',
        githubUrl: 'https://github.com/luxfi/papers',
        date: '2024-08-15',
        authors: ['Lux Partners'],
        tags: ['DAO', 'Governance', 'Azorius', 'ERC6551', 'NFT'],
      },
      // Post-Quantum Innovations
      {
        id: 'ntt',
        title: 'NTT Transform',
        subtitle: '85% Gas Reduction for Post-Quantum Crypto on EVM',
        abstract: 'Number Theoretic Transform optimization for post-quantum algorithms (FALCON, Dilithium, STARKs) achieving massive gas savings.',
        pdfUrl: 'https://github.com/luxfi/papers/raw/main/pdfs/lux-ntt-transform.pdf',
        latexUrl: 'https://github.com/luxfi/papers/blob/main/lux-ntt-transform.tex',
        githubUrl: 'https://github.com/luxfi/papers',
        date: '2024-05-15',
        authors: ['Lux Partners'],
        tags: ['Post-Quantum', 'NTT', 'Gas Optimization', 'EVM'],
      },
      {
        id: 'ethfalcon',
        title: 'ETHFALCON',
        subtitle: 'Post-Quantum FALCON Signatures for Ethereum',
        abstract: 'Optimized implementation of FALCON post-quantum signatures for Ethereum, enabling quantum-safe transactions.',
        pdfUrl: 'https://github.com/luxfi/papers/raw/main/pdfs/lux-ethfalcon-post-quantum.pdf',
        latexUrl: 'https://github.com/luxfi/papers/blob/main/lux-ethfalcon-post-quantum.tex',
        githubUrl: 'https://github.com/luxfi/papers',
        date: '2024-07-01',
        authors: ['Lux Partners'],
        tags: ['Post-Quantum', 'FALCON', 'Ethereum', 'Signatures'],
      },
      {
        id: 'threshold-signatures',
        title: 'Universal Threshold Signatures',
        subtitle: 'Unified Framework (CMP, FROST, LSS, Doerner, Ringtail)',
        abstract: 'Comprehensive threshold signature framework supporting multiple protocols including post-quantum Ringtail.',
        pdfUrl: 'https://github.com/luxfi/papers/raw/main/pdfs/lux-universal-threshold-signatures.pdf',
        latexUrl: 'https://github.com/luxfi/papers/blob/main/lux-universal-threshold-signatures.tex',
        githubUrl: 'https://github.com/luxfi/papers',
        date: '2024-09-01',
        authors: ['Lux Partners'],
        tags: ['Threshold Signatures', 'MPC', 'Post-Quantum', 'CMP', 'FROST'],
      },
      // Scalability & Layer 2
      {
        id: 'verkle',
        title: 'Verkle Trees',
        subtitle: 'Constant-Size Proofs (~150 bytes) for Stateless Clients',
        abstract: 'Implementation of Verkle trees for efficient state proofs enabling stateless client operation with minimal bandwidth.',
        pdfUrl: 'https://github.com/luxfi/papers/raw/main/pdfs/lux-verkle-trees.pdf',
        latexUrl: 'https://github.com/luxfi/papers/blob/main/lux-verkle-trees.tex',
        githubUrl: 'https://github.com/luxfi/papers',
        date: '2024-10-01',
        authors: ['Lux Partners'],
        tags: ['Verkle Trees', 'Scalability', 'Stateless', 'State Proofs'],
      },
      {
        id: 'fraud-proofs',
        title: 'Fraud Proofs',
        subtitle: 'Optimistic Rollups with Interactive Bisection Game',
        abstract: 'Optimistic rollup implementation with efficient fraud proof mechanism using interactive bisection for dispute resolution.',
        pdfUrl: 'https://github.com/luxfi/papers/raw/main/pdfs/lux-fraud-proofs.pdf',
        latexUrl: 'https://github.com/luxfi/papers/blob/main/lux-fraud-proofs.tex',
        githubUrl: 'https://github.com/luxfi/papers',
        date: '2024-11-15',
        authors: ['Lux Partners'],
        tags: ['Layer 2', 'Optimistic Rollups', 'Fraud Proofs', 'Scalability'],
      },
      // Advanced Infrastructure
      {
        id: 'tee-mesh',
        title: 'TEE Computing Mesh',
        subtitle: 'Distributed TEE Network for Confidential Computing',
        abstract: 'Mesh network of trusted execution environments (SGX, SEV-SNP, TDX, CCA) for distributed confidential computing.',
        pdfUrl: 'https://github.com/luxfi/papers/raw/main/pdfs/lux-tee-computing-mesh.pdf',
        latexUrl: 'https://github.com/luxfi/papers/blob/main/lux-tee-computing-mesh.tex',
        githubUrl: 'https://github.com/luxfi/papers',
        date: '2024-12-01',
        authors: ['Lux Partners'],
        tags: ['TEE', 'Confidential Computing', 'SGX', 'SEV-SNP', 'TDX'],
      },
    ],
  },
}

// Get brand from environment or default to hanzo
export function getBrand(): Brand {
  const brand = process.env.NEXT_PUBLIC_BRAND?.toLowerCase()
  if (brand && brand in brandConfigs) {
    return brand as Brand
  }
  return 'hanzo'
}

export function getBrandConfig(brand?: Brand): BrandConfig {
  const b = brand || getBrand()
  return brandConfigs[b]
}
