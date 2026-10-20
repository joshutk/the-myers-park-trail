// ============================================================
// GAME STATE + SCREENS
// ============================================================
let S = null;
let CALVIN_UNLOCKED = false;

function newGame(pastor, trailLen){
  const lm = DATA.trail.filter(t => trailLen==="long" || t.short);
  S = {
    pastor, trailLen, landmarks:lm, li:0, year:1926,
    budget:1.0, members:245, morale: pastor.id==="gammon"?90:70, part:50, stam: 50+pastor.s*5,
    party: pastor.party.map(([name,role])=>({name,role,energy:100,ailment:null,gone:false,k:0.6+Math.random()*0.8})),
    rider: pastor.rider||null, riderUsed:false,
    pace:"ordinary", rations:"potluck",
    used:new Set(), cash:0, borrowed:0, debtYears:0,
    driveLandmark:-1, drivesDecade:{}, hymnDecade:{}, boilerDone:false, moderatorDone:false,
    eventsSeen:0, log:[], sinceEvent:9, startedAt:Date.now(), reached2026:false, over:null, travelOff:0
  };
  S.budgetDollars = function(){ return this.budget*lerpAnchors(DATA.budgetAnchors,this.year); };
  S.session=Math.random().toString(36).slice(2,10); Store.stat("plays"); track("session_start",{session:S.session,pastor:pastor.id,trail:trailLen});
}
function stat(k){ return S.pastor[k]; }
function roll(statKey){ if(S.pastor.id==="calvin") return true; return (rnd(10)+1) <= stat(statKey); }
function partyAlive(){ return S.party.filter(p=>!p.gone); }
function decade(){ return Math.floor(S.year/10); }

function applyFx(fx, ctx){
  const out=[]; if(!fx) return out; ctx=ctx||{};
  const sermon = ctx.sermon && S.pastor.id==="swicegood" ? 2 : 1;
  if(fx.budget){ let b=fx.budget; if(S.pastor.id==="clifford" && b>0 && ctx.outreach) b*=1.5; S.budget+=b*sermon; out.push("Funds "+(b>0?"+":"")+Math.round(b*100)+"%"); }
  if(fx.members){ if(typeof fx.members==="object"){ S.members+=fx.members.n; out.push("Members "+(fx.members.n>0?"+":"")+fx.members.n); } else { let m=fx.members; if(m<0 && S.pastor.c>=9) m*=0.5; S.members*=1+m; out.push("Members "+(m>0?"+":"")+Math.round(m*100)+"%"); } }
  if(fx.morale){ let m=fx.morale*sermon; if(m<0 && S.pastor.id==="eason") m=Math.round(m/2); S.morale=clamp(S.morale+m,0,100); out.push("Morale "+(m>0?"+":"")+m); }
  if(fx.part){ S.part=clamp(S.part+fx.part,0,100); out.push("Participation "+(fx.part>0?"+":"")+fx.part); }
  if(fx.stam){ let s=fx.stam; if(s<0 && S.pastor.id==="gammon") s*=2; S.stam=clamp(S.stam+s*3,0,100); out.push("Stamina "+(s>0?"+":"")+(s*3)); }
  if(fx.energy){ S.party.forEach(p=>{ if(!p.gone) p.energy=clamp(p.energy+fx.energy,0,100); }); out.push("Leaders' energy "+(fx.energy>0?"+":"")+fx.energy); }
  if(fx.msg) out.push(fx.msg);
  return out;
}

// ---- yearly simulation ----
function paceMods(){ return { sabbath:{aim:0.90,part:1,stam:1.5,energy:2,morale:1,cost:0}, ordinary:{aim:1.00,part:-1,stam:-0.5,energy:-0.7,morale:0,cost:0}, growth:{aim:1.13,part:-3,stam:-2,energy:-3,morale:-1,cost:0.02} }[S.pace]; }
function rationMods(){ return { catered:{budget:-0.015,morale:2}, potluck:{budget:0,morale:0}, coffee:{budget:0.01,morale:-2} }[S.rations]; }
function advanceYear(){
  const pm=paceMods(), rm=rationMods(); S.year++; if(S.year>2026)S.year=2026;
  const curAnchor = lerpAnchors(DATA.memberAnchors,S.year), prevAnchor = lerpAnchors(DATA.memberAnchors,S.year-1);
  // follow history's year-over-year slope, then ease toward a pace-dependent multiple of the
  // historical size so the congregation stays grounded in the real numbers instead of ballooning.
  let rate = (curAnchor/prevAnchor - 1) + (curAnchor*pm.aim - S.members)/S.members*0.30;
  if(S.morale<40) rate-=0.01; if(S.morale>80) rate+=0.002; if(S.part<20) rate-=0.02;
  S.members = Math.max(0, S.members*(1+rate));
  const giving = 0.05*(0.5+0.5*S.part/50)*(0.6+0.4*S.morale/70); const expenses = 0.05 + pm.cost + (S.debtYears>0?0.02:0);
  S.budget += giving - expenses + rm.budget; if(S.debtYears>0) S.debtYears--;
  if(S.budget>1.5){ S.budget=1.5; S.morale=clamp(S.morale+1,0,100); }
  S.negYears = S.budget<0 ? (S.negYears||0)+1 : 0;
  if(S.part<50) S.part+=1;
  S.morale += (S.morale<60?1:-0.5) + pm.morale + rm.morale; S.morale=clamp(S.morale,0,100);
  S.part = clamp(S.part+pm.part,0,100);
  const sdrain = pm.stam<0 ? pm.stam*(1+(7-Math.min(7,S.pastor.s))*0.15) : pm.stam; S.stam=clamp(S.stam+sdrain,0,100);
  S.party.forEach(p=>{ if(p.gone) return; p.energy=clamp(p.energy+(pm.energy<0?pm.energy*p.k:pm.energy),0,100);
    if(!p.ailment && p.energy<45 && Math.random()<0.08){ p.ailment=pick(DATA.ailments); S.log.push(p.name+" has "+p.ailment+"."); }
    if(p.ailment && p.energy>60 && Math.random()<0.4){ S.log.push(p.name+" recovered from "+p.ailment+"."); p.ailment=null; }
    if(p.ailment) p.energy=clamp(p.energy-1.5,0,100);
    if(p.energy<=0){ p.gone=true; p.ailment=null; S.log.push(p.name+" "+pick(DATA.departures)); if(S.pastor.id!=="croft") S.members*=0.98; } });
  if(S.pastor.id==="jones" && Math.random()<0.06){ const d=(rnd(7)-3)/100; S.budget+=d; S.log.push("Session voted something while you were away. Funds "+(d>=0?"+":"")+Math.round(d*100)+"%."); }
  checkOver();
}
function checkOver(){
  if(S.over) return S.over;
  if(S.negYears>=2) S.over="budget";
  else if(S.members<100) S.over="members";
  else if(S.morale<=0) S.over="morale";
  else if(S.stam<=0) S.over="stamina";
  else if(partyAlive().length===0) S.over="party";
  return S.over;
}
function pickEvent(){
  const long=S.trailLen==="long";
  const specific = DATA.events.filter((e,i)=>!S.used.has(i) && typeof e.y==="number" && e.y===S.year);
  if(specific.length && Math.random()<(long?1:0.6)){ const e=pick(specific); S.used.add(DATA.events.indexOf(e)); return e; }
  const rate = long?0.11:0.07; if(Math.random()>rate) return null;
  const pool = DATA.events.filter((e,i)=>!S.used.has(i) && (e.y==="any" || (Array.isArray(e.y)&&S.year>=e.y[0]&&S.year<=e.y[1])));
  if(!pool.length) return null; const e=pick(pool); S.used.add(DATA.events.indexOf(e)); return e;
}
// events tied to a real year fire reliably, on that year (history should not be skipped)
function dueSpecific(){ const s=DATA.events.filter((e,i)=>!S.used.has(i) && typeof e.y==="number" && e.y===S.year); if(!s.length) return null; const e=pick(s); S.used.add(DATA.events.indexOf(e)); return e; }
// ambient / colour events: only sometimes, and only when the pacing allows
function pickAmbient(){ const long=S.trailLen==="long"; const rate=long?0.11:0.07; if(Math.random()>rate) return null; const pool=DATA.events.filter((e,i)=>!S.used.has(i) && (e.y==="any" || (Array.isArray(e.y)&&S.year>=e.y[0]&&S.year<=e.y[1]))); if(!pool.length) return null; const e=pick(pool); S.used.add(DATA.events.indexOf(e)); return e; }
function endRow(outcome){ const sc=score().total; return { session:S.session, pastor:S.pastor.id, trail:S.trailLen, outcome, year:S.year, score:sc, members:Math.round(S.members), budget_pct:Math.round(S.budget*100), morale:Math.round(S.morale), participation:Math.round(S.part), stamina:Math.round(S.stam), party_aboard:partyAlive().length, drives:S.drives||0, cash_campaigns:S.cash, borrowed:S.borrowed, events_seen:S.eventsSeen, minutes:Math.round((Date.now()-S.startedAt)/6000)/10 }; }
function score(){
  const s=S; const cashN=s.cash, borN=s.borrowed;
  let pts = s.members/10 + s.budget*950 + s.morale*5 + s.part*2 + partyAlive().length*300 + cashN*500 + borN*200 + (s.reached2026?1000:0);
  return { total:Math.round(Math.max(0,pts)), parts:[["Members",Math.round(s.members/10)],["Funds (2026 $)",Math.round(s.budget*950)],["Morale",s.morale*5],["Participation",Math.round(s.part*2)],["Leaders aboard",partyAlive().length*300],["Campaigns paid in cash",cashN*500],["Campaigns borrowed",borN*200],["Reached 2026",s.reached2026?1000:0]] };
}
// a low-stat nudge for the landmark screen, or null
function lowHint(){
  if(S.budget<0.45) return { stat:"Funds", act:"Hold a stewardship drive to bring in pledges." };
  if(S.stam<35) return { stat:"Stamina", act:"Rest a year to recover before you run out." };
  if(S.morale<35) return { stat:"Morale", act:"Rest a year, or try catered suppers." };
  if(S.part<25) return { stat:"Participation", act:"A stewardship drive lifts participation too." };
  return null;
}

