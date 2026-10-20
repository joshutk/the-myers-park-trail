// Headless auto-player for balancing: loads src/ with a stubbed canvas and plays N games per pastor.
// node tools/sim.js runs trail policy pace rations [patch.js] [--json]   e.g. node tools/sim.js 200 short hint ordinary potluck
// policies: naive | normal | smart | hint | restspam
const fs=require("fs"), path=require("path"), vm=require("vm");
const SRC=process.env.SRC||path.join(__dirname,"..","src");
const A=process.argv.slice(2);
const runs=parseInt(A[0]||"200"), trail=A[1]||"short", policy=A[2]||"normal", pace=A[3]||"ordinary", rations=A[4]||"potluck", patch=A[5]&&A[5]!=="-"&&!A[5].startsWith("--")?A[5]:null;
const ctxStub=new Proxy({},{get:(t,k)=>{ if(k==="canvas") return {}; return ()=>ctxStub; }, set:()=>true});
const canvasStub=()=>({ getContext:()=>ctxStub, width:0,height:0, style:{}, addEventListener(){}, getBoundingClientRect:()=>({left:0,top:0,width:640,height:400}) });
const sandbox={ console, Math, Date, JSON, Array, Object, String, Number, Set, Map, parseInt, parseFloat, isNaN, Proxy, Error, setInterval:()=>0, setTimeout:()=>0, requestAnimationFrame:()=>0,
  document:{ getElementById:()=>canvasStub(), createElement:()=>canvasStub() }, Image:function(){},
  window:{ innerWidth:640, innerHeight:400, addEventListener(){}, AudioContext:null },
  localStorage:{ _d:{}, getItem(k){ return this._d[k]==null?null:this._d[k]; }, setItem(k,v){ this._d[k]=String(v); }, removeItem(k){ delete this._d[k]; } } };
sandbox.window.localStorage=sandbox.localStorage; sandbox.globalThis=sandbox; sandbox.fetch=()=>({then:()=>({catch:()=>0})});
vm.createContext(sandbox);
for(const f of ["data.js","font.js","gfx.js","engine.js","screens.js","minigame.js"]) vm.runInContext(fs.readFileSync(path.join(SRC,f),"utf8"),sandbox,{filename:f});
vm.runInContext("G.init(document.getElementById(\"game\")); track=function(){}; E.lock=E.lock||function(){}; E.go=function(n,a){ this.hot=[]; this.screen=this.screens[n]; this.screenName=n; if(this.screen.enter) this.screen.enter(a); }; E.zone=function(x,y,w,h,fn,key){ this.hot.push({fn,key,label:''}); };", sandbox);
if(patch) vm.runInContext(fs.readFileSync(patch,"utf8"),sandbox,{filename:patch});
// instrumentation
vm.runInContext(`
  var INS={};
  const _adv=advanceYear; advanceYear=function(){ const s0=S.stam; _adv(); if(INS.tag==="rest") INS.restDrift=(INS.restDrift||0)+(S.stam-s0); INS.drift=(INS.drift||0)+(S.stam-s0); INS.traj[S.year]=S.stam; INS.years++; };
  const _fx=applyFx; applyFx=function(fx,ctx){ const s0=S.stam; const r=_fx(fx,ctx); INS[INS.tag||"event"]=(INS[INS.tag||"event"]||0)+(S.stam-s0); return r; };
  const _rest=SC.landmark.rest; SC.landmark.rest=function(){ INS.rests++; INS.tag="rest"; _rest.call(this); INS.tag=null; };
`,sandbox);

