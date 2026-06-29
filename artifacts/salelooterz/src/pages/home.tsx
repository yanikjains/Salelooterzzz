import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";

const TELEGRAM_URL  = "https://t.me/salelooterz";
const WHATSAPP_URL  = "https://whatsapp.com/channel/salelooterz";

// ── Palette ────────────────────────────────────────────────────────────────────
const BG      = "#0e0c0a";
const SURFACE = "#181410";
const CARD    = "#1f1b16";
const CARD2   = "#252018";
const BROWN   = "#b8834a";
const BROWN2  = "#8a6035";
const CREAM   = "#f2ead8";
const TEXT    = "#f5f0e8";
const TEXT2   = "rgba(242,234,216,0.4)";
const BORDER  = "rgba(184,131,74,0.15)";

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

// ── 3D Tilt card hook ──────────────────────────────────────────────────────────
function use3DTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const x   = useMotionValue(0);
  const y   = useMotionValue(0);
  const rx  = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]),  { stiffness: 200, damping: 20 });
  const ry  = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]),  { stiffness: 200, damping: 20 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((e.clientX - left) / width  - 0.5);
    y.set((e.clientY - top)  / height - 0.5);
  }
  function onMouseLeave() { x.set(0); y.set(0); }

  return { ref, rx, ry, onMouseMove, onMouseLeave };
}

// ── Grain overlay (adds luxury texture) ───────────────────────────────────────
function Grain() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[999] opacity-[0.035]"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat", backgroundSize: "200px" }} />
  );
}

// ── Splash ─────────────────────────────────────────────────────────────────────
function SplashScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, [onDone]);
  return (
    <motion.div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none"
      style={{ background: BG }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EXPO }}
        className="flex flex-col items-center gap-6">
        <motion.img src="/assets/logo.jpg" alt="Salelooterz"
          className="h-16 w-16 rounded-2xl object-contain"
          initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: EXPO }}
          style={{ boxShadow: `0 0 60px ${BROWN}40` }} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-center mb-3"
            style={{ color: TEXT2 }}>Est. 2021 · India</p>
          <h1 className="font-black uppercase text-center leading-none"
            style={{ fontSize: "clamp(3rem, 10vw, 7rem)", color: TEXT, letterSpacing: "-0.04em" }}>
            SALELOOTERZ
          </h1>
        </div>
        <div style={{ width: 240, height: 1, background: BORDER, position: "relative", overflow: "hidden" }}>
          <motion.div style={{ position: "absolute", inset: 0, background: BROWN, transformOrigin: "left" }}
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 2, ease: "linear" }} />
        </div>
        <p className="text-xs font-medium tracking-[0.3em] uppercase" style={{ color: TEXT2 }}>
          India's #1 Deal Alert Community
        </p>
      </motion.div>
    </motion.div>
  );
}

