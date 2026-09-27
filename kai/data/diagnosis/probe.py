# Encoder probe on RAG contexts laid out as Kai lays them: [CLS] prompt [SEP] state [SEP].
# For each checkpoint: (1) how much the passage tokens' final states move when only the query
# changes; (2) attention mass passage->query in the global layers; (3) how alike different
# contexts' mean states are; (4) a logistic probe (5-fold) on [mean passage state, mean query
# state, their product] predicting relevance.
import gzip, json, glob, os, sys, numpy as np, torch
from safetensors.torch import load_file
from transformers import ModernBertConfig, ModernBertModel
from tokenizers import Tokenizer
torch.set_grad_enabled(False)
S = glob.glob(os.path.expanduser("~/.cache/huggingface/hub/models--hanzoai--kai-1-multilingual/snapshots/*/"))[0]
cfgj = json.load(open(S + "encoder/config.json"))
cfg = ModernBertConfig(**{k: v for k, v in cfgj.items() if k not in ("rope_parameters", "layer_types")},
                       global_rope_theta=160000.0, local_rope_theta=160000.0, attn_implementation="eager")
tok = Tokenizer.from_file(S + "tokenizer/tokenizer.json")
tc = json.load(open(S + "tokenizer/tokenizer_config.json"))
cid = lambda k: tok.token_to_id(tc[k] if isinstance(tc[k], str) else tc[k]["content"])
CLS, SEP = cid("cls_token"), cid("sep_token")
ids = lambda s: tok.encode(s, add_special_tokens=False).ids
prompt = ids("noul question: Does `passage` help answer `query`?")
recs = [json.loads(l) for l in gzip.open("validation/in_domain/rag_relevance.microsoft-ms_marco.format.red.0.jsonl.gz", "rt")][:600]
def ctx(q, p):
    head = ids('{"query": ' + json.dumps(q, ensure_ascii=False) + ', "passage": ')
    body = ids(json.dumps(p, ensure_ascii=False) + "}")
    seq = [CLS] + prompt + [SEP] + head + body + [SEP]
    qs = 1 + len(prompt) + 1
    return seq, (qs, qs + len(head)), (qs + len(head), qs + len(head) + len(body))
def model(path):
    w = load_file(path)
    enc = {k[len("encoder."):]: v.float() for k, v in w.items() if k.startswith("encoder.")}
    m = ModernBertModel(cfg); missing, unexpected = m.load_state_dict(enc, strict=False)
    assert not [k for k in missing if "rotary" not in k], missing
    return m.eval()
def run(m, seq):
    out = m(torch.tensor([seq]), attention_mask=torch.ones(1, len(seq), dtype=torch.long), output_attentions=True)
    return out.last_hidden_state[0].numpy(), [a[0].numpy() for a in out.attentions]
ckpts = [(n, p) for n, p in [("laya-init", S + "model.safetensors"), ("rag-only@229", "runs/rag1/model.safetensors"),
                              ("stage-a", "runs/a/model.safetensors"), ("h2run", "runs/h2run/model.safetensors")] if os.path.exists(p)]
N = int(sys.argv[1]) if len(sys.argv) > 1 else 200
for name, path in ckpts:
    m = model(path)
    move, pq, sink, feats, ys, means = [], [], [], [], [], []
    for i, r in enumerate(recs[:N]):
        q, p = r["state"]["query"], r["state"]["passage"]
        q2 = recs[(i + 7) % len(recs)]["state"]["query"]
        s1, (qa, qb), (pa, pb) = ctx(q, p)
        h1, att = run(m, s1)
        s2, _, (pa2, pb2) = ctx(q2, p)
        h2, _ = run(m, s2)
        P1, P2 = h1[pa:pb], h2[pa2:pb2]
        if P1.shape == P2.shape:
            move.append(np.linalg.norm(P1 - P2) / np.linalg.norm(P1))
        g = [a for li, a in enumerate(att) if li % 3 == 0]  # global layers
        pq.append(np.mean([a[:, pa:pb, qa:qb].sum(-1).mean() for a in g]))
        sink.append(np.mean([a[:, :, 0].mean() for a in att]))
        mp, mq = h1[pa:pb].mean(0), h1[qa:qb].mean(0)
        feats.append(np.concatenate([mp, mq, mp * mq])); ys.append(int(r["target"]["relevant"][1] > 0.5))
        means.append(h1[1:-1].mean(0))
    X, y = np.array(feats), np.array(ys)
    X = (X - X.mean(0)) / (X.std(0) + 1e-6)
    from sklearn.linear_model import LogisticRegression
    from sklearn.model_selection import cross_val_score
    acc = cross_val_score(LogisticRegression(C=0.05, max_iter=3000), X, y, cv=5).mean()
    M = np.array(means); M = M / np.linalg.norm(M, axis=1, keepdims=True); cos = (M @ M.T)[np.triu_indices(len(M), 1)].mean()
    print(f"{name:14s} n {len(ys)} | passage states moved by a query swap {np.mean(move):.4f} | global-layer attention passage->query {np.mean(pq):.4f} | attention on token 0 {np.mean(sink):.3f} | mean cos between contexts {cos:.3f} | probe acc {acc:.3f}", flush=True)