function play(pi){
  return vm.runInContext(`(function(){
    const p=DATA.pastors[${pi}]; newGame(p,"${trail}"); S.pace="${pace}"; S.rations="${rations}";
    INS={traj:{},years:0,rests:0,sermons:0,drives:0,consults:0,cashes:0,borrows:0,minStam:S.stam,minMor:S.morale,minBud:S.budget,minPart:S.part,minMemRatio:1};
    const pol="${policy}"; let steps=0;
    const track=()=>{ INS.minStam=Math.min(INS.minStam,S.stam); INS.minMor=Math.min(INS.minMor,S.morale); INS.minBud=Math.min(INS.minBud,S.budget); INS.minPart=Math.min(INS.minPart,S.part); INS.minMemRatio=Math.min(INS.minMemRatio,S.members/lerpAnchors(DATA.memberAnchors,S.year)); };
    const end=(won)=>({won, evs:S.eventsSeen, over:S.over, year:S.year, score:score().total, members:S.members, budget:S.budget, morale:S.morale, part:S.part, stam:S.stam, party:partyAlive().length, cash:S.cash, borrowed:S.borrowed, ins:INS, start:50+p.s*5});
    E.go("travel");
    while(steps++<6000){
      const n=E.screenName, sc=E.screen; track();
      if(S.over) return end(false);
      // hint players also obey the on-screen "Funds are low. Tap Stop..." nudge while driving
      if(n==="travel" && pol==="hint" && S.budget<0.45 && S.driveLandmark!==S.li && S.landmarks[S.li+1]){ E.go("landmark",{stop:true}); continue; }
      if(n==="travel"){ const py=sc.perYear||sc.segPace(); sc.calm-=py; S.sinceEvent+=py+ (sc.msg?1.8:0); sc.msg=null; sc.step(); continue; }
      if(n==="finale"){ sc.wrong=false; sc.bumps=0; sc.finish(); continue; }
      if(n==="win") return end(true);
      if(n==="gameover") return end(false);
      if(n==="landmark"){
        const nx=S.landmarks[S.li+1]; const canDrive=S.driveLandmark!==S.li; const canRest=S.restLandmark!==S.li;
        if(pol==="smart"){
          if(canDrive){ E.go("drive"); continue; }
          if(canRest && (S.stam<35 || partyAlive().some(q=>q.energy<30) || S.morale<35)){ sc.rest(); continue; }
        }
        if(pol==="normal"){
          if(canDrive && (S.li%2===1)){ E.go("drive"); continue; }
          if(canRest && S.stam<25){ sc.rest(); continue; }
        }
        if(pol==="hint"){ if((S.budget<0.45||S.part<25) && canDrive){ E.go("drive"); continue; } if(canRest && (S.stam<35 || S.morale<35 || partyAlive().some(q=>q.energy<30))){ sc.rest(); continue; } }
        if(pol==="restspam"){ if(canDrive && S.budget<0.5){ E.go("drive"); continue; } if(canRest && nx && S.year < nx.year-1){ sc.rest(); continue; } }
        E.go("travel"); continue; }
      if(n==="drive"){ const cap=sc.cap; const caught = (pol==="smart"||pol==="restspam")? Math.round(cap*0.8) : Math.min(cap, 3+Math.floor(Math.random()*4));
        sc.start(); INS.drives++;
        const sermonP = pol==="naive"?0.3:0.7; if(Math.random()<sermonP){ const s0=S.stam; sc.burstUsed=true; S.stam=Math.max(0,S.stam-8); INS.sermon=(INS.sermon||0)+(S.stam-s0); INS.sermons++; }
        for(let i=0;i<caught;i++){ const lp=S.pastor.c+S.pastor.p; const big=Math.max(0,Math.min(0.8,(lp-10)/10)); const r=Math.random(); const size=r<big*0.35?"l":r<0.55?"m":"s"; sc.caught++; sc.value+=sc.cardValue(size); sc.part+={s:2,m:4,l:8}[size]; }
        sc.finish(); sc.leave(); continue; }
      if(n==="crossing"){
        if(sc.result){ E.go("landmark",sc.lm); continue; }
        if(pol==="smart"||pol==="restspam"){ if(S.budget>=sc.cost()+0.15){ INS.cashes++; sc.cash(); } else { INS.consults++; sc.consult(); } }
        else if(pol==="hint"){ if(S.budget>=sc.cost()){ INS.cashes++; sc.cash(); } else if(S.driveLandmark!==S.li){ E.go("drive",{back:"crossing",lm:sc.lm}); } else { const c=Math.random(); if(c<0.6){INS.borrows++; sc.borrow();} else {INS.consults++; sc.consult();} } }
        else { const c=Math.random(); if(c<0.4&&S.budget>=sc.cost()){INS.cashes++; sc.cash();} else if(c<0.8){INS.borrows++; sc.borrow();} else {INS.consults++; sc.consult();} }
        continue; }
      if(n==="event"){ INS.tag="event"; if(sc.result){ INS.tag=null; E.go(sc.next); continue; } E.hot=[]; sc.draw(); const choices=E.hot.filter(z=>z.key!=null); if(!choices.length){ INS.tag=null; E.go("travel"); continue; } choices[Math.floor(Math.random()*choices.length)].fn(); continue; }
      if(n==="presbytery"){ INS.tag="presb"; if(sc.result){ INS.tag=null; E.go("travel"); continue; } E.hot=[]; sc.draw(); E.hot[Math.random()<0.6?0:1].fn(); continue; }
      if(n==="note"||n==="fact"){ E.go("landmark",{stop:true}); continue; }
      if(n==="landmarkLm"){ continue; }
      return {won:false, over:"stuck:"+n, year:S.year, score:0, ins:INS};
    }
    return {won:false, over:"loop", year:S.year, score:0, ins:INS};
  })()`, sandbox);
}
const names=vm.runInContext("DATA.pastors.map(p=>p.short)",sandbox);
const out={}; const json=A.includes("--json");
if(!json) console.log(`trail=${trail} policy=${policy} pace=${pace} rations=${rations} runs=${runs}${patch?" patch="+path.basename(patch):""}`);
const avg=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:0; const f0=x=>Math.round(x), f2=x=>x.toFixed(2);
let allWins=0, all=0; const lossDec={};
for(let i=0;i<names.length;i++){
  const res=[]; for(let k=0;k<runs;k++){ try{ res.push(play(i)); }catch(e){ console.log("ERR",names[i],e.stack.split("\n").slice(0,4).join(" | ")); break; } }
  const wins=res.filter(r=>r.won); const reasons={}; res.filter(r=>!r.won).forEach(r=>{ reasons[r.over]=(reasons[r.over]||0)+1; });
  allWins+=wins.length; all+=res.length; res.filter(r=>!r.won).forEach(r=>{ const d=Math.floor(r.year/10)*10; lossDec[d]=(lossDec[d]||0)+1; });
  const I=k=>avg(res.map(r=>r.ins[k]||0));
  // stamina at 1950/1975/2000/2026 (avg across runs alive at that year)
  const at=y=>{ const v=res.map(r=>r.ins.traj[y]).filter(x=>x!=null); return v.length?f0(avg(v)):"-"; };
  out[names[i]]={win:wins.length/res.length, score:avg(wins.map(w=>w.score)), reasons};
  if(!json) console.log(names[i].padEnd(9), "win%",String(f0(100*wins.length/res.length)).padStart(3), "score",String(f0(avg(wins.map(w=>w.score)))).padStart(5),
    "| stam start",res[0].start,"1950",at(1950),"1975",at(1975),"2000",at(2000),"end",f0(avg(wins.map(w=>w.stam))),"min",f0(I("minStam")),
    "| dStam drift",f0(I("drift")),"rest",f0(I("rest")),"evt",f2(I("event")),"presb",f2(I("presb")),"nEv",f2(avg(res.map(r=>r.evs||0))),"serm",f0(I("sermon")),"rests",f2(I("rests")),
    "| end mem%",f0(100*avg(wins.map(w=>w.members/4800))),"bud",f2(avg(wins.map(w=>w.budget))),"mor",f0(avg(wins.map(w=>w.morale))),"part",f0(avg(wins.map(w=>w.part))),"party",f2(avg(wins.map(w=>w.party))),
    "minMor",f0(I("minMor")),"minBud",f2(I("minBud")),"minMem%",f0(100*I("minMemRatio")),
    "| loss",JSON.stringify(reasons));
}
if(json) console.log(JSON.stringify(out)); else console.log("OVERALL win%", f0(100*allWins/all), " losses by decade:", JSON.stringify(lossDec));
if(process.env.DUMP) console.log(vm.runInContext(process.env.DUMP, sandbox));