// ── Root ───────────────────────────────────────────────────────────────────────
export default function Home() {
  const [splashDone, setSplashDone] = useState(false);
  return (
    <div style={{ background: BG, fontFamily: "'Inter', sans-serif" }}>
      <Grain />
      <AnimatePresence>{!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}</AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: splashDone ? 1 : 0 }} transition={{ duration: 0.7 }}>
        <Navbar />
        <Hero />
        <MarqueeStrip />
        <Stats />
        <DealShowcase />
        <FAQ />
        <FinalCTA />
        <Footer />
      </motion.div>
    </div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EXPO }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-14 py-5"
      style={{
        background: scrolled ? `${BG}e8` : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${BORDER}` : "none",
        transition: "all 0.4s ease",
      }}>
      <a href="#" className="flex items-center gap-3 no-underline">
        <img src="/assets/logo.jpg" alt="Salelooterz" className="h-8 w-8 rounded-xl object-contain"
          style={{ boxShadow: `0 0 20px ${BROWN}30` }} />
        <span className="font-black text-base tracking-tight" style={{ color: CREAM, letterSpacing: "-0.02em" }}>
          SaleLooterz
        </span>
      </a>
      <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold transition-all hover:opacity-80 active:scale-95"
        style={{
          background: BROWN,
          color: BG,
          borderRadius: 100,
        }}>
        <TelegramIcon size={13} /> Join Telegram
      </a>
    </motion.header>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y    = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16">
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)",
          width: 700, height: 700, borderRadius: "50%",
          background: `radial-gradient(circle, ${BROWN}18 0%, transparent 65%)`,
        }} />
        <div style={{
          position: "absolute", bottom: 0, left: "20%",
          width: 400, height: 400, borderRadius: "50%",
          background: `radial-gradient(circle, rgba(90,55,20,0.2) 0%, transparent 70%)`,
        }} />
      </div>

      {/* Top label */}
      <motion.p style={{ y, opacity: fade }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.7 }}
        className="text-xs font-semibold uppercase tracking-[0.28em] mb-8"
        style={{ color: BROWN }}>
        India's #1 Deal Alert Community
      </motion.p>

      {/* Main headline */}
      <motion.h1 style={{ y, opacity: fade }}
        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.9, ease: EXPO }}
        className="font-black text-center leading-none mb-8"
        style={{ fontSize: "clamp(3.5rem, 9vw, 8.5rem)", color: TEXT, letterSpacing: "-0.045em", maxWidth: 900 }}>
        Stop Overpaying.{" "}
        <span style={{
          color: "transparent",
          WebkitTextStroke: `1.5px ${BROWN}`,
          display: "inline",
        }}>Start Saving</span>{" "}Big.
      </motion.h1>

      {/* Sub */}
      <motion.p style={{ y, opacity: fade }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.38, duration: 0.7 }}
        className="text-center max-w-md mb-12 text-base leading-relaxed"
        style={{ color: TEXT2 }}>
        Join 2.63M+ shoppers getting instant alerts on the best deals across India.
        Flash sales, price drops &amp; crazy discounts.
      </motion.p>

      {/* CTA buttons */}
      <motion.div style={{ y, opacity: fade }}
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.52, duration: 0.6 }}
        className="flex flex-wrap gap-3 justify-center mb-20">
        <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-all hover:opacity-85 active:scale-95"
          style={{ background: BROWN, color: BG }}>
          <TelegramIcon size={14} /> Join on Telegram
        </a>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-all hover:bg-white/5 active:scale-95"
          style={{ border: `1px solid ${BORDER}`, color: TEXT }}>
          <WhatsAppIcon size={14} /> Join on WhatsApp
        </a>
      </motion.div>

      {/* 3D Product cards row */}
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 1, ease: EXPO }}
        className="w-full max-w-5xl relative"
        style={{ perspective: 1000 }}>
        <div className="flex gap-4 justify-center items-end">
          {[
            { src: "/assets/product1.png", label: "37% OFF",     rotate: -6, translateY: 20,  zIndex: 1 },
            { src: "/assets/product3.png", label: "⚡ Flash",    rotate: -2, translateY: 8,   zIndex: 2 },
            { src: "/assets/hero.png",     label: "🔥 Hot Deal", rotate: 0,  translateY: 0,   zIndex: 3 },
            { src: "/assets/product2.png", label: "Up to 80%",   rotate: 2,  translateY: 8,   zIndex: 2 },
            { src: "/assets/product1.png", label: "Loot Price",  rotate: 6,  translateY: 20,  zIndex: 1 },
          ].map((card, i) => (
            <HeroCard key={i} {...card} delay={0.7 + i * 0.07} />
          ))}
        </div>
        {/* Reflection gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: `linear-gradient(to top, ${BG} 0%, transparent 100%)` }} />
      </motion.div>
    </section>
  );
}

function HeroCard({ src, label, rotate, translateY, zIndex, delay }: {
  src: string; label: string; rotate: number; translateY: number; zIndex: number; delay: number;
}) {
  const { ref, rx, ry, onMouseMove, onMouseLeave } = use3DTilt();
  return (
    <motion.div ref={ref} style={{ zIndex, rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: translateY }}
      transition={{ delay, duration: 0.9, ease: EXPO }}
      onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
      className="relative rounded-2xl overflow-hidden shrink-0 cursor-pointer"
      whileHover={{ scale: 1.04, y: translateY - 8, transition: { duration: 0.3, ease: "easeOut" } }}
      style={{
        width: 160, aspectRatio: "3/4",
        transform: `rotate(${rotate}deg)`,
        background: CARD,
        boxShadow: `0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px ${BORDER}, inset 0 1px 0 rgba(255,255,255,0.04)`,
      }}>
      <img src={src} alt="Deal" className="w-full h-full object-cover" />
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)" }} />
      <span className="absolute bottom-3 left-3 right-3 text-[10px] font-bold text-center py-1 px-2 rounded-full"
        style={{ background: BROWN, color: BG }}>
        {label}
      </span>
    </motion.div>
  );
}

// ── Marquee strip ──────────────────────────────────────────────────────────────
const MARQUEE_ITEMS = ["Amazon", "Flipkart", "Myntra", "Nykaa", "Meesho", "Ajio", "Swiggy", "Zomato", "boAt", "Croma"];

function MarqueeStrip() {
  return (
    <div className="relative overflow-hidden py-5"
      style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, background: SURFACE }}>
      <div className="flex gap-16 items-center whitespace-nowrap"
        style={{ animation: "marquee 22s linear infinite" }}>
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((b, i) => (
          <span key={i} className="text-sm font-black uppercase tracking-wider shrink-0"
            style={{ color: TEXT2, letterSpacing: "0.1em" }}>{b}</span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-33.333%) } }`}</style>
    </div>
  );
}

