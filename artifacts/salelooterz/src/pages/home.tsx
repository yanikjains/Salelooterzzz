import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion, AnimatePresence,
  useMotionValue, useSpring, useTransform,
  useScroll, useInView,
} from "framer-motion";
import { ChevronDown, Zap, Bell, TrendingDown, Shield, ArrowRight } from "lucide-react";

const TELEGRAM_URL = "https://t.me/salelooterz";
const WHATSAPP_URL = "https://whatsapp.com/channel/salelooterz";

// ── Live counter ─────────────────────────────────────────────────────────────
const LIVE_BASE  = 2_634_291;
const LIVE_START = Date.now();
function getLive() { return Math.floor(LIVE_BASE + ((Date.now() - LIVE_START) / 1000) * 1.4); }
function fmtIN(n: number) { return n.toLocaleString("en-IN"); }
function useLive(ms = 2000) {
  const [n, setN] = useState(getLive());
  useEffect(() => { const t = setInterval(() => setN(getLive()), ms); return () => clearInterval(t); }, [ms]);
  return n;
}

// ── Palette ──────────────────────────────────────────────────────────────────
const BG      = "#F4F1EC";
const ACCENT  = "#FF3500";
const TEXT    = "#0D0D0D";
const TEXT2   = "rgba(13,13,13,0.4)";
const CARD    = "#FFFFFF";
const BORDER  = "rgba(13,13,13,0.07)";
const GREEN   = "#16A34A";
const DARK    = "#111111";
const EXPO: [number,number,number,number] = [0.16, 1, 0.3, 1];

// ── Icons ────────────────────────────────────────────────────────────────────
function TelegramIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}
function WhatsAppIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

// ── Custom cursor ────────────────────────────────────────────────────────────
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
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseover", ov);
    window.addEventListener("mouseleave", lv);
    return () => { window.removeEventListener("mousemove", mv); window.removeEventListener("mouseover", ov); window.removeEventListener("mouseleave", lv); };
  }, [cx, cy]);

  return (
    <>
      <motion.div className="fixed z-[9999] pointer-events-none hidden md:block rounded-full"
        style={{ x: cx, y: cy, width: 5, height: 5, marginLeft: -2.5, marginTop: -2.5, background: ACCENT }}
        animate={{ opacity: vis ? 1 : 0, scale: hov ? 0 : 1 }} transition={{ duration: 0.1 }} />
      <motion.div className="fixed z-[9998] pointer-events-none hidden md:block rounded-full"
        style={{ x: sx, y: sy, width: hov ? 56 : 32, height: hov ? 56 : 32, marginLeft: hov ? -28 : -16, marginTop: hov ? -28 : -16, border: `1.5px solid ${ACCENT}80`, transition: "width .2s,height .2s,margin .2s" }}
        animate={{ opacity: vis ? 1 : 0 }} transition={{ duration: 0.15 }} />
    </>
  );
}

// ── Reveal line (Jeskojets signature) ────────────────────────────────────────
function RevealLine({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <div style={{ overflow: "hidden" }} className={className}>
      <motion.div
        initial={{ y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ delay, duration: 1.0, ease: EXPO }}>
        {children}
      </motion.div>
    </div>
  );
}

// ── Magnetic button ───────────────────────────────────────────────────────────
function MagBtn({ children, href, dark = false, outline = false }:
  { children: React.ReactNode; href: string; dark?: boolean; outline?: boolean }) {
  const wRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 16 });
  const sy = useSpring(y, { stiffness: 200, damping: 16 });
  const mv = (e: React.MouseEvent) => {
    if (!wRef.current) return;
    const r = wRef.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.38);
    y.set((e.clientY - r.top - r.height / 2) * 0.38);
  };
  const lv = () => { x.set(0); y.set(0); };
  const bg   = dark ? DARK : outline ? "transparent" : ACCENT;
  const col  = dark || (!outline) ? "#fff" : TEXT;
  const brd  = outline ? `1.5px solid ${BORDER}` : "none";

  return (
    <div ref={wRef} onMouseMove={mv} onMouseLeave={lv} style={{ display: "inline-block" }}>
      <motion.a href={href} target="_blank" rel="noopener noreferrer"
        style={{ x: sx, y: sy, background: bg, color: col, border: brd, display: "inline-flex", alignItems: "center", gap: 8, boxShadow: dark || !outline ? `0 6px 28px ${bg}45` : "none" }}
        whileTap={{ scale: 0.96 }}
        className="px-7 py-3.5 rounded-full font-bold text-sm leading-none">
        {children}
      </motion.a>
    </div>
  );
}

