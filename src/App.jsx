import { useState } from "react";

const CATEGORIES = [
  {id:"all",icon:"🌍",label:"All"},{id:"food",icon:"🌾",label:"Food & Farm"},
  {id:"electronics",icon:"📱",label:"Electronics"},{id:"clothing",icon:"👗",label:"Clothing"},
  {id:"health",icon:"💊",label:"Health"},{id:"tools",icon:"🔧",label:"Tools"},
  {id:"beauty",icon:"✨",label:"Beauty"},{id:"home",icon:"🏠",label:"Home"},
  {id:"energy",icon:"⚡",label:"Solar"},{id:"livestock",icon:"🐄",label:"Livestock"},
  {id:"accessories",icon:"💍",label:"Accessories"},
  {id:"furniture",icon:"🪑",label:"Furniture"},
  {id:"drinks",icon:"🍕",label:"Food & Drinks"},
  {id:"gaming",icon:"🎮",label:"Gaming"},
  {id:"auto",icon:"🚗",label:"Auto Parts"},
  {id:"baby",icon:"👶",label:"Baby"},
  {id:"books",icon:"📚",label:"Books"},
  {id:"pets",icon:"🐾",label:"Pets"},
];

const PRODUCTS = [
  {id:1,name:"Fresh Maize 50kg",price:12,rating:4.8,reviews:234,seller:"John Kamau",location:"Nairobi, Kenya",category:"food",icon:"🌽",badge:"Best Seller",delivery:"2 days",stock:45,desc:"Premium quality maize from local farms. Freshly harvested and ready for delivery across East Africa."},
  {id:2,name:"Samsung A14 Smartphone",price:145,rating:4.6,reviews:892,seller:"TechHub Lagos",location:"Lagos, Nigeria",category:"electronics",icon:"📱",badge:"Top Rated",delivery:"3 days",stock:12,desc:"Brand new Samsung Galaxy A14 with 1 year warranty. Best value smartphone in Africa."},
  {id:3,name:"100W Solar Panel Kit",price:89,rating:4.9,reviews:567,seller:"SolarAfrica Co.",location:"Accra, Ghana",category:"energy",icon:"☀️",badge:"Eco Choice",delivery:"5 days",stock:8,desc:"Complete solar kit with panel, battery and inverter. Powers a small home for 8+ hours daily."},
  {id:4,name:"Ankara Print Dress",price:18,rating:4.7,reviews:1203,seller:"Mama Fatima",location:"Dakar, Senegal",category:"clothing",icon:"👗",badge:"Trending",delivery:"4 days",stock:23,desc:"Handmade Ankara dress in vibrant African prints. Available in all sizes. Ships worldwide."},
  {id:5,name:"Moringa Powder 500g",price:8,rating:4.9,reviews:445,seller:"NatureHeals TZ",location:"Dar es Salaam",category:"health",icon:"🌿",badge:"Organic",delivery:"3 days",stock:67,desc:"100% organic moringa powder. Rich in vitamins and minerals. Boosts energy and immunity."},
  {id:6,name:"Hand Plow Farm Tool",price:14,rating:4.5,reviews:189,seller:"FarmTools Rwanda",location:"Kigali, Rwanda",category:"tools",icon:"🔧",badge:"Popular",delivery:"4 days",stock:34,desc:"Durable steel hand plow for small farms. Lasts 5+ years with proper care."},
  {id:7,name:"Shea Butter 250ml",price:9,rating:4.8,reviews:678,seller:"GhanaGold Beauty",location:"Kumasi, Ghana",category:"beauty",icon:"🧴",badge:"Natural",delivery:"3 days",stock:89,desc:"Pure unrefined shea butter. Deeply moisturizes skin and hair. 100% natural."},
  {id:8,name:"Cassava Flour 25kg",price:22,rating:4.6,reviews:312,seller:"Mama Aisha Foods",location:"Kampala, Uganda",category:"food",icon:"🥣",badge:"Fresh",delivery:"2 days",stock:156,desc:"Fine cassava flour perfect for baking, fufu and African dishes. Freshly milled."},
  {id:9,name:"LED Solar Street Light",price:45,rating:4.7,reviews:234,seller:"BrightAfrica Ltd",location:"Lusaka, Zambia",category:"energy",icon:"💡",badge:"New",delivery:"6 days",stock:19,desc:"Auto solar street light. Charges by day, lights up at night. Fully weatherproof."},
  {id:10,name:"Kente Fabric 6 yards",price:28,rating:4.9,reviews:891,seller:"Kente King",location:"Accra, Ghana",category:"clothing",icon:"🎨",badge:"Handmade",delivery:"5 days",stock:42,desc:"Authentic hand-woven Kente fabric. 6 yards perfect for a complete outfit."},
  {id:11,name:"Herbal Wellness Tea",price:6,rating:4.4,reviews:234,seller:"AfriHerbs Co.",location:"Nairobi, Kenya",category:"health",icon:"🫖",badge:"Traditional",delivery:"3 days",stock:201,desc:"Traditional African herbal blend. Boosts immunity and energy naturally."},
  {id:12,name:"Portable Water Filter",price:35,rating:4.8,reviews:567,seller:"CleanWater Uganda",location:"Kampala, Uganda",category:"home",icon:"💧",badge:"Essential",delivery:"4 days",stock:31,desc:"Removes 99.9% of bacteria and viruses. No electricity needed. 1000L capacity."},
  {id:13,name:"Live Chicken 2kg",price:7,rating:4.6,reviews:445,seller:"FarmFresh Nigeria",location:"Ibadan, Nigeria",category:"livestock",icon:"🐔",badge:"Fresh",delivery:"Same day",stock:200,desc:"Fresh farm chicken. Antibiotic-free. Available live or slaughtered on request."},
  {id:14,name:"Rice 50kg Premium",price:38,rating:4.7,reviews:892,seller:"GrainMaster Ghana",location:"Kumasi, Ghana",category:"food",icon:"🍚",badge:"Popular",delivery:"2 days",stock:300,desc:"Long grain premium rice. Parboiled for perfect cooking every time."},
  {id:15,name:"Solar Phone Charger",price:15,rating:4.8,reviews:334,seller:"SolarAfrica Co.",location:"Accra, Ghana",category:"energy",icon:"🔌",badge:"Must Have",delivery:"3 days",stock:78,desc:"Charges any phone using solar energy. Waterproof. Perfect for off-grid areas."},
  {id:16,name:"Motorcycle Battery 12V",price:32,rating:4.5,reviews:178,seller:"AutoParts Kenya",location:"Mombasa, Kenya",category:"tools",icon:"🔋",badge:"Quality",delivery:"2 days",stock:56,desc:"High-performance 12V motorcycle battery. 18-month warranty. All major brands."},
  {id:23,name:"Wooden Coffee Table",price:45,rating:4.7,reviews:123,seller:"WoodWorks Lagos",location:"Lagos, Nigeria",category:"furniture",icon:"🪑",badge:"Handmade",delivery:"7 days",stock:12,desc:"Beautiful handcrafted wooden coffee table. Solid African mahogany. Lasts a lifetime."},
  {id:24,name:"African Rattan Chair",price:38,rating:4.6,reviews:89,seller:"CraftHome Ghana",location:"Accra, Ghana",category:"furniture",icon:"🛋️",badge:"Popular",delivery:"6 days",stock:18,desc:"Comfortable rattan chair handwoven by African craftsmen. Perfect for home or office."},
  {id:25,name:"Palm Wine 2 Litres",price:5,rating:4.8,reviews:334,seller:"PalmWine Nigeria",location:"Ibadan, Nigeria",category:"drinks",icon:"🍶",badge:"Traditional",delivery:"Same day",stock:200,desc:"Fresh natural palm wine. Tapped daily from African palm trees. Sweet and refreshing."},
  {id:26,name:"Zobo Drink 1 Litre",price:3,rating:4.9,reviews:567,seller:"ZoboQueen Abuja",location:"Abuja, Nigeria",category:"drinks",icon:"🥤",badge:"Fresh",delivery:"Same day",stock:150,desc:"Natural zobo drink made from hibiscus flowers. No preservatives. Refreshing and healthy."},
  {id:27,name:"Mobile Gaming Controller",price:25,rating:4.6,reviews:234,seller:"TechHub Lagos",location:"Lagos, Nigeria",category:"gaming",icon:"🎮",badge:"Popular",delivery:"3 days",stock:45,desc:"Bluetooth gaming controller for mobile phones. Compatible with all Android and iOS games."},
  {id:28,name:"Gaming Headset",price:22,rating:4.5,reviews:189,seller:"TechHub Lagos",location:"Lagos, Nigeria",category:"gaming",icon:"🎧",badge:"Quality",delivery:"3 days",stock:34,desc:"High quality gaming headset with microphone. Crystal clear sound. USB and 3.5mm jack."},
  {id:29,name:"Car Phone Holder",price:8,rating:4.7,reviews:445,seller:"AutoParts Kenya",location:"Nairobi, Kenya",category:"auto",icon:"🚗",badge:"Must Have",delivery:"2 days",stock:89,desc:"Universal car phone holder. Fits all phone sizes. Strong magnetic grip. Easy installation."},
  {id:30,name:"Car Air Freshener",price:4,rating:4.8,reviews:678,seller:"AutoCare Ghana",location:"Kumasi, Ghana",category:"auto",icon:"🌸",badge:"Popular",delivery:"2 days",stock:234,desc:"Long lasting car air freshener. African scents including cocoa and shea butter fragrance."},
  {id:31,name:"Baby Carrier Wrap",price:18,rating:4.9,reviews:567,seller:"MamaAfrica Kenya",location:"Nairobi, Kenya",category:"baby",icon:"👶",badge:"Safe",delivery:"4 days",stock:56,desc:"Traditional African baby carrier wrap. 100% cotton. Safe and comfortable for babies 0-24 months."},
  {id:32,name:"Baby Food Organic",price:7,rating:4.8,reviews:334,seller:"BabyNature Uganda",location:"Kampala, Uganda",category:"baby",icon:"🍼",badge:"Organic",delivery:"2 days",stock:123,desc:"100% organic baby food made from African fruits and vegetables. No additives or preservatives."},
  {id:33,name:"African History Books Set",price:28,rating:4.9,reviews:234,seller:"AfriBooks Lagos",location:"Lagos, Nigeria",category:"books",icon:"📚",badge:"Educational",delivery:"4 days",stock:67,desc:"Set of 5 books about African history, culture and civilization. Perfect for students and adults."},
  {id:34,name:"Swahili Language Guide",price:12,rating:4.7,reviews:189,seller:"AfriBooks Nairobi",location:"Nairobi, Kenya",category:"books",icon:"📖",badge:"Popular",delivery:"3 days",stock:45,desc:"Complete Swahili language learning guide. Includes phrases, grammar and exercises."},
  {id:35,name:"Dog Food Premium 5kg",price:15,rating:4.6,reviews:234,seller:"PetCare Nigeria",location:"Lagos, Nigeria",category:"pets",icon:"🐕",badge:"Quality",delivery:"2 days",stock:78,desc:"Premium dog food with African beef and vegetables. Complete nutrition for all dog breeds."},
  {id:36,name:"Cat Toys Bundle",price:9,rating:4.8,reviews:156,seller:"PetCare Ghana",location:"Accra, Ghana",category:"pets",icon:"🐈",badge:"Fun",delivery:"3 days",stock:89,desc:"Bundle of 5 interactive cat toys. Keeps your cat entertained for hours. Safe materials."},
];

