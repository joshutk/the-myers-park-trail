// Regenerates GAME-COPY.md: every word a player can see, by screen, pulled from src/data.js (the source of truth)
// plus the screen text that lives in src/screens.js / src/minigame.js (quoted below; keep in sync when those change).
// Usage: node tools/gen_copy.js [out.md]      (default: GAME-COPY.md next to index.html)
const fs=require("fs"), path=require("path"), vm=require("vm");
const ROOT=path.join(__dirname,"..");
const ctx={}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT,"src","data.js"),"utf8")+"\n;globalThis.__D=DATA;",ctx);
const D=ctx.__D;
const out=[]; const P=(...a)=>out.push(a.join(""));
const j=a=>Array.isArray(a)?a.join(" "):String(a||"");
const paras=a=>Array.isArray(a)?a.join(" · "):String(a||"");
const pg=p=>p?" *("+p+")*":"";
// effects in player terms (budget = % of a healthy year's reserves; stamina values are tripled on screen)
function fx(f){ if(!f) return ""; const o=[];
  if(f.budget) o.push("Funds "+(f.budget>0?"+":"")+Math.round(f.budget*100)+"%");
  if(f.members!=null){ if(typeof f.members==="object") o.push("Members "+(f.members.n>0?"+":"")+f.members.n); else o.push("Members "+(f.members>0?"+":"")+Math.round(f.members*100)+"%"); }
  if(f.morale) o.push("Morale "+(f.morale>0?"+":"")+f.morale);
  if(f.part) o.push("Participation "+(f.part>0?"+":"")+f.part);
  if(f.stam) o.push("Stamina "+(f.stam>0?"+":"")+(f.stam*3));
  if(f.energy) o.push("Leaders' energy "+(f.energy>0?"+":"")+f.energy);
  let s=o.length?"*["+o.join(", ")+"]*":""; if(f.msg) s=(s?s+" ":"")+"→ \""+f.msg+"\""; return s; }
const statName=k=>D.statNames[k];
const today=new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});

P("# The Myers Park Trail — Full Game Copy\n");
P("*Every word the player can see on screen, organized by where it appears. Generated from the game source on ",today," by `node tools/gen_copy.js`.*\n");
P("*Wording is what matters here: the game wraps long sentences across lines. Effects are shown in [brackets] in player terms (Funds as a % of a healthy year's reserves). Historical facts are drawn from \"A Legacy of Love\" (Lois Stickell, 2026); page citations are in italics.*\n");
P("---\n");

P("## 1. Title screen\n");
P("**Title:** ",D.title);
P("**Subtitle:** ",D.subtitle,"\n");
P("**Menu:** You may:\n- Travel the trail\n- Learn about the trail\n- See the Top Ten\n- Sound: off / Sound: low / Sound: high (toggles)\n");
P("**Tagline:** A Legacy of Love");
P("**Footer:** Myers Park Presbyterian Church   1926-2026\n");
P("**Attract/idle screen:** THE TOP TEN · \"TAP TO PLAY\"\n");
P("*Secret: seven quick taps on the bell tower unlock John Calvin. He hides again when the kiosk returns to its idle screen.*\n");
P("---\n");

P("## 2. About the trail\n");
P("ABOUT THE TRAIL\n");
D.about.forEach((a,i)=>P((i+1),". ",a)); P("");
P("Button: Tap to return.\n");
P("---\n");

P("## 3. Choose your pastor\n");
P("Screen title: CHOOSE YOUR PASTOR");
P("Subtitle: Your pick leads the church for all 100 years.\n");
P("Each card shows a portrait, years of service, five stat bars (",["p","g","c","v","s"].map(statName).join(", "),", shown out of 20), a short bio, and their leaders.\n");
P("**Joe Clifford starts locked:** his tile shows a \"?\" box, \"???\" and \"Play once to unlock\" until the visitor finishes (or loses) one game. He hides again when the kiosk returns to its idle screen.\n");
for(const p of D.pastors){
  P("### ",p.name," — \"",p.short,"\" (",p.years,")",p.secret?" *(secret/unlockable)*":"");
  P("- **Stats:** ",["p","g","c","v","s"].map(k=>statName(k)+" "+(p[k]+D.statBase)).join(", "));
  P("- **Bio:** ",(D.bios&&D.bios[p.id])||"");
  P("- **Leaders:** ",p.party.map(([n,r])=>n+" ("+r+")").join("; "),p.rider?"; + "+p.rider+", Exec. Director (rides along)":"","\n");
}
P("Card buttons: \"Choose [name]\" / \"Back\".\n");
P("---\n");

