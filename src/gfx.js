// ============================================================
// Embedded terminal font (JetBrains Mono, latin subset, OFL). Used for all on-screen text.
const FONT_B64="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";
// GRAPHICS: palette, text, boxes, and all art drawn in code
// ============================================================
// Palette: the 2027 Myers Park Presbyterian palette (Paper White, Jet, Warm Char,
// Clay, Harbor, Sage, Plum, Gold) plus a few utility tones for stone, skin and wood.
const PAL = [
  "#2A2926", // 0  CHAR        warm char, screen background
  "#3C6B8E", // 1  HARBOR_INK  menus
  "#3E7856", // 2  SAGE_INK    ground
  "#6D9BBE", // 3  HARBOR
  "#A14F30", // 4  CLAY_INK    selected row, alarms
  "#9A6F8C", // 5  PLUM
  "#6F6850", // 6  GOLD_INK    dim text, wood trim
  "#E8E4DA", // 7  GREIGE      frames, pale stone
  "#5A5752", // 8  STONE       roads, slate, dark stone
  "#A6C4D8", // 9  HARBOR_LIGHT sky
  "#7FAE92", // A  SAGE        healthy bars, trees
  "#E0EAF1", // B  HARBOR_PALE result text, glass
  "#C77A5E", // C  CLAY        warnings
  "#C2A4B7", // D  PLUM_LIGHT
  "#E0A88F", // E  CLAY_LIGHT  titles
  "#F8F6F1", // F  PAPER       body text
  "#A19982", // 16 GOLD        stone
  "#C5BEAA", // 17 GOLD_LIGHT  stone, secondary text
  "#EAE6DC", // 18 GOLD_PALE
  "#AFCDBC", // 19 SAGE_LIGHT
  "#E2EEE7", // 20 SAGE_PALE
  "#F5E2D8", // 21 CLAY_PALE   skin
  "#6E4A62", // 22 PLUM_INK
  "#373737", // 23 JET         panels
  "#E4E0D6", // 24 LINE
  "#8C8578", // 25 STONE_MID   mortar
  "#1E1D1B", // 26 INK         outlines, dark openings
  "#D9C08A", // 27 BLOND
  "#8B6A47", // 28 WOOD        pews, doors
  "#9C6650", // 29 BRICK
  "#2E4A3A", // 30 PINE        dark tree green
  "#6C8EA8"  // 31 SKY_DUSK
];
const C = { CHAR:0, HARBOR_INK:1, SAGE_INK:2, HARBOR:3, CLAY_INK:4, PLUM:5, GOLD_INK:6, GREIGE:7, STONE:8, HARBOR_LIGHT:9, SAGE:10, HARBOR_PALE:11, CLAY:12, PLUM_LIGHT:13, CLAY_LIGHT:14, PAPER:15,
  GOLD:16, GOLD_LIGHT:17, GOLD_PALE:18, SAGE_LIGHT:19, SAGE_PALE:20, CLAY_PALE:21, PLUM_INK:22, JET:23, LINE:24, STONE_MID:25, INK:26, BLOND:27, WOOD:28, BRICK:29, PINE:30, SKY_DUSK:31 };
// semantic names used by the screens
C.BG=C.CHAR; C.PANEL=C.JET; C.TEXT=C.PAPER; C.DIM=C.GOLD_LIGHT; C.TITLE=C.CLAY_LIGHT; C.MENU=C.HARBOR_INK; C.SELECT=C.CLAY_INK; C.FRAME=C.GREIGE;
C.GOOD=C.SAGE; C.WARN=C.CLAY_LIGHT; C.BAD=C.CLAY; C.SKY=C.HARBOR_LIGHT; C.GROUND=C.SAGE_INK; C.ROAD=C.STONE; C.SKIN=C.CLAY_PALE; C.RESULT=C.HARBOR_PALE;

// Text sizes (multiples of the 5x7 font). Body is 1.5: 9 px advance, 15 px line.
const T = { S:1, M:1.5, L:2, XL:3 };
function lineH(scale){ return Math.round(7*scale+4); }

const G = {
  cv:null, ctx:null, W:640, H:400, D:2, glyphCache:{}, nid:0, fontReady:false, _fontTried:false, FONTSTACK:'"MPTMono", ui-monospace, "Courier New", monospace', fsz(sc){ return 9.5*sc; },
  loadFont(){ if(this._fontTried) return; this._fontTried=true; try{ const ff=new FontFace("MPTMono","url(data:font/woff2;base64,"+FONT_B64+") format('woff2')"); ff.load().then(function(f){ document.fonts.add(f); G.fontReady=true; }).catch(function(){}); }catch(e){} },
  init(canvas){ this.cv=canvas; this.cv.width=this.W*this.D; this.cv.height=this.H*this.D; this.ctx=canvas.getContext("2d"); this.ctx.setTransform(this.D,0,0,this.D,0,0); this.ctx.imageSmoothingEnabled=false; this.loadFont(); },
  clear(c){ this.ctx.fillStyle=PAL[c==null?C.BG:c]; this.ctx.fillRect(0,0,this.W,this.H); },
  rect(x,y,w,h,c){ this.ctx.fillStyle=PAL[c]; this.ctx.fillRect(x|0,y|0,w|0,h|0); },
  frame(x,y,w,h,c,t){ t=t||2; this.rect(x,y,w,t,c); this.rect(x,y+h-t,w,t,c); this.rect(x,y,t,h,c); this.rect(x+w-t,y,t,h,c); },
  box(x,y,w,h,fill,border){ this.rect(x,y,w,h,fill); this.frame(x,y,w,h,border==null?C.FRAME:border,2); },
  // double-line box, the classic look
  box2(x,y,w,h,fill,border){ this.rect(x,y,w,h,fill); const b=border==null?C.FRAME:border; this.frame(x,y,w,h,b,2); this.frame(x+4,y+4,w-8,h-8,b,1); },
  panel(x,y,w,h){ this.box2(x,y,w,h,C.PANEL,C.FRAME); },

  glyph(ch,color,scale){
    const key=ch+"|"+color+"|"+scale; let g=this.glyphCache[key]; if(g) return g;
    const def=FONT[ch]||FONT["?"]; const rows=def.split("/"); const u=scale*this.D;
    const c=document.createElement("canvas"); c.width=Math.ceil(5*u); c.height=Math.ceil(7*u); const x=c.getContext("2d"); x.fillStyle=PAL[color];
    for(let r=0;r<7;r++) for(let i=0;i<5;i++) if(rows[r][i]==="#") x.fillRect(Math.round(i*u),Math.round(r*u),Math.ceil(u),Math.ceil(u));
    this.glyphCache[key]=c; return c;
  },
  text(s,x,y,color,scale){
    scale=scale||T.M; color=color==null?C.TEXT:color; const adv=6*scale; s=String(s);
    const ctx=this.ctx; ctx.fillStyle=PAL[color]; ctx.font=this.fsz(scale)+"px "+this.FONTSTACK; ctx.textAlign="center"; ctx.textBaseline="alphabetic";
    const by=y+Math.round(7.2*scale);
    for(let i=0;i<s.length;i++){ const ch=s[i]; if(ch!==" "&&ch!=="\u00a0") ctx.fillText(ch,Math.round(x+i*adv+adv/2),by); }
    return x+s.length*adv;
  },
  textW(s,scale){ return String(s).length*6*(scale||T.M); },
  ctext(s,cx,y,color,scale){ scale=scale||T.M; this.text(s,Math.round(cx-this.textW(s,scale)/2),y,color,scale); },
  rtext(s,rx,y,color,scale){ scale=scale||T.M; this.text(s,Math.round(rx-this.textW(s,scale)),y,color,scale); },
  lines(arr,x,y,color,scale,lh){ scale=scale||T.M; lh=lh||lineH(scale); arr.forEach((s,i)=>this.text(s,x,y+i*lh,color,scale)); return y+arr.length*lh; },
  clines(arr,cx,y,color,scale,lh){ scale=scale||T.M; lh=lh||lineH(scale); arr.forEach((s,i)=>this.ctext(s,cx,y+i*lh,color,scale)); return y+arr.length*lh; },
  // word-wrap a string (or array of strings = paragraphs) to a pixel width
  wrap(s,scale,maxW){ scale=scale||T.M; const cols=Math.floor(maxW/(6*scale)); const out=[]; const paras=Array.isArray(s)?s:String(s).split("\n");
    paras.forEach((par,pi)=>{ if(pi>0) out.push(""); let line=""; String(par).split(" ").forEach(w=>{ if(w==="") return; if((line+" "+w).trim().length>cols){ if(line) out.push(line); line=w; } else line=(line+" "+w).trim(); }); out.push(line); }); return out; },
  para(s,x,y,color,scale,maxW,lh){ scale=scale||T.M; const ls=this.wrap(s,scale,maxW); return this.lines(ls,x,y,color,scale,lh); },
  cpara(s,cx,y,color,scale,maxW,lh){ scale=scale||T.M; const ls=this.wrap(s,scale,maxW); return this.clines(ls,cx,y,color,scale,lh); },

  // Sprites: rows are hex strings ('.' = clear) or arrays of palette indices (-1 = clear)
  sprite(rows,scale){ if(!rows.__id) rows.__id=++this.nid; const key="s"+rows.__id+"@"+scale; let s=this.glyphCache[key]; if(s) return s;
    const h=rows.length, w=rows[0].length; const u=scale*this.D; const c=document.createElement("canvas"); c.width=Math.ceil(w*u); c.height=Math.ceil(h*u); const x=c.getContext("2d");
    for(let r=0;r<h;r++){ const row=rows[r]; for(let i=0;i<w;i++){ const v=typeof row==="string"?(row[i]==="."?-1:parseInt(row[i],16)):row[i]; if(v>=0){ x.fillStyle=PAL[v]; x.fillRect(Math.round(i*u),Math.round(r*u),Math.ceil(u),Math.ceil(u)); } } }
    this.glyphCache[key]=c; return c; },
  draw(rows,x,y,scale){ scale=scale||2; const s=this.sprite(rows,scale); this.ctx.drawImage(s,x|0,y|0,rows[0].length*scale,rows.length*scale); },
  // progress bar
  bar(x,y,w,h,frac,fg,bg){ this.rect(x,y,w,h,bg==null?C.STONE:bg); this.rect(x,y,Math.round(Math.max(0,Math.min(1,frac))*w),h,fg); this.frame(x,y,w,h,C.GOLD_INK,1); },
  // colour for a 0..1 level: green, then amber, then clay
  level(frac,warn,bad){ warn=warn==null?0.5:warn; bad=bad==null?0.25:bad; return frac<=bad?C.BAD:(frac<=warn?C.WARN:C.GOOD); }
};

