"""Write results-data.tex from the run artifacts that data/runs.json names.

    python3 scripts/results.py data/runs.json > results-data.tex

Every measured number in the paper is a \\res{key} written here. An artifact that is absent
writes no keys and a comment naming it, so the paper prints XXX where no run has produced a
number. Paths in runs.json expand ~ and $BENCH (default ~/work/hanzo/benchmarks), $DECISION
(~/work/hanzo/decision) and $PAPER (this paper's directory).

Harness numbers are read from the harness's own output, results/scores.json, which
hanzoai/benchmarks decision/harness/merge.py writes with the upstream metric code; nothing here
re-scores a prediction. Plain python3; no dependencies.

Keys:
  kj/harness/...              the question set: suites, states, questions
  kj/<suite>/<who>/<metric>   who: kai, laya (as Laya's router picks), jev, and Laya's
                              checkpoints one, multi, agent; suite as in the harness,
                              lowercased, [a-z0-9] only (jev.ag_news -> agnews)
  kj/massive/<lang>/<who>/... one MASSIVE language; kj/massive/<who>/... their summary
  kj/<suite>/<who>/trained    training overlap: Kai from train/manifest.json, Laya reported
  kj/macro, kj/wins           macro accuracy over the 11 non-MASSIVE suites, suites won
  kj/guard/...                the training data's guard against the harness
  td/<ckpt>/...               upstream's typed-decisions benchmark rerun on Laya's weights
  par/...                     Laya on the native runtime against its Python reference
  cap/<suite>/<who>/<metric>  hanzoai/benchmarks decision/capability, as its files name them
  enso/<study>/<cond>/<metric> Kai controlling Enso; the ladder's study is its workload
"""
import gzip
import json
import os
import re
import sys

PAPER = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault("PAPER", PAPER)
os.environ.setdefault("BENCH", os.path.expanduser("~/work/hanzo/benchmarks"))
os.environ.setdefault("DECISION", os.path.expanduser("~/work/hanzo/decision"))



def path(p):
    return os.path.expanduser(os.path.expandvars(p))


def load(p):
    """JSON at `p` (gzip if .gz), or None with a comment in the output."""
    if not os.path.exists(path(p)):
        print("%% absent: %s" % p)
        return None
    with (gzip.open if p.endswith(".gz") else open)(path(p), "rt") as f:
        return json.load(f)


def tex(s):
    return re.sub(r"([_%&#$])", r"\\\1", str(s))


def num(v, places=3):
    return ("%%.%df" % places) % v


def ms(v):
    return num(v, 0 if v >= 100 else 1 if v >= 10 else 2)


def put(key, value):
    print("\\setres{%s}{%s}" % (key, value))


def name(s):
    """Suite key: jev.ag_news -> agnews, massive.zh-CN -> massive/zhcn."""
    if s.startswith("massive."):
        return "massive/" + re.sub("[^a-z0-9]", "", s[8:].lower())
    return re.sub("[^a-z0-9]", "", s.split(".", 1)[-1].lower())


# ------------------------------------------------------------------ the frozen harness
# scores.json's backends: Kai, Laya as its router picks, each Laya checkpoint, Jev
WHO = {"kai": "kai", "laya": "laya", "jev": "jev",
       "laya:english": "one", "laya:multilingual": "multi", "laya:typed-decisions": "agent"}


