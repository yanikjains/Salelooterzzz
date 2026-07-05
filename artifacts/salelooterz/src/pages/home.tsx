import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion, AnimatePresence,
  useMotionValue, useSpring, useTransform,
  useScroll,
} from "framer-motion";
import { ChevronDown, ArrowRight, Check } from "lucide-react";

const TELEGRAM_URL = "https://t.me/salelooterz";
const WHATSAPP_URL = "https://whatsapp.com/channel/salelooterz";

// ── Live counter ──────────────────────────────────────────────────────────────
const LIVE_BASE  = 2_634_291;
const LIVE_START = Date.now();
function getLive() { return Math.floor(LIVE_BASE + ((Date.now() - LIVE_START) / 1000) * 1.4); }
function fmtIN(n: number) { return n.toLocaleString("en-IN"); }
function useLive(ms = 2000) {
  const [n, setN] = useState(getLive());
  useEffect(() => { const t = setInterval(() => setN(getLive()), ms); return () => clearInterval(t); }, [ms]);
  return n;
}

// ── Palette ───────────────────────────────────────────────────────────────────
const BG       = "#F7F5FF";          // very light lavender — matches reference
const HERO_L   = "#EDE8FF";          // left panel lavender
const HERO_R   = "#F7F5FF";          // right panel off-white
const ACCENT   = "#FF3500";          // orange-red
const PURPLE   = "#7C3AED";          // violet accent
const TEXT     = "#0D0B1A";          // near-black
const TEXT2    = "rgba(13,11,26,0.45)";
const CARD     = "#FFFFFF";
const BORDER   = "rgba(13,11,26,0.07)";
const GREEN_HL = "#DCFCE7";          // feature row highlight (like reference)
const GREEN    = "#16A34A";
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

// ── Grain ──────────────────────────────────────────────────────────────────────
function Grain() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[9990] opacity-[0.018]"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat", backgroundSize: "180px" }} />
  );
}

// ── Custom cursor ──────────────────────────────────────────────────────────────
function CustomCursor() {
  const cx = useMotionValue(-200), cy = useMotionValue(-200);
  const sx = useSpring(cx, { stiffness: 90, damping: 14, mass: 0.5 });
  const sy = useSpring(cy, { stiffness: 90, damping: 14, mass: 0.5 });
  const [hov, setHov] = useState(false);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const mv = (e: MouseEvent) => { cx.set(e.clientX); cy.set(e.clientY); setVis(true); };
    const ov = (e: MouseEvent) => setHov(!!(e.target as HTMLElement).closest("a,button,[role=button]"));
    const lv = () => setVis(false);
    window.addEventListener("mousemove", mv); window.addEventListener("mouseover", ov); window.addEventListener("mouseleave", lv);
    return () => { window.removeEventListener("mousemove", mv); window.removeEventListener("mouseover", ov); window.removeEventListener("mouseleave", lv); };
  }, [cx, cy]);
  return (
    <>
      <motion.div className="fixed z-[9999] pointer-events-none hidden md:block rounded-full"
        style={{ x: cx, y: cy, width: 5, height: 5, marginLeft: -2.5, marginTop: -2.5, background: ACCENT }}
        animate={{ opacity: vis ? 1 : 0, scale: hov ? 0 : 1 }} transition={{ duration: 0.1 }} />
      <motion.div className="fixed z-[9998] pointer-events-none hidden md:block rounded-full"
        style={{ x: sx, y: sy, width: hov ? 50 : 28, height: hov ? 50 : 28, marginLeft: hov ? -25 : -14, marginTop: hov ? -25 : -14, border: `1.5px solid ${ACCENT}70`, transition: "width .2s,height .2s,margin .2s" }}
        animate={{ opacity: vis ? 1 : 0 }} transition={{ duration: 0.15 }} />
    </>
  );
}

