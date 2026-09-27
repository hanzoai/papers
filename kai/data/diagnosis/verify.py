import gzip, json, sys, collections, random, glob, os
import pyarrow.parquet as pq
P = os.path.expanduser("~/.cache/huggingface/hub/datasets--microsoft--ms_marco/snapshots/e1a341766a09425378c367ff0bd6c2c044989537/v1.1/train/0000.parquet")
t = pq.read_table(P, columns=["query", "query_id", "passages"]).to_pylist()
print("parquet rows", len(t))
m = collections.defaultdict(set)   # (query, passage) -> {is_selected}
byq = collections.defaultdict(list)
for r in t:
    q = r["query"]; ps = r["passages"]
    for txt, s in zip(ps["passage_text"], ps["is_selected"]):
        m[(q, txt)].add(s)
    byq[q].append(r)
print("distinct (query,passage)", len(m), "ambiguous", sum(1 for v in m.values() if len(v) > 1))
def target(rec):
    (k,) = rec["target"].keys(); v = rec["target"][k]
    return 1 if v[1] > v[0] else 0
def check(files, sample=None, tag=""):
    recs = []
    for f in files:
        with gzip.open(f, "rt") as fh:
            for l in fh: recs.append(json.loads(l))
    rng = random.Random(7)
    pick = recs if sample is None else rng.sample(recs, sample)
    c = collections.Counter()
    bad = []
    for r in pick:
        q, p = r["state"].get("query"), r["state"].get("passage")
        y = target(r)
        s = m.get((q, p))
        if s is None: c["missing"] += 1; bad.append(("missing", r)); continue
        if len(s) > 1: c["ambiguous"] += 1; continue
        (g,) = s
        c["ok" if g == y else "wrong"] += 1
        if g != y: bad.append(("wrong", r))
        c[("y", y)] += 1
    print(tag, len(recs), "checked", len(pick), dict(c))
    for kind, r in bad[:3]:
        print("  ", kind, json.dumps(r["state"])[:200], r["target"])
    return recs
base = sorted(glob.glob("relevance/rag_relevance.*.gz"))
recs = check(base, 200, "sample200")
recs = check(base, None, "all")
# pairing
byquery = collections.defaultdict(list)
for r in recs: byquery[r["state"]["query"]].append((r["state"]["passage"], target(r)))
pc = collections.Counter()
for q, lst in byquery.items():
    ys = sorted(y for _, y in lst)
    pc[(len(lst), tuple(ys), len(set(p for p, _ in lst)))] += 1
print("per-query shapes (n, ys, distinct passages):", pc.most_common(10))
cls = collections.Counter(target(r) for r in recs); print("class counts", cls)
# adjacency
adj = collections.Counter()
for a, b in zip(recs[::2], recs[1::2]):
    adj[(a["state"]["query"] == b["state"]["query"], target(a), target(b))] += 1
print("adjacent pairs (same query, y_a, y_b):", adj.most_common(6))
for f in ["relevance/robust.microsoft-ms_marco.alias.red.0.jsonl.gz", "relevance/robust.microsoft-ms_marco.swap.red.0.jsonl.gz"]:
    check([f], None, os.path.basename(f))
for f in sorted(glob.glob("validation/*/rag_relevance*.gz")):
    check([f], None, f)
