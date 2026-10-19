# Tools

- `art_build.py` — turns the photos in `reference/` into EGA-palette sprites (`src/art.js`) and writes `tools/art_sheet.png` so you can eyeball them. Run with `python -I tools/art_build.py`, then `python -I build.py`. Crop boxes and palettes per image are at the top of the script.
- `sim.js` — headless auto-player for balancing: `node tools/sim.js 300 short normal` (policies: naive, normal, smart; trails: short, long).
- `apps-script/` — the Google Sheet logger and its setup steps.

The build itself: `python -I build.py` inlines `src/*.js` into `index.html`. If you run build.py from the project folder it only builds; the copy in the scratchpad also syncs sources.
