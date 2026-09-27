import gzip, json, glob, collections, sys
sys.path.insert(0, ".")
def load(p): return [json.loads(l) for l in gzip.open(p, "rt")]
def key(s): return json.dumps(s, sort_keys=True)
NOUL_F, NOUL_T = "no, the statement does not hold", "yes, the statement holds"
def options(q):
    lab = q.get("labels") or {"false": "false", "true": "true"}
    cr = q.get("criteria") or {}
    side = lambda k, d: cr[k] if isinstance(cr.get(k), str) and cr.get(k).strip() else d
    return [f"{lab['false']}: {side('false', NOUL_F)}", f"{lab['true']}: {side('true', NOUL_T)}"]
groups = [("rag", "relevance/rag_relevance.*.gz", "relevance/robust.microsoft-ms_marco.%s.*.gz"),
          ("spam", "security/email_spam.*.gz", "security/robust.SetFit-enron_spam.%s.*.gz"),
          ("phishing", "security/phishing.*.gz", "security/robust.zefang-liu-phishing-email-dataset.%s.*.gz"),
          ("toxic-chat", "security/toxic_chat.*.gz", "security/robust.lmsys-toxic-chat.%s.*.gz")]
for name, bp, rp in groups:
    base = {}
    for p in glob.glob(bp):
        for r in load(p):
            (qid,) = r["questions"]; base[(key(r["state"]), qid)] = (r["questions"][qid], r["target"][qid])
    for tr in ["alias", "swap"]:
        c = collections.Counter()
        for p in glob.glob(rp % tr):
            for r in load(p):
                (qid,) = r["questions"]
                b = base.get((key(r["state"]), qid))
                if b is None: c["base not found"] += 1; continue
                bq, bt = b; q, t = r["questions"][qid], r["target"][qid]
                if q["instructions"] != bq["instructions"]: c["instructions changed"] += 1
                bo, o = options(bq), options(q)
                # the answer the text names: the option text the target puts its mass on
                bans = bo[max(range(2), key=lambda i: bt[i])]; ans = o[max(range(2), key=lambda i: t[i])]
                yes = lambda s: s.split(": ", 1)[1] in (NOUL_T, "yes, the statement holds") or s.split(": ",1)[1] == (bq.get("criteria") or {}).get("true")
                same_meaning = (bans.split(": ",1)[1] == ans.split(": ",1)[1])
                c["target reversed" if t != bt else "target same"] += 1
                c["answer text same meaning" if same_meaning else "ANSWER TEXT CHANGED MEANING"] += 1
        print(f"{name:10s} {tr:5s}", dict(c))