// ── Scramble ─────────────────────────────────────────────────────────────────
const SC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ₹0123456789!@#";
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

// ── Grain ────────────────────────────────────────────────────────────────────
function Grain() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[9996] opacity-[0.015]"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat", backgroundSize: "180px" }} />
  );
}

// ── Splash ───────────────────────────────────────────────────────────────────
function SplashScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 2600); return () => clearTimeout(t); }, [onDone]);
  return (
    <motion.div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: DARK }}
      exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}>
      <motion.div className="flex flex-col items-center gap-7"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EXPO }}>
        <motion.img src="/assets/logo.jpg" alt="Salelooterz"
          className="h-14 w-14 rounded-2xl object-contain"
          initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: EXPO }}
          style={{ boxShadow: `0 0 48px ${ACCENT}40` }} />
        <div className="overflow-hidden">
          <motion.h1 className="font-black uppercase text-white text-center"
            initial={{ y: "100%" }} animate={{ y: "0%" }}
            transition={{ duration: 0.8, delay: 0.15, ease: EXPO }}
            style={{ fontSize: "clamp(2.5rem, 9vw, 6rem)", letterSpacing: "-0.04em" }}>
            SALELOOTERZ
          </motion.h1>
        </div>
        <div className="relative overflow-hidden" style={{ width: 200, height: 1.5, background: "rgba(255,255,255,0.12)" }}>
          <motion.div className="absolute inset-0" style={{ background: ACCENT, transformOrigin: "left" }}
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 1.8, ease: "linear" }} />
        </div>
        <motion.p className="text-[11px] font-semibold uppercase tracking-[0.3em]"
          style={{ color: "rgba(255,255,255,0.35)" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          India's #1 Deal Alert Community
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

// ── Root ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [ready, setReady] = useState(false);
  return (
    <div style={{ background: BG, fontFamily: "'Inter', sans-serif" }}>
      <Grain />
      <CustomCursor />
      <AnimatePresence>{!ready && <SplashScreen onDone={() => setReady(true)} />}</AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ duration: 0.7 }}>
        <Navbar />
        <Hero />
        <BrandMarquee />
        <PinnedScrollReveal />
        <DealGrid />
        <WhySection />
        <SavingsCalc />
        <FAQ />
        <FinalCTA />
        <Footer />
      </motion.div>
    </div>
  );
}

// ── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const liveN = useLive(2000);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EXPO, delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between"
      style={{
        background: scrolled ? `${BG}ee` : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${BORDER}` : "none",
        transition: "all 0.5s ease",
      }}>
      <a href="#" className="flex items-center gap-2.5 no-underline">
        <img src="/assets/logo.jpg" alt="logo" className="h-8 w-8 rounded-xl object-contain" />
        <span className="font-black text-sm" style={{ color: TEXT, letterSpacing: "-0.025em" }}>SaleLooterz</span>
      </a>
      <div className="hidden md:flex items-center gap-3">
        <span className="text-xs font-semibold flex items-center gap-1.5" style={{ color: TEXT2 }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GREEN }} />
          {fmtIN(liveN)} members live
        </span>
        <MagBtn href={TELEGRAM_URL}>
          <TelegramIcon size={13} /> Join Free
        </MagBtn>
      </div>
    </motion.header>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const y       = useTransform(scrollYProgress, [0, 0.55], [0, -70]);
  const scale   = useTransform(scrollYProgress, [0, 0.55], [1, 0.92]);
  const liveN   = useLive(2000);
  const sc1 = useScramble("Stop Overpaying.");
  const sc2 = useScramble("Start Saving Big.");

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "100%", height: "100%", background: `radial-gradient(ellipse 70% 60% at 50% 40%, ${ACCENT}08, transparent 70%)` }} />
        {/* Corner decoration */}
        <div style={{ position: "absolute", top: 80, left: 40, width: 120, height: 120, borderRadius: "50%", border: `1px solid ${BORDER}` }} />
        <div style={{ position: "absolute", bottom: 120, right: 60, width: 80, height: 80, borderRadius: "50%", border: `1px solid ${BORDER}` }} />
        <div style={{ position: "absolute", top: 200, right: 100, width: 10, height: 10, borderRadius: "50%", background: ACCENT, opacity: 0.4 }} />
        <div style={{ position: "absolute", bottom: 200, left: 80, width: 6, height: 6, borderRadius: "50%", background: ACCENT, opacity: 0.3 }} />
      </div>

      <motion.div style={{ y, opacity, scale, position: "relative", zIndex: 1 }}
        className="flex flex-col items-center text-center px-6 pt-28 pb-24">

        {/* Eyebrow pill */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.6, ease: EXPO }}
          className="flex items-center gap-2 px-4 py-2 rounded-full mb-12"
          style={{ background: `${ACCENT}0e`, border: `1px solid ${ACCENT}22` }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ACCENT }} />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>India's #1 Deal Alert Community</span>
        </motion.div>

        {/* Headline — clip reveal per line */}
        <h1 className="font-black leading-[0.9] cursor-default select-none mb-10"
          style={{ fontSize: "clamp(4.5rem, 12vw, 11rem)", letterSpacing: "-0.055em", maxWidth: 1200 }}>
          <RevealLine delay={0.1}>
            <span onMouseEnter={sc1.go} style={{ color: TEXT, display: "inline-block" }}>{sc1.d}</span>
          </RevealLine>
          <RevealLine delay={0.22}>
            <span onMouseEnter={sc2.go}
              style={{ color: "transparent", WebkitTextStroke: `2.5px ${ACCENT}`, display: "inline-block" }}>
              {sc2.d}
            </span>
          </RevealLine>
        </h1>

        {/* Sub */}
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.52, duration: 0.7, ease: EXPO }}
          className="max-w-md text-lg leading-relaxed mb-12" style={{ color: TEXT2 }}>
          Join <strong style={{ color: TEXT }}>{fmtIN(liveN)} smart shoppers</strong> getting instant alerts on flash
          sales, price drops &amp; crazy discounts — straight to your phone.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6, ease: EXPO }}
          className="flex flex-wrap gap-3 justify-center mb-16">
          <MagBtn href={TELEGRAM_URL}>
            <TelegramIcon size={14} /> Join on Telegram — Free
          </MagBtn>
          <MagBtn href={WHATSAPP_URL} outline>
            <WhatsAppIcon size={14} /> Join on WhatsApp
          </MagBtn>
        </motion.div>

        {/* Trust strip */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.82, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-6" style={{ color: TEXT2 }}>
          {["✅ 100% Free", "📢 300+ Telegram deals/day", "💬 20+ WhatsApp deals/day", "🚫 Zero spam"].map(t => (
            <span key={t} className="text-xs font-semibold">{t}</span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 1 }}
        initial={{ opacity: 0 }} animate={{ opacity: 0.45 }} transition={{ delay: 1.3 }}>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
          style={{ borderColor: TEXT2 }}>
          <div className="w-1 h-2 rounded-full" style={{ background: TEXT2 }} />
        </motion.div>
        <span className="text-[10px] uppercase tracking-widest" style={{ color: TEXT2 }}>Scroll</span>
      </motion.div>
    </section>
  );
}

// ── Brand marquee ─────────────────────────────────────────────────────────────
const BRANDS = ["Amazon","Flipkart","Myntra","Nykaa","Meesho","Ajio","Swiggy","Zomato","boAt","Croma","Pepperfry","Reliance","Tata Cliq","BigBasket","IRCTC","Makemytrip"];
function BrandMarquee() {
  return (
    <div className="relative overflow-hidden py-4"
      style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, background: CARD }}>
      <div className="flex gap-14 items-center whitespace-nowrap"
        style={{ animation: "marquee 28s linear infinite" }}>
        {[...BRANDS,...BRANDS,...BRANDS].map((b, i) => (
          <span key={i} className="text-[11px] font-black uppercase tracking-[0.14em] shrink-0"
            style={{ color: "rgba(13,13,13,0.18)" }}>{b}</span>
        ))}
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-33.333%)}}`}</style>
    </div>
  );
}