// ============================================================
// SCREENS
// ============================================================
const SC = E.screens;
let towerTaps=0, towerTapAt=0;

function drawTitleArt(t){
  G.clear(C.BG);
  drawSky(0,250,false); G.rect(0,250,640,150,C.GROUND); G.rect(0,250,640,3,C.SAGE); G.rect(0,300,640,40,C.ROAD);
  for(let d=-((t*40)|0)%48; d<640; d+=48) G.rect(d,318,24,3,C.GOLD_PALE);
  G.draw(ART.cloud,60+Math.sin(t/3)*10,40,2); G.draw(ART.cloud,420,70,2);
  drawChurch(410,120,2);
  const towerX=410+ART.sanct_front[0].length*2-16;
  E.zone(towerX,80,48,120,()=>{ const now=Date.now(); towerTaps=(now-towerTapAt<1500)?towerTaps+1:1; towerTapAt=now; Sound.beep(300+towerTaps*80,0.05);
    if(towerTaps>=7 && !CALVIN_UNLOCKED){ CALVIN_UNLOCKED=true; Sound.hymn(); } });
  G.draw(ART.tree,30,222,2); G.draw(ART.tree,120,218,2); G.draw(ART.tree,360,222,2);
  const bx=((t*60)%800)-150; G.draw(ART.bus,bx,286,2);
}
SC.title = {
  t:0, enter(){ this.t=0; towerTaps=0; },
  draw(dt){ this.t+=dt; drawTitleArt(this.t);
    G.panel(28,24,500,72); G.ctext(DATA.title,278,38,C.TITLE,T.XL); G.ctext(DATA.subtitle,278,72,C.TEXT,T.M);
    G.box2(36,116,330,196,C.PANEL,C.FRAME);
    G.text("You may:",52,128,C.DIM,T.M);
    E.menu([{label:"Travel the trail",fn:()=>E.go("select")},{label:"Learn about the trail",fn:()=>E.go("about")},{label:"See the Top Ten",fn:()=>E.go("leaderboard")},{label:Sound.label(),fn:()=>Sound.cycle()}],52,150,298,{rowH:36});
    G.ctext("A Legacy of Love",320,356,C.RESULT,T.M);
    G.ctext("Myers Park Presbyterian Church   1926-2026",320,380,C.DIM,T.S);
  },
  key(k){ E.keyMenu(k); }
};
SC.attract = {
  t:0, enter(){ this.t=0; },
  draw(dt){ this.t+=dt; drawTitleArt(this.t);
    G.panel(40,28,440,52); G.ctext(DATA.title,260,42,C.TITLE,T.XL);
    const sc=Store.scores(); G.box2(60,104,400,234,C.PANEL,C.FRAME); G.ctext("THE TOP TEN",260,116,C.TITLE,T.M);
    sc.slice(0,10).forEach((s,i)=>{ G.text((i+1<10?" ":"")+(i+1)+". "+s.n+"  "+(s.p||""),84,142+i*18,C.TEXT,T.M); G.rtext(String(s.v),436,142+i*18,C.RESULT,T.M); });
    if(Math.floor(this.t*2)%2===0) G.ctext("TAP TO PLAY",260,352,C.TITLE,T.M);
    E.zone(0,0,640,400,()=>E.go("title"));
  },
  key(){ E.go("title"); }
};
SC.about = {
  draw(){ G.clear(C.BG); G.box2(24,24,592,352,C.PANEL,C.FRAME); G.ctext("ABOUT THE TRAIL",320,40,C.TITLE,T.L);
    let y=74; const x=48, w=544; const a=DATA.about||[];
    a.forEach((para,i)=>{ y=G.para(para,x,y,i===a.length-1?C.DIM:C.TEXT,T.M,w)+8; });
    E.pressBar("Tap to return",()=>E.go("title")); },
  key(k){ E.keyMenu(k); }
};
SC.leaderboard = {
  enter(a){ this.hi=a&&a.hi!=null?a.hi:-1; },
  draw(){ G.clear(C.BG); G.box2(80,24,480,352,C.PANEL,C.FRAME); G.ctext("THE TOP TEN",320,40,C.TITLE,T.XL);
    G.text("Initials",150,70,C.GOLD_PALE,T.M); G.text("Played as",238,70,C.GOLD_PALE,T.M); G.rtext("Score",528,70,C.GOLD_PALE,T.M);
    G.rect(100,86,440,1,C.GOLD_INK);
    const sc=Store.scores(); sc.slice(0,10).forEach((s,i)=>{ const col=i===this.hi?C.TITLE:C.TEXT; G.text((i+1<10?" ":"")+(i+1)+". "+s.n+"   "+(s.p||""),112,96+i*26,col,T.L); G.rtext(String(s.v),528,96+i*26,i===this.hi?C.TITLE:C.RESULT,T.L); });
    E.pressBar("Tap to return",()=>E.go("title")); },
  key(k){ E.keyMenu(k); }
};