P("## 4. How far will you go?\n");
P("HOW FAR WILL YOU GO?\n");
P("- You'll play through the whole century either way.\n- Short Trail: 13 landmarks, about 6 minutes.\n- Long Trail: all 20 landmarks, about 12 minutes.\n");
P("Options: Short Trail / Long Trail / Back.\n");
P("---\n");

P("## 5. Before you leave Queens College (outfitting)\n");
P("BEFORE YOU LEAVE QUEENS COLLEGE\n");
P("The church has [N] members and about $[amount]. Reach 2026 before Funds, Members, Morale or your Stamina run out.\n");
P("**Pace**\n- Sabbath — Membership and participation grow slowly, stamina and morale deplete more slowly.\n- Ordinary — The balanced program church.\n- Growth — Membership grows fast and fundraising is easier, stamina and morale deplete quickly.\n");
P("**Suppers**\n- Catered meal — Costs funds, lifts morale.\n- Potluck dinner — Free and fine. Small boost to participation.\n- Coffee only — Saves funds, morale sinks.\n");
P("Button: Start the journey.\n");
P("---\n");

P("## 6. Travel screen\n");
P("Status bar labels (always shown): FUNDS · MEMBERS · MORALE · PARTICIPATION · STAMINA.\n");
P("Lower panel:");
P("- Next: [landmark name] ([year])  —  or \"Next: Centennial Sunday\"");
P("- Pace: [Sabbath/Ordinary/Growth]    Suppers: [Catered meal/Potluck dinner/Coffee only]");
P("- Leaders: [first names; an asterisk marks an ailment, with \"(* = unwell)\"]");
P("- Low-stat hint (only when a stat is low): \"Funds are low. Tap Stop, then hold a stewardship drive to bring in pledges.\" / \"Stamina is low. Tap Stop, then rest a year to recover before you run out.\" / \"Leaders' energy is low. Tap Stop, then rest a year so your leaders can recover.\" / \"Morale is low. Tap Stop, then rest a year, or try catered suppers.\" / \"Participation is low. Tap Stop, then a stewardship drive lifts participation too.\"\n");
P("Button: Stop.\n");
P("Notices that pop up on the road: \"[Leader] has [ailment].\" / \"[Leader] recovered from [ailment].\" / \"[Leader] [departure].\" / Jones only: \"Session voted something while you were away. Funds [±n]%.\" / Clifford only (once, instead of an invented event): \"Jennifer quietly handled a crisis.\"\n");
P("**The first time Funds run low** the game pulls over on its own and starts a stewardship drive (section 15) with the extra line \"Funds are low, so Session calls a drive!\" and no \"Not now\" button. After that, it's up to the player.\n");
P("Taylor-only travel event (once, 1983–87): \"You are elected Moderator of the reunited church and spend a year on the road.\" *[random: Funds -10% to +10%, Morale -10 to +10, Stamina -6]* *(p.219-231)*\n");
P("---\n");

P("## 7. Landmark / stop menu\n");
P("Header at a landmark: \"[year]: [landmark name]\" and its scene (section 11). When stopped by choice: \"[year]: You pull over.\" / \"The mini-bus is idling. Everyone looks to you. What now?\"\n");
P("Left column:\n- Continue on the trail\n- Check supplies & leaders\n- Look at the map\n- Change pace or suppers\n");
P("Right column:");
P("- Rest a year — + leaders' energy, morale, stamina. Costs $. *(once per stop; reads \"Rest a year (done here)\" / \"Once per stop.\" after use)* *[Stamina +18 (long trail +14), Leaders' energy +20, Morale +2, Participation -2, Funds -3%, plus a year passes]*");
P("- Stewardship drive — + funds and participation. Costs morale. *(reads \"Stewardship drive (done here)\" / \"Once per stop.\" after use)*");
P("- Did you know? — A true story from the church's history. *(when the stop has a fact)*");
P("- Sing a hymn *(Fogartie only)* — Once a decade. Restores all your leaders.\n");
P("Rest result: \"You rest for a year and nothing breaks. Your leaders recover and so do you.\"");
P("Sing a hymn result: \"You sing. All your leaders are restored. Someone asks for a second verse.\"");
P("Campaign nudge (a building project is near and funds are thin): \"A building campaign is coming in [year]. A pledge drive now builds reserves.\"\n");
P("---\n");