// ── Pinned scroll reveal (Jeskojets signature) ────────────────────────────────
const PANELS = [
  {
    bg: BG,
    label: "Deals per day · Telegram",
    number: "300+",
    numberColor: ACCENT,
    tagline: "Every category. Every hour.",
    body: "Flash sales, coupon codes, price drops — we post 300+ verified deals daily on our Telegram channel so you never miss a bargain.",
    cta: "See live deals →",
    ctaHref: TELEGRAM_URL,
  },
  {
    bg: DARK,
    label: "Active members growing live",
    number: "LIVE",
    numberColor: ACCENT,
    tagline: "India's largest deal community.",
    body: "Over 2.6 million Indians trust us to find the best prices. From students to professionals — everyone saves.",
    cta: "Join the community →",
    ctaHref: TELEGRAM_URL,
  },
  {
    bg: ACCENT,
    label: "Community savings — estimated",
    number: "₹100Cr+",
    numberColor: "#fff",
    tagline: "Real money. Real savings.",
    body: "Our members have collectively saved over ₹100 crore. That's money back in your pocket — not the brand's.",
    cta: "Start saving today →",
    ctaHref: TELEGRAM_URL,
  },
];

function PinnedScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const liveN = useLive(1800);

  const p0opacity = useTransform(scrollYProgress, [0, 0.15, 0.28, 0.38], [0, 1, 1, 0]);
  const p0scale   = useTransform(scrollYProgress, [0, 0.28], [0.88, 1.0]);
  const p0y       = useTransform(scrollYProgress, [0.28, 0.38], [0, -40]);

  const p1opacity = useTransform(scrollYProgress, [0.33, 0.45, 0.58, 0.66], [0, 1, 1, 0]);
  const p1scale   = useTransform(scrollYProgress, [0.33, 0.58], [0.88, 1.0]);
  const p1y       = useTransform(scrollYProgress, [0.58, 0.66], [0, -40]);

  const p2opacity = useTransform(scrollYProgress, [0.62, 0.75, 1, 1], [0, 1, 1, 1]);
  const p2scale   = useTransform(scrollYProgress, [0.62, 1], [0.88, 1.0]);

  return (
    <div ref={containerRef} style={{ height: "380vh", position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        {/* Panel 0 — light */}
        <motion.div style={{ opacity: p0opacity, scale: p0scale, y: p0y }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ background: PANELS[0].bg } as React.CSSProperties}>
          <RevealPane panel={PANELS[0]} liveN={liveN} />
        </motion.div>

        {/* Panel 1 — dark */}
        <motion.div style={{ opacity: p1opacity, scale: p1scale, y: p1y }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ background: PANELS[1].bg } as React.CSSProperties}>
          <RevealPane panel={PANELS[1]} liveN={liveN} dark />
        </motion.div>

        {/* Panel 2 — accent */}
        <motion.div style={{ opacity: p2opacity, scale: p2scale }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ background: PANELS[2].bg } as React.CSSProperties}>
          <RevealPane panel={PANELS[2]} liveN={liveN} accent />
        </motion.div>
      </div>
    </div>
  );
}

