// Headless auto-player: loads the game sources with stubbed DOM and plays N games per pastor.
// Usage: node sim.js [runs] [short|long] [policy]
const fs=require("fs"), path=require("path"), vm=require("vm");
const SRC=path.join(__dirname,"..","src");
const runs=parseInt(process.argv[2]||"200"), trail=process.argv[3]||"short", policy=process.argv[4]||"naive";
// --- DOM stubs ---
const ctxStub=new Proxy({},{get:(t,k)=>{ if(k==="canvas") return {}; return ()=>ctxStub; }, set:()=>true});
const canvasStub=()=>({ getContext:()=>ctxStub, width:0,height:0, style:{}, addEventListener(){}, getBoundingClientRect:()=>({left:0,top:0,width:640,height:400}) });
const sandbox={ console, Math, Date, JSON, Array, Object, String, Number, Set, Map, parseInt, parseFloat, isNaN, Proxy, Error, setInterval:()=>0, setTimeout:()=>0, requestAnimationFrame:()=>0,
  document:{ getElementById:()=>canvasStub(), createElement:()=>canvasStub() },
  window:{ innerWidth:640, innerHeight:400, addEventListener(){}, AudioContext:null },
  localStorage:{ _d:{}, getItem(k){ return this._d[k]==null?null:this._d[k]; }, setItem(k,v){ this._d[k]=String(v); }, removeItem(k){ delete this._d[k]; } } };
sandbox.window.localStorage=sandbox.localStorage; sandbox.globalThis=sandbox;
vm.createContext(sandbox);
for(const f of ["data.js","font.js","gfx.js","engine.js","screens.js","minigame.js"]) vm.runInContext(fs.readFileSync(path.join(SRC,f),"utf8"),sandbox,{filename:f});
vm.runInContext("G.init(document.getElementById(\"game\")); E.go=function(n,a){ this.hot=[]; this.screen=this.screens[n]; this.screenName=n; if(this.screen.enter) this.screen.enter(a); }; E.zone=function(x,y,w,h,fn,key){ this.hot.push({fn,key,label:''}); };", sandbox);

function play(pastorIdx){
  const r=vm.runInContext(`(function(){
    const p=DATA.pastors[${pastorIdx}]; newGame(p,"${trail}"); S.pace="ordinary"; S.rations="potluck";
    const pol="${policy}";
    let steps=0, drives=0;
    E.go("travel");
    while(steps++<4000){
      const n=E.screenName, sc=E.screen;
      if(S.over){ return {over:S.over, year:S.year, score:score().total, drives}; }
      if(n==="travel"){ sc.step(); if(E.screenName==="travel") continue; else continue; }
      if(n==="win"){ return {over:null, year:2026, score:score().total, drives, members:Math.round(S.members), budget:+S.budget.toFixed(2), morale:Math.round(S.morale), part:Math.round(S.part), stam:Math.round(S.stam), party:partyAlive().length}; }
      if(n==="gameover"){ return {over:S.over, year:S.year, score:score().total, drives}; }
      if(n==="landmark"){
        // policy: naive = continue; smart = drive every landmark, rest if party weak
        if(pol==="smart"){
          if(S.driveLandmark!==S.li){ E.go("drive"); continue; }
          if(S.stam<35 || partyAlive().some(q=>q.energy<30)){ sc.rest(); continue; }
        }
        if(pol==="normal"){
          if(S.driveLandmark!==S.li && (S.li%2===1)){ E.go("drive"); continue; }
          if(S.stam<25){ sc.rest(); continue; }
        }
        E.go("travel"); continue; }
      if(n==="drive"){ // simulate catches: naive catches 3, smart catches cap*0.8
        const cap=sc.cap; const caught = pol==="smart"? Math.round(cap*0.8) : Math.min(cap,4);
        sc.start(); for(let i=0;i<caught;i++){ const size=Math.random()<0.2?"l":Math.random()<0.5?"m":"s"; sc.caught++; sc.value+=sc.cardValue(size); sc.part+={s:2,m:4,l:8}[size]; }
        sc.finish(); drives++; E.go("landmark",{stop:true}); continue; }
      if(n==="crossing"){ sc.draw(); // draw registers hot zones
        if(sc.result){ E.go("landmark",sc.lm); continue; }
        if(pol==="smart" && S.budget>=sc.cost()+0.15) sc.cash(); else if(pol==="smart") sc.consult(); else { const c=Math.random(); if(c<0.4&&S.budget>=sc.cost()) sc.cash(); else if(c<0.8) sc.borrow(); else sc.consult(); }
        continue; }
      if(n==="event"){ sc.draw(); if(sc.result){ E.go(sc.next); continue; } const choices=E.hot.filter(z=>z.key!=null); if(!choices.length){ E.go("travel"); continue; } const pickI=Math.floor(Math.random()*choices.length); choices[pickI].fn(); continue; }
      if(n==="presbytery"){ sc.draw(); if(sc.result){ E.go("travel"); continue; } E.hot[0].fn(); continue; }
      if(n==="note"||n==="fact"){ E.go("landmark",{stop:true}); continue; }
      if(n==="landmarkLm"){ continue; }
      return {over:"stuck:"+n, year:S.year, score:0};
    }
    return {over:"loop", year:S.year, score:0};
  })()`, sandbox);
  return r;
}
const names=vm.runInContext("DATA.pastors.map(p=>p.short)",sandbox);
console.log(`trail=${trail} policy=${policy} runs=${runs}`);
for(let i=0;i<names.length;i++){
  const res=[]; for(let k=0;k<runs;k++){ try{ res.push(play(i)); }catch(e){ console.log("ERR",names[i],e.stack.split("\n").slice(0,3).join(" | ")); break; } }
  const wins=res.filter(r=>!r.over); const reasons={}; res.filter(r=>r.over).forEach(r=>{ reasons[r.over]=(reasons[r.over]||0)+1; });
  const avg=a=>a.length?Math.round(a.reduce((x,y)=>x+y,0)/a.length):0;
  console.log(names[i].padEnd(10), "win%", Math.round(100*wins.length/res.length).toString().padStart(3), "avgScore", avg(wins.map(w=>w.score)).toString().padStart(6), "lossYr", avg(res.filter(r=>r.over).map(r=>r.year)), JSON.stringify(reasons), wins.length?("mem "+avg(wins.map(w=>w.members))+" bud "+(wins.reduce((x,w)=>x+w.budget,0)/wins.length).toFixed(2)+" mor "+avg(wins.map(w=>w.morale))+" part "+avg(wins.map(w=>w.part))+" hp "+avg(wins.map(w=>w.stam))+" party "+(wins.reduce((x,w)=>x+w.party,0)/wins.length).toFixed(1)):"");
}