// ---------- PIXEL ART BUILDER ----------
// Art pixels are 2 screen pixels. Everything below returns rows of palette indices.
function seeded(seed){ let s=(seed|0)||1; return ()=>{ s=(s*1103515245+12345)&0x7fffffff; return s/0x7fffffff; }; }
function PX(w,h){
  const g=[]; for(let y=0;y<h;y++) g.push(new Array(w).fill(-1));
  const o={ w,h,g,
    set(x,y,c){ x|=0; y|=0; if(x>=0&&x<w&&y>=0&&y<h) g[y][x]=c; },
    get(x,y){ return (x>=0&&x<w&&y>=0&&y<h)?g[y][x]:-1; },
    rect(x,y,rw,rh,c){ for(let j=0;j<rh;j++) for(let i=0;i<rw;i++) o.set(x+i,y+j,c); },
    hline(x,y,n,c){ for(let i=0;i<n;i++) o.set(x+i,y,c); },
    vline(x,y,n,c){ for(let i=0;i<n;i++) o.set(x,y+i,c); },
    frame(x,y,rw,rh,c){ o.hline(x,y,rw,c); o.hline(x,y+rh-1,rw,c); o.vline(x,y,rh,c); o.vline(x+rw-1,y,rh,c); },
    line(x0,y0,x1,y1,c){ let dx=Math.abs(x1-x0), dy=-Math.abs(y1-y0), sx=x0<x1?1:-1, sy=y0<y1?1:-1, err=dx+dy; for(;;){ o.set(x0,y0,c); if(x0===x1&&y0===y1) break; const e2=2*err; if(e2>=dy){ err+=dy; x0+=sx; } if(e2<=dx){ err+=dx; y0+=sy; } } },
    // gable: apex at (x+w/2,y), base width rw at y+rh-1
    gable(x,y,rw,rh,c){ for(let j=0;j<rh;j++){ const half=(rw/2)*(j+1)/rh; o.hline(Math.round(x+rw/2-half),y+j,Math.round(half*2),c); } },
    // pointed-arch opening
    arch(x,y,rw,rh,c){ const hp=rw/2, ph=Math.min(rh,Math.round(rw*0.9)); for(let j=0;j<rh;j++){ let half=hp; if(j<ph){ const t=j/ph; half=hp*Math.sqrt(1-(1-t)*(1-t)); } const n=Math.max(1,Math.round(half*2)); o.hline(Math.round(x+hp-n/2),y+j,n,c); } },
    // pointed-arch window with a frame, glass and mullions
    win(x,y,rw,rh,glass,frame,mull){ o.arch(x-1,y-1,rw+2,rh+1,frame); o.arch(x,y,rw,rh,glass); if(mull){ const n=mull; for(let k=1;k<n;k++){ const mx=Math.round(x+rw*k/n); o.vline(mx,y+Math.round(rw*0.35),rh-Math.round(rw*0.35),frame); } o.hline(x,y+Math.round(rh*0.55),rw,frame); } },
    // rubble stone wall
    stones(x,y,rw,rh,seed,pal){ const r=seeded(seed); pal=pal||[C.GOLD_LIGHT,C.GOLD,C.GOLD_LIGHT,C.GREIGE,C.GOLD,C.GOLD_PALE,C.STONE_MID]; o.rect(x,y,rw,rh,C.STONE_MID); let yy=y; while(yy<y+rh){ const bh=2+((r()*2)|0); let xx=x-((r()*3)|0); while(xx<x+rw){ const bw=2+((r()*5)|0); const c=pal[(r()*pal.length)|0]; const x0=Math.max(x,xx), x1=Math.min(x+rw,xx+bw); if(x1>x0) o.rect(x0,yy,x1-x0,Math.min(bh,y+rh-yy),c); xx+=bw+1; } yy+=bh+1; } },
    // stones only where there is already paint
    stonesIn(x,y,rw,rh,seed,pal){ const keep=[]; for(let j=0;j<rh;j++) for(let i=0;i<rw;i++) keep.push(o.get(x+i,y+j)>=0); o.stones(x,y,rw,rh,seed,pal); let k=0; for(let j=0;j<rh;j++) for(let i=0;i<rw;i++){ if(!keep[k++]) o.set(x+i,y+j,-1); } },
    brick(x,y,rw,rh,seed){ const r=seeded(seed); o.rect(x,y,rw,rh,C.BRICK); for(let j=y;j<y+rh;j+=2){ o.hline(x,j,rw,C.CLAY_INK); for(let i=x+((j/2)%2?2:0); i<x+rw; i+=4){ if(r()<0.3) o.hline(i,j+1,2,C.CLAY); } } },
    rows(){ return g; }
  }; return o;
}

