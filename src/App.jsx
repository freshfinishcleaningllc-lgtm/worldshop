import { useState, useRef, useEffect } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;600&family=DM+Sans:wght@300;400&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  :root {
    --void:#03020a; --panel:#13102e; --border:rgba(180,140,255,0.12);
    --gold:#c9a84c; --gold-glow:rgba(201,168,76,0.3); --violet:#8b6fd4;
    --violet-soft:rgba(139,111,212,0.2); --text:#e8e0f5; --muted:#7a7090; --star:#f0eaff;
  }
  body { background:var(--void); color:var(--text); font-family:'DM Sans',sans-serif; min-height:100vh; overflow-x:hidden; }
  .cosmos { position:fixed; inset:0; pointer-events:none; z-index:0;
    background:radial-gradient(ellipse 80% 50% at 20% -10%,rgba(60,30,120,0.4) 0%,transparent 60%),
    radial-gradient(ellipse 60% 40% at 80% 110%,rgba(30,15,80,0.5) 0%,transparent 60%),var(--void); }
  .stars { position:fixed; inset:0; pointer-events:none; z-index:0;
    background-image:radial-gradient(1.5px 1.5px at 15% 20%,rgba(240,234,255,0.6) 0%,transparent 100%),
    radial-gradient(1px 1px at 45% 8%,rgba(240,234,255,0.7) 0%,transparent 100%),
    radial-gradient(1px 1px at 75% 25%,rgba(240,234,255,0.5) 0%,transparent 100%),
    radial-gradient(1.5px 1.5px at 88% 55%,rgba(240,234,255,0.6) 0%,transparent 100%),
    radial-gradient(2px 2px at 12% 65%,rgba(201,168,76,0.5) 0%,transparent 100%),
    radial-gradient(1.5px 1.5px at 65% 45%,rgba(201,168,76,0.3) 0%,transparent 100%); }
  .app { position:relative; z-index:1; max-width:860px; margin:0 auto; padding:0 18px 100px; }
  .header { text-align:center; padding:42px 0 28px; }
  .header::after { content:''; display:block; width:100px; height:1px; background:linear-gradient(90deg,transparent,var(--gold),transparent); margin:14px auto 0; }
  .moon { font-size:2rem; display:block; margin-bottom:10px; filter:drop-shadow(0 0 14px var(--gold-glow)); animation:glow 4s ease-in-out infinite; }
  @keyframes glow { 0%,100%{filter:drop-shadow(0 0 12px var(--gold-glow))} 50%{filter:drop-shadow(0 0 26px rgba(201,168,76,0.65))} }
  .logo { font-family:'Cinzel',serif; font-size:2.1rem; font-weight:600; letter-spacing:0.14em;
    background:linear-gradient(135deg,var(--gold),#e8d5a3,var(--gold)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .tagline { font-family:'Cormorant Garamond',serif; font-style:italic; font-size:0.97rem; color:var(--muted); margin-top:4px; }
  .wallet-bar { display:flex; justify-content:space-between; align-items:center; gap:10px; margin-bottom:14px; }
  .free-badge { font-family:'Cinzel',serif; font-size:0.72rem; letter-spacing:0.1em; color:var(--gold); 
    background:rgba(201,168,76,0.1); border:1px solid rgba(201,168,76,0.3); padding:6px 14px; border-radius:20px; }
  .w-btn { display:flex; align-items:center; gap:7px; padding:8px 16px; border-radius:30px; border:1px solid var(--border);
    background:var(--panel); color:var(--text); font-family:'DM Sans',sans-serif; font-size:0.8rem; cursor:pointer; transition:all 0.25s; }
  .w-btn:hover { border-color:rgba(139,111,212,0.45); background:rgba(139,111,212,0.1); }
  .w-btn.on { border-color:rgba(201,168,76,0.4); background:rgba(201,168,76,0.08); color:var(--gold); }
  .dot { width:7px; height:7px; border-radius:50%; background:#4ade80; animation:blink 2s infinite; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.4} }
  .nav { display:flex; gap:4px; background:var(--panel); border:1px solid var(--border); border-radius:16px; padding:5px; margin-bottom:26px; }
  .nb { flex:1; padding:9px 6px; border:none; background:transparent; color:var(--muted); font-family:'DM Sans',sans-serif;
    font-size:0.79rem; border-radius:11px; cursor:pointer; transition:all 0.25s; display:flex; align-items:center; justify-content:center; gap:5px; }
  .nb.on { background:linear-gradient(135deg,rgba(139,111,212,0.3),rgba(60,30,120,0.4)); color:var(--star); border:1px solid var(--border); }
  .nb:hover:not(.on) { color:var(--text); background:rgba(255,255,255,0.04); }
  .card { background:var(--panel); border:1px solid var(--border); border-radius:20px; padding:24px; margin-bottom:16px; position:relative; overflow:hidden; }
  .card::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,var(--violet),transparent); opacity:0.4; }
  .stitle { font-family:'Cinzel',serif; font-size:0.74rem; letter-spacing:0.17em; color:var(--gold); text-transform:uppercase; margin-bottom:15px; display:flex; align-items:center; gap:9px; }
  .stitle::after { content:''; flex:1; height:1px; background:linear-gradient(90deg,var(--border),transparent); }
  textarea.di { width:100%; min-height:125px; background:rgba(0,0,0,0.3); border:1px solid var(--border); border-radius:13px;
    padding:15px 17px; color:var(--text); font-family:'Cormorant Garamond',serif; font-size:1.07rem; line-height:1.7;
    resize:vertical; outline:none; transition:border-color 0.3s,box-shadow 0.3s; }
  textarea.di:focus { border-color:rgba(139,111,212,0.5); box-shadow:0 0 18px rgba(139,111,212,0.1); }
  textarea.di::placeholder { color:var(--muted); font-style:italic; }
  .voice-row { display:flex; align-items:center; gap:10px; margin-top:11px; }
  .vbtn { display:flex; align-items:center; gap:7px; padding:9px 18px; border-radius:30px; border:1px solid var(--border);
    background:rgba(0,0,0,0.2); color:var(--muted); font-family:'DM Sans',sans-serif; font-size:0.82rem; cursor:pointer; transition:all 0.25s; }
  .vbtn.rec { border-color:rgba(239,68,68,0.5); background:rgba(239,68,68,0.1); color:#fca5a5; animation:rpulse 1s ease-in-out infinite; }
  @keyframes rpulse { 0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,0.3)} 50%{box-shadow:0 0 0 8px rgba(239,68,68,0)} }
  .vbtn:hover:not(.rec) { border-color:rgba(139,111,212,0.4); color:var(--text); }
  .rdot { width:7px; height:7px; border-radius:50%; background:#ef4444; }
  .mood-row { display:flex; gap:7px; flex-wrap:wrap; margin:13px 0; }
  .mb { padding:6px 13px; border-radius:30px; border:1px solid var(--border); background:transparent;
    color:var(--muted); font-size:0.82rem; cursor:pointer; transition:all 0.2s; font-family:'DM Sans',sans-serif; }
  .mb.on { border-color:var(--violet); background:var(--violet-soft); color:var(--star); }
  .mb:hover:not(.on) { border-color:rgba(139,111,212,0.4); color:var(--text); }
  .act-row { display:flex; gap:9px; margin-top:13px; }
  .sbtn { flex:1; padding:13px; border:none; border-radius:13px; background:linear-gradient(135deg,#5a3fa0,#3d2680);
    color:var(--star); font-family:'Cinzel',serif; font-size:0.86rem; letter-spacing:0.1em; cursor:pointer; transition:all 0.3s; }
  .sbtn:hover:not(:disabled) { background:linear-gradient(135deg,#6b4db8,#4a2f99); box-shadow:0 4px 22px rgba(90,63,160,0.5); transform:translateY(-1px); }
  .sbtn:disabled { opacity:0.45; cursor:not-allowed; transform:none; }
  .ibtn { padding:13px 17px; border:1px solid var(--border); border-radius:13px; background:rgba(0,0,0,0.2);
    color:var(--muted); font-family:'DM Sans',sans-serif; font-size:0.82rem; cursor:pointer; transition:all 0.25s; white-space:nowrap; }
  .ibtn:hover:not(:disabled) { border-color:rgba(201,168,76,0.4); color:var(--gold); background:rgba(201,168,76,0.06); }
  .ibtn:disabled { opacity:0.4; cursor:not-allowed; }
  .pay-wall { text-align:center; padding:30px 20px; }
  .pay-title { font-family:'Cinzel',serif; font-size:1.1rem; color:var(--gold); margin-bottom:10px; letter-spacing:0.1em; }
  .pay-sub { font-family:'Cormorant Garamond',serif; font-style:italic; font-size:1rem; color:var(--muted); margin-bottom:20px; }
  .pay-btn { display:inline-flex; align-items:center; gap:8px; padding:14px 28px; border-radius:30px;
    border:1px solid rgba(201,168,76,0.5); background:linear-gradient(135deg,rgba(201,168,76,0.15),rgba(139,111,212,0.15));
    color:var(--gold); font-family:'Cinzel',serif; font-size:0.85rem; letter-spacing:0.1em; cursor:pointer; transition:all 0.3s; }
  .pay-btn:hover { background:linear-gradient(135deg,rgba(201,168,76,0.25),rgba(139,111,212,0.25)); box-shadow:0 0 24px rgba(201,168,76,0.2); }
  .pay-btn:disabled { opacity:0.5; cursor:not-allowed; }
  .lorb { display:flex; align-items:center; justify-content:center; gap:10px; padding:20px; color:var(--muted); font-family:'Cormorant Garamond',serif; font-style:italic; }
  .orb { width:7px; height:7px; border-radius:50%; background:var(--violet); animation:op 1.4s ease-in-out infinite; }
  .orb:nth-child(2){animation-delay:.2s;background:var(--gold)} .orb:nth-child(3){animation-delay:.4s}
  @keyframes op { 0%,100%{opacity:.3;transform:scale(.8)} 50%{opacity:1;transform:scale(1.2)} }
  .abox { animation:fu .5s ease; }
  @keyframes fu { from{opacity:0;transform:translateY(11px)} to{opacity:1;transform:translateY(0)} }
  .trow { display:flex; flex-wrap:wrap; gap:7px; margin:11px 0; }
  .tag { padding:5px 12px; border-radius:20px; font-size:0.78rem; font-family:'DM Sans',sans-serif; }
  .te { background:rgba(201,168,76,0.12); border:1px solid rgba(201,168,76,0.3); color:#e8d5a3; }
  .ts { background:rgba(139,111,212,0.15); border:1px solid rgba(139,111,212,0.35); color:#c5b8f0; }
  .tt { background:rgba(80,160,180,0.12); border:1px solid rgba(80,160,180,0.3); color:#a8dce8; }
  .insight { font-family:'Cormorant Garamond',serif; font-size:1.04rem; line-height:1.75; color:#c8bfe8; border-left:2px solid var(--violet); padding-left:15px; margin:13px 0; font-style:italic; }
  .pbox { background:linear-gradient(135deg,rgba(201,168,76,0.07),rgba(139,111,212,0.07)); border:1px solid rgba(201,168,76,0.2); border-radius:11px; padding:14px 16px; margin-top:11px; }
  .plabel { font-family:'Cinzel',serif; font-size:0.67rem; letter-spacing:0.13em; color:var(--gold); margin-bottom:7px; }
  .ptext { font-family:'Cormorant Garamond',serif; font-size:0.98rem; line-height:1.6; color:var(--text); }
  .imgwrap { margin-top:14px; border-radius:15px; overflow:hidden; border:1px solid var(--border); background:rgba(0,0,0,0.4); min-height:180px; display:flex; align-items:center; justify-content:center; position:relative; }
  .imgwrap img { width:100%; display:block; }
  .imgload { color:var(--muted); font-family:'Cormorant Garamond',serif; font-style:italic; padding:40px; text-align:center; }
  .imgcap { position:absolute; bottom:0; left:0; right:0; background:linear-gradient(transparent,rgba(3,2,10,0.85)); padding:14px; font-family:'Cormorant Garamond',serif; font-style:italic; font-size:0.85rem; color:var(--muted); }
  .mintbtn { display:flex; align-items:center; justify-content:center; gap:8px; width:100%; padding:10px; margin-top:11px;
    border-radius:30px; border:1px solid rgba(201,168,76,0.4); background:rgba(201,168,76,0.08); color:var(--gold);
    font-family:'Cinzel',serif; font-size:0.74rem; letter-spacing:0.1em; cursor:pointer; transition:all 0.25s; }
  .mintbtn:hover:not(:disabled) { background:rgba(201,168,76,0.15); box-shadow:0 0 18px rgba(201,168,76,0.2); }
  .mintbtn:disabled { opacity:0.4; cursor:not-allowed; }
  .de { border-bottom:1px solid var(--border); padding:16px 0; animation:fu .4s ease; }
  .de:last-child { border-bottom:none; }
  .ddate { font-family:'Cinzel',serif; font-size:0.67rem; letter-spacing:0.11em; color:var(--gold); margin-bottom:7px; }
  .dtxt { font-family:'Cormorant Garamond',serif; font-size:0.99rem; line-height:1.65; color:var(--muted); margin-bottom:8px; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
  .eimg { width:100%; border-radius:10px; margin-top:9px; border:1px solid var(--border); }
  .srow { display:flex; gap:11px; margin-bottom:15px; }
  .sb { flex:1; background:rgba(0,0,0,0.2); border:1px solid var(--border); border-radius:12px; padding:14px; text-align:center; }
  .sn { font-family:'Cinzel',serif; font-size:1.8rem; color:var(--gold); display:block; }
  .sl { font-size:0.69rem; color:var(--muted); letter-spacing:0.06em; margin-top:2px; }
  .hgrid { display:grid; grid-template-columns:repeat(7,1fr); gap:5px; margin-top:11px; }
  .hc { aspect-ratio:1; border-radius:4px; transition:transform 0.2s; cursor:pointer; }
  .hc:hover { transform:scale(1.35); z-index:2; }
  .dl { font-size:0.59rem; color:var(--muted); text-align:center; padding-bottom:3px; }
  .sgrid { display:grid; grid-template-columns:repeat(2,1fr); gap:8px; }
  .si { display:flex; align-items:center; gap:8px; padding:8px 12px; background:rgba(139,111,212,0.07); border-radius:9px; border:1px solid var(--border); }
  .empty { text-align:center; padding:48px 20px; color:var(--muted); font-family:'Cormorant Garamond',serif; font-style:italic; }
  .toast { position:fixed; bottom:22px; left:50%; transform:translateX(-50%); background:var(--panel); border:1px solid rgba(201,168,76,0.3); color:var(--gold); padding:11px 22px; border-radius:30px; font-family:'Cinzel',serif; font-size:0.76rem; letter-spacing:0.1em; z-index:100; animation:fu .3s ease; box-shadow:0 4px 22px rgba(0,0,0,0.5); white-space:nowrap; }
  ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:var(--void)} ::-webkit-scrollbar-thumb{background:var(--violet);border-radius:2px}
`;

const FREE_LIMIT = 3;
const SOL_PRICE = 0.01;
const OWNER_WALLET = "LoVe1eAdXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"; // Replace with your full wallet address
const MOODS = ["✨ Vivid","😨 Fearful","💜 Peaceful","🌀 Bizarre","💔 Sad","🔥 Intense","🌿 Serene"];
const DAYS = ["S","M","T","W","T","F","S"];
const SYMBOLS = [{e:"🌊",n:"Water",c:4},{e:"🏠",n:"House",c:3},{e:"🌑",n:"Darkness",c:3},{e:"✈️",n:"Flying",c:2},{e:"🪞",n:"Mirror",c:2},{e:"🗝️",n:"Key",c:1}];
const heatmap = Array.from({length:28},()=>({i:Math.random(),h:Math.random()>0.35}));

export default function App() {
  const [tab, setTab] = useState("log");
  const [dream, setDream] = useState("");
  const [mood, setMood] = useState("");
  const [loading, setLoading] = useState(false);
  const [paying, setPaying] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [imgPrompt, setImgPrompt] = useState("");
  const [rec, setRec] = useState(false);
  const [wallet, setWallet] = useState(null);
  const [toast, setToast] = useState("");
  const [minting, setMinting] = useState(false);
  const [freeLeft, setFreeLeft] = useState(() => {
    const saved = localStorage.getItem("dreamFreeLeft");
    return saved !== null ? parseInt(saved) : FREE_LIMIT;
  });
  const [dreams, setDreams] = useState([
    {id:1,date:"April 16, 2026",text:"Standing in a vast ocean made of black glass. Figures moved beneath the surface reaching upward. A golden door appeared on the horizon.",mood:"😨 Fearful",emotions:["Anxiety","Wonder","Loss"],symbols:["Water","Door","Figures"],themes:["Pursuit","Transformation"],img:null},
    {id:2,date:"April 14, 2026",text:"Flying above a city made entirely of mirrors. Each reflection showed a different version of me living different lives.",mood:"✨ Vivid",emotions:["Freedom","Curiosity","Duality"],symbols:["Mirror","Flying","City"],themes:["Identity","Infinity"],img:null},
  ]);
  const recRef = useRef(null);

  const toast2 = (m) => { setToast(m); setTimeout(()=>setToast(""),3500); };

  function toggleRec() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { toast2("Voice not supported here"); return; }
    if (rec) { recRef.current?.stop(); setRec(false); return; }
    const r = new SR(); r.continuous=true; r.interimResults=true; r.lang="en-US";
    let final = dream;
    r.onresult = e => {
      let interim="";
      for (let i=e.resultIndex;i<e.results.length;i++) {
        if (e.results[i].isFinal) final += e.results[i][0].transcript+" ";
        else interim = e.results[i][0].transcript;
      }
      setDream(final+interim);
    };
    r.onerror = () => setRec(false);
    r.onend = () => setRec(false);
    recRef.current = r; r.start(); setRec(true);
  }

  async function connectWallet() {
    const p = window?.solana;
    if (!p?.isPhantom) { toast2("Open in Phantom browser to connect"); return; }
    try {
      const res = await p.connect();
      setWallet(res.publicKey.toString());
      toast2("✦ Wallet connected");
    } catch { toast2("Connection cancelled"); }
  }

  async function payWithSOL() {
    if (!wallet) { toast2("Connect Phantom wallet first!"); return; }
    const p = window?.solana;
    if (!p?.isPhantom) { toast2("Open in Phantom browser"); return; }
    setPaying(true);
    try {
      const { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } = await import("@solana/web3.js");
      const connection = new Connection("https://api.mainnet-beta.solana.com");
      const fromPubkey = new PublicKey(wallet);
      const toPubkey = new PublicKey(OWNER_WALLET);
      const lamports = Math.round(SOL_PRICE * LAMPORTS_PER_SOL);
      const { blockhash } = await connection.getLatestBlockhash();
      const tx = new Transaction().add(
        SystemProgram.transfer({ fromPubkey, toPubkey, lamports })
      );
      tx.recentBlockhash = blockhash;
      tx.feePayer = fromPubkey;
      const signed = await p.signAndSendTransaction(tx);
      toast2(`✦ Payment sent! ${signed.signature.slice(0,8)}...`);
      // Give 10 more interpretations after payment
      const newLimit = freeLeft + 10;
      setFreeLeft(newLimit);
      localStorage.setItem("dreamFreeLeft", newLimit);
    } catch(e) {
      toast2("Payment failed: " + (e.message || "Unknown error"));
    }
    setPaying(false);
  }

  async function analyze() {
    if (!dream.trim()) return;
    if (rec) { recRef.current?.stop(); setRec(false); }

    // Check free limit
    if (freeLeft <= 0) {
      toast2("No free interpretations left — pay 0.01 SOL to continue!");
      return;
    }

    setLoading(true); setAnalysis(null); setImgSrc(null);
    try {
      const res = await fetch("/.netlify/functions/analyze", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({dream, mood})
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const p = await res.json();
      setAnalysis(p);
      if (p.imagePrompt) setImgPrompt(p.imagePrompt);
      // Deduct free use
      const newLeft = freeLeft - 1;
      setFreeLeft(newLeft);
      localStorage.setItem("dreamFreeLeft", newLeft);
      const date = new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"});
      setDreams(prev=>[{id:Date.now(),date,text:dream,mood,emotions:p.emotions||[],symbols:p.symbols||[],themes:p.themes||[],img:null},...prev]);
    } catch(e) {
      toast2("Interpretation failed. Please try again.");
    }
    setLoading(false);
  }

  async function genImage() {
    if (!dream.trim()) return;
    setImgLoading(true);
    const prompt = imgPrompt || `Dark surrealist dreamscape: ${dream.slice(0,100)}. Oil painting, ethereal.`;
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt+", cinematic, 4k, dark surrealism")}?width=800&height=480&nologo=true&seed=${Date.now()}`;
    setImgSrc(url);
    setDreams(prev=>prev.map((d,i)=>i===0?{...d,img:url}:d));
    setImgLoading(false);
  }

  async function mint() {
    if (!wallet) { toast2("Connect Phantom first"); return; }
    setMinting(true);
    await new Promise(r=>setTimeout(r,1800));
    setMinting(false);
    toast2("◈ Dream minted on Solana!");
  }

  const short = a => a?`${a.slice(0,4)}…${a.slice(-4)}`:"";
  const needsPayment = freeLeft <= 0;

  return (
    <>
      <style>{STYLES}</style>
      <div className="cosmos"/><div className="stars"/>
      <div className="app">
        <header className="header">
          <span className="moon">🌙</span>
          <div className="logo">Dream Ledger</div>
          <div className="tagline">Your subconscious, decoded & owned on Solana</div>
        </header>

        <div className="wallet-bar">
          <div className="free-badge">
            {freeLeft > 0 ? `✦ ${freeLeft} free left` : "✦ 0 free — pay to unlock"}
          </div>
          {wallet
            ? <><span style={{fontSize:"0.74rem",color:"var(--muted)"}}>🔮 {short(wallet)}</span>
                <button className="w-btn on" onClick={()=>{window?.solana?.disconnect?.();setWallet(null);toast2("Disconnected")}}>
                  <div className="dot"/> Connected</button></>
            : <button className="w-btn" onClick={connectWallet}>👻 Connect Phantom</button>}
        </div>

        <nav className="nav">
          {[{id:"log",i:"✦",l:"Log Dream"},{id:"journal",i:"◈",l:"Journal"},{id:"patterns",i:"◉",l:"Patterns"}].map(t=>(
            <button key={t.id} className={`nb ${tab===t.id?"on":""}`} onClick={()=>setTab(t.id)}><span>{t.i}</span>{t.l}</button>
          ))}
        </nav>

        {tab==="log" && <>
          <div className="card">
            <div className="stitle">Describe Your Dream</div>
            <textarea className="di" placeholder="Let the images flow… what did you see, feel, sense?" value={dream} onChange={e=>setDream(e.target.value)}/>
            <div className="voice-row">
              <button className={`vbtn ${rec?"rec":""}`} onClick={toggleRec}>
                {rec?<><div className="rdot"/>Stop</>:<>🎙️ Speak Dream</>}
              </button>
              {rec&&<span style={{fontSize:"0.77rem",color:"#fca5a5",fontStyle:"italic",fontFamily:"Cormorant Garamond"}}>Listening…</span>}
            </div>
            <div style={{marginTop:13,marginBottom:4,fontSize:"0.73rem",color:"var(--muted)",letterSpacing:"0.08em"}}>WAKING MOOD</div>
            <div className="mood-row">
              {MOODS.map(m=><button key={m} className={`mb ${mood===m?"on":""}`} onClick={()=>setMood(m===mood?"":m)}>{m}</button>)}
            </div>
            <div className="act-row">
              <button className="sbtn" onClick={analyze} disabled={loading||!dream.trim()||needsPayment}>
                {loading?"Interpreting…":"✦ Interpret Dream"}
              </button>
              <button className="ibtn" onClick={genImage} disabled={imgLoading||!dream.trim()}>{imgLoading?"🎨…":"🎨 Visualize"}</button>
            </div>
          </div>

          {needsPayment && (
            <div className="card abox">
              <div className="pay-wall">
                <div className="pay-title">✦ Free Interpretations Used</div>
                <div className="pay-sub">You've used your {FREE_LIMIT} free dream interpretations.<br/>Unlock 10 more for just 0.01 SOL.</div>
                {!wallet && <div style={{marginBottom:14,fontSize:"0.85rem",color:"var(--muted)"}}>Connect your Phantom wallet first</div>}
                <button className="pay-btn" onClick={wallet ? payWithSOL : connectWallet} disabled={paying}>
                  {paying ? "Processing…" : wallet ? "◈ Pay 0.01 SOL — Unlock 10 Dreams" : "👻 Connect Phantom to Pay"}
                </button>
              </div>
            </div>
          )}

          {loading&&<div className="card"><div className="lorb"><div className="orb"/><div className="orb"/><div className="orb"/><span>The veil between worlds is thin…</span></div></div>}

          {(imgLoading||imgSrc)&&<div className="card abox">
            <div className="stitle">Dream Visualization</div>
            <div className="imgwrap">
              {imgLoading?<div className="imgload">🎨 Painting your dream…</div>
              :imgSrc?<><img src={imgSrc} alt="Dream" onError={()=>setImgSrc(null)}/><div className="imgcap">{imgPrompt||"Your dream, visualized"}</div></>:null}
            </div>
            {imgSrc&&<button className="mintbtn" onClick={mint} disabled={minting||!wallet}>
              {minting?"Minting…":wallet?"◈ Mint Dream as NFT on Solana":"👻 Connect wallet to mint"}
            </button>}
          </div>}

          {analysis&&<div className="card abox">
            <div className="stitle">Interpretation</div>
            <div style={{fontSize:"0.72rem",color:"var(--gold)",letterSpacing:"0.1em",marginBottom:6}}>EMOTIONS</div>
            <div className="trow">{analysis.emotions?.map(e=><span key={e} className="tag te">{e}</span>)}</div>
            <div style={{marginTop:11,fontSize:"0.72rem",color:"var(--violet)",letterSpacing:"0.1em",marginBottom:6}}>SYMBOLS</div>
            <div className="trow">{analysis.symbols?.map(s=><span key={s} className="tag ts">{s}</span>)}</div>
            <div style={{marginTop:11,fontSize:"0.72rem",color:"#a8dce8",letterSpacing:"0.1em",marginBottom:6}}>THEMES</div>
            <div className="trow">{analysis.themes?.map(t=><span key={t} className="tag tt">{t}</span>)}</div>
            {analysis.insight&&<div className="insight">{analysis.insight}</div>}
            {analysis.prediction&&<div className="pbox"><div className="plabel">✦ SUBCONSCIOUS SIGNAL</div><div className="ptext">{analysis.prediction}</div></div>}
          </div>}
        </>}

        {tab==="journal"&&<div className="card">
          <div className="stitle">Dream Journal</div>
          {dreams.length===0?<div className="empty">No dreams yet. The void awaits.</div>
          :dreams.map(d=><div key={d.id} className="de">
            <div className="ddate">{d.date}{d.mood?` · ${d.mood}`:""}</div>
            <div className="dtxt">{d.text}</div>
            <div className="trow">
              {d.emotions?.slice(0,2).map(e=><span key={e} className="tag te">{e}</span>)}
              {d.symbols?.slice(0,2).map(s=><span key={s} className="tag ts">{s}</span>)}
              {d.themes?.slice(0,1).map(t=><span key={t} className="tag tt">{t}</span>)}
            </div>
            {d.img&&<img className="eimg" src={d.img} alt="Dream"/>}
          </div>)}
        </div>}

        {tab==="patterns"&&<div>
          <div className="srow">
            <div className="sb"><span className="sn">{dreams.length}</span><div className="sl">Dreams Logged</div></div>
            <div className="sb"><span className="sn">{SYMBOLS.length}</span><div className="sl">Symbols Found</div></div>
            <div className="sb"><span className="sn">{wallet?"◈":"–"}</span><div className="sl">{wallet?"Solana Linked":"Not Linked"}</div></div>
          </div>
          <div className="card">
            <div className="stitle">28-Day Heatmap</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:"2px",marginBottom:4}}>
              {DAYS.map((d,i)=><div key={i} className="dl">{d}</div>)}
            </div>
            <div className="hgrid">
              {heatmap.map((c,i)=><div key={i} className="hc"
                style={{background:c.h?`rgba(139,111,212,${0.15+c.i*0.7})`:"rgba(255,255,255,0.04)",border:`1px solid rgba(139,111,212,${c.h?0.3:0.08})`}}/>)}
            </div>
          </div>
          <div className="card">
            <div className="stitle">Recurring Symbols</div>
            <div className="sgrid">{SYMBOLS.map(s=><div key={s.n} className="si">
              <span style={{fontSize:"1.25rem"}}>{s.e}</span>
              <div><div style={{fontSize:"0.82rem",color:"var(--text)"}}>{s.n}</div><div style={{fontSize:"0.71rem",color:"var(--muted)"}}>×{s.c}</div></div>
            </div>)}</div>
          </div>
          <div className="card">
            <div className="stitle">Revenue</div>
            <div style={{textAlign:"center",padding:"20px"}}>
              <div style={{fontFamily:"Cinzel,serif",fontSize:"2rem",color:"var(--gold)"}}>◈</div>
              <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:"1rem",color:"var(--muted)",marginTop:8,fontStyle:"italic"}}>
                SOL payments go directly to your Phantom wallet
              </div>
            </div>
          </div>
        </div>}
      </div>
      {toast&&<div className="toast">{toast}</div>}
    </>
  );
}