P("## 8. Supplies & Leaders\n");
P("SUPPLIES & LEADERS, [year]\n");
P("Rows: Funds ($amount) · Members · Morale · Participation · Your stamina.");
P("Your leaders: name, role (or their ailment, in orange, while unwell), an energy bar, or \"called elsewhere\". Clifford: \"Jennifer Childers (Exec. Director)\" / \" - has handled it\".");
P("Footer: \"Campaigns: [n] paid in cash, [n] borrowed\".\n");
P("---\n");

P("## 9. The trail (map)\n");
P("THE TRAIL\n");
P("- You are in [year].  [N] years to go.\n- Red markers are building projects.\n- Next stop: [year], [name]\n");
P("---\n");

P("## 10. Pace and suppers (mid-game)\n");
P("PACE AND SUPPERS — same choices and wording as section 5.\n");
P("---\n");

P("## 11. Landmarks (scenes + \"Did you know?\" facts)\n");
P("Each landmark shows a short scene, then an optional \"Did you know?\" card. Building projects (marked ‡) also run the ledger in section 14. *(S)* = on the Short Trail too.\n");
for(const t of D.trail){
  P("### ",t.year," ",t.type==="cross"?"‡ ":"","— ",t.name,t.campaign?" ("+t.campaign+")":"",t.short?" *(S)*":"");
  P("**Scene:** ",j(t.scene));
  if(t.fact) P("**Did you know?:** ",paras(t.fact),pg(t.page));
  P("");
}
P("---\n");

P("## 12. Events (prompts, choices, results, and \"Did you know?\" cards)\n");
P("Events interrupt the drive. Each shows a year and a prompt; some give choices, some test a pastor stat. A \"Did you know?\" button appears only when the event has a fact (invented events show \"This one we made up\"). **Key** events are must-see history: when the trail is too busy for every dated event, they win the slot, even a few years late.\n");
const evLine=e=>{
  const yr=typeof e.y==="number"?String(e.y):Array.isArray(e.y)?e.y[0]+"-"+e.y[1]:"any year";
  P("**",yr,"**",e.key?" *(key)*":""," — ",j(e.t)," ",fx(e.fx),pg(e.page));
  if(e.check) P("- *",statName(e.check.stat)," test* — pass: ",fx(e.check.pass)||"—"," / fail: ",fx(e.check.fail)||"—");
  (e.choice||[]).forEach(c=>P("- ",c.label," ",c.check?"*("+statName(c.check.stat)+" test — pass: "+fx(c.check.pass)+" / fail: "+fx(c.check.fail)+")*":fx(c.fx)));
  if(e.hugh) P("- Good outcome: \"He waves you through. You skip a year of trouble.\"\n- Bad outcome: \"He holds you up to let a funeral pass. You lose a year.\"");
  if(e.fact) P("**Did you know?:** ",paras(e.fact));
  P(""); };
P("### Dated history\n");
D.events.filter(e=>typeof e.y==="number").forEach(evLine);
P("### Any-era events\n");
D.events.filter(e=>typeof e.y!=="number"&&!e.invented).forEach(evLine);
P("### Invented events (each shows \"we made this one up\")\n");
D.events.filter(e=>e.invented).forEach(evLine);
P("### A generous gift (invented, once a game)\n");
P("Fires the first time Funds drop below ",Math.round(D.windfall.below*100),"% of a healthy year in or after ",D.windfall.fromYear,": \"",j(D.windfall.t),"\" ",fx(D.windfall.fx),"\n");
P("### Event result prompts (shared)\n");
P("- After a stat test: \"Your [stat] carries the day.\" / \"Your [stat] falls short this time.\"\n- A choice with no message: \"Noted.\"\n- Buttons: Continue / Did you know?\n");
P("---\n");

