import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const TELEGRAM_URL = "https://t.me/salelooterz";
const WHATSAPP_URL = "https://whatsapp.com/channel/salelooterz";

const NAVY  = "#050d1a";
const NAVY2 = "#0a1628";
const NAVY3 = "#0f2244";
const ICE   = "#7dd3fc";
const ICE2  = "#38bdf8";
const SLATE = "#94a3b8";
const SLATE2 = "#cbd5e1";
const GLASS  = "rgba(15,34,68,0.75)";
const GBORDER = "rgba(125,211,252,0.15)";

function TelegramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.left = `${e.clientX - 220}px`;
      ref.current.style.top  = `${e.clientY - 220}px`;
      ref.current.style.opacity = "1";
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      ref={ref}
      className="pointer-events-none fixed z-0"
      style={{
        width: 440, height: 440, borderRadius: "50%", opacity: 0,
        background: `radial-gradient(circle, rgba(56,189,248,0.1) 0%, rgba(125,211,252,0.04) 45%, transparent 70%)`,
        transition: "left 0.08s linear, top 0.08s linear, opacity 0.3s",
      }}
    />
  );
}

function TiltCard({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    setTilt({ x: -y, y: x });
  };
  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className={className}
      style={{ ...style, transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transition: "transform 0.15s ease-out", willChange: "transform" }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [splashDone, setSplashDone] = useState(false);
  return (
    <>
      <AnimatePresence>
        {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
      </AnimatePresence>
      <motion.div
        style={{ background: NAVY, color: SLATE2, minHeight: "100vh" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: splashDone ? 1 : 0 }}
        transition={{ duration: 0.7 }}
      >
        <CursorGlow />
        <Navbar />
        <Hero />
        <TickerStrip />
        <Stats />
        <FeaturedDeals />
        <HowItWorks />
        <Founder />
        <Testimonials />
        <Categories />
        <FAQ />
        <FinalCTA />
        <Footer />
      </motion.div>
    </>
  );
}

const SPLASH_BADGES = [
  { text: "🔥 50% OFF", color: ICE2,    x: "-40%", y: "-32%", rotate: -18, delay: 0.5 },
  { text: "⚡ Flash Sale", color: "#0ea5e9", x: "40%", y: "-28%", rotate: 14,  delay: 0.65 },
  { text: "💸 ₹999 Deal",  color: "#06b6d4", x: "-44%", y: "22%", rotate: -10, delay: 0.8 },
  { text: "🛍️ Free Ship",  color: "#3b82f6", x: "42%",  y: "24%", rotate: 12,  delay: 0.9 },
  { text: "🎯 Cashback",   color: ICE,       x: "0%",   y: "-52%", rotate: -4,  delay: 0.55 },
  { text: "🏷️ Price Drop", color: "#0284c7", x: "-8%",  y: "50%",  rotate: 6,   delay: 0.75 },
];

function SplashScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3200);
    return () => clearTimeout(t);
  }, [onDone]);

  const letters = "Salelooterz".split("");

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ background: NAVY }}
      exit={{ y: "-100%", transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 70% 55% at 50% 50%, rgba(56,189,248,0.15) 0%, transparent 70%)` }} />
      <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle, rgba(125,211,252,0.06) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />

      {[...Array(16)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ width: Math.random() * 4 + 2, height: Math.random() * 4 + 2, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, background: [ICE, ICE2, "#0ea5e9", "#3b82f6"][i % 4], opacity: 0.4 }}
          animate={{ y: [0, -28, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 1.5, ease: "easeInOut" }}
        />
      ))}

      <div className="relative flex flex-col items-center select-none">
        <motion.div
          initial={{ scale: 0, rotate: -20, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.1 }}
          className="mb-5 relative"
        >
          <motion.div
            className="absolute inset-0 rounded-2xl blur-2xl"
            style={{ background: ICE2, opacity: 0.4 }}
            animate={{ scale: [1, 1.35, 1], opacity: [0.4, 0.18, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <img src="/assets/logo.jpg" alt="Salelooterz" className="relative h-24 w-24 rounded-2xl object-contain shadow-2xl" />
        </motion.div>

        <div className="flex items-center gap-[2px] mb-3">
          {letters.map((l, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.35 + i * 0.055 }}
              className="text-5xl md:text-7xl font-black leading-none"
              style={{ background: `linear-gradient(135deg, #fff 0%, ${ICE} 55%, ${ICE2} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontStyle: "italic", letterSpacing: "-0.03em" }}
            >
              {l}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="text-sm md:text-base font-medium uppercase"
          style={{ color: "rgba(125,211,252,0.5)", letterSpacing: "0.2em" }}
        >
          India's #1 Deal Alert Community
        </motion.p>

        {SPLASH_BADGES.map((b, i) => (
          <motion.div
            key={i}
            className="absolute px-3 py-1.5 rounded-full text-white text-xs font-bold pointer-events-none whitespace-nowrap"
            style={{ background: b.color, left: `calc(50% + ${b.x})`, top: `calc(50% + ${b.y})`, transform: `translate(-50%, -50%) rotate(${b.rotate}deg)`, boxShadow: `0 4px 20px ${b.color}55` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 16, delay: b.delay }}
          >
            {b.text}
          </motion.div>
        ))}

        <motion.div className="mt-10 h-px rounded-full overflow-hidden" style={{ background: GBORDER, width: 180 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
          <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${ICE}, ${ICE2})` }} initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ delay: 1.5, duration: 1.5, ease: "easeInOut" }} />
        </motion.div>
      </div>
    </motion.div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 transition-all duration-300"
      style={{ background: scrolled ? "rgba(5,13,26,0.92)" : "rgba(5,13,26,0.6)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${scrolled ? GBORDER : "transparent"}` }}
    >
      <motion.a
        href="#"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3 no-underline"
      >
        <img src="/assets/logo.jpg" alt="Salelooterz" className="h-10 w-auto rounded-xl object-contain shrink-0" />
        <span
          className="text-2xl font-black tracking-tight leading-none hidden sm:block"
          style={{ background: `linear-gradient(135deg, #fff 0%, ${ICE} 60%, ${ICE2} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontStyle: "italic", letterSpacing: "-0.03em" }}
        >
          Salelooterz
        </span>
      </motion.a>

      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-3">
        <a
          href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold text-white transition-all active:scale-95"
          style={{ background: `linear-gradient(135deg, ${ICE2}, #0284c7)`, boxShadow: `0 0 20px rgba(56,189,248,0.3)` }}
        >
          <TelegramIcon /> Join Telegram
        </a>
        <a
          href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition-all hover:bg-white/5 active:scale-95"
          style={{ border: `1px solid ${GBORDER}`, color: ICE }}
        >
          <WhatsAppIcon /> Join WhatsApp
        </a>
      </motion.div>
    </header>
  );
}

function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const fn = (e: MouseEvent) => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  const floatingTags = [
    { text: "50% OFF Electronics!", color: ICE2,     x: "12%", y: "38%" },
    { text: "@Flash Sale",          color: "#0ea5e9", x: "68%", y: "28%" },
    { text: "Deal Alert!",          color: ICE,       x: "78%", y: "62%" },
  ];

  const cards = [
    { img: "/assets/product2.png", rotate: -18, x: -260, y: 20, z: 1, bg: NAVY3 },
    { img: "/assets/product1.png", rotate: -9,  x: -130, y: 10, z: 2, bg: NAVY2 },
    { img: "/assets/product3.png", rotate: 0,   x: 0,    y: 0,  z: 3, bg: NAVY3 },
    { img: "/assets/hero.png",     rotate: 9,   x: 130,  y: 10, z: 2, bg: NAVY2 },
    { img: "/assets/product2.png", rotate: 18,  x: 260,  y: 20, z: 1, bg: NAVY3 },
  ];

  const gx = (mousePos.x - 0.5) * 40;
  const gy = (mousePos.y - 0.5) * 40;

  return (
    <section className="pt-16 pb-0 min-h-screen flex flex-col items-center justify-center overflow-hidden relative">
      <div
        className="absolute inset-0 transition-all duration-200"
        style={{
          background: `radial-gradient(ellipse 80% 60% at ${50 + gx * 0.4}% ${45 + gy * 0.4}%, rgba(56,189,248,0.12) 0%, transparent 65%)`,
        }}
      />
      <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle, rgba(125,211,252,0.05) 1px, transparent 1px)`, backgroundSize: "48px 48px" }} />

      <div className="w-full max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-6"
            style={{ background: `rgba(56,189,248,0.1)`, border: `1px solid ${GBORDER}`, color: ICE }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse" style={{ background: ICE2 }} />
            Live Deals · 2.63M+ Members
          </motion.div>
          <h1
            className="font-black leading-[1.0] tracking-tight"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: "#fff" }}
          >
            Stop Overpaying.{" "}
            <span style={{ background: `linear-gradient(135deg, ${ICE} 0%, ${ICE2} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Start</span>{" "}
            Saving Big.
          </h1>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="relative mt-10 mb-0" style={{ height: 320 }}>
          <div className="absolute inset-0 flex items-end justify-center">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: card.y }}
                whileHover={{ scale: 1.06, zIndex: 10 }}
                transition={{ duration: 0.7, delay: 0.1 * i, ease: "easeOut" }}
                className="absolute cursor-pointer"
                style={{ width: 140, height: 200, left: `calc(50% + ${card.x}px - 70px)`, bottom: 0, zIndex: card.z, rotate: `${card.rotate}deg`, borderRadius: 20, overflow: "hidden", boxShadow: `0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px ${GBORDER}`, background: card.bg }}
              >
                <img src={card.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </motion.div>
            ))}
          </div>
          {floatingTags.map((tag, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
              className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg"
              style={{ left: tag.x, top: tag.y, backgroundColor: tag.color, color: "#fff", zIndex: 10, boxShadow: `0 4px 20px ${tag.color}55` }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80 inline-block" />
              {tag.text}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="relative z-10 text-center px-6 pt-10 pb-24">
        <p className="text-base max-w-md mx-auto mb-8 leading-relaxed" style={{ color: SLATE }}>
          Join 2.63M+ shoppers getting instant alerts on the best deals. Flash sales, price drops, and crazy discounts delivered to your phone.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: `linear-gradient(135deg, ${ICE2}, #0284c7)`, boxShadow: `0 0 30px rgba(56,189,248,0.35)` }}
          >
            <TelegramIcon /> Join Telegram
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold transition-all hover:bg-white/5 active:scale-95"
            style={{ border: `1px solid ${GBORDER}`, color: SLATE2 }}
          >
            Read more
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function TickerStrip() {
  const items = ["🔥 Flash Sale", "⚡ Price Drop", "💸 Cashback Alert", "🛍️ Free Shipping", "🎯 Extra 15% Off", "🏷️ Bank Offers", "🔥 Trending Deals", "⚡ Limited Time", "💸 Coupon Codes"];
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-3" style={{ background: `rgba(56,189,248,0.08)`, borderTop: `1px solid ${GBORDER}`, borderBottom: `1px solid ${GBORDER}` }}>
      <div className="flex whitespace-nowrap" style={{ animation: "marquee 22s linear infinite" }}>
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center mx-8 text-xs font-bold" style={{ color: ICE }}>
            {item}
            <span className="ml-8 w-1 h-1 rounded-full inline-block" style={{ background: GBORDER }} />
          </span>
        ))}
      </div>
    </div>
  );
}

