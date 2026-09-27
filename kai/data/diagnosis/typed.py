import gzip, json, os, collections, random, statistics as st
import pyarrow.parquet as pq
P = os.path.expanduser("~/.cache/huggingface/hub/datasets--LocalLLaMA--typed-decisions/snapshots/d2d524a06124415749828ab818dd80a82fd612f8/all/train/0000.parquet")
train = pq.read_table(P).to_pylist()
print("train rows", len(train), "columns", list(train[0].keys()))
H = json.load(gzip.open("states.json.gz"))["typed_decisions"]
print("harness items", len(H))
def parse(s):
    if isinstance(s, str):
        try:
            v = json.loads(s)
            if isinstance(v, (dict, list)): return v
        except Exception: pass
    return s
def leaves(v, out):
    if isinstance(v, str): out.append(v)
    elif isinstance(v, list):
        for x in v: leaves(x, out)
    elif isinstance(v, dict):
        for x in v.values(): leaves(x, out)
def passages(state):
    ls = []; leaves(parse(state), ls)
    out = [" ".join(ls)]
    if len(ls) > 1: out += [l for l in ls if len(l) >= 200]
    return out
def normal(s):
    out = []; gap = False
    for c in s:
        if c.isalnum():
            if gap and out: out.append(" ")
            gap = False; out.append(c.lower())
        else: gap = True
    return "".join(out)
def grams(s, n=5):
    s = normal(s); return {s[i:i+n] for i in range(len(s) - n + 1)}
def jac(a, b): return len(a & b) / max(1, len(a | b))
hp = [[grams(p) for p in passages(r[0])] for r in H]
hw = [r[2].get("_wf") for r in H]
tp = [[grams(p) for p in passages(r["state"])] for r in train]
tw = [r.get("workflow") for r in train]
best = []
for i, ps in enumerate(tp):
    b = (0.0, -1)
    for j, qs in enumerate(hp):
        m = max(jac(p, q) for p in ps for q in qs if len(p) >= 1 and len(q) >= 1) if ps and qs else 0
        if m > b[0]: b = (m, j)
    best.append(b)
ms = [b[0] for b in best]
print("train rows with best exact Jaccard >= t:", {t: sum(m >= t for m in ms) for t in [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 0.99, 1.0]})
print("same workflow for >=0.5:", collections.Counter(tw[i] == hw[b[1]] for i, b in enumerate(best) if b[0] >= 0.5))
# baseline: harness vs harness, same workflow, distinct items
rng = random.Random(1)
byw = collections.defaultdict(list)
for j, w in enumerate(hw): byw[w].append(j)
base = []
for w, js in byw.items():
    for _ in range(300):
        a, b = rng.sample(js, 2); base.append(jac(hp[a][0], hp[b][0]))
base.sort()
print("harness-vs-harness same-workflow random pairs: median %.3f p90 %.3f p99 %.3f max %.3f; share >=0.5 %.3f" % (st.median(base), base[int(.9*len(base))], base[int(.99*len(base))], base[-1], sum(x >= .5 for x in base)/len(base)))
# nearest harness neighbour of each harness item (other than itself)
nn = []
for a in range(len(hp)):
    nn.append(max(jac(hp[a][0], hp[b][0]) for b in range(len(hp)) if b != a))
print("harness items whose nearest other harness item >= 0.5:", sum(x >= .5 for x in nn), "of", len(nn), "median nn %.3f" % st.median(nn))
json.dump({"best": best, "tw": tw, "hw": hw}, open("typed_best.json", "w"))
def gold(g):
    g = json.loads(g) if isinstance(g, str) else g
    return {k: v.get("label") for k, v in g.items()}
def show(i):
    m, j = best[i]
    t = train[i]; h = H[j]
    print("=" * 100)
    print("measure %.3f  train row %d (workflow %s)  vs  harness typed_decisions/%d (workflow %s)" % (m, i, tw[i], j, hw[j]))
    print("TRAIN state:", (t["state"] if isinstance(t["state"], str) else json.dumps(t["state"]))[:900])
    print("TEST  state:", json.dumps(h[0])[:900] if not isinstance(h[0], str) else h[0][:900])
    tq = json.loads(t["questions"]); hq = h[1]
    print("questions equal:", sorted(tq) == sorted(hq), "| train q:", sorted(tq)[:6], "| test q:", sorted(hq)[:6])
    tg = gold(t["gold"]); hg = {k: v.get("idx") for k, v in h[2].items() if k != "_wf"}
    common = sorted(set(tg) & set(hg))
    print("train gold:", {k: tg[k] for k in common}, "| test gold idx:", {k: hg[k] for k in common})
order = sorted(range(len(best)), key=lambda i: -best[i][0])
picks = [order[0], order[1]]
for t in [0.9, 0.8, 0.7, 0.6, 0.5]:
    c = [i for i in order if best[i][0] >= t and best[i][0] < t + 0.02]
    if c: picks.append(c[0])
for i in picks: show(i)