// ── Scramble ──────────────────────────────────────────────────────────────────
const SC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@₹";
function useScramble(text: string) {
  const [d, setD] = useState(text);
  const t = useRef<ReturnType<typeof setInterval>>();
  const go = useCallback(() => {
    if (t.current) clearInterval(t.current);
    let it = 0;
    t.current = setInterval(() => {
      setD(text.split("").map((c, i) => {
        if (c === " " || c === ".") return c;
        if (i < it) return text[i];
        return SC[Math.floor(Math.random() * SC.length)];
      }).join(""));
      it += 0.5;
      if (it > text.length) { setD(text); clearInterval(t.current!); }
    }, 28);
  }, [text]);
  useEffect(() => () => { if (t.current) clearInterval(t.current); }, []);
  return { d, go };
}

// ── Splash ────────────────────────────────────────────────────────────────────
const BRAND_LETTERS = "SALELOOTERZ".split("");
function SplashScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, [onDone]);
  return (
    <motion.div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#EDE8FF" }}
      exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}>

      {/* Radial glow pulse behind content */}
      <motion.div className="absolute pointer-events-none"
        style={{ width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${PURPLE}28 0%, transparent 70%)` }}
        initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1.6, opacity: 1 }}
        transition={{ duration: 1.8, ease: EXPO }} />

      <motion.div className="relative flex flex-col items-center gap-8">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -15, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: EXPO }}
          style={{ boxShadow: `0 0 64px ${PURPLE}40`, borderRadius: 20 }}>
          <img src="/assets/logo.jpg" alt="Salelooterz" className="h-16 w-16 rounded-2xl object-contain" />
        </motion.div>

        {/* Brand name — letters staggered upward */}
        <div className="flex items-end gap-[0.04em]" style={{ overflow: "visible" }}>
          {BRAND_LETTERS.map((l, i) => (
            <div key={i} style={{ overflow: "hidden" }}>
              <motion.span
                className="font-black inline-block"
                style={{ fontSize: "clamp(2.8rem, 10vw, 6.5rem)", letterSpacing: "-0.04em", lineHeight: 1, color: TEXT }}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.65, delay: 0.25 + i * 0.045, ease: EXPO }}>
                {l}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Accent rule */}
        <motion.div style={{ height: 2, background: PURPLE, borderRadius: 99, transformOrigin: "center", opacity: 0.4 }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ delay: 0.85, duration: 0.6, ease: EXPO }}
          className="w-24" />

        {/* Tagline */}
        <motion.p className="text-[11px] font-semibold uppercase tracking-[0.32em]"
          style={{ color: TEXT }}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6, ease: EXPO }}>
          India's #1 Deal Alert Community
        </motion.p>

        {/* Progress bar */}
        <div style={{ width: 180, height: 1.5, background: `${PURPLE}20`, overflow: "hidden", borderRadius: 99 }}>
          <motion.div style={{ height: "100%", background: PURPLE, transformOrigin: "left" }}
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 2.2, ease: "linear" }} />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [ready, setReady] = useState(false);
  return (
    <div style={{ background: BG, fontFamily: "'Inter', sans-serif" }}>
      <Grain />
      <CustomCursor />
      <AnimatePresence>{!ready && <SplashScreen onDone={() => setReady(true)} />}</AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ duration: 0.6 }}>
        <Navbar />
        <Hero />
        <BrandStrip />
        <OurDifference />
        <StatsRow />
        <HowItWorks />
        <Testimonials />
        <SavingsCalc />
        <AffiliateDisclosure />
        <FAQ />
        <FinalCTA />
        <Footer />
      </motion.div>
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 60); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);

  return (
    <motion.header initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EXPO }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-3.5 flex items-center justify-between"
      style={{ background: scrolled ? "rgba(247,245,255,0.92)" : "transparent", backdropFilter: scrolled ? "blur(18px)" : "none", borderBottom: scrolled ? `1px solid ${BORDER}` : "none", transition: "all 0.4s" }}>
      <a href="#" className="flex items-center gap-2.5 no-underline">
        <img src="/assets/logo.jpg" alt="logo" className="h-8 w-8 rounded-xl object-contain" />
        <span className="font-black text-sm" style={{ color: TEXT, letterSpacing: "-0.025em" }}>SaleLooterz</span>
      </a>
      <div className="hidden md:flex items-center gap-3">
        <span className="text-xs font-semibold flex items-center gap-1.5" style={{ color: TEXT2 }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GREEN }} />
          Many members
        </span>
        <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm text-white transition-all hover:opacity-90"
          style={{ background: PURPLE }}>
          <TelegramIcon size={13} /> Join Free
        </a>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm text-white transition-all hover:opacity-90"
          style={{ background: "#25D366", boxShadow: "0 8px 28px rgba(37,211,102,0.35)" }}>
          <span>👑</span><WhatsAppIcon size={13} /> Join on WhatsApp
        </a>
      </div>
    </motion.header>
  );
}

// ── Hero — split layout like reference screenshot ──────────────────────────────
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y       = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      {/* Split background */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute inset-y-0 left-0 w-1/2" style={{ background: `linear-gradient(160deg, ${HERO_L} 0%, #ddd5ff 100%)` }} />
        <div className="absolute inset-y-0 right-0 w-1/2" style={{ background: HERO_R }} />
      </div>

      <motion.div style={{ y, opacity, position: "relative", zIndex: 1 }}
        className="max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-16 min-h-screen flex flex-col lg:flex-row items-center gap-8 lg:gap-0">

        {/* ── Left: Image column ── */}
        <div className="flex-1 flex items-center justify-center lg:justify-end lg:pr-12 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -48, scale: 0.92 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 1.0, ease: EXPO }}
            className="relative">
            {/* Decorative blob behind image */}
            <div className="absolute inset-0 pointer-events-none" style={{ transform: "scale(1.18)", borderRadius: "60% 40% 55% 45% / 50% 55% 45% 50%", background: `linear-gradient(135deg, ${PURPLE}30, ${ACCENT}18)`, filter: "blur(32px)" }} />
            <img src="/assets/hero.png" alt="SaleLooterz mascot"
              className="relative w-64 md:w-80 lg:w-96 object-contain drop-shadow-2xl"
              style={{ filter: "drop-shadow(0 24px 48px rgba(124,58,237,0.25))" }} />
            {/* Floating discount badge */}
            <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 px-4 py-2 rounded-2xl shadow-lg font-black text-white text-sm"
              style={{ background: ACCENT }}>
              🔥 51% OFF
            </motion.div>
            <motion.div animate={{ y: [4, -4, 4] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-2 -left-6 px-4 py-2.5 rounded-2xl shadow-lg font-bold text-sm"
              style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <span className="text-xs" style={{ color: TEXT2 }}>saved by</span>
              <p className="font-black" style={{ color: TEXT, letterSpacing: "-0.03em" }}>MANY</p>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Right: Content column ── */}
        <div className="flex-1 flex flex-col justify-center order-1 lg:order-2 lg:pl-4">
          {/* Eyebrow */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.6, ease: EXPO }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full self-start mb-6"
            style={{ background: `${PURPLE}14`, border: `1px solid ${PURPLE}25` }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: PURPLE }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: PURPLE }}>India's #1 Deal Alert Community</span>
          </motion.div>

          {/* Headline — per-line clip reveal */}
          <h1 className="font-black leading-[0.92] mb-6 cursor-default select-none"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)", letterSpacing: "-0.05em", maxWidth: 640 }}>
            <div style={{ overflow: "hidden" }}>
              <motion.div initial={{ y: "105%" }} animate={{ y: "0%" }}
                transition={{ delay: 0.12, duration: 0.9, ease: EXPO }}>
                <span style={{ color: TEXT, display: "inline-block" }}>Stop Overpaying.</span>
              </motion.div>
            </div>
            <div style={{ overflow: "hidden" }}>
              <motion.div initial={{ y: "105%" }} animate={{ y: "0%" }}
                transition={{ delay: 0.24, duration: 0.9, ease: EXPO }}>
                <span style={{ color: "transparent", WebkitTextStroke: `2.5px ${ACCENT}`, display: "inline-block" }}>
                  Start Saving Big.
                </span>
              </motion.div>
            </div>
          </h1>

          {/* Subtext */}
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7, ease: EXPO }}
            className="text-base leading-relaxed mb-10 max-w-md" style={{ color: TEXT2 }}>
            Embrace the smartest way to shop — join <strong style={{ color: TEXT }}>many smart shoppers</strong> getting instant alerts on flash sales, price drops &amp; crazy discounts delivered straight to your phone.
          </motion.p>

          {/* CTA buttons */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.6, ease: EXPO }}
            className="flex flex-wrap gap-3 mb-10">
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm text-white transition-all hover:opacity-90"
              style={{ background: PURPLE, boxShadow: `0 8px 28px ${PURPLE}40` }}>
              <TelegramIcon size={15} /> Join on Telegram
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm text-white transition-all hover:opacity-90"
              style={{ background: "#25D366", boxShadow: "0 8px 28px rgba(37,211,102,0.35)" }}>
              <span className="text-base leading-none">👑</span>
              <WhatsAppIcon size={15} /> Join on WhatsApp
            </a>
          </motion.div>

          {/* Trust pills */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="flex flex-wrap gap-2">
            {[
              { label: "100% Free forever",      color: GREEN    },
              { label: "300+ deals/day",          color: ACCENT   },
              { label: "Zero spam guaranteed",    color: PURPLE   },
            ].map(({ label, color }) => (
              <span key={label} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ background: `${color}10`, color, border: `1px solid ${color}20` }}>
                <Check size={11} strokeWidth={3} /> {label}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// ── Brand strip ───────────────────────────────────────────────────────────────
const BRANDS = ["Amazon","Amazon India","Best Deals","Flash Sale","Lightning Deals","Deal of the Day","Top Offers","Prime Deals","Discount","Exclusive Offers","Limited Time","Today's Deals","Big Sale","Price Drop"];
function BrandStrip() {
  return (
    <div className="relative overflow-hidden py-5" style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, background: CARD }}>
      <div className="flex gap-16 items-center whitespace-nowrap" style={{ animation: "marquee 32s linear infinite" }}>
        {[...BRANDS,...BRANDS,...BRANDS].map((b, i) => (
          <span key={i} className="text-base font-black uppercase tracking-[0.08em] shrink-0" style={{ color: TEXT }}>{b}</span>
        ))}
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-33.333%)}}`}</style>
    </div>
  );
}

// ── "Our Difference" — feature list with highlighted row (matches reference) ──
const FEATURES = [
  { text: "300+ verified deals every single day",            highlight: false },
  { text: "Gain instant alerts the moment prices drop",      highlight: false },
  { text: "Always free — zero fees, zero subscriptions",     highlight: true  },
  { text: "Exclusively curated Amazon India deals, every day", highlight: false },
];

function OurDifference() {
  return (
    <section className="px-6 md:px-12 py-28" style={{ background: BG }}>
      <div className="max-w-6xl mx-auto">

        {/* Section label */}
        <motion.div className="text-center mb-6" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: PURPLE }}>Our Difference</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Heading + Feature list */}
          <div>
            <motion.h2 className="font-black leading-tight mb-10"
              style={{ fontSize: "clamp(1.6rem, 4vw, 3.5rem)", color: TEXT, letterSpacing: "-0.045em" }}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.75, ease: EXPO }}>
              <span className="block whitespace-nowrap">You Simply Can't Find</span>
              <span className="block whitespace-nowrap">These in a Generic</span>
              <span className="block whitespace-nowrap">Deal Channel</span>
            </motion.h2>

            <div className="flex flex-col gap-2">
              {FEATURES.map((f, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6, ease: EXPO }}
                  className="flex items-center gap-3 px-5 py-4 rounded-xl font-semibold text-sm"
                  style={{
                    background: f.highlight ? GREEN_HL : CARD,
                    border: `1.5px solid ${f.highlight ? "#86EFAC" : BORDER}`,
                    color: f.highlight ? "#166534" : TEXT,
                    boxShadow: f.highlight ? "0 4px 20px rgba(34,197,94,0.12)" : "0 1px 4px rgba(13,11,26,0.04)",
                  }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: f.highlight ? "#16A34A" : `${PURPLE}18` }}>
                    <Check size={11} strokeWidth={3} color={f.highlight ? "#fff" : PURPLE} />
                  </div>
                  {f.text}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Visual card stack */}
          <div className="flex flex-col gap-4">
            {/*
              PERMANENT — DO NOT REMOVE OR REPLACE.
              This HeyGen video embed is a fixed, user-owned element that must
              always remain in this exact position on the page. Do not delete,
              relocate, or swap this block for any other content (stats, cards,
              etc.) unless the user explicitly asks to change the video itself.
            */}
            <motion.div initial={{ opacity: 0, y: 28, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.8, ease: EXPO }}
              className="rounded-3xl overflow-hidden relative"
              style={{ background: `linear-gradient(135deg, ${PURPLE} 0%, #A855F7 100%)` }}>
              <div style={{ position: "relative", width: "100%", paddingTop: "66.6667%" }}>
                <iframe
                  src="https://app.heygen.com/embeds/29c06eba349b4feebb426f30315cd4fd"
                  title="SaleLooterz introduction video"
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
                  allow="encrypted-media; fullscreen;"
                  allowFullScreen
                />
              </div>
            </motion.div>
            {/* END PERMANENT VIDEO BLOCK */}

            <div className="grid grid-cols-2 gap-4">
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.75, ease: EXPO }}
                className="rounded-2xl p-6 relative overflow-hidden"
                style={{ background: CARD, border: `1.5px solid ${BORDER}` }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: TEXT2 }}>Active Members</p>
                <LiveStat />
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GREEN }} />
                  <span className="text-[10px] font-bold" style={{ color: GREEN }}>LIVE</span>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.18, duration: 0.75, ease: EXPO }}
                className="rounded-2xl p-6"
                style={{ background: `linear-gradient(135deg, ${ACCENT}15, ${ACCENT}05)`, border: `1.5px solid ${ACCENT}20` }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: ACCENT }}>Community Savings</p>
                <p className="font-black text-2xl leading-none" style={{ color: TEXT, letterSpacing: "-0.04em" }}>51% (On average)</p>
                <p className="text-[11px] mt-1" style={{ color: TEXT2 }}>estimated total saved by everyone</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LiveStat() {
  return (
    <p className="font-black text-xl leading-none" style={{ color: TEXT, letterSpacing: "-0.04em" }}>
      MANY
    </p>
  );
}