def harness(runs):
    """kj/ keys from the harness's own output, results/scores.json (harness/merge.py)."""
    gold = load(runs["gold"])
    if gold is not None:
        put("kj/harness/suites", len(gold))
        put("kj/harness/states", "{:,}".format(sum(len(v) for v in gold.values())))
        put("kj/harness/questions", "{:,}".format(sum(len(qs) for v in gold.values() for _, qs in v)))
        put("kj/harness/languages", sum(1 for s in gold if s.startswith("massive.")))
        for s, rows in gold.items():
            if not s.startswith("massive."):
                k = [len(q.get("criteria") or [0, 0]) for _, qs in rows for q in qs.values()]
                put("kj/%s/options" % name(s), min(k) if min(k) == max(k) else "%d--%d" % (min(k), max(k)))
                put("kj/%s/cases" % name(s), len(rows))
    d = load(runs["scores"])
    if d is None:
        return
    for who, src in d["sources"].items():
        for f, v in src.items():
            if f == "bundle":  # the repository name, not a fact the paper states
                continue
            if f == "revision":
                v = v[:8]
            elif f == "weights":
                v = v[:8]
            elif isinstance(v, list):
                v = ", ".join(v)
            put("kj/%s/%s" % (who, f), tex(v))
    rest = [s for s in d["suites"] if not s.startswith("massive.")]
    acc = {}
    for s, row in d["suites"].items():
        for w, m in row.items():
            if w in WHO and m.get("n"):
                emit(name(s), WHO[w], m)
                acc.setdefault(WHO[w], {})[s] = m["accuracy"]
        for pair, v in (row.get("agreement") or {}).items():
            if v is not None:
                put("kj/%s/agree/%s" % (name(s), pair.replace("~", "")), num(v))
    for w, m in (d.get("massive_summary") or {}).items():
        if w not in WHO:
            continue
        k = "kj/massive/%s/" % WHO[w]
        for f in ("languages", "above_3x_random"):
            put(k + f.replace("_", ""), m[f])
        for f in ("english", "non_english_macro", "macro_accuracy", "macro_ece", "macro_brier", "macro_aurc"):
            if m.get(f) is not None:
                put(k + f.replace("_", ""), num(m[f]))
        if m.get("macro_zero_prob") is not None:
            put(k + "zeropct", num(100 * m["macro_zero_prob"], 1))
    full = {w: a for w, a in acc.items() if w in ("kai", "laya", "jev") and all(s in a for s in rest)}
    for w, a in full.items():
        put("kj/macro/%s/accuracy" % w, num(sum(a[s] for s in rest) / len(rest)))
        for v in full:
            if v != w:
                put("kj/wins/%s/%s" % (w, v), sum(1 for s in rest if a[s] > full[v][s]))
    put("kj/wins/of", len(rest))
    lat = d.get("jev_sequential_latency") or {}
    if lat.get("n"):
        put("kj/jevlat/n", lat["n"])
        put("kj/jevlat/p50", ms(lat["p50_ms"]))
        put("kj/jevlat/p95", ms(lat["p95_ms"]))
    if d.get("jev_total_cost_usd") is not None:
        put("kj/jev/cost", num(d["jev_total_cost_usd"], 2))
    jev = [row["jev"] for row in d["suites"].values() if "jev" in row]
    calls = sum(sum(m.get("served", {}).values()) for m in jev)
    if calls:
        put("kj/jev/calls", "{:,}".format(calls))
        put("kj/jev/costk", num(1000 * sum(m.get("cost_usd", 0) for m in jev) / calls, 3))
        put("kj/jev/errors", sum(m.get("n_errors", 0) for m in jev))


def emit(s, who, m):
    k = "kj/%s/%s/" % (s, who)
    if s.startswith("massive/"):  # a language: its row of the by-language table
        m = {f: m.get(f) for f in ("accuracy", "ece", "brier", "zero_prob", "unanswered", "questions", "n")}
    for f in ("accuracy", "macro_f1", "brier", "ece", "nll", "aurc", "acc_at_50_coverage", "soft_accuracy",
              "brier_vs_soft", "score_mae", "within_1_level"):
        if m.get(f) is not None:
            put(k + f.replace("_", ""), num(m[f]))
    for f in ("unanswered", "questions", "n"):
        put(k + f, m[f])
    if m.get("zero_prob") is not None:
        put(k + "zeropct", num(100 * m["zero_prob"], 1))
    for c, r in (m.get("risk_at_coverage") or {}).items():
        put(k + "risk%d" % round(100 * float(c)), num(r))
    for g in ("by_workflow", "by_question_type"):
        for w, a in (m.get(g) or {}).items():
            put(k + ("wf/" if g == "by_workflow" else "qt/") + name(w), num(a))
    for f in ("latency_p50_ms", "latency_p95_ms"):
        if m.get(f) is not None:
            put(k + f.split("_")[1], ms(m[f]))


