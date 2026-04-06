import { useState, useEffect, useRef } from "react";
import { ShoppingBag, X, Plus, Minus, ChevronRight, Menu, Anchor, Plane, Star, Trash2 } from "lucide-react";

// ─── COLOR PALETTE ───
const C = {
  navy: "#11224D",
  navyMid: "#193A6F",
  blue: "#2C599D",
  blueSoft: "#5B84C4",
  orange: "#F98125",
  orangeLight: "#FB9B50",
  cream: "#F0F2F5",
  creamDark: "#D8DCE3",
  white: "#FAFBFD",
  black: "#0A0A0A",
  textMuted: "#5B6B8A",
};

// ─── PRODUCT DATA ───
const PRODUCTS = [
  { id: 1,  name: '"No Yacht, No Problem" Heavyweight Hoodie', type: "Hoodie",    price: 85,  badge: "New",      color: C.navy,    sizes: ["S","M","L","XL","XXL"], description: "Heavyweight 400gsm French terry. Oversized fit. Embroidered SLYC crest on chest, back print that lets everyone know you don't need a yacht to live like you have one.", category: "tops" },
  { id: 2,  name: '"Members Only" Classic Tee',                 type: "Tee",       price: 45,  badge: null,       color: C.navyMid, sizes: ["S","M","L","XL","XXL"], description: "Ringspun cotton. Relaxed fit. If you know, you know. Simple SLYC lockup on front, 'Members Only' hit on the back.", category: "tops" },
  { id: 3,  name: "SLYC Dad Hat — Navy",                        type: "Hat",       price: 35,  badge: "Sold Out", color: C.blue,    sizes: ["One Size"],             description: "Unstructured six-panel. Brass buckle closure. Embroidered SLYC logo. The hat that started it all.", category: "accessories" },
  { id: 4,  name: '"Bad Decisions" Vintage Wash Crewneck',      type: "Crewneck",  price: 72,  badge: "Limited",  color: "#0D1A3A", sizes: ["S","M","L","XL"],       description: "Enzyme-washed fleece with that perfectly broken-in feel. Puff print 'Bad Decisions' across chest. Because someone had to say it.", category: "tops" },
  { id: 5,  name: '"Send It" Swim Trunks',                      type: "Swim",      price: 58,  badge: "New",      color: C.blue,    sizes: ["S","M","L","XL"],       description: "Quick-dry recycled poly. 7\" inseam. All-over SLYC wave pattern. Built for lake days, yacht parties you weren't invited to, and hotel pools at 2am.", category: "bottoms" },
  { id: 6,  name: "SLYC Flagship Hoodie — Orange",              type: "Hoodie",    price: 85,  badge: null,       color: C.orange,  sizes: ["S","M","L","XL","XXL"], description: "Same heavyweight build as the classic, now in SLYC orange. Impossible to miss. That's the point.", category: "tops" },
  { id: 7,  name: '"Lake Life" Trucker Hat',                    type: "Hat",       price: 32,  badge: null,       color: C.navyMid, sizes: ["One Size"],             description: "Foam front, mesh back. Snapback. Curved brim. Embroidered 'Lake Life' script with SLYC anchor detail.", category: "accessories" },
  { id: 8,  name: '"Unhinged" Oversized Tee',                   type: "Tee",       price: 48,  badge: "New",      color: "#0D1A3A", sizes: ["S","M","L","XL","XXL"], description: "Drop shoulder. Boxy cut. Giant back graphic that's equal parts art and chaos. Front left chest SLYC hit. This one's not subtle.", category: "tops" },
  { id: 9,  name: "SLYC Rally Shorts",                          type: "Shorts",    price: 55,  badge: null,       color: C.navy,    sizes: ["S","M","L","XL"],       description: "French terry sweat shorts. 6\" inseam. Embroidered SLYC on left leg. Perfect for the airport, the lake, or pretending you worked out.", category: "bottoms" },
  { id: 10, name: '"Yacht Club" Windbreaker',                   type: "Jacket",    price: 120, badge: "Limited",  color: C.navyMid, sizes: ["S","M","L","XL"],       description: "Water-resistant nylon shell. Hidden hood. Full zip. Tonal SLYC branding throughout. The jacket that makes you look like you own a boat.", category: "outerwear" },
  { id: 11, name: "SLYC Bottle Opener Keychain",                type: "Accessory", price: 18,  badge: null,       color: C.blue,    sizes: ["One Size"],             description: "Brass bottle opener with SLYC engraving. Because you never know when you'll need to crack one open.", category: "accessories" },
  { id: 12, name: '"Zero Impulse Control" Tank',                type: "Tank",      price: 38,  badge: "New",      color: C.blueSoft,sizes: ["S","M","L","XL"],       description: "Lightweight tri-blend. Cut for movement. Bold statement on front. Made for lake days, rooftop parties, and terrible ideas.", category: "tops" },
];

const CATEGORIES = [
  { id: "all",        label: "All" },
  { id: "tops",       label: "Tops" },
  { id: "bottoms",    label: "Bottoms" },
  { id: "outerwear",  label: "Outerwear" },
  { id: "accessories",label: "Accessories" },
];

const EVENTS = [
  { month: "Apr", day: "19", title: "Spring Kickoff Party",       desc: "Rooftop vibes, open bar, and the Spring '26 apparel drop.",                location: "Denver, CO" },
  { month: "May", day: "10", title: "Lake Day Takeover",          desc: "Sloan's Lake. Boats. Speakers. You know the drill.",                       location: "Sloan's Lake, CO" },
  { month: "Jun", day: "28", title: "White Party",                desc: "All white everything. No exceptions. No mercy.",                           location: "Vail, CO" },
  { month: "Jul", day: "04", title: "Independence Day Blowout",   desc: "Fireworks, freedom, and questionable decision-making.",                    location: "TBA" },
];

const TRIPS = [
  { season: "Winter 2026", destination: "Tulum, Mexico",        desc: "Beachfront villas, cenote day trips, and enough mezcal to forget your responsibilities.", grad: `linear-gradient(135deg, ${C.navyMid}, ${C.navy})` },
  { season: "Spring 2026", destination: "Aspen, Colorado",      desc: "Ski-in, ski-out chaos. Après vibes only. Fur coats not optional.",                        grad: `linear-gradient(135deg, ${C.blue}, ${C.navyMid})` },
  { season: "Summer 2026", destination: "Amalfi Coast, Italy",  desc: "Chartered boats, limoncello on demand, and pasta that hits different at sea level.",       grad: `linear-gradient(135deg, ${C.blueSoft}, ${C.blue})` },
];

