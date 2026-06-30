import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion, AnimatePresence,
  useMotionValue, useSpring, useTransform,
  useScroll,
} from "framer-motion";
import { ChevronDown, Zap, Bell, TrendingDown, Shield } from "lucide-react";

const TELEGRAM_URL = "https://t.me/salelooterz";
const WHATSAPP_URL = "https://whatsapp.com/channel/salelooterz";

// ── Live member counter (grows ~1.4 members/sec — roughly 120k/day) ────────────
const LIVE_BASE = 2_634_291;
const LIVE_START = Date.now();
const LIVE_RATE  = 1.4; // members per second
function getLive() { return Math.floor(LIVE_BASE + ((Date.now() - LIVE_START) / 1000) * LIVE_RATE); }
function fmtLive(n: number) { return n.toLocaleString("en-IN"); }
function useLiveCount(intervalMs = 1800) {
  const [n, setN] = useState(getLive());
  useEffect(() => { const t = setInterval(() => setN(getLive()), intervalMs); return () => clearInterval(t); }, [intervalMs]);
  return n;
}

// Small inline components for live count in different contexts
function LiveNavCount() {
  const n = useLiveCount(2000);
  return <>{fmtLive(n)} members</>;
}
function LiveHeroCount() {
  const n = useLiveCount(2000);
  return <>{fmtLive(n)}</>;
}
function LiveCTACount() {
  const n = useLiveCount(2000);
  return <>{fmtLive(n)}</>;
}
function LiveStatCount() {
  const n = useLiveCount(1800);
  return <>{fmtLive(n)}</>;
}

// ── Palette ────────────────────────────────────────────────────────────────────
const BG     = "#0a0806";
const CARD   = "#1a1510";
const CARD2  = "#221c14";
const BROWN  = "#c49040";
const CREAM  = "#f0e6cc";
const TEXT   = "#f5f0e8";
const TEXT2  = "rgba(240,230,204,0.38)";
const BORDER = "rgba(196,144,64,0.14)";
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
    <div className="pointer-events-none fixed inset-0 z-[9996] opacity-[0.028]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat", backgroundSize: "180px",
      }} />
  );
}

// ── Custom cursor ──────────────────────────────────────────────────────────────
function CustomCursor() {
  const cx = useMotionValue(-200);
  const cy = useMotionValue(-200);
  const sx = useSpring(cx, { stiffness: 100, damping: 16, mass: 0.4 });
  const sy = useSpring(cy, { stiffness: 100, damping: 16, mass: 0.4 });
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
      <motion.div className="fixed z-[9999] pointer-events-none rounded-full hidden md:block"
        style={{ x: cx, y: cy, width: 6, height: 6, marginLeft: -3, marginTop: -3, background: BROWN }}
        animate={{ opacity: vis ? 1 : 0, scale: hov ? 0 : 1 }} transition={{ duration: 0.12 }} />
      <motion.div className="fixed z-[9998] pointer-events-none rounded-full hidden md:block"
        style={{
          x: sx, y: sy,
          width: hov ? 52 : 30, height: hov ? 52 : 30,
          marginLeft: hov ? -26 : -15, marginTop: hov ? -26 : -15,
          border: `1.5px solid ${BROWN}70`,
          transition: "width .22s ease,height .22s ease,margin .22s ease",
        }}
        animate={{ opacity: vis ? 1 : 0 }} transition={{ duration: 0.18 }} />
    </>
  );
}

// ── Particle canvas hero ───────────────────────────────────────────────────────
function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -999, y: -999 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;

    type Particle = { x: number; y: number; ox: number; oy: number; vx: number; vy: number; r: number; a: number };
    const N = 90;
    const pts: Particle[] = Array.from({ length: N }, () => {
      const x = Math.random() * W, y = Math.random() * H;
      return { x, y, ox: x, oy: y, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3, r: Math.random() * 1.2 + .4, a: Math.random() };
    });

    const CONN = 110, REPEL = 130;

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Spotlight
      const g = ctx.createRadialGradient(mouse.current.x, mouse.current.y, 0, mouse.current.x, mouse.current.y, 380);
      g.addColorStop(0, "rgba(196,144,64,0.07)");
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      for (const p of pts) {
        const dx = p.x - mouse.current.x, dy = p.y - mouse.current.y;
        const d = Math.hypot(dx, dy);
        if (d < REPEL) {
          const f = (REPEL - d) / REPEL * 2.5;
          p.vx += (dx / d) * f * 0.08;
          p.vy += (dy / d) * f * 0.08;
        }
        // Drift back to origin
        p.vx += (p.ox - p.x) * 0.004;
        p.vy += (p.oy - p.y) * 0.004;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.x += p.vx;
        p.y += p.vy;

        // Proximity to mouse: glow brighter
        const md = Math.hypot(p.x - mouse.current.x, p.y - mouse.current.y);
        const glow = md < 200 ? 1 - md / 200 : 0;
        const alpha = 0.15 + glow * 0.6;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + glow * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196,144,64,${alpha})`;
        ctx.fill();
      }

      // Connections
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dd = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (dd < CONN) {
            const op = (1 - dd / CONN) * 0.18;
            ctx.strokeStyle = `rgba(196,144,64,${op})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouse.current = { x: -999, y: -999 }; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const onResize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      pts.forEach(p => { p.ox = Math.random() * W; p.oy = Math.random() * H; p.x = p.ox; p.y = p.oy; });
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />;
}

