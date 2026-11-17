"""Build the single-file app: python3 build.py  ->  index.html"""
import pathlib
src = pathlib.Path(__file__).parent / "src"
js = "\n".join((src / f).read_text(encoding="utf8") for f in ("data.js", "wiki.js", "content.js", "content2.js", "short.js", "verses.js", "verses5.js", "tamilwiki.js", "basemap.js", "app.js", "map.js", "extras.js"))
assert "</script" not in js
out = (src / "shell.html").read_text(encoding="utf8").replace("%CSS%", (src / "style.css").read_text(encoding="utf8")).replace("%JS%", js)
(pathlib.Path(__file__).parent / "index.html").write_text(out, encoding="utf8")
print("index.html", len(out), "bytes")
