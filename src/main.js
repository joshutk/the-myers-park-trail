// ============================================================
// BOOT
// ============================================================
window.addEventListener("load",()=>{
  Sound.load();
  // Calvin is a per-session easter egg: unlock it only by tapping the belltower, and never persist it.
  try{ localStorage.removeItem("mpt_calvin"); }catch(e){}
  Log.init();
  E.init();
  Sound.startMusic();   // continuous background hymns (silent until the first tap unlocks audio; respects Sound: off)
  E.go("title");
});
// debug helpers for playtesting from the console
window.MPT = { state:()=>S, go:(n,a)=>E.go(n,a), resetScores:()=>Store.resetScores(), unlockCalvin:()=>{ CALVIN_UNLOCKED=true; } };