// ---------- ART ----------
const ART = {};
function buildArt(){
  // Sanctuary front: gable, great window, door, buttresses (72x68)
  { const p=PX(72,68); const S=C.STONE;
    p.gable(8,6,56,30,C.GOLD_LIGHT); p.rect(8,36,56,32,C.GOLD_LIGHT); p.stonesIn(0,0,72,68,7);
    p.line(8,35,36,6,S); p.line(36,6,64,35,S); p.line(9,35,36,7,S); p.line(36,7,63,35,S);
    p.rect(3,26,6,42,C.GOLD); p.stonesIn(3,26,6,42,11); p.line(3,26,8,22,C.GOLD_LIGHT); p.rect(63,26,6,42,C.GOLD); p.stonesIn(63,26,6,42,13);
    p.rect(14,40,4,28,C.GOLD); p.rect(54,40,4,28,C.GOLD);
    p.win(24,14,24,32,C.HARBOR_LIGHT,S,3); p.set(36,18,C.HARBOR_PALE); p.rect(30,22,2,2,C.HARBOR_PALE);
    p.arch(29,50,14,18,S); p.arch(30,51,12,17,C.WOOD); p.vline(36,54,14,S); p.hline(26,66,20,C.GREIGE); p.hline(24,67,24,C.GREIGE);
    p.vline(36,0,6,S); p.hline(34,2,5,S);
    ART.sanct_front=p.rows(); }
  // Bell tower, squared off (22x60)
  { const p=PX(22,60); p.stones(0,3,22,57,21); for(let x=0;x<22;x+=4) p.rect(x,0,2,4,C.GOLD_LIGHT); p.hline(0,3,22,C.STONE_MID);
    p.vline(0,3,57,C.GOLD); p.vline(21,3,57,C.GOLD); p.vline(1,3,57,C.GOLD_LIGHT); p.vline(20,3,57,C.GOLD_LIGHT);
    p.arch(4,8,6,14,C.INK); p.arch(12,8,6,14,C.INK); for(let y=12;y<21;y+=2){ p.hline(5,y,4,C.STONE_MID); p.hline(13,y,4,C.STONE_MID); }
    p.hline(2,24,18,C.STONE_MID); p.hline(2,25,18,C.GREIGE);
    p.rect(9,30,4,9,C.INK); p.set(10,30,C.STONE_MID); p.rect(9,44,4,9,C.INK);
    ART.tower=p.rows(); }
  // 1927 church, side view: gable front, nave, tower at the rear (112x56)
  { const p=PX(112,56); const S=C.STONE;
    p.rect(30,10,62,14,S); for(let y=12;y<24;y+=3) p.hline(30,y,62,C.STONE_MID); p.rect(30,24,62,32,C.GOLD_LIGHT); p.stonesIn(30,24,62,32,31);
    for(let i=0;i<5;i++){ const x=36+i*12; p.win(x,27,6,18,C.HARBOR_LIGHT,S,2); p.rect(x+8,30,2,26,C.GOLD); }
    p.stones(92,4,18,52,33); for(let x=92;x<110;x+=4) p.rect(x,1,2,4,C.GOLD_LIGHT); p.arch(95,8,5,12,C.INK); p.arch(102,8,5,12,C.INK); p.rect(99,30,4,8,C.INK); p.rect(99,44,4,8,C.INK);
    p.gable(2,2,36,22,C.GOLD_LIGHT); p.rect(2,24,36,32,C.GOLD_LIGHT); p.stonesIn(0,0,40,56,37); p.line(2,23,20,2,S); p.line(20,2,38,23,S);
    p.rect(0,30,4,26,C.GOLD); p.rect(36,30,4,26,C.GOLD); p.win(12,10,16,22,C.HARBOR_LIGHT,S,3); p.arch(16,42,8,14,S); p.arch(17,43,6,13,C.WOOD); p.vline(20,0,3,S); p.hline(19,1,3,S);
    ART.church1927=p.rows(); }
  // Educational Building, three storeys of stone (64x56)
  { const p=PX(64,56); const S=C.STONE;
    p.rect(0,10,64,46,C.GOLD_LIGHT); p.stonesIn(0,10,64,46,41); p.rect(0,8,64,2,S); p.rect(50,2,4,8,S);
    p.gable(22,0,20,10,C.GOLD_LIGHT); p.rect(22,10,20,46,C.GOLD); p.stonesIn(22,0,20,56,43); p.line(22,9,32,0,S); p.line(32,0,42,9,S);
    for(let f=0;f<3;f++){ const y=14+f*14; [4,12,46,54].forEach(x=>{ p.rect(x,y,6,9,C.HARBOR_LIGHT); p.frame(x-1,y-1,8,11,S); p.vline(x+3,y,9,S); p.hline(x,y+4,6,S); }); if(f<2){ p.win(29,y,6,9,C.HARBOR_LIGHT,S,2); } }
    p.arch(27,42,10,14,S); p.arch(28,43,8,13,C.WOOD); p.hline(24,55,16,C.GREIGE);
    ART.edbuilding=p.rows(); }
  // Christian Life Center: big gable with an arched window, wings (80x56)
  { const p=PX(80,56); const S=C.STONE;
    p.rect(0,18,20,38,C.GOLD_LIGHT); p.rect(60,18,20,38,C.GOLD_LIGHT); p.stonesIn(0,18,20,38,51); p.stonesIn(60,18,20,38,53); p.hline(0,17,20,S); p.hline(60,17,20,S);
    for(let f=0;f<2;f++){ const y=24+f*14; [3,11,63,71].forEach(x=>{ p.rect(x,y,6,8,C.HARBOR_LIGHT); p.frame(x-1,y-1,8,10,S); }); }
    p.gable(18,0,44,24,C.GOLD_LIGHT); p.rect(18,24,44,32,C.GOLD_LIGHT); p.stonesIn(18,0,44,56,55); p.line(18,23,40,0,S); p.line(40,0,62,23,S);
    p.win(30,10,20,24,C.HARBOR_LIGHT,S,3); p.rect(32,42,16,14,C.HARBOR_PALE); p.frame(31,41,18,15,S); p.vline(40,42,14,S); p.rect(26,42,2,14,C.GOLD); p.rect(52,42,2,14,C.GOLD);
    ART.clc=p.rows(); }
  // Outreach Center: long two-storey building, brick above stone, arched entry (112x44)
  { const p=PX(112,44); const S=C.STONE;
    p.brick(0,8,112,18,61); p.rect(0,26,112,18,C.GOLD_LIGHT); p.stonesIn(0,26,112,18,63); p.rect(0,6,112,2,S);
    for(let i=0;i<4;i++){ [6+i*10,70+i*10].forEach(x=>{ p.win(x,11,6,11,C.HARBOR_LIGHT,S,0); p.win(x,29,6,12,C.HARBOR_LIGHT,S,0); }); }
    p.gable(44,0,24,8,C.GOLD_LIGHT); p.rect(44,8,24,36,C.GOLD_LIGHT); p.stonesIn(44,0,24,44,65); p.line(44,7,56,0,S); p.line(56,0,68,7,S);
    p.win(49,9,14,22,C.HARBOR_PALE,S,2); p.rect(50,34,12,10,C.HARBOR); p.frame(49,33,14,11,S); p.vline(56,34,10,S); p.hline(46,43,20,C.GREIGE);
    ART.outreach=p.rows(); }
  // Welcome Center: a glass gable between stone wings (56x56)
  { const p=PX(56,56); const S=C.STONE;
    p.rect(0,22,12,34,C.GOLD_LIGHT); p.rect(44,22,12,34,C.GOLD_LIGHT); p.stonesIn(0,22,12,34,71); p.stonesIn(44,22,12,34,73); p.hline(0,21,12,S); p.hline(44,21,12,S);
    p.gable(8,0,40,22,C.GOLD_LIGHT); p.rect(8,22,40,34,C.GOLD_LIGHT); p.stonesIn(8,0,40,56,75); p.line(8,21,28,0,S); p.line(28,0,48,21,S);
    p.gable(16,8,24,14,C.HARBOR_PALE); p.rect(16,22,24,22,C.HARBOR_PALE); for(let y=12;y<44;y+=6) p.hline(16,y,24,C.HARBOR); for(let x=22;x<40;x+=6) p.vline(x,10,34,C.HARBOR); p.line(16,21,28,9,S); p.line(28,9,40,21,S);
    p.rect(24,44,8,12,C.HARBOR); p.frame(23,43,10,13,S); p.vline(28,44,12,S); p.hline(20,55,16,C.GREIGE);
    ART.welcome=p.rows(); }
  // Children's Building, long low brick, after the 1951 drawing (112x32)
  { const p=PX(112,32); const S=C.STONE;
    p.brick(0,4,112,28,81); p.rect(0,2,112,2,S); p.rect(0,16,112,1,C.GREIGE);
    for(let f=0;f<2;f++){ const y=7+f*13; for(let i=0;i<8;i++){ const x=4+i*13; if(i===4&&f===1) continue; p.rect(x,y,8,7,C.HARBOR_LIGHT); p.frame(x-1,y-1,10,9,C.GREIGE); p.vline(x+4,y,7,C.GREIGE); } }
    p.rect(55,20,10,12,C.GOLD_LIGHT); p.rect(57,22,6,10,C.WOOD); p.hline(52,31,16,C.GREIGE);
    ART.children=p.rows(); }
  // Mini-bus, side view, facing right (48x22)
  { const p=PX(48,22); const K=C.INK;
    p.rect(2,3,38,13,C.PAPER); p.rect(1,5,1,9,C.PAPER); p.rect(40,8,7,8,C.PAPER); p.rect(39,3,1,5,C.PAPER); p.line(40,3,44,8,C.PAPER); p.rect(41,4,3,4,C.PAPER);
    p.frame(1,3,39,13,C.GOLD_LIGHT); p.line(40,3,44,8,C.GOLD_LIGHT); p.hline(44,8,3,C.GOLD_LIGHT); p.vline(46,8,8,C.GOLD_LIGHT); p.hline(40,15,7,C.GOLD_LIGHT);
    for(let i=0;i<5;i++){ p.rect(4+i*7,5,5,5,C.HARBOR_LIGHT); p.set(5+i*7,6,C.HARBOR_PALE); }
    p.rect(39,5,4,5,C.HARBOR_LIGHT); p.line(40,4,43,4,C.HARBOR_LIGHT);
    p.rect(2,11,38,2,C.HARBOR); p.rect(40,13,7,1,C.HARBOR); p.rect(33,5,1,10,C.GOLD_LIGHT); p.vline(32,10,5,C.GOLD_LIGHT);
    p.rect(0,16,47,1,C.STONE); p.rect(45,11,2,2,C.CLAY_LIGHT); p.rect(0,9,2,3,C.CLAY);
    [8,36].forEach(x=>{ p.rect(x-3,15,7,7,K); p.rect(x-2,16,5,5,C.JET); p.rect(x-1,17,3,3,C.GREIGE); p.set(x,18,C.STONE); });
    p.rect(14,19,18,2,C.STONE);
    ART.bus=p.rows(); }
  // trees, pine, cloud
  { const p=PX(14,18); p.rect(5,13,4,5,C.WOOD); p.rect(2,4,10,9,C.SAGE_INK); p.rect(4,2,6,2,C.SAGE_INK); p.rect(0,7,14,4,C.SAGE_INK); p.rect(3,5,5,4,C.SAGE); p.rect(6,3,3,2,C.SAGE); p.set(9,8,C.SAGE); p.rect(2,9,3,2,C.SAGE_INK); ART.tree=p.rows(); }
  { const p=PX(11,20); p.rect(5,16,2,4,C.WOOD); p.gable(3,0,5,5,C.PINE); p.gable(2,4,7,6,C.PINE); p.gable(1,9,9,7,C.PINE); p.gable(3,1,3,3,C.SAGE_INK); p.gable(2,5,5,4,C.SAGE_INK); p.gable(1,10,7,5,C.SAGE_INK); ART.pine=p.rows(); }
  { const p=PX(16,7); p.rect(4,0,8,7,C.PAPER); p.rect(1,2,14,4,C.PAPER); p.rect(0,3,16,2,C.PAPER); p.hline(2,6,12,C.GOLD_PALE); p.rect(6,1,4,2,C.PAPER); ART.cloud=p.rows(); }
  // pledge envelopes, small / medium / large
  ART.card={};
  { const p=PX(8,5); p.rect(0,0,8,5,C.PAPER); p.frame(0,0,8,5,C.GOLD_LIGHT); p.line(0,0,4,2,C.GOLD_LIGHT); p.line(4,2,7,0,C.GOLD_LIGHT); ART.card.s=p.rows(); }
  { const p=PX(12,8); p.rect(0,0,12,8,C.PAPER); p.frame(0,0,12,8,C.HARBOR); p.line(0,0,6,4,C.HARBOR); p.line(6,4,11,0,C.HARBOR); p.rect(8,5,3,2,C.CLAY_LIGHT); ART.card.m=p.rows(); }
  { const p=PX(16,10); p.rect(0,0,16,10,C.PAPER); p.frame(0,0,16,10,C.CLAY_INK); p.line(0,0,8,5,C.CLAY_INK); p.line(8,5,15,0,C.CLAY_INK); p.rect(11,6,4,3,C.CLAY_LIGHT); p.rect(2,7,6,1,C.GOLD_LIGHT); ART.card.l=p.rows(); }
  // Hugh McManaway with his white towel (10x14)
  { const p=PX(10,14); p.rect(2,0,5,2,C.JET); p.rect(1,2,7,1,C.JET); p.rect(3,3,3,3,C.SKIN); p.rect(2,6,5,4,C.GOLD_INK); p.rect(0,4,2,3,C.GOLD_INK); p.rect(7,2,2,5,C.SKIN); p.rect(8,0,2,3,C.PAPER); p.rect(3,10,1,4,C.STONE); p.rect(5,10,1,4,C.STONE); ART.hugh=p.rows(); }
  // ---- The Providence Road Home: orthographic road traffic (mule cart -> car) + the minibus ----
  // Vehicles are parallelograms on the ground plane spanned by the road's forward axis
  // DIR=(0.866,-0.5) and cross axis PER=(0.5,0.866), so they sit facing up-right along the road.
  { const DX=0.866, DY=-0.5, EX=0.5, EY=0.866;
    const par=(p,ox,oy,i0,i1,w0,w1,c)=>{ for(let i=i0;i<=i1;i+=0.5) for(let j=w0;j<=w1;j+=0.5) p.set(Math.round(ox+i*DX+j*EX), Math.round(oy+i*DY+j*EY), c); };
    const stud=(p,ox,oy,i,j,c,r)=>{ r=r||1; const x=Math.round(ox+i*DX+j*EX), y=Math.round(oy+i*DY+j*EY); p.rect(x-r,y-r,r*2,r*2,c); };
    const wheel=(p,ox,oy,i,j,r,c)=>{ const x=Math.round(ox+i*DX+j*EX), y=Math.round(oy+i*DY+j*EY); p.rect(x-r,y-r,r*2,r*2,c); p.frame(x-r,y-r,r*2,r*2,C.INK); p.set(x,y,C.GOLD_LIGHT); };
    // mule cart (the early years): two big wagon wheels, a hay bed, a mule in harness
    { const p=PX(36,30), ox=2, oy=17;
      wheel(p,ox,oy,3,-1,3,C.WOOD); wheel(p,ox,oy,3,10,3,C.WOOD);
      par(p,ox,oy,-1,10,0.5,8.5,C.WOOD); par(p,ox,oy,-1,10,0.5,1.3,C.GOLD_INK); par(p,ox,oy,-1,10,7.7,8.5,C.GOLD_INK);
      par(p,ox,oy,1,8,2,7,C.GOLD);
      par(p,ox,oy,10,13.5,3.2,3.8,C.GOLD_INK); par(p,ox,oy,10,13.5,5.2,5.8,C.GOLD_INK);
      par(p,ox,oy,13,20,2.6,6.4,C.BRICK); par(p,ox,oy,14,19,3,6,C.CLAY_INK);
      stud(p,ox,oy,14.5,2.8,C.INK,1); stud(p,ox,oy,14.5,6.2,C.INK,1); stud(p,ox,oy,18.5,2.8,C.INK,1); stud(p,ox,oy,18.5,6.2,C.INK,1);
      par(p,ox,oy,20,23,3.6,5.4,C.BRICK); stud(p,ox,oy,20.2,3,C.BRICK,1); stud(p,ox,oy,20.2,6,C.BRICK,1);
      stud(p,ox,oy,23,4.5,C.INK,1); stud(p,ox,oy,21.5,4,C.INK,1);
      ART.cartOrtho=p.rows(); }
    // automobile (the later years)
    { const p=PX(28,24), ox=2, oy=11;
      wheel(p,ox,oy,3.5,-0.6,2,C.INK); wheel(p,ox,oy,3.5,11.6,2,C.INK); wheel(p,ox,oy,14,-0.6,2,C.INK); wheel(p,ox,oy,14,11.6,2,C.INK);
      par(p,ox,oy,0,18,0,11,C.HARBOR_INK); par(p,ox,oy,2,16,1,10,C.HARBOR);
      par(p,ox,oy,5,13,2,9,C.HARBOR_LIGHT); par(p,ox,oy,13,16,2,9,C.HARBOR_PALE); par(p,ox,oy,3,5,2,9,C.HARBOR_PALE);
      stud(p,ox,oy,17.5,1.6,C.GOLD_PALE,1); stud(p,ox,oy,17.5,9.4,C.GOLD_PALE,1); ART.carOrtho=p.rows(); }
    // modern SUV (2026): bigger and boxier than the car, dark maroon
    { const p=PX(34,27), ox=2, oy=13;
      wheel(p,ox,oy,4,-0.9,2,C.INK); wheel(p,ox,oy,4,13.9,2,C.INK); wheel(p,ox,oy,17,-0.9,2,C.INK); wheel(p,ox,oy,17,13.9,2,C.INK);
      par(p,ox,oy,-0.5,21.5,-0.5,13.5,C.INK);         // dark outline/base
      par(p,ox,oy,0,21,0.5,12.5,C.CLAY_INK);          // body (maroon)
      par(p,ox,oy,2,19,1.6,11.4,C.CLAY);              // body highlight
      par(p,ox,oy,4,17,2.6,10.4,C.CLAY_INK);          // tall roof box
      par(p,ox,oy,5.5,9.5,3.2,9.8,C.HARBOR_LIGHT);    // windshield glass
      par(p,ox,oy,11.5,16,3.2,9.8,C.HARBOR_PALE);     // rear glass
      par(p,ox,oy,19,21,1.2,11.8,C.CLAY);             // hood
      stud(p,ox,oy,20.5,2,C.GOLD_PALE,1); stud(p,ox,oy,20.5,11,C.GOLD_PALE,1); // headlights
      ART.suvOrtho=p.rows(); }
    // the church minibus (the player) with a little cross on the roof
    { const p=PX(36,24), ox=2, oy=13;
      wheel(p,ox,oy,4,-0.6,2,C.INK); wheel(p,ox,oy,4,12.6,2,C.INK); wheel(p,ox,oy,22,-0.6,2,C.INK); wheel(p,ox,oy,22,12.6,2,C.INK);
      par(p,ox,oy,0,26,0,12,C.GOLD_PALE); par(p,ox,oy,2,24,1.2,10.8,C.PAPER);
      par(p,ox,oy,3,23,2,10,C.HARBOR_LIGHT); for(let i=4;i<22;i+=3) par(p,ox,oy,i,i+0.6,2,10,C.GOLD_INK);
      par(p,ox,oy,23,26,1.5,10.5,C.HARBOR_PALE); par(p,ox,oy,0,2,1,11,C.CLAY);
      par(p,ox,oy,12,16,5.6,6.4,C.CLAY_INK); par(p,ox,oy,13.3,14.3,4.6,7.4,C.CLAY_INK);
      ART.minibusOrtho=p.rows(); }
    // a little orange traffic cone for the roadwork on the drive home
    { const p=PX(9,12);
      p.rect(4,0,2,2,C.CLAY); p.rect(3,2,4,2,C.CLAY); p.rect(3,3,4,1,C.PAPER);
      p.rect(2,4,6,2,C.CLAY); p.rect(2,6,6,1,C.PAPER); p.rect(1,7,8,3,C.CLAY);
      p.rect(0,10,9,2,C.CLAY_INK); p.set(0,11,C.INK); p.set(8,11,C.INK);
      ART.cone=p.rows(); }
    // Hugh McManaway ("Old Man Traffic"), higher-res, towel raised, directing
    { const p=PX(16,28), J=C.JET, S=C.SKIN, W=C.PAPER;
      p.rect(4,0,8,2,J); p.rect(3,2,10,1,J);
      p.rect(5,3,5,4,S); p.set(6,5,C.INK); p.set(8,5,C.INK);
      p.rect(4,7,8,10,C.GOLD_INK); p.rect(5,8,6,7,C.JET);
      p.rect(2,8,2,6,S); p.rect(11,4,2,5,S); p.rect(10,1,4,4,W);
      p.rect(5,17,2,7,C.STONE); p.rect(9,17,2,7,C.STONE); p.rect(5,24,3,2,C.INK); p.rect(9,24,3,2,C.INK);
      ART.hughOrtho=p.rows(); }
    // oncoming traffic: the same vehicles rotated 180 degrees so they face down-the-road toward you
    ART.rot180=rows=>rows.map(r=>r.slice()).reverse().map(r=>r.reverse());
    ART.carOrthoRev=ART.rot180(ART.carOrtho); ART.suvOrthoRev=ART.rot180(ART.suvOrtho);
  }
}
buildArt();

