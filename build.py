"""Build the app:  python3 build.py
Writes index.html (the whole app in one file) and sw.js (the offline service worker, stamped with a
version made from the content, so every changed build is picked up by installed copies)."""
import hashlib, json, pathlib, re
root = pathlib.Path(__file__).parent
src = root / "src"
FILES = ("config.js", "data.js", "wiki.js", "content.js", "content2.js", "short.js", "verses.js", "verses5.js",
         "tamilwiki.js", "basemap.js", "app.js", "map.js", "extras.js", "pwa.js")
js = "\n".join((src / f).read_text(encoding="utf8") for f in FILES)
assert "</script" not in js
shell = (src / "shell.html").read_text(encoding="utf8")
out = shell.replace("%CSS%", (src / "style.css").read_text(encoding="utf8")).replace("%JS%", js)
(root / "index.html").write_text(out, encoding="utf8")
print("index.html", len(out), "bytes")

# ---- service worker ----
font_css = re.search(r'href="(https://fonts\.googleapis\.com/css2[^"]+)"', shell).group(1).replace("&amp;", "&")
shell_files = ["./", "index.html", "manifest.webmanifest", "vendor/leaflet.js"] + sorted(
    "icons/" + p.name for p in (root / "icons").iterdir() if p.suffix in (".png", ".svg"))
images = sorted("img/" + p.name for p in (root / "img").iterdir() if p.suffix.lower() in (".jpg", ".jpeg", ".png", ".webp"))
sw_src = (src / "sw.js").read_text(encoding="utf8")
h = hashlib.sha1()
for rel in ["index.html"] + shell_files[2:] + images:
    h.update(rel.encode()); h.update((root / rel).read_bytes())
h.update(sw_src.encode())
app_version = re.search(r"APP_VERSION = '([^' ]+)", js).group(1)
version = app_version + "-" + h.hexdigest()[:10]
sw = (sw_src.replace("%VERSION%", version).replace("%SHELL%", json.dumps(shell_files))
      .replace("%IMAGES%", json.dumps(images)).replace("%FONT_CSS%", font_css))
(root / "sw.js").write_text(sw, encoding="utf8")
print("sw.js version", version, "-", len(shell_files), "app files,", len(images), "photographs")
