import { useState, useEffect, useRef } from "react";

// ── AI CALL ──────────────────────────────────────────────────────────────────
const callAI = async (prompt, system) => {
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 600,
        system: system || "You are a marketing AI for WorldShop Africa — an African marketplace. Write compelling, culturally relevant ad copy. Be concise and impactful.",
        messages: [{ role: "user", content: prompt }]
      })
    });
    const data = await res.json();
    return data.content?.[0]?.text || "Try again.";
  } catch { return "Connection error. Please try again."; }
};

// ── DATA ─────────────────────────────────────────────────────────────────────
const PLATFORMS = [
  { id: "facebook", name: "Facebook", icon: "📘", color: "#1877F2", reach: "50K", cpc: "$0.08", connected: false, budget: 5 },
  { id: "instagram", name: "Instagram", icon: "📸", color: "#E1306C", reach: "30K", cpc: "$0.12", connected: false, budget: 5 },
  { id: "tiktok", name: "TikTok", icon: "🎵", color: "#010101", reach: "80K", cpc: "$0.05", connected: false, budget: 5 },
  { id: "whatsapp", name: "WhatsApp", icon: "💬", color: "#25D366", reach: "10K", cpc: "FREE", connected: true, budget: 0 },
  { id: "google", name: "Google Ads", icon: "🔍", color: "#EA4335", reach: "20K", cpc: "$0.15", connected: false, budget: 3 },
  { id: "email", name: "Email", icon: "💌", color: "#6B7280", reach: "5K", cpc: "FREE", connected: true, budget: 0 },
  { id: "twitter", name: "Twitter/X", icon: "🐦", color: "#000000", reach: "15K", cpc: "$0.10", connected: false, budget: 2 },
  { id: "youtube", name: "YouTube", icon: "▶️", color: "#FF0000", reach: "40K", cpc: "$0.02", connected: false, budget: 3 },
];

const LANGUAGES = ["English", "Swahili", "French", "Hausa", "Yoruba", "Arabic", "Portuguese", "Amharic"];
const PRODUCTS = ["WorldShop General", "Solar Panels ☀️", "Fresh Food 🌽", "Electronics 📱", "Fashion 👗", "Health Products 💊", "Farm Tools 🔧", "Water Filters 💧"];
const TONES = ["Exciting & Urgent", "Friendly & Warm", "Professional", "Funny & Casual", "Inspirational", "Community-focused"];
const COUNTRIES = ["Nigeria 🇳🇬", "Kenya 🇰🇪", "Ghana 🇬🇭", "South Africa 🇿🇦", "Tanzania 🇹🇿", "Uganda 🇺🇬", "Ethiopia 🇪🇹", "All Africa 🌍"];

const CAMPAIGNS = [
  { id: 1, name: "Launch Week", status: "active", platform: "Facebook", budget: 50, spent: 23, reach: 12400, clicks: 248, conversions: 12, startDate: "May 10" },
  { id: 2, name: "Solar Panel Deal", status: "active", platform: "Instagram", budget: 30, spent: 18, reach: 8900, clicks: 178, conversions: 8, startDate: "May 12" },
  { id: 3, name: "WhatsApp Blast", status: "completed", platform: "WhatsApp", budget: 0, spent: 0, reach: 3200, clicks: 420, conversions: 35, startDate: "May 11" },
  { id: 4, name: "Fashion Friday", status: "scheduled", platform: "TikTok", budget: 25, spent: 0, reach: 0, clicks: 0, conversions: 0, startDate: "May 16" },
];

const SCHEDULE = {
  Mon: [{ platform: "Facebook", time: "8:00 AM", content: "Launch post", status: "posted" }, { platform: "WhatsApp", time: "9:00 AM", content: "Morning blast", status: "posted" }],
  Tue: [{ platform: "Instagram", time: "12:00 PM", content: "Solar deal", status: "posted" }, { platform: "Email", time: "9:00 AM", content: "Newsletter", status: "posted" }],
  Wed: [{ platform: "Facebook", time: "8:00 AM", content: "Fresh food post", status: "posted" }, { platform: "TikTok", time: "6:00 PM", content: "Farm video", status: "posted" }],
  Thu: [{ platform: "Twitter/X", time: "12:00 PM", content: "Tech deals", status: "posted" }, { platform: "Instagram", time: "2:00 PM", content: "Electronics", status: "posted" }],
  Fri: [{ platform: "Facebook", time: "8:00 AM", content: "Fashion Friday", status: "scheduled" }, { platform: "TikTok", time: "6:00 PM", content: "Ankara video", status: "scheduled" }],
  Sat: [{ platform: "WhatsApp", time: "10:00 AM", content: "Weekend sale", status: "scheduled" }, { platform: "Instagram", time: "11:00 AM", content: "Sale graphic", status: "scheduled" }],
  Sun: [{ platform: "Facebook", time: "11:00 AM", content: "Inspiration", status: "scheduled" }, { platform: "Email", time: "8:00 AM", content: "Weekly recap", status: "scheduled" }],
};

