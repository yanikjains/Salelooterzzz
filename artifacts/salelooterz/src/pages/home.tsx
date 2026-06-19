import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const TELEGRAM_URL = "https://t.me/salelooterz";
const WHATSAPP_URL = "https://whatsapp.com/channel/salelooterz";

// ── Design tokens ──────────────────────────────────────────────────────────────
const BG      = "#ffffff";
const OUTER   = "#fce8ef";      // soft pink outer background (like the reference)
const YELLOW  = "#f5d742";      // bright yellow for stat cards
const PURPLE  = "#ede9ff";      // soft purple cards
const ORANGE  = "#ea580c";      // brand orange
const GREEN   = "#d1fae5";      // soft green
const TEXT    = "#0a0a0a";
const TEXT2   = "#6b7280";
const BORDER  = "rgba(0,0,0,0.07)";
const R       = "24px";         // global border radius

// ── Ease ───────────────────────────────────────────────────────────────────────
const EXPO: [number,number,number,number] = [0.16, 1, 0.3, 1];

// ── Icons ──────────────────────────────────────────────────────────────────────
function TelegramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}
function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

// ── Splash ─────────────────────────────────────────────────────────────────────
const EXPO_EASE: [number,number,number,number] = [0.16, 1, 0.3, 1];

function MaskedReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div style={{ overflow: "hidden" }}>
      <motion.div initial={{ y: "110%" }} animate={{ y: "0%" }}
        transition={{ duration: 1, ease: EXPO_EASE, delay }}>
        {children}
      </motion.div>
    </div>
  );
}

function SplashScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 3400); return () => clearTimeout(t); }, [onDone]);
  return (
    <motion.div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none"
      style={{ background: "#0a0a0a" }}
      exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}>
      <motion.div className="absolute top-6 left-8 text-xs font-semibold uppercase tracking-widest"
        style={{ color: "rgba(255,255,255,0.2)", letterSpacing: "0.18em" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.6 }}>
        Est. 2021 · India
      </motion.div>
      <motion.div className="absolute top-6 right-8 text-xs font-semibold uppercase tracking-widest"
        style={{ color: "rgba(255,255,255,0.2)", letterSpacing: "0.18em" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.6 }}>
        2.63M+ Members
      </motion.div>
      <div className="flex flex-col items-center gap-5">
        <MaskedReveal delay={0.1}>
          <img src="/assets/logo.jpg" alt="Salelooterz" className="h-16 w-16 rounded-2xl object-contain"
            style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.06)" }} />
        </MaskedReveal>
        <MaskedReveal delay={0.28}>
          <h1 className="font-black italic uppercase leading-none"
            style={{ fontSize: "clamp(3.5rem, 12vw, 9rem)", color: "#ffffff", letterSpacing: "-0.035em" }}>
            Salelooterz
          </h1>
        </MaskedReveal>
        <div style={{ width: "100%", overflow: "hidden", height: 2 }}>
          <motion.div style={{ height: "100%", background: ORANGE, transformOrigin: "left" }}
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.9, ease: EXPO_EASE }} />
        </div>
        <MaskedReveal delay={1.1}>
          <p className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.22em" }}>
            India's #1 Deal Alert Community
          </p>
        </MaskedReveal>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: "rgba(255,255,255,0.06)" }}>
        <motion.div className="h-full" style={{ background: ORANGE }}
          initial={{ width: "0%" }} animate={{ width: "100%" }}
          transition={{ delay: 0.4, duration: 2.6, ease: "linear" }} />
      </div>
    </motion.div>
  );
}