function RevealPane({ panel, liveN, dark = false, accent = false }:
  { panel: typeof PANELS[number]; liveN: number; dark?: boolean; accent?: boolean }) {
  const textColor = accent ? "#fff" : dark ? "#fff" : TEXT;
  const subColor  = accent ? "rgba(255,255,255,0.65)" : dark ? "rgba(255,255,255,0.42)" : TEXT2;
  const labelColor = accent ? "rgba(255,255,255,0.65)" : dark ? "rgba(255,255,255,0.35)" : TEXT2;
  const numberDisplay = panel.number === "LIVE" ? fmtIN(liveN) : panel.number;

  return (
    <div className="max-w-3xl w-full">
      <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-8" style={{ color: labelColor }}>
        {panel.label}
      </p>
      <h2 className="font-black leading-none mb-8"
        style={{ fontSize: "clamp(5rem, 16vw, 14rem)", letterSpacing: "-0.06em", color: panel.numberColor }}>
        {numberDisplay}
      </h2>
      <p className="font-black text-2xl md:text-3xl mb-5 leading-tight"
        style={{ color: textColor, letterSpacing: "-0.03em" }}>
        {panel.tagline}
      </p>
      <p className="text-base leading-relaxed max-w-lg mx-auto mb-10" style={{ color: subColor }}>
        {panel.body}
      </p>
      <a href={panel.ctaHref} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-bold text-sm"
        style={{ color: accent ? "#fff" : dark ? ACCENT : ACCENT, textDecoration: "none" }}>
        {panel.cta} <ArrowRight size={16} />
      </a>
    </div>
  );
}

// ── Deal category grid ────────────────────────────────────────────────────────
const CATS = [
  { title: "Electronics",  pct: "Up to 70% OFF", cat: "boAt · Samsung · JBL · Sony",       img: "/assets/product1.png", accent: "#2563EB" },
  { title: "Fashion",      pct: "Up to 85% OFF", cat: "Myntra · Ajio · Meesho · Nykaa",     img: "/assets/product3.png", accent: "#7C3AED" },
  { title: "Home & Living",pct: "Up to 60% OFF", cat: "Amazon · Flipkart · Pepperfry",      img: "/assets/product2.png", accent: "#16A34A" },
  { title: "Gaming",       pct: "Up to 75% OFF", cat: "Croma · Reliance · Flipkart",        img: "/assets/hero.png",     accent: "#D97706" },
];

function DealGrid() {
  return (
    <section className="px-6 md:px-12 py-32" style={{ background: CARD }}>
      <div className="max-w-6xl mx-auto">
        <motion.div className="mb-16" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: EXPO }}>
          <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-5" style={{ color: ACCENT }}>Browse by category</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-black leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: TEXT, letterSpacing: "-0.05em" }}>
              Every deal,<br />every platform.
            </h2>
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-bold text-sm shrink-0" style={{ color: ACCENT, textDecoration: "none" }}>
              See all live deals <ArrowRight size={15} />
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATS.map((c, i) => <CatCard key={i} c={c} i={i} />)}
        </div>
      </div>
    </section>
  );
}