// ── Stats row ─────────────────────────────────────────────────────────────────
const STATS = [
  { value: "300+",    sub: "Telegram deals/day",     color: ACCENT  },
  { value: "20+",     sub: "WhatsApp deals/day",      color: PURPLE  },
  { value: "2.6M+",   sub: "Community members",       color: GREEN   },
  { value: "₹100Cr+", sub: "Community savings",       color: "#D97706" },
  { value: "51%",     sub: "Avg. discount received",  color: PURPLE  },
];

function useCountUp(to: number, inView: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let cur = 0; const dur = 1800, step = 16, inc = to / (dur / step);
    const id = setInterval(() => { cur += inc; if (cur >= to) { setN(to); clearInterval(id); } else setN(cur); }, step);
    return () => clearInterval(id);
  }, [inView, to]);
  return Math.round(n);
}

function StatsRow() {
  return (
    <section className="px-6 md:px-12 py-10" style={{ background: CARD, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-0 md:divide-x" style={{ '--divider': BORDER } as React.CSSProperties}>
          {STATS.map((s, i) => (
            <motion.div key={i} className="flex flex-col items-center text-center px-4 py-2"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.6, ease: EXPO }}>
              <p className="font-black text-3xl leading-none mb-1" style={{ color: s.color, letterSpacing: "-0.04em" }}>{s.value}</p>
              <p className="text-xs font-semibold" style={{ color: TEXT2 }}>{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── How it works ──────────────────────────────────────────────────────────────
const STEPS = [
  { n: "01", title: "Join for free",          body: "Click \u201cJoin on Telegram\u201d or \u201cJoin on WhatsApp\u201d \u2014 takes 5 seconds.",    color: PURPLE },
  { n: "02", title: "Get instant alerts",     body: "Every deal goes live in the channel the moment our team finds it.",      color: ACCENT },
  { n: "03", title: "Tap & save",             body: "One tap takes you straight to the deal. No searching, no hunting.",      color: GREEN  },
];

function HowItWorks() {
  return (
    <section className="px-6 md:px-12 py-28" style={{ background: BG }}>
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: EXPO }}>
          <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-4" style={{ color: PURPLE }}>How it works</p>
          <h2 className="font-black leading-none" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", color: TEXT, letterSpacing: "-0.05em" }}>
            Saving money is<br />this simple.
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.75, ease: EXPO }}
              className="rounded-2xl p-8 relative overflow-hidden"
              style={{ background: CARD, border: `1.5px solid ${BORDER}`, boxShadow: "0 2px 12px rgba(13,11,26,0.04)" }}>
              <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                style={{ background: `radial-gradient(circle at top right, ${s.color}10, transparent 70%)` }} />
              <span className="font-black text-5xl mb-6 block leading-none" style={{ color: `${s.color}20`, letterSpacing: "-0.06em" }}>{s.n}</span>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{ background: `${s.color}15` }}>
                <span style={{ color: s.color, fontSize: 18, fontWeight: 900 }}>{i === 0 ? "✓" : i === 1 ? "⚡" : "→"}</span>
              </div>
              <h3 className="font-black text-lg mb-2.5" style={{ color: TEXT, letterSpacing: "-0.025em" }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: TEXT2 }}>{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Testimonials / social proof ───────────────────────────────────────────────
const TESTIMONIALS = [
  { name: "Priya S.", city: "Mumbai",    text: "Saved ₹3,200 on boAt earbuds in the first week. Absolutely love this channel!",         emoji: "🎧", savings: "₹3,200" },
  { name: "Rahul K.", city: "Delhi",     text: "Got a laptop at 64% off on Amazon. Would have never found that deal myself.",            emoji: "💻", savings: "₹18,000" },
  { name: "Sneha M.", city: "Bengaluru", text: "The fashion deals are insane — entire wardrobe refresh for less than ₹2,000 total.",      emoji: "👗", savings: "₹4,800" },
  { name: "Arjun P.", city: "Hyderabad", text: "Best community on Telegram for deals. No spam, just pure gold every single day.",        emoji: "🏆", savings: "₹6,500" },
  { name: "Divya R.", city: "Chennai",   text: "Smartwatch I had been eyeing for months — got it at ₹799. Was ₹4,999 on Amazon!",        emoji: "⌚", savings: "₹4,200" },
  { name: "Kiran B.", city: "Pune",      text: "Kitchen appliances, Swiggy coupons, flight deals — they have literally everything.",     emoji: "🍕", savings: "₹2,900" },
];

function Testimonials() {
  return (
    <section className="px-6 md:px-12 py-28 overflow-hidden" style={{ background: CARD }}>
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-4" style={{ color: PURPLE }}>Real savings · Real people</p>
          <h2 className="font-black leading-none" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", color: TEXT, letterSpacing: "-0.05em" }}>
            2.6 million Indians<br />can't be wrong.
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.7, ease: EXPO }}
              className="rounded-2xl p-6"
              style={{ background: BG, border: `1.5px solid ${BORDER}` }}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: `${PURPLE}12` }}>{t.emoji}</div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: TEXT }}>{t.name}</p>
                    <p className="text-xs" style={{ color: TEXT2 }}>{t.city}</p>
                  </div>
                </div>
                <span className="font-black text-sm px-2.5 py-1 rounded-full"
                  style={{ background: GREEN_HL, color: "#166534" }}>
                  Saved {t.savings}
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: TEXT2 }}>"{t.text}"</p>
              <div className="flex gap-0.5 mt-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} style={{ color: "#FBBF24", fontSize: 13 }}>★</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Savings calculator ────────────────────────────────────────────────────────