function Stats() {
  const stats = [
    { value: "2.63M+", label: "Active Members", sub: "& Continuously Growing", growing: true },
    { value: "80%",    label: "Avg. Discount Found" },
    { value: "4.9/5",  label: "Member Rating" },
  ];

  return (
    <section className="py-16 relative" style={{ background: NAVY2 }}>
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl p-8"
            style={{ background: GLASS, border: `1px solid ${GBORDER}`, backdropFilter: "blur(8px)" }}
          >
            <div className="text-4xl font-black mb-1" style={{ background: `linear-gradient(135deg, #fff, ${ICE})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {s.value}
            </div>
            <div className="text-sm font-bold mb-1" style={{ color: SLATE2 }}>{s.label}</div>
            {"growing" in s && s.growing && (
              <div className="text-xs font-medium flex items-center justify-center gap-1.5" style={{ color: SLATE }}>
                <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#22c55e" }} />
                {s.sub}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FeaturedDeals() {
  const deals = [
    { store: "Amazon",  category: "Electronics", title: "Sony WH-1000XM5 Wireless Headphones",      original: "₹29,990", sale: "₹18,990", off: "37%", accent: ICE2 },
    { store: "Flipkart",category: "Fashion",     title: "Levi's Men's Slim Fit Jeans",               original: "₹3,999",  sale: "₹1,299",  off: "67%", accent: "#818cf8" },
    { store: "Myntra",  category: "Beauty",      title: "Lakme Absolute Skin Gloss Bundle",          original: "₹1,800",  sale: "₹699",    off: "61%", accent: "#f472b6" },
    { store: "Nykaa",   category: "Health",      title: "Mamaearth Vitamin C Serum Pack",            original: "₹999",    sale: "₹449",    off: "55%", accent: ICE },
    { store: "Meesho",  category: "Home",        title: "Saral Home 300 TC Cotton Bedsheet Set",     original: "₹1,499",  sale: "₹499",    off: "66%", accent: "#34d399" },
    { store: "Amazon",  category: "Gadgets",     title: "boAt Airdopes 141 Bluetooth Earbuds",       original: "₹4,490",  sale: "₹999",    off: "77%", accent: "#fb923c" },
  ];

  return (
    <section className="py-24 relative" style={{ background: NAVY }}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4" style={{ background: `rgba(56,189,248,0.1)`, border: `1px solid ${GBORDER}`, color: ICE }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse" style={{ background: ICE2 }} />
            Live from Our Channel
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-3 text-white">Featured Deals</h2>
          <p className="text-base max-w-md mx-auto" style={{ color: SLATE }}>A glimpse of what our members get every single day.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {deals.map((deal, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <TiltCard
                className="rounded-2xl p-6 h-full cursor-pointer group"
                style={{ background: GLASS, border: `1px solid ${GBORDER}`, backdropFilter: "blur(8px)" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(125,211,252,0.07)", color: SLATE }}>{deal.category}</span>
                  <span className="text-xs font-black px-2.5 py-1 rounded-full" style={{ background: `${deal.accent}18`, color: deal.accent }}>{deal.off} OFF</span>
                </div>
                <h3 className="font-bold text-base mb-4 leading-snug text-white group-hover:text-sky-300 transition-colors">{deal.title}</h3>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs line-through" style={{ color: "rgba(148,163,184,0.5)" }}>{deal.original}</p>
                    <p className="text-2xl font-black text-white">{deal.sale}</p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ background: "rgba(125,211,252,0.06)", color: SLATE }}>via {deal.store}</span>
                </div>
                <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" style={{ boxShadow: `0 0 0 1px ${deal.accent}33, inset 0 0 30px ${deal.accent}08` }} />
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-sm mt-8" style={{ color: SLATE }}>
          500+ more deals posted every day.{" "}
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-sky-300 transition-colors" style={{ color: ICE }}>Join to see them all.</a>
        </motion.p>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { num: "01", icon: "📲", title: "Join Our Channel", desc: "Click the Telegram or WhatsApp button to join the Salelooterz community instantly. Free forever." },
    { num: "02", icon: "⚡", title: "Get Instant Alerts", desc: "We post flash sales, price drops, and hidden deals the moment they go live — direct to your phone." },
    { num: "03", icon: "🎯", title: "Loot the Savings",  desc: "Click through verified links to claim the deal instantly. No fees, no catch — just pure savings." },
  ];

  return (
    <section className="py-24" style={{ background: NAVY2, borderTop: `1px solid ${GBORDER}` }}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-3 text-white">How It Works</h2>
          <p className="text-base max-w-md mx-auto" style={{ color: SLATE }}>Three steps to never paying full price again.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl p-8 relative overflow-hidden group"
              style={{ background: GLASS, border: `1px solid ${GBORDER}`, backdropFilter: "blur(8px)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg, transparent, ${ICE2}, transparent)` }} />
              <div className="text-4xl mb-4">{step.icon}</div>
              <span className="block text-7xl font-black mb-4 leading-none" style={{ color: ICE, opacity: 0.1 }}>{step.num}</span>
              <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: SLATE }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section className="py-24" style={{ background: NAVY, borderTop: `1px solid ${GBORDER}` }}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: ICE }}>Our Story</span>
          <h2 className="text-4xl md:text-5xl font-black mt-2 text-white">Meet the Founder</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <div className="relative w-72 md:w-96 mx-auto lg:mx-0">
              <div className="rounded-3xl overflow-hidden" style={{ border: `1px solid ${GBORDER}`, boxShadow: `0 0 60px rgba(56,189,248,0.1)` }}>
                <img src="/assets/founder.jpeg" alt="The Yanik – Founder of Salelooterz" className="w-full h-auto block" style={{ aspectRatio: "3/4", objectFit: "cover", objectPosition: "top" }} />
              </div>
              <div className="absolute -bottom-4 -right-4 rounded-2xl px-5 py-3 shadow-lg" style={{ background: NAVY3, border: `1px solid ${GBORDER}` }}>
                <p className="font-black text-base text-white">The Yanik</p>
                <p className="text-xs font-semibold" style={{ color: ICE }}>Founder, Salelooterz</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <blockquote className="text-3xl md:text-4xl font-black leading-tight mb-8 pl-5 text-white" style={{ borderLeft: `4px solid ${ICE2}` }}>
              "I was tired of overpaying. So I built a community to make sure no one else had to."
            </blockquote>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: SLATE }}>
              <p>Salelooterz was born out of frustration. I used to spend hours comparing prices, hunting coupon codes, and waiting for the right moment to buy. It was exhausting — and I knew I wasn't alone.</p>
              <p>In 2021, I started sharing deals with a small group of friends on Telegram. Within months, thousands had joined, and the community took on a life of its own. Today, Salelooterz is home to millions of smart shoppers across India.</p>
              <p>Our mission has never changed: <strong className="text-white">find the best deals, share them instantly, and help every member save money every single day.</strong></p>
            </div>
            <div className="flex flex-wrap gap-4 mt-10">
              {[{ v: "3+", l: "Years Running" }, { v: "2.63M", l: "Members Helped" }, { v: "₹100Cr+", l: "Saved by Community" }].map((s, i) => (
                <div key={i} className="rounded-xl px-6 py-4 text-center" style={{ background: GLASS, border: `1px solid ${GBORDER}` }}>
                  <p className="text-2xl font-black" style={{ color: i === 2 ? ICE : "#fff" }}>{s.v}</p>
                  <p className="text-xs font-medium mt-1" style={{ color: SLATE }}>{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { name: "Priya Sharma",  location: "Delhi",     text: "I saved ₹12,000 on my laptop because of a deal I found on Salelooterz. Literally the best Telegram channel I've ever joined." },
    { name: "Rahul Verma",   location: "Mumbai",    text: "The deals are legit and instant. By the time I see a flash sale on social media, Salelooterz has already posted it 2 hours earlier." },
    { name: "Sneha Iyer",    location: "Bangalore", text: "I've shared this channel with my entire family. We collectively save thousands every month. Everyone should join!" },
    { name: "Arjun Mehta",   location: "Hyderabad", text: "Got a 77% off deal on earbuds that I'd been eyeing for months. The channel posts crazy deals daily." },
    { name: "Divya Nair",    location: "Chennai",   text: "Best thing about Salelooterz is there's zero spam. Only real deals. Finally a group worth keeping notifications on." },
    { name: "Karan Patel",   location: "Ahmedabad", text: "Joined 6 months ago and I've already saved over ₹25,000. This community has completely changed how I shop online." },
  ];

  return (
    <section className="py-24" style={{ background: NAVY2, borderTop: `1px solid ${GBORDER}` }}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-3 text-white">What Members Say</h2>
          <p className="text-base max-w-md mx-auto" style={{ color: SLATE }}>Real stories from real savers in our community.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl p-6"
              style={{ background: GLASS, border: `1px solid ${GBORDER}`, backdropFilter: "blur(8px)" }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 24 24" style={{ fill: ICE2 }}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: SLATE }}>"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-black shrink-0" style={{ background: `linear-gradient(135deg, ${NAVY3}, ${ICE2})`, border: `1px solid ${GBORDER}` }}>
                  {r.name[0]}
                </div>
                <div>
                  <p className="font-bold text-sm text-white">{r.name}</p>
                  <p className="text-xs" style={{ color: SLATE }}>{r.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Categories() {
  const cats     = ["Fashion", "Electronics", "Home & Living", "Beauty", "Travel", "Food & Dining", "Sports", "Health"];
  const discounts= ["Up to 70%", "Up to 60%", "Up to 55%", "Up to 50%", "Up to 40%", "Up to 50%", "Up to 65%", "Up to 45%"];

  return (
    <section className="py-24" style={{ background: NAVY, borderTop: `1px solid ${GBORDER}` }}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <h2 className="text-4xl font-black mb-2 text-white">Deal Categories</h2>
          <p className="text-sm" style={{ color: SLATE }}>Massive discounts across every department, every day.</p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {cats.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.03, borderColor: ICE2 }}
              className="rounded-xl p-5 cursor-pointer group transition-all"
              style={{ background: GLASS, border: `1px solid ${GBORDER}` }}
            >
              <h3 className="font-bold mb-1.5 text-sm text-white group-hover:text-sky-300 transition-colors">{cat}</h3>
              <span className="text-xs font-semibold" style={{ color: ICE }}>{discounts[i]}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Is Salelooterz completely free to join?",    a: "Yes, 100% free. Always has been, always will be. We share deals because we're passionate about helping people save." },
    { q: "How many deals are shared per day?",         a: "We typically share 500+ deals per day across Telegram and WhatsApp — spanning electronics, fashion, food, travel, home goods, and more." },
    { q: "Will I get spammed with unnecessary messages?", a: "Absolutely not. Every message is a verified deal with a real discount. No promotional fluff, no sponsored junk." },
    { q: "Are the deals only for India?",              a: "Primarily yes — most deals are from Amazon India, Flipkart, Myntra, Nykaa, Meesho, and others. We occasionally share international deals too." },
    { q: "How do I claim a deal once I see it?",       a: "Each deal post includes a direct link. Just click it and you'll be taken straight to the checkout or coupon page. No extra steps." },
    { q: "Can I submit deals I've found myself?",      a: "Yes! Message our admin on Telegram. We verify and post the best community-submitted deals too." },
  ];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24" style={{ background: NAVY2, borderTop: `1px solid ${GBORDER}` }}>
      <div className="max-w-3xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-3 text-white">Frequently Asked Questions</h2>
          <p className="text-base" style={{ color: SLATE }}>Everything you need to know about Salelooterz.</p>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${open === i ? ICE2 + "40" : GBORDER}`, background: GLASS, backdropFilter: "blur(8px)", transition: "border-color 0.2s" }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                style={{ background: "transparent" }}
              >
                <span className="font-semibold text-sm pr-4 text-white">{faq.q}</span>
                <ChevronDown
                  className="w-4 h-4 shrink-0 transition-transform duration-300"
                  style={{ color: ICE, transform: open === i ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                    style={{ borderTop: `1px solid ${GBORDER}` }}
                  >
                    <p className="px-6 pb-5 pt-4 text-sm leading-relaxed" style={{ color: SLATE }}>{faq.a}</p>
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

function FinalCTA() {
  return (
    <section className="py-24" style={{ background: NAVY, borderTop: `1px solid ${GBORDER}` }}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-12 md:p-20 text-center relative overflow-hidden"
          style={{ background: NAVY3, border: `1px solid ${GBORDER}` }}
        >
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 80% 60% at 50% 50%, rgba(56,189,248,0.08) 0%, transparent 70%)` }} />
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${ICE2}, transparent)` }} />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-5 leading-tight">
              Ready to Start Looting?
            </h2>
            <p className="text-base mb-10 max-w-xl mx-auto" style={{ color: SLATE }}>
              Join millions of smart shoppers who never pay full price. Free to join. Deals every day. No spam.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-sm transition-all hover:opacity-90 active:scale-95"
                style={{ background: `linear-gradient(135deg, ${ICE2}, #0284c7)`, boxShadow: `0 0 40px rgba(56,189,248,0.4)` }}
              >
                <TelegramIcon /> Join on Telegram
              </a>
              <a
                href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-all hover:bg-white/5 active:scale-95"
                style={{ border: `1px solid ${GBORDER}`, color: SLATE2 }}
              >
                <WhatsAppIcon /> Join on WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: NAVY2, borderTop: `1px solid ${GBORDER}` }} className="py-10">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src="/assets/logo.jpg" alt="Salelooterz" className="h-9 w-auto rounded-xl" />
          <span className="font-black italic text-lg" style={{ background: `linear-gradient(135deg, #fff, ${ICE})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Salelooterz</span>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm" style={{ color: SLATE }}>
          {["Privacy Policy", "Terms", "Contact", "About"].map(link => (
            <a key={link} href="#" className="hover:text-sky-300 transition-colors">{link}</a>
          ))}
        </div>
        <p className="text-sm whitespace-nowrap" style={{ color: "rgba(148,163,184,0.4)" }}>
          © {new Date().getFullYear()} Salelooterz
        </p>
      </div>
    </footer>
  );
}