function CatCard({ c, i }: { c: typeof CATS[number]; i: number }) {
  const [hov, setHov] = useState(false);
  const mx = useMotionValue(0.5), my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0,1], [7,-7]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0,1], [-7, 7]), { stiffness: 200, damping: 20 });
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const leave = () => { mx.set(0.5); my.set(0.5); setHov(false); };

  return (
    <motion.div ref={ref}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: i * 0.09, duration: 0.75, ease: EXPO }}
      onMouseMove={move} onMouseEnter={() => setHov(true)} onMouseLeave={leave}>
      <div className="rounded-2xl overflow-hidden relative"
        style={{
          height: 340,
          border: `1.5px solid ${hov ? c.accent + "50" : BORDER}`,
          boxShadow: hov ? `0 20px 60px ${c.accent}20, 0 4px 16px rgba(13,13,13,0.06)` : "0 2px 12px rgba(13,13,13,0.05)",
          transition: "border-color .3s, box-shadow .3s",
          cursor: "default",
        }}>
        <img src={c.img} alt={c.title} className="w-full h-full object-cover"
          style={{ transform: hov ? "scale(1.08)" : "scale(1)", transition: "transform .6s ease", opacity: 0.88 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.2) 55%, transparent 100%)" }} />

        <AnimatePresence>
          {hov && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}
              className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[11px] font-black text-white"
              style={{ background: c.accent }}>
              🔥 {c.pct}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest mb-1" style={{ color: c.accent }}>{c.pct}</p>
          <h3 className="font-black text-xl mb-1.5 leading-tight" style={{ color: TEXT, letterSpacing: "-0.03em" }}>{c.title}</h3>
          <p className="text-[11px]" style={{ color: TEXT2 }}>{c.cat}</p>
          <AnimatePresence>
            {hov && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }} transition={{ duration: 0.2 }}
                className="flex gap-2 mt-3">
                <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl font-bold text-[11px] text-white"
                  style={{ background: ACCENT }}>
                  <TelegramIcon size={10} /> Telegram
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl font-bold text-[11px]"
                  style={{ border: `1.5px solid ${BORDER}`, color: TEXT }}>
                  <WhatsAppIcon size={10} /> WhatsApp
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// ── Why section ───────────────────────────────────────────────────────────────
const WHY = [
  { icon: Zap,         n: "01", title: "Instant Alerts",   body: "Deals go live on our channel the second they drop. Zero delay." },
  { icon: Shield,      n: "02", title: "Zero Spam",         body: "Every single message is a verified deal. No fluff. Ever." },
  { icon: Bell,        n: "03", title: "All Categories",    body: "Electronics, fashion, food, travel — we cover everything." },
  { icon: TrendingDown,n: "04", title: "Best Prices",       body: "We hunt the deepest discounts so you don't have to." },
];