// ---------- PORTRAITS (32x32 art pixels) ----------
// face: round | long | square. hair: bald | side | receding | full | short | cap | long. glasses: null | round | square
// body: robe | tabs | stole_white | stole_dark | suit | suit_open | blouse
const LOOKS = {
  gammon:   { face:"round",  hair:"side",     hairC:C.GOLD_LIGHT, glasses:"round",  smile:false, body:"robe", brows:true },
  jones:    { face:"round",  hair:"receding", hairC:C.JET,        glasses:"round",  smile:false, body:"tabs" },
  fogartie: { face:"square", hair:"full",     hairC:C.JET,        glasses:null,     smile:false, body:"robe", part:true },
  taylor:   { face:"long",   hair:"receding", hairC:C.GOLD_LIGHT, glasses:null,     smile:true,  body:"suit", brows:true },
  croft:    { face:"round",  hair:"full",     hairC:C.JET,        glasses:"square", smile:true,  body:"stole_white" },
  swicegood:{ face:"long",   hair:"full",     hairC:C.JET,        glasses:null,     smile:false, body:"stole_dark", part:true },
  eason:    { face:"round",  hair:"full",     hairC:C.GOLD_INK,   glasses:"round",  smile:true,  body:"stole_white" },
  clifford: { face:"round",  hair:"short",    hairC:C.GOLD_LIGHT, glasses:"square", smile:true,  body:"suit_open" },
  calvin:   { face:"long",   hair:"cap",      hairC:C.JET,        glasses:null,     smile:false, body:"robe", beard:true },
  jennifer: { face:"round",  hair:"long",     hairC:C.BLOND,      glasses:null,     smile:true,  body:"blouse" }
};
function portraitRows(look){
  const p=PX(32,32); const skin=C.SKIN, shade=C.CLAY_LIGHT, K=C.INK;
  const b=look.body;
  if(b==="suit"||b==="suit_open"){ p.rect(5,24,22,8,C.JET); p.rect(13,24,6,8,C.PAPER); if(b==="suit"){ p.rect(15,25,2,7,C.CLAY_INK); } else { p.set(13,24,C.JET); p.set(18,24,C.JET); p.rect(14,25,4,2,C.SKIN); } p.line(9,24,13,30,C.STONE); p.line(22,24,18,30,C.STONE); }
  else if(b==="blouse"){ p.rect(6,25,20,7,C.HARBOR_INK); for(let x=7;x<26;x+=3) p.vline(x,25,7,C.HARBOR); p.rect(13,24,6,3,C.SKIN); }
  else { p.rect(5,24,22,8,C.JET); p.rect(14,24,4,2,C.PAPER); }
  if(b==="stole_white"){ p.rect(9,24,3,8,C.PAPER); p.rect(20,24,3,8,C.PAPER); p.hline(9,27,3,C.CLAY_INK); p.hline(20,27,3,C.CLAY_INK); p.set(10,28,C.CLAY_INK); p.set(21,28,C.CLAY_INK); p.set(10,26,C.CLAY_INK); p.set(21,26,C.CLAY_INK); }
  if(b==="stole_dark"){ p.rect(9,24,3,8,C.PLUM_INK); p.rect(20,24,3,8,C.PLUM_INK); p.set(10,28,C.GOLD_LIGHT); p.set(21,28,C.GOLD_LIGHT); p.hline(15,27,2,C.GOLD_LIGHT); p.vline(15,26,3,C.GOLD_LIGHT); }
  if(b==="tabs"){ p.rect(13,24,3,5,C.PAPER); p.rect(16,24,3,5,C.PAPER); p.vline(15,24,5,C.STONE); }
  p.rect(13,20,6,5,skin); p.hline(13,21,6,shade);
  let fx0=9,fy0=7,fx1=22,fy1=21;
  if(look.face==="long"){ fx0=10; fx1=21; fy0=6; fy1=23; }
  if(look.face==="square"){ fy1=22; }
  p.rect(fx0,fy0,fx1-fx0+1,fy1-fy0+1,skin);
  if(look.face!=="square"){ p.set(fx0,fy0,-1); p.set(fx1,fy0,-1); p.set(fx0,fy1,-1); p.set(fx1,fy1,-1); p.set(fx0+1,fy1,-1); p.set(fx1-1,fy1,-1); p.set(fx0,fy1-1,-1); p.set(fx1,fy1-1,-1); }
  else { p.set(fx0,fy0,-1); p.set(fx1,fy0,-1); }
  p.rect(fx0-1,12,1,4,skin); p.rect(fx1+1,12,1,4,skin);
  p.hline(fx0+2,fy1,fx1-fx0-3,shade);
  const hc=look.hairC, h=look.hair;
  if(h==="full"){ p.rect(fx0-1,5,fx1-fx0+3,4,hc); p.rect(fx0-1,9,2,5,hc); p.rect(fx1,9,2,5,hc); p.set(fx0-1,5,-1); p.set(fx1+1,5,-1); if(look.part){ p.hline(fx0+3,8,fx1-fx0-6,skin); p.hline(fx0+1,8,2,hc); } }
  else if(h==="short"){ p.rect(fx0,5,fx1-fx0+1,3,hc); p.rect(fx0-1,8,1,4,hc); p.rect(fx1+1,8,1,4,hc); p.set(fx0,5,-1); p.set(fx1,5,-1); }
  else if(h==="side"){ p.rect(fx0-1,9,2,6,hc); p.rect(fx1,9,2,6,hc); p.hline(fx0+1,fy0,fx1-fx0-1,hc); }
  else if(h==="receding"){ p.rect(fx0-1,8,3,6,hc); p.rect(fx1-1,8,3,6,hc); p.rect(fx0+1,5,fx1-fx0-1,2,hc); p.hline(fx0+4,7,fx1-fx0-7,skin); p.hline(fx0+1,7,3,hc); p.hline(fx1-3,7,3,hc); }
  else if(h==="bald"){ p.rect(fx0-1,11,1,5,hc); p.rect(fx1+1,11,1,5,hc); }
  else if(h==="cap"){ p.rect(fx0-1,4,fx1-fx0+3,5,C.JET); p.rect(fx0-2,8,2,5,C.JET); p.rect(fx1+1,8,2,5,C.JET); }
  else if(h==="long"){ p.rect(fx0-1,4,fx1-fx0+3,5,hc); p.rect(fx0-2,8,3,16,hc); p.rect(fx1,8,3,16,hc); p.set(fx0-1,4,-1); p.set(fx1+1,4,-1); }
  if(look.brows){ const bc=hc===C.GOLD_LIGHT?C.GOLD_INK:hc; p.hline(11,11,4,bc); p.hline(17,11,4,bc); }
  p.set(12,13,K); p.set(13,13,K); p.set(18,13,K); p.set(19,13,K);
  if(look.glasses==="round"){ p.frame(10,11,5,4,C.STONE); p.frame(17,11,5,4,C.STONE); p.hline(15,12,2,C.STONE); p.set(10,11,skin); p.set(14,11,skin); p.set(17,11,skin); p.set(21,11,skin); p.set(12,13,K); p.set(13,13,K); p.set(18,13,K); p.set(19,13,K); }
  if(look.glasses==="square"){ p.frame(10,11,5,4,C.JET); p.frame(17,11,5,4,C.JET); p.hline(15,12,2,C.JET); p.set(12,13,K); p.set(13,13,K); p.set(18,13,K); p.set(19,13,K); }
  p.vline(15,14,3,shade); p.set(16,16,shade);
  if(look.smile){ p.set(12,18,C.CLAY_INK); p.hline(13,19,6,C.CLAY_INK); p.set(19,18,C.CLAY_INK); p.hline(14,18,4,C.PAPER); }
  else { p.hline(13,19,6,C.CLAY_INK); }
  if(look.beard){ p.rect(fx0+1,17,fx1-fx0-1,7,C.JET); p.rect(fx0+3,24,fx1-fx0-5,3,C.JET); p.rect(12,16,8,1,C.JET); p.hline(13,18,6,C.CLAY_INK); }
  // rim the clothing silhouette so a dark robe/suit never vanishes into a dark panel behind it
  { const edge=[]; for(let y=22;y<p.h;y++) for(let x=0;x<p.w;x++){ if(p.g[y][x]<0 && ((x>0&&p.g[y][x-1]>=0)||(x<p.w-1&&p.g[y][x+1]>=0)||(y>0&&p.g[y-1][x]>=0)||(y<p.h-1&&p.g[y+1][x]>=0))) edge.push([x,y]); } edge.forEach(e=>p.set(e[0],e[1],C.STONE_MID)); }
  return p.rows();
}
const PORTRAITS = {};
function portrait(id){ if(!PORTRAITS[id]) PORTRAITS[id]=portraitRows(LOOKS[id]||LOOKS.clifford); return PORTRAITS[id]; }
// full-figure pastor for the stewardship drive: head above a robe, arms out (32x56)
function pastorFigure(id){ const key="fig_"+id; if(PORTRAITS[key]) return PORTRAITS[key]; const head=portrait(id); const p=PX(32,56);
  for(let y=0;y<24;y++) for(let x=0;x<32;x++) if(head[y][x]>=0) p.set(x,y,head[y][x]);
  const look=LOOKS[id]||LOOKS.clifford; const robe=look.body==="blouse"?C.HARBOR_INK:C.JET;
  p.rect(13,20,6,5,C.SKIN);
  for(let y=24;y<56;y++){ const half=8+((y-24)*7/32); p.rect(Math.round(16-half),y,Math.round(half*2),1,robe); }
  p.rect(1,28,6,14,robe); p.rect(25,28,6,14,robe); p.rect(1,25,5,4,C.SKIN); p.rect(26,25,5,4,C.SKIN); p.rect(14,24,4,2,C.PAPER);
  if(look.body==="stole_white"||look.body==="tabs"){ p.rect(11,25,3,30,C.PAPER); p.rect(18,25,3,30,C.PAPER); }
  if(look.body==="stole_dark"){ p.rect(11,25,3,30,C.PLUM_INK); p.rect(18,25,3,30,C.PLUM_INK); }
  if(look.body==="suit"||look.body==="suit_open"){ p.rect(14,26,4,20,C.PAPER); if(look.body==="suit") p.rect(15,27,2,14,C.CLAY_INK); }
  PORTRAITS[key]=p.rows(); return PORTRAITS[key]; }