// ── Root ───────────────────────────────────────────────────────────────────────
export default function Home() {
  const [splashDone, setSplashDone] = useState(false);
  return (
    <>
      <AnimatePresence>{!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}</AnimatePresence>
      <motion.div style={{ background: OUTER, minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}
        initial={{ opacity: 0 }} animate={{ opacity: splashDone ? 1 : 0 }} transition={{ duration: 0.5 }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 pb-10 space-y-6">
          <Navbar />
          <Hero />
          <PlatformStrip />
          <AboutUs />
          <HowItWorks />
          <CommunityStats />
          <Testimonials />
          <FAQ />
          <FinalCTA />
        </div>
        <Footer />
      </motion.div>
    </>
  );
}

// ── Shared card ────────────────────────────────────────────────────────────────
function Card({ children, bg = BG, style = {}, className = "" }: {
  children: React.ReactNode; bg?: string; style?: React.CSSProperties; className?: string;
}) {
  return (
    <div className={className} style={{ background: bg, borderRadius: R, overflow: "hidden", ...style }}>
      {children}
    </div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EXPO }}
      className="sticky top-4 z-50 mb-6" style={{ paddingTop: 16 }}>
      <Card style={{
        padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.08)" : "0 2px 8px rgba(0,0,0,0.05)",
        transition: "box-shadow 0.3s",
      }}>
        <a href="#" className="flex items-center gap-2 no-underline">
          <img src="/assets/logo.jpg" alt="Salelooterz" className="h-8 w-8 rounded-xl object-contain" />
          <span className="font-black text-lg" style={{ color: TEXT, letterSpacing: "-0.03em" }}>Salelooterz</span>
        </a>
        <div className="flex items-center gap-2">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all hover:bg-black/5"
            style={{ border: `1.5px solid ${BORDER}`, color: TEXT }}>
            <WhatsAppIcon size={13} /> WhatsApp
          </a>
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white transition-all hover:opacity-90"
            style={{ background: TEXT }}>
            <TelegramIcon size={13} /> Join — Free
          </a>
        </div>
      </Card>
    </motion.header>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <Card style={{ position: "relative" }}>
      {/* ── BIG DECORATIVE "SALE" background text ── */}
      <motion.div
        className="absolute bottom-0 left-0 pointer-events-none select-none overflow-hidden"
        style={{ lineHeight: 1 }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 1.1, ease: EXPO }}>
        <span style={{
          fontSize: "clamp(90px, 20vw, 210px)",
          fontWeight: 900,
          letterSpacing: "-0.05em",
          lineHeight: 0.82,
          color: "transparent",
          WebkitTextStroke: "2px rgba(234,88,12,0.13)",
          userSelect: "none",
          display: "block",
          paddingLeft: 32,
        }}>SALE</span>
      </motion.div>

      <div className="grid lg:grid-cols-[1fr_auto] gap-0">
        {/* Left */}
        <div className="p-8 md:p-12 flex flex-col justify-between min-h-[480px]">
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-6"
                style={{ background: `${ORANGE}15`, color: ORANGE }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ORANGE }} />
                500+ deals posted today
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: EXPO }}
              className="font-black leading-tight mb-4"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", color: TEXT, letterSpacing: "-0.03em" }}>
              Meet India's biggest<br />
              <span style={{
                color: "transparent",
                WebkitTextStroke: "2px " + ORANGE,
                display: "inline",
              }}>deal alert</span>{" "}
              <span style={{ color: ORANGE }}>community</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="text-base leading-relaxed mb-8 max-w-md" style={{ color: TEXT2 }}>
              Instant deal alerts, flash sales, and massive discounts on electronics, fashion, food, and travel —
              delivered straight to your phone.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap gap-3">
              <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white hover:opacity-90 transition-all active:scale-95"
                style={{ background: TEXT }}>
                <TelegramIcon size={14} /> Join Telegram — Free
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold hover:bg-black/5 transition-all active:scale-95"
                style={{ border: `1.5px solid ${BORDER}`, color: TEXT }}>
                <WhatsAppIcon size={14} /> Join WhatsApp
              </a>
            </motion.div>
          </div>

          {/* Yellow stat card */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6, ease: EXPO }}
            className="mt-10 inline-flex items-center gap-4 px-5 py-4 rounded-2xl w-fit"
            style={{ background: YELLOW }}>
            <div>
              <p className="text-3xl font-black" style={{ color: TEXT }}>2.63M+</p>
              <p className="text-xs font-semibold mt-0.5" style={{ color: "rgba(0,0,0,0.5)" }}>Members across India</p>
            </div>
            <div className="w-px h-10 bg-black/10" />
            <div>
              <p className="text-3xl font-black" style={{ color: TEXT }}>80%</p>
              <p className="text-xs font-semibold mt-0.5" style={{ color: "rgba(0,0,0,0.5)" }}>Average discount</p>
            </div>
          </motion.div>
        </div>

        {/* Right: image collage */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: EXPO }}
          className="hidden lg:flex flex-col gap-3 p-4 w-72 xl:w-80"
          style={{ background: OUTER }}>
          {/* Top image */}
          <div className="relative rounded-2xl overflow-hidden flex-1" style={{ minHeight: 160, background: "#f3f4f6" }}>
            <img src="/assets/product1.png" alt="Deal" className="w-full h-full object-cover" />
            <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white"
              style={{ background: ORANGE }}>37% OFF</div>
          </div>
          {/* Bottom two */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "1", background: "#f3f4f6" }}>
              <img src="/assets/product3.png" alt="Deal" className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold text-white"
                style={{ background: "#7c3aed" }}>⚡ Flash</div>
            </div>
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "1", background: "#f3f4f6" }}>
              <img src="/assets/hero.png" alt="Deal" className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold"
                style={{ background: YELLOW, color: TEXT }}>🔥 Hot</div>
            </div>
          </div>
          {/* Floating stat */}
          <div className="rounded-2xl p-4" style={{ background: BG }}>
            <p className="text-xs font-semibold mb-1" style={{ color: TEXT2 }}>Deals today</p>
            <p className="text-2xl font-black" style={{ color: TEXT }}>500+</p>
            <div className="flex gap-1 mt-2">
              {["Electronics","Fashion","Food","Travel"].map(c => (
                <span key={c} className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: PURPLE, color: "#7c3aed" }}>{c}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Card>
  );
}