function SavingsCalc() {
  const [spend, setSpend] = useState(5000);
  const saved = Math.round(spend * 0.51);
  const yearly = saved * 12;

  return (
    <section className="px-6 md:px-12 py-28" style={{ background: BG }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: EXPO }}
          className="rounded-3xl overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${PURPLE} 0%, #A855F7 100%)` }}>
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="p-10 md:p-14">
              <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-4 text-white/50">Savings Calculator</p>
              <h2 className="font-black leading-none mb-5 text-white"
                style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", letterSpacing: "-0.05em" }}>
                How much could<br />you save?
              </h2>
              <p className="text-sm leading-relaxed mb-8 text-white/60">
                Community members save an average of <strong className="text-white">51%</strong>. Drag the slider to see your potential monthly savings.
              </p>
              <div className="flex justify-between text-xs font-semibold mb-2.5 text-white/50">
                <span>Monthly online spend</span>
                <span className="text-white">₹{spend.toLocaleString("en-IN")}</span>
              </div>
              <input type="range" min={500} max={50000} step={500} value={spend}
                onChange={e => setSpend(Number(e.target.value))}
                className="w-full appearance-none rounded-full h-1.5 cursor-pointer outline-none mb-6"
                style={{ background: `linear-gradient(to right, #fff ${((spend-500)/49500)*100}%, rgba(255,255,255,0.2) 0%)` }} />
              <style>{`input[type=range]::-webkit-slider-thumb{appearance:none;width:20px;height:20px;border-radius:50%;background:#fff;cursor:pointer;box-shadow:0 0 12px rgba(255,255,255,0.5)}input[type=range]::-moz-range-thumb{width:20px;height:20px;border-radius:50%;background:#fff;border:none;cursor:pointer}`}</style>
            </div>
            <div className="p-10 md:p-14 flex flex-col justify-center gap-4" style={{ background: "rgba(0,0,0,0.12)" }}>
              <motion.div key={saved} initial={{ scale: 0.96, opacity: 0.6 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.12)" }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-2 text-white/50">Monthly savings</p>
                <p className="font-black leading-none text-white" style={{ fontSize: "clamp(3rem, 8vw, 4.5rem)", letterSpacing: "-0.06em" }}>
                  ₹{saved.toLocaleString("en-IN")}
                </p>
              </motion.div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.12)" }}>
                  <p className="text-[10px] font-semibold uppercase tracking-wider mb-2 text-white/50">Per year</p>
                  <p className="font-black text-xl leading-none text-white" style={{ letterSpacing: "-0.04em" }}>₹{yearly.toLocaleString("en-IN")}</p>
                </div>
                <div className="rounded-2xl p-5 flex flex-col justify-between" style={{ background: "rgba(255,255,255,0.12)" }}>
                  <p className="text-[10px] font-semibold uppercase tracking-wider mb-2 text-white/50">Start now</p>
                  <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs text-white"
                    style={{ background: ACCENT }}>
                    <TelegramIcon size={11} /> Join →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
const FAQS = [
  { q: "Is Salelooterz completely free?",          a: "100% free, always. We share deals because we love saving money — no subscriptions, no fees, ever." },
  { q: "How many deals are posted per day?",        a: "300+ deals daily on Telegram and 20+ on WhatsApp — covering electronics, fashion, food, travel, home goods, and more." },
  { q: "Will I get spammed?",                       a: "Never. Every single message is a verified deal with a real discount. No promotional content, no random forwards." },
  { q: "Are deals only for Amazon?",                a: "Yes — we focus exclusively on Amazon India, bringing you the best verified deals, lightning deals, and price drops every day." },
  { q: "How do I claim a deal?",                    a: "Every post includes a direct link. One tap takes you straight to the checkout or coupon page." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="px-6 md:px-12 py-28" style={{ background: CARD }}>
      <div className="max-w-3xl mx-auto">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-4" style={{ color: PURPLE }}>FAQ</p>
          <h2 className="font-black leading-none" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: TEXT, letterSpacing: "-0.05em" }}>
            Common Questions
          </h2>
        </motion.div>
        <div className="rounded-2xl overflow-hidden" style={{ border: `1.5px solid ${BORDER}`, background: BG }}>
          {FAQS.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-7 py-5 text-left transition-all"
                style={{ borderBottom: `1px solid ${BORDER}` }}>
                <span className="font-semibold text-sm pr-6" style={{ color: TEXT }}>{faq.q}</span>
                <ChevronDown size={16} style={{ color: PURPLE, flexShrink: 0, transform: open === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .3s" }} />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div key="b" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.27 }}
                    className="overflow-hidden" style={{ borderBottom: `1px solid ${BORDER}` }}>
                    <p className="px-7 pb-5 pt-2 text-sm leading-relaxed" style={{ color: TEXT2 }}>{faq.a}</p>
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

// ── Final CTA ─────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="px-6 md:px-12 pb-28" style={{ background: BG }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9, ease: EXPO }}
          className="rounded-3xl overflow-hidden"
          style={{ background: `linear-gradient(135deg, #0D0B1A 60%, #1A1040 100%)` }}>
          <div className="relative px-10 md:px-20 py-20 text-center overflow-hidden">
            <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 65% 60% at 50% 0%, ${PURPLE}30, transparent 65%)` }} />
            {/* Dots */}
            {[["-top-6 -right-6 w-32 h-32", "0.06"], ["bottom-10 left-20 w-16 h-16", "0.04"]].map(([cls, o], i) => (
              <div key={i} className={`absolute ${cls} rounded-full border`} style={{ borderColor: `rgba(255,255,255,${o})` }} />
            ))}
            <div className="relative z-10">
              <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-6" style={{ color: `${PURPLE}bb` }}>
                Join many smart shoppers
              </p>
              <h2 className="font-black text-white leading-none mb-5"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.055em" }}>
                Ready to stop<br />overpaying?
              </h2>
              <p className="text-base mb-12 max-w-xs mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
                Free forever. 300+ Telegram + 20+ WhatsApp deals daily. Zero spam.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white transition-all hover:opacity-90"
                  style={{ background: PURPLE, boxShadow: `0 8px 28px ${PURPLE}50` }}>
                  <TelegramIcon size={14} /> Join Telegram — Free
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:opacity-80"
                  style={{ border: "1.5px solid rgba(255,255,255,0.15)", color: "#fff", textDecoration: "none" }}>
                  <WhatsAppIcon size={14} /> Join WhatsApp
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Affiliate Disclosure banner ────────────────────────────────────────────────
const AFFILIATE_DISCLOSURE_URL = "https://telegra.ph/Salelooterz---Affiliate-disclosure-07-05";

function AffiliateDisclosure() {
  return (
    <section className="px-6 md:px-12 py-20" style={{ background: BG }}>
      <div className="max-w-6xl mx-auto text-center">
        <a href={AFFILIATE_DISCLOSURE_URL} target="_blank" rel="noopener noreferrer"
          className="inline-block font-black leading-none transition-all hover:opacity-70"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", color: TEXT, letterSpacing: "-0.05em", textDecoration: "underline", textDecorationColor: PURPLE, textDecorationThickness: "4px", textUnderlineOffset: "10px" }}>
          Affiliate Disclosure
        </a>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="px-6 md:px-12 py-10" style={{ borderTop: `1px solid ${BORDER}`, background: CARD }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-2.5">
          <img src="/assets/logo.jpg" alt="Salelooterz" className="h-7 w-7 rounded-xl object-contain" />
          <span className="font-black text-sm" style={{ color: TEXT, letterSpacing: "-0.025em" }}>SaleLooterz</span>
        </div>
        <div className="flex flex-wrap justify-center gap-7 text-xs" style={{ color: TEXT2 }}>
          {["Contact","About"].map(l => (
            <a key={l} href="#" className="hover:opacity-60 transition-opacity" style={{ textDecoration: "none", color: TEXT2 }}>{l}</a>
          ))}
        </div>
        <p className="text-xs" style={{ color: "rgba(13,11,26,0.18)" }}>© {new Date().getFullYear()} Salelooterz. India's #1 deal community.</p>
      </div>
    </footer>
  );
}
