# The Myers Park Trail

An *Oregon Trail*–style educational game about the first hundred years of
**Myers Park Presbyterian Church** in Charlotte, North Carolina (1926–2026),
made for the church's centennial.

You play as one of the church's pastors, driving the church mini-bus up
Providence Road across a century of history — managing the church's funds,
members, morale, participation, and your own stamina through the Depression,
two world wars, building campaigns, hurricanes, a pandemic, and the long work
of a congregation. The history is true, drawn from *A Legacy of Love* by Lois
Stickell; a few small events are invented for fun.

## Play

The game is a single self-contained HTML file — no server, no build step, no
dependencies required to play.

- **Locally:** open `index.html` in any modern browser.
- **Touch or mouse + keyboard.** It's designed for a kiosk touchscreen but plays
  fine with a mouse; menus also respond to number/letter keys and the drive-home
  finale takes the arrow keys.

## Build from source

The playable `index.html` is generated from the modular sources in `src/`:

```
python -I build.py
```

This concatenates `src/*.js` (in load order) into `src/template.html` and writes
a fresh `index.html`. Load order and details are in `build.py`.

### Source layout

| File | What it holds |
|------|---------------|
| `src/data.js` | All editable content: pastors, bios, the trail, every event, copy, numbers |
| `src/font.js` | Bitmap font glyphs |
| `src/asset_road.js` | The drive-home road art (embedded PNG) |
| `src/gfx.js` | Drawing primitives, palette, sprites |
| `src/engine.js` | Screen manager, input, widgets, optional logging |
| `src/screens.js` | Game state, the yearly simulation, and every screen |
| `src/minigame.js` | The stewardship-drive pledge-card minigame |
| `src/main.js` | Boot + main loop |
| `src/template.html` | HTML shell the build fills in |

Most content edits only need `src/data.js`. `GAME-COPY.md` is a readable export
of every player-facing line, organized by screen.

### Other folders

- `assets/` — source art for the drive-home scene (Illustrator file + exported PNG).
  Not needed at runtime; the art is embedded in the build.
- `tools/` — helper scripts: `sim.js` (balance simulation), `art_build.py`
  (sprite builder), and `apps-script/` (an optional Google Apps Script for
  logging anonymous play stats to a Sheet; off by default).

## Optional play logging

The game can POST anonymous session/score stats to a Google Sheet via a Google
Apps Script web app. It is **disabled by default** (`DATA.config.sheetUrl` is
empty, so nothing is ever sent). To enable it for your own deployment, follow
`tools/apps-script/README.md` and paste your own web-app URL into
`src/data.js`, then rebuild.

## Credits

- Built for Myers Park Presbyterian Church's centennial (1926–2026).
- Historical basis: *A Legacy of Love*, Lois Stickell.
- Game design, code, and pixel art created for this project.

## License

Code is released under the MIT License (see `LICENSE`). The historical content
concerns Myers Park Presbyterian Church and its sources; please credit *A Legacy
of Love* if you reuse the historical write-ups.