// ---- pastor select ----
SC.select = {
  draw(){ G.clear(C.BG); G.ctext("CHOOSE YOUR PASTOR",320,16,C.TITLE,T.XL);
    const list=DATA.pastors.filter(p=>!p.secret||CALVIN_UNLOCKED);
    list.forEach((p,i)=>{ const col=i%2, row=Math.floor(i/2); const x=24+col*300, y=52+row*62; G.rect(x,y,290,56,C.MENU); G.frame(x,y,290,56,C.FRAME,1);
      G.draw(portrait(p.id),x+6,y+2,1.5); G.text(p.name,x+66,y+10,p.secret?C.RESULT:C.TEXT,T.M); G.text(p.years,x+66,y+32,C.GOLD_PALE,T.M);
      E.zone(x,y,290,56,()=>E.go("card",p),i<9?String(i+1):null); });
    E.button("Back",520,368,100,26,()=>E.go("title"),"Escape",C.STONE); },
  key(k){ E.keyMenu(k); }
};
SC.card = {
  enter(p){ this.p=p; },
  draw(){ const p=this.p; G.clear(C.BG); G.box2(10,10,620,380,C.PANEL,C.FRAME);
    G.draw(portrait(p.id),28,28,3); G.text(p.name,140,28,C.TITLE,T.L); G.text("Pastor "+p.years,140,54,C.DIM,T.M);
    const keys=["p","g","c","v","s"]; keys.forEach((k,i)=>{ const y=82+i*22; const shown=p[k]+DATA.statBase; G.text(DATA.statNames[k],140,y,C.TEXT,T.M); G.bar(300,y,190,12,shown/20,shown>=18?C.GOOD:(shown<=13?C.WARN:C.HARBOR)); G.rtext(String(shown),520,y,C.GOLD_PALE,T.S); });
    const by=G.para(DATA.bios[p.id]||"",28,200,C.TEXT,T.S,592,12);
    const ly=Math.max(by+12,266);
    G.text("Your leaders:",28,ly,C.TITLE,T.M); p.party.forEach(([n,r],i)=>{ const yy=ly+20+i*16; G.draw(partyFace(n),28,yy-2,1); G.text(n+", "+r,46,yy,C.TEXT,T.S); });
    if(p.rider) G.text("+ "+p.rider+", Exec. Director",28,ly+20+4*16,C.RESULT,T.S);
    E.button("Choose "+p.short,380,314,230,38,()=>E.go("length",p),"Enter"); E.button("Back",380,356,230,28,()=>E.go("select"),"Escape",C.STONE); },
  key(k){ E.keyMenu(k); }
};
SC.length = {
  enter(p){ this.p=p; },
  draw(){ G.clear(C.BG); G.box2(60,60,520,280,C.PANEL,C.FRAME); G.ctext("HOW FAR WILL YOU GO?",320,82,C.TITLE,T.L);
    G.lines(["You'll play through the whole century either way.","Short Trail: 13 landmarks, about 6 minutes.","Long Trail: all 20 landmarks, about 12 minutes."],92,124,C.TEXT,T.M,20);
    E.menu([{label:"Short Trail",fn:()=>{ newGame(this.p,"short"); E.go("outfit"); }},{label:"Long Trail",fn:()=>{ newGame(this.p,"long"); E.go("outfit"); }}],92,196,436,{rowH:40});
    E.button("Back",92,296,120,30,()=>E.go("card",this.p),"Escape",C.STONE); },
  key(k){ E.keyMenu(k); }
};
SC.outfit = {
  draw(){ G.clear(C.BG); E.statusBar(); G.box2(10,32,620,358,C.PANEL,C.FRAME); G.ctext("BEFORE YOU LEAVE QUEENS",320,46,C.TITLE,T.L);
    G.para("The church has "+Math.round(S.members)+" members, funds of about $"+fmtMoney(S.budgetDollars())+", and a mini-bus. Set your pace and your suppers, then start.",30,74,C.TEXT,T.M,580);
    G.text("Pace",30,118,C.RESULT,T.M);
    E.menu([
      {label:"Sabbath",sub:"Membership and participation grow slowly, stamina and morale deplete more slowly.",selected:S.pace==="sabbath",fn:()=>S.pace="sabbath"},
      {label:"Ordinary",sub:"The balanced program church.",selected:S.pace==="ordinary",fn:()=>S.pace="ordinary"},
      {label:"Growth",sub:"Membership grows fast and fundraising is easier, stamina and morale deplete quickly.",selected:S.pace==="growth",fn:()=>S.pace="growth"}
    ],30,140,290,{rowH:52});
    G.text("Suppers",330,118,C.RESULT,T.M);
    E.menu([
      {label:"Catered meal",sub:"Costs funds, lifts morale.",selected:S.rations==="catered",fn:()=>S.rations="catered"},
      {label:"Potluck dinner",sub:"Free and fine. Small boost to participation.",selected:S.rations==="potluck",fn:()=>S.rations="potluck"},
      {label:"Coffee only",sub:"Saves funds, morale sinks.",selected:S.rations==="coffee",fn:()=>S.rations="coffee"}
    ],330,140,290,{rowH:52,keys:["a","b","c"]});
    E.button("Start the journey",180,352,280,32,()=>E.go("travel"),"Enter",C.SAGE_INK); },
  key(k){ E.keyMenu(k.toLowerCase()); }
};
function paceName(p){ return {sabbath:"Sabbath",ordinary:"Ordinary",growth:"Growth"}[p]; }
function rationName(r){ return {catered:"Catered meal",potluck:"Potluck dinner",coffee:"Coffee only"}[r]; }

// ---- travel ----
SC.travel = {
  acc:0, enter(){ this.acc=0; this.calm=3.0; this.msg=null; this.msgT=0; this.perYear=this.segPace(); },
  // Each leg of the trip takes at least a few seconds of travel, no matter how close two
  // landmark years are, so closely-dated stops never stack up back to back.
  segPace(){ const nx=S.landmarks[S.li+1]; const span=nx?Math.max(1,nx.year-S.year):1;
    // ~2x the old timings so each leg is a visibly longer stretch of road between stops
    const base=S.trailLen==="long"?0.90:0.64, minSeg=S.trailLen==="long"?11:9, pyMax=S.trailLen==="long"?6.4:5.2;
    return clamp(minSeg/span, base, pyMax); },
  update(dt){ if(S.over) return; const perYear=this.perYear||this.segPace(); this.acc+=dt; if(this.calm>0) this.calm-=dt; S.sinceEvent+=dt; S.travelOff+=dt*120;
    if(this.msgT>0){ this.msgT-=dt; return; }
    if(this.acc>=perYear){ this.acc=0; this.step(); } },
  step(){
    const next=S.landmarks[S.li+1]; if(!next) return;
    advanceYear();
    if(S.over){ E.go("gameover"); return; }
    if(S.year>=next.year){ S.li++; E.go(next.type==="cross"?"crossing":(next.type==="end"?"finale":"landmark"), next); return; }
    // breathing room: a calm stretch right after every stop, then spacing between interruptions
    const cool = S.trailLen==="long"?3.5:3.0;
    if(this.calm>0 || S.sinceEvent<cool) return;
    // Taylor's year as Moderator
    if(S.pastor.id==="taylor" && S.year===1983 && !S.moderatorDone){ S.moderatorDone=true; S.sinceEvent=0; E.go("event",{ev:{y:1983,t:["You are elected Moderator of the","reunited church and spend a year","on the road."],fx:{budget:(rnd(21)-10)/100,morale:rnd(21)-10,stam:-2},page:"p.219-231"}}); return; }
    // events tied to a real year fire on that year
    const sp=dueSpecific(); if(sp){ S.sinceEvent=0; E.go("event",{ev:sp}); return; }
    // colour events and notices keep clear of the next milestone
    if(next.year-S.year<=2) return;
    if(S.log.length){ this.msg=S.log.shift(); this.msgT=1.8; S.sinceEvent=0; Sound.bad(); return; }
    if(DATA.presbyteryYears.includes(S.year)){ S.sinceEvent=0; E.go("presbytery"); return; }
    const ev=pickAmbient(); if(ev){ if(ev.invented && S.rider && !S.riderUsed){ S.riderUsed=true; this.msg="Jennifer already handled it."; this.msgT=1.8; S.sinceEvent=0; Sound.good(); return; } S.sinceEvent=0; E.go("event",{ev}); }
  },
  draw(){ drawTravelScene(S.year,S.travelOff,true); G.draw(ART.bus,100,224,2); drawBusRiders(100,224,2);
    E.statusBar();
    G.rect(0,295,640,105,C.PANEL); G.rect(0,295,640,2,C.FRAME);
    const next=S.landmarks[S.li+1]; G.text("Next: "+(next?next.name+" ("+next.year+")":"Centennial Sunday"),12,310,C.TEXT,T.M);
    G.text("Pace: "+paceName(S.pace)+"    Suppers: "+rationName(S.rations),12,330,C.DIM,T.S);
    G.text("Leaders: "+partyAlive().map(p=>p.name.split(" ")[0]+(p.ailment?"*":"")).join(", "),12,348,C.DIM,T.S);
    const hint=lowHint(); if(hint){ const act=hint.act.replace(/\..*/,"."), verb=hint.stat==="Funds"?"are":"is"; G.text(hint.stat+" "+verb+" low. Tap Stop, then "+act.charAt(0).toLowerCase()+act.slice(1),12,368,C.WARN,T.S); }
    if(this.msg){ G.box2(60,180,520,40,C.PANEL,C.TITLE); G.cpara(this.msg,320,192,C.TITLE,T.M,500); }
    E.button("Stop",524,364,104,28,()=>E.go("landmark",{stop:true}),"Escape",C.STONE); },
  key(k){ E.keyMenu(k); }
};