// ── Magnetic button ────────────────────────────────────────────────────────────
function MagneticBtn({ children, href, primary = false }: { children: React.ReactNode; href: string; primary?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14 });
  const sy = useSpring(y, { stiffness: 180, damping: 14 });

  const move = (e: React.MouseEvent) => {
    if (!wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.42);
    y.set((e.clientY - r.top - r.height / 2) * 0.42);
  };
  const leave = () => { x.set(0); y.set(0); };

  return (
    <div ref={wrapRef} onMouseMove={move} onMouseLeave={leave} style={{ display: "inline-block" }}>
      <motion.a href={href} target="_blank" rel="noopener noreferrer"
        style={{ x: sx, y: sy, display: "inline-flex", alignItems: "center", gap: 8 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-4 rounded-full font-bold text-sm transition-all"
        {...(primary
          ? { style: { x: sx, y: sy, display: "inline-flex", alignItems: "center", gap: 8, background: BROWN, color: BG, boxShadow: `0 0 40px ${BROWN}40` } }
          : { style: { x: sx, y: sy, display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid ${BORDER}`, color: TEXT } }
        )}>
        {children}
      </motion.a>
    </div>
  );
}

// ── Scramble hook ─────────────────────────────────────────────────────────────
const SC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ₹!@#0123456789";
function useScramble(text: string) {
  const [disp, setDisp] = useState(text);
  const t = useRef<ReturnType<typeof setInterval> | null>(null);
  const go = useCallback(() => {
    if (t.current) clearInterval(t.current);
    let it = 0;
    t.current = setInterval(() => {
      setDisp(text.split("").map((c, i) => {
        if (c === " " || c === ".") return c;
        if (i < it) return text[i];
        return SC[Math.floor(Math.random() * SC.length)];
      }).join(""));
      it += 0.55;
      if (it > text.length) { setDisp(text); clearInterval(t.current!); }
    }, 26);
  }, [text]);
  useEffect(() => () => { if (t.current) clearInterval(t.current); }, []);
  return { disp, go };
}

// ── Count-up hook ──────────────────────────────────────────────────────────────
function useCountUp(raw: string, inView: boolean) {
  const m = raw.match(/^([₹]?)(\d+\.?\d*)(M\+|Cr\+|\+|★)?$/);
  const prefix = m?.[1] ?? "", num = parseFloat(m?.[2] ?? "0"), suffix = m?.[3] ?? "";
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let cur = 0; const dur = 1800, step = 16, inc = num / (dur / step);
    const id = setInterval(() => {
      cur += inc;
      if (cur >= num) { setN(num); clearInterval(id); } else setN(cur);
    }, step);
    return () => clearInterval(id);
  }, [inView, num]);
  const d = num >= 10 ? Math.round(n).toString() : n.toFixed(num % 1 ? 2 : 0);
  return `${prefix}${d}${suffix}`;
}

// ── Live ticker notifications ─────────────────────────────────────────────────
const NOTIFICATIONS = [
  { name: "Priya, Mumbai",    text: "saved ₹3,200 on boAt earbuds",         ago: "2 min",  emoji: "🎧" },
  { name: "Rahul, Delhi",     text: "grabbed a laptop at 64% OFF",           ago: "5 min",  emoji: "💻" },
  { name: "Sneha, Bengaluru", text: "got Myntra fashion at 81% OFF",         ago: "8 min",  emoji: "👗" },
  { name: "Arjun, Hyderabad", text: "saved ₹1,800 on Swiggy",               ago: "12 min", emoji: "🍕" },
  { name: "Divya, Chennai",   text: "got a smartwatch at ₹799 (was ₹4,999)","ago": "15 min", emoji: "⌚" },
  { name: "Karan, Ahmedabad", text: "snagged Narzo phone for ₹6,999",       ago: "19 min", emoji: "📱" },
  { name: "Meena, Pune",      text: "saved ₹920 on Nykaa beauty",           ago: "22 min", emoji: "💄" },
  { name: "Vijay, Kolkata",   text: "grabbed HyperX at 70% OFF",            ago: "26 min", emoji: "🎮" },
];

// ── Floating alert that randomly appears ─────────────────────────────────────
function FloatingAlert() {
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState(NOTIFICATIONS[0]);
  const [pos, setPos] = useState({ x: 20, y: 60 });

  useEffect(() => {
    const show = () => {
      const n = NOTIFICATIONS[Math.floor(Math.random() * NOTIFICATIONS.length)];
      const side = Math.random() > 0.5;
      setItem(n);
      setPos({
        x: side ? 20 : undefined as any,
        y: 30 + Math.random() * 40,
      });
      setVisible(true);
      setTimeout(() => setVisible(false), 4500);
    };
    const first = setTimeout(show, 5000);
    const interval = setInterval(show, 9000);
    return () => { clearTimeout(first); clearInterval(interval); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed z-[9000] pointer-events-none hidden md:flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{
            left: 24, bottom: `${pos.y}vh`,
            background: CARD2, border: `1px solid ${BORDER}`,
            boxShadow: `0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px ${BROWN}20`,
            maxWidth: 280,
          }}
          initial={{ x: -120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -120, opacity: 0 }}
          transition={{ duration: 0.45, ease: EXPO }}>
          <span style={{ fontSize: 22 }}>{item.emoji}</span>
          <div>
            <p className="text-xs font-bold leading-tight" style={{ color: CREAM }}>{item.name}</p>
            <p className="text-[11px] leading-tight mt-0.5" style={{ color: TEXT2 }}>{item.text}</p>
          </div>
          <span className="text-[10px] shrink-0 px-2 py-1 rounded-full ml-1"
            style={{ background: `${BROWN}18`, color: BROWN }}>{item.ago} ago</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Splash ─────────────────────────────────────────────────────────────────────
function SplashScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, [onDone]);
  return (
    <motion.div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none"
      style={{ background: BG }}
      exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EXPO }}
        className="flex flex-col items-center gap-6">
        <motion.img src="/assets/logo.jpg" alt="Salelooterz" className="h-16 w-16 rounded-2xl object-contain"
          initial={{ scale: 0.75, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: EXPO }}
          style={{ boxShadow: `0 0 60px ${BROWN}50` }} />
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: TEXT2 }}>Est. 2026 · India</p>
          <h1 className="font-black uppercase leading-none"
            style={{ fontSize: "clamp(2.8rem, 10vw, 7rem)", color: TEXT, letterSpacing: "-0.04em" }}>SALELOOTERZ</h1>
        </div>
        <div className="relative overflow-hidden" style={{ width: 220, height: 1, background: BORDER }}>
          <motion.div className="absolute inset-0" style={{ background: BROWN, transformOrigin: "left" }}
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 2, ease: "linear" }} />
        </div>
        <p className="text-[11px] font-medium tracking-[0.28em] uppercase" style={{ color: TEXT2 }}>
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
      <CustomCursor />
      <FloatingAlert />
      <AnimatePresence>{!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}</AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: splashDone ? 1 : 0 }} transition={{ duration: 0.8 }}>
        <Navbar />
        <Hero />
        <LiveTicker />
        <MarqueeStrip />
        <Stats />
        <DragCarouselSection />
        <WhySection />
        <SavingsCalculator />
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
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <motion.header initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EXPO }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-14 py-4"
      style={{
        background: scrolled ? `${BG}f0` : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? `1px solid ${BORDER}` : "none",
        transition: "all 0.4s ease",
      }}>
      <a href="#" className="flex items-center gap-3 no-underline">
        <img src="/assets/logo.jpg" alt="Salelooterz" className="h-8 w-8 rounded-xl object-contain"
          style={{ boxShadow: `0 0 20px ${BROWN}30` }} />
        <span className="font-black text-sm" style={{ color: CREAM, letterSpacing: "-0.02em" }}>SaleLooterz</span>
      </a>
      <div className="hidden md:flex items-center gap-4">
        <span className="text-xs font-semibold flex items-center gap-1.5" style={{ color: TEXT2 }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#22c55e" }} />
          <LiveNavCount />
        </span>
        <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all hover:opacity-80"
          style={{ background: BROWN, color: BG }}>
          <TelegramIcon size={13} /> Join Free
        </a>
      </div>
    </motion.header>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const fade = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const up   = useTransform(scrollYProgress, [0, 0.55], [0, -80]);

  const h1 = useScramble("Stop Overpaying.");
  const h2 = useScramble("Start Saving Big.");

  const words1 = h1.disp.split(" ");
  const words2 = h2.disp.split(" ");

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <ParticleCanvas />

      {/* Deep glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: 900, height: 900, borderRadius: "50%", background: `radial-gradient(circle, ${BROWN}0e 0%, transparent 60%)` }} />
      </div>

      {/* Content */}
      <motion.div style={{ y: up, opacity: fade, position: "relative", zIndex: 2 }}
        className="flex flex-col items-center text-center px-6 pt-28 pb-20">

        {/* Label */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full mb-10"
          style={{ background: `${BROWN}18`, border: `1px solid ${BROWN}30` }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: BROWN }} />
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: BROWN }}>
            India's #1 Deal Alert Community
          </span>
        </motion.div>

        {/* Scramble headline — hover each line */}
        <h1 className="font-black text-center leading-[0.9] mb-8 cursor-default select-none"
          style={{ fontSize: "clamp(4rem, 11vw, 10rem)", letterSpacing: "-0.05em", maxWidth: 1100 }}>
          <motion.div className="block overflow-hidden" initial={{ y: 80 }} animate={{ y: 0 }} transition={{ delay: 0.2, duration: 0.9, ease: EXPO }}>
            <span onMouseEnter={h1.go} style={{ color: TEXT, display: "inline-block" }}>
              {words1.map((w, i) => (
                <span key={i} style={{ display: "inline-block", marginRight: i < words1.length - 1 ? "0.22em" : 0 }}>{w}</span>
              ))}
            </span>
          </motion.div>
          <motion.div className="block overflow-hidden" initial={{ y: 80 }} animate={{ y: 0 }} transition={{ delay: 0.32, duration: 0.9, ease: EXPO }}>
            <span onMouseEnter={h2.go}
              style={{ color: "transparent", WebkitTextStroke: `2px ${BROWN}`, display: "inline-block" }}>
              {words2.map((w, i) => (
                <span key={i} style={{ display: "inline-block", marginRight: i < words2.length - 1 ? "0.22em" : 0 }}>{w}</span>
              ))}
            </span>
          </motion.div>
        </h1>

        {/* Sub */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="max-w-lg text-lg leading-relaxed mb-14" style={{ color: TEXT2 }}>
          Join <strong style={{ color: CREAM }}><LiveHeroCount /> smart shoppers</strong> getting instant alerts on flash sales,
          price drops &amp; crazy discounts — delivered straight to your phone.
        </motion.p>

        {/* Magnetic CTAs */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.6 }}
          className="flex flex-wrap gap-4 justify-center mb-20">
          <MagneticBtn href={TELEGRAM_URL} primary>
            <TelegramIcon size={15} /> Join on Telegram — Free
          </MagneticBtn>
          <MagneticBtn href={WHATSAPP_URL}>
            <WhatsAppIcon size={15} /> Join on WhatsApp
          </MagneticBtn>
        </motion.div>

        {/* Social proof strip */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-6 text-xs font-semibold" style={{ color: TEXT2 }}>
          {["✅ 100% Free forever", "⚡ 500+ deals/day", "🚫 Zero spam", "🔒 No registration"].map(t => (
            <span key={t}>{t}</span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 2, opacity: fade }}
        initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 1.4 }}>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
          style={{ borderColor: TEXT2 }}>
          <div className="w-1 h-2 rounded-full" style={{ background: TEXT2 }} />
        </motion.div>
        <span className="text-[10px] uppercase tracking-widest" style={{ color: TEXT2 }}>Scroll</span>
      </motion.div>
    </section>
  );
}

// ── Live ticker ────────────────────────────────────────────────────────────────
function LiveTicker() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % NOTIFICATIONS.length), 3500);
    return () => clearInterval(t);
  }, []);
  const n = NOTIFICATIONS[idx];
  return (
    <div className="px-6 md:px-14 pb-10">
      <div className="max-w-6xl mx-auto">
        <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.25 }}
          className="rounded-2xl px-5 py-3.5 flex items-center gap-4 overflow-hidden cursor-default"
          style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#22c55e" }} />
            <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:block" style={{ color: "#22c55e" }}>Live</span>
          </div>
          <div className="w-px h-4 shrink-0" style={{ background: BORDER }} />
          <div className="flex-1 overflow-hidden" style={{ height: 22 }}>
            <AnimatePresence mode="wait">
              <motion.div key={idx} initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }} transition={{ duration: 0.3, ease: EXPO }}
                className="flex items-center gap-2 whitespace-nowrap">
                <span className="text-sm">{n.emoji}</span>
                <span className="text-sm font-bold" style={{ color: CREAM }}>{n.name}</span>
                <span className="text-sm" style={{ color: TEXT2 }}>{n.text}</span>
                <span className="text-xs ml-2 hidden sm:inline" style={{ color: TEXT2 }}>· {n.ago} ago</span>
              </motion.div>
            </AnimatePresence>
          </div>
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
            className="shrink-0 text-[11px] font-bold px-3 py-1.5 rounded-full transition-all hover:opacity-80"
            style={{ background: `${BROWN}22`, color: BROWN }}>Join free →</a>
        </motion.div>
      </div>
    </div>
  );
}

// ── Marquee ────────────────────────────────────────────────────────────────────
const BRANDS = ["Amazon","Flipkart","Myntra","Nykaa","Meesho","Ajio","Swiggy","Zomato","boAt","Croma","Pepperfry","Reliance Digital","Tata Cliq","BigBasket"];
function MarqueeStrip() {
  return (
    <div className="relative overflow-hidden py-5" style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, background: "#0f0c07" }}>
      <div className="flex gap-16 items-center whitespace-nowrap" style={{ animation: "marquee 26s linear infinite" }}>
        {[...BRANDS,...BRANDS,...BRANDS].map((b,i) => (
          <span key={i} className="text-sm font-black uppercase tracking-widest shrink-0" style={{ color: TEXT2, letterSpacing: "0.1em" }}>{b}</span>
        ))}
      </div>
      <style>{`@keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-33.333%)} }`}</style>
    </div>
  );
}

// ── Stats with count-up ────────────────────────────────────────────────────────
const STATS = [
  { raw: "LIVE",   label: "Active Members",      sub: "Telegram & WhatsApp · growing now" },
  { raw: "500+",   label: "Deals Posted Daily",  sub: "Across all categories"        },
  { raw: "100Cr+", label: "Community Savings",   sub: "₹ Estimated total saved"     },
  { raw: "4.9★",   label: "Member Satisfaction", sub: "Based on community reviews"   },
];

function StatCard({ s, i }: { s: typeof STATS[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const cx  = useMotionValue(0.5), cy = useMotionValue(0.5);
  const rx  = useSpring(useTransform(cy, [0,1], [6,-6]),  { stiffness: 180, damping: 22 });
  const ry  = useSpring(useTransform(cx, [0,1], [-6, 6]), { stiffness: 180, damping: 22 });
  const counted = useCountUp(s.raw, inView);

  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    cx.set((e.clientX - r.left) / r.width);
    cy.set((e.clientY - r.top) / r.height);
  };
  const leave = () => { cx.set(0.5); cy.set(0.5); };

  const setRef = useCallback((node: HTMLDivElement | null) => {
    (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    if (!node) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.4 });
    obs.observe(node);
  }, []);

  return (
    <motion.div ref={setRef} style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7, ease: EXPO }}
      onMouseMove={move} onMouseLeave={leave}
      className="rounded-2xl p-8 relative overflow-hidden cursor-default"
      style={{ background: CARD, border: `1px solid ${BORDER}`, boxShadow: "0 8px 40px rgba(0,0,0,0.35)" }}>
      <div className="absolute top-0 right-0 w-28 h-28 pointer-events-none"
        style={{ background: `radial-gradient(circle at top right, ${BROWN}1a, transparent 70%)` }} />
      <p className="font-black mb-2 leading-none"
        style={{ fontSize: s.raw === "LIVE" ? "clamp(1.5rem, 3.2vw, 2.2rem)" : "clamp(2.4rem, 4.5vw, 3.2rem)", color: CREAM, letterSpacing: "-0.05em" }}>
        {s.raw === "LIVE" ? <LiveStatCount /> : s.raw === "100Cr+" ? `₹${counted}` : counted}
      </p>
      {s.raw === "LIVE" && (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-1"
          style={{ background: "#22c55e18", color: "#22c55e" }}>
          <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: "#22c55e" }} /> live
        </span>
      )}
      <p className="font-bold text-sm mb-1" style={{ color: TEXT }}>{s.label}</p>
      <p className="text-xs" style={{ color: TEXT2 }}>{s.sub}</p>
    </motion.div>
  );
}

function Stats() {
  return (
    <section className="px-6 md:px-14 py-28">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="mb-16 text-center">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-4" style={{ color: BROWN }}>By the numbers</p>
          <h2 className="font-black leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: TEXT, letterSpacing: "-0.045em" }}>
            The community<br />speaks for itself
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s, i) => <StatCard key={i} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}

// ── Draggable deal carousel ───────────────────────────────────────────────────
const DEALS = [
  { src: "/assets/product1.png", title: "Electronics", pct: "Up to 70% OFF", cat: "boAt · Samsung · JBL",          color: "#1a3040" },
  { src: "/assets/product3.png", title: "Fashion",     pct: "Up to 85% OFF", cat: "Myntra · Ajio · Meesho",        color: "#301a2a" },
  { src: "/assets/product2.png", title: "Home",        pct: "Up to 60% OFF", cat: "Amazon · Flipkart · Pepperfry", color: "#1a2d1a" },
  { src: "/assets/hero.png",     title: "Gaming",      pct: "Up to 75% OFF", cat: "Croma · Reliance · Flipkart",   color: "#2a1a10" },
  { src: "/assets/product1.png", title: "Travel",      pct: "Up to 50% OFF", cat: "MakeMyTrip · IRCTC · Goibibo",  color: "#10202e" },
];

function DealSlide({ d, i }: { d: typeof DEALS[number]; i: number }) {
  const [hov, setHov] = useState(false);
  const x = useMotionValue(0.5), y = useMotionValue(0.5);
  const rx = useSpring(useTransform(y, [0,1], [8,-8]), { stiffness: 200, damping: 22 });
  const ry = useSpring(useTransform(x, [0,1], [-8, 8]), { stiffness: 200, damping: 22 });
  const ref = useRef<HTMLDivElement>(null);

  const move = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  };
  const leave = () => { x.set(0.5); y.set(0.5); setHov(false); };

  return (
    <motion.div ref={ref}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", flexShrink: 0, width: 280 }}
      onMouseMove={move} onMouseEnter={() => setHov(true)} onMouseLeave={leave}
      animate={{ scale: hov ? 1.03 : 1 }} transition={{ duration: 0.3 }}>
      <div className="rounded-3xl overflow-hidden relative cursor-pointer"
        style={{
          height: 380,
          background: d.color,
          border: `1px solid ${hov ? BROWN + "50" : BORDER}`,
          boxShadow: hov ? `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px ${BROWN}30` : "0 16px 48px rgba(0,0,0,0.35)",
          transition: "border-color .3s, box-shadow .3s",
        }}>
        <img src={d.src} alt={d.title} className="w-full h-full object-cover"
          style={{ transform: hov ? "scale(1.08)" : "scale(1)", transition: "transform .6s ease", opacity: 0.85 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" }} />

        {/* Top badge */}
        <AnimatePresence>
          {hov && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
              className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-black"
              style={{ background: BROWN, color: BG }}>
              🔥 {d.pct}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: BROWN }}>{d.pct}</p>
          <h3 className="font-black text-2xl mb-1" style={{ color: TEXT, letterSpacing: "-0.03em" }}>{d.title}</h3>
          <p className="text-xs mb-4" style={{ color: TEXT2 }}>{d.cat}</p>

          <AnimatePresence>
            {hov && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }} transition={{ duration: 0.25 }}
                className="flex gap-2">
                <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-bold text-xs"
                  style={{ background: BROWN, color: BG }}>
                  <TelegramIcon size={11} /> Telegram
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-bold text-xs"
                  style={{ border: `1px solid ${BORDER}`, color: TEXT, background: "rgba(255,255,255,0.06)" }}>
                  <WhatsAppIcon size={11} /> WhatsApp
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function DragCarouselSection() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [dragW, setDragW] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const measure = () => {
      if (outerRef.current && innerRef.current) {
        setDragW(innerRef.current.scrollWidth - outerRef.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section className="pb-28">
      <div className="max-w-6xl mx-auto px-6 md:px-14 mb-14">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-4" style={{ color: BROWN }}>Drag to explore</p>
            <h2 className="font-black leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: TEXT, letterSpacing: "-0.045em" }}>
              Every category.<br />Every platform.
            </h2>
          </div>
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm shrink-0 transition-all hover:opacity-80"
            style={{ border: `1px solid ${BORDER}`, color: TEXT }}>
            <TelegramIcon size={13} /> See live deals
          </a>
        </motion.div>
      </div>

      {/* Drag instruction */}
      <div className="flex justify-center mb-6">
        <span className="text-xs font-semibold flex items-center gap-1.5" style={{ color: TEXT2 }}>
          ← Drag to explore deals →
        </span>
      </div>

      <div ref={outerRef} className="overflow-hidden px-6 md:px-14" style={{ cursor: isDragging ? "grabbing" : "grab" }}>
        <motion.div ref={innerRef} className="flex gap-5"
          drag="x"
          dragConstraints={{ left: -dragW, right: 0 }}
          dragElastic={0.08}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          style={{ width: "max-content" }}>
          {DEALS.map((d, i) => <DealSlide key={i} d={d} i={i} />)}
        </motion.div>
      </div>
    </section>
  );
}

// ── Why section (horizontal step cards) ───────────────────────────────────────
const WHY = [
  { icon: Zap,         title: "Instant Alerts",    body: "Deals drop the second they go live. No delay, no FOMO.",           n: "01" },
  { icon: Shield,      title: "Zero Spam",          body: "Every message is a verified deal. Nothing else. Ever.",           n: "02" },
  { icon: Bell,        title: "All Categories",     body: "Electronics, fashion, food, travel — we cover everything.",       n: "03" },
  { icon: TrendingDown,title: "Biggest Discounts",  body: "We hunt the deepest cuts so you don't have to.",                 n: "04" },
];

function WhySection() {
  return (
    <section className="px-6 md:px-14 pb-28">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-16 text-center">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-4" style={{ color: BROWN }}>Why millions of Indians joined</p>
          <h2 className="font-black leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: TEXT, letterSpacing: "-0.045em" }}>
            Built different.<br />Built for you.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WHY.map((w, i) => {
            const Icon = w.icon;
            const [hov, setHov] = useState(false);
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7, ease: EXPO }}
                onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                animate={{ y: hov ? -6 : 0 }} transition={{ duration: 0.3 }}
                className="rounded-2xl p-7 relative overflow-hidden"
                style={{
                  background: hov ? CARD2 : CARD,
                  border: `1px solid ${hov ? BROWN + "40" : BORDER}`,
                  boxShadow: hov ? `0 20px 60px rgba(0,0,0,0.45)` : "none",
                  transition: "background .3s, border-color .3s, box-shadow .3s",
                  cursor: "default",
                }}>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: hov ? BROWN : `${BROWN}18`, transition: "background .3s" }}>
                    <Icon size={20} color={hov ? BG : BROWN} />
                  </div>
                  <span className="font-black text-3xl" style={{ color: `${BROWN}25`, letterSpacing: "-0.06em" }}>{w.n}</span>
                </div>
                <h3 className="font-black text-lg mb-2" style={{ color: TEXT, letterSpacing: "-0.025em" }}>{w.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: TEXT2 }}>{w.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Savings Calculator ─────────────────────────────────────────────────────────
function SavingsCalculator() {
  const [spend, setSpend] = useState(5000);
  const saved = Math.round(spend * 0.80);
  const yearly = saved * 12;

  return (
    <section className="px-6 md:px-14 pb-28">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="rounded-3xl p-10 md:p-14 relative overflow-hidden"
          style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${BROWN}55, transparent)` }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${BROWN}0d 0%, transparent 65%)` }} />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-4" style={{ color: BROWN }}>Savings Calculator</p>
              <h2 className="font-black leading-none mb-6"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: TEXT, letterSpacing: "-0.045em" }}>
                How much could<br />you save?
              </h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: TEXT2 }}>
                Community members save an average of <strong style={{ color: BROWN }}>80%</strong> on purchases.
                Drag the slider to see your potential savings.
              </p>
              <div className="mb-2 flex justify-between text-xs font-semibold" style={{ color: TEXT2 }}>
                <span>Monthly online spend</span>
                <span style={{ color: CREAM }}>₹{spend.toLocaleString("en-IN")}</span>
              </div>
              <input type="range" min={500} max={50000} step={500} value={spend}
                onChange={e => setSpend(Number(e.target.value))}
                className="w-full appearance-none rounded-full h-1.5 cursor-pointer outline-none mb-8"
                style={{ background: `linear-gradient(to right, ${BROWN} ${((spend-500)/49500)*100}%, rgba(255,255,255,0.1) 0%)` }} />
              <style>{`input[type=range]::-webkit-slider-thumb{appearance:none;width:20px;height:20px;border-radius:50%;background:${BROWN};cursor:pointer;box-shadow:0 0 14px ${BROWN}60}input[type=range]::-moz-range-thumb{width:20px;height:20px;border-radius:50%;background:${BROWN};border:none;cursor:pointer}`}</style>
              <p className="text-xs" style={{ color: TEXT2 }}>Based on 80% average discount across our deal posts</p>
            </div>

            <div className="flex flex-col gap-4">
              <motion.div key={`m${saved}`} initial={{ scale: 0.97, opacity: 0.7 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.22 }}
                className="rounded-2xl p-8 relative overflow-hidden"
                style={{ background: CARD2, border: `1px solid ${BORDER}` }}>
                <div className="absolute top-0 right-0 w-36 h-36" style={{ background: `radial-gradient(circle at top right, ${BROWN}12, transparent 70%)` }} />
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: BROWN }}>Monthly savings</p>
                <p className="font-black leading-none" style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)", color: CREAM, letterSpacing: "-0.055em" }}>
                  ₹{saved.toLocaleString("en-IN")}
                </p>
                <p className="text-sm mt-2" style={{ color: TEXT2 }}>saved on average every month</p>
              </motion.div>
              <div className="grid grid-cols-2 gap-4">
                <motion.div key={`y${yearly}`} initial={{ scale: 0.97 }} animate={{ scale: 1 }} transition={{ duration: 0.22 }}
                  className="rounded-2xl p-5" style={{ background: `${BROWN}12`, border: `1px solid ${BROWN}25` }}>
                  <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: BROWN }}>Per year</p>
                  <p className="font-black text-2xl leading-none" style={{ color: CREAM, letterSpacing: "-0.04em" }}>
                    ₹{yearly.toLocaleString("en-IN")}
                  </p>
                </motion.div>
                <div className="rounded-2xl p-5 flex flex-col justify-between" style={{ background: CARD2, border: `1px solid ${BORDER}` }}>
                  <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: TEXT2 }}>Start now</p>
                  <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs transition-all hover:opacity-85"
                    style={{ background: BROWN, color: BG }}>
                    <TelegramIcon size={11} /> Join Free →
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

// ── FAQ ────────────────────────────────────────────────────────────────────────
const FAQS = [
  { q: "Is Salelooterz completely free to join?",      a: "Yes, 100% free. Always has been, always will be. We share deals because we're passionate about helping people save." },
  { q: "How many deals are shared per day?",            a: "We typically share 500+ deals per day across Telegram and WhatsApp — electronics, fashion, food, travel, home goods, and more." },
  { q: "Will I get spammed with unnecessary messages?", a: "Absolutely not. Every message is a verified deal with a real discount. No promotional fluff, no sponsored junk." },
  { q: "Are the deals only for India?",                 a: "Primarily yes — most deals are from Amazon India, Flipkart, Myntra, Nykaa, Meesho, and others." },
  { q: "How do I claim a deal once I see it?",          a: "Each deal post includes a direct link. Just click it and you'll be taken straight to the checkout or coupon page." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="px-6 md:px-14 pb-28">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-4" style={{ color: BROWN }}>FAQ</p>
          <h2 className="font-black leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: TEXT, letterSpacing: "-0.045em" }}>
            Common Questions
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
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }}
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
  const ref = useRef<HTMLDivElement>(null);
  const cx = useMotionValue(0.5), cy = useMotionValue(0.5);
  const rx = useSpring(useTransform(cy, [0,1], [5,-5]), { stiffness: 160, damping: 20 });
  const ry = useSpring(useTransform(cx, [0,1], [-5, 5]), { stiffness: 160, damping: 20 });
  const move = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    cx.set((e.clientX - r.left) / r.width);
    cy.set((e.clientY - r.top) / r.height);
  };
  const leave = () => { cx.set(0.5); cy.set(0.5); };

  return (
    <section className="px-6 md:px-14 pb-28">
      <div className="max-w-6xl mx-auto">
        <motion.div ref={ref} style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
          onMouseMove={move} onMouseLeave={leave}
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: EXPO }}
          className="rounded-3xl p-16 md:p-24 text-center relative overflow-hidden"
          style={{ background: CARD2, border: `1px solid ${BORDER}`, boxShadow: "0 40px 100px rgba(0,0,0,0.55)" }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 70% 65% at 50% 0%, ${BROWN}22 0%, transparent 65%)` }} />
          <div className="absolute top-0 right-0 w-px h-40" style={{ background: `linear-gradient(to bottom, ${BROWN}70, transparent)` }} />
          <div className="absolute top-0 right-0 h-px w-40" style={{ background: `linear-gradient(to left, ${BROWN}70, transparent)` }} />
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-[0.32em] font-semibold mb-8" style={{ color: BROWN }}>Join <LiveCTACount /> smart shoppers</p>
            <h2 className="font-black text-white leading-none mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)", letterSpacing: "-0.048em" }}>
              Ready to start<br />saving?
            </h2>
            <p className="text-base mb-14 max-w-sm mx-auto" style={{ color: TEXT2 }}>Free to join. 500+ deals a day. No spam. No catch.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <MagneticBtn href={TELEGRAM_URL} primary>
                <TelegramIcon size={14} /> Join Telegram — Free
              </MagneticBtn>
              <MagneticBtn href={WHATSAPP_URL}>
                <WhatsAppIcon size={14} /> Join WhatsApp
              </MagneticBtn>
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
          {["Privacy","Terms","Contact","About"].map(l => (
            <a key={l} href="#" className="transition-colors hover:text-white" style={{ textDecoration: "none" }}>{l}</a>
          ))}
        </div>
        <p className="text-xs" style={{ color: "rgba(240,230,204,0.16)" }}>© {new Date().getFullYear()} Salelooterz.</p>
      </div>
    </footer>
  );
}
