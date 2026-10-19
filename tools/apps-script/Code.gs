/**
 * The Myers Park Trail — score and session logger (Google Apps Script)
 *
 * One-time setup (about five minutes):
 *  1. Create a new Google Sheet (any name, e.g. "Myers Park Trail scores").
 *  2. Extensions > Apps Script. Delete the sample code, paste this whole file, save.
 *  3. Run the function `setup` once (choose it in the toolbar, press Run, approve permissions).
 *     It creates the "Log" and "Dashboard" tabs.
 *  4. Deploy > New deployment > type "Web app". Execute as: Me. Who has access: Anyone. Deploy.
 *  5. Copy the Web app URL and paste it into src/data.js as DATA.config.sheetUrl, then run build.py.
 *
 * The game POSTs a JSON array of events (text/plain, no CORS preflight). Each event is one row.
 * GET returns the current top ten as JSON, for a future shared leaderboard on the website.
 */

const LOG = "Log", DASH = "Dashboard";
const COLS = ["received","client_time","event","session","device","build","pastor","trail","outcome","year","score","members","budget_pct","morale","participation","stamina","party_aboard","drives","cash_campaigns","borrowed","events_seen","initials","minutes"];

function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let log = ss.getSheetByName(LOG) || ss.insertSheet(LOG);
  if (log.getLastRow() === 0) { log.appendRow(COLS); log.setFrozenRows(1); }
  let d = ss.getSheetByName(DASH) || ss.insertSheet(DASH);
  d.clear();
  const rows = [
    ["THE MYERS PARK TRAIL — DASHBOARD", ""],
    ["Sessions started", '=COUNTIF(Log!C:C,"session_start")'],
    ["Sessions finished (any outcome)", '=COUNTIF(Log!C:C,"session_end")'],
    ["Reached 2026", '=COUNTIFS(Log!C:C,"session_end",Log!I:I,"win")'],
    ["Finish rate", '=IFERROR(B4/B3,0)'],
    ["Average score (finished runs)", '=IFERROR(AVERAGEIFS(Log!K:K,Log!C:C,"session_end"),0)'],
    ["Average minutes per run", '=IFERROR(AVERAGEIFS(Log!W:W,Log!C:C,"session_end"),0)'],
    ["Kiosk sessions", '=COUNTIFS(Log!C:C,"session_start",Log!F:F,"kiosk")'],
    ["Web sessions", '=COUNTIFS(Log!C:C,"session_start",Log!F:F,"web")'],
    ["", ""],
    ["BY PASTOR", "Started", "Finished", "Reached 2026", "Avg score"],
  ];
  const pastors = ["gammon","jones","fogartie","taylor","croft","swicegood","eason","clifford","calvin"];
  pastors.forEach((p, i) => {
    const r = rows.length + 1;
    rows.push([p, '=COUNTIFS(Log!C:C,"session_start",Log!G:G,"' + p + '")',
                  '=COUNTIFS(Log!C:C,"session_end",Log!G:G,"' + p + '")',
                  '=COUNTIFS(Log!C:C,"session_end",Log!G:G,"' + p + '",Log!I:I,"win")',
                  '=IFERROR(AVERAGEIFS(Log!K:K,Log!C:C,"session_end",Log!G:G,"' + p + '"),0)']);
  });
  rows.push(["", ""]);
  rows.push(["HOW RUNS END", "Count"]);
  ["win","budget","members","morale","stamina","party","abandoned"].forEach(o => rows.push([o, '=COUNTIFS(Log!C:C,"session_end",Log!I:I,"' + o + '")']));
  rows.push(["", ""]);
  rows.push(["TOP TEN", "Initials", "Pastor", "Score", "Date"]);
  rows.push(["", '=IFERROR(SORTN(FILTER({Log!V:V,Log!G:G,Log!K:K,Log!A:A},Log!C:C="session_end"),10,0,3,FALSE),"no scores yet")']);
  d.getRange(1, 1, rows.length, 5).setValues(rows.map(r => { while (r.length < 5) r.push(""); return r; }));
  d.getRange("A1").setFontWeight("bold").setFontSize(14);
  d.getRange("B5").setNumberFormat("0%");
  d.setColumnWidth(1, 260);
  // The SORTN above spills into B..E of the following rows automatically.
}

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const log = ss.getSheetByName(LOG) || (setup(), ss.getSheetByName(LOG));
    let events = JSON.parse(e.postData.contents || "[]");
    if (!Array.isArray(events)) events = [events];
    const now = new Date();
    const rows = events.slice(0, 200).map(ev => COLS.map(c => c === "received" ? now : (ev[c] == null ? "" : ev[c])));
    if (rows.length) log.getRange(log.getLastRow() + 1, 1, rows.length, COLS.length).setValues(rows);
    return ContentService.createTextOutput(JSON.stringify({ok: true, n: rows.length})).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ok: false, error: String(err)})).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const log = ss.getSheetByName(LOG);
  if (!log || log.getLastRow() < 2) return ContentService.createTextOutput("[]").setMimeType(ContentService.MimeType.JSON);
  const data = log.getRange(2, 1, log.getLastRow() - 1, COLS.length).getValues();
  const iEv = COLS.indexOf("event"), iSc = COLS.indexOf("score"), iIn = COLS.indexOf("initials"), iP = COLS.indexOf("pastor");
  const top = data.filter(r => r[iEv] === "session_end" && r[iSc] !== "").map(r => ({n: r[iIn] || "---", v: Number(r[iSc]), p: r[iP]}))
    .sort((a, b) => b.v - a.v).slice(0, 10);
  return ContentService.createTextOutput(JSON.stringify(top)).setMimeType(ContentService.MimeType.JSON);
}