// ---- landmark / stop menu ----
SC.landmark = {
  enter(lm){ this.lm=lm&&lm.stop?null:lm; if(this.lm) Sound.good(); },
  draw(){ const lm=this.lm; G.clear(C.BG); drawSceneBand(lm); E.statusBar();
    G.rect(0,150,640,250,C.PANEL); G.rect(0,150,640,2,C.FRAME);
    if(lm){ G.text(lm.year+": "+lm.name,12,158,C.TITLE,T.M); G.lines(lm.scene,12,180,C.TEXT,T.M,18); }
    else { G.text(S.year+": You pull over.",12,158,C.TITLE,T.M); G.lines(["The mini-bus is idling. Everyone looks to you. What now?"],12,180,C.TEXT,T.M); }
    const driveUsed = S.driveLandmark===S.li;
    const left=[
      {label:"Continue on the trail",fn:()=>E.go("travel")},
      {label:"Check supplies & leaders",fn:()=>E.go("supplies")},
      {label:"Look at the map",fn:()=>E.go("map")},
      {label:"Change pace or suppers",fn:()=>E.go("pace")}
    ];
    const right=[
      {label:"Rest a year",sub:"+ leaders' energy, morale, stamina. Costs $.",fn:()=>this.rest()},
      {label:"Stewardship drive"+(driveUsed?" (done here)":""),sub:driveUsed?"Once per stop.":"+ funds and participation. Costs morale.",dim:driveUsed,fn:()=>E.go("drive")}
    ];
    if(lm && lm.fact) right.push({label:"Did you know?",sub:"A true story from the church's history.",fn:()=>E.go("fact",{lines:lm.fact,page:lm.page,paras:true})});
    if(S.pastor.id==="fogartie" && !S.hymnDecade[decade()]) right.push({label:"Sing a hymn",sub:"Once a decade. Restores all your leaders.",fn:()=>{ S.hymnDecade[decade()]=true; applyFx({energy:40,morale:5}); Sound.hymn(); E.go("note",{lines:["You sing. All your leaders are","restored. Someone asks for","a second verse."]}); }});
    const my=lm?180+lm.scene.length*18+10:210;
    E.menu(left,12,my,300,{rowH:28,numbered:false});
    E.menu(right,328,my,300,{rowH:40,numbered:false});
    // proactive nudge: a building campaign is near and reserves are thin
    const cost=S.pastor.id==="clifford"?0.45:0.40, nx=S.landmarks[S.li+1], nx2=S.landmarks[S.li+2];
    const camp=(nx&&nx.type==="cross")?nx:((nx2&&nx2.type==="cross")?nx2:null);
    if(camp && S.budget<cost && !driveUsed) G.text("A building campaign is coming in "+camp.year+". A pledge drive now builds reserves.",12,380,C.WARN,T.S);
  },
  rest(){ advanceYear(); applyFx({energy:25,part:8,morale:2,stam:3,budget:-0.02}); if(S.over){ E.go("gameover"); return; } E.go("note",{lines:["You rest for a year and nothing","breaks. Your leaders recover and","so do you."]}); },
  key(k){ E.keyMenu(k); }
};
SC.note = { enter(a){ this.a=a; }, draw(){ G.clear(C.BG); E.statusBar(); G.box2(60,110,520,180,C.PANEL,C.FRAME); G.clines(this.a.lines,320,144,C.TEXT,T.M,22); E.pressBar("Tap to continue",()=>E.go(this.a.next||"landmark",{stop:true})); }, key(k){ E.keyMenu(k); } };
SC.fact = { enter(a){ this.a=a; }, draw(){ G.clear(C.BG); E.statusBar(); G.box2(32,40,576,320,C.PANEL,C.TITLE); G.ctext("DID YOU KNOW?",320,56,C.TITLE,T.L);
    let y=90; if(this.a.paras){ y=G.para(this.a.lines,56,y,C.TEXT,T.M,528,20); } else { y=G.lines(this.a.lines,56,y,C.TEXT,T.M,20); }
    G.text(this.a.invented?"This one we made up.":("A Legacy of Love, "+(this.a.page||"")),56,330,C.RESULT,T.S);
    E.pressBar("Tap to continue",()=>E.go(this.a.next||"landmark",{stop:true})); }, key(k){ E.keyMenu(k); } };

SC.supplies = {
  draw(){ G.clear(C.BG); E.statusBar(); G.box2(10,32,620,358,C.PANEL,C.FRAME); G.ctext("SUPPLIES & LEADERS, "+S.year,320,46,C.TITLE,T.L);
    const exp=lerpAnchors(DATA.memberAnchors,S.year);
    const rows=[
      ["Funds","$"+fmtMoney(S.budgetDollars()),clamp(S.budget,0,1.5)/1.5,G.level(S.budget,0.6,0.3)],
      ["Members",Math.round(S.members),clamp(S.members/exp,0,1),G.level(S.members/exp,0.8,0.5)],
      ["Morale",Math.round(S.morale),S.morale/100,G.level(S.morale/100,0.5,0.3)],
      ["Participation",Math.round(S.part),S.part/100,G.level(S.part/100,0.4,0.2)],
      ["Your stamina",Math.round(S.stam),S.stam/100,G.level(S.stam/100,0.5,0.3)]
    ];
    rows.forEach((r,i)=>{ const y=76+i*22; G.text(r[0],30,y,C.TEXT,T.M); G.rtext(String(r[1]),300,y,C.TEXT,T.M); G.bar(320,y,290,12,r[2],r[3]); });
    G.text("Your leaders",30,196,C.TITLE,T.M); S.party.forEach((p,i)=>{ const y=218+i*22; G.draw(partyFace(p.name),30,y-2,1); G.text(p.name,52,y,p.gone?C.STONE:C.TEXT,T.M); G.text(p.role,280,y,C.DIM,T.S); if(p.gone) G.rtext("called elsewhere",560,y,C.STONE,T.S); else { G.bar(440,y+1,120,10,p.energy/100,G.level(p.energy/100,0.45,0.25)); if(p.ailment) G.rtext(p.ailment,560,y-10,C.WARN,T.S); } });
    if(S.rider) G.text(S.rider+" (Exec. Director)"+(S.riderUsed?" - has handled it":""),30,218+4*22,C.RESULT,T.S);
    G.text("Campaigns: "+S.cash+" paid in cash, "+S.borrowed+" borrowed",30,340,C.DIM,T.S);
    E.pressBar("Tap to return",()=>E.go("landmark",{stop:true})); },
  key(k){ E.keyMenu(k); }
};
SC.map = {
  draw(){ G.clear(C.BG); E.statusBar(); G.box2(10,32,620,358,C.PANEL,C.FRAME); G.ctext("THE TRAIL",320,46,C.TITLE,T.L);
    const lms=S.landmarks; const n=lms.length; const x0=40, x1=600; G.rect(x0,112,x1-x0,4,C.FRAME);
    lms.forEach((lm,i)=>{ const x=x0+(x1-x0)*i/(n-1); const done=i<=S.li; G.rect(x-4,106,8,16,lm.type==="cross"?(done?C.CLAY:C.CLAY_INK):(done?C.TITLE:C.STONE)); if(i%2===0) G.ctext(String(lm.year),x,128,done?C.TEXT:C.STONE,T.S); else G.ctext(String(lm.year),x,92,done?C.TEXT:C.STONE,T.S); });
    const px=x0+(x1-x0)*clamp((S.year-1926)/100,0,1); G.draw(ART.bus,px-24,66,1);
    G.text("You are in "+S.year+".  "+(100-(S.year-1926))+" years to go.",40,166,C.TEXT,T.M);
    G.text("Clay markers are building projects.",40,190,C.RESULT,T.M);
    const next=lms[S.li+1]; if(next) G.lines(["Next stop: "+next.year+", "+next.name],40,220,C.TITLE,T.M);
    E.pressBar("Tap to return",()=>E.go("landmark",{stop:true})); },
  key(k){ E.keyMenu(k); }
};
SC.pace = {
  draw(){ G.clear(C.BG); E.statusBar(); G.box2(10,32,620,358,C.PANEL,C.FRAME); G.ctext("PACE AND SUPPERS",320,46,C.TITLE,T.L);
    G.text("Pace",30,80,C.RESULT,T.M);
    E.menu([
      {label:"Sabbath",sub:"Membership and participation grow slowly, stamina and morale deplete more slowly.",selected:S.pace==="sabbath",fn:()=>S.pace="sabbath"},
      {label:"Ordinary",sub:"The balanced program church.",selected:S.pace==="ordinary",fn:()=>S.pace="ordinary"},
      {label:"Growth",sub:"Membership grows fast and fundraising is easier, stamina and morale deplete quickly.",selected:S.pace==="growth",fn:()=>S.pace="growth"}
    ],30,102,290,{rowH:52,numbered:false});
    G.text("Suppers",330,80,C.RESULT,T.M);
    E.menu([
      {label:"Catered meal",sub:"Costs funds, lifts morale.",selected:S.rations==="catered",fn:()=>S.rations="catered"},
      {label:"Potluck dinner",sub:"Free and fine. Small boost to participation.",selected:S.rations==="potluck",fn:()=>S.rations="potluck"},
      {label:"Coffee only",sub:"Saves funds, morale sinks.",selected:S.rations==="coffee",fn:()=>S.rations="coffee"}
    ],330,102,290,{rowH:52,numbered:false});
    E.pressBar("Tap to return",()=>E.go("landmark",{stop:true})); },
  key(k){ E.keyMenu(k); }
};