P("## 13. Presbytery meetings\n");
P("PRESBYTERY MEETING, [year]");
P("\"The Presbytery is meeting. They have a request:\"\n");
P("Requests (drawn at random, never the same one twice in a game):");
D.presbytery.forEach(t=>P("- ",j(t.t)," — Agree: ",fx(t.fx)," · Decline: ",fx(t.decline||{morale:-2})));
P("\nButtons: Agree / Politely decline / What is a Presbytery?");
P("Decline result: \"You decline. They'll find someone else, but you detect a little sass.\" plus the effect.");
P("\"What is a Presbytery?\" card: ",j(D.presbyteryFact),"\n");
P("---\n");

P("## 14. Building projects (the crossing ledger)\n");
P("Header: \"[year]: [LANDMARK NAME]\" and the scene.");
P("Context line: \"In real life the [campaign] raised $[amount].\"");
P("Two boxes: WHAT YOU HAVE / Funds — and — WHAT IT WILL COST / Cash needed.");
P("Verdict line: \"You can cover this in cash.\" or \"You're short $[amount] - raise funds, borrow, or defer.\"");
P("Prompt: \"How will the church pay?\"\n");
P("Options and outcomes:");
P("- **Pay cash** (tag: -$[cost], or \"need $[x] more\") → \"Paid in full. Session is glad we didn't take on debt.\" *[Funds -40% (Clifford -45%), Morale +6, Participation +4]*");
P("- **Hold a stewardship drive** (tag: raise funds now; \"done here\" after one) → runs the stewardship drive");
P("- **Borrow** (tag: 10% down, 6 yrs) → \"You take out a loan and budgets tighten for the next six years.\" *[Funds -10%, Morale -3, then -2% a year for six years]*");
P("- **Hire a consultant** (tag: 6% fee, a gamble (Vision)) → pass: \"The campaign beats its goal. Everyone gets a commemorative brick.\" *[Funds -21%, Morale +6, Participation +4; counts as paid in cash]* / fail: \"The consultant produces a binder full of ideas. None are any good. Session borrows to finish it.\" *[Funds -16%, Morale -3, six years of debt]*");
P("- **Wait a year** (tag: reserves grow) → \"You wait a year. So does the project.\" *[Funds +6%, Participation -4, Morale -3]*; after three years: \"Three years of waiting. The committee quietly builds it on a mortgage.\"\n");
P("---\n");

P("## 15. Stewardship drive (the pledge-catch minigame)\n");
P("Intro box: STEWARDSHIP DRIVE, [year]");
P("- (first low-funds drive only) Funds are low, so Session calls a drive!\n- Pledge cards fall from the balcony.\n- Catch them. The office can process [N].\n- Each card adds Funds and Participation.\n- This drive costs Morale -[5 or 10] (\" (second this decade).\" on a repeat)\n- Tap PREACH once to slow the cards (Stamina -8).\n- (lean year) \"It is a lean year; cards are scarce.\" / (rich year) \"It is a generous year.\"");
P("Buttons: Begin the drive / Not now (no \"Not now\" on the first, automatic drive).\n");
P("During play: \"Caught [n] / [cap]\" · \"Pledged +[n]% of funds\" · \"Time [n]\" · button \"PREACH A SERMON\" (reads \"PREACHING...\" while active) · \"Drag, or tap a side, to move\".\n");
P("Done box: THE DRIVE IS OVER\n- You caught [n] pledge card(s).\n- Funds +[n]%  (about $[amount])\n- Participation +[n]\n- \"The office is buried in pledge cards!\" (if maxed) / \"Maybe next year's stewardship letter should be shorter.\"");
P("Button: Continue (or \"Back to the project\" when reached from a building campaign).\n");
P("---\n");