const PAYMENT_METHODS = [
  {id:"stripe",icon:"💳",label:"Card Payment",desc:"Visa, Mastercard, Amex — Stripe",fee:"2.9%"},
  {id:"flutterwave",icon:"🦋",label:"Flutterwave",desc:"Cards, Mobile Money, Bank Transfer",fee:"1.4%"},
  {id:"mpesa",icon:"📱",label:"M-Pesa",desc:"Kenya Mobile Money",fee:"0.5%"},
  {id:"cash",icon:"💵",label:"Cash on Delivery",desc:"Pay when you receive",fee:"Free"},
  {id:"opay",icon:"🔵",label:"OPay",desc:"Nigeria Mobile Money",fee:"0.5%"},
  {id:"momo",icon:"🟡",label:"MTN MoMo",desc:"MTN Mobile Money",fee:"1%"},
  {id:"crypto",icon:"₿",label:"Crypto",desc:"Bitcoin, USDT, Solana",fee:"0.1%"},
];

// ── API CALLS (via Netlify functions) ─────────────────────────────────────────
const callAI = async (prompt, system) => {
  try {
    const res = await fetch("/.netlify/functions/ai", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, system })
    });
    const data = await res.json();
    return data.text || "Try again.";
  } catch { return "Connection error. Please try again."; }
};

