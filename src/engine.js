// ============================================================
// ENGINE: scaling, input, screens, timers, sound, storage
// ============================================================
const KIOSK_ATTRACT_MS = 120000;  // idle on title -> attract mode (2 min)
const KIOSK_RESET_MS   = 300000;  // idle in game -> back to title (5 min)

const E = {
  screen:null, screens:{}, last:0, idle:0, hot:[], scale:1, offX:0, offY:0, running:false,
  init(){
    G.init(document.getElementById("game"));
    this.resize(); window.addEventListener("resize",()=>this.resize());
    const cv=G.cv;
    cv.addEventListener("pointerdown",e=>{ e.preventDefault(); const p=this.pt(e); this.idle=0; Sound.unlock(); this.tap(p.x,p.y,e.pointerId); },{passive:false});
    cv.addEventListener("pointermove",e=>{ const p=this.pt(e); if(this.screen&&this.screen.move) this.screen.move(p.x,p.y,e.buttons>0||e.pointerType==="touch"); });
    cv.addEventListener("pointerup",e=>{ Sound.unlock(); const p=this.pt(e); if(this.screen&&this.screen.up) this.screen.up(p.x,p.y); });
    cv.addEventListener("pointercancel",e=>{ if(this.screen&&this.screen.up) this.screen.up(-1,-1); });
    window.addEventListener("keydown",e=>{ this.idle=0; if(this.screen&&this.screen.key) this.screen.key(e.key,e); if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(e.key)) e.preventDefault(); });
    window.addEventListener("keyup",e=>{ if(this.screen&&this.screen.keyup) this.screen.keyup(e.key,e); });
    this.running=true; requestAnimationFrame(t=>this.loop(t));
  },
  resize(){
    const ww=window.innerWidth, wh=window.innerHeight; const s=Math.min(ww/G.W, wh/G.H);
    this.scale=s; G.cv.style.width=(G.W*s)+"px"; G.cv.style.height=(G.H*s)+"px";
    const r=G.cv.getBoundingClientRect(); this.offX=r.left; this.offY=r.top;
  },
  pt(e){ const r=G.cv.getBoundingClientRect(); return { x:(e.clientX-r.left)/this.scale, y:(e.clientY-r.top)/this.scale }; },
  now(){ return typeof performance!=="undefined"?performance.now():Date.now(); },
  lock(ms){ this.lockUntil=this.now()+(ms||300); },
  go(name,arg){ const s=this.screens[name]; if(!s) throw new Error("no screen "+name); this.hot=[]; this.screen=s; this.screenName=name; this.idle=0; this.lock(); if(s.enter) s.enter(arg); },
  loop(t){ const dt=Math.min(0.1,(t-this.last)/1000||0); this.last=t; this.idle+=dt*1000;
    if(this.screen){ if(this.screen.update) this.screen.update(dt); this.hot=[]; this.screen.draw(dt); }
    if(this.screenName==="title" && this.idle>KIOSK_ATTRACT_MS) this.go("attract");
    else if(this.screenName!=="title" && this.screenName!=="attract" && this.screenName!=="leaderboard" && this.idle>KIOSK_RESET_MS){
      if(S && !S.over && !S.reached2026 && !S._endLogged){ S._endLogged=true; track("session_end",endRow("abandoned")); }
      this.go("title"); }
    requestAnimationFrame(t2=>this.loop(t2)); },
  // hot zones: registered during draw, consumed on tap
  zone(x,y,w,h,fn,key){ this.hot.push({x,y,w,h,fn,key}); },
  tap(x,y,id){
    // hidden debug gesture: 5 quick taps in the top-right corner opens the playtest menu
    const now=this.now();
    if(this.screenName==="title"&&x>=600&&y<=22){ if(now-(this._dbgT||0)>1500) this._dbgN=0; this._dbgT=now; this._dbgN=(this._dbgN||0)+1; if(this._dbgN>=5){ this._dbgN=0; this.go("debug"); return; } } else { this._dbgN=0; }
    if(now<(this.lockUntil||0)) return;
    if(this.screen&&this.screen.tap&&this.screen.tap(x,y,id)===true) return; for(const z of this.hot){ if(x>=z.x&&x<z.x+z.w&&y>=z.y&&y<z.y+z.h){ Sound.click(); z.fn(); return; } } },
  keyMenu(k){ for(const z of this.hot){ if(z.key!=null && String(z.key)===k){ Sound.click(); z.fn(); return true; } } return false; },

  // ----- widgets -----
  // menu rows: items [{label, fn, dim, sub, tag, selected, color}]. Numbered unless opts.keys gives letters. Returns the y below the menu.
  menu(items,x,y,w,opts){ opts=opts||{}; const sub=items.some(it=>it.sub); const rowH=opts.rowH||(sub?36:28); const gap=4; const scale=opts.scale||T.M;
    items.forEach((it,i)=>{ const yy=y+i*rowH; const h=rowH-gap; const key=opts.keys?opts.keys[i]:String(i+1); const label=(opts.numbered===false?"":key.toUpperCase()+". ")+it.label;
      const fill=it.dim?C.PANEL:(it.selected?C.SELECT:(it.color!=null?it.color:C.MENU)); G.rect(x,yy,w,h,fill); G.frame(x,yy,w,h,it.dim?C.GOLD_INK:(it.selected?C.CLAY_LIGHT:C.FRAME),1);
      const col=it.dim?C.GOLD_INK:C.TEXT; const ty=sub?yy+5:yy+Math.round((h-7*scale)/2);
      G.text(label,x+10,ty,col,scale); if(it.selected) G.rtext("<",x+w-8,ty,C.PAPER,scale);
      if(it.sub){ const sls=G.wrap(it.sub,T.S,w-16), sc2=it.dim?C.GOLD_INK:C.GOLD_PALE, sy0=yy+h-13-(sls.length-1)*10; sls.forEach((ln,j)=>G.text(ln,x+10,sy0+j*10,sc2,T.S)); }
      if(it.tag&&!it.selected) G.rtext(it.tag,x+w-8,sub?yy+5:ty+2,it.dim?C.GOLD_INK:C.GOLD_LIGHT,T.S);
      if(!it.dim) this.zone(x,yy,w,h,it.fn,key.length===1?key.toLowerCase():key); });
    return y+items.length*rowH; },
  // single big button
  button(label,x,y,w,h,fn,key,color){ G.rect(x,y,w,h,color==null?C.MENU:color); G.frame(x,y,w,h,C.FRAME,2); G.ctext(label,x+w/2,y+Math.round((h-10.5)/2),C.TEXT,T.M); this.zone(x,y,w,h,fn,key); },
  // "Tap to continue" strip at the bottom; the whole screen is the zone
  pressBar(label,fn){ const l=label||"Tap to continue"; G.rect(0,372,640,28,C.MENU); G.rect(0,372,640,2,C.FRAME); G.ctext(l,320,381,C.PAPER,T.M); this.zone(0,0,640,400,fn,"Enter"); this.zone(0,0,640,400,fn," "); },
  // Status strip, y 0..28: year, then five bars that change colour as they fall
  statusBar(){ const s=S; G.rect(0,0,640,28,C.BG); G.rect(0,27,640,1,C.GOLD_INK);
    G.text(String(s.year),6,6,C.TITLE,T.L);
    const exp=lerpAnchors(DATA.memberAnchors,s.year);
    const cells=[
      ["FUNDS","$"+fmtMoney(s.budgetDollars()),clamp(s.budget,0,1.5)/1.5,G.level(s.budget,0.6,0.3)],
      ["MEMBERS",String(Math.round(s.members)),clamp(s.members/exp,0,1),G.level(s.members/exp,0.8,0.5)],
      ["MORALE",String(Math.round(s.morale)),s.morale/100,G.level(s.morale/100,0.5,0.3)],
      ["PARTICIPATION",String(Math.round(s.part)),s.part/100,G.level(s.part/100,0.4,0.2)],
      ["STAMINA",String(Math.round(s.stam)),s.stam/100,G.level(s.stam/100,0.5,0.3)]
    ];
    cells.forEach((c,i)=>{ const x=66+i*115, w=108; G.text(c[0],x,4,C.DIM,T.S); G.rtext(c[1],x+w,4,C.TEXT,T.S); G.bar(x,14,w,8,c[2],c[3]); }); }
};

