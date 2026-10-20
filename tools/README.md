# Tools

- `art_build.py` — (legacy: the game no longer uses `art.js`; all art is coded in `src/gfx.js`) turns the photos in `reference/` into EGA-palette sprites (`src/art.js`) and writes `tools/art_sheet.png` so you can eyeball them. Run with `python -I tools/art_build.py`, then `python -I build.py`. Crop boxes and palettes per image are at the top of the script.
- `sim.js` — headless auto-player for balancing: `node tools/sim.js 200 short hint ordinary potluck` (args: runs, trail short|long, policy naive|normal|hint|smart|restspam, pace sabbath|ordinary|growth, suppers catered|potluck|coffee). `hint` plays like a kiosk visitor who follows the on-screen hints; it prints win rate, score, and a stamina trajectory per pastor.
- `apps-script/` — the Google Sheet logger and its setup steps.

The build itself: `python -I build.py` inlines `src/*.js` into `index.html`. If you run build.py from the project folder it only builds; the copy in the scratchpad also syncs sources.