function WhySection() {
  return (
    <section className="px-6 md:px-12 py-32" style={{ background: BG }}>
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: EXPO }}>
          <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-5" style={{ color: ACCENT }}>Why millions joined</p>
          <h2 className="font-black leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: TEXT, letterSpacing: "-0.05em" }}>
            Built different.<br />Built for India.
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WHY.map((w, i) => {
            const Icon = w.icon;
            const [hov, setHov] = useState(false);
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.7, ease: EXPO }}
                onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                animate={{ y: hov ? -5 : 0, scale: hov ? 1.01 : 1 }} transition={{ duration: 0.28 }}
                className="rounded-2xl p-7 cursor-default"
                style={{
                  background: hov ? DARK : CARD,
                  border: `1.5px solid ${hov ? DARK : BORDER}`,
                  boxShadow: hov ? "0 20px 56px rgba(13,13,13,0.2)" : "0 2px 12px rgba(13,13,13,0.04)",
                  transition: "background .3s, border-color .3s, box-shadow .3s",
                }}>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: hov ? ACCENT : `${ACCENT}12`, transition: "background .3s" }}>
                    <Icon size={20} color={hov ? "#fff" : ACCENT} />
                  </div>
                  <span className="font-black text-4xl" style={{ color: hov ? "rgba(255,255,255,0.1)" : "rgba(13,13,13,0.07)", letterSpacing: "-0.06em" }}>{w.n}</span>
                </div>
                <h3 className="font-black text-lg mb-2.5" style={{ color: hov ? "#fff" : TEXT, letterSpacing: "-0.03em", transition: "color .3s" }}>{w.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: hov ? "rgba(255,255,255,0.45)" : TEXT2, transition: "color .3s" }}>{w.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Savings calc ──────────────────────────────────────────────────────────────
function SavingsCalc() {
  const [spend, setSpend] = useState(5000);
  const saved = Math.round(spend * 0.8);
  const yearly = saved * 12;

  return (
    <section className="px-6 md:px-12 py-32" style={{ background: CARD }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: EXPO }}
          className="rounded-3xl overflow-hidden"
          style={{ background: DARK, border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="relative" style={{ background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${ACCENT}20, transparent 60%)` }}>
            <div className="grid lg:grid-cols-2 gap-0">

              <div className="p-10 md:p-16">
                <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-5" style={{ color: ACCENT }}>Savings Calculator</p>
                <h2 className="font-black leading-none mb-6"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#fff", letterSpacing: "-0.05em" }}>
                  How much could<br />you save?
                </h2>
                <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.38)" }}>
                  Community members save an average of <strong style={{ color: ACCENT }}>80%</strong>. Move the slider.
                </p>
                <div className="flex justify-between text-xs font-semibold mb-2.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                  <span>Monthly spend</span>
                  <span style={{ color: "#fff" }}>₹{spend.toLocaleString("en-IN")}</span>
                </div>
                <input type="range" min={500} max={50000} step={500} value={spend}
                  onChange={e => setSpend(Number(e.target.value))}
                  className="w-full appearance-none rounded-full h-1 cursor-pointer outline-none mb-8"
                  style={{ background: `linear-gradient(to right, ${ACCENT} ${((spend-500)/49500)*100}%, rgba(255,255,255,0.1) 0%)` }} />
                <style>{`input[type=range]::-webkit-slider-thumb{appearance:none;width:18px;height:18px;border-radius:50%;background:${ACCENT};cursor:pointer;box-shadow:0 0 12px ${ACCENT}60}input[type=range]::-moz-range-thumb{width:18px;height:18px;border-radius:50%;background:${ACCENT};border:none;cursor:pointer}`}</style>
              </div>

              <div className="p-10 md:p-16 flex flex-col justify-center gap-4" style={{ borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
                <motion.div key={saved} initial={{ scale: 0.96, opacity: 0.6 }} animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: ACCENT }}>Monthly savings</p>
                  <p className="font-black leading-none" style={{ fontSize: "clamp(3rem, 8vw, 5rem)", color: "#fff", letterSpacing: "-0.06em" }}>
                    ₹{saved.toLocaleString("en-IN")}
                  </p>
                </motion.div>
                <div className="grid grid-cols-2 gap-4">
                  <motion.div key={yearly} initial={{ scale: 0.96 }} animate={{ scale: 1 }}
                    className="rounded-2xl p-5" style={{ background: `${ACCENT}18`, border: `1px solid ${ACCENT}30` }}>
                    <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: ACCENT }}>Per year</p>
                    <p className="font-black text-xl leading-none" style={{ color: "#fff", letterSpacing: "-0.04em" }}>₹{yearly.toLocaleString("en-IN")}</p>
                  </motion.div>
                  <div className="rounded-2xl p-5 flex flex-col justify-between" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <p className="text-[10px] font-semibold uppercase tracking-wider mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>Join free</p>
                    <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs text-white"
                      style={{ background: ACCENT }}>
                      <TelegramIcon size={11} /> Join →
                    </a>
                  </div>
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
  { q: "Is Salelooterz completely free?",             a: "100% free, forever. We share deals because we're passionate about helping people save — no subscriptions, no fees." },
  { q: "How many deals are posted daily?",             a: "300+ deals daily on Telegram and 20+ on WhatsApp — electronics, fashion, food, travel, home goods, and more." },
  { q: "Will I get spammed with random messages?",     a: "Never. Every single message is a verified deal with a real discount. No promotional fluff, no sponsored junk." },
  { q: "Are the deals only for India?",                a: "Primarily yes — most deals are from Amazon India, Flipkart, Myntra, Nykaa, Meesho, Swiggy, and other Indian platforms." },
  { q: "How do I claim a deal?",                       a: "Each post includes a direct link. Tap it and you're taken straight to the product or coupon page — no hunting required." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="px-6 md:px-12 py-32" style={{ background: BG }}>
      <div className="max-w-3xl mx-auto">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: EXPO }}>
          <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-4" style={{ color: ACCENT }}>FAQ</p>
          <h2 className="font-black leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: TEXT, letterSpacing: "-0.05em" }}>
            Common Questions
          </h2>
        </motion.div>
        <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${BORDER}`, background: CARD }}>
          {FAQS.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-8 py-6 text-left"
                style={{ borderBottom: i < FAQS.length - 1 || open === i ? `1px solid ${BORDER}` : "none" }}>
                <span className="font-semibold text-sm pr-6" style={{ color: TEXT }}>{faq.q}</span>
                <ChevronDown size={16} style={{ color: ACCENT, flexShrink: 0, transform: open === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .3s" }} />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div key="b" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.27 }}
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

// ── Final CTA ─────────────────────────────────────────────────────────────────
function FinalCTA() {
  const liveN = useLive(2000);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false });

  return (
    <section className="px-6 md:px-12 pb-28" style={{ background: CARD }}>
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.9, ease: EXPO }}
          className="rounded-3xl overflow-hidden relative text-center py-24 px-8"
          style={{ background: DARK }}>
          {/* Animated accent glow */}
          <motion.div className="absolute inset-0 pointer-events-none"
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 1.2 }}
            style={{ background: `radial-gradient(ellipse 65% 55% at 50% 0%, ${ACCENT}25, transparent 65%)` }} />

          {/* Corner lines */}
          {[["top-0 left-0", "w-24 h-px", "to-r"], ["top-0 left-0", "h-24 w-px", "to-b"], ["bottom-0 right-0", "w-24 h-px", "to-l"], ["bottom-0 right-0", "h-24 w-px", "to-t"]].map(([pos, size, dir], i) => (
            <div key={i} className={`absolute ${pos} ${size}`} style={{ background: `linear-gradient(${dir === "to-r" ? "to right" : dir === "to-l" ? "to left" : dir === "to-b" ? "to bottom" : "to top"}, ${ACCENT}60, transparent)` }} />
          ))}

          <div className="relative z-10">
            <motion.p className="text-xs uppercase tracking-[0.3em] font-semibold mb-8" style={{ color: ACCENT }}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}>
              Join {fmtIN(liveN)} smart shoppers
            </motion.p>

            <div style={{ overflow: "hidden" }}>
              <motion.h2 className="font-black leading-none mb-6"
                style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", color: "#fff", letterSpacing: "-0.055em" }}
                initial={{ y: "100%" }} whileInView={{ y: "0%" }}
                viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.9, ease: EXPO }}>
                Ready to start<br />saving?
              </motion.h2>
            </div>

            <motion.p className="text-base mb-14 max-w-xs mx-auto" style={{ color: "rgba(255,255,255,0.38)" }}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }}>
              Free forever. 300+ Telegram + 20+ WhatsApp deals daily. No spam.
            </motion.p>

            <motion.div className="flex flex-wrap gap-3 justify-center"
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.6 }}>
              <MagBtn href={TELEGRAM_URL}>
                <TelegramIcon size={14} /> Join Telegram — Free
              </MagBtn>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full font-bold text-sm inline-flex items-center gap-2"
                style={{ border: "1.5px solid rgba(255,255,255,0.15)", color: "#fff", textDecoration: "none" }}>
                <WhatsAppIcon size={14} /> Join WhatsApp
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="px-6 md:px-12 py-10" style={{ borderTop: `1px solid ${BORDER}`, background: BG }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-2.5">
          <img src="/assets/logo.jpg" alt="Salelooterz" className="h-7 w-7 rounded-xl object-contain" />
          <span className="font-black text-sm" style={{ color: TEXT, letterSpacing: "-0.025em" }}>SaleLooterz</span>
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-xs" style={{ color: TEXT2 }}>
          {["Privacy","Terms","Contact","About"].map(l => (
            <a key={l} href="#" className="hover:opacity-60 transition-opacity" style={{ textDecoration: "none", color: TEXT2 }}>{l}</a>
          ))}
        </div>
        <p className="text-xs" style={{ color: "rgba(13,13,13,0.18)" }}>© {new Date().getFullYear()} Salelooterz. India's #1 deal community.</p>
      </div>
    </footer>
  );
}