function fmtMoney(n){ n=Math.round(n); if(Math.abs(n)>=1e6) return (n/1e6).toFixed(2)+"M"; return n.toLocaleString("en-US"); }
function lerpAnchors(anchors,year){ if(year<=anchors[0][0]) return anchors[0][1]; for(let i=1;i<anchors.length;i++){ if(year<=anchors[i][0]){ const [y0,v0]=anchors[i-1],[y1,v1]=anchors[i]; const f=(year-y0)/(y1-y0); return Math.exp(Math.log(v0)+(Math.log(v1)-Math.log(v0))*f); } } return anchors[anchors.length-1][1]; }
function rnd(n){ return Math.floor(Math.random()*n); }
function pick(a){ return a[rnd(a.length)]; }
function clamp(v,a,b){ return Math.max(a,Math.min(b,v)); }

// ----- SOUND (WebAudio) -----
const Sound = {
  ctx:null, level:0, levels:[0,0.08,0.25], hymnTimer:null,
  unlock(){ const fresh=!this.ctx; if(!this.ctx){ try{ this.ctx=new (window.AudioContext||window.webkitAudioContext)(); }catch(e){} } if(this.ctx&&this.ctx.state!=="running"){ try{ this.ctx.resume(); }catch(e){} }
    if(fresh && this.musicOn){ if(this.musicTimer) clearTimeout(this.musicTimer); this._killMusic(); this._musicStep(); } },
  cycle(){ this.level=(this.level+1)%3; try{ localStorage.setItem("mpt_sound",String(this.level)); }catch(e){} if(this.level) this.beep(880,0.05); else this._killMusic();
    if(this.level && this.musicOn){ if(this.musicTimer) clearTimeout(this.musicTimer); this._killMusic(); this._musicStep(); } },
  load(){ try{ const v=localStorage.getItem("mpt_sound"); this.level=(v==null)?1:(parseInt(v)||0); }catch(e){ this.level=1; } },
  label(){ return ["Sound: off","Sound: low","Sound: high"][this.level]; },
  tone(freq,dur,when,type){ if(!this.ctx||!this.level) return; const o=this.ctx.createOscillator(), g=this.ctx.createGain(); o.type=type||"square"; o.frequency.value=freq; g.gain.value=this.levels[this.level]; o.connect(g); g.connect(this.ctx.destination); const t=when||this.ctx.currentTime; o.start(t); g.gain.setValueAtTime(this.levels[this.level],t); g.gain.exponentialRampToValueAtTime(0.001,t+dur); o.stop(t+dur+0.02); },
  beep(f,d){ this.tone(f||660,d||0.06); },
  click(){ this.tone(520,0.03); },
  good(){ this.tone(660,0.08); this.tone(880,0.1,this.ctx?this.ctx.currentTime+0.09:0); },
  bad(){ this.tone(220,0.15); this.tone(180,0.2,this.ctx?this.ctx.currentTime+0.14:0); },
  catchCard(){ this.tone(990,0.05); },
  firework(){ const t=this.ctx?this.ctx.currentTime:0; this.tone(140,0.05,t,"square"); this.tone(760+Math.random()*420,0.16,t+0.03,"triangle"); },
  hymn(){ if(!this.ctx||!this.level) return; const bpm=96; let t=this.ctx.currentTime+0.05, total=0.05; DATA.hymn.forEach(([n,b])=>{ const f=440*Math.pow(2,(n-69)/12); const d=b*60/bpm; this.tone(f,d*0.9,t,"triangle"); t+=d; total+=d; });
    // hush the looping background music while the fanfare plays, so the two tunes don't overlap (and the loop doesn't bleed into the next screen on top of it)
    if(this.musicOn){ if(this.musicTimer) clearTimeout(this.musicTimer); this._killMusic(); this.musicTimer=setTimeout(()=>this._musicStep(), total*1000+800); } },
  // Continuous, gentle background music: cycles through DATA.hymns on every screen. Silent when sound is off; harmless until audio is unlocked.
  musicOn:false, musicIdx:0, musicTimer:null, musicOsc:[],
  startMusic(){ if(this.musicOn) return; this.musicOn=true; this._musicStep(); },
  stopMusic(){ this.musicOn=false; if(this.musicTimer){ clearTimeout(this.musicTimer); this.musicTimer=null; } this._killMusic(); },
  _killMusic(){ (this.musicOsc||[]).forEach(o=>{ try{ o.stop(); }catch(e){} }); this.musicOsc=[]; },
  _musicStep(){ if(!this.musicOn) return; const set=(DATA.hymns&&DATA.hymns.length)?DATA.hymns:[DATA.hymn]; const tune=set[this.musicIdx%set.length]; this.musicIdx++; const dur=this._playTune(tune,0.38); this.musicTimer=setTimeout(()=>this._musicStep(), Math.max(1,dur)*1000+2800); },
  _playTune(tune,gm){ this._killMusic(); const bpm=90; if(!this.ctx||!this.level){ let s=0; tune.forEach(nb=>s+=nb[1]*60/bpm); return s; }
    let t=this.ctx.currentTime+0.15; const g0=this.levels[this.level]*(gm||1); this.musicOsc=[];
    tune.forEach(([n,b])=>{ const o=this.ctx.createOscillator(), g=this.ctx.createGain(); o.type="triangle"; o.frequency.value=440*Math.pow(2,(n-69)/12); o.connect(g); g.connect(this.ctx.destination); const d=b*60/bpm;
      g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(g0,t+0.03); g.gain.exponentialRampToValueAtTime(0.0001,t+d*0.9); o.start(t); o.stop(t+d+0.02); this.musicOsc.push(o); t+=d; });
    return t-this.ctx.currentTime; }
};