// ── Platform Strip ─────────────────────────────────────────────────────────────
function PlatformStrip() {
  const brands = ["Amazon", "Flipkart", "Myntra", "Nykaa", "Meesho", "Ajio", "Swiggy", "Zomato"];
  return (
    <Card className="py-5 px-8">
      <p className="text-xs font-semibold text-center mb-4 uppercase tracking-widest" style={{ color: TEXT2 }}>
        Deals from your favourite platforms
      </p>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {brands.map(b => (
          <span key={b} className="text-sm font-black" style={{ color: "rgba(0,0,0,0.25)", letterSpacing: "-0.02em" }}>{b}</span>
        ))}
      </div>
    </Card>
  );
}

// ── About Us ───────────────────────────────────────────────────────────────────
function AboutUs() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Left: Story card */}
      <Card className="p-8 md:p-10 flex flex-col justify-between" style={{ minHeight: 420 }}>
        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-5"
            style={{ background: PURPLE, color: "#7c3aed" }}>About Us</span>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: EXPO }}
            className="font-black leading-tight mb-4"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: TEXT, letterSpacing: "-0.03em" }}>
            Built by a frustrated shopper, for every shopper
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.6 }}
            className="text-sm leading-relaxed mb-3" style={{ color: TEXT2 }}>
            Salelooterz was started in 2021 by The Yanik — someone who got tired of spending hours
            comparing prices, hunting coupons, and missing flash sales by minutes.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.25, duration: 0.6 }}
            className="text-sm leading-relaxed" style={{ color: TEXT2 }}>
            What started as a small Telegram group of friends has grown into India's largest deal alert
            community — with 2.63 million members and hundreds of verified deals posted every single day.
          </motion.p>
        </div>

        {/* Mission stat */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 p-5 rounded-2xl" style={{ background: OUTER }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: TEXT2 }}>Our mission</p>
          <p className="font-black text-lg leading-snug" style={{ color: TEXT, letterSpacing: "-0.02em" }}>
            Make sure no Indian ever pays full price again.
          </p>
        </motion.div>
      </Card>

      {/* Right: Founder + values */}
      <div className="flex flex-col gap-4">
        {/* Founder card */}
        <Card bg={TEXT} style={{ flex: 1, padding: "28px", display: "flex", gap: "20px", alignItems: "flex-start", minHeight: 220 }}>
          <div className="rounded-2xl overflow-hidden shrink-0" style={{ width: 80, height: 80 }}>
            <img src="/assets/founder.jpeg" alt="The Yanik" className="w-full h-full object-cover object-top" />
          </div>
          <div className="flex flex-col justify-between h-full">
            <div>
              <p className="text-white font-black text-lg leading-tight mb-1" style={{ letterSpacing: "-0.02em" }}>The Yanik</p>
              <p className="text-xs font-semibold mb-4" style={{ color: ORANGE }}>Founder & Chief Deal Hunter</p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                "I was tired of overpaying. So I built a community to make sure no one else had to."
              </p>
            </div>
            <div className="flex gap-3 mt-5">
              <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white hover:opacity-80 transition-all"
                style={{ background: ORANGE }}>
                <TelegramIcon size={12} /> Follow on Telegram
              </a>
            </div>
          </div>
        </Card>

        {/* Values grid */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: "🚫", label: "Zero Spam",     desc: "Every post is a real, verified deal", bg: BG },
            { icon: "⚡", label: "Instant Alerts", desc: "Deals reach you before anyone else",  bg: YELLOW },
            { icon: "💯", label: "100% Free",      desc: "No fees, no premium tiers, ever",     bg: PURPLE },
            { icon: "🎯", label: "Curated Picks",  desc: "Human-vetted, not bot-generated",     bg: GREEN },
          ].map((v, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5, ease: EXPO }}>
              <Card bg={v.bg} style={{ padding: "20px" }}>
                <div className="text-2xl mb-2">{v.icon}</div>
                <p className="font-black text-sm mb-1" style={{ color: TEXT, letterSpacing: "-0.02em" }}>{v.label}</p>
                <p className="text-xs leading-relaxed" style={{ color: TEXT2 }}>{v.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── How It Works ───────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { num: "01", icon: "📲", title: "Join Our Channel",   desc: "Click Telegram or WhatsApp to join instantly — completely free, forever.", bg: YELLOW },
    { num: "02", icon: "⚡", title: "Get Instant Alerts", desc: "Flash sales and price drops hit your phone the moment they go live.",        bg: PURPLE },
    { num: "03", icon: "🎯", title: "Loot the Savings",   desc: "Click the verified link, claim the deal. No hidden fees, no catch.",         bg: BG },
  ];

  return (
    <div>
      <Card className="p-8 md:p-10 mb-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
          style={{ background: `${ORANGE}15`, color: ORANGE }}>How it works</span>
        <h2 className="font-black leading-tight mb-2"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: TEXT, letterSpacing: "-0.03em" }}>
          Three steps to never<br />paying full price again
        </h2>
        <p className="text-sm" style={{ color: TEXT2 }}>Simple, instant, and completely free.</p>
      </Card>
      <div className="grid md:grid-cols-3 gap-5">
        {steps.map((step, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6, ease: EXPO }}>
            <Card bg={step.bg} style={{ padding: "28px", height: "100%" }}>
              <div className="text-3xl mb-4">{step.icon}</div>
              <p className="text-5xl font-black mb-3 leading-none" style={{ color: TEXT, opacity: 0.08 }}>{step.num}</p>
              <h3 className="font-black text-lg mb-2" style={{ color: TEXT, letterSpacing: "-0.02em" }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: TEXT2 }}>{step.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Community Stats ────────────────────────────────────────────────────────────
function CommunityStats() {
  const stats = [
    { v: "2.63M+",   l: "Active members",       sub: "Across Telegram & WhatsApp", bg: TEXT,   textColor: "#fff",          subColor: "rgba(255,255,255,0.4)" },
    { v: "500+",     l: "Deals per day",         sub: "Across all categories",      bg: YELLOW, textColor: TEXT,            subColor: "rgba(0,0,0,0.45)" },
    { v: "₹100Cr+",  l: "Community savings",     sub: "Estimated total saved",      bg: PURPLE, textColor: TEXT,            subColor: "rgba(0,0,0,0.45)" },
    { v: "4.9★",     l: "Member rating",         sub: "Based on community reviews", bg: BG,     textColor: TEXT,            subColor: TEXT2 },
    { v: "80%",      l: "Average discount",      sub: "On all posted deals",        bg: BG,     textColor: TEXT,            subColor: TEXT2 },
    { v: "3+",       l: "Years running",         sub: "Trusted since 2021",         bg: `${ORANGE}15`, textColor: ORANGE,  subColor: "rgba(234,88,12,0.5)" },
  ];

  return (
    <div>
      <Card className="p-8 mb-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
          style={{ background: PURPLE, color: "#7c3aed" }}>Community benchmarks</span>
        <h2 className="font-black leading-tight"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: TEXT, letterSpacing: "-0.03em" }}>
          The numbers speak<br />for themselves
        </h2>
      </Card>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.5, ease: EXPO }}>
            <Card bg={s.bg} style={{ padding: "28px" }}>
              <p className="text-4xl font-black mb-1" style={{ color: s.textColor, letterSpacing: "-0.03em" }}>{s.v}</p>
              <p className="font-bold text-sm mb-1" style={{ color: s.textColor }}>{s.l}</p>
              <p className="text-xs" style={{ color: s.subColor }}>{s.sub}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Testimonials ───────────────────────────────────────────────────────────────