// tiny party icons (12x12), varied by name
const WOMEN = ["Eleanor Belk","Gladys Tillett","Margaret Peery","Jane Summey","Lib Harkey","Millie Snyder","Deborah Conner","Rebecca Davis","Michelle Thomas-Bush","Lisa Hickman","Jennifer Childers"];
const PICONS = {};
function partyIcon(name){ if(PICONS[name]) return PICONS[name]; let h=0; for(let i=0;i<name.length;i++) h=(h*31+name.charCodeAt(i))&0xffff; const r=seeded(h+1);
  const p=PX(12,12); const hairC=[C.JET,C.GOLD_INK,C.GOLD_LIGHT,C.BLOND,C.JET][(r()*5)|0]; const woman=WOMEN.includes(name);
  // clothing colours are all mid-tones so the icon never blends into a dark (Jet) panel behind it
  p.rect(2,9,8,3,[C.HARBOR,C.CLAY,C.PLUM,C.SAGE,C.GOLD][(r()*5)|0]); p.rect(5,8,2,2,C.PAPER);
  p.rect(3,2,6,7,C.SKIN); p.set(3,2,-1); p.set(8,2,-1); p.set(3,8,-1); p.set(8,8,-1);
  if(woman){ p.rect(2,1,8,3,hairC); p.rect(2,3,1,6,hairC); p.rect(9,3,1,6,hairC); p.set(2,1,-1); p.set(9,1,-1); }
  else { const style=(r()*3)|0; if(style===0){ p.rect(3,1,6,2,hairC); } else if(style===1){ p.rect(3,1,6,2,hairC); p.rect(2,3,1,3,hairC); p.rect(9,3,1,3,hairC); } else { p.rect(2,3,1,2,hairC); p.rect(9,3,1,2,hairC); } }
  p.set(4,5,C.INK); p.set(7,5,C.INK); if(r()<0.4){ p.hline(3,5,2,C.STONE); p.hline(7,5,2,C.STONE); p.set(4,5,C.INK); p.set(7,5,C.INK); } p.hline(5,7,2,C.CLAY_INK);
  PICONS[name]=p.rows(); return PICONS[name]; }