// ---- events ----
SC.event = {
  enter(a){ this.ev=a.ev; this.dyear=(typeof this.ev.y==="number")?this.ev.y:S.year; this.result=null; this.next=a.next||"travel"; S.eventsSeen++; if(this.ev.straight) Sound.beep(440,0.1); else Sound.beep(700,0.06);
    if(this.ev.hugh){ const good=Math.random()<0.5; if(good){ this.result=["He waves you through.","You skip a year of trouble."]; S.year++; if(S.year>2026)S.year=2026; } else { this.result=["He holds you up to let a","funeral pass. You lose a year."]; advanceYear(); } }
    else if(this.ev.fx && !this.ev.choice && !this.ev.check){ this.result=applyFx(this.ev.fx,{outreach:true}); }
    else if(this.ev.check && !this.ev.choice){ this.result=this.resolveCheck(this.ev.check); } },
  resolveCheck(ch){ const ok=roll(ch.stat); const fx=ok?ch.pass:ch.fail; const r=applyFx(fx,{sermon:ch.stat==="p"}); const nm=DATA.statNames[ch.stat]; r.unshift(ok ? "Your "+nm+" carries the day." : "Your "+nm+" falls short this time."); return r; },
  draw(){ const ev=this.ev; G.clear(C.BG); E.statusBar(); const straight=ev.straight; G.box2(30,42,580,318,C.PANEL,straight?C.FRAME:C.TITLE);
    G.text(String(this.dyear),50,54,C.TITLE,T.M); if(ev.invented) G.rtext("we made this one up",588,56,C.DIM,T.S);
    let y=G.lines(ev.t,50,80,C.TEXT,T.M,20);
    if(ev.hugh) G.draw(ART.hugh,540,74,3);
    const ty=y+8;
    if(this.result){ const ry=G.lines(this.result,50,ty,C.RESULT,T.M,20);
      const items=[{label:"Continue",fn:()=>E.go(this.next)}]; if(ev.page||ev.invented) items.push({label:"Did you know?",fn:()=>E.go("fact",{lines:ev.fact||ev.t,page:ev.page,invented:ev.invented,paras:!!ev.fact,next:this.next})});
      E.menu(items,50,Math.min(ry+6,306),280,{rowH:30}); }
    else if(ev.choice){ E.menu(ev.choice.map(c=>({label:c.label,fn:()=>{ this.result = c.check? this.resolveCheck(c.check) : applyFx(c.fx,{outreach:true}); if(!this.result.length) this.result=["Noted."]; }})),50,ty,500,{rowH:30}); }
  },
  key(k){ E.keyMenu(k); }
};
SC.presbytery = {
  enter(){ this.trade=pick(DATA.presbytery); this.result=null; },
  draw(){ G.clear(C.BG); E.statusBar(); G.box2(30,42,580,318,C.PANEL,C.RESULT); G.ctext("PRESBYTERY MEETING, "+S.year,320,56,C.RESULT,T.M);
    G.lines(["The Presbytery is meeting. They","have a request:"],50,88,C.TEXT,T.M,20); G.lines(this.trade.t,50,132,C.TITLE,T.M,20);
    if(this.result){ G.lines(this.result,50,186,C.RESULT,T.M,20); E.menu([{label:"Continue",fn:()=>E.go("travel")},{label:"What is a Presbytery?",fn:()=>E.go("fact",{lines:DATA.presbyteryFact,page:"",next:"travel"})}],50,264,320,{rowH:30}); }
    else E.menu([{label:"Agree",fn:()=>{ this.result=applyFx(this.trade.fx); }},{label:"Politely decline",fn:()=>{ this.result=["You decline. They say they'll find","someone else but you can detect","some sass."]; applyFx({stam:-1}); }},{label:"What is a Presbytery?",fn:()=>E.go("fact",{lines:DATA.presbyteryFact,page:"",next:"presbytery"})}],50,186,320,{rowH:30}); },
  key(k){ E.keyMenu(k); }
};

// ---- crossing (building project) ----
// Economy: budget is reserves, 1.0 = a healthy year. A campaign draws down reserves.
// You can only pay cash when you have the reserves; a fundraising drive builds them up.
SC.crossing = {
  enter(lm){ this.lm=lm; this.result=null; this.waited=0; Sound.beep(330,0.1); },
  cost(){ return S.pastor.id==="clifford"?0.45:0.40; },
  draw(){ const lm=this.lm; G.clear(C.BG); drawSceneBand(lm,100); E.statusBar();
    G.rect(0,100,640,300,C.PANEL); G.rect(0,100,640,2,C.RESULT);
    G.text(lm.year+": "+lm.name.toUpperCase(),12,108,C.RESULT,T.M);
    if(this.result){ G.lines(this.result,16,150,C.RESULT,T.M,22); E.menu([{label:"Continue",fn:()=>E.go("landmark",this.lm)},{label:"Did you know?",fn:()=>E.go("fact",{lines:lm.fact,page:lm.page,paras:true,next:"landmarkLm"})}],16,252,320,{rowH:30}); return; }
    G.lines(lm.scene,12,126,C.TEXT,T.M,16);
    const cost=this.cost(), anchor=lerpAnchors(DATA.budgetAnchors,S.year);
    const haveD=fmtMoney(S.budgetDollars()), costD=fmtMoney(cost*anchor), canCash=S.budget>=cost, shortD=fmtMoney(Math.max(0,(cost-S.budget)*anchor));
    G.text("In real life the "+lm.campaign+" raised $"+fmtMoney(lm.goal)+".",12,160,C.DIM,T.S);
    // ledger: what you have vs what it costs
    const boxY=174, boxH=56;
    const drawBox=(x,hdr,label,val,frac,fg)=>{ G.box(x,boxY,300,boxH,C.CHAR,C.FRAME); G.rect(x,boxY,300,16,C.HARBOR_INK); G.text(hdr,x+8,boxY+4,C.PAPER,T.S);
      G.text(label,x+10,boxY+22,C.DIM,T.S); G.text("$"+val,x+10,boxY+32,C.TEXT,T.M); G.bar(x+10,boxY+boxH-11,280,6,frac,fg); };
    drawBox(16,"WHAT YOU HAVE","Reserves",haveD,clamp(S.budget/cost,0,1),canCash?C.GOOD:C.CLAY);
    drawBox(324,"WHAT IT WILL COST","Our share",costD,1,C.GOLD);
    // verdict: the one line that answers "do I need to raise money?"
    const vy=236; G.rect(20,vy,12,12,canCash?C.GOOD:C.BAD);
    G.text(canCash?"You can cover this in cash.":("You're short $"+shortD+" - raise funds, borrow, or defer."),38,vy+2,canCash?C.GOOD:C.CLAY_LIGHT,T.M);
    G.text("How will the church pay?",16,vy+20,C.RESULT,T.S);
    E.menu([
      {label:"Pay cash",tag:canCash?("-$"+costD):("need $"+shortD+" more"),dim:!canCash,fn:()=>this.cash()},
      {label:"Hold a pledge drive",tag:"raise funds now",fn:()=>E.go("drive",{back:"crossing",lm:this.lm})},
      {label:"Borrow",tag:"10% down, 6 yrs",fn:()=>this.borrow()},
      {label:"Hire a consultant",tag:"-8%, Vision check",fn:()=>this.consult()},
      {label:"Wait a year",tag:"reserves grow",fn:()=>this.wait()}
    ],16,vy+34,608,{rowH:25,numbered:false}); },
  cash(){ S.budget-=this.cost(); S.cash++; applyFx({morale:6,part:4}); this.result=["Paid in full. Session is glad we","didn't take on debt."]; Sound.good(); },
  borrow(){ S.budget-=0.10; S.debtYears=6; S.borrowed++; applyFx({morale:-3}); this.result=["You take out a loan and budgets","tighten for the next six years."]; },
  consult(){ S.budget-=0.08; const ok=roll("v"); if(ok){ S.cash++; applyFx({morale:8,part:6,budget:0.04}); this.result=["The campaign beats its goal.","Everyone gets a piece of the old","slate roof."]; Sound.good(); } else { S.budget-=0.08; S.debtYears=4; S.borrowed++; this.result=["The consultant produces a binder","full of ideas, none of them are","any good."]; Sound.bad(); } },
  wait(){ advanceYear(); this.waited++; applyFx({budget:0.06,part:-4,morale:-3}); if(S.over){ E.go("gameover"); return; } if(this.waited>=3){ this.result=["Three years of waiting. The committee","quietly builds it on a mortgage."]; S.debtYears=6; S.borrowed++; } }
};
SC.landmarkLm = { enter(){ E.go("landmark",SC.crossing.lm); }, draw(){} };

