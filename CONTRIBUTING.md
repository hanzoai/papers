# Contributing to Hanzo papers — claims policy

1. **Authors.** Real people only. Standard line: `Zach Kelling, Hanzo AI Research`. No placeholder or pseudonymous names.
2. **Base models.** Every fine-tuned model paper states its upstream base model and license (match the Hugging Face `base_model` field) and does not imply training from scratch.
3. **Numbers need evidence.** Any benchmark figure must link to a reproducible artifact (eval harness + config + raw outputs/logs, commit SHA). Otherwise label it `internal, unverified, pending reproducible eval` or remove it.
4. **No superlatives** ("highest-performing", "state of the art", "AGI") without a comparison table against named baselines under identical settings.
5. **Consistency.** The same model/benchmark must report the same number across papers, model cards and the website; conflicts are flagged until resolved.
6. **Bibliography.** Every paper ships a `.bib` file (a stub with at least the base model, eval benchmarks and prior work is required) and cites it.
7. Use `templates/PAPER_TEMPLATE.tex`.
