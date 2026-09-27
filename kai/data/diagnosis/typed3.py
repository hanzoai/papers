# Test side of typed.py: harness typed-decisions items with a train sibling at string-leaf
# 5-gram Jaccard >= 0.5 (the barrier's measure), by workflow.
import collections
exec(open("typed.py").read().split("best = []")[0])
near = [max((max(jac(p, q) for p in ps for q in qs) if ps and qs else 0) for ps in tp) for qs in hp]
n = sum(m >= 0.5 for m in near)
print("harness items with a train row at leaf Jaccard >= 0.5: %d of %d" % (n, len(H)))
print("by workflow:", {w: (sum(1 for j in range(len(H)) if hw[j] == w and near[j] >= 0.5), hw.count(w)) for w in sorted(set(hw))})