function Testimonials() {
  const reviews = [
    { name: "Priya Sharma",  loc: "Delhi",     text: "I saved ₹12,000 on my laptop because of a deal from Salelooterz. The best Telegram channel I've ever joined.", bg: YELLOW },
    { name: "Rahul Verma",   loc: "Mumbai",    text: "Deals are legit and instant. By the time I see a flash sale on social media, Salelooterz posted it 2 hours earlier.", bg: BG },
    { name: "Sneha Iyer",    loc: "Bangalore", text: "I've shared this channel with my entire family. We collectively save thousands every month.", bg: PURPLE },
    { name: "Arjun Mehta",   loc: "Hyderabad", text: "Got a 77% off deal on earbuds I'd been eyeing for months. The channel posts crazy deals daily.", bg: BG },
    { name: "Divya Nair",    loc: "Chennai",   text: "Zero spam. Only real deals. Finally a group worth keeping notifications on for.", bg: `${ORANGE}15` },
    { name: "Karan Patel",   loc: "Ahmedabad", text: "Joined 6 months ago and saved over ₹25,000. This community completely changed how I shop online.", bg: TEXT },
  ];

  return (
    <div>
      <Card className="p-8 mb-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
          style={{ background: YELLOW, color: TEXT }}>Member stories</span>
        <h2 className="font-black leading-tight"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: TEXT, letterSpacing: "-0.03em" }}>
          Real people,<br />real savings
        </h2>
      </Card>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {reviews.map((r, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.5, ease: EXPO }}>
            <Card bg={r.bg} style={{ padding: "24px", height: "100%" }}>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} width="12" height="12" viewBox="0 0 24 24"
                    style={{ fill: r.bg === TEXT ? "rgba(255,255,255,0.4)" : ORANGE }}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-5"
                style={{ color: r.bg === TEXT ? "rgba(255,255,255,0.6)" : TEXT2 }}>"{r.text}"</p>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0"
                  style={{ background: r.bg === TEXT ? ORANGE : TEXT }}>
                  {r.name[0]}
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: r.bg === TEXT ? "#fff" : TEXT }}>{r.name}</p>
                  <p className="text-xs" style={{ color: r.bg === TEXT ? "rgba(255,255,255,0.4)" : TEXT2 }}>{r.loc}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── FAQ ─────────────────────────────────────────────────────────────────────────