// ----- STORAGE -----
const Store = {
  scores(){ try{ const s=JSON.parse(localStorage.getItem("mpt_scores")||"null"); if(Array.isArray(s)){ const ok=s.filter(x=>x&&typeof x.v==="number"&&typeof x.n==="string"); if(ok.length) return ok; } }catch(e){} return DATA.seedScores.map(([n,v])=>({n,v,p:""})); },
  addScore(n,v,p){ const s=this.scores(), me={n,v,p}; s.push(me); s.sort((a,b)=>b.v-a.v); const top=s.slice(0,10); try{ localStorage.setItem("mpt_scores",JSON.stringify(top)); }catch(e){} return top.indexOf(me); },
  resetScores(){ try{ localStorage.removeItem("mpt_scores"); }catch(e){} },
  stat(key,inc){ try{ const k="mpt_"+key; const v=(parseInt(localStorage.getItem(k)||"0")||0)+(inc||1); localStorage.setItem(k,String(v)); return v; }catch(e){ return 0; } }
};

// ----- LOGGING to a Google Sheet via Apps Script (queued offline, flushed when online) -----
const Log = {
  queue:[], busy:false, device:null,
  init(){ try{ this.queue=JSON.parse(localStorage.getItem("mpt_queue")||"[]"); this.device=localStorage.getItem("mpt_device"); if(!this.device){ this.device=Math.random().toString(36).slice(2,10); localStorage.setItem("mpt_device",this.device); } }catch(e){ this.queue=[]; this.device="anon"; }
    window.addEventListener("online",()=>this.flush()); setInterval(()=>this.flush(),30000); this.flush(); },
  save(){ try{ localStorage.setItem("mpt_queue",JSON.stringify(this.queue.slice(-500))); }catch(e){} },
  send(ev,data){ if(!DATA.config||!DATA.config.sheetUrl) return; const row=Object.assign({event:ev,client_time:new Date().toISOString(),device:this.device,build:DATA.config.build||"kiosk"},data||{}); this.queue.push(row); this.save(); this.flush(); },
  flush(){ if(this.busy||!this.queue.length||!DATA.config||!DATA.config.sheetUrl||(typeof navigator!=="undefined"&&navigator.onLine===false)) return; const batch=this.queue.slice(0,50); this.busy=true;
    fetch(DATA.config.sheetUrl,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain"},body:JSON.stringify(batch)}).then(()=>{ this.queue=this.queue.slice(batch.length); this.save(); this.busy=false; if(this.queue.length) setTimeout(()=>this.flush(),500); }).catch(()=>{ this.busy=false; }); }
};
function track(ev,params){ try{ if(typeof S!=="undefined"&&S&&S.debug) return; Log.send(ev,params); }catch(e){} }