function partyFace(name){ return partyIcon(name); }
function busSprite(){ return ART.bus; }
// hair colour for a rider, matched to their 12x12 icon
function riderHairColor(name){ let h=0; for(let i=0;i<name.length;i++) h=(h*31+name.charCodeAt(i))&0xffff; const r=seeded(h+1); return [C.JET,C.GOLD_INK,C.GOLD_LIGHT,C.BLOND,C.JET][(r()*5)|0]; }
// draw little heads in the mini-bus windows: the pastor drives up front, the leaders ride in back.
// bus windows are 5x5 art-pixels at art-x 4,11,18,25 (back) and 32 (driver), art-y 5.
function drawBusRiders(bx,by,sc){
  sc=sc||2;
  function head(ax, hairC, glasses){
    const x=bx+ax*sc, y=by+5*sc;
    G.rect(x, y, 5*sc, 2*sc, hairC);            // hair
    G.rect(x, y+2*sc, 5*sc, 3*sc, C.SKIN);      // face
    if(glasses) G.rect(x+sc, y+3*sc, 3*sc, sc, C.STONE);
    G.rect(x+sc, y+3*sc, sc, sc, C.INK);        // eyes
    G.rect(x+3*sc, y+3*sc, sc, sc, C.INK);
  }
  const pl=LOOKS[S.pastor.id]||LOOKS.clifford;
  head(32, pl.hairC||C.JET, !!pl.glasses);
  const backs=[25,18,11,4], alive=partyAlive();
  for(let i=0;i<4;i++){ if(alive[i]) head(backs[i], riderHairColor(alive[i].name), false); }
}