// ---- game over / win ----
SC.gameover = {
  enter(){ Sound.bad(); const key=S.pastor.id==="calvin"?"calvin":S.over; this.lines=DATA.gameOver[key]||DATA.gameOver.stamina; track("session_end",endRow(S.over)); },
  draw(){ G.clear(C.BG); G.box2(40,40,560,320,C.PANEL,C.FRAME); G.ctext("THE END OF THE ROAD, "+S.year,320,56,C.BAD,T.M);
    G.rect(260,90,120,70,C.STONE_MID); G.frame(260,90,120,70,C.FRAME,2); G.ctext(S.pastor.short.toUpperCase(),320,106,C.TEXT,T.M); G.ctext("1926-"+S.year,320,128,C.GOLD_PALE,T.S);
    G.clines(this.lines,320,178,C.TEXT,T.M,22);
    G.ctext("Score: "+score().total,320,256,C.TITLE,T.M);
    E.menu([{label:"Enter your initials",fn:()=>E.go("initials")},{label:"Back to the title",fn:()=>E.go("title")}],180,290,280,{rowH:30}); },
  key(k){ E.keyMenu(k); }
};
// ============================================================
// THE PROVIDENCE ROAD HOME: the centennial victory-lap drive. The diagonal
// road scrolls past a fixed bus while you steer around a hundred years of
// traffic. At the end the painted fork slides in and the bus rolls up to
// Hugh McManaway; you steer to CHOOSE your road. The top and middle branches
// take you home to the church; the bottom-right one wanders off to Freedom
// Park (the gentle "scenic route" -- grace abounds, you win anyway).
// ============================================================
SC.finale = {
  // painted-fork frame (measured from drivehome_road.png). Junction J, the three
  // branch directions, and the diagonal road axis AU/PU all match the painted art.
  AU:{x:0.818,y:-0.575}, PU:{x:0.575,y:0.818}, J:{x:384,y:198},
  BR:{ up:{x:0.086,y:-0.996}, upperRight:{x:0.905,y:-0.426}, lowerRight:{x:0.892,y:0.451} },
  // scroll phase: diagonal road scrolls past a fixed bus; the painted fork slides in along the
  // road (offset = AU*gap) and settles once arrived. ANCHOR sits on the painted approach.
  // SPD/FINISH set the journey: FINISH/SPD seconds of driving before the fork (~59s = a long trip).
  // SPAWN_AHEAD sits just beyond the top edge so cars slide on from off-screen (no mid-road pop-in);
  // SPAWN_STOP clears the traffic well before the fork so the decision is calm.
  ANCHOR:{x:196,y:330}, HALFW:118, LAT:74, SPD:100, FINISH:5900, SLIDE:260, SPAWN_AHEAD:620, SPAWN_STOP:650,
  LANE:0.5, HITU:0.42,  // cars sit in lanes at |u|=LANE, well inside the bus's +-1 reach; a small lean toward the open lane clears them (forgiving hitbox)
  enter(){
    this.phase="intro"; this.t=0; this.dist=0; this.u=0; this.steer=0; this.bumps=0; this.flash=0;
    this.cars=[]; this.cones=[]; this.spawnW=0; this.coneNext=0; this.wrong=false; this.choice=null; this.aim="upperRight";
    this.at=0; this.exitT=0; this.busS=null; this.chooseT=0; this.hitMsg=null;
  },
  start(){ this.phase="play"; this.t=0; this.dist=0; this.u=this.LANE; this.cars=[]; this.cones=[];
    // one staggered stream of traffic (alternating sides), already filling the road ahead so nothing pops in
    this.spawnW=this.dist+140; this.coneNext=this.dist+760; this.fillAhead(); },
  choose(u){ return u<-0.33?"up":(u>0.33?"lowerRight":"upperRight"); },
  sp(w,u){ const k=w-this.dist; return {x:this.ANCHOR.x+this.AU.x*k+this.PU.x*u*this.LAT, y:this.ANCHOR.y+this.AU.y*k+this.PU.y*u*this.LAT}; },
  busExitPos(){ const J=this.J, d=this.BR[this.choice], E={x:J.x+d.x*760,y:J.y+d.y*760};
    if(this.exitT<0.45){ const t=this.exitT/0.45, e=t*t*(3-2*t); return {x:this.busS.x+(J.x-this.busS.x)*e,y:this.busS.y+(J.y-this.busS.y)*e}; }
    const t=(this.exitT-0.45)/0.55, e=t*t*(3-2*t); return {x:J.x+(E.x-J.x)*e,y:J.y+(E.y-J.y)*e}; },
  // oncoming cars keep to the bus's left (u<0) and face you; cars you overtake keep to the right (u>0)
  addCar(w, onc){ const suv=Math.random()<0.45;
    const u=(onc?-1:1)*this.LANE, v=onc? -84 : 22;   // one speed per lane, so same-lane cars keep their spacing and never bunch up
    this.cars.push({w, u, v, suv, onc, hit:false}); },
  addCone(w){ const onc=Math.random()<0.5; this.cones.push({w, u:(onc?-1:1)*this.LANE, hit:false}); },
  // a car's live lateral position: its lane, but swerving into the open lane to go around any cones in its own lane
  laneOf(o){ let u=o.u; for(const c of this.cones){ if((c.u<0)!==(o.u<0)) continue; const near=Math.max(0,1-Math.abs(o.w-c.w)/120); if(near>0) u += (-1.9*o.u)*near; } return clamp(u,-0.95,0.95); },
  coneBlocks(w){ return this.cones.some(c=>Math.abs(w-c.w)<150); },   // traffic steers clear of the roadwork, leaving the other lane open
  // keep one staggered stream of cars (plus the odd construction area) on the road ahead, spaced so cars never
  // overlap each other and there is always an open lane to weave into
  fillAhead(){ const horizon=this.dist+this.SPAWN_AHEAD, stop=this.FINISH-this.SPAWN_STOP;
    while(this.coneNext<Math.min(horizon+360,this.FINISH-900)){ this.addCone(this.coneNext); this.coneNext+=1400+Math.random()*1500; }  // register cones ahead of the car fill so their lane is always cleared
    while(this.spawnW<horizon){ const w=this.spawnW; this.spawnW+=150+Math.random()*150;
      if(w>stop || this.coneBlocks(w)) continue; this.addCar(w, Math.random()<0.6); } },
  confirm(){ if(this.phase!=="choose"||this.chooseT<0.35) return; this.choice=this.choose(this.u); this.wrong=(this.choice==="lowerRight"); this.busS=this.sp(this.FINISH,this.u); this.phase="exit"; this.exitT=0; Sound.good(); },
  update(dt){
    this.t+=dt; if(this.flash>0) this.flash-=dt;
    if(this.phase==="play"){
      this.u=clamp(this.u+this.steer*2.2*dt,-1,1);
      const pv=this.dist; this.dist+=this.SPD*dt;
      for(const o of this.cars){ const relB=o.w-pv; o.w+=o.v*dt; const relA=o.w-this.dist; o.eu=this.laneOf(o);
        if(!o.hit&&relB>0&&relA<=0){ o.hit=true; if(Math.abs(this.u-o.eu)<this.HITU){ this.bumps++; this.flash=0.9; this.hitMsg=pick(["Bomp!","Crunch!","Whoops!","Oof!"]); Sound.bad(); } } }
      for(const c of this.cones){ if(!c.hit && c.w>pv && c.w<=this.dist){ c.hit=true; if(Math.abs(this.u-c.u)<this.HITU){ this.bumps++; this.flash=0.9; this.hitMsg=pick(["Cones!","Watch the cones!","Bonk!"]); Sound.bad(); } } }
      this.cars=this.cars.filter(o=>{ const r=o.w-this.dist; return r>-150 && r<this.SPAWN_AHEAD+90; });
      this.cones=this.cones.filter(c=>c.w-this.dist>-160);
      this.fillAhead();
      if(this.dist>=this.FINISH){ this.dist=this.FINISH; this.u=0; this.cars=[]; this.cones=[]; this.phase="choose"; this.chooseT=0; }
      return;
    }
    if(this.phase==="choose"){ this.chooseT+=dt; this.u=clamp(this.u+this.steer*1.4*dt,-1,1); this.aim=this.choose(this.u); return; }
    if(this.phase==="exit"){ this.exitT+=dt/2.0; if(this.exitT>=1){ this.phase="arrive"; this.at=0; } }
  },
  drawRoad(){
    G.rect(0,0,640,400,C.GROUND);
    const AU=this.AU,PU=this.PU,A=this.ANCHOR,HW=this.HALFW,FAR=1100, x=G.ctx;
    const off=(p,w)=>({x:p.x+PU.x*w,y:p.y+PU.y*w});
    const c0={x:A.x-AU.x*FAR,y:A.y-AU.y*FAR}, c1={x:A.x+AU.x*FAR,y:A.y+AU.y*FAR};
    const poly=(pts,ci)=>{ x.fillStyle=PAL[ci]; x.beginPath(); x.moveTo(pts[0].x,pts[0].y); for(let i=1;i<pts.length;i++)x.lineTo(pts[i].x,pts[i].y); x.closePath(); x.fill(); };
    poly([off(c0,-(HW+6)),off(c1,-(HW+6)),off(c1,HW+6),off(c0,HW+6)],C.INK);
    poly([off(c0,-HW),off(c1,-HW),off(c1,HW),off(c0,HW)],C.ROAD);
    const gap=30,dl=15, s=Math.floor((this.dist-FAR)/gap)*gap;
    for(let w=s; w<this.dist+FAR; w+=gap){ const a=this.sp(w,0), b=this.sp(w+dl,0); poly([off(a,-3),off(b,-3),off(b,3),off(a,3)],C.GOLD_PALE); }
  },
  // glowing chevrons pointing out along the branch currently aimed at
  drawAim(){ const x=G.ctx, J=this.J, d=this.BR[this.aim], n={x:-d.y,y:d.x};
    x.save(); x.strokeStyle=PAL[C.GOLD]; x.lineWidth=4; x.lineCap="round"; x.globalAlpha=0.5+0.4*Math.sin(this.t*6);
    for(let i=1;i<=3;i++){ const p={x:J.x+d.x*(46+i*30),y:J.y+d.y*(46+i*30)};
      x.beginPath(); x.moveTo(p.x-n.x*9-d.x*9,p.y-n.y*9-d.y*9); x.lineTo(p.x,p.y); x.lineTo(p.x+n.x*9-d.x*9,p.y+n.y*9-d.y*9); x.stroke(); }
    x.restore(); },
  draw(dt){
    const gap=this.FINISH-this.dist, settled=(this.phase==="choose"||this.phase==="exit"||this.phase==="arrive");
    if(settled){ if(ROAD_IMG_READY) G.ctx.drawImage(ROAD_IMG,0,0,640,400); else this.drawRoad(); }
    else { this.drawRoad();
      // crossfade the painted intersection in at its ALIGNED position (not sliding along the road axis, which left a seam against the procedural road)
      if(ROAD_IMG_READY && gap<this.SLIDE){ const a=Math.max(0,Math.min(1,1-gap/this.SLIDE)), x=G.ctx; x.save(); x.globalAlpha=a; x.drawImage(ROAD_IMG,0,0,640,400); x.restore(); } }
    // destination labels at the branch tips while choosing
    if(this.phase==="choose"){ this.drawAim();
      const tip=k=>({x:this.J.x+this.BR[k].x*118,y:this.J.y+this.BR[k].y*118});
      const lab=(k,txt)=>{ const p=tip(k), on=(this.aim===k); G.ctext(txt,clamp(p.x,46,594),p.y-5,on?C.TITLE:C.PAPER,T.S); };
      lab("up","CHURCH"); lab("upperRight","CHURCH"); lab("lowerRight","FREEDOM PARK"); }
    const items=[];
    if(this.phase==="play"){ for(const o of this.cars){ const rel=o.w-this.dist; if(rel<-120||rel>this.SPAWN_AHEAD+60) continue; const spr=o.onc?(o.suv?ART.suvOrthoRev:ART.carOrthoRev):(o.suv?ART.suvOrtho:ART.carOrtho),w=spr[0].length,h=spr.length,p=this.sp(o.w,o.eu!=null?o.eu:o.u); items.push({d:o.w,fn:()=>G.draw(spr,p.x-w,p.y-h,2)}); }
      // roadwork: a little row of cones marking a lane that is closed ahead
      for(const c of this.cones){ const rel=c.w-this.dist; if(rel<-120||rel>this.SPAWN_AHEAD+60) continue; const spr=ART.cone,w=spr[0].length,h=spr.length;
        for(let k=-1;k<=1;k++){ const cw=c.w+k*30, p=this.sp(cw,c.u); items.push({d:cw+2,fn:()=>G.draw(spr,p.x-w,p.y-h*2,2)}); } } }
    let busPos=null;
    if(this.phase==="play") busPos=this.sp(this.dist,this.u);
    else if(this.phase==="choose") busPos=this.sp(this.FINISH,this.u);
    else if(this.phase==="exit") busPos=this.busExitPos();
    if(busPos){ const spr=ART.minibusOrtho,w=spr[0].length,h=spr.length; items.push({d:(this.phase==="play"?this.dist:-1e9),fn:()=>G.draw(spr,busPos.x-w,busPos.y-h,2)}); }
    items.sort((a,b)=>b.d-a.d); items.forEach(it=>it.fn());
    // hit feedback: a small popup in the lower third of the screen
    if(this.phase==="play" && this.flash>0 && this.hitMsg){ G.box2(252,294,136,34,C.CLAY_INK,C.CLAY_LIGHT); G.ctext(this.hitMsg,320,304,C.PAPER,T.L); }
    // HUD
    G.rect(0,0,640,20,C.PANEL); G.text("THE DRIVE HOME",8,4,C.TITLE,T.M); const pr=clamp(this.dist/this.FINISH,0,1);
    G.text("1926",372,5,C.DIM,T.S); G.bar(422,7,150,7,pr,C.SAGE); G.text("2026",578,5,C.DIM,T.S);
    if(this.phase==="play"){ G.rect(0,378,640,22,C.PANEL); G.ctext("HOLD LEFT OR RIGHT  (or arrow keys)  TO STEER",320,383,C.PAPER,T.M); }
    if(this.phase==="choose"){ G.rect(0,378,640,22,C.PANEL);
      G.ctext("STEER LEFT / RIGHT TO CHOOSE YOUR ROAD",320,383,C.PAPER,T.M);
      if(this.chooseT>0.35){ G.box2(234,338,172,34,C.PANEL,C.SAGE); G.ctext("TAKE THIS ROAD",320,348,C.TITLE,T.M); } }
    if(this.phase==="intro"){ G.box2(60,78,520,244,C.PANEL,C.TITLE); G.ctext("THE DRIVE HOME",320,92,C.TITLE,T.XL);
      G.cpara("Drive the church bus, up Providence Road to Centennial Sunday. Hold the left or right side of the screen to steer around the oncoming traffic and the roadwork. As you near the intersection of Providence, Providence, Queens, and Queens, steer to pick your road -- home to the church, or the scenic way by Freedom Park.",320,124,C.TEXT,T.M,472,20);
      E.button("Drive home",230,282,180,36,()=>this.start(),"Enter",C.SAGE_INK); }
    if(this.phase==="arrive"){ this.at+=dt; const wrong=this.wrong;
      G.box2(70,120,500,170,C.PANEL,wrong?C.CLAY_LIGHT:C.TITLE);
      if(wrong){ G.ctext("THE SCENIC ROUTE",320,138,C.TITLE,T.XL); G.cpara("You followed the road down to Freedom Park instead. Not a terrible choice, but you missed the Centennial celebration!",320,174,C.TEXT,T.M,440,20); }
      else { G.ctext("CENTENNIAL SUNDAY",320,138,C.TITLE,T.XL); G.cpara(this.bumps===0?"You pulled the bus up to the doors without a scratch! Nice work.":"A few bumps along the way, but the bus made it to the doors.",320,174,C.TEXT,T.M,440,20); }
      if(this.at>0.4) E.button("Continue",230,250,180,34,()=>this.finish(),"Enter",C.SAGE_INK); }
  },
  finish(){ S.homecoming=(!this.wrong&&this.bumps===0); S.finaleWrong=this.wrong; S.finaleChoice=this.choice; E.go("win"); },
  tap(x,y,id){ if(this.phase==="play"){ this.steer=x<320?-1:1; this.u=clamp(this.u+this.steer*0.12,-1,1); return true; }
    if(this.phase==="choose"){ if(this.chooseT>0.35 && x>=220 && x<=420 && y>=330){ this.confirm(); return true; } this.steer=x<320?-1:1; return true; }
    return false; },
  move(x,y,down){ if((this.phase==="play"||this.phase==="choose")&&down) this.steer=x<320?-1:1; },
  up(){ this.steer=0; },
  key(k){ if(this.phase==="play"||this.phase==="choose"){ if(k==="ArrowLeft") this.steer=-1; else if(k==="ArrowRight") this.steer=1; else if((k==="Enter"||k===" ")&&this.phase==="choose") this.confirm(); return; } E.keyMenu(k); },
  keyup(k){ if(k==="ArrowLeft"&&this.steer<0) this.steer=0; if(k==="ArrowRight"&&this.steer>0) this.steer=0; }
};
SC.win = {
  enter(){ S.reached2026=true; S.year=2026; Sound.hymn(); this.t=0; this.fw=[]; this.sp=[]; this.spawnT=0.25; Store.stat("wins"); track("session_end",endRow("win")); },
  FWCOL:[C.CLAY,C.CLAY_INK,C.PLUM,C.HARBOR_INK,C.SAGE_INK,C.PLUM_INK,C.GOLD_INK],
  // 8-bit fireworks in the sky: rockets rise from the ground line and burst into a ring of blocky sparks that arc down under gravity and fade
  fwUpdate(dt){ dt=Math.min(dt||0,0.05);
    this.spawnT-=dt;
    if(this.spawnT<=0){ this.fw.push({x:50+Math.random()*540,y:250,ty:96+Math.random()*96,vy:-(150+Math.random()*55),col:pick(this.FWCOL)}); this.spawnT=0.45+Math.random()*0.7; }
    this.fw=this.fw.filter(r=>{ r.y+=r.vy*dt; if(r.y<=r.ty){ this.burst(r); return false; } return true; });
    this.sp=this.sp.filter(s=>{ s.life-=dt; s.x+=s.vx*dt; s.y+=s.vy*dt; s.vy+=170*dt; s.vx*=0.985; return s.life>0 && s.y<250; }); },
  burst(r){ const n=18+((Math.random()*10)|0), sp=64+Math.random()*44;
    for(let i=0;i<n;i++){ const a=(i/n)*6.2832, v=sp*(0.55+Math.random()*0.6);
      this.sp.push({x:r.x,y:r.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,life:0.7+Math.random()*0.55,col:r.col}); }
    this.sp.push({x:r.x,y:r.y,vx:0,vy:0,life:0.12,col:C.PAPER,flash:true});
    if(Math.random()<0.75) Sound.firework(); },
  fwDraw(){
    for(const r of this.fw){ G.rect((r.x-1)|0,(r.y-2)|0,3,6,r.col); G.rect((r.x-1)|0,(r.y+4)|0,3,4,C.GOLD_INK); }
    for(const s of this.sp){ if(s.flash){ G.rect((s.x-4)|0,(s.y-4)|0,9,9,C.PAPER); continue; }
      const sz=s.life>0.28?3:2, c=s.life>0.22?s.col:C.GOLD_INK; G.rect((s.x-(sz>>1))|0,(s.y-(sz>>1))|0,sz,sz,c); } },
  draw(dt){ this.t+=dt; drawSky(0,250,false);
    this.fwUpdate(dt); this.fwDraw();
    G.rect(0,250,640,150,C.GROUND); G.rect(0,250,640,3,C.SAGE); drawChurch(300,118,2); G.draw(ART.bus,40+Math.min(120,this.t*60),234,2);
    G.rect(0,0,640,84,C.PANEL); G.ctext("CENTENNIAL SUNDAY, 2026",320,12,C.TITLE,T.XL); G.ctext("You made it. One hundred years.",320,44,C.TEXT,T.M);
    G.ctext(S.finaleWrong?"You took the scenic route by Freedom Park. Grace abounds.":(S.homecoming?"You drove the bus straight home without a scratch.":"The bus rolled up with a few more dings and dents."),320,64,C.RESULT,T.M);
    const sc=score(); G.box2(20,300,600,96,C.PANEL,C.FRAME);
    G.text("Members "+Math.round(S.members)+"    Funds $"+fmtMoney(S.budgetDollars())+"    Leaders aboard "+partyAlive().length,34,312,C.TEXT,T.M);
    G.text("Score: "+sc.total,34,334,C.TITLE,T.M);
    E.menu([{label:"See the full tally",fn:()=>E.go("tally")}],34,356,260,{rowH:30}); },
  key(k){ E.keyMenu(k); }
};
SC.tally = {
  draw(){ G.clear(C.BG); G.box2(60,30,520,340,C.PANEL,C.FRAME); G.ctext("THE TALLY",320,46,C.TITLE,T.XL); const sc=score();
    sc.parts.forEach((p,i)=>{ G.text(p[0],90,86+i*22,C.TEXT,T.M); G.rtext(String(p[1]),540,86+i*22,C.RESULT,T.M); });
    G.text("Total",90,86+8*22+8,C.TITLE,T.M); G.rtext("= "+sc.total,540,86+8*22+8,C.TITLE,T.M);
    E.menu([{label:"Enter your initials",fn:()=>E.go("initials")},{label:"Back to the title",fn:()=>E.go("title")}],90,300,300,{rowH:30}); },
  key(k){ E.keyMenu(k); }
};
SC.initials = {
  enter(){ this.s=""; },
  draw(){ G.clear(C.BG); G.box2(40,20,560,360,C.PANEL,C.FRAME); G.ctext("ENTER YOUR INITIALS",320,36,C.TITLE,T.L);
    G.rect(260,66,120,40,C.MENU); G.frame(260,66,120,40,C.FRAME,2); G.ctext((this.s+"___").slice(0,3).split("").join(" "),320,76,C.TITLE,T.XL);
    const letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ"; for(let i=0;i<26;i++){ const col=i%9,row=Math.floor(i/9); const x=70+col*56, y=120+row*52; G.rect(x,y,48,44,C.MENU); G.frame(x,y,48,44,C.FRAME,1); G.ctext(letters[i],x+24,y+14,C.TEXT,T.L); E.zone(x,y,48,44,()=>{ if(this.s.length<3) this.s+=letters[i]; },letters[i].toLowerCase()); }
    E.button("DEL",70+8*56,120+2*52,48,44,()=>{ this.s=this.s.slice(0,-1); },"Backspace",C.CLAY_INK);
    E.button("DONE",240,290,160,44,()=>this.done(),"Enter",C.SAGE_INK); },
  done(){ if(!this.s.length) this.s="MPP"; const sc=score().total; const hi=Store.addScore(this.s.padEnd(3,"-"),sc,S.pastor.short); track("initials",{session:S.session,pastor:S.pastor.id,score:sc,initials:this.s}); E.go("leaderboard",{hi}); },
  key(k){ if(k.length===1 && /[a-zA-Z]/.test(k)){ if(this.s.length<3) this.s+=k.toUpperCase(); return; } E.keyMenu(k); }
};