// ── MAIN APP ─────────────────────────────────────────────────────────────────
export default function WorldShopMarketing() {
  const [page, setPage] = useState("dashboard");
  const [platforms, setPlatforms] = useState(PLATFORMS);
  const [campaigns, setCampaigns] = useState(CAMPAIGNS);
  const [notif, setNotif] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [generatedAd, setGeneratedAd] = useState("");
  const [adPlatform, setAdPlatform] = useState("Facebook");
  const [adLang, setAdLang] = useState("English");
  const [adProduct, setAdProduct] = useState("WorldShop General");
  const [adTone, setAdTone] = useState("Exciting & Urgent");
  const [adCountry, setAdCountry] = useState("All Africa 🌍");
  const [schedule, setSchedule] = useState(SCHEDULE);
  const [newPost, setNewPost] = useState({ platform: "Facebook", time: "09:00", content: "", day: "Mon" });
  const [totalReach, setTotalReach] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);
  const [budget, setBudget] = useState({ facebook: 5, instagram: 5, tiktok: 5, google: 3, twitter: 2, youtube: 3 });
  const [liveStats, setLiveStats] = useState({ reach: 24500, clicks: 846, conversions: 55, revenue: 1240, impressions: 98200 });
  const [copied, setCopied] = useState(false);
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [newCampaign, setNewCampaign] = useState({ name: "", platform: "Facebook", budget: "" });

  // Simulate live stats
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(s => ({
        reach: s.reach + Math.floor(Math.random() * 50),
        clicks: s.clicks + Math.floor(Math.random() * 5),
        conversions: s.conversions + (Math.random() > 0.7 ? 1 : 0),
        revenue: s.revenue + Math.floor(Math.random() * 15),
        impressions: s.impressions + Math.floor(Math.random() * 200),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const connected = platforms.filter(p => p.connected);
    setTotalReach(connected.reduce((s, p) => s + parseInt(p.reach.replace("K", "")) * 1000, 0));
    setTotalSpend(connected.reduce((s, p) => s + (p.budget || 0), 0));
  }, [platforms]);

  const notify = (msg) => { setNotif(msg); setTimeout(() => setNotif(""), 3000); };

  const togglePlatform = (id) => {
    setPlatforms(ps => ps.map(p => p.id === id ? { ...p, connected: !p.connected } : p));
    const p = platforms.find(x => x.id === id);
    notify(p.connected ? `❌ ${p.name} disconnected` : `✅ ${p.name} connected!`);
  };

  const generateAd = async () => {
    setAiLoading(true); setGeneratedAd("");
    const prompt = `Write a ${adTone.toLowerCase()} ${adPlatform} ad for WorldShop Africa targeting ${adCountry.replace(/[🇳🇬🇰🇪🇬🇭🇿🇦🇹🇿🇺🇬🇪🇹🌍]/u, "").trim()} shoppers in ${adLang} for: ${adProduct}.

Include:
- Attention-grabbing opening line
- 3-4 key benefits with emojis
- Clear call to action
- Link: worldshop-africa.netlify.app
${adPlatform === "Instagram" || adPlatform === "TikTok" ? "- 10 relevant hashtags" : ""}
${adPlatform === "WhatsApp" ? "- Keep it short and personal" : ""}
${adPlatform === "Google Ads" ? "- Format as: Headline 1, Headline 2, Description" : ""}

Make it culturally relevant and compelling for African audiences.`;
    const r = await callAI(prompt);
    setGeneratedAd(r);
    setAiLoading(false);
  };

  const copyAd = () => {
    navigator.clipboard.writeText(generatedAd).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000);
      notify("📋 Copied to clipboard!");
    });
  };

  const addCampaign = () => {
    if (!newCampaign.name || !newCampaign.budget) return;
    const c = { id: Date.now(), name: newCampaign.name, status: "scheduled", platform: newCampaign.platform, budget: parseFloat(newCampaign.budget), spent: 0, reach: 0, clicks: 0, conversions: 0, startDate: "Today" };
    setCampaigns(prev => [c, ...prev]);
    setNewCampaign({ name: "", platform: "Facebook", budget: "" });
    setShowNewCampaign(false);
    notify("🚀 Campaign created!");
  };

  const addPost = () => {
    if (!newPost.content) return;
    setSchedule(s => ({ ...s, [newPost.day]: [...(s[newPost.day] || []), { platform: newPost.platform, time: newPost.time, content: newPost.content, status: "scheduled" }] }));
    setNewPost({ platform: "Facebook", time: "09:00", content: "", day: "Mon" });
    notify("📅 Post scheduled!");
  };

  // ── STYLES ──────────────────────────────────────────────────────────────────
  const C = { bg: "#080e06", card: "rgba(255,255,255,0.04)", border: "rgba(34,197,94,0.15)", accent: "#22c55e", gold: "#f59e0b", red: "#ef4444", text: "#f0fdf4", dim: "rgba(240,253,244,0.5)" };
  const card = { background: C.card, borderRadius: "16px", border: `1px solid ${C.border}`, padding: "16px" };
  const inp = { background: "rgba(255,255,255,0.06)", border: `1px solid ${C.border}`, borderRadius: "9px", padding: "9px 12px", color: C.text, fontSize: "0.82rem", fontFamily: "inherit", width: "100%" };
  const sel = { ...inp, cursor: "pointer" };

  const navItems = [
    ["dashboard", "📊", "Dashboard"],
    ["platforms", "🔌", "Platforms"],
    ["campaigns", "🎯", "Campaigns"],
    ["generate", "🤖", "AI Generator"],
    ["schedule", "📅", "Schedule"],
    ["analytics", "📈", "Analytics"],
  ];

  const platformColors = { Facebook: "#1877F2", Instagram: "#E1306C", TikTok: "#010101", WhatsApp: "#25D366", "Google Ads": "#EA4335", Email: "#6B7280", "Twitter/X": "#000000", YouTube: "#FF0000" };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Plus Jakarta Sans',-apple-system,sans-serif", color: C.text, display: "flex" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;height:4px;} ::-webkit-scrollbar-thumb{background:#22c55e;border-radius:2px;}
        input,select,button,textarea{font-family:inherit;}
        input::placeholder,textarea::placeholder{color:rgba(240,253,244,0.25);}
        input:focus,select:focus,textarea:focus{outline:2px solid rgba(34,197,94,0.4)!important;}
        .b{transition:all 0.15s;cursor:pointer;-webkit-tap-highlight-color:transparent;}
        .b:hover{opacity:0.82;} .b:active{transform:scale(0.96);}
        .nb{transition:all 0.15s;cursor:pointer;} .nb:hover{background:rgba(34,197,94,0.08)!important;color:#22c55e!important;}
        @keyframes fu{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);}}
        @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.3;}}
        @keyframes nt{0%{transform:translateX(-50%) translateY(-60px);opacity:0;}15%,85%{transform:translateX(-50%) translateY(0);opacity:1;}100%{transform:translateX(-50%) translateY(-60px);opacity:0;}}
        @keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}
        .fd{animation:fu 0.3s ease forwards;}
        .live-dot{width:7px;height:7px;border-radius:50%;background:#22c55e;animation:blink 1.5s ease-in-out infinite;}
        .pl{animation:pulse 1.4s ease-in-out infinite;}
        .nt-anim{animation:nt 3s ease forwards;}
        @media(max-width:700px){.sidebar{display:none!important;} .main-content{margin-left:0!important;}}
      `}</style>

      {/* Notification */}
      {notif && <div className="nt-anim" style={{ position: "fixed", top: "16px", left: "50%", zIndex: 999, background: C.accent, color: "#052e16", padding: "9px 20px", borderRadius: "20px", fontWeight: 700, fontSize: "0.82rem", whiteSpace: "nowrap", pointerEvents: "none" }}>{notif}</div>}

      {/* BG decoration */}
      <div style={{ position: "fixed", top: "-100px", right: "-100px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle,rgba(34,197,94,0.05),transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "5%", left: "-80px", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle,rgba(245,158,11,0.03),transparent 70%)", pointerEvents: "none" }} />

      {/* ── SIDEBAR ── */}
      <div className="sidebar" style={{ width: "200px", background: "rgba(255,255,255,0.02)", borderRight: `1px solid ${C.border}`, position: "fixed", top: 0, left: 0, bottom: 0, display: "flex", flexDirection: "column", padding: "20px 12px", zIndex: 100 }}>
        <div style={{ marginBottom: "24px", padding: "0 4px" }}>
          <div style={{ fontWeight: 900, fontSize: "1rem", color: C.accent }}>🛒 WorldShop</div>
          <div style={{ fontSize: "0.6rem", color: C.dim, letterSpacing: "1.5px" }}>MARKETING HUB</div>
        </div>
        {navItems.map(([id, icon, label]) => (
          <button key={id} className="nb" onClick={() => setPage(id)} style={{ background: page === id ? "rgba(34,197,94,0.1)" : "transparent", border: "none", borderRadius: "10px", padding: "9px 12px", color: page === id ? C.accent : C.dim, fontSize: "0.8rem", fontWeight: page === id ? 700 : 400, display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px", textAlign: "left", width: "100%" }}>
            <span>{icon}</span><span>{label}</span>
          </button>
        ))}

        {/* Connected platforms indicator */}
        <div style={{ marginTop: "auto", padding: "12px", background: "rgba(34,197,94,0.06)", borderRadius: "10px", border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: "0.65rem", color: C.dim, marginBottom: "6px" }}>ACTIVE PLATFORMS</div>
          {platforms.filter(p => p.connected).map(p => (
            <div key={p.id} style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "3px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: C.accent }} />
              <span style={{ fontSize: "0.7rem", color: C.text }}>{p.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="main-content" style={{ marginLeft: "200px", flex: 1, padding: "20px", overflowY: "auto", minHeight: "100vh" }}>

        {/* ── DASHBOARD ── */}
        {page === "dashboard" && <div className="fd">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <h1 style={{ fontWeight: 900, fontSize: "1.4rem", color: C.text }}>Marketing Dashboard</h1>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.75rem", color: C.dim }}>
                <div className="live-dot" /> Live data — WorldShop Africa
              </div>
            </div>
            <button className="b" onClick={() => setPage("generate")} style={{ background: C.accent, border: "none", borderRadius: "10px", padding: "9px 16px", color: "#052e16", fontWeight: 800, fontSize: "0.82rem" }}>🤖 Generate Ad</button>
          </div>

          {/* Live stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "10px", marginBottom: "20px" }}>
            {[
              ["👁️", liveStats.impressions.toLocaleString(), "Impressions"],
              ["🌍", liveStats.reach.toLocaleString(), "Reach"],
              ["👆", liveStats.clicks.toLocaleString(), "Clicks"],
              ["✅", liveStats.conversions, "Conversions"],
              ["💰", "$" + liveStats.revenue.toLocaleString(), "Revenue"],
            ].map(([icon, val, label]) => (
              <div key={label} style={{ ...card, textAlign: "center" }}>
                <div style={{ fontSize: "1.2rem", marginBottom: "4px" }}>{icon}</div>
                <div style={{ fontWeight: 900, fontSize: "1.1rem", color: C.accent, marginBottom: "2px" }}>{val}</div>
                <div style={{ fontSize: "0.62rem", color: C.dim }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
            {/* Active campaigns */}
            <div style={card}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <div style={{ fontWeight: 700, fontSize: "0.85rem", color: C.gold }}>🎯 Active Campaigns</div>
                <button className="b" onClick={() => setPage("campaigns")} style={{ fontSize: "0.7rem", color: C.accent, background: "transparent", border: "none" }}>View all →</button>
              </div>
              {campaigns.filter(c => c.status === "active").map(c => (
                <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.78rem" }}>{c.name}</div>
                    <div style={{ fontSize: "0.65rem", color: C.dim }}>{c.platform} · ${c.spent}/${c.budget} spent</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.78rem", fontWeight: 700, color: C.accent }}>{c.reach.toLocaleString()}</div>
                    <div style={{ fontSize: "0.62rem", color: C.dim }}>reach</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Platform status */}
            <div style={card}>
              <div style={{ fontWeight: 700, fontSize: "0.85rem", color: C.gold, marginBottom: "12px" }}>🔌 Platform Status</div>
              {platforms.slice(0, 5).map(p => (
                <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                    <span style={{ fontSize: "1rem" }}>{p.icon}</span>
                    <span style={{ fontSize: "0.78rem" }}>{p.name}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                    <span style={{ fontSize: "0.65rem", color: C.dim }}>{p.reach}/day</span>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: p.connected ? C.accent : "rgba(255,255,255,0.2)" }} />
                  </div>
                </div>
              ))}
              <button className="b" onClick={() => setPage("platforms")} style={{ marginTop: "10px", width: "100%", background: "rgba(34,197,94,0.08)", border: `1px solid ${C.border}`, borderRadius: "8px", padding: "7px", color: C.accent, fontSize: "0.75rem", fontWeight: 600 }}>Manage platforms →</button>
            </div>
          </div>

          {/* Weekly schedule preview */}
          <div style={card}>
            <div style={{ fontWeight: 700, fontSize: "0.85rem", color: C.gold, marginBottom: "12px" }}>📅 This Week's Schedule</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "7px" }}>
              {Object.entries(schedule).map(([day, posts]) => (
                <div key={day}>
                  <div style={{ fontSize: "0.62rem", color: C.dim, textAlign: "center", marginBottom: "5px" }}>{day}</div>
                  {posts.map((p, i) => (
                    <div key={i} style={{ background: p.status === "posted" ? "rgba(34,197,94,0.1)" : "rgba(245,158,11,0.1)", borderRadius: "5px", padding: "3px 5px", marginBottom: "3px", fontSize: "0.55rem", color: p.status === "posted" ? C.accent : C.gold, lineHeight: 1.3 }}>
                      {p.platform.split("/")[0].substring(0, 6)} {p.time.split(":")[0]}{p.time.includes("PM") ? "p" : "a"}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>}

        {/* ── PLATFORMS ── */}
        {page === "platforms" && <div className="fd">
          <h1 style={{ fontWeight: 900, fontSize: "1.4rem", marginBottom: "6px" }}>🔌 Platform Connections</h1>
          <p style={{ color: C.dim, fontSize: "0.82rem", marginBottom: "20px" }}>Connect your advertising accounts. Toggle ON to activate each platform.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "12px" }}>
            {platforms.map(p => (
              <div key={p.id} style={{ ...card, borderColor: p.connected ? "rgba(34,197,94,0.4)" : C.border }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: p.color + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>{p.icon}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.88rem" }}>{p.name}</div>
                      <div style={{ fontSize: "0.65rem", color: C.dim }}>{p.reach} daily reach</div>
                    </div>
                  </div>
                  {/* Toggle */}
                  <div onClick={() => togglePlatform(p.id)} style={{ width: "40px", height: "22px", borderRadius: "11px", background: p.connected ? C.accent : "rgba(255,255,255,0.12)", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
                    <div style={{ position: "absolute", width: "16px", height: "16px", borderRadius: "50%", background: "#fff", top: "3px", left: p.connected ? "21px" : "3px", transition: "left 0.2s" }} />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7px", marginBottom: "10px" }}>
                  <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "8px", padding: "8px", textAlign: "center" }}>
                    <div style={{ fontSize: "0.72rem", color: C.dim }}>Cost per click</div>
                    <div style={{ fontWeight: 700, fontSize: "0.88rem", color: p.cpc === "FREE" ? C.accent : C.text }}>{p.cpc}</div>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "8px", padding: "8px", textAlign: "center" }}>
                    <div style={{ fontSize: "0.72rem", color: C.dim }}>Daily budget</div>
                    <div style={{ fontWeight: 700, fontSize: "0.88rem", color: C.gold }}>{p.budget === 0 ? "FREE" : "$" + p.budget}</div>
                  </div>
                </div>

                {p.connected ? (
                  <div style={{ background: "rgba(34,197,94,0.08)", borderRadius: "8px", padding: "8px", textAlign: "center", fontSize: "0.72rem", color: C.accent, fontWeight: 600 }}>
                    ✅ Connected & Active
                  </div>
                ) : (
                  <button className="b" onClick={() => togglePlatform(p.id)} style={{ width: "100%", background: "transparent", border: `1px solid ${C.border}`, borderRadius: "8px", padding: "8px", color: C.text, fontSize: "0.72rem", fontWeight: 600 }}>
                    Connect {p.name} →
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Summary */}
          <div style={{ ...card, marginTop: "16px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <div><div style={{ fontSize: "0.65rem", color: C.dim }}>CONNECTED</div><div style={{ fontWeight: 800, fontSize: "1.2rem", color: C.accent }}>{platforms.filter(p => p.connected).length}/{platforms.length}</div></div>
            <div><div style={{ fontSize: "0.65rem", color: C.dim }}>TOTAL DAILY REACH</div><div style={{ fontWeight: 800, fontSize: "1.2rem", color: C.accent }}>{(totalReach / 1000).toFixed(0)}K</div></div>
            <div><div style={{ fontSize: "0.65rem", color: C.dim }}>DAILY SPEND</div><div style={{ fontWeight: 800, fontSize: "1.2rem", color: C.gold }}>${totalSpend}/day</div></div>
          </div>
        </div>}

        {/* ── CAMPAIGNS ── */}
        {page === "campaigns" && <div className="fd">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
            <h1 style={{ fontWeight: 900, fontSize: "1.4rem" }}>🎯 Campaigns</h1>
            <button className="b" onClick={() => setShowNewCampaign(!showNewCampaign)} style={{ background: C.accent, border: "none", borderRadius: "10px", padding: "9px 16px", color: "#052e16", fontWeight: 800, fontSize: "0.82rem" }}>+ New Campaign</button>
          </div>

          {showNewCampaign && <div style={{ ...card, marginBottom: "16px", borderColor: "rgba(34,197,94,0.3)" }}>
            <div style={{ fontWeight: 700, fontSize: "0.88rem", color: C.gold, marginBottom: "12px" }}>🚀 Create New Campaign</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "10px" }}>
              <input value={newCampaign.name} onChange={e => setNewCampaign(c => ({ ...c, name: e.target.value }))} placeholder="Campaign name *" style={inp} />
              <select value={newCampaign.platform} onChange={e => setNewCampaign(c => ({ ...c, platform: e.target.value }))} style={sel}>
                {platforms.map(p => <option key={p.id} value={p.name} style={{ background: "#080e06" }}>{p.name}</option>)}
              </select>
              <input value={newCampaign.budget} onChange={e => setNewCampaign(c => ({ ...c, budget: e.target.value }))} placeholder="Budget ($)" type="number" style={inp} />
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button className="b" onClick={addCampaign} style={{ background: C.accent, border: "none", borderRadius: "9px", padding: "9px 18px", color: "#052e16", fontWeight: 800, fontSize: "0.82rem" }}>🚀 Launch</button>
              <button className="b" onClick={() => setShowNewCampaign(false)} style={{ background: "transparent", border: `1px solid ${C.border}`, borderRadius: "9px", padding: "9px 14px", color: C.dim, fontSize: "0.82rem" }}>Cancel</button>
            </div>
          </div>}

          <div style={{ display: "grid", gap: "10px" }}>
            {campaigns.map(c => (
              <div key={c.id} style={{ ...card, borderColor: c.status === "active" ? "rgba(34,197,94,0.3)" : C.border }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: "3px" }}>{c.name}</div>
                    <div style={{ fontSize: "0.68rem", color: C.dim }}>{c.platform} · Started {c.startDate}</div>
                  </div>
                  <span style={{ background: c.status === "active" ? "rgba(34,197,94,0.12)" : c.status === "completed" ? "rgba(99,102,241,0.12)" : "rgba(245,158,11,0.12)", color: c.status === "active" ? C.accent : c.status === "completed" ? "#818cf8" : C.gold, borderRadius: "20px", padding: "3px 10px", fontSize: "0.65rem", fontWeight: 700 }}>{c.status.toUpperCase()}</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "8px", marginBottom: "10px" }}>
                  {[["👁️ Reach", c.reach.toLocaleString()], ["👆 Clicks", c.clicks], ["✅ Conv.", c.conversions], ["💰 Spent", `$${c.spent}/$${c.budget}`]].map(([label, val]) => (
                    <div key={label} style={{ background: "rgba(255,255,255,0.03)", borderRadius: "8px", padding: "8px", textAlign: "center" }}>
                      <div style={{ fontSize: "0.6rem", color: C.dim, marginBottom: "2px" }}>{label}</div>
                      <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>{val}</div>
                    </div>
                  ))}
                </div>

                {c.status === "active" && c.budget > 0 && (
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", color: C.dim, marginBottom: "4px" }}>
                      <span>Budget used</span><span>{Math.round(c.spent / c.budget * 100)}%</span>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: "4px", height: "6px" }}>
                      <div style={{ background: C.accent, borderRadius: "4px", height: "100%", width: `${Math.round(c.spent / c.budget * 100)}%`, transition: "width 0.6s ease" }} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>}

        {/* ── AI GENERATOR ── */}
        {page === "generate" && <div className="fd">
          <h1 style={{ fontWeight: 900, fontSize: "1.4rem", marginBottom: "6px" }}>🤖 AI Ad Generator</h1>
          <p style={{ color: C.dim, fontSize: "0.82rem", marginBottom: "20px" }}>Generate professional ad copy for any platform in any language — powered by Claude AI.</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
            <div style={card}>
              <div style={{ fontWeight: 700, fontSize: "0.85rem", color: C.gold, marginBottom: "14px" }}>⚙️ Ad Settings</div>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ fontSize: "0.7rem", color: C.dim, display: "block", marginBottom: "4px" }}>PLATFORM</label>
                <select value={adPlatform} onChange={e => setAdPlatform(e.target.value)} style={sel}>
                  {platforms.map(p => <option key={p.id} value={p.name} style={{ background: "#080e06" }}>{p.icon} {p.name}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ fontSize: "0.7rem", color: C.dim, display: "block", marginBottom: "4px" }}>LANGUAGE</label>
                <select value={adLang} onChange={e => setAdLang(e.target.value)} style={sel}>
                  {LANGUAGES.map(l => <option key={l} value={l} style={{ background: "#080e06" }}>{l}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ fontSize: "0.7rem", color: C.dim, display: "block", marginBottom: "4px" }}>PRODUCT / FOCUS</label>
                <select value={adProduct} onChange={e => setAdProduct(e.target.value)} style={sel}>
                  {PRODUCTS.map(p => <option key={p} value={p} style={{ background: "#080e06" }}>{p}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ fontSize: "0.7rem", color: C.dim, display: "block", marginBottom: "4px" }}>TONE</label>
                <select value={adTone} onChange={e => setAdTone(e.target.value)} style={sel}>
                  {TONES.map(t => <option key={t} value={t} style={{ background: "#080e06" }}>{t}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ fontSize: "0.7rem", color: C.dim, display: "block", marginBottom: "4px" }}>TARGET COUNTRY</label>
                <select value={adCountry} onChange={e => setAdCountry(e.target.value)} style={sel}>
                  {COUNTRIES.map(c => <option key={c} value={c} style={{ background: "#080e06" }}>{c}</option>)}
                </select>
              </div>
              <button className="b" onClick={generateAd} disabled={aiLoading} style={{ width: "100%", background: C.accent, border: "none", borderRadius: "10px", padding: "11px", color: "#052e16", fontWeight: 800, fontSize: "0.88rem" }}>
                {aiLoading ? "⏳ Generating..." : "✨ Generate Ad Copy"}
              </button>
            </div>

            <div style={card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <div style={{ fontWeight: 700, fontSize: "0.85rem", color: C.gold }}>📝 Generated Ad</div>
                {generatedAd && (
                  <button className="b" onClick={copyAd} style={{ background: copied ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.06)", border: `1px solid ${C.border}`, borderRadius: "7px", padding: "5px 11px", color: copied ? C.accent : C.text, fontSize: "0.72rem", fontWeight: 600 }}>
                    {copied ? "✅ Copied!" : "📋 Copy"}
                  </button>
                )}
              </div>

              {aiLoading ? (
                <div style={{ textAlign: "center", padding: "40px" }}>
                  <div className="pl" style={{ fontSize: "2.5rem", marginBottom: "10px" }}>🤖</div>
                  <div style={{ fontSize: "0.82rem", color: C.dim }}>Claude AI is writing your ad...</div>
                </div>
              ) : generatedAd ? (
                <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "10px", padding: "14px", fontSize: "0.82rem", lineHeight: 1.8, color: C.text, whiteSpace: "pre-wrap", maxHeight: "350px", overflowY: "auto" }}>
                  {generatedAd}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "40px", color: C.dim }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "10px" }}>✨</div>
                  <div style={{ fontSize: "0.82rem" }}>Configure settings and click Generate</div>
                </div>
              )}

              {generatedAd && (
                <div style={{ marginTop: "12px", display: "flex", gap: "7px", flexWrap: "wrap" }}>
                  <button className="b" onClick={generateAd} style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${C.border}`, borderRadius: "8px", padding: "7px 12px", color: C.text, fontSize: "0.72rem" }}>🔄 Regenerate</button>
                  <button className="b" onClick={() => { setSchedule(s => ({ ...s, Mon: [...(s.Mon || []), { platform: adPlatform, time: "09:00 AM", content: generatedAd.substring(0, 40) + "...", status: "scheduled" }] })); notify("📅 Added to Monday schedule!"); }} style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)", borderRadius: "8px", padding: "7px 12px", color: C.gold, fontSize: "0.72rem" }}>📅 Schedule it</button>
                </div>
              )}
            </div>
          </div>

          {/* Quick generate buttons */}
          <div style={card}>
            <div style={{ fontWeight: 700, fontSize: "0.85rem", color: C.gold, marginBottom: "12px" }}>⚡ Quick Generate</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: "8px" }}>
              {[
                ["Facebook launch post", "Facebook", "English", "WorldShop General"],
                ["WhatsApp blast", "WhatsApp", "English", "Fresh Food 🌽"],
                ["TikTok solar video", "TikTok", "English", "Solar Panels ☀️"],
                ["Instagram fashion", "Instagram", "English", "Fashion 👗"],
                ["Swahili WhatsApp", "WhatsApp", "Swahili", "WorldShop General"],
                ["Hausa Facebook", "Facebook", "Hausa", "Fresh Food 🌽"],
              ].map(([label, plat, lang, prod]) => (
                <button key={label} className="b" onClick={() => { setAdPlatform(plat); setAdLang(lang); setAdProduct(prod); generateAd(); setPage("generate"); }} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: "9px", padding: "9px 12px", color: C.text, fontSize: "0.72rem", textAlign: "left", fontWeight: 500 }}>
                  ✨ {label}
                </button>
              ))}
            </div>
          </div>
        </div>}

        {/* ── SCHEDULE ── */}
        {page === "schedule" && <div className="fd">
          <h1 style={{ fontWeight: 900, fontSize: "1.4rem", marginBottom: "6px" }}>📅 Content Schedule</h1>
          <p style={{ color: C.dim, fontSize: "0.82rem", marginBottom: "16px" }}>Manage your weekly posting schedule across all platforms.</p>

          {/* Add post form */}
          <div style={{ ...card, marginBottom: "16px", borderColor: "rgba(34,197,94,0.25)" }}>
            <div style={{ fontWeight: 700, fontSize: "0.85rem", color: C.gold, marginBottom: "12px" }}>➕ Schedule New Post</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "9px", marginBottom: "9px" }}>
              <select value={newPost.day} onChange={e => setNewPost(p => ({ ...p, day: e.target.value }))} style={sel}>
                {Object.keys(schedule).map(d => <option key={d} value={d} style={{ background: "#080e06" }}>{d}</option>)}
              </select>
              <select value={newPost.platform} onChange={e => setNewPost(p => ({ ...p, platform: e.target.value }))} style={sel}>
                {platforms.map(p => <option key={p.id} value={p.name} style={{ background: "#080e06" }}>{p.name}</option>)}
              </select>
              <input type="time" value={newPost.time} onChange={e => setNewPost(p => ({ ...p, time: e.target.value }))} style={{ ...inp, colorScheme: "dark" }} />
              <input value={newPost.content} onChange={e => setNewPost(p => ({ ...p, content: e.target.value }))} placeholder="Post topic/content" style={inp} />
            </div>
            <button className="b" onClick={addPost} style={{ background: C.accent, border: "none", borderRadius: "9px", padding: "8px 18px", color: "#052e16", fontWeight: 800, fontSize: "0.82rem" }}>+ Add Post</button>
          </div>

          {/* Weekly calendar */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "9px" }}>
            {Object.entries(schedule).map(([day, posts]) => (
              <div key={day}>
                <div style={{ fontWeight: 700, fontSize: "0.75rem", textAlign: "center", marginBottom: "8px", color: ["Sat", "Sun"].includes(day) ? C.gold : C.text }}>{day}</div>
                {posts.map((p, i) => (
                  <div key={i} style={{ background: p.status === "posted" ? "rgba(34,197,94,0.08)" : "rgba(245,158,11,0.08)", border: `1px solid ${p.status === "posted" ? "rgba(34,197,94,0.2)" : "rgba(245,158,11,0.2)"}`, borderRadius: "8px", padding: "7px 6px", marginBottom: "6px" }}>
                    <div style={{ fontSize: "0.6rem", color: p.status === "posted" ? C.accent : C.gold, fontWeight: 700, marginBottom: "2px" }}>{p.platform.substring(0, 8)}</div>
                    <div style={{ fontSize: "0.58rem", color: C.dim, marginBottom: "2px" }}>{p.time}</div>
                    <div style={{ fontSize: "0.6rem", color: C.text, lineHeight: 1.3 }}>{p.content.substring(0, 20)}{p.content.length > 20 ? "..." : ""}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>}

        {/* ── ANALYTICS ── */}
        {page === "analytics" && <div className="fd">
          <h1 style={{ fontWeight: 900, fontSize: "1.4rem", marginBottom: "20px" }}>📈 Analytics</h1>

          {/* Overview */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "10px", marginBottom: "16px" }}>
            {[["📊", "Total Reach", "156K", "+23%"], ["👆", "Total Clicks", "4,832", "+18%"], ["✅", "Conversions", "284", "+31%"], ["💰", "Revenue", "$8,420", "+45%"]].map(([icon, label, val, change]) => (
              <div key={label} style={card}>
                <div style={{ fontSize: "1.2rem", marginBottom: "5px" }}>{icon}</div>
                <div style={{ fontSize: "0.65rem", color: C.dim, marginBottom: "2px" }}>{label}</div>
                <div style={{ fontWeight: 800, fontSize: "1.2rem", marginBottom: "3px" }}>{val}</div>
                <div style={{ fontSize: "0.65rem", color: C.accent, fontWeight: 600 }}>↑ {change} this week</div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
            {/* Platform performance */}
            <div style={card}>
              <div style={{ fontWeight: 700, fontSize: "0.85rem", color: C.gold, marginBottom: "14px" }}>📊 Platform Performance</div>
              {[
                { name: "TikTok", reach: 85, color: "#ff2d55" },
                { name: "Facebook", reach: 72, color: "#1877F2" },
                { name: "WhatsApp", reach: 65, color: "#25D366" },
                { name: "Instagram", reach: 58, color: "#E1306C" },
                { name: "Google", reach: 45, color: "#EA4335" },
                { name: "Email", reach: 32, color: "#6B7280" },
              ].map(p => (
                <div key={p.name} style={{ marginBottom: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", marginBottom: "3px" }}>
                    <span>{p.name}</span><span style={{ color: C.accent, fontWeight: 600 }}>{p.reach}%</span>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "4px", height: "7px" }}>
                    <div style={{ background: p.color, borderRadius: "4px", height: "100%", width: `${p.reach}%`, opacity: 0.8 }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Top performing content */}
            <div style={card}>
              <div style={{ fontWeight: 700, fontSize: "0.85rem", color: C.gold, marginBottom: "14px" }}>🏆 Top Performing Posts</div>
              {[
                { platform: "TikTok", content: "Solar panel unboxing", reach: "24K", engagement: "8.2%" },
                { platform: "WhatsApp", content: "Monday morning blast", reach: "3.2K", engagement: "13.1%" },
                { platform: "Facebook", content: "Fashion Friday post", reach: "12K", engagement: "4.8%" },
                { platform: "Instagram", content: "Fresh food flatlay", reach: "8.9K", engagement: "6.3%" },
                { platform: "Facebook", content: "Weekend sale post", reach: "15K", engagement: "5.1%" },
              ].map((post, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: `1px solid ${C.border}` }}>
                  <div>
                    <div style={{ fontSize: "0.75rem", fontWeight: 600 }}>{post.content}</div>
                    <div style={{ fontSize: "0.62rem", color: C.dim }}>{post.platform}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, color: C.accent }}>{post.reach}</div>
                    <div style={{ fontSize: "0.62rem", color: C.gold }}>{post.engagement}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Country breakdown */}
          <div style={card}>
            <div style={{ fontWeight: 700, fontSize: "0.85rem", color: C.gold, marginBottom: "14px" }}>🌍 Top Countries</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: "10px" }}>
              {[["🇳🇬 Nigeria", "42%", 42], ["🇰🇪 Kenya", "23%", 23], ["🇬🇭 Ghana", "18%", 18], ["🇿🇦 South Africa", "10%", 10], ["🇹🇿 Tanzania", "7%", 7]].map(([country, pct, bar]) => (
                <div key={country} style={{ background: "rgba(255,255,255,0.03)", borderRadius: "10px", padding: "10px" }}>
                  <div style={{ fontWeight: 600, fontSize: "0.75rem", marginBottom: "4px" }}>{country}</div>
                  <div style={{ fontWeight: 800, fontSize: "1rem", color: C.accent, marginBottom: "5px" }}>{pct}</div>
                  <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: "3px", height: "5px" }}>
                    <div style={{ background: C.accent, borderRadius: "3px", height: "100%", width: `${bar}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ROI calculator */}
          <div style={{ ...card, marginTop: "14px" }}>
            <div style={{ fontWeight: 700, fontSize: "0.85rem", color: C.gold, marginBottom: "12px" }}>💰 ROI Summary</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px" }}>
              {[["Total ad spend", "$" + totalSpend * 30 + "/mo", "rgba(239,68,68,0.1)", "#ef4444"], ["Revenue generated", "$" + (totalSpend * 30 * 8.4).toFixed(0) + "/mo", "rgba(34,197,94,0.1)", "#22c55e"], ["Return on investment", (totalSpend > 0 ? "8.4x" : "∞ (free!)"), "rgba(245,158,11,0.1)", "#f59e0b"]].map(([label, val, bg, color]) => (
                <div key={label} style={{ background: bg, borderRadius: "12px", padding: "14px", textAlign: "center" }}>
                  <div style={{ fontSize: "0.65rem", color: C.dim, marginBottom: "5px" }}>{label.toUpperCase()}</div>
                  <div style={{ fontWeight: 900, fontSize: "1.3rem", color }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>}

      </div>

      {/* Mobile bottom nav */}
      <div style={{ display: "none", position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(8,14,6,0.97)", borderTop: `1px solid ${C.border}`, padding: "6px 0" }} className="mobile-nav">
        {navItems.map(([id, icon]) => (
          <button key={id} className="nb" onClick={() => setPage(id)} style={{ background: "transparent", border: "none", padding: "5px 8px", color: page === id ? C.accent : C.dim, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: page === id ? "1.2rem" : "1rem" }}>{icon}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