// building art for a landmark (crossing screens and the scene band)
function landmarkArt(lm){ if(!lm) return null; const y=lm.year;
  if(y===1926) return null; if(y<=1937) return ART.church1927; if(y===1941||y===1944||y===1948) return ART.edbuilding; if(y===1952) return ART.children;
  if(y===1989) return ART.clc; if(y===2008||y===2011) return ART.outreach; if(y===2002) return ART.clc; if(y===2020) return ART.children; return ART.sanct_front; }
function horizonArt(year){ return year<1959 ? {rows:ART.church1927,scale:2} : {rows:ART.sanct_front,scale:2,tower:ART.tower}; }
// Sanctuary front with the bell tower behind it to the right
function drawChurch(x,y,scale){ scale=scale||2; const fw=ART.sanct_front[0].length, fh=ART.sanct_front.length; G.draw(ART.tower,x+fw*scale-8*scale,y+fh*scale-ART.tower.length*scale-2*scale,scale); G.draw(ART.sanct_front,x,y,scale); }

// ---------- SCENES ----------
function drawSky(y0,y1,dusk){ G.rect(0,y0,640,y1-y0,dusk?C.SKY_DUSK:C.SKY); }
function skylineFor(year){
  if(year<1950) return [[14,10,C.STONE],[10,16,C.GOLD_INK],[18,8,C.STONE],[8,12,C.STONE_MID],[12,14,C.GOLD_INK]];
  if(year<1990) return [[16,22,C.STONE],[10,30,C.STONE_MID],[20,18,C.STONE],[12,36,C.GOLD_INK],[14,26,C.STONE_MID]];
  return [[18,40,C.STONE],[12,70,C.STONE_MID],[22,52,C.STONE],[14,96,C.GOLD_INK,"crown"],[16,60,C.STONE],[14,48,C.STONE_MID],[20,80,C.STONE],[12,44,C.STONE_MID]];
}
function drawSkyline(year,off,baseY){
  const set=skylineFor(year); let x=-((off/3)|0)%640-80; let i=0;
  while(x<700){ const b=set[i%set.length]; G.rect(x,baseY-b[1],b[0],b[1],b[2]);
    if(b[3]==="crown"){ for(let k=0;k<4;k++) G.rect(x+1+k*3,baseY-b[1]-4-(k%2)*3,2,6,C.GOLD_LIGHT); }
    if(year>=1990){ for(let wy=baseY-b[1]+4; wy<baseY-4; wy+=8) for(let wx=x+2; wx<x+b[0]-2; wx+=4) if(((wx+wy)>>2)%3===0) G.rect(wx,wy,2,3,C.CLAY_LIGHT); }
    x+=b[0]+6+((i*7)%11); i++; }
}
function drawTravelScene(year,off,daytime){
  drawSky(0,230,!daytime);
  for(let k=0;k<4;k++){ const cx=((k*190 - off/6)%800+800)%800-80; G.draw(ART.cloud,cx,30+k*22,2); }
  drawSkyline(year,off,205);
  G.rect(0,205,640,40,C.GROUND); G.rect(0,205,640,3,C.SAGE);
  const ha=horizonArt(year); const hx=((520 - off/1.2)%1400+1400)%1400-200; if(ha.tower) drawChurch(hx,205-ha.rows.length*2,2); else G.draw(ha.rows,hx,205-ha.rows.length*2,2);
  for(let k=0;k<6;k++){ const tx=((k*140 - off/1.5)%900+900)%900-60; if(year<1960) G.draw(ART.pine,tx,170,2); else G.draw(ART.tree,tx,174,2); }
  G.rect(0,245,640,40,C.ROAD); for(let d=-((off/2)|0)%48; d<640; d+=48) G.rect(d,263,24,3,C.GOLD_PALE);
  G.rect(0,285,640,10,C.GOLD_INK);
}
// scene band for landmark and crossing screens: sky, ground, building on the right, bus on the ground.
// bottom defaults to 150; pass a smaller value for a shorter band.
function drawSceneBand(lm,bottom){ bottom=bottom||150; const gy=bottom-30; G.rect(0,28,640,gy-28,C.SKY); G.rect(0,gy,640,30,C.GROUND); G.rect(0,gy,640,3,C.SAGE); G.draw(ART.cloud,80,40,2); G.draw(ART.cloud,300,52,2);
  const la=landmarkArt(lm); if(la){ if(la===ART.sanct_front) drawChurch(470,bottom-la.length*2,2); else G.draw(la,632-la[0].length*2,bottom-la.length*2,2); }
  G.draw(ART.tree,200,gy-6,2); G.draw(ART.bus,30,gy-14,2); }