// ---- DEBUG: playtest any screen/minigame. Opened by 5 quick taps in the top-right corner. ----
SC.debug = {
  pi:0,
  // seed a realistic mid-game state so playtested screens show grown numbers, not the frozen 1926/245 start
  seed(pi){ newGame(DATA.pastors[pi],"short"); S.year=2001; S.members=Math.round(lerpAnchors(DATA.memberAnchors,2001)); const i=S.landmarks.findIndex(l=>l.year>=2001); S.li=i>0?i:1; },
  enter(){ if(typeof S==="undefined" || !S || !S.pastor){ this.seed(this.pi); } },
  setLi(stop){ const i=S.landmarks.indexOf(stop); S.li = i>=0?i:0; },
  draw(){
    G.clear(C.BG);
    G.rect(0,0,640,26,C.PANEL); G.ctext("DEBUG -- PLAYTEST ANY SCREEN",320,7,C.TITLE,T.M);
    const cx=DATA.trail.find(t=>t.type==="cross"), land=DATA.trail.find(t=>t.type==="land"), ev=DATA.events[0];
    const btns=[
      ["Drive Home",()=>E.go("finale")],
      ["Pledge catch",()=>E.go("drive",{back:"debug"})],
      ["Crossing ledger",()=>{this.setLi(cx);E.go("crossing",cx);}],
      ["Landmark",()=>{this.setLi(land);E.go("landmark",land);}],
      ["Travel / map",()=>E.go("travel")],
      ["Event",()=>E.go("event",{ev:ev,next:"debug"})],
      ["Presbytery",()=>E.go("presbytery")],
      ["Win screen",()=>{S.homecoming=true;S.finaleWrong=false;E.go("win");}],
      ["Tally",()=>E.go("tally")],
      ["Leaderboard",()=>E.go("leaderboard")],
      ["Game over",()=>{S.over="stamina";E.go("gameover");}],
      ["Supplies",()=>E.go("supplies")]
    ];
    const cols=3, bw=196, bh=32, x0=14, y0=36, gx=8, gy=7;
    btns.forEach((b,i)=>{ const c=i%cols, r=(i/cols)|0; E.button(b[0], x0+c*(bw+gx), y0+r*(bh+gy), bw, bh, b[1], null, C.MENU); });
    const cy=y0+4*(bh+gy)+8;
    E.button("Reserves broke",14,cy,186,28,()=>{S.budget=0.05;},null,C.CLAY_INK);
    E.button("Reserves flush",208,cy,186,28,()=>{S.budget=2.0;},null,C.SAGE_INK);
    E.button("Pastor: "+S.pastor.short,402,cy,174,28,()=>{ this.pi=(this.pi+1)%DATA.pastors.length; this.seed(this.pi); },null,C.HARBOR_INK);
    const cy2=cy+34;
    G.text("year "+S.year+"   members "+Math.round(S.members)+"   reserves "+Math.round(S.budget*100)+"%   -- "+S.pastor.short,14,cy2,C.DIM,T.S);
    E.button("Back to title",14,cy2+14,186,28,()=>E.go("title"),"Escape",C.FRAME);
    E.button("Advance 10 years",208,cy2+14,186,28,()=>{ for(let i=0;i<10&&!S.over;i++) advanceYear(); },null,C.SAGE_INK);
    E.button("Reset sim (2001)",402,cy2+14,174,28,()=>this.seed(this.pi),null,C.STONE);
  },
  key(k){ if(k==="Escape"){ E.go("title"); return; } E.keyMenu(k); }
};
