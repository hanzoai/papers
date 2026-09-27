import gzip, json, os, collections, random, statistics as st
exec(open("typed.py").read().split("best = []")[0])  # reuse loaders and helpers
def full(state):
    v = parse(state)
    return grams(json.dumps(v, sort_keys=True) if not isinstance(v, str) else v)
hf = [full(r[0]) for r in H]
tf = [full(r["state"]) for r in train]
def tlabels(r):
    g = json.loads(r["gold"]) if isinstance(r["gold"], str) else r["gold"]
    return {k: str(v.get("label")).lower() for k, v in g.items()}
def hlabels(h):
    out = {}
    for k, q in h[1].items():
        i = h[2][k]["idx"]
        if q["type"] == "choice": out[k] = str(list(q["criteria"].keys())[i]).lower()
        elif q["type"] == "noul": out[k] = "true" if i == 1 else "false"
        else: out[k] = str(i)
    return out
TL = [tlabels(r) for r in train]; HL = [hlabels(h) for h in H]
def agree(a, b):
    ks = set(a) & set(b)
    return sum(a[k] == b[k] for k in ks) / max(1, len(ks)), all(a[k] == b[k] for k in ks) and len(ks) > 0
rows = []
for i in range(len(train)):
    bl, jl = max((jac(tp[i][0], hp[j][0]), j) for j in range(len(H)))
    bf, jf = max((jac(tf[i], hf[j]), j) for j in range(len(H)))
    same = any(json.dumps(parse(train[i]["state"]), sort_keys=True) == json.dumps(parse(H[j][0]), sort_keys=True) for j in range(len(H)))
    rows.append((bl, jl, bf, jf, same))
near = [r for r in rows if r[0] >= 0.5]
print("train rows", len(rows), "| string-leaf Jaccard >= 0.5 (barrier measure):", len(near))
print("identical full state (keys, numbers, strings) to a test item:", sum(r[4] for r in rows))
fj = sorted(r[2] for r in near)
print("of those, best full-state Jaccard (numbers included): median %.3f p90 %.3f max %.3f; >=0.9: %d, >=0.8: %d" % (st.median(fj), fj[int(.9*len(fj))], fj[-1], sum(x >= .9 for x in fj), sum(x >= .8 for x in fj)))
ag = [agree(TL[i], HL[r[1]]) for i, r in enumerate(rows) if r[0] >= 0.5]
print("label agreement, near pair (train vs its nearest test item): mean per-question %.3f, all questions equal %d/%d" % (st.mean(a for a, _ in ag), sum(b for _, b in ag), len(ag)))
rng = random.Random(3)
byw = collections.defaultdict(list)
for j, w in enumerate(hw): byw[w].append(j)
base = []
for i in range(len(train)):
    js = byw[tw[i]]
    for _ in range(5): base.append(agree(TL[i], HL[rng.choice(js)]))
print("label agreement, random same-workflow train/test pair: mean per-question %.3f, all equal %.3f" % (st.mean(a for a, _ in base), st.mean(b for _, b in base)))
for lo, hi in [(0.5, 0.6), (0.6, 0.7), (0.7, 0.8), (0.8, 0.9), (0.9, 1.01)]:
    sel = [(i, r) for i, r in enumerate(rows) if lo <= r[0] < hi]
    if not sel: continue
    a = [agree(TL[i], HL[r[1]]) for i, r in sel]
    print("  leaf Jaccard [%.1f,%.1f): %4d rows, full-state Jaccard median %.3f, label agreement %.3f, all-equal %d" % (lo, hi, len(sel), st.median(r[2] for _, r in sel), st.mean(x for x, _ in a), sum(b for _, b in a)))
print("by workflow (near rows / train rows):", {w: (sum(1 for i, r in enumerate(rows) if r[0] >= .5 and tw[i] == w), tw.count(w)) for w in sorted(set(tw))})
def show(i):
    bl, j, bf, jf, _ = rows[i]
    print("-" * 100)
    print("leaf Jaccard %.3f (full-state %.3f)  train %s (%s)  vs  harness typed_decisions/%d" % (bl, jac(tf[i], hf[j]), train[i]["id"], tw[i], j))
    print("TRAIN:", json.dumps(parse(train[i]["state"]))[:700])
    print("TEST: ", json.dumps(parse(H[j][0]))[:700])
    ks = sorted(set(TL[i]) & set(HL[j]))
    print("gold train:", {k: TL[i][k] for k in ks})
    print("gold test: ", {k: HL[j][k] for k in ks})
order = sorted(range(len(rows)), key=lambda i: -rows[i][0])
shown = set()
for lo in [0.99, 0.9, 0.7, 0.6, 0.5]:
    for i in order:
        if rows[i][0] >= lo and i not in shown and tw[i] not in [tw[k] for k in shown if rows[k][0] >= lo]:
            show(i); shown.add(i); break
# the highest full-state match overall
k = max(range(len(rows)), key=lambda i: rows[i][2]); print("HIGHEST FULL-STATE MATCH"); show(k)