const initiateFlutterwave = async (amount, customer, orderId) => {
  try {
    const res = await fetch("/.netlify/functions/payment", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, ...customer, orderId, currency: "USD" })
    });
    const data = await res.json();
    return data;
  } catch { return { error: "Payment connection failed." }; }
};

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function WorldShop() {
  const [page, setPage] = useState("home");
  const [cat, setCat] = useState("all");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [sellerProds, setSellerProds] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [payMethod, setPayMethod] = useState("flutterwave");
  const [step, setStep] = useState(1);
  const [notif, setNotif] = useState("");
  const [aiQ, setAiQ] = useState("");
  const [aiR, setAiR] = useState("");
  const [aiLoad, setAiLoad] = useState(false);
  const [aiDescLoad, setAiDescLoad] = useState(false);
  const [qty, setQty] = useState(1);
  const [userReviews, setUserReviews] = useState({});
  const [reviewText, setReviewText] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [priceMax, setPriceMax] = useState(200);
  const [coupon, setCoupon] = useState("");
  const [couponOk, setCouponOk] = useState(false);
  const [country, setCountry] = useState("🇳🇬 Nigeria");
  const [address, setAddress] = useState({ name: "", phone: "", email: "", street: "", city: "", country: "" });
  const [newProd, setNewProd] = useState({ name: "", price: "", category: "food", location: "", stock: "", desc: "" });
  const [compareList, setCompareList] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [sellerAlerts, setSellerAlerts] = useState([]);
  const [showSellerAlerts, setShowSellerAlerts] = useState(false);
  const [escrowBalance, setEscrowBalance] = useState(0);
  const [disputes, setDisputes] = useState([]);
  const [trackingNumbers, setTrackingNumbers] = useState({});
  const [trackingInput, setTrackingInput] = useState({});
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([{role:"ai", text:"Hi! 👋 I am WorldShop AI. How can I help you today? Ask me about products, orders, delivery or anything!"}]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const allProds = [...PRODUCTS, ...sellerProds];
  const filtered = allProds
    .filter(p =>
      (cat === "all" || p.category === cat) &&
      (search === "" || p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase()) ||
        p.seller?.toLowerCase().includes(search.toLowerCase())) &&
      p.price <= priceMax
    )
    .sort((a, b) =>
      sortBy === "price_asc" ? a.price - b.price :
      sortBy === "price_desc" ? b.price - a.price :
      sortBy === "rating" ? b.rating - a.rating : b.reviews - a.reviews
    );

  const addToCart = (p, q = 1) => {
    setCart(c => { const ex = c.find(i => i.id === p.id); return ex ? c.map(i => i.id === p.id ? { ...i, qty: i.qty + q } : i) : [...c, { ...p, qty: q }]; });
    notify(`${p.icon} Added to cart!`);
  };
  const updateQty = (id, q) => { if (q < 1) removeFromCart(id); else setCart(c => c.map(i => i.id === id ? { ...i, qty: q } : i)); };
  const removeFromCart = (id) => setCart(c => c.filter(i => i.id !== id));
  const toggleWish = (p) => setWishlist(w => w.find(i => i.id === p.id) ? w.filter(i => i.id !== p.id) : [...w, p]);
  const inWish = (id) => wishlist.some(i => i.id === id);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const discount = couponOk ? cartTotal * 0.1 : 0;
  const finalTotal = cartTotal - discount;
  const notify = (msg) => { setNotif(msg); setTimeout(() => setNotif(""), 3000); };

  const placeOrder = async () => {
    setPaymentLoading(true);

    // Stripe Card Payment
    if (payMethod === "stripe") {
      try {
        const res = await fetch("/.netlify/functions/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: finalTotal,
            email: address.email || "customer@worldshop.com",
            name: address.name,
            phone: address.phone,
            method: "stripe",
            orderId: `WS-${Date.now()}`
          })
        });
        const data = await res.json();
        if (data.clientSecret) {
          // Order placed - Stripe will handle real payment
          setPaymentLoading(false);
          const o = { id: `WS${Date.now()}`, items: [...cart], total: finalTotal, method: payMethod, address: { ...address }, status: "Processing", date: new Date().toLocaleDateString(), steps: ["Processing", "Confirmed", "Packed", "Shipped", "Delivered"], current: 2 };
          setOrders(prev => [o, ...prev]);
          setCart([]); setShowCart(false); setShowCheckout(false); setStep(1); setCouponOk(false);
          setPage("track"); notify("✅ Order placed! Check email for payment link.");
          return;
        }
      } catch(e) { console.error(e); }
      setPaymentLoading(false);
      return;
    }

    // Flutterwave Mobile Money
    if (payMethod === "flutterwave" && address.email) {
      const result = await initiateFlutterwave(finalTotal, { name: address.name, email: address.email, phone: address.phone }, `WS-${Date.now()}`);
      setPaymentLoading(false);
      if (result.paymentLink) {
        window.open(result.paymentLink, "_blank");
        return;
      }
    }
    setPaymentLoading(false);
    const o = { id: `WS${Date.now()}`, items: [...cart], total: finalTotal, method: payMethod, address: { ...address }, status: "Processing", date: new Date().toLocaleDateString(), steps: ["Processing", "Confirmed", "Packed", "Shipped", "Delivered"], current: 2 };
    setOrders(prev => [o, ...prev]);
    setCart([]); setShowCart(false); setShowCheckout(false); setStep(1); setCouponOk(false);
    setPage("track"); notify("✅ Order placed successfully!");
  };

  const askAI = async () => {
    if (!aiQ.trim()) return;
    setAiLoad(true); setAiR("");
    const r = await callAI(aiQ);
    setAiR(r); setAiLoad(false);
  };

  const sendChat = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages(m => [...m, {role:"user", text:userMsg}]);
    setChatInput("");
    setChatLoading(true);
    const r = await callAI(userMsg, "You are WorldShop Africa customer service AI. Help customers with: products, orders, delivery, payments, selling. Be friendly and helpful. Max 80 words. Always end with a helpful suggestion.");
    setChatMessages(m => [...m, {role:"ai", text:r}]);
    setChatLoading(false);
  };

  const genDesc = async () => {
    if (!newProd.name) return;
    setAiDescLoad(true);
    const r = await callAI(`Write a compelling 2-sentence product description for: "${newProd.name}". Target: African shoppers. Max 40 words.`, "Write short product descriptions for a marketplace.");
    setNewProd(p => ({ ...p, desc: r })); setAiDescLoad(false);
  };

  const submitProd = () => {
    if (!newProd.name || !newProd.price) return;
    const p = { id: Date.now(), ...newProd, price: parseFloat(newProd.price) || 0, stock: parseInt(newProd.stock) || 10, rating: 5.0, reviews: 0, seller: "You", badge: "New", delivery: "3-5 days", icon: "📦" };
    setSellerProds(s => [p, ...s]);
    setNewProd({ name: "", price: "", category: "food", location: "", stock: "", desc: "" });
    notify("🎉 Product listed successfully!");
  };

  // ── STYLES ──────────────────────────────────────────────────────────────────
  const C = { bg: "#0a1208", card: "rgba(255,255,255,0.04)", border: "rgba(34,197,94,0.18)", accent: "#22c55e", gold: "#f59e0b", red: "#ef4444", text: "#f0fdf4" };
  const card = { background: C.card, borderRadius: "14px", border: `1px solid ${C.border}`, padding: "14px" };
  const pw = { minHeight: "calc(100vh - 115px)", padding: "12px 12px 90px" };
  const inp = { width: "100%", background: "rgba(255,255,255,0.06)", border: `1px solid ${C.border}`, borderRadius: "9px", padding: "9px 12px", color: C.text, fontSize: "0.82rem", fontFamily: "inherit", marginBottom: "8px" };
  const bigBtn = (bg = C.accent, col = "#052e16") => ({ width: "100%", background: bg, border: "none", borderRadius: "10px", padding: "11px", color: col, fontWeight: 800, fontSize: "0.85rem", cursor: "pointer", fontFamily: "inherit" });

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Plus Jakarta Sans',-apple-system,sans-serif", color: C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-thumb{background:#22c55e;border-radius:2px;}
        input,select,button,textarea{font-family:inherit;}
        input::placeholder,textarea::placeholder{color:rgba(240,253,244,0.3);}
        input:focus,select:focus,textarea:focus{outline:2px solid rgba(34,197,94,0.5)!important;}
        .b{transition:all 0.15s;cursor:pointer;-webkit-tap-highlight-color:transparent;}
        .b:hover{opacity:0.82;} .b:active{transform:scale(0.95);}
        .c{transition:all 0.18s;cursor:pointer;} .c:hover{transform:translateY(-2px);border-color:rgba(34,197,94,0.4)!important;}
        .n{transition:all 0.15s;cursor:pointer;} .n:hover{background:rgba(34,197,94,0.1)!important;color:#22c55e!important;}
        .t{transition:all 0.15s;cursor:pointer;} .t:hover,.t.on{background:rgba(34,197,94,0.14)!important;border-color:#22c55e!important;color:#22c55e!important;}
        @keyframes fu{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
        @keyframes pl{0%,100%{opacity:1;}50%{opacity:0.25;}}
        @keyframes nt{0%{transform:translateX(-50%) translateY(-50px);opacity:0;}15%,85%{transform:translateX(-50%) translateY(0);opacity:1;}100%{transform:translateX(-50%) translateY(-50px);opacity:0;}}
        .fd{animation:fu 0.3s ease forwards;}
        .pl{animation:pl 1.3s ease-in-out infinite;}
        .nt{animation:nt 3s ease forwards;}
        @media(max-width:599px){.donly{display:none!important;}}
      `}</style>

      {notif && <div className="nt" style={{ position: "fixed", top: "68px", left: "50%", zIndex: 999, background: C.accent, color: "#052e16", padding: "9px 18px", borderRadius: "18px", fontWeight: 700, fontSize: "0.78rem", whiteSpace: "nowrap", pointerEvents: "none" }}>{notif}</div>}

      {/* BG decoration */}
      <div style={{ position: "fixed", top: "-80px", right: "-80px", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle,rgba(34,197,94,0.06),transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "15%", left: "-60px", width: "250px", height: "250px", borderRadius: "50%", background: "radial-gradient(circle,rgba(245,158,11,0.04),transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      {/* ── HEADER ── */}
      <header style={{ position: "sticky", top: 0, zIndex: 200, background: "rgba(10,18,8,0.97)", borderBottom: `1px solid ${C.border}`, backdropFilter: "blur(16px)", padding: "9px 12px", display: "flex", alignItems: "center", gap: "7px", flexWrap: "wrap" }}>
        <div onClick={() => setPage("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "7px", flexShrink: 0 }}>
          <span style={{ fontSize: "1.3rem" }}>🛒</span>
          <div>
            <div style={{ fontWeight: 900, fontSize: "0.95rem", color: C.accent }}>WorldShop</div>
            <div style={{ fontSize: "0.5rem", color: "rgba(240,253,244,0.35)", letterSpacing: "1.5px" }}>AFRICA'S MARKETPLACE</div>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", gap: "5px", minWidth: "130px" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === "Enter" && setPage("shop")} placeholder="Search products, sellers..." style={{ ...inp, marginBottom: 0, flex: 1, padding: "7px 11px" }} />
          <button className="b" onClick={() => setPage("shop")} style={{ background: C.accent, border: "none", borderRadius: "8px", padding: "7px 12px", color: "#052e16", fontWeight: 800, flexShrink: 0 }}>🔍</button>
        </div>
        <div style={{ display: "flex", gap: "5px", alignItems: "center", flexShrink: 0 }}>
          <select value={country} onChange={e => setCountry(e.target.value)} style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${C.border}`, borderRadius: "7px", color: C.text, padding: "5px", fontSize: "0.65rem", cursor: "pointer" }}>
            {["🇳🇬 Nigeria", "🇰🇪 Kenya", "🇬🇭 Ghana", "🇿🇦 South Africa", "🇪🇹 Ethiopia", "🇹🇿 Tanzania", "🇺🇬 Uganda", "🇸🇳 Senegal", "🇷🇼 Rwanda"].map(c => <option key={c} value={c} style={{ background: "#0a1208" }}>{c}</option>)}
          </select>
          <button className="b" onClick={() => setShowCart(true)} style={{ background: "rgba(34,197,94,0.1)", border: `1px solid ${C.border}`, borderRadius: "8px", padding: "6px 10px", color: C.text, position: "relative", fontSize: "0.82rem" }}>
            🛒{cartCount > 0 && <span style={{ position: "absolute", top: "-5px", right: "-5px", background: C.gold, color: "#451a03", borderRadius: "50%", width: "16px", height: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.52rem", fontWeight: 800 }}>{cartCount}</span>}
          </button>
          <button className="b" onClick={() => setPage("sell")} style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: "8px", padding: "6px 9px", color: C.gold, fontSize: "0.65rem", fontWeight: 700 }}>💰 Sell</button>
        </div>
      </header>

      {/* ── NAV TABS ── */}
      <div style={{ background: "rgba(10,18,8,0.95)", borderBottom: `1px solid ${C.border}`, padding: "0 12px", display: "flex", gap: "1px", overflowX: "auto", scrollbarWidth: "none" }}>
        {[["home", "🏠", "Home"], ["shop", "🛍️", "Shop"], ["ai", "🤖", "AI"], ["track", "📦", "Orders"], ["sell", "💰", "Sell"], ["dashboard", "📊", "Stats"], ["wishlist", "❤️", "Wishlist"], ["compare", "⚖️", "Compare"], ["marketing", "📣", "Marketing"]].map(([id, icon, label]) => (
          <button key={id} className="n" onClick={() => setPage(id)} style={{ background: "transparent", border: "none", borderBottom: page === id ? `2px solid ${C.accent}` : "2px solid transparent", padding: "9px 10px", color: page === id ? C.accent : "rgba(240,253,244,0.42)", fontSize: "0.68rem", fontWeight: page === id ? 700 : 400, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "3px" }}>
            <span>{icon}</span><span className="donly">{label}</span>
          </button>
        ))}
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── HOME ── */}
        {page === "home" && <div style={pw} className="fd">
          <div style={{ background: "linear-gradient(135deg,rgba(34,197,94,0.12),rgba(245,158,11,0.06))", borderRadius: "16px", border: `1px solid ${C.border}`, padding: "20px 16px", marginBottom: "13px", textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "7px" }}>🛒🌍</div>
            <h1 style={{ fontWeight: 900, fontSize: "clamp(1.2rem,5vw,1.7rem)", color: C.accent, marginBottom: "5px" }}>WorldShop Africa</h1>
            <p style={{ color: "rgba(240,253,244,0.5)", fontSize: "0.78rem", maxWidth: "360px", margin: "0 auto 13px", lineHeight: 1.6 }}>Shop from 10,000+ sellers across 50+ African countries. Fast delivery. Cash on delivery. AI-powered.</p>
            <div style={{ display: "flex", gap: "7px", justifyContent: "center", flexWrap: "wrap" }}>
              <button className="b" onClick={() => setPage("shop")} style={{ background: C.accent, border: "none", borderRadius: "9px", padding: "9px 18px", color: "#052e16", fontWeight: 800, fontSize: "0.82rem" }}>Shop Now →</button>
              <button className="b" onClick={() => setPage("sell")} style={{ background: "transparent", border: `1px solid ${C.accent}`, borderRadius: "9px", padding: "9px 18px", color: C.accent, fontWeight: 700, fontSize: "0.82rem" }}>Start Selling</button>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "6px", marginBottom: "13px" }}>
            {[["10K+", "Sellers"], ["50+", "Countries"], ["100K+", "Products"], ["24h", "Delivery"]].map(([n, l]) => (
              <div key={l} style={{ ...card, textAlign: "center", padding: "9px 5px" }}>
                <div style={{ fontWeight: 900, fontSize: "1rem", color: C.accent }}>{n}</div>
                <div style={{ fontSize: "0.58rem", color: "rgba(240,253,244,0.4)", marginTop: "2px" }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Flash deals */}
          <div style={{ ...card, marginBottom: "13px", borderColor: "rgba(245,158,11,0.25)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "9px" }}>
              <div style={{ fontWeight: 700, fontSize: "0.82rem", color: C.gold }}>⚡ Flash Deals</div>
              <div style={{ fontSize: "0.65rem", color: "rgba(240,253,244,0.4)" }}>Ends: 02:14:33</div>
            </div>
            <div style={{ display: "flex", gap: "7px", overflowX: "auto", scrollbarWidth: "none", paddingBottom: "3px" }}>
              {PRODUCTS.slice(0, 5).map(p => (
                <div key={p.id} className="c" onClick={() => { setSelected(p); setPage("product"); }} style={{ minWidth: "100px", background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.18)", borderRadius: "11px", padding: "9px", textAlign: "center", flexShrink: 0 }}>
                  <div style={{ fontSize: "1.7rem", marginBottom: "4px" }}>{p.icon}</div>
                  <div style={{ fontSize: "0.6rem", fontWeight: 600, marginBottom: "2px", lineHeight: 1.3 }}>{p.name.substring(0, 16)}...</div>
                  <div style={{ color: C.gold, fontWeight: 800, fontSize: "0.78rem" }}>${p.price}</div>
                  <div style={{ background: "rgba(239,68,68,0.2)", color: "#fca5a5", fontSize: "0.52rem", borderRadius: "5px", padding: "1px 4px", marginTop: "3px", fontWeight: 700 }}>-15% OFF</div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div style={{ fontSize: "0.65rem", color: "rgba(240,253,244,0.35)", letterSpacing: "1px", marginBottom: "6px" }}>SHOP BY CATEGORY</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "5px", marginBottom: "13px" }}>
            {CATEGORIES.filter(c => c.id !== "all").map(c => (
              <button key={c.id} className="b c" onClick={() => { setCat(c.id); setPage("shop"); }} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "10px", padding: "9px 4px", color: C.text, textAlign: "center" }}>
                <div style={{ fontSize: "1.2rem" }}>{c.icon}</div>
                <div style={{ fontSize: "0.55rem", marginTop: "3px", color: "rgba(240,253,244,0.55)" }}>{c.label}</div>
              </button>
            ))}
          </div>

          {/* Featured */}
          <div style={{ fontSize: "0.65rem", color: "rgba(240,253,244,0.35)", letterSpacing: "1px", marginBottom: "6px" }}>FEATURED PRODUCTS</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {PRODUCTS.slice(0, 6).map(p => (
              <div key={p.id} className="c" onClick={() => { setSelected(p); setPage("product"); }} style={{ ...card }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                  <div style={{ fontSize: "1.9rem" }}>{p.icon}</div>
                  <button className="b" onClick={e => { e.stopPropagation(); toggleWish(p); }} style={{ background: "transparent", border: "none", fontSize: "0.85rem" }}>{inWish(p.id) ? "❤️" : "🤍"}</button>
                </div>
                <div style={{ fontWeight: 700, fontSize: "0.73rem", marginBottom: "2px", lineHeight: 1.3 }}>{p.name}</div>
                <div style={{ color: C.accent, fontWeight: 800, fontSize: "0.85rem", marginBottom: "2px" }}>${p.price}</div>
                <div style={{ fontSize: "0.58rem", color: "rgba(240,253,244,0.35)", marginBottom: "5px" }}>⭐{p.rating} · 📍{p.location}</div>
                {p.badge && <span style={{ background: "rgba(34,197,94,0.1)", color: C.accent, borderRadius: "6px", padding: "1px 6px", fontSize: "0.52rem", fontWeight: 700 }}>{p.badge}</span>}
                <button className="b" onClick={e => { e.stopPropagation(); addToCart(p); }} style={{ display: "block", marginTop: "7px", width: "100%", background: C.accent, border: "none", borderRadius: "7px", padding: "5px", color: "#052e16", fontWeight: 700, fontSize: "0.62rem" }}>Add to Cart</button>
              </div>
            ))}
          </div>
        </div>}

        {/* ── SHOP ── */}
        {page === "shop" && <div style={pw} className="fd">
          <div style={{ display: "flex", gap: "5px", overflowX: "auto", scrollbarWidth: "none", paddingBottom: "7px", marginBottom: "7px" }}>
            {CATEGORIES.map(c => (
              <button key={c.id} className={`t${cat === c.id ? " on" : ""}`} onClick={() => setCat(c.id)} style={{ background: cat === c.id ? "rgba(34,197,94,0.14)" : "transparent", border: `1px solid ${cat === c.id ? C.accent : C.border}`, borderRadius: "16px", padding: "5px 10px", color: cat === c.id ? C.accent : "rgba(240,253,244,0.48)", fontSize: "0.65rem", whiteSpace: "nowrap", fontWeight: cat === c.id ? 700 : 400 }}>{c.icon} {c.label}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: "5px", marginBottom: "9px", flexWrap: "wrap", alignItems: "center" }}>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${C.border}`, borderRadius: "7px", color: C.text, padding: "5px 7px", fontSize: "0.68rem", cursor: "pointer" }}>
              <option value="popular" style={{ background: "#0a1208" }}>Most Popular</option>
              <option value="rating" style={{ background: "#0a1208" }}>Top Rated</option>
              <option value="price_asc" style={{ background: "#0a1208" }}>Price ↑</option>
              <option value="price_desc" style={{ background: "#0a1208" }}>Price ↓</option>
            </select>
            <button className="b" onClick={() => setShowFilters(!showFilters)} style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${C.border}`, borderRadius: "7px", padding: "5px 9px", color: C.text, fontSize: "0.68rem" }}>⚙️ Filter</button>
            <span style={{ fontSize: "0.65rem", color: "rgba(240,253,244,0.35)", marginLeft: "auto" }}>{filtered.length} results</span>
          </div>
          {showFilters && <div style={{ ...card, marginBottom: "9px" }}>
            <div style={{ fontSize: "0.72rem", color: C.gold, marginBottom: "6px", fontWeight: 700 }}>Max Price: ${priceMax}</div>
            <input type="range" min="0" max="200" value={priceMax} onChange={e => setPriceMax(parseInt(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
          </div>}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {filtered.map(p => (
              <div key={p.id} className="c" onClick={() => { setSelected(p); setPage("product"); }} style={{ ...card }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <div style={{ fontSize: "1.8rem" }}>{p.icon}</div>
                  <div style={{ display: "flex", gap: "3px" }}>
                    <button className="b" onClick={e => { e.stopPropagation(); setCompareList(c => c.find(i => i.id === p.id) ? c.filter(i => i.id !== p.id) : [...c.slice(-1), p]); }} style={{ background: "transparent", border: "none", fontSize: "0.72rem" }}>{compareList.find(i => i.id === p.id) ? "⚖️" : "○"}</button>
                    <button className="b" onClick={e => { e.stopPropagation(); toggleWish(p); }} style={{ background: "transparent", border: "none", fontSize: "0.78rem" }}>{inWish(p.id) ? "❤️" : "🤍"}</button>
                  </div>
                </div>
                <div style={{ fontWeight: 700, fontSize: "0.7rem", marginBottom: "2px", lineHeight: 1.3 }}>{p.name}</div>
                <div style={{ color: C.accent, fontWeight: 800, fontSize: "0.82rem", marginBottom: "2px" }}>${p.price}</div>
                <div style={{ fontSize: "0.56rem", color: "rgba(240,253,244,0.35)", marginBottom: "4px" }}>⭐{p.rating} ({p.reviews}) · 📍{p.location}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
                  {p.badge && <span style={{ background: "rgba(34,197,94,0.1)", color: C.accent, borderRadius: "5px", padding: "1px 5px", fontSize: "0.5rem", fontWeight: 700 }}>{p.badge}</span>}
                  <span style={{ fontSize: "0.5rem", color: "rgba(240,253,244,0.28)" }}>🚚{p.delivery}</span>
                </div>
                <button className="b" onClick={e => { e.stopPropagation(); addToCart(p); }} style={{ width: "100%", background: C.accent, border: "none", borderRadius: "7px", padding: "5px", color: "#052e16", fontWeight: 700, fontSize: "0.62rem" }}>🛒 Add</button>
              </div>
            ))}
          </div>
        </div>}

        {/* ── PRODUCT DETAIL ── */}
        {page === "product" && selected && <div style={pw} className="fd">
          <button className="b" onClick={() => setPage("shop")} style={{ background: "rgba(255,255,255,0.06)", border: "none", borderRadius: "7px", padding: "5px 10px", color: C.text, fontSize: "0.72rem", marginBottom: "10px" }}>← Back</button>
          <div style={{ ...card, marginBottom: "10px", textAlign: "center" }}>
            <div style={{ fontSize: "4rem", marginBottom: "9px" }}>{selected.icon}</div>
            {selected.badge && <span style={{ background: "rgba(34,197,94,0.12)", color: C.accent, borderRadius: "7px", padding: "2px 9px", fontSize: "0.65rem", fontWeight: 700, display: "inline-block", marginBottom: "7px" }}>{selected.badge}</span>}
            <div style={{ fontWeight: 800, fontSize: "1rem", marginBottom: "4px" }}>{selected.name}</div>
            <div style={{ color: C.accent, fontWeight: 900, fontSize: "1.5rem", marginBottom: "7px" }}>${selected.price}</div>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap", marginBottom: "9px", fontSize: "0.68rem", color: "rgba(240,253,244,0.5)" }}>
              <span>⭐{selected.rating} ({selected.reviews})</span>
              <span>📦{selected.stock} in stock</span>
              <span>🚚{selected.delivery}</span>
            </div>
            <p style={{ fontSize: "0.75rem", color: "rgba(240,253,244,0.52)", lineHeight: 1.6, marginBottom: "10px" }}>{selected.desc}</p>
            <div style={{ background: "rgba(34,197,94,0.06)", borderRadius: "9px", padding: "9px", marginBottom: "11px", textAlign: "left" }}>
              <div style={{ fontWeight: 700, fontSize: "0.77rem", color: C.accent }}>👤 {selected.seller}</div>
              <div style={{ fontSize: "0.65rem", color: "rgba(240,253,244,0.42)" }}>📍 {selected.location}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "11px", marginBottom: "11px" }}>
              <button className="b" onClick={() => setQty(q => Math.max(1, q - 1))} style={{ background: "rgba(255,255,255,0.08)", border: `1px solid ${C.border}`, borderRadius: "8px", padding: "6px 13px", color: C.text }}>−</button>
              <span style={{ fontWeight: 700, fontSize: "1rem", minWidth: "26px", textAlign: "center" }}>{qty}</span>
              <button className="b" onClick={() => setQty(q => q + 1)} style={{ background: "rgba(255,255,255,0.08)", border: `1px solid ${C.border}`, borderRadius: "8px", padding: "6px 13px", color: C.text }}>+</button>
            </div>
            <div style={{ display: "flex", gap: "7px" }}>
              <button className="b" onClick={() => addToCart(selected, qty)} style={{ ...bigBtn(), flex: 1 }}>🛒 Add to Cart (${(selected.price * qty).toFixed(2)})</button>
              <button className="b" onClick={() => toggleWish(selected)} style={{ background: "rgba(255,255,255,0.07)", border: `1px solid ${C.border}`, borderRadius: "10px", padding: "11px 13px", color: C.text }}>{inWish(selected.id) ? "❤️" : "🤍"}</button>
            </div>
          </div>

          {/* Payment methods */}
          <div style={{ ...card, marginBottom: "10px" }}>
            <div style={{ fontWeight: 700, fontSize: "0.8rem", color: C.gold, marginBottom: "9px" }}>💳 Payment Methods Available</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
              {PAYMENT_METHODS.map(m => (
                <div key={m.id} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}`, borderRadius: "9px", padding: "7px" }}>
                  <div style={{ fontSize: "0.9rem", marginBottom: "1px" }}>{m.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: "0.67rem", color: C.text }}>{m.label}</div>
                  <div style={{ fontSize: "0.52rem", color: C.gold }}>Fee: {m.fee}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div style={{ ...card, marginBottom: "10px" }}>
            <div style={{ fontWeight: 700, fontSize: "0.8rem", color: C.gold, marginBottom: "9px" }}>⭐ Reviews ({selected.reviews + (userReviews[selected.id]?.length || 0)})</div>
            {(userReviews[selected.id] || []).map((r, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: "8px", padding: "7px", marginBottom: "5px" }}>
                <div style={{ fontSize: "0.68rem", fontWeight: 600 }}>⭐⭐⭐⭐⭐</div>
                <div style={{ fontSize: "0.68rem", color: "rgba(240,253,244,0.55)", marginTop: "2px" }}>{r.text}</div>
              </div>
            ))}
            <div style={{ display: "flex", gap: "5px", marginTop: "7px" }}>
              <input value={reviewText} onChange={e => setReviewText(e.target.value)} placeholder="Write a review..." style={{ ...inp, marginBottom: 0, flex: 1, padding: "7px 10px" }} />
              <button className="b" onClick={() => { if (reviewText.trim()) { setUserReviews(r => ({ ...r, [selected.id]: [...(r[selected.id] || []), { text: reviewText }] })); setReviewText(""); notify("⭐ Review posted!"); } }} style={{ background: C.accent, border: "none", borderRadius: "7px", padding: "7px 11px", color: "#052e16", fontWeight: 700, fontSize: "0.7rem", flexShrink: 0 }}>Post</button>
            </div>
          </div>

          {/* Similar */}
          <div style={{ fontSize: "0.65rem", color: "rgba(240,253,244,0.35)", letterSpacing: "1px", marginBottom: "6px" }}>SIMILAR PRODUCTS</div>
          <div style={{ display: "flex", gap: "7px", overflowX: "auto", scrollbarWidth: "none" }}>
            {PRODUCTS.filter(p => p.category === selected.category && p.id !== selected.id).slice(0, 4).map(p => (
              <div key={p.id} className="c b" onClick={() => { setSelected(p); setQty(1); }} style={{ minWidth: "100px", background: C.card, border: `1px solid ${C.border}`, borderRadius: "11px", padding: "9px", textAlign: "center", flexShrink: 0 }}>
                <div style={{ fontSize: "1.7rem", marginBottom: "3px" }}>{p.icon}</div>
                <div style={{ fontSize: "0.58rem", fontWeight: 600, marginBottom: "2px", lineHeight: 1.3 }}>{p.name.substring(0, 14)}...</div>
                <div style={{ color: C.accent, fontWeight: 800, fontSize: "0.75rem" }}>${p.price}</div>
              </div>
            ))}
          </div>
        </div>}

        {/* ── AI ASSISTANT ── */}
        {page === "ai" && <div style={pw} className="fd">
          <h2 style={{ fontWeight: 800, fontSize: "1rem", color: C.gold, marginBottom: "5px" }}>🤖 AI Shopping Assistant</h2>
          <p style={{ fontSize: "0.72rem", color: "rgba(240,253,244,0.42)", marginBottom: "12px", lineHeight: 1.6 }}>Powered by Claude AI. Ask about products, prices, best deals, farming advice and more!</p>
          <div style={{ ...card, marginBottom: "11px", borderColor: "rgba(34,197,94,0.25)" }}>
            <div style={{ display: "flex", gap: "6px", marginBottom: "8px" }}>
              <input value={aiQ} onChange={e => setAiQ(e.target.value)} onKeyDown={e => e.key === "Enter" && askAI()} placeholder="e.g. Best solar panel for a 3-bedroom home?" style={{ ...inp, flex: 1, marginBottom: 0, minWidth: 0, padding: "8px 11px" }} />
              <button className="b" onClick={askAI} disabled={aiLoad} style={{ background: C.accent, border: "none", borderRadius: "8px", padding: "8px 13px", color: "#052e16", fontWeight: 800, flexShrink: 0 }}>{aiLoad ? "..." : "Ask"}</button>
            </div>
            {aiLoad && <div style={{ textAlign: "center", padding: "16px" }}><div className="pl" style={{ fontSize: "1.8rem" }}>🤖</div></div>}
            {aiR && <div className="fd" style={{ background: "rgba(34,197,94,0.06)", borderRadius: "9px", padding: "10px", fontSize: "0.8rem", lineHeight: 1.7 }}>{aiR}</div>}
          </div>
          <div style={{ fontSize: "0.65rem", color: "rgba(240,253,244,0.35)", letterSpacing: "1px", marginBottom: "6px" }}>POPULAR QUESTIONS</div>
          {["Best farming products for Nigeria?", "How to pay safely on WorldShop?", "Solar panel for 3-bedroom home?", "How to start selling on WorldShop?", "Cheapest electronics in Ghana?"].map(q => (
            <button key={q} className="b" onClick={() => { setAiQ(q); askAI(); }} style={{ display: "block", width: "100%", background: C.card, border: `1px solid ${C.border}`, borderRadius: "9px", padding: "8px 12px", color: "rgba(240,253,244,0.62)", fontSize: "0.72rem", textAlign: "left", marginBottom: "6px" }}>💬 {q}</button>
          ))}
        </div>}

        {/* ── ORDERS ── */}
        {page === "track" && <div style={pw} className="fd">
          <h2 style={{ fontWeight: 800, fontSize: "1rem", color: C.gold, marginBottom: "12px" }}>📦 My Orders ({orders.length})</h2>
          {orders.length === 0 ? <div style={{ ...card, textAlign: "center", padding: "32px" }}>
            <div style={{ fontSize: "2.8rem", marginBottom: "8px" }}>📦</div>
            <div style={{ color: "rgba(240,253,244,0.35)", fontSize: "0.8rem", marginBottom: "11px" }}>No orders yet!</div>
            <button className="b" onClick={() => setPage("shop")} style={{ background: C.accent, border: "none", borderRadius: "9px", padding: "8px 16px", color: "#052e16", fontWeight: 700 }}>Start Shopping</button>
          </div> : orders.map((o, oi) => (
            <div key={o.id} style={{ ...card, marginBottom: "9px", borderColor: oi === 0 ? "rgba(34,197,94,0.28)" : C.border }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "9px", flexWrap: "wrap", gap: "3px" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.78rem", color: C.accent }}>#{o.id}</div>
                  <div style={{ fontSize: "0.62rem", color: "rgba(240,253,244,0.38)" }}>{o.date} · {o.items.length} items · ${o.total.toFixed(2)} · {PAYMENT_METHODS.find(m => m.id === o.method)?.label}</div>
                </div>
                <span style={{ background: "rgba(34,197,94,0.1)", color: C.accent, borderRadius: "7px", padding: "2px 8px", fontSize: "0.62rem", fontWeight: 700 }}>{o.status}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "7px" }}>
                {o.steps.map((s, si) => (
                  <div key={s} style={{ textAlign: "center", flex: 1 }}>
                    <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: si < o.current ? C.accent : "rgba(255,255,255,0.08)", margin: "0 auto 2px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.55rem", fontWeight: 800, color: si < o.current ? "#052e16" : "#555" }}>{si < o.current ? "✓" : si + 1}</div>
                    <div style={{ fontSize: "0.48rem", color: si < o.current ? C.accent : "rgba(240,253,244,0.28)", lineHeight: 1.2 }}>{s}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                {o.items.slice(0, 3).map(item => (
                  <div key={item.id} style={{ background: "rgba(255,255,255,0.04)", borderRadius: "7px", padding: "4px 7px", fontSize: "0.6rem" }}>{item.icon} ×{item.qty}</div>
                ))}
              </div>
              {o.address && <div style={{ marginTop: "7px", fontSize: "0.62rem", color: "rgba(240,253,244,0.38)" }}>📍 Delivering to: {o.address.name}, {o.address.city}, {o.address.country}</div>}
              {o.tracking && <div style={{ marginTop: "5px", background: "rgba(245,158,11,0.08)", borderRadius: "7px", padding: "7px 10px", fontSize: "0.68rem" }}>
                <span style={{ color: C.gold, fontWeight: 700 }}>📦 Tracking Number: </span>
                <span style={{ color: C.text }}>{o.tracking}</span>
              </div>}
              <div style={{ marginTop: "10px", background: "rgba(34,197,94,0.06)", borderRadius: "9px", padding: "10px" }}>
                <div style={{ fontSize: "0.68rem", color: C.gold, fontWeight: 700, marginBottom: "6px" }}>🔒 Payment in Escrow: ${o.total.toFixed(2)}</div>
                <div style={{ fontSize: "0.62rem", color: "rgba(240,253,244,0.5)", marginBottom: "8px" }}>Your payment is safely held. It will only be released to the seller when YOU confirm delivery!</div>
                {o.status !== "Delivered" && o.status !== "Disputed" && <div style={{ display: "flex", gap: "6px" }}>
                  <button className="b" onClick={() => {
                    setOrders(prev => prev.map(ord => ord.id === o.id ? { ...ord, status: "Delivered", current: 5 } : ord));
                    setEscrowBalance(prev => Math.max(0, prev - o.total));
                    notify("✅ Delivery confirmed! Payment released to seller!");
                  }} style={{ flex: 1, background: C.accent, border: "none", borderRadius: "8px", padding: "8px", color: "#052e16", fontWeight: 700, fontSize: "0.72rem" }}>✅ I Received My Order — Release Payment</button>
                  <button className="b" onClick={() => {
                    setOrders(prev => prev.map(ord => ord.id === o.id ? { ...ord, status: "Disputed" } : ord));
                    setDisputes(prev => [...prev, { orderId: o.id, amount: o.total, date: new Date().toLocaleDateString() }]);
                    notify("⚠️ Dispute opened! Payment held. We will investigate!");
                  }} style={{ flex: 1, background: "rgba(239,68,68,0.12)", border: "none", borderRadius: "8px", padding: "8px", color: C.red, fontWeight: 700, fontSize: "0.72rem" }}>⚠️ Problem — Open Dispute</button>
                </div>}
                {o.status === "Delivered" && <div style={{ fontSize: "0.72rem", color: C.accent, fontWeight: 600 }}>✅ Payment released to seller! Thank you!</div>}
                {o.status === "Disputed" && <div style={{ fontSize: "0.72rem", color: C.red, fontWeight: 600 }}>⚠️ Dispute open — payment held. WorldShop is investigating!</div>}
              </div>
            </div>
          ))}
        </div>}

        {/* ── SELL / SELLER DASHBOARD ── */}
        {page === "sell" && <div style={pw} className="fd">
          <h2 style={{ fontWeight: 800, fontSize: "1rem", color: C.gold, marginBottom: "5px" }}>💰 Seller Dashboard</h2>
          <p style={{ fontSize: "0.75rem", color: "rgba(240,253,244,0.42)", marginBottom: "12px" }}>List products, track sales, manage your business on WorldShop.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "6px", marginBottom: "12px" }}>
            {[[`${sellerProds.length}`, "Products"], ["$" + sellerProds.reduce((s, p) => s + p.price * 5, 0).toFixed(0), "Revenue"], ["⭐ 5.0", "Rating"]].map(([n, l]) => (
              <div key={l} style={{ ...card, textAlign: "center", padding: "9px" }}>
                <div style={{ fontWeight: 900, fontSize: "0.95rem", color: C.accent }}>{n}</div>
                <div style={{ fontSize: "0.58rem", color: "rgba(240,253,244,0.4)", marginTop: "2px" }}>{l}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", marginBottom: "12px" }}>
            {[["🆓", "Free Listing", "No fees to list products"], ["🚚", "We Deliver", "Delivery handled for you"], ["💳", "Paid 24hrs", "Fast payment to your bank"], ["🤖", "AI Descriptions", "Auto-write product details"]].map(([icon, title, desc]) => (
              <div key={title} style={{ ...card, padding: "9px" }}>
                <div style={{ fontSize: "1.1rem", marginBottom: "3px" }}>{icon}</div>
                <div style={{ fontWeight: 700, fontSize: "0.72rem", color: C.accent, marginBottom: "2px" }}>{title}</div>
                <div style={{ fontSize: "0.62rem", color: "rgba(240,253,244,0.45)" }}>{desc}</div>
              </div>
            ))}
          </div>

          <div style={{ ...card, borderColor: "rgba(34,197,94,0.25)", marginBottom: "12px" }}>
            <div style={{ fontWeight: 700, fontSize: "0.85rem", color: C.gold, marginBottom: "10px" }}>📝 List New Product</div>
            <input value={newProd.name} onChange={e => setNewProd(p => ({ ...p, name: e.target.value }))} placeholder="Product name *" style={inp} />
            <div style={{ display: "flex", gap: "6px", marginBottom: "8px" }}>
              <input value={newProd.price} onChange={e => setNewProd(p => ({ ...p, price: e.target.value }))} placeholder="Price ($) *" type="number" style={{ ...inp, flex: 1, marginBottom: 0 }} />
              <input value={newProd.stock} onChange={e => setNewProd(p => ({ ...p, stock: e.target.value }))} placeholder="Stock qty" type="number" style={{ ...inp, flex: 1, marginBottom: 0 }} />
            </div>
            <div style={{ display: "flex", gap: "6px", marginBottom: "8px" }}>
              <select value={newProd.category} onChange={e => setNewProd(p => ({ ...p, category: e.target.value }))} style={{ ...inp, flex: 1, marginBottom: 0, cursor: "pointer" }}>
                {CATEGORIES.filter(c => c.id !== "all").map(c => <option key={c.id} value={c.id} style={{ background: "#0a1208" }}>{c.icon} {c.label}</option>)}
              </select>
              <input value={newProd.location} onChange={e => setNewProd(p => ({ ...p, location: e.target.value }))} placeholder="City, Country" style={{ ...inp, flex: 1, marginBottom: 0 }} />
            </div>
            <div style={{ position: "relative", marginBottom: "8px" }}>
              <textarea value={newProd.desc} onChange={e => setNewProd(p => ({ ...p, desc: e.target.value }))} placeholder="Product description..." rows={3} style={{ ...inp, resize: "vertical", marginBottom: 0 }} />
              <button className="b" onClick={genDesc} disabled={aiDescLoad} style={{ position: "absolute", right: "7px", bottom: "7px", background: "rgba(34,197,94,0.15)", border: `1px solid ${C.border}`, borderRadius: "6px", padding: "3px 8px", color: C.accent, fontSize: "0.58rem", fontWeight: 700 }}>{aiDescLoad ? "..." : "🤖 AI Write"}</button>
            </div>
            <button className="b" onClick={submitProd} style={{ ...bigBtn() }}>🚀 List Product — FREE</button>
          </div>

          {/* Connect bank info */}
          <div style={{ ...card, borderColor: "rgba(245,158,11,0.25)" }}>
            <div style={{ fontWeight: 700, fontSize: "0.82rem", color: C.gold, marginBottom: "8px" }}>🏦 Connect Your Bank / Mobile Money</div>
            <p style={{ fontSize: "0.72rem", color: "rgba(240,253,244,0.5)", lineHeight: 1.6, marginBottom: "10px" }}>To receive payments, connect your bank account or mobile money via Flutterwave.</p>
            <div style={{ display: "grid", gap: "6px" }}>
              {[["🦋", "Flutterwave", "For bank transfers, cards, mobile money across Africa"],["📱", "M-Pesa", "For Kenyan sellers — receive directly to M-Pesa"],["🔵", "OPay", "For Nigerian sellers — receive to OPay wallet"],["₿", "Crypto", "Receive USDT or SOL directly to your wallet"]].map(([icon, name, desc]) => (
                <div key={name} style={{ display: "flex", gap: "9px", alignItems: "center", background: "rgba(255,255,255,0.03)", borderRadius: "9px", padding: "9px" }}>
                  <span style={{ fontSize: "1.2rem" }}>{icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: "0.75rem", color: C.accent }}>{name}</div>
                    <div style={{ fontSize: "0.62rem", color: "rgba(240,253,244,0.45)" }}>{desc}</div>
                  </div>
                  <button className="b" style={{ background: "rgba(34,197,94,0.12)", border: `1px solid ${C.border}`, borderRadius: "7px", padding: "5px 9px", color: C.accent, fontSize: "0.62rem", fontWeight: 700 }}>Connect</button>
                </div>
              ))}
            </div>
          </div>

          {/* Seller Order Alerts */}
          {sellerAlerts.length > 0 && <div style={{ marginTop: "12px", marginBottom: "12px" }}>
            <div style={{ fontWeight: 700, fontSize: "0.82rem", color: C.red, marginBottom: "9px", display: "flex", alignItems: "center", gap: "7px" }}>
              🔔 New Orders — Action Required!
              <span style={{ background: C.red, color: "#fff", borderRadius: "50%", width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: 800 }}>{sellerAlerts.filter(a => a.status === "pending").length}</span>
            </div>
            {sellerAlerts.map(alert => (
              <div key={alert.id} style={{ ...card, marginBottom: "8px", borderColor: alert.status === "pending" ? "rgba(239,68,68,0.4)" : alert.status === "confirmed" ? "rgba(34,197,94,0.4)" : "rgba(255,255,255,0.1)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "7px", flexWrap: "wrap", gap: "4px" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.78rem" }}>{alert.icon} {alert.product} ×{alert.qty}</div>
                    <div style={{ fontSize: "0.65rem", color: C.dim }}>Buyer: {alert.buyer} · ${alert.amount} · {alert.time}</div>
                  </div>
                  <span style={{ background: alert.status === "pending" ? "rgba(239,68,68,0.15)" : alert.status === "confirmed" ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.08)", color: alert.status === "pending" ? C.red : alert.status === "confirmed" ? C.accent : C.dim, borderRadius: "7px", padding: "2px 8px", fontSize: "0.62rem", fontWeight: 700 }}>
                    {alert.status === "pending" ? "⏰ ACTION NEEDED" : alert.status === "confirmed" ? "✅ Confirmed" : "❌ Cancelled"}
                  </span>
                </div>
                {alert.status === "pending" && <div style={{ fontSize: "0.65rem", color: C.gold, marginBottom: "8px" }}>⚠️ Confirm by: {alert.deadline} or order auto-cancels!</div>}
                {alert.status === "pending" && <div style={{ display: "flex", gap: "6px" }}>
                  <button className="b" onClick={() => { setSellerAlerts(prev => prev.map(a => a.id === alert.id ? { ...a, status: "confirmed" } : a)); notify("✅ Order confirmed! Pack it now!"); }} style={{ flex: 1, background: C.accent, border: "none", borderRadius: "8px", padding: "7px", color: "#052e16", fontWeight: 700, fontSize: "0.72rem" }}>✅ I Have Stock — Confirm</button>
                  <button className="b" onClick={() => { setSellerAlerts(prev => prev.map(a => a.id === alert.id ? { ...a, status: "cancelled" } : a)); notify("❌ Order cancelled — buyer refunded"); }} style={{ flex: 1, background: "rgba(239,68,68,0.12)", border: "none", borderRadius: "8px", padding: "7px", color: C.red, fontWeight: 700, fontSize: "0.72rem" }}>❌ Out of Stock</button>
                </div>}
                {alert.status === "confirmed" && <div style={{ background: "rgba(34,197,94,0.08)", borderRadius: "8px", padding: "8px" }}>
                  <div style={{ fontSize: "0.72rem", color: C.accent, marginBottom: "7px" }}>✅ Pack this order and hand to delivery! Buyer: {alert.buyer}</div>
                  {trackingNumbers[alert.id] ? (
                    <div style={{ fontSize: "0.72rem", color: C.gold, fontWeight: 600 }}>📦 Tracking: {trackingNumbers[alert.id]} — Buyer notified!</div>
                  ) : (
                    <div style={{ display: "flex", gap: "6px" }}>
                      <input value={trackingInput[alert.id] || ""} onChange={e => setTrackingInput(prev => ({...prev, [alert.id]: e.target.value}))} placeholder="Enter tracking number..." style={{ ...inp, flex: 1, marginBottom: 0, padding: "6px 10px", fontSize: "0.72rem" }} />
                      <button className="b" onClick={() => {
                        if(trackingInput[alert.id]) {
                          setTrackingNumbers(prev => ({...prev, [alert.id]: trackingInput[alert.id]}));
                          setOrders(prev => prev.map(o => o.id === alert.orderId ? {...o, tracking: trackingInput[alert.id], status: "Shipped", current: 4} : o));
                          notify("📦 Tracking number added! Buyer notified!");
                        }
                      }} style={{ background: C.accent, border: "none", borderRadius: "8px", padding: "6px 11px", color: "#052e16", fontWeight: 700, fontSize: "0.68rem", flexShrink: 0 }}>Add</button>
                    </div>
                  )}
                </div>}
                {alert.status === "cancelled" && <div style={{ background: "rgba(239,68,68,0.08)", borderRadius: "8px", padding: "8px", fontSize: "0.72rem", color: C.red }}>❌ Order cancelled. Buyer will be refunded automatically.</div>}
              </div>
            ))}
          </div>}

          {sellerProds.length > 0 && <div style={{ marginTop: "12px" }}>
            <div style={{ fontSize: "0.65rem", color: "rgba(240,253,244,0.35)", letterSpacing: "1px", marginBottom: "6px" }}>MY PRODUCTS ({sellerProds.length})</div>
            {sellerProds.map(p => (
              <div key={p.id} style={{ ...card, marginBottom: "6px", display: "flex", alignItems: "center", gap: "9px" }}>
                <span style={{ fontSize: "1.5rem" }}>{p.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: "0.75rem" }}>{p.name}</div>
                  <div style={{ fontSize: "0.62rem", color: "rgba(240,253,244,0.4)" }}>${p.price} · {p.stock} in stock · 📍{p.location}</div>
                </div>
                <span style={{ background: "rgba(34,197,94,0.1)", color: C.accent, borderRadius: "6px", padding: "2px 7px", fontSize: "0.58rem", fontWeight: 700 }}>Active</span>
              </div>
            ))}
          </div>}
        </div>}

        {/* ── DASHBOARD ── */}
        {page === "dashboard" && <div style={pw} className="fd">
          <h2 style={{ fontWeight: 800, fontSize: "1rem", color: C.gold, marginBottom: "12px" }}>📊 Business Analytics</h2>
          <div style={{ ...card, marginBottom: "12px", borderColor: "rgba(245,158,11,0.3)", background: "rgba(245,158,11,0.06)" }}>
            <div style={{ fontWeight: 700, fontSize: "0.85rem", color: C.gold, marginBottom: "5px" }}>🔒 Escrow Balance</div>
            <div style={{ fontWeight: 900, fontSize: "1.5rem", color: C.accent }}>${escrowBalance.toFixed(2)}</div>
            <div style={{ fontSize: "0.68rem", color: "rgba(240,253,244,0.5)", marginTop: "3px" }}>Payments held safely until buyers confirm delivery</div>
            {disputes.length > 0 && <div style={{ marginTop: "8px", fontSize: "0.72rem", color: C.red, fontWeight: 600 }}>⚠️ {disputes.length} active dispute(s) — review needed!</div>}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "7px", marginBottom: "12px" }}>
            {[["💰", "Revenue", "$" + sellerProds.reduce((s, p) => s + p.price * 5, 0).toFixed(0)], ["📦", "Orders", orders.length], ["👥", "Customers", orders.length * 3], ["⭐", "Rating", "5.0"]].map(([icon, label, val]) => (
              <div key={label} style={{ ...card, padding: "11px" }}>
                <div style={{ fontSize: "1.2rem", marginBottom: "4px" }}>{icon}</div>
                <div style={{ fontSize: "0.6rem", color: "rgba(240,253,244,0.4)", marginBottom: "2px" }}>{label}</div>
                <div style={{ fontWeight: 900, fontSize: "1.05rem", color: C.accent }}>{val}</div>
              </div>
            ))}
          </div>
          <div style={{ ...card, marginBottom: "12px" }}>
            <div style={{ fontWeight: 700, fontSize: "0.8rem", color: C.gold, marginBottom: "9px" }}>📈 Weekly Sales</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "5px", height: "70px" }}>
              {[30, 55, 40, 70, 45, 90, 65].map((h, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                  <div style={{ width: "100%", background: `rgba(34,197,94,${h / 100})`, borderRadius: "3px 3px 0 0", height: `${h}%` }} />
                  <div style={{ fontSize: "0.5rem", color: "rgba(240,253,244,0.3)" }}>{["M", "T", "W", "T", "F", "S", "S"][i]}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ ...card, marginBottom: "12px" }}>
            <div style={{ fontWeight: 700, fontSize: "0.8rem", color: C.gold, marginBottom: "9px" }}>🏆 Top Products</div>
            {PRODUCTS.slice(0, 5).map((p, i) => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "7px" }}>
                <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: i === 0 ? C.gold : "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.58rem", fontWeight: 800, color: i === 0 ? "#451a03" : "#666", flexShrink: 0 }}>{i + 1}</div>
                <span style={{ fontSize: "1rem" }}>{p.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: "0.72rem" }}>{p.name}</div>
                  <div style={{ fontSize: "0.57rem", color: "rgba(240,253,244,0.38)" }}>{p.reviews} orders</div>
                </div>
                <div style={{ fontWeight: 700, fontSize: "0.75rem", color: C.accent }}>${p.price}</div>
              </div>
            ))}
          </div>
          <div style={{ ...card }}>
            <div style={{ fontWeight: 700, fontSize: "0.8rem", color: C.gold, marginBottom: "9px" }}>💳 Payment Breakdown</div>
            {[["🦋 Flutterwave", "45%"], ["📱 M-Pesa", "28%"], ["💵 Cash", "18%"], ["🔵 OPay", "9%"]].map(([m, p]) => (
              <div key={m} style={{ marginBottom: "7px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                  <div style={{ fontSize: "0.68rem" }}>{m}</div>
                  <div style={{ fontSize: "0.68rem", color: C.accent }}>{p}</div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: "3px", height: "5px" }}>
                  <div style={{ background: C.accent, borderRadius: "3px", height: "100%", width: p }} />
                </div>
              </div>
            ))}
          </div>
        </div>}

        {/* ── WISHLIST ── */}
        {page === "wishlist" && <div style={pw} className="fd">
          <h2 style={{ fontWeight: 800, fontSize: "1rem", color: C.gold, marginBottom: "12px" }}>❤️ Wishlist ({wishlist.length})</h2>
          {wishlist.length === 0 ? <div style={{ ...card, textAlign: "center", padding: "32px" }}>
            <div style={{ fontSize: "2.8rem", marginBottom: "8px" }}>🤍</div>
            <div style={{ color: "rgba(240,253,244,0.35)", fontSize: "0.8rem", marginBottom: "11px" }}>Nothing saved yet!</div>
            <button className="b" onClick={() => setPage("shop")} style={{ background: C.accent, border: "none", borderRadius: "9px", padding: "8px 16px", color: "#052e16", fontWeight: 700 }}>Browse Products</button>
          </div> : <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {wishlist.map(p => (
              <div key={p.id} style={{ ...card }}>
                <div style={{ fontSize: "1.9rem", textAlign: "center", marginBottom: "5px" }}>{p.icon}</div>
                <div style={{ fontWeight: 700, fontSize: "0.72rem", marginBottom: "2px" }}>{p.name}</div>
                <div style={{ color: C.accent, fontWeight: 800, marginBottom: "6px" }}>${p.price}</div>
                <div style={{ display: "flex", gap: "4px" }}>
                  <button className="b" onClick={() => addToCart(p)} style={{ flex: 1, background: C.accent, border: "none", borderRadius: "7px", padding: "5px", color: "#052e16", fontWeight: 700, fontSize: "0.62rem" }}>Add</button>
                  <button className="b" onClick={() => toggleWish(p)} style={{ background: "rgba(239,68,68,0.12)", border: "none", borderRadius: "7px", padding: "5px 8px", color: "#fca5a5", fontSize: "0.65rem" }}>✕</button>
                </div>
              </div>
            ))}
          </div>}
        </div>}

        {/* ── COMPARE ── */}
        {page === "compare" && <div style={pw} className="fd">
          <h2 style={{ fontWeight: 800, fontSize: "1rem", color: C.gold, marginBottom: "5px" }}>⚖️ Compare Products</h2>
          <p style={{ fontSize: "0.7rem", color: "rgba(240,253,244,0.4)", marginBottom: "12px" }}>Tap ○ on any product in Shop to add it here.</p>
          {compareList.length < 2 ? <div style={{ ...card, textAlign: "center", padding: "32px" }}>
            <div style={{ fontSize: "2.8rem", marginBottom: "8px" }}>⚖️</div>
            <div style={{ color: "rgba(240,253,244,0.35)", fontSize: "0.8rem", marginBottom: "11px" }}>Select 2 products to compare</div>
            <button className="b" onClick={() => setPage("shop")} style={{ background: C.accent, border: "none", borderRadius: "9px", padding: "8px 16px", color: "#052e16", fontWeight: 700 }}>Go to Shop</button>
          </div> : <>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${compareList.length},1fr)`, gap: "8px", marginBottom: "10px" }}>
              {compareList.map(p => (
                <div key={p.id} style={{ ...card, textAlign: "center" }}>
                  <div style={{ fontSize: "2.2rem", marginBottom: "5px" }}>{p.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: "0.72rem", marginBottom: "3px" }}>{p.name}</div>
                  <div style={{ color: C.accent, fontWeight: 800, fontSize: "0.95rem", marginBottom: "5px" }}>${p.price}</div>
                  <button className="b" onClick={() => addToCart(p)} style={{ width: "100%", background: C.accent, border: "none", borderRadius: "7px", padding: "5px", color: "#052e16", fontWeight: 700, fontSize: "0.62rem" }}>Add</button>
                </div>
              ))}
            </div>
            {[["⭐ Rating", ...compareList.map(p => p.rating)], ["📦 Stock", ...compareList.map(p => p.stock + " units")], ["🚚 Delivery", ...compareList.map(p => p.delivery)], ["📍 Location", ...compareList.map(p => p.location)], ["💬 Reviews", ...compareList.map(p => p.reviews)]].map(([label, ...vals]) => (
              <div key={label} style={{ display: "grid", gridTemplateColumns: `100px repeat(${compareList.length},1fr)`, gap: "5px", marginBottom: "5px", alignItems: "center" }}>
                <div style={{ fontSize: "0.65rem", color: "rgba(240,253,244,0.42)" }}>{label}</div>
                {vals.map((v, i) => <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: "6px", padding: "5px 8px", fontSize: "0.68rem", textAlign: "center", fontWeight: 600 }}>{v}</div>)}
              </div>
            ))}
          </>}
        </div>}

      </div>


      {/* ── MARKETING ── */}
      {page === "marketing" && <div style={pw} className="fd">
        <h2 style={{ fontWeight: 800, fontSize: "1rem", color: C.gold, marginBottom: "5px" }}>📣 Marketing Hub</h2>
        <p style={{ fontSize: "0.75rem", color: "rgba(240,253,244,0.42)", marginBottom: "13px" }}>Connect all ad platforms and grow WorldShop!</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "8px", marginBottom: "13px" }}>
          {[["👁️","24.5K","Reach"],["👆","846","Clicks"],["✅","55","Sales"],["💰","$1,240","Revenue"]].map(([icon,val,label])=>(
            <div key={label} style={{...card,textAlign:"center",padding:"10px"}}>
              <div style={{fontSize:"1.2rem",marginBottom:"3px"}}>{icon}</div>
              <div style={{fontWeight:900,fontSize:"0.95rem",color:C.accent}}>{val}</div>
              <div style={{fontSize:"0.58rem",color:"rgba(240,253,244,0.4)",marginTop:"2px"}}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{fontWeight:700,fontSize:"0.82rem",color:C.gold,marginBottom:"9px"}}>🔌 Ad Platforms</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"13px"}}>
          {[["📘","Facebook","50K/day","$5/day"],["📸","Instagram","30K/day","$5/day"],["🎵","TikTok","80K/day","$5/day"],["💬","WhatsApp","10K/day","FREE"],["🔍","Google Ads","20K/day","$3/day"],["💌","Email","5K/day","FREE"]].map(([icon,name,reach,cost])=>(
            <div key={name} style={{...card,display:"flex",alignItems:"center",gap:"9px"}}>
              <span style={{fontSize:"1.3rem"}}>{icon}</span>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:"0.75rem"}}>{name}</div>
                <div style={{fontSize:"0.62rem",color:"rgba(240,253,244,0.42)"}}>{reach} · {cost}</div>
              </div>
              <div style={{width:"30px",height:"17px",borderRadius:"9px",background:C.accent,position:"relative",flexShrink:0,cursor:"pointer"}}>
                <div style={{position:"absolute",width:"13px",height:"13px",borderRadius:"50%",background:"#fff",top:"2px",right:"2px"}}/>
              </div>
            </div>
          ))}
        </div>
        <div style={{fontWeight:700,fontSize:"0.82rem",color:C.gold,marginBottom:"9px"}}>🤖 AI Ad Generator</div>
        <div style={{...card,marginBottom:"13px",borderColor:"rgba(34,197,94,0.25)"}}>
          <p style={{fontSize:"0.75rem",color:"rgba(240,253,244,0.55)",marginBottom:"9px",lineHeight:1.6}}>Generate professional ad copy for any platform in 8 African languages using Claude AI.</p>
          <button className="b" onClick={()=>setPage("ai")} style={{width:"100%",background:C.accent,border:"none",borderRadius:"9px",padding:"10px",color:"#052e16",fontWeight:800,fontSize:"0.82rem"}}>🤖 Open AI Generator →</button>
        </div>
        <div style={{fontWeight:700,fontSize:"0.82rem",color:C.gold,marginBottom:"9px"}}>📈 Platform Performance</div>
        <div style={{...card,marginBottom:"13px"}}>
          {[["🎵 TikTok","85%"],["📘 Facebook","72%"],["💬 WhatsApp","65%"],["📸 Instagram","58%"],["🔍 Google","45%"],["💌 Email","32%"]].map(([name,pct])=>(
            <div key={name} style={{marginBottom:"8px"}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.72rem",marginBottom:"3px"}}>
                <span>{name}</span><span style={{color:C.accent,fontWeight:600}}>{pct}</span>
              </div>
              <div style={{background:"rgba(255,255,255,0.07)",borderRadius:"4px",height:"6px"}}>
                <div style={{background:C.accent,borderRadius:"4px",height:"100%",width:pct,opacity:0.8}}/>
              </div>
            </div>
          ))}
        </div>
        <div style={{fontWeight:700,fontSize:"0.82rem",color:C.gold,marginBottom:"9px"}}>🔗 Connect Tools</div>
        <div style={{display:"grid",gap:"6px"}}>
          {[["📘","Meta Ads Manager","facebook.com/ads"],["🎵","TikTok Ads","ads.tiktok.com"],["🔍","Google Ads","ads.google.com"],["💌","Mailchimp","mailchimp.com"],["⚡","Zapier","zapier.com"],["📊","Buffer","buffer.com"]].map(([icon,name,url])=>(
            <div key={name} style={{...card,display:"flex",alignItems:"center",gap:"10px"}}>
              <span style={{fontSize:"1.2rem"}}>{icon}</span>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:"0.75rem"}}>{name}</div>
                <div style={{fontSize:"0.62rem",color:"rgba(240,253,244,0.42)"}}>{url}</div>
              </div>
              <a href={"https://"+url} target="_blank" rel="noreferrer" style={{background:"rgba(34,197,94,0.12)",border:"1px solid rgba(34,197,94,0.2)",borderRadius:"7px",padding:"5px 10px",color:C.accent,fontSize:"0.65rem",fontWeight:700,textDecoration:"none"}}>Connect →</a>
            </div>
          ))}
        </div>
      </div>}

      {/* ── CART MODAL ── */}
      {showCart && <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "flex-end" }} onClick={() => setShowCart(false)}>
        <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: "900px", margin: "0 auto", background: "#0a1208", borderRadius: "20px 20px 0 0", border: `1px solid ${C.border}`, padding: "17px", maxHeight: "85vh", overflowY: "auto" }}>
          <div style={{ fontWeight: 800, fontSize: "0.95rem", color: C.gold, marginBottom: "12px" }}>🛒 Cart ({cartCount} items)</div>
          {cart.length === 0 ? <div style={{ textAlign: "center", padding: "24px", color: "rgba(240,253,244,0.35)" }}>Your cart is empty!</div> : <>
            {cart.map(item => (
              <div key={item.id} style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px", padding: "8px", background: "rgba(255,255,255,0.04)", borderRadius: "9px" }}>
                <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: "0.75rem" }}>{item.name}</div>
                  <div style={{ color: C.accent, fontWeight: 700, fontSize: "0.78rem" }}>${item.price} each</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <button className="b" onClick={() => updateQty(item.id, item.qty - 1)} style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: "5px", padding: "2px 7px", color: C.text }}>−</button>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, minWidth: "14px", textAlign: "center" }}>{item.qty}</span>
                  <button className="b" onClick={() => updateQty(item.id, item.qty + 1)} style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: "5px", padding: "2px 7px", color: C.text }}>+</button>
                </div>
                <div style={{ fontWeight: 700, color: C.accent, fontSize: "0.78rem", minWidth: "36px", textAlign: "right" }}>${(item.price * item.qty).toFixed(2)}</div>
                <button className="b" onClick={() => removeFromCart(item.id)} style={{ background: "rgba(239,68,68,0.12)", border: "none", borderRadius: "6px", padding: "3px 7px", color: "#fca5a5", fontSize: "0.65rem" }}>✕</button>
              </div>
            ))}
            <div style={{ display: "flex", gap: "5px", marginBottom: "9px" }}>
              <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Coupon code (try: AFRICA10)" style={{ ...inp, flex: 1, marginBottom: 0, padding: "7px 10px" }} />
              <button className="b" onClick={() => { if (coupon === "AFRICA10") { setCouponOk(true); notify("🎉 10% discount applied!"); } else notify("❌ Invalid coupon code"); }} style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.28)", borderRadius: "7px", padding: "7px 11px", color: C.gold, fontWeight: 700, fontSize: "0.68rem", flexShrink: 0 }}>Apply</button>
            </div>
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", marginBottom: "3px" }}><span style={{ color: "rgba(240,253,244,0.5)" }}>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
              {couponOk && <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", marginBottom: "3px" }}><span style={{ color: C.accent }}>Discount -10%</span><span style={{ color: C.accent }}>-${discount.toFixed(2)}</span></div>}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", marginBottom: "3px" }}><span style={{ color: "rgba(240,253,244,0.5)" }}>Delivery</span><span style={{ color: C.accent }}>FREE</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: "0.95rem", marginBottom: "12px", borderTop: `1px solid ${C.border}`, paddingTop: "7px" }}><span>Total</span><span style={{ color: C.accent }}>${finalTotal.toFixed(2)}</span></div>
              <button className="b" onClick={() => { setShowCart(false); setShowCheckout(true); }} style={{ ...bigBtn() }}>Checkout →</button>
            </div>
          </>}
        </div>
      </div>}

      {/* ── CHECKOUT MODAL ── */}
      {showCheckout && <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "flex-end" }} onClick={() => setShowCheckout(false)}>
        <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: "900px", margin: "0 auto", background: "#0a1208", borderRadius: "20px 20px 0 0", border: `1px solid ${C.border}`, padding: "17px", maxHeight: "90vh", overflowY: "auto" }}>
          <div style={{ display: "flex", gap: "5px", marginBottom: "14px" }}>
            {[1, 2, 3].map(s => (
              <div key={s} style={{ flex: 1, display: "flex", alignItems: "center", gap: "4px" }}>
                <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: step >= s ? C.accent : "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: 800, color: step >= s ? "#052e16" : "#777", flexShrink: 0 }}>{step > s ? "✓" : s}</div>
                <div style={{ fontSize: "0.6rem", color: step >= s ? C.accent : "rgba(240,253,244,0.3)", fontWeight: step >= s ? 700 : 400 }}>{["Address", "Payment", "Confirm"][s - 1]}</div>
                {s < 3 && <div style={{ flex: 1, height: "1px", background: step > s ? C.accent : "rgba(255,255,255,0.08)" }} />}
              </div>
            ))}
          </div>

          {step === 1 && <div className="fd">
            <div style={{ fontWeight: 700, fontSize: "0.85rem", color: C.gold, marginBottom: "10px" }}>📍 Delivery Address</div>
            <input value={address.name} onChange={e => setAddress(a => ({ ...a, name: e.target.value }))} placeholder="Full name *" style={inp} />
            <input value={address.phone} onChange={e => setAddress(a => ({ ...a, phone: e.target.value }))} placeholder="Phone number *" style={inp} />
            <input value={address.email} onChange={e => setAddress(a => ({ ...a, email: e.target.value }))} placeholder="Email address (for payment confirmation)" type="email" style={inp} />
            <input value={address.street} onChange={e => setAddress(a => ({ ...a, street: e.target.value }))} placeholder="Street address *" style={inp} />
            <div style={{ display: "flex", gap: "6px", marginBottom: "8px" }}>
              <input value={address.city} onChange={e => setAddress(a => ({ ...a, city: e.target.value }))} placeholder="City *" style={{ ...inp, flex: 1, marginBottom: 0 }} />
              <input value={address.country} onChange={e => setAddress(a => ({ ...a, country: e.target.value }))} placeholder="Country *" style={{ ...inp, flex: 1, marginBottom: 0 }} />
            </div>
            <button className="b" onClick={() => { if (address.name && address.phone) setStep(2); else notify("Please fill required fields"); }} style={{ ...bigBtn() }}>Continue →</button>
          </div>}

          {step === 2 && <div className="fd">
            <div style={{ fontWeight: 700, fontSize: "0.85rem", color: C.gold, marginBottom: "10px" }}>💳 Choose Payment Method</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", marginBottom: "10px" }}>
              {PAYMENT_METHODS.map(m => (
                <button key={m.id} className={`t${payMethod === m.id ? " on" : ""}`} onClick={() => setPayMethod(m.id)} style={{ background: payMethod === m.id ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.03)", border: `1px solid ${payMethod === m.id ? C.accent : C.border}`, borderRadius: "9px", padding: "8px", textAlign: "left" }}>
                  <div style={{ fontSize: "0.9rem", marginBottom: "1px" }}>{m.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: "0.65rem", color: payMethod === m.id ? C.accent : C.text }}>{m.label}</div>
                  <div style={{ fontSize: "0.52rem", color: "rgba(240,253,244,0.36)" }}>{m.desc}</div>
                  <div style={{ fontSize: "0.5rem", color: C.gold, marginTop: "1px" }}>Fee: {m.fee}</div>
                </button>
              ))}
            </div>
            {payMethod === "flutterwave" && <div style={{ background: "rgba(34,197,94,0.06)", borderRadius: "9px", padding: "9px", marginBottom: "10px", fontSize: "0.7rem", color: "rgba(240,253,244,0.55)", lineHeight: 1.6 }}>🦋 <strong>Flutterwave</strong> — Africa's most trusted payment gateway. Accepts Visa, Mastercard, M-Pesa, MTN MoMo, bank transfers and more. Your payment is 100% secure. You will be redirected to Flutterwave to complete payment.</div>}
            {payMethod === "crypto" && <div style={{ background: "rgba(249,115,22,0.06)", borderRadius: "9px", padding: "9px", marginBottom: "10px", fontSize: "0.7rem", color: "rgba(240,253,244,0.55)", lineHeight: 1.6 }}>₿ Pay with Bitcoin, USDT or Solana. Send to our wallet address provided after checkout. Fastest and cheapest option — only 0.1% fee!</div>}
            <div style={{ display: "flex", gap: "6px" }}>
              <button className="b" onClick={() => setStep(1)} style={{ background: "rgba(255,255,255,0.07)", border: `1px solid ${C.border}`, borderRadius: "9px", padding: "10px 14px", color: C.text, fontSize: "0.78rem" }}>← Back</button>
              <button className="b" onClick={() => setStep(3)} style={{ ...bigBtn(), flex: 1 }}>Continue →</button>
            </div>
          </div>}

          {step === 3 && <div className="fd">
            <div style={{ fontWeight: 700, fontSize: "0.85rem", color: C.gold, marginBottom: "10px" }}>✅ Confirm Your Order</div>
            <div style={{ ...card, marginBottom: "8px" }}>
              <div style={{ fontSize: "0.65rem", color: "rgba(240,253,244,0.42)", marginBottom: "3px" }}>📍 Delivering to:</div>
              <div style={{ fontWeight: 600, fontSize: "0.78rem" }}>{address.name} · {address.phone}</div>
              <div style={{ fontSize: "0.68rem", color: "rgba(240,253,244,0.5)" }}>{address.street}, {address.city}, {address.country}</div>
              {address.email && <div style={{ fontSize: "0.65rem", color: "rgba(240,253,244,0.42)", marginTop: "2px" }}>✉️ {address.email}</div>}
            </div>
            <div style={{ ...card, marginBottom: "8px" }}>
              <div style={{ fontSize: "0.65rem", color: "rgba(240,253,244,0.42)", marginBottom: "3px" }}>💳 Payment:</div>
              <div style={{ fontWeight: 600, fontSize: "0.78rem" }}>{PAYMENT_METHODS.find(m => m.id === payMethod)?.icon} {PAYMENT_METHODS.find(m => m.id === payMethod)?.label}</div>
              {payMethod === "flutterwave" && address.email && <div style={{ fontSize: "0.65rem", color: "rgba(240,253,244,0.42)", marginTop: "2px" }}>You will be redirected to Flutterwave to complete payment securely.</div>}
              {payMethod === "stripe" && <div style={{ marginTop: "8px", background: "rgba(255,255,255,0.04)", borderRadius: "10px", padding: "12px" }}>
                <div style={{ fontWeight: 700, fontSize: "0.78rem", color: C.accent, marginBottom: "10px" }}>💳 Enter Card Details</div>
                <input value={cardNumber} onChange={e => setCardNumber(e.target.value.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim().substring(0,19))} placeholder="Card number (1234 5678 9012 3456)" style={{ ...inp, marginBottom: "8px", letterSpacing: "2px" }} maxLength={19} />
                <div style={{ display: "flex", gap: "8px" }}>
                  <input value={cardExpiry} onChange={e => { let v = e.target.value.replace(/\D/g,''); if(v.length>=2) v = v.substring(0,2)+'/'+v.substring(2,4); setCardExpiry(v); }} placeholder="MM/YY" style={{ ...inp, flex: 1, marginBottom: 0 }} maxLength={5} />
                  <input value={cardCvv} onChange={e => setCardCvv(e.target.value.replace(/\D/g,''))} placeholder="CVV" style={{ ...inp, flex: 1, marginBottom: 0 }} maxLength={4} type="password" />
                </div>
                <div style={{ fontSize: "0.62rem", color: "rgba(240,253,244,0.38)", marginTop: "7px", display: "flex", alignItems: "center", gap: "5px" }}>🔒 Secured by Stripe — your card info is encrypted</div>
              </div>}
            </div>
            <div style={{ ...card, marginBottom: "10px" }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", marginBottom: "3px" }}>
                  <span>{item.icon} {item.name.substring(0, 20)}... ×{item.qty}</span>
                  <span style={{ color: C.accent, fontWeight: 700 }}>${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
              {couponOk && <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: C.accent, marginBottom: "3px" }}><span>Discount -10%</span><span>-${discount.toFixed(2)}</span></div>}
              <div style={{ borderTop: `1px solid ${C.border}`, marginTop: "7px", paddingTop: "7px", display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: "0.88rem" }}>
                <span>Total</span><span style={{ color: C.accent }}>${finalTotal.toFixed(2)}</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              <button className="b" onClick={() => setStep(2)} style={{ background: "rgba(255,255,255,0.07)", border: `1px solid ${C.border}`, borderRadius: "9px", padding: "10px 14px", color: C.text, fontSize: "0.78px" }}>← Back</button>
              <button className="b" onClick={placeOrder} disabled={paymentLoading} style={{ ...bigBtn(), flex: 1 }}>{paymentLoading ? "Processing..." : `🎉 Place Order — $${finalTotal.toFixed(2)}`}</button>
            </div>
          </div>}
        </div>
      </div>}

      {/* ── BOTTOM NAV ── */}
      <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 200, background: "rgba(10,18,8,0.97)", borderTop: `1px solid ${C.border}`, backdropFilter: "blur(16px)", display: "flex", justifyContent: "space-around", padding: "5px 0", paddingBottom: "max(6px,env(safe-area-inset-bottom))" }}>
        {[["home", "🏠", "Home"], ["shop", "🛍️", "Shop"], ["ai", "🤖", "AI"], ["track", "📦", "Orders"], ["sell", "💰", "Sell"], ["marketing", "📣", "Market"]].map(([id, icon, label]) => (
          <button key={id} className="n" onClick={() => setPage(id)} style={{ background: "transparent", border: "none", padding: "3px 5px", color: page === id ? C.accent : "rgba(240,253,244,0.35)", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", minWidth: "32px" }}>
            <span style={{ fontSize: page === id ? "1.1rem" : "1rem", filter: page === id ? `drop-shadow(0 0 5px rgba(34,197,94,0.6))` : "none" }}>{icon}</span>
            <span style={{ fontSize: "0.48rem", fontWeight: page === id ? 700 : 400 }}>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