// the Sanctuary interior for the stewardship drive, drawn straight to the screen (y 0..330)
function drawInterior(){
  G.rect(0,0,640,330,C.GOLD_LIGHT);
  for(let y=0;y<330;y+=14){ for(let x=(((y/14)|0)%2)*12-12; x<640; x+=24){ G.rect(x,y,22,12,(((x+y)/26)|0)%3===0?C.GOLD:C.GOLD_LIGHT); } }
  G.rect(0,0,640,24,C.WOOD); for(let x=0;x<640;x+=128){ G.rect(x,0,8,330,C.WOOD); G.rect(x+8,0,2,330,C.GOLD_INK); G.rect(x+8,24,120,4,C.GOLD_INK); }
  const glass=[C.HARBOR,C.CLAY,C.SAGE,C.PLUM,C.HARBOR_LIGHT,C.CLAY_LIGHT,C.PLUM_LIGHT,C.SAGE_LIGHT];
  for(let i=0;i<5;i++){ const x=36+i*128, w=56, y=44, h=170; const ph=Math.round(w*0.9);
    for(let j=0;j<h;j++){ let half=w/2; if(j<ph){ const t=j/ph; half=(w/2)*Math.sqrt(1-(1-t)*(1-t)); } G.rect(Math.round(x+w/2-half-3),y+j,Math.round(half*2+6),1,C.STONE); }
    for(let j=0;j<h;j++){ let half=w/2; if(j<ph){ const t=j/ph; half=(w/2)*Math.sqrt(1-(1-t)*(1-t)); } const x0=Math.round(x+w/2-half); const n=Math.round(half*2);
      for(let k=0;k<n;k+=6){ const c=glass[((((x0+k)/6)|0)+((j/10)|0)*3+i)%glass.length]; G.rect(x0+k,y+j,Math.min(6,n-k),1,c); } }
    for(let yy=y+10; yy<y+h; yy+=10) G.rect(x,yy,w,1,C.INK); G.rect(x+w/2-1,y+20,2,h-20,C.INK); G.rect(Math.round(x+w/3)-1,y+30,2,h-30,C.INK); G.rect(Math.round(x+2*w/3)-1,y+30,2,h-30,C.INK);
  }
  G.rect(0,228,640,6,C.WOOD); G.rect(0,234,640,2,C.GOLD_INK);
  G.rect(556,196,64,40,C.WOOD); G.rect(552,192,72,6,C.GOLD_INK); G.rect(568,204,40,20,C.GOLD_INK); G.rect(572,208,32,12,C.WOOD); G.rect(560,170,16,26,C.WOOD); G.rect(556,166,24,6,C.GOLD_INK);
  G.rect(0,236,640,94,C.STONE_MID); for(let y=240;y<330;y+=6) G.rect(0,y,640,1,C.STONE);
  for(let r=0;r<3;r++){ const y=300+r*12; const ins=20-r*6; G.rect(ins,y,250-ins,8,C.WOOD); G.rect(ins,y-3,250-ins,3,C.GOLD_INK); G.rect(390+ins,y,250-ins,8,C.WOOD); G.rect(390+ins,y-3,250-ins,3,C.GOLD_INK); }
}
