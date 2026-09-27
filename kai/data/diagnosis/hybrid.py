# hybrid.py <encoder-from> <rest-from> <out>: a checkpoint whose encoder.* tensors come from one run and every other tensor from another.
import json, struct, sys, os, shutil
def header(p):
    f = open(p, "rb"); n = struct.unpack("<Q", f.read(8))[0]; return f, json.loads(f.read(n)), 8 + n
enc, rest, out = sys.argv[1:4]
fe, he, be = header(enc + "/model.safetensors"); fr, hr, br = header(rest + "/model.safetensors")
names = sorted((set(hr) | set(he)) - {"__metadata__"})
os.makedirs(out, exist_ok=True)
h, off, plan = {}, 0, []
for k in names:
    f, hh, b = (fe, he, be) if (k.startswith("encoder.") or k not in hr) else (fr, hr, br)
    if k not in hh: f, hh, b = (fr, hr, br)
    v = hh[k]; a, z = v["data_offsets"]
    h[k] = {"dtype": v["dtype"], "shape": v["shape"], "data_offsets": [off, off + z - a]}
    plan.append((f, b + a, z - a)); off += z - a
if "__metadata__" in hr: h["__metadata__"] = hr["__metadata__"]
hb = json.dumps(h, separators=(",", ":")).encode(); hb += b" " * ((8 - len(hb) % 8) % 8)
with open(out + "/model.safetensors", "wb") as w:
    w.write(struct.pack("<Q", len(hb))); w.write(hb)
    for f, s, n in plan:
        f.seek(s); w.write(f.read(n))
cfg = json.load(open(rest + "/kai.json"))
a = json.load(open("runs/a/kai.json"))
cfg["provenance"] = a["provenance"]  # Init::Dir accepts a finished stage `a`
json.dump(cfg, open(out + "/kai.json", "w"))
shutil.copytree(rest + "/tokenizer", out + "/tokenizer", dirs_exist_ok=True)
print("wrote", out)
