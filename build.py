"""Build index.html from src/*.js + src/template.html.

Usage:  python -I build.py
Concatenates the source files in load order into the template's /*BUILD:JS*/
slot and writes a single self-contained index.html you can open in any browser.
"""
import io, os

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "src")
ORDER = ["data.js", "font.js", "asset_road.js", "gfx.js", "engine.js", "screens.js", "minigame.js", "main.js"]

js = []
for name in ORDER:
    p = os.path.join(SRC, name)
    if os.path.exists(p):
        js.append("// ===== %s =====\n" % name + io.open(p, encoding="utf-8").read())
    else:
        print("missing", name)

tpl = io.open(os.path.join(SRC, "template.html"), encoding="utf-8").read()
html = tpl.replace("/*BUILD:JS*/", "\n".join(js))
io.open(os.path.join(HERE, "index.html"), "w", encoding="utf-8", newline="\n").write(html)
print("built index.html: %d bytes" % len(html.encode("utf-8")))
