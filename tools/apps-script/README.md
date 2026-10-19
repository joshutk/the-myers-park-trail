# Score and session logging to a Google Sheet

The game logs two events per play to a Google Sheet through a tiny Apps Script web app. No Google Analytics.

- `session_start`: pastor, trail length, build (kiosk or web), device id, client time.
- `session_end`: outcome (win / budget / members / morale / stamina / party / abandoned), year reached, score, members, budget %, morale, participation, stamina, party aboard, drives run, campaigns paid in cash, campaigns borrowed, events seen, initials, minutes played.

Events queue in the browser's local storage and are sent when the device is online, so the kiosk still works offline and catches up later. If `DATA.config.sheetUrl` is empty, nothing is ever sent.

## Setup (once)

1. Create a Google Sheet, for example "Myers Park Trail scores".
2. Extensions > Apps Script. Replace the sample code with `Code.gs` from this folder. Save.
3. In the toolbar pick the function `setup` and press Run. Approve the permissions. This creates the `Log` and `Dashboard` tabs.
4. Deploy > New deployment > Web app. Execute as **Me**. Who has access **Anyone**. Deploy. Copy the web app URL.
5. Paste that URL into `src/data.js` as `DATA.config.sheetUrl`, set `DATA.config.build` to `"kiosk"` or `"web"` for each copy you make, and run `python -I build.py`.

The `Dashboard` tab shows sessions started and finished, finish rate, average score and minutes, kiosk vs web counts, a per-pastor table, how runs end, and a live top ten. Opening the web app URL in a browser returns the top ten as JSON, which a future version of the website page can show as a shared leaderboard.

Here's the Myers Park Trail scoring sheet apps script url: <YOUR_WEB_APP_URL>
