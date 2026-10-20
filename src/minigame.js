// ============================================================
// STEWARDSHIP DRIVE: catch falling pledge cards in the Sanctuary
// ============================================================
SC.drive = {
  enter(a){ a=a||{}; this.back=a.back||"landmark"; this.backLm=a.lm||null; this.forced=!!a.forced;
    this.phase="intro"; this.t=0; this.cards=[]; this.caught=0; this.value=0; this.part=0; this.px=320; this.dir=0; this.burst=0; this.burstUsed=false; this.spawnT=0; this.touchX=null;
    this.cap=4+S.pastor.v; this.dur=20; const d=decade(); this.prior=S.drivesDecade[d]||0; this.moraleCost=this.prior?10:5;
    this.era = (S.year>=1930&&S.year<=1933)||(S.year>=2008&&S.year<=2009) ? "lean" : ((S.year>=1953&&S.year<=1957)||(S.year>=1997&&S.year<=2000)) ? "rich" : "normal"; },
  leave(stop){ if(this.back==="travel"){ E.go("travel"); } else if(this.back==="crossing"){ SC.crossing.result=null; E.go("crossing",this.backLm); } else if(this.back==="debug"){ E.go("debug"); } else E.go("landmark",{stop:true}); },
  start(){ this.phase="play"; this.t=0; S.driveLandmark=S.li; S.taughtDrive=true; S.drivesDecade[decade()]=this.prior+1; S.morale=clamp(S.morale-this.moraleCost,0,100); },
  spawn(){ const lp=S.pastor.c+S.pastor.p; const bigChance=clamp((lp-10)/10,0,0.8); const r=Math.random(); let size="s"; if(r<bigChance*0.35) size="l"; else if(r<0.55) size="m";
    const spd=(size==="l"?150:size==="m"?95:70)*(this.era==="lean"?1.3:1);
    const w=size==="l"?32:size==="m"?24:16, h=size==="l"?20:size==="m"?16:10;
    this.cards.push({x:40+Math.random()*560,y:30,size,spd,drift:size==="l"?(Math.random()-0.5)*120:0,w,h}); },
  cardValue(size){ const base={s:0.007,m:0.016,l:0.04}[size]; return base*(0.6+0.4*S.pastor.g/7)*paceMods().drive; },
  update(dt){ if(this.phase!=="play") return; this.t+=dt; if(this.burst>0) this.burst-=dt; const slow=this.burst>0?(0.25+(10-S.pastor.p)*0.05):1;
    if(this.touchX!=null){ const d=this.touchX-this.px; this.px+=clamp(d,-360*dt,360*dt); } else this.px+=this.dir*320*dt; this.px=clamp(this.px,36,604);
    this.spawnT-=dt; if(this.spawnT<=0){ this.spawn(); this.spawnT=(this.era==="lean"?1.1:this.era==="rich"?0.55:0.8)*(0.7+Math.random()*0.6); }
    this.cards.forEach(c=>{ c.y+=c.spd*slow*dt; c.x+=c.drift*slow*dt; if(c.x<20||c.x>620) c.drift*=-1; });
    const pr={x:this.px-30,y:250,w:60,h:40};
    this.cards=this.cards.filter(c=>{ if(c.y>300) return false; if(this.caught<this.cap && c.x+c.w>pr.x && c.x<pr.x+pr.w && c.y+c.h>pr.y && c.y<pr.y+pr.h){ this.caught++; this.value+=this.cardValue(c.size); this.part+={s:2,m:4,l:8}[c.size]; Sound.catchCard(); return false; } return true; });
    if(this.t>=this.dur || this.caught>=this.cap) this.finish(); },
  finish(){ this.phase="done"; S.drives=(S.drives||0)+1; S.budget+=this.value; S.part=clamp(S.part+this.part,0,100); if(this.caught>=this.cap) Sound.good(); },
  draw(){ drawInterior();
    G.draw(pastorFigure(S.pastor.id),this.px-32,246,2);
    this.cards.forEach(c=>G.draw(ART.card[c.size],c.x,c.y,2));
    // HUD
    G.rect(0,330,640,70,C.PANEL); G.rect(0,330,640,2,C.FRAME);
    G.text("Caught "+this.caught+" / "+this.cap,12,340,C.TEXT,T.M);
    G.text("Pledged +"+Math.round(this.value*100)+"% of funds",200,340,C.TITLE,T.M);
    G.rtext("Time "+Math.max(0,Math.ceil(this.dur-this.t)),628,340,C.TEXT,T.M);
    if(this.phase==="play"){ const bx=12,by=362; G.rect(bx,by,210,30,this.burstUsed?C.STONE:C.PLUM); G.frame(bx,by,210,30,C.FRAME,1); G.ctext(this.burst>0?"PREACHING...":"PREACH A SERMON",bx+105,by+8,C.TEXT,T.M);
      E.zone(bx,by,210,30,()=>{ if(!this.burstUsed){ this.burstUsed=true; this.burst=S.pastor.id==="jones"?6:3; S.stam=clamp(S.stam-8,0,100); Sound.beep(200,0.3); } });
      G.rtext("Drag, or tap a side, to move",628,368,C.DIM,T.S); }
    if(this.phase==="intro"){ G.box2(60,70,520,230,C.PANEL,C.TITLE); G.ctext("STEWARDSHIP DRIVE, "+S.year,320,86,C.TITLE,T.L);
      const il=(this.forced?["Funds are low, so Session calls a drive!"]:[]).concat(["Pledge cards fall from the balcony.","Catch them. The office can process "+this.cap+".","Each card adds Funds and Participation.","This drive costs Morale -"+this.moraleCost+(this.prior?" (second this decade).":"."),"Tap PREACH once to slow the cards (Stamina -8).",this.era==="lean"?"It is a lean year; cards are scarce.":this.era==="rich"?"It is a generous year.":""]).filter(Boolean);
      G.lines(il,84,114,this.forced?C.TEXT:C.TEXT,T.M,il.length>6?18:20);
      if(this.forced) E.button("Begin the drive",230,256,180,34,()=>this.start(),"Enter",C.SAGE_INK);
      else { E.button("Begin the drive",120,256,180,34,()=>this.start(),"Enter",C.SAGE_INK); E.button("Not now",340,256,180,34,()=>this.leave(),"Escape",C.STONE); } }
    if(this.phase==="done"){ G.box2(60,80,520,210,C.PANEL,C.TITLE); G.ctext("THE DRIVE IS OVER",320,96,C.TITLE,T.L);
      const tail=this.caught>=this.cap?["The office is buried in pledge cards!"]:["Maybe next year's stewardship letter","should be shorter."];
      G.lines(["You caught "+this.caught+" pledge card"+(this.caught===1?"":"s")+".","Funds +"+Math.round(this.value*100)+"%  (about $"+fmtMoney(this.value*lerpAnchors(DATA.budgetAnchors,S.year))+")","Participation +"+this.part].concat(tail),84,126,C.TEXT,T.M,22);
      E.button(this.back==="crossing"?"Back to the project":"Continue",200,250,240,34,()=>this.leave(),"Enter",C.SAGE_INK); } },
  tap(x,y){ if(this.phase==="play" && y<330){ this.touchX=x; return true; } return false; },
  move(x,y,down){ if(this.phase==="play" && down && y<330) this.touchX=x; },
  up(){ this.touchX=null; },
  key(k){ if(this.phase==="play"){ if(k==="ArrowLeft") this.dir=-1; else if(k==="ArrowRight") this.dir=1; else if(k===" "){ if(!this.burstUsed){ this.burstUsed=true; this.burst=S.pastor.id==="jones"?6:3; S.stam=clamp(S.stam-8,0,100); } } return; } E.keyMenu(k); },
  keyup(k){ if(k==="ArrowLeft"&&this.dir<0) this.dir=0; if(k==="ArrowRight"&&this.dir>0) this.dir=0; }
};
