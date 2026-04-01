# Zen AI Model Family

**Repository**: https://github.com/zenlm/papers  
**Organization**: ZenLM  
**Co-developed by**: Hanzo AI Inc (Techstars '17) & Zoo Labs Foundation (501c3)

Zen AI is a comprehensive family of ultra-efficient language models that serve as the **base underlying frontier models** for both Hanzo AI and Zoo Labs projects. All models are based on Qwen3 architectures with innovative optimizations.

## Main Documentation

- **Main Whitepaper**: [ZEN_WHITEPAPER_2025.md](https://github.com/zenlm/papers/blob/main/ZEN_WHITEPAPER_2025.md) (v1.0.1)
  - Technical overview of complete Zen ecosystem
  - 600M to 480B parameter models
  - 95% reduction in energy consumption
  - Recursive AI Self-Improvement System (RAIS) with 94% effectiveness

## Model Papers

Visit https://github.com/zenlm/papers for complete documentation including:

- **Core Models**: Nano (600M edge), Eco (balanced), Coder (code gen), Omni (multimodal), Next (MoE), Guard (safety)
- **Specialized Models**: Artist, Designer-Instruct, Designer-Thinking, Scribe, Director, and more
- **Architecture Overview**: zen_family_overview.tex

All Zen models leverage Qwen3 base architectures with:
- Grouped Query Attention (GQA) - 75-87.5% KV cache reduction
- SwiGLU Activation - 10-15% improvement over ReLU
- RMSNorm - 20% faster than LayerNorm
- RoPE - Contexts up to 128K tokens
- Mixture of Experts (MoE) - Up to 96.25% parameter efficiency