function FAQ() {
  const faqs = [
    { q: "Is Salelooterz completely free to join?",       a: "Yes, 100% free. Always has been, always will be. We share deals because we're passionate about helping people save." },
    { q: "How many deals are shared per day?",             a: "We typically share 500+ deals per day across Telegram and WhatsApp — electronics, fashion, food, travel, home goods, and more." },
    { q: "Will I get spammed with unnecessary messages?",  a: "Absolutely not. Every message is a verified deal with a real discount. No promotional fluff, no sponsored junk." },
    { q: "Are the deals only for India?",                  a: "Primarily yes — most deals are from Amazon India, Flipkart, Myntra, Nykaa, Meesho, and others. We occasionally share international deals too." },
    { q: "How do I claim a deal once I see it?",           a: "Each deal post includes a direct link. Just click it and you'll be taken straight to the checkout or coupon page." },
    { q: "Can I submit deals I've found myself?",          a: "Yes! Message our admin on Telegram. We verify and post the best community-submitted deals too." },
  ];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      <Card className="p-8 mb-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
          style={{ background: `${ORANGE}15`, color: ORANGE }}>FAQ</span>
        <h2 className="font-black leading-tight"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: TEXT, letterSpacing: "-0.03em" }}>
          Got questions?<br />We've got answers.
        </h2>
      </Card>
      <Card>
        {faqs.map((faq, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
            <button onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-7 py-5 text-left hover:bg-black/[0.015] transition-colors"
              style={{ borderBottom: i < faqs.length - 1 ? `1px solid ${BORDER}` : "none" }}>
              <span className="font-semibold text-sm pr-6" style={{ color: TEXT }}>{faq.q}</span>
              <ChevronDown className="w-4 h-4 shrink-0 transition-transform duration-300"
                style={{ color: ORANGE, transform: open === i ? "rotate(180deg)" : "rotate(0deg)" }} />
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div key="body" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}
                  className="overflow-hidden" style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <p className="px-7 pb-5 pt-3 text-sm leading-relaxed" style={{ color: TEXT2 }}>{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </Card>
    </div>
  );
}

// ── Final CTA ──────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.7, ease: EXPO }}>
      <Card bg={TEXT} style={{ padding: "60px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 60% 60% at 50% 0%, rgba(234,88,12,0.18) 0%, transparent 70%)` }} />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-6"
            style={{ background: `${ORANGE}25`, color: ORANGE }}>
            Join 2.63M+ smart shoppers
          </div>
          <h2 className="font-black text-white mb-4 leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em" }}>
            Ready to start saving?
          </h2>
          <p className="text-base mb-10 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>
            Free to join. Deals every day. No spam. No catch.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white hover:opacity-90 transition-all active:scale-95"
              style={{ background: ORANGE }}>
              <TelegramIcon size={14} /> Join Telegram — Free
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white hover:bg-white/10 transition-all active:scale-95"
              style={{ border: "1.5px solid rgba(255,255,255,0.15)" }}>
              <WhatsAppIcon size={14} /> Join WhatsApp
            </a>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="max-w-6xl mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <img src="/assets/logo.jpg" alt="Salelooterz" className="h-7 w-7 rounded-xl object-contain" />
          <span className="font-black text-base" style={{ color: TEXT, letterSpacing: "-0.03em" }}>Salelooterz</span>
        </div>
        <div className="flex flex-wrap justify-center gap-5 text-xs" style={{ color: TEXT2 }}>
          {["Privacy Policy","Terms","Contact","About"].map(l => (
            <a key={l} href="#" className="hover:text-black transition-colors">{l}</a>
          ))}
        </div>
        <p className="text-xs" style={{ color: "rgba(107,114,128,0.5)" }}>© {new Date().getFullYear()} Salelooterz</p>
      </div>
    </footer>
  );
}