# ------------------------------------------------------------------ training overlap
def overlap(runs):
    """Kai: the suites train/manifest.json builds train splits of. Laya: its authors' mix."""
    m = load(runs["manifest"])
    if m is not None:
        put("kj/guard/commit", tex(m["harness"]["commit"]))
        put("kj/guard/units", "{:,}".format(m["harness"]["eval_units"]))
        put("kj/guard/excluded", "{:,}".format(sum(s.get("excluded_eval", 0) for s in m["sources"])))
        put("kj/guard/train", "{:,}".format(sum(s.get("train", 0) for s in m["sources"])))
        n = {}
        for src in m["sources"]:
            for s, c in src.get("by_suite", {}).items():
                base = s.split("/")[0]
                key = "massive" if base == "massive" else name(base + ("_full" if base == "banking77" else ""))
                n[key] = n.get(key, 0) + c
        for s, c in n.items():
            put("kj/%s/kai/trained" % s, "split" if c else "no")
            put("kj/%s/kai/trainrows" % s, "{:,}".format(c))
    mix = load(runs["mix"])
    if mix is not None:
        for who in ("laya", "agent"):
            for s, v in mix[who].items():
                put("kj/%s/%s/trained" % (s, who), tex(v))


# ------------------------------------------------------------------ typed-decisions rerun
def td(runs):
    """Upstream's Part B (typed decisions) on Laya's three checkpoints."""
    d = load(runs["td"])
    if d is None:
        return
    put("td/rev", d["meta"]["revision"][:8])
    put("td/runtime", tex(d["meta"]["runtime"]))
    for ckpt, key in (("english", "one"), ("multilingual", "multi"), ("typed-decisions", "agent")):
        r = d["part_b"]["by_model"].get(ckpt)
        if not r:
            continue
        for f in ("accuracy", "soft_accuracy", "brier_vs_soft", "ece", "score_mae", "n", "dropped"):
            if r.get(f) is not None:
                v = r[f]
                put("td/%s/%s" % (key, f.replace("_", "")), num(v) if isinstance(v, float) else v)
        put("td/%s/mspercase" % key, ms(r["ms_per_case"]))
        for w, x in sorted(r.get("by_workflow", {}).items()):
            put("td/%s/wf/%s" % (key, name(w)), num(x["accuracy"]))
        for q, x in sorted(r.get("by_question_type", {}).items()):
            put("td/%s/qt/%s" % (key, q), num(x["accuracy"]))


# ------------------------------------------------------------------ parity
def sci(v):
    m, e = ("%.1e" % v).split("e")
    return "$%s \\times 10^{%d}$" % (m, int(e))


def parity(runs):
    """{states, checkpoints, labels, labels_equal, max_logit, max_prob, bound}."""
    r = load(runs["parity"])
    if r is None:
        return
    put("par/states", r["states"])
    put("par/checkpoints", r["checkpoints"])
    put("par/labels", "%d/%d" % (r["labels_equal"], r["labels"]))
    for f in ("max_logit", "max_prob", "bound"):
        put("par/" + f.replace("max_", ""), sci(r[f]))


# ------------------------------------------------------------------ keyed results
def keyed(runs, part):
    """<results dir>/<suite>.json: {"meta", "keys": {<key>: value}}, each key written as the
    file names it: decision/capability (cap/...) and the Enso evaluation (enso/...)."""
    root = path(runs[part])
    if not os.path.isdir(root):
        print("%% absent: %s" % runs[part])
        return
    for f in sorted(os.listdir(root)):
        if f.endswith(".json"):
            r = load(os.path.join(root, f))
            for k, v in ((r.get("keys") if isinstance(r, dict) else None) or {}).items():
                if isinstance(v, bool):
                    put(k, "yes" if v else "no")
                elif isinstance(v, int):
                    put(k, "{:,}".format(v))
                elif isinstance(v, float):
                    put(k, sci(v) if 0 < abs(v) < 0.001 else
                        num(v, 0 if abs(v) >= 100 else 1 if abs(v) >= 10 else 3))
                elif isinstance(v, str):
                    put(k, tex(v))


def main():
    runs = json.load(open(sys.argv[1]))
    print("% Generated by scripts/results.py from data/runs.json; do not edit.")
    for part in (harness, overlap, td, parity):
        part(runs)
    for part in ("cap", "enso"):
        keyed(runs, part)


if __name__ == "__main__":
    main()