// ─── REUSABLE COMPONENTS ───

function ProductImage({ product, style = {}, showQuick = true, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ aspectRatio: "3/4", background: product.color, position: "relative", overflow: "hidden", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", ...style }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <span style={{ fontSize: 22, fontWeight: 900, color: C.white, letterSpacing: 4, opacity: hovered ? 0.25 : 0.12, transition: "all 0.5s", transform: hovered ? "scale(1.1)" : "scale(1)", display: "inline-block" }}>SLYC</span>
      {product.badge && (
        <span style={{ position: "absolute", top: 16, left: 16, background: product.badge === "Sold Out" ? C.textMuted : C.orange, color: C.white, fontSize: 9, letterSpacing: 2, textTransform: "uppercase", padding: "6px 12px", fontWeight: 600 }}>
          {product.badge}
        </span>
      )}
      {showQuick && (
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(17,34,77,0.95)", backdropFilter: "blur(10px)", padding: 14, textAlign: "center", transform: hovered ? "translateY(0)" : "translateY(100%)", transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)" }}>
          <span style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: C.cream, fontWeight: 500 }}>
            {product.badge === "Sold Out" ? "Notify Me →" : "Quick View →"}
          </span>
        </div>
      )}
    </div>
  );
}

function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: `all 0.8s cubic-bezier(0.4,0,0.2,1) ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

// ─── NAV ───
function Nav({ page, setPage, cart, setCartOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navStyle = {
    position: "fixed", top: 0, width: "100%", zIndex: 1000,
    padding: scrolled ? "14px 40px" : "20px 40px",
    display: "flex", justifyContent: "space-between", alignItems: "center",
    transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
    background: scrolled ? "rgba(250,251,253,0.92)" : (page === "home" ? "transparent" : "rgba(250,251,253,0.92)"),
    backdropFilter: scrolled || page !== "home" ? "blur(20px)" : "none",
    boxShadow: scrolled || page !== "home" ? "0 1px 0 rgba(17,34,77,0.08)" : "none",
  };

  const links = [
    { label: "About",  action: () => { setPage("home"); setTimeout(() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }), 100); } },
    { label: "Trips",  action: () => { setPage("home"); setTimeout(() => document.getElementById("trips")?.scrollIntoView({ behavior: "smooth" }), 100); } },
    { label: "Events", action: () => { setPage("home"); setTimeout(() => document.getElementById("events")?.scrollIntoView({ behavior: "smooth" }), 100); } },
    { label: "Shop",   action: () => setPage("shop") },
  ];

  return (
    <>
      <nav style={navStyle}>
        <a onClick={() => { setPage("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ cursor: "pointer" }}>
          <span style={{ fontSize: scrolled ? 22 : 28, fontWeight: 900, color: C.white, letterSpacing: 6, transition: "font-size 0.4s", display: "inline-block" }}>SLYC</span>
        </a>
        <div style={{ display: "flex", gap: 36, alignItems: "center" }} className="nav-desktop">
          {links.map(l => (
            <a key={l.label} onClick={l.action}
              style={{ textDecoration: "none", color: C.navy, fontSize: 13, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer" }}
              onMouseEnter={e => e.target.style.color = C.orange}
              onMouseLeave={e => e.target.style.color = C.navy}
            >{l.label}</a>
          ))}
          <a onClick={() => setPage("members")}
            style={{ background: C.navy, color: C.cream, padding: "10px 24px", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontWeight: 600, textDecoration: "none", transition: "background 0.3s" }}
            onMouseEnter={e => e.target.style.background = C.orange}
            onMouseLeave={e => e.target.style.background = C.navy}
          >Members</a>
          <div onClick={() => setCartOpen(true)} style={{ position: "relative", cursor: "pointer", padding: 4 }}>
            <ShoppingBag size={20} color={C.navy} />
            {cart.length > 0 && (
              <span style={{ position: "absolute", top: -4, right: -6, background: C.orange, color: C.white, fontSize: 9, width: 18, height: 18, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                {cart.reduce((a, b) => a + b.qty, 0)}
              </span>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }} className="nav-mobile">
          <div onClick={() => setCartOpen(true)} style={{ position: "relative", cursor: "pointer", padding: 4 }}>
            <ShoppingBag size={20} color={C.navy} />
            {cart.length > 0 && (
              <span style={{ position: "absolute", top: -4, right: -6, background: C.orange, color: C.white, fontSize: 9, width: 18, height: 18, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                {cart.reduce((a, b) => a + b.qty, 0)}
              </span>
            )}
          </div>
          <Menu size={24} color={C.navy} style={{ cursor: "pointer" }} onClick={() => setMobileOpen(true)} />
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, background: C.white, zIndex: 2000, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
          <X size={28} color={C.navy} style={{ position: "absolute", top: 24, right: 24, cursor: "pointer" }} onClick={() => setMobileOpen(false)} />
          {links.map(l => (
            <a key={l.label} onClick={() => { l.action(); setMobileOpen(false); }}
              style={{ fontSize: 20, letterSpacing: 4, textTransform: "uppercase", color: C.navy, cursor: "pointer", fontWeight: 500, textDecoration: "none" }}
            >{l.label}</a>
          ))}
          <a onClick={() => { setPage("members"); setMobileOpen(false); }}
            style={{ background: C.navy, color: C.cream, padding: "14px 36px", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", cursor: "pointer", fontWeight: 600, textDecoration: "none" }}
          >Members</a>
        </div>
      )}
    </>
  );
}

// ─── CART DRAWER ───
function CartDrawer({ cart, setCart, open, setOpen, setPage }) {
  const total = cart.reduce((a, b) => a + b.price * b.qty, 0);
  return (
    <>
      {open && <div style={{ position: "fixed", inset: 0, background: "rgba(10,10,10,0.5)", zIndex: 3000 }} onClick={() => setOpen(false)} />}
      <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: Math.min(440, window.innerWidth), background: C.white, zIndex: 3001, transform: open ? "translateX(0)" : "translateX(100%)", transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "24px 28px", borderBottom: `1px solid ${C.creamDark}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: C.navy, letterSpacing: 2 }}>
            Your Bag ({cart.reduce((a, b) => a + b.qty, 0)})
          </span>
          <X size={22} color={C.navy} style={{ cursor: "pointer" }} onClick={() => setOpen(false)} />
        </div>

        <div style={{ flex: 1, overflow: "auto", padding: "20px 28px" }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", paddingTop: 80 }}>
              <ShoppingBag size={48} color={C.creamDark} style={{ marginBottom: 16 }} />
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: C.navy, marginBottom: 8 }}>Nothing here yet.</p>
              <p style={{ fontSize: 14, color: C.textMuted }}>Go treat yourself.</p>
              <a onClick={() => { setOpen(false); setPage("shop"); }}
                style={{ display: "inline-block", marginTop: 24, background: C.navy, color: C.cream, padding: "14px 36px", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", cursor: "pointer", fontWeight: 600 }}
              >Shop Apparel</a>
            </div>
          ) : cart.map((item, i) => (
            <div key={item.id + item.size} style={{ display: "flex", gap: 16, padding: "20px 0", borderBottom: i < cart.length - 1 ? `1px solid ${C.cream}` : "none" }}>
              <div style={{ width: 80, height: 100, background: item.color, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 12, fontWeight: 900, color: C.white, letterSpacing: 2, opacity: 0.3 }}>SLYC</span>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: C.navy, marginBottom: 4 }}>{item.name}</p>
                <p style={{ fontSize: 12, color: C.textMuted, marginBottom: 10 }}>Size: {item.size}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", border: `1px solid ${C.creamDark}` }}>
                    <button
                      onClick={() => setCart(c => c.map(x => x.id === item.id && x.size === item.size ? { ...x, qty: Math.max(1, x.qty - 1) } : x))}
                      style={{ padding: "6px 10px", background: "none", border: "none", cursor: "pointer" }}
                    ><Minus size={14} color={C.navy} /></button>
                    <span style={{ padding: "6px 12px", fontSize: 13, color: C.navy, fontWeight: 600, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                    <button
                      onClick={() => setCart(c => c.map(x => x.id === item.id && x.size === item.size ? { ...x, qty: x.qty + 1 } : x))}
                      style={{ padding: "6px 10px", background: "none", border: "none", cursor: "pointer" }}
                    ><Plus size={14} color={C.navy} /></button>
                  </div>
                  <Trash2 size={16} color={C.textMuted} style={{ cursor: "pointer", marginLeft: "auto" }}
                    onClick={() => setCart(c => c.filter(x => !(x.id === item.id && x.size === item.size)))}
                  />
                </div>
              </div>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: C.navy }}>${item.price * item.qty}</p>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div style={{ padding: "24px 28px", borderTop: `1px solid ${C.creamDark}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: C.navy }}>Subtotal</span>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: C.navy }}>${total}</span>
            </div>
            <button
              style={{ width: "100%", background: C.orange, color: C.white, padding: "16px", border: "none", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, cursor: "pointer", transition: "background 0.3s" }}
              onMouseEnter={e => e.target.style.background = C.orangeLight}
              onMouseLeave={e => e.target.style.background = C.orange}
            >Checkout — ${total}</button>
            <p style={{ textAlign: "center", fontSize: 11, color: C.textMuted, marginTop: 12 }}>Shipping calculated at checkout</p>
          </div>
        )}
      </div>
    </>
  );
}

// ─── HERO ───
function Hero({ setPage }) {
  return (
    <section style={{ height: "100vh", minHeight: 700, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", background: C.navy, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.3) 60px, rgba(255,255,255,0.3) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.3) 60px, rgba(255,255,255,0.3) 61px)" }} />
      <div style={{ position: "absolute", inset: 0, opacity: 0.12, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")` }} />
      <div style={{ textAlign: "center", zIndex: 2, padding: "0 24px", animation: "fadeUp 1s forwards" }}>
        <div style={{ marginBottom: 40 }}>
          <span style={{ fontSize: "clamp(48px,8vw,80px)", fontWeight: 900, color: C.white, letterSpacing: 16, display: "block" }}>SLYC</span>
        </div>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(14px,1.8vw,18px)", color: C.orangeLight, letterSpacing: 6, textTransform: "uppercase", marginBottom: 24 }}>
          Sloan's Lake Yacht Club
        </p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(48px,8vw,120px)", color: C.cream, fontWeight: 300, lineHeight: 0.95, marginBottom: 32 }}>
          No Yacht.<br /><em style={{ fontStyle: "italic", color: C.orange }}>No Problem.</em>
        </h1>
        <p style={{ fontSize: 15, color: "rgba(240,242,245,0.6)", maxWidth: 500, margin: "0 auto 48px", lineHeight: 1.7, fontWeight: 300 }}>
          An exclusive social club for the unhinged, who live lavishly and never miss a good time. Denver-born, everywhere-bound.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a onClick={() => setPage("shop")}
            style={{ background: C.orange, color: C.white, padding: "16px 40px", textDecoration: "none", fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", cursor: "pointer", transition: "all 0.4s" }}
            onMouseEnter={e => { e.target.style.background = C.orangeLight; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.target.style.background = C.orange; e.target.style.transform = "translateY(0)"; }}
          >Shop Apparel</a>
          <a onClick={() => setPage("members")}
            style={{ border: "1px solid rgba(240,242,245,0.3)", color: C.cream, padding: "16px 40px", textDecoration: "none", fontSize: 12, fontWeight: 500, letterSpacing: 3, textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s" }}
            onMouseEnter={e => { e.target.style.borderColor = C.orange; e.target.style.color = C.orange; }}
            onMouseLeave={e => { e.target.style.borderColor = "rgba(240,242,245,0.3)"; e.target.style.color = C.cream; }}
          >Member Login</a>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "rgba(240,242,245,0.4)", fontSize: 10, letterSpacing: 3, textTransform: "uppercase" }}>
        <span>Scroll</span>
        <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, ${C.orange}, transparent)`, animation: "scrollPulse 2s infinite" }} />
      </div>
    </section>
  );
}

// ─── MARQUEE ───
function Marquee() {
  const text = `Denver, CO • Semi-Annual Trips • Unhinged Apparel • Members Only • Est. Sloan's Lake • Live Lavishly • No Yacht Required • `;
  return (
    <div style={{ background: C.cream, padding: "18px 0", overflow: "hidden", borderBottom: `1px solid rgba(17,34,77,0.08)` }}>
      <div style={{ display: "flex", animation: "marquee 30s linear infinite", whiteSpace: "nowrap" }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, letterSpacing: 4, textTransform: "uppercase", color: C.navy, padding: "0 12px", opacity: 0.5, flexShrink: 0 }}>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── ABOUT SECTION ───
function About() {
  return (
    <section id="about" style={{ padding: "140px 40px", maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "center" }}>
      <Reveal>
        <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: C.orange, marginBottom: 24, fontWeight: 600 }}>The Club</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,4vw,56px)", fontWeight: 300, lineHeight: 1.1, color: C.navy, marginBottom: 32 }}>
          Built on good times, bonded by <em>bad decisions</em>
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: C.textMuted, marginBottom: 24, fontWeight: 300 }}>
          What started as a group of friends at Sloan's Lake became Denver's most exclusive social club. SLYC is a members-only community that brings together people who value experiences over everything — lavish trips, legendary parties, and apparel that says exactly what you're thinking.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: C.textMuted, fontWeight: 300 }}>
          We host regular events across Colorado, throw down at venues nationwide, and take semi-annual trips to destinations that will ruin your PTO balance and your bank account. Worth it every time.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32, marginTop: 48, paddingTop: 48, borderTop: `1px solid rgba(17,34,77,0.1)` }}>
          {[["2", "Trips / Year"], ["50+", "Events Hosted"], ["CO", "Home Base"]].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: C.navy, lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: C.textMuted, marginTop: 8 }}>{l}</div>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.2}>
        <div style={{ position: "relative", height: 600 }}>
          <div style={{ width: "85%", height: "100%", background: `linear-gradient(135deg, ${C.navy}, ${C.navyMid})`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <div style={{ position: "absolute", inset: 20, border: "1px solid rgba(240,242,245,0.12)" }} />
            <span style={{ fontSize: 80, fontWeight: 900, color: C.white, letterSpacing: 16, opacity: 0.06 }}>SLYC</span>
          </div>
          <div style={{ position: "absolute", bottom: -30, right: 0, width: 220, height: 280, background: C.orange, display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: C.white, fontStyle: "italic", lineHeight: 1.4, textAlign: "center" }}>
              "If you know, you know."
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ─── TRIPS SECTION ───
function TripsSection() {
  const trips = TRIPS;
  const [hovered, setHovered] = useState(null);
  return (
    <section id="trips" style={{ background: C.navy, padding: "120px 40px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "'Bebas Neue', sans-serif", fontSize: "30vw", color: "rgba(255,255,255,0.015)", whiteSpace: "nowrap" }}>SLYC</div>
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: C.orangeLight, marginBottom: 16, fontWeight: 600 }}>Semi-Annual Trips</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 300, color: C.cream, lineHeight: 1.1 }}>
            Where we've been.<br />Where we're going.
          </h2>
        </div>
      </Reveal>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
        {trips.map((t, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div
              style={{ position: "relative", height: 450, overflow: "hidden", cursor: "pointer" }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div style={{ position: "absolute", inset: 0, background: t.grad, transform: hovered === i ? "scale(1.08)" : "scale(1)", transition: "transform 0.8s cubic-bezier(0.4,0,0.2,1)" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(10,10,10,${hovered === i ? 0.9 : 0.85}) 0%, rgba(10,10,10,${hovered === i ? 0.2 : 0.1}) 50%)`, transition: "background 0.4s" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 32, transform: hovered === i ? "translateY(0)" : "translateY(20px)", transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)" }}>
                <p style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: C.orangeLight, marginBottom: 8 }}>{t.season}</p>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: C.cream, fontWeight: 400, marginBottom: 8 }}>{t.destination}</h3>
                <p style={{ fontSize: 13, color: "rgba(240,242,245,0.5)", lineHeight: 1.6, opacity: hovered === i ? 1 : 0, transition: "opacity 0.4s 0.1s" }}>{t.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── EVENTS SECTION ───
function EventsSection() {
  const events = EVENTS;
  return (
    <section id="events" style={{ padding: "140px 40px", maxWidth: 1200, margin: "0 auto" }}>
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: C.orange, marginBottom: 16, fontWeight: 600 }}>Upcoming Events</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 300, color: C.navy, lineHeight: 1.1 }}>Don't miss out.</h2>
        </div>
      </Reveal>
      <div>
        {events.map((e, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div
              style={{ display: "grid", gridTemplateColumns: "120px 1fr auto", gap: 40, alignItems: "center", padding: "40px 0", borderBottom: `1px solid rgba(17,34,77,0.1)`, borderTop: i === 0 ? `1px solid rgba(17,34,77,0.1)` : "none", cursor: "pointer", transition: "padding-left 0.3s" }}
              onMouseEnter={el => el.currentTarget.style.paddingLeft = "20px"}
              onMouseLeave={el => el.currentTarget.style.paddingLeft = "0px"}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: C.orange, fontWeight: 600 }}>{e.month}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, color: C.navy, lineHeight: 1 }}>{e.day}</div>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 400, color: C.navy, marginBottom: 6 }}>{e.title}</h3>
                <p style={{ fontSize: 13, color: C.textMuted, fontWeight: 300 }}>{e.desc}</p>
              </div>
              <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: C.textMuted, whiteSpace: "nowrap" }}>{e.location}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── FEATURED PRODUCTS (HOME) ───
function FeaturedProducts({ setPage, setSelectedProduct }) {
  const featured = PRODUCTS.filter(p => p.badge === "New" || p.badge === "Limited").slice(0, 4);
  return (
    <section style={{ background: C.cream, padding: "140px 40px" }}>
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: C.orange, marginBottom: 16, fontWeight: 600 }}>Apparel</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 300, color: C.navy, lineHeight: 1.1 }}>Wear the chaos.</h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: C.textMuted, fontStyle: "italic", marginTop: 12 }}>Unhinged apparel for unhinged people.</p>
        </div>
      </Reveal>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
        {featured.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08}>
            <div
              style={{ background: C.white, cursor: "pointer", transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)" }}
              onClick={() => { setSelectedProduct(p.id); setPage("product"); window.scrollTo(0, 0); }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(17,34,77,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <ProductImage product={p} onClick={() => { setSelectedProduct(p.id); setPage("product"); window.scrollTo(0, 0); }} />
              <div style={{ padding: 20 }}>
                <div style={{ fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>{p.type}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: C.navy, marginBottom: 10 }}>{p.name}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: C.navy }}>${p.price}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 64 }}>
        <Reveal>
          <a
            onClick={() => { setPage("shop"); window.scrollTo(0, 0); }}
            style={{ display: "inline-block", background: C.navy, color: C.cream, padding: "18px 56px", textDecoration: "none", fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", cursor: "pointer", transition: "all 0.4s" }}
            onMouseEnter={e => { e.target.style.background = C.orange; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.target.style.background = C.navy; e.target.style.transform = "translateY(0)"; }}
          >View Full Collection</a>
        </Reveal>
      </div>
    </section>
  );
}

// ─── LIFESTYLE QUOTE ───
function LifestyleQuote() {
  return (
    <section style={{ height: "70vh", minHeight: 500, background: C.navy, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ textAlign: "center", zIndex: 2, padding: "0 24px" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px,5vw,72px)", color: C.cream, fontWeight: 300, fontStyle: "italic", lineHeight: 1.2, maxWidth: 900 }}>
          "We don't have a yacht. We have <span style={{ color: C.orange }}>something better</span> — each other and zero impulse control."
        </p>
        <p style={{ marginTop: 24, fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "rgba(240,242,245,0.4)" }}>— SLYC Founders, Probably</p>
      </div>
    </section>
  );
}

// ─── MEMBERS SECTION ───
function MembersSection({ setPage }) {
  const perks = [
    { icon: <Anchor size={22} color={C.orange} />, title: "Exclusive Events", desc: "Priority access to every party, lake day, and chaotic gathering we throw." },
    { icon: <Plane size={22} color={C.orange} />,  title: "Trip Access",      desc: "First dibs on semi-annual trips. The kind of trips you can't post about." },
    { icon: <Star size={22} color={C.orange} />,   title: "Early Drops",      desc: "Shop new apparel before anyone else. Members get it first, always." },
  ];
  return (
    <section id="members" style={{ padding: "140px 40px", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
      <Reveal>
        <div style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: C.orange, marginBottom: 16, fontWeight: 600 }}>Membership</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 300, color: C.navy, lineHeight: 1.1 }}>For the inner circle.</h2>
        </div>
      </Reveal>
      <Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 48, marginBottom: 64 }}>
          {perks.map(pk => (
            <div key={pk.title}>
              <div style={{ width: 48, height: 48, margin: "0 auto 20px", border: `1px solid ${C.orange}`, display: "flex", alignItems: "center", justifyContent: "center" }}>{pk.icon}</div>
              <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: C.navy, marginBottom: 10, fontWeight: 400 }}>{pk.title}</h4>
              <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.7, fontWeight: 300 }}>{pk.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal>
        <div style={{ background: C.navy, padding: 60, textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 16, border: "1px solid rgba(240,242,245,0.08)" }} />
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, color: C.cream, fontWeight: 300, marginBottom: 12, position: "relative", zIndex: 1 }}>Already a member?</h3>
          <p style={{ fontSize: 14, color: "rgba(240,242,245,0.5)", marginBottom: 32, position: "relative", zIndex: 1 }}>Access the members-only app for event RSVPs, trip details, and more.</p>
          <a
            onClick={() => setPage("members")}
            style={{ display: "inline-block", background: C.orange, color: C.white, padding: "16px 48px", textDecoration: "none", fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", position: "relative", zIndex: 1, transition: "all 0.4s", cursor: "pointer" }}
            onMouseEnter={e => { e.target.style.background = C.orangeLight; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.target.style.background = C.orange; e.target.style.transform = "translateY(0)"; }}
          >Member Login</a>
        </div>
      </Reveal>
    </section>
  );
}

// ─── FOOTER ───
function Footer({ setPage }) {
  const cols = [
    { title: "Club",    links: [{ label: "About",      action: () => setPage("home") }, { label: "Trips",      action: () => setPage("home") }, { label: "Events",     action: () => setPage("home") }, { label: "Membership", action: () => setPage("home") }] },
    { title: "Shop",    links: [{ label: "All Apparel", action: () => setPage("shop") }, { label: "Hoodies",    action: () => setPage("shop") }, { label: "Tees",       action: () => setPage("shop") }, { label: "Accessories",action: () => setPage("shop") }] },
    { title: "Connect", links: [{ label: "Instagram" }, { label: "TikTok" }, { label: "Contact" }, { label: "Member Login", action: () => setPage("members") }] },
  ];
  return (
    <footer style={{ background: C.black, padding: "80px 40px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 60 }}>
        <div>
          <span style={{ fontSize: 32, fontWeight: 900, color: C.white, letterSpacing: 8, display: "block", marginBottom: 20 }}>SLYC</span>
          <p style={{ fontSize: 13, color: "rgba(240,242,245,0.4)", lineHeight: 1.7, maxWidth: 280 }}>
            Sloan's Lake Yacht Club. A members-only social club born in Denver, CO. No yacht required — just vibes, bad decisions, and great people.
          </p>
        </div>
        {cols.map(col => (
          <div key={col.title}>
            <h5 style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: C.orange, marginBottom: 20, fontWeight: 600 }}>{col.title}</h5>
            {col.links.map(l => (
              <a key={l.label} onClick={l.action}
                style={{ display: "block", color: "rgba(240,242,245,0.5)", textDecoration: "none", fontSize: 14, marginBottom: 12, cursor: "pointer", transition: "color 0.3s" }}
                onMouseEnter={e => e.target.style.color = C.cream}
                onMouseLeave={e => e.target.style.color = "rgba(240,242,245,0.5)"}
              >{l.label}</a>
            ))}
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1200, margin: "60px auto 0", paddingTop: 30, borderTop: "1px solid rgba(240,242,245,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <p style={{ fontSize: 12, color: "rgba(240,242,245,0.25)" }}>© 2026 Sloan's Lake Yacht Club. All rights reserved.</p>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy", "Terms"].map(l => <a key={l} href="#" style={{ fontSize: 12, color: "rgba(240,242,245,0.25)", textDecoration: "none" }}>{l}</a>)}
        </div>
      </div>
    </footer>
  );
}

// ─── SHOP PAGE ───
function ShopPage({ setPage, setSelectedProduct }) {
  const [category, setCategory] = useState("all");
  const filtered = category === "all" ? PRODUCTS : PRODUCTS.filter(p => p.category === category);

  return (
    <div style={{ paddingTop: 100 }}>
      {/* Hero banner */}
      <div style={{ background: C.navy, padding: "80px 40px 100px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "'Bebas Neue', sans-serif", fontSize: "20vw", color: "rgba(255,255,255,0.02)", whiteSpace: "nowrap" }}>APPAREL</div>
        <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: C.orangeLight, marginBottom: 16, fontWeight: 600, position: "relative", zIndex: 1 }}>SLYC Apparel</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px,6vw,72px)", fontWeight: 300, color: C.cream, lineHeight: 1.1, position: "relative", zIndex: 1 }}>Wear the chaos.</h1>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "rgba(240,242,245,0.5)", fontStyle: "italic", marginTop: 16, position: "relative", zIndex: 1 }}>Unhinged apparel for unhinged people.</p>
      </div>

      {/* Filters */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 40px 0" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40, borderBottom: `1px solid ${C.creamDark}`, paddingBottom: 20 }}>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setCategory(cat.id)} style={{
              padding: "10px 24px", border: `1px solid ${category === cat.id ? C.navy : C.creamDark}`,
              background: category === cat.id ? C.navy : "transparent",
              color: category === cat.id ? C.cream : C.textMuted,
              fontSize: 11, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontWeight: 600, transition: "all 0.3s",
            }}>{cat.label}</button>
          ))}
          <span style={{ marginLeft: "auto", fontSize: 13, color: C.textMuted, alignSelf: "center" }}>
            {filtered.length} {filtered.length === 1 ? "item" : "items"}
          </span>
        </div>
      </div>

      {/* Product Grid */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 120px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 }}>
        {filtered.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.05}>
            <div
              style={{ background: C.white, cursor: "pointer", transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)", border: `1px solid ${C.cream}` }}
              onClick={() => { setSelectedProduct(p.id); setPage("product"); window.scrollTo(0, 0); }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(17,34,77,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <ProductImage product={p} />
              <div style={{ padding: 20 }}>
                <div style={{ fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>{p.type}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: C.navy, marginBottom: 10 }}>{p.name}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: C.navy }}>${p.price}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

// ─── DETAIL ACCORDION ───
function DetailAccordion({ title, content }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${C.creamDark}` }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", background: "none", border: "none", cursor: "pointer" }}>
        <span style={{ fontSize: 13, letterSpacing: 2, textTransform: "uppercase", color: C.navy, fontWeight: 500 }}>{title}</span>
        <Plus size={16} color={C.navy} style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.3s" }} />
      </button>
      <div style={{ maxHeight: open ? 200 : 0, overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)" }}>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: C.textMuted, paddingBottom: 20, fontWeight: 300 }}>{content}</p>
      </div>
    </div>
  );
}

// ─── PRODUCT DETAIL PAGE ───
function ProductPage({ productId, setPage, cart, setCart, setSelectedProduct }) {
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);
  const related = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  const addToCart = () => {
    if (!selectedSize) { setSizeError(true); return; }
    setSizeError(false);
    setCart(prev => {
      const existing = prev.find(x => x.id === product.id && x.size === selectedSize);
      if (existing) return prev.map(x => x.id === product.id && x.size === selectedSize ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { id: product.id, name: product.name, price: product.price, size: selectedSize, qty: 1, color: product.color }];
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ paddingTop: 100 }}>
      {/* Breadcrumb */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.textMuted }}>
          <a onClick={() => { setPage("home"); window.scrollTo(0, 0); }} style={{ cursor: "pointer", textDecoration: "none", color: C.textMuted }}>Home</a>
          <ChevronRight size={12} />
          <a onClick={() => { setPage("shop"); window.scrollTo(0, 0); }} style={{ cursor: "pointer", textDecoration: "none", color: C.textMuted }}>Shop</a>
          <ChevronRight size={12} />
          <span style={{ color: C.navy }}>{product.name}</span>
        </div>
      </div>

      {/* Product layout */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 40px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
        <div style={{ position: "sticky", top: 120 }}>
          <ProductImage product={product} style={{ aspectRatio: "3/4" }} showQuick={false} />
        </div>
        <div>
          <p style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: C.orange, marginBottom: 12, fontWeight: 600 }}>{product.type}</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 400, color: C.navy, lineHeight: 1.2, marginBottom: 16 }}>{product.name}</h1>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: C.navy, marginBottom: 32 }}>${product.price}</p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: C.textMuted, fontWeight: 300, marginBottom: 40 }}>{product.description}</p>

          {/* Size selector */}
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: C.navy, marginBottom: 12, fontWeight: 600 }}>
              Size {sizeError && <span style={{ color: C.orange, fontWeight: 400, letterSpacing: 0, textTransform: "none" }}>— Please select a size</span>}
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {product.sizes.map(s => (
                <button key={s} onClick={() => { setSelectedSize(s); setSizeError(false); }} style={{
                  padding: "12px 20px", border: `1px solid ${selectedSize === s ? C.navy : C.creamDark}`,
                  background: selectedSize === s ? C.navy : "transparent", color: selectedSize === s ? C.cream : C.navy,
                  fontSize: 12, letterSpacing: 1, cursor: "pointer", fontWeight: 500, transition: "all 0.2s", minWidth: 52, textAlign: "center",
                }}>{s}</button>
              ))}
            </div>
          </div>

          {/* Add to cart */}
          {product.badge === "Sold Out" ? (
            <button style={{ width: "100%", padding: "18px", background: C.creamDark, color: C.textMuted, border: "none", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, cursor: "not-allowed" }}>
              Sold Out — Notify Me
            </button>
          ) : (
            <button onClick={addToCart} style={{
              width: "100%", padding: "18px", background: added ? "#1A7A42" : C.navy, color: C.white, border: "none",
              fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, cursor: "pointer", transition: "all 0.4s",
            }}
              onMouseEnter={e => { if (!added) e.target.style.background = C.orange; }}
              onMouseLeave={e => { if (!added) e.target.style.background = C.navy; }}
            >{added ? "✓ Added to Bag" : "Add to Bag"}</button>
          )}

          {/* Details accordion */}
          <div style={{ marginTop: 48, borderTop: `1px solid ${C.creamDark}` }}>
            {[
              { title: "Details",  content: "Premium construction. Designed in Denver. Made for people who don't take themselves too seriously but take their fit very seriously." },
              { title: "Shipping", content: "Free shipping on orders over $100. Standard delivery 5-7 business days. Express available at checkout." },
              { title: "Returns",  content: "30-day return policy. Unworn, tags on. We'll take it back, no hard feelings." },
            ].map((d, i) => (
              <DetailAccordion key={i} title={d.title} content={d.content} />
            ))}
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div style={{ background: C.cream, padding: "80px 40px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: C.navy, fontWeight: 400, marginBottom: 40 }}>You might also like</h3>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(related.length, 4)}, 1fr)`, gap: 24 }}>
              {related.map(p => (
                <div key={p.id}
                  style={{ background: C.white, cursor: "pointer", transition: "all 0.4s" }}
                  onClick={() => { setSelectedProduct(p.id); window.scrollTo(0, 0); }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(17,34,77,0.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <ProductImage product={p} />
                  <div style={{ padding: 16 }}>
                    <div style={{ fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>{p.type}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: C.navy, marginBottom: 6 }}>{p.name}</div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: C.navy }}>${p.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MEMBERS PAGE ───
function MembersPage({ setPage }) {
  return (
    <div style={{ paddingTop: 100 }}>
      <div style={{ background: C.navy, padding: "100px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.3) 60px, rgba(255,255,255,0.3) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.3) 60px, rgba(255,255,255,0.3) 61px)" }} />
        <span style={{ fontSize: 48, fontWeight: 900, color: C.white, letterSpacing: 12, display: "block", marginBottom: 32, position: "relative", zIndex: 1 }}>SLYC</span>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,5vw,56px)", fontWeight: 300, color: C.cream, position: "relative", zIndex: 1 }}>Members Only</h1>
        <p style={{ fontSize: 15, color: "rgba(240,242,245,0.5)", marginTop: 16, position: "relative", zIndex: 1 }}>Access your account, RSVP to events, and manage trip details.</p>
      </div>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "80px 40px" }}>
        <div style={{ background: C.white, border: `1px solid ${C.creamDark}`, padding: 48 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: C.navy, marginBottom: 8, fontWeight: 400 }}>Sign In</h2>
          <p style={{ fontSize: 13, color: C.textMuted, marginBottom: 32 }}>Enter your credentials to access the members app.</p>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: C.navy, marginBottom: 8, fontWeight: 600 }}>Email</label>
            <input type="email" placeholder="you@example.com" style={{ width: "100%", padding: "14px 16px", border: `1px solid ${C.creamDark}`, background: C.cream, fontSize: 14, color: C.navy, outline: "none", transition: "border-color 0.3s" }}
              onFocus={e => e.target.style.borderColor = C.blue}
              onBlur={e => e.target.style.borderColor = C.creamDark}
            />
          </div>
          <div style={{ marginBottom: 32 }}>
            <label style={{ display: "block", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: C.navy, marginBottom: 8, fontWeight: 600 }}>Password</label>
            <input type="password" placeholder="••••••••" style={{ width: "100%", padding: "14px 16px", border: `1px solid ${C.creamDark}`, background: C.cream, fontSize: 14, color: C.navy, outline: "none", transition: "border-color 0.3s" }}
              onFocus={e => e.target.style.borderColor = C.blue}
              onBlur={e => e.target.style.borderColor = C.creamDark}
            />
          </div>
          <button style={{ width: "100%", padding: "16px", background: C.navy, color: C.cream, border: "none", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, cursor: "pointer", transition: "background 0.3s", marginBottom: 16 }}
            onMouseEnter={e => e.target.style.background = C.orange}
            onMouseLeave={e => e.target.style.background = C.navy}
          >Sign In</button>
          <p style={{ textAlign: "center", fontSize: 13, color: C.textMuted }}>
            <a href="#" style={{ color: C.blue, textDecoration: "none" }}>Forgot password?</a>
          </p>
        </div>
        <p style={{ textAlign: "center", fontSize: 13, color: C.textMuted, marginTop: 32 }}>
          Not a member? <a onClick={() => setPage("apply")} style={{ color: C.orange, textDecoration: "none", fontWeight: 600, cursor: "pointer" }}>Apply for membership</a>
        </p>
      </div>
    </div>
  );
}

// ─── APPLY PAGE ───
function ApplyPage({ setPage }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", instagram: "", city: "", why: "", referral: "" });
  const [submitted, setSubmitted] = useState(false);

  const field = (label, key, type = "text", placeholder = "") => (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: C.navy, marginBottom: 8, fontWeight: 600 }}>{label}</label>
      {key === "why" ? (
        <textarea
          rows={4}
          placeholder={placeholder}
          value={form[key]}
          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
          style={{ width: "100%", padding: "14px 16px", border: `1px solid ${C.creamDark}`, background: C.cream, fontSize: 14, color: C.navy, outline: "none", transition: "border-color 0.3s", resize: "vertical", fontFamily: "inherit" }}
          onFocus={e => e.target.style.borderColor = C.blue}
          onBlur={e => e.target.style.borderColor = C.creamDark}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={form[key]}
          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
          style={{ width: "100%", padding: "14px 16px", border: `1px solid ${C.creamDark}`, background: C.cream, fontSize: 14, color: C.navy, outline: "none", transition: "border-color 0.3s" }}
          onFocus={e => e.target.style.borderColor = C.blue}
          onBlur={e => e.target.style.borderColor = C.creamDark}
        />
      )}
    </div>
  );

  if (submitted) {
    return (
      <div style={{ paddingTop: 100 }}>
        <div style={{ background: C.navy, padding: "100px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.3) 60px, rgba(255,255,255,0.3) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.3) 60px, rgba(255,255,255,0.3) 61px)" }} />
          <span style={{ fontSize: 48, fontWeight: 900, color: C.white, letterSpacing: 12, display: "block", marginBottom: 32, position: "relative", zIndex: 1 }}>SLYC</span>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,5vw,56px)", fontWeight: 300, color: C.cream, position: "relative", zIndex: 1 }}>Application Received</h1>
          <p style={{ fontSize: 15, color: "rgba(240,242,245,0.5)", marginTop: 16, position: "relative", zIndex: 1 }}>We'll be in touch. Don't call us, we'll call you.</p>
        </div>
        <div style={{ maxWidth: 480, margin: "80px auto", padding: "0 40px", textAlign: "center" }}>
          <p style={{ fontSize: 14, color: C.textMuted, marginBottom: 32, lineHeight: 1.7 }}>
            Your application has been submitted. The membership committee reviews applications on a rolling basis. Keep an eye on your inbox.
          </p>
          <a onClick={() => setPage("home")} style={{ display: "inline-block", background: C.navy, color: C.cream, padding: "16px 40px", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, cursor: "pointer", transition: "background 0.3s" }}
            onMouseEnter={e => e.target.style.background = C.orange}
            onMouseLeave={e => e.target.style.background = C.navy}
          >Back to Home</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 100 }}>
      <div style={{ background: C.navy, padding: "100px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.3) 60px, rgba(255,255,255,0.3) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.3) 60px, rgba(255,255,255,0.3) 61px)" }} />
        <span style={{ fontSize: 48, fontWeight: 900, color: C.white, letterSpacing: 12, display: "block", marginBottom: 32, position: "relative", zIndex: 1 }}>SLYC</span>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,5vw,56px)", fontWeight: 300, color: C.cream, position: "relative", zIndex: 1 }}>Apply for Membership</h1>
        <p style={{ fontSize: 15, color: "rgba(240,242,245,0.5)", marginTop: 16, position: "relative", zIndex: 1 }}>Membership is selective. We're looking for the right people — not just anyone.</p>
      </div>
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "80px 40px" }}>
        <div style={{ background: C.white, border: `1px solid ${C.creamDark}`, padding: 48 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: C.navy, marginBottom: 8, fontWeight: 400 }}>Membership Application</h2>
          <p style={{ fontSize: 13, color: C.textMuted, marginBottom: 36 }}>All fields are placeholder. Nothing gets submitted anywhere (yet).</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 4 }}>
            <div>
              <label style={{ display: "block", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: C.navy, marginBottom: 8, fontWeight: 600 }}>First Name</label>
              <input type="text" placeholder="First" value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                style={{ width: "100%", padding: "14px 16px", border: `1px solid ${C.creamDark}`, background: C.cream, fontSize: 14, color: C.navy, outline: "none", transition: "border-color 0.3s" }}
                onFocus={e => e.target.style.borderColor = C.blue} onBlur={e => e.target.style.borderColor = C.creamDark} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: C.navy, marginBottom: 8, fontWeight: 600 }}>Last Name</label>
              <input type="text" placeholder="Last" value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                style={{ width: "100%", padding: "14px 16px", border: `1px solid ${C.creamDark}`, background: C.cream, fontSize: 14, color: C.navy, outline: "none", transition: "border-color 0.3s" }}
                onFocus={e => e.target.style.borderColor = C.blue} onBlur={e => e.target.style.borderColor = C.creamDark} />
            </div>
          </div>
          <div style={{ marginBottom: 4 }}>{field("Email", "email", "email", "you@example.com")}</div>
          <div style={{ marginBottom: 4 }}>{field("Phone", "phone", "tel", "(555) 000-0000")}</div>
          <div style={{ marginBottom: 4 }}>{field("Instagram Handle", "instagram", "text", "@yourhandle")}</div>
          <div style={{ marginBottom: 4 }}>{field("City", "city", "text", "Denver, CO")}</div>
          <div style={{ marginBottom: 4 }}>{field("Why do you want to join SLYC?", "why", "text", "Tell us why you belong here...")}</div>
          <div style={{ marginBottom: 32 }}>{field("Referred by a member?", "referral", "text", "Member's name (optional)")}</div>

          <button
            onClick={() => setSubmitted(true)}
            style={{ width: "100%", padding: "16px", background: C.navy, color: C.cream, border: "none", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, cursor: "pointer", transition: "background 0.3s" }}
            onMouseEnter={e => e.target.style.background = C.orange}
            onMouseLeave={e => e.target.style.background = C.navy}
          >Submit Application</button>
        </div>
        <p style={{ textAlign: "center", fontSize: 13, color: C.textMuted, marginTop: 32 }}>
          Already a member? <a onClick={() => setPage("members")} style={{ color: C.orange, textDecoration: "none", fontWeight: 600, cursor: "pointer" }}>Sign in</a>
        </p>
      </div>
    </div>
  );
}