P("## 16. Game over\n");
P("THE END OF THE ROAD, [year]");
P("Shows the pastor's name plaque \"1926-[year]\", the reason, the ending, and the score.\n");
const why={budget:"Out of money two years running.",members:"Fewer than 100 members are left.",morale:"Morale hit zero.",stamina:"Your stamina hit zero.",party:"All your leaders have been called elsewhere."};
const label={budget:"Funds",members:"Members",morale:"Morale",stamina:"Stamina",party:"Leaders all gone",calvin:"Calvin (special)"};
for(const k of Object.keys(D.gameOver)) P("- **",label[k]||k,":** ",why[k]?"\""+why[k]+"\" — ":"",j(D.gameOver[k]));
P("\nLine: \"Score: [n]\". Options: Enter your initials / Back to the title.\n");
P("Leader ailments (\"[name] has [ailment].\"): ",D.ailments.join(" · "),".");
P("Leader departures (\"[name] ...\"): ",D.departures.join(" · "),"\n");
P("---\n");

P("## 17. The drive home (the finale victory lap)\n");
P("Intro box: THE DRIVE HOME");
P("\"Drive the church bus up Providence Road to Centennial Sunday. Hold the left or right side of the screen to steer around the oncoming traffic and the roadwork. As you near the intersection of Providence, Providence, Queens, and Queens, steer to pick your road -- home to the church, or the scenic way by Freedom Park.\"");
P("Button: Drive home.\n");
P("HUD: \"THE DRIVE HOME\" · a 1926 → 2026 progress bar.");
P("While driving: \"HOLD THE LEFT OR RIGHT SIDE TO STEER\"");
P("Hit a car (one of): Bomp! · Crunch! · Whoops! · Oof!");
P("Hit the cones (one of): Cones! · Watch the cones! · Bonk!\n");
P("At the fork: \"STEER LEFT / RIGHT TO CHOOSE YOUR ROAD\" · branch labels \"CHURCH\" / \"CHURCH\" / \"FREEDOM PARK\" · confirm button \"TAKE THIS ROAD\".\n");
P("Arrival:");
P("- **Home, clean run:** CENTENNIAL SUNDAY — \"You pulled the bus up to the doors without a scratch! Nice work.\"");
P("- **Home, with bumps:** CENTENNIAL SUNDAY — \"A few bumps along the way, but the bus made it to the doors.\"");
P("- **Freedom Park:** THE SCENIC ROUTE — \"You followed the road down to Freedom Park instead. Not a terrible choice, but you missed the Centennial celebration! Maybe you can catch the livestream.\"");
P("Button: Continue.\n");
P("---\n");

P("## 18. Win screen & tally\n");
P("CENTENNIAL SUNDAY, 2026");
P("\"You made it. One hundred years.\"");
P("Subline:\n- \"You drove the bus straight home without a scratch.\" (clean)\n- \"The bus rolled up with a few more dings and dents.\" (bumped)\n- \"You took the scenic route by Freedom Park. Grace abounds.\" (Freedom Park)");
P("Stat line: \"Members [n]    Funds $[amount]    Leaders aboard [n]\" · \"Score: [n]\".");
P("Button: See the full tally.\n");
P("THE TALLY — line items: Members · Funds · Morale · Participation · Leaders aboard · Campaigns paid in cash · Campaigns borrowed · Reached 2026 · then \"Subtotal [n], pastor bonus x[m]\" (or \"Total\") = [score].");
P("Buttons: Enter your initials / Back to the title.\n");
P("---\n");

P("## 19. Enter your initials & leaderboard\n");
P("ENTER YOUR INITIALS — on-screen A–Z keyboard, DEL, DONE. (Default initials if left blank: \"MPP\".)");
P("THE TOP TEN — Initials · Played as · Score.\n");
P("---\n");

P("## 20. Appendix: status bar & sound\n");
P("Status bar (persistent): FUNDS · MEMBERS · MORALE · PARTICIPATION · STAMINA.");
P("Sound toggle (title menu): Sound: off / Sound: low / Sound: high.");
P("Generic prompts: \"Tap to continue\" · \"Tap to return\".\n");
P("*(There is also a hidden \"DEBUG -- PLAYTEST ANY SCREEN\" menu, opened by five quick taps in the top-right corner of the title screen. It is a testing tool, so its labels are omitted here.)*\n");

const dest=process.argv[2]||path.join(ROOT,"GAME-COPY.md");
fs.writeFileSync(dest,out.join("\n")); console.log("wrote",dest,out.length,"lines");