// ── Stats ──────────────────────────────────────────────────────────────────────
const STAT_DATA = [
  { value: "2.63M+",  label: "Active Members",        sub: "Telegram & WhatsApp combined" },
  { value: "500+",    label: "Deals Posted Daily",     sub: "Across all categories"        },
  { value: "₹100Cr+", label: "Community Savings",     sub: "Estimated total saved"        },
  { value: "4.9★",    label: "Member Satisfaction",   sub: "Based on community reviews"   },
];

function Stats() {
  return (
    <section className="px-6 md:px-14 py-28">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: EXPO }}
          className="mb-16 text-center">
          <p className="text-xs uppercase tracking-[0.28em] font-semibold mb-4" style={{ color: BROWN }}>By the numbers</p>
          <h2 className="font-black leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: TEXT, letterSpacing: "-0.04em" }}>
            The community<br />speaks for itself
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STAT_DATA.map((s, i) => {
            const { ref, rx, ry, onMouseMove, onMouseLeave } = use3DTilt();
            return (
              <motion.div key={i} ref={ref} style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7, ease: EXPO }}
                onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
                className="rounded-2xl p-7 relative overflow-hidden"
                style={{
                  background: CARD,
                  border: `1px solid ${BORDER}`,
                  boxShadow: `0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)`,
                }}>
                <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
                  style={{ background: `radial-gradient(circle at top right, ${BROWN}18, transparent 70%)` }} />
                <p className="font-black mb-2 leading-none" style={{ fontSize: "clamp(2.2rem, 4vw, 3rem)", color: CREAM, letterSpacing: "-0.04em" }}>{s.value}</p>
                <p className="font-bold text-sm mb-1.5" style={{ color: TEXT }}>{s.label}</p>
                <p className="text-xs" style={{ color: TEXT2 }}>{s.sub}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Deal Showcase ──────────────────────────────────────────────────────────────
function DealShowcase() {
  const deals = [
    { src: "/assets/product1.png", title: "Electronics",   pct: "Up to 70% OFF",  cat: "boAt · Samsung · JBL"     },
    { src: "/assets/product3.png", title: "Fashion",       pct: "Up to 85% OFF",  cat: "Myntra · Ajio · Meesho"  },
    { src: "/assets/product2.png", title: "Home & Living", pct: "Up to 60% OFF",  cat: "Amazon · Flipkart · Pepperfry" },
  ];

  return (
    <section className="px-6 md:px-14 pb-28">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] font-semibold mb-4" style={{ color: BROWN }}>What we cover</p>
            <h2 className="font-black leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: TEXT, letterSpacing: "-0.04em" }}>
              Every category.<br />Every platform.
            </h2>
          </div>
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm shrink-0 transition-all hover:opacity-80"
            style={{ border: `1px solid ${BORDER}`, color: TEXT }}>
            <TelegramIcon size={13} /> See all deals
          </a>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {deals.map((d, i) => {
            const { ref, rx, ry, onMouseMove, onMouseLeave } = use3DTilt();
            return (
              <motion.div key={i} ref={ref} style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7, ease: EXPO }}
                onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
                className="rounded-2xl overflow-hidden group cursor-pointer"
                style={{
                  background: CARD,
                  border: `1px solid ${BORDER}`,
                  boxShadow: "0 16px 50px rgba(0,0,0,0.35)",
                  aspectRatio: "4/5",
                  position: "relative",
                }}>
                <img src={d.src} alt={d.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(14,12,10,0.95) 0%, rgba(14,12,10,0.2) 50%, transparent 100%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: BROWN }}>{d.pct}</p>
                  <h3 className="font-black text-2xl mb-1.5" style={{ color: TEXT, letterSpacing: "-0.03em" }}>{d.title}</h3>
                  <p className="text-xs" style={{ color: TEXT2 }}>{d.cat}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── FAQ ────────────────────────────────────────────────────────────────────────
const FAQS = [
  { q: "Is Salelooterz completely free to join?",       a: "Yes, 100% free. Always has been, always will be. We share deals because we're passionate about helping people save." },
  { q: "How many deals are shared per day?",             a: "We typically share 500+ deals per day across Telegram and WhatsApp — electronics, fashion, food, travel, home goods, and more." },
  { q: "Will I get spammed with unnecessary messages?",  a: "Absolutely not. Every message is a verified deal with a real discount. No promotional fluff, no sponsored junk." },
  { q: "Are the deals only for India?",                  a: "Primarily yes — most deals are from Amazon India, Flipkart, Myntra, Nykaa, Meesho, and others." },
  { q: "How do I claim a deal once I see it?",           a: "Each deal post includes a direct link. Just click it and you'll be taken straight to the checkout or coupon page." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="px-6 md:px-14 pb-28">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.28em] font-semibold mb-4" style={{ color: BROWN }}>FAQ</p>
          <h2 className="font-black leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: TEXT, letterSpacing: "-0.04em" }}>
            Common<br />Questions
          </h2>
        </motion.div>

        <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${BORDER}`, background: CARD }}>
          {FAQS.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-8 py-6 text-left transition-all hover:bg-white/[0.025]"
                style={{ borderBottom: i < FAQS.length - 1 || open === i ? `1px solid ${BORDER}` : "none" }}>
                <span className="font-semibold text-sm pr-8" style={{ color: TEXT }}>{faq.q}</span>
                <ChevronDown className="w-4 h-4 shrink-0 transition-transform duration-300"
                  style={{ color: BROWN, transform: open === i ? "rotate(180deg)" : "rotate(0deg)" }} />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div key="body" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                    className="overflow-hidden" style={{ borderBottom: `1px solid ${BORDER}` }}>
                    <p className="px-8 pb-6 pt-2 text-sm leading-relaxed" style={{ color: TEXT2 }}>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Final CTA ──────────────────────────────────────────────────────────────────
function FinalCTA() {
  const { ref, rx, ry, onMouseMove, onMouseLeave } = use3DTilt();
  return (
    <section className="px-6 md:px-14 pb-28">
      <div className="max-w-6xl mx-auto">
        <motion.div ref={ref} style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
          onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: EXPO }}
          className="rounded-3xl p-16 md:p-24 text-center relative overflow-hidden"
          style={{
            background: CARD2,
            border: `1px solid ${BORDER}`,
            boxShadow: `0 40px 100px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)`,
          }}>
          {/* Glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse 70% 60% at 50% 0%, ${BROWN}25 0%, transparent 65%)` }} />
          {/* Corner decoration */}
          <div className="absolute top-0 right-0 w-px h-32 pointer-events-none"
            style={{ background: `linear-gradient(to bottom, ${BROWN}60, transparent)` }} />
          <div className="absolute top-0 right-0 h-px w-32 pointer-events-none"
            style={{ background: `linear-gradient(to left, ${BROWN}60, transparent)` }} />

          <div className="relative z-10">
            <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-8" style={{ color: BROWN }}>
              Join 2.63M+ smart shoppers
            </p>
            <h2 className="font-black text-white leading-none mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)", letterSpacing: "-0.045em" }}>
              Ready to start<br />saving?
            </h2>
            <p className="text-base mb-12 max-w-sm mx-auto" style={{ color: TEXT2 }}>
              Free to join. Deals every day. No spam. No catch.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-all hover:opacity-85 active:scale-95"
                style={{ background: BROWN, color: BG }}>
                <TelegramIcon size={14} /> Join Telegram — Free
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-all hover:bg-white/5 active:scale-95"
                style={{ border: `1px solid ${BORDER}`, color: TEXT }}>
                <WhatsAppIcon size={14} /> Join WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="px-6 md:px-14 py-10" style={{ borderTop: `1px solid ${BORDER}` }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-3">
          <img src="/assets/logo.jpg" alt="Salelooterz" className="h-7 w-7 rounded-xl object-contain" />
          <span className="font-black text-sm" style={{ color: CREAM, letterSpacing: "-0.02em" }}>SaleLooterz</span>
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-xs" style={{ color: TEXT2 }}>
          {["Privacy Policy", "Terms", "Contact", "About"].map(l => (
            <a key={l} href="#" className="transition-colors hover:text-white" style={{ textDecoration: "none" }}>{l}</a>
          ))}
        </div>
        <p className="text-xs" style={{ color: "rgba(242,234,216,0.18)" }}>© {new Date().getFullYear()} Salelooterz. All rights reserved.</p>
      </div>
    </footer>
  );
}