// ─── HOME PAGE ───
function HomePage({ setPage, setSelectedProduct }) {
  return (
    <>
      <Hero setPage={setPage} />
      <Marquee />
      <About />
      <TripsSection />
      <FeaturedProducts setPage={setPage} setSelectedProduct={setSelectedProduct} />
      <EventsSection />
      <LifestyleQuote />
      <MembersSection setPage={setPage} />
    </>
  );
}

// ─── APP ───
export default function App() {
  const [page, setPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: C.white, color: C.navy, minHeight: "100vh" }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scrollPulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }
        .nav-mobile { display: none !important; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
        }
        input::placeholder { color: ${C.textMuted}; opacity: 0.6; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${C.cream}; }
        ::-webkit-scrollbar-thumb { background: ${C.navy}; border-radius: 3px; }
      `}</style>
      <Nav page={page} setPage={p => setPage(p)} cart={cart} setCartOpen={setCartOpen} />
      <CartDrawer cart={cart} setCart={setCart} open={cartOpen} setOpen={setCartOpen} setPage={setPage} />
      {page === "home"    && <HomePage setPage={setPage} setSelectedProduct={setSelectedProduct} />}
      {page === "shop"    && <ShopPage setPage={setPage} setSelectedProduct={setSelectedProduct} />}
      {page === "product" && <ProductPage productId={selectedProduct} setPage={setPage} cart={cart} setCart={setCart} setSelectedProduct={setSelectedProduct} />}
      {page === "members" && <MembersPage setPage={setPage} />}
      {page === "apply"   && <ApplyPage setPage={setPage} />}
      <Footer setPage={p => { setPage(p); window.scrollTo(0, 0); }} />
    </div>
  );
}
