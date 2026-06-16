import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const TELEGRAM_URL = "https://t.me/salelooterz";
const WHATSAPP_URL = "https://whatsapp.com/channel/salelooterz";
const PINK = "#ff2d78";

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

export default function Home() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
      </AnimatePresence>
      <motion.div
        className="min-h-screen font-sans"
        style={{ background: "#f0f0f0", color: "#0a0a0a" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: splashDone ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <Navbar />
        <Hero />
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

const DEAL_BADGES = [
  { text: "🔥 50% OFF", color: "#ff2d78", x: "-38%", y: "-30%", rotate: -18, delay: 0.5 },
  { text: "⚡ Flash Sale", color: "#f59e0b", x: "38%", y: "-28%", rotate: 14, delay: 0.65 },
  { text: "💸 ₹999 Deal", color: "#10b981", x: "-42%", y: "20%", rotate: -10, delay: 0.8 },
  { text: "🛍️ Free Shipping", color: "#6366f1", x: "40%", y: "22%", rotate: 12, delay: 0.9 },
  { text: "🎯 Cashback Alert", color: "#ec4899", x: "0%", y: "-50%", rotate: -4, delay: 0.55 },
  { text: "🏷️ Price Drop", color: "#0ea5e9", x: "-10%", y: "48%", rotate: 6, delay: 0.75 },
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
      style={{ background: "#09090b" }}
      exit={{ y: "-100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
    >
      {/* Radial glow */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          background: `radial-gradient(ellipse 70% 55% at 50% 50%, rgba(255,45,120,0.22) 0%, transparent 70%)`,
        }}
      />

      {/* Floating particle dots */}
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 5 + 2,
            height: Math.random() * 5 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: [PINK, "#a855f7", "#f59e0b", "#10b981"][i % 4],
            opacity: 0.5,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 1.5,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative flex flex-col items-center select-none">
        {/* Logo burst */}
        <motion.div
          initial={{ scale: 0, rotate: -20, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.1 }}
          className="mb-5 relative"
        >
          <motion.div
            className="absolute inset-0 rounded-2xl blur-2xl"
            style={{ background: PINK, opacity: 0.5 }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.25, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <img
            src="/assets/logo.jpg"
            alt="Salelooterz"
            className="relative h-24 w-24 rounded-2xl object-contain shadow-2xl"
          />
        </motion.div>

        {/* Letter-by-letter brand name */}
        <div className="flex items-center gap-[2px] mb-3">
          {letters.map((l, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.35 + i * 0.055,
              }}
              className="text-5xl md:text-7xl font-black leading-none"
              style={{
                background: `linear-gradient(135deg, #fff 0%, ${PINK} 55%, #a855f7 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontStyle: "italic",
                letterSpacing: "-0.03em",
              }}
            >
              {l}
            </motion.span>
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="text-sm md:text-base font-medium tracking-widest uppercase"
          style={{ color: "rgba(255,255,255,0.45)", letterSpacing: "0.2em" }}
        >
          India's #1 Deal Alert Community
        </motion.p>

        {/* Deal badges flying in */}
        {DEAL_BADGES.map((b, i) => (
          <motion.div
            key={i}
            className="absolute px-3 py-1.5 rounded-full text-white text-xs font-bold shadow-lg pointer-events-none whitespace-nowrap"
            style={{
              background: b.color,
              left: `calc(50% + ${b.x})`,
              top: `calc(50% + ${b.y})`,
              transform: `translate(-50%, -50%) rotate(${b.rotate}deg)`,
              boxShadow: `0 4px 24px ${b.color}55`,
            }}
            initial={{ scale: 0, opacity: 0, rotate: b.rotate - 20 }}
            animate={{ scale: 1, opacity: 1, rotate: b.rotate }}
            transition={{ type: "spring", stiffness: 320, damping: 16, delay: b.delay }}
          >
            {b.text}
          </motion.div>
        ))}

        {/* Loading bar */}
        <motion.div
          className="mt-10 h-0.5 rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.1)", width: 180 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${PINK}, #a855f7)` }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.5, duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

function Navbar() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16"
      style={{ background: "rgba(240,240,240,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,0,0,0.07)" }}
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
          style={{
            background: `linear-gradient(135deg, #0a0a0a 0%, ${PINK} 60%, #a855f7 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontStyle: "italic",
            letterSpacing: "-0.03em",
          }}
        >
          Salelooterz
        </span>
      </motion.a>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3"
      >
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
          style={{ backgroundColor: "#0a0a0a" }}
        >
          <TelegramIcon />
          Join Telegram
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition-all hover:bg-black/5 active:scale-95"
          style={{ border: "1.5px solid rgba(0,0,0,0.2)", color: "#0a0a0a" }}
        >
          <WhatsAppIcon />
          Join WhatsApp
        </a>
      </motion.div>
    </header>
  );
}

function Hero() {
  const floatingTags = [
    { text: "50% OFF Electronics!", color: "#22c55e", textColor: "#fff", x: "12%", y: "38%" },
    { text: "@Flash Sale", color: "#0ea5e9", textColor: "#fff", x: "68%", y: "28%" },
    { text: "Deal Alert!", color: PINK, textColor: "#fff", x: "78%", y: "62%" },
  ];

  const cards = [
    { img: "/assets/product2.png", rotate: -18, x: -260, y: 20, z: 1, bg: "#1a1a2e" },
    { img: "/assets/product1.png", rotate: -9, x: -130, y: 10, z: 2, bg: "#f5f0eb" },
    { img: "/assets/product3.png", rotate: 0, x: 0, y: 0, z: 3, bg: "#f9f3e8" },
    { img: "/assets/hero.png", rotate: 9, x: 130, y: 10, z: 2, bg: "#0f0f1a" },
    { img: "/assets/product2.png", rotate: 18, x: 260, y: 20, z: 1, bg: "#101014" },
  ];

  return (
    <section className="pt-16 pb-0 min-h-screen flex flex-col items-center justify-center overflow-hidden relative">
      <div className="w-full max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h1
            className="font-black leading-[1.0] tracking-tight"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: "#0a0a0a" }}
          >
            Stop Overpaying.{" "}
            <span style={{ color: PINK }}>Start</span> Saving Big.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative mt-10 mb-0"
          style={{ height: 320 }}
        >
          <div className="absolute inset-0 flex items-end justify-center">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: card.y }}
                transition={{ duration: 0.7, delay: 0.1 * i, ease: "easeOut" }}
                className="absolute"
                style={{
                  width: 140,
                  height: 200,
                  left: `calc(50% + ${card.x}px - 70px)`,
                  bottom: 0,
                  zIndex: card.z,
                  rotate: `${card.rotate}deg`,
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                  background: card.bg,
                }}
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
              style={{
                left: tag.x,
                top: tag.y,
                backgroundColor: tag.color,
                color: tag.textColor,
                zIndex: 10,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80 inline-block" />
              {tag.text}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-10 text-center px-6 pt-10 pb-24"
      >
        <p className="text-base text-black/50 max-w-md mx-auto mb-8 leading-relaxed">
          Join 2.63M+ shoppers getting instant alerts on the best deals. Flash sales, price drops, and crazy discounts delivered to your phone.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: "#0a0a0a" }}
          >
            <TelegramIcon />
            Join Telegram
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold transition-all hover:bg-black/5 active:scale-95"
            style={{ border: "1.5px solid rgba(0,0,0,0.2)", color: "#0a0a0a" }}
          >
            Read more
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: "2.63M+", label: "& Continuously Growing", growing: true },
    { value: "80%", label: "Avg. Discount Found" },
    { value: "4.9/5", label: "Member Rating" },
  ];

  return (
    <section style={{ background: "#fff", borderTop: "1px solid rgba(0,0,0,0.07)", borderBottom: "1px solid rgba(0,0,0,0.07)" }} className="py-16">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            {"growing" in s && s.growing ? (
              <>
                <div className="text-4xl font-black mb-1" style={{ color: PINK }}>{s.value}</div>
                <div className="text-sm font-bold" style={{ color: "#0a0a0a" }}>Active Members</div>
                <div className="text-xs font-medium mt-0.5 flex items-center justify-center gap-1" style={{ color: "rgba(0,0,0,0.45)" }}>
                  <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#22c55e" }} />
                  {s.label}
                </div>
              </>
            ) : (
              <>
                <div className="text-4xl font-black mb-1" style={{ color: PINK }}>{s.value}</div>
                <div className="text-sm font-medium" style={{ color: "rgba(0,0,0,0.45)" }}>{s.label}</div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FeaturedDeals() {
  const deals = [
    { store: "Amazon", category: "Electronics", title: "Sony WH-1000XM5 Wireless Headphones", original: "₹29,990", sale: "₹18,990", off: "37%", accent: "#ff6b35" },
    { store: "Flipkart", category: "Fashion", title: "Levi's Men's Slim Fit Jeans", original: "₹3,999", sale: "₹1,299", off: "67%", accent: "#a855f7" },
    { store: "Myntra", category: "Beauty", title: "Lakme Absolute Skin Gloss Bundle", original: "₹1,800", sale: "₹699", off: "61%", accent: PINK },
    { store: "Nykaa", category: "Health", title: "Mamaearth Vitamin C Serum Pack", original: "₹999", sale: "₹449", off: "55%", accent: "#0ea5e9" },
    { store: "Meesho", category: "Home", title: "Saral Home 300 TC Cotton Bedsheet Set", original: "₹1,499", sale: "₹499", off: "66%", accent: "#22c55e" },
    { store: "Amazon", category: "Gadgets", title: "boAt Airdopes 141 Bluetooth Earbuds", original: "₹4,490", sale: "₹999", off: "77%", accent: PINK },
  ];

  return (
    <section className="py-24" style={{ background: "#f0f0f0" }}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4" style={{ background: PINK + "15", color: PINK }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse" style={{ background: PINK }} />
            Live from Our Channel
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-3" style={{ color: "#0a0a0a" }}>Featured Deals</h2>
          <p className="text-base max-w-md mx-auto" style={{ color: "rgba(0,0,0,0.45)" }}>A glimpse of what our members get every single day.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {deals.map((deal, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="rounded-2xl p-6 hover:shadow-lg transition-all group cursor-pointer"
              style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(0,0,0,0.05)", color: "rgba(0,0,0,0.5)" }}>{deal.category}</span>
                <span className="text-xs font-black px-2.5 py-1 rounded-full" style={{ background: deal.accent + "18", color: deal.accent }}>{deal.off} OFF</span>
              </div>
              <h3 className="font-bold text-base mb-4 leading-snug group-hover:opacity-70 transition-opacity" style={{ color: "#0a0a0a" }}>{deal.title}</h3>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs line-through" style={{ color: "rgba(0,0,0,0.35)" }}>{deal.original}</p>
                  <p className="text-2xl font-black" style={{ color: "#0a0a0a" }}>{deal.sale}</p>
                </div>
                <span className="text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ background: "rgba(0,0,0,0.05)", color: "rgba(0,0,0,0.4)" }}>via {deal.store}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-sm mt-8" style={{ color: "rgba(0,0,0,0.4)" }}>
          500+ more deals posted every day.{" "}
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="underline hover:opacity-70 transition-opacity" style={{ color: "#0a0a0a" }}>Join to see them all.</a>
        </motion.p>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { num: "01", title: "Join Our Channel", desc: "Click the Telegram or WhatsApp button to join the Salelooterz community instantly. Free forever." },
    { num: "02", title: "Get Instant Alerts", desc: "We post flash sales, price drops, and hidden deals the moment they go live — direct to your phone." },
    { num: "03", title: "Loot the Savings", desc: "Click through verified links to claim the deal instantly. No fees, no catch — just pure savings." },
  ];

  return (
    <section className="py-24" style={{ background: "#fff", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-3" style={{ color: "#0a0a0a" }}>How It Works</h2>
          <p className="text-base max-w-md mx-auto" style={{ color: "rgba(0,0,0,0.45)" }}>Three steps to never paying full price again.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="rounded-2xl p-8"
              style={{ background: "#f0f0f0", border: "1px solid rgba(0,0,0,0.07)" }}
            >
              <span className="block text-7xl font-black mb-4 leading-none" style={{ color: PINK, opacity: 0.18 }}>{step.num}</span>
              <h3 className="text-xl font-bold mb-3" style={{ color: "#0a0a0a" }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(0,0,0,0.5)" }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section className="py-24" style={{ background: "#f0f0f0", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: PINK }}>Our Story</span>
          <h2 className="text-4xl md:text-5xl font-black mt-2" style={{ color: "#0a0a0a" }}>Meet the Founder</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <div className="relative w-72 md:w-96 mx-auto lg:mx-0">
              <div className="rounded-3xl overflow-hidden" style={{ border: `2px solid rgba(255,45,120,0.25)`, boxShadow: "0 16px 48px rgba(0,0,0,0.12)" }}>
                <img src="/assets/founder.jpeg" alt="The Yanik - Founder of Salelooterz" className="w-full h-auto block" style={{ aspectRatio: "3/4", objectFit: "cover", objectPosition: "top" }} />
              </div>
              <div
                className="absolute -bottom-4 -right-4 rounded-2xl px-5 py-3 shadow-lg"
                style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)" }}
              >
                <p className="font-black text-base" style={{ color: "#0a0a0a" }}>The Yanik</p>
                <p className="text-xs font-semibold" style={{ color: PINK }}>Founder, Salelooterz</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <blockquote className="text-3xl md:text-4xl font-black leading-tight mb-8 pl-5" style={{ borderLeft: `4px solid ${PINK}`, color: "#0a0a0a" }}>
              "I was tired of overpaying. So I built a community to make sure no one else had to."
            </blockquote>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: "rgba(0,0,0,0.55)" }}>
              <p>Salelooterz was born out of frustration. I used to spend hours comparing prices, hunting coupon codes, and waiting for the right moment to buy. It was exhausting — and I knew I wasn't alone.</p>
              <p>In 2021, I started sharing deals with a small group of friends on Telegram. Within months, thousands had joined, and the community took on a life of its own. Today, Salelooterz is home to millions of smart shoppers across India.</p>
              <p>Our mission has never changed: <strong style={{ color: "#0a0a0a" }}>find the best deals, share them instantly, and help every member save money every single day.</strong></p>
            </div>
            <div className="flex flex-wrap gap-4 mt-10">
              {[{ v: "3+", l: "Years Running" }, { v: "2.63M", l: "Members Helped" }, { v: "₹100Cr+", l: "Saved by Community" }].map((s, i) => (
                <div key={i} className="rounded-xl px-6 py-4 text-center" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)" }}>
                  <p className="text-2xl font-black" style={{ color: i === 2 ? PINK : "#0a0a0a" }}>{s.v}</p>
                  <p className="text-xs font-medium mt-1" style={{ color: "rgba(0,0,0,0.4)" }}>{s.l}</p>
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
    { name: "Priya Sharma", location: "Delhi", text: "I saved ₹12,000 on my laptop because of a deal I found on Salelooterz. Literally the best Telegram channel I've ever joined." },
    { name: "Rahul Verma", location: "Mumbai", text: "The deals are legit and instant. By the time I see a flash sale on social media, Salelooterz has already posted it 2 hours earlier." },
    { name: "Sneha Iyer", location: "Bangalore", text: "I've shared this channel with my entire family. We collectively save thousands every month. Everyone should join!" },
    { name: "Arjun Mehta", location: "Hyderabad", text: "Got a 77% off deal on earbuds that I'd been eyeing for months. The channel posts crazy deals daily." },
    { name: "Divya Nair", location: "Chennai", text: "Best thing about Salelooterz is there's zero spam. Only real deals. Finally a group worth keeping notifications on." },
    { name: "Karan Patel", location: "Ahmedabad", text: "Joined 6 months ago and I've already saved over ₹25,000. This community has completely changed how I shop online." },
  ];

  return (
    <section className="py-24" style={{ background: "#fff", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-3" style={{ color: "#0a0a0a" }}>What Members Say</h2>
          <p className="text-base max-w-md mx-auto" style={{ color: "rgba(0,0,0,0.45)" }}>Real stories from real savers in our community.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="rounded-2xl p-6"
              style={{ background: "#f0f0f0", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 24 24" style={{ fill: PINK }}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(0,0,0,0.6)" }}>"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-black shrink-0" style={{ background: `linear-gradient(135deg, ${PINK}, #a855f7)` }}>
                  {r.name[0]}
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: "#0a0a0a" }}>{r.name}</p>
                  <p className="text-xs" style={{ color: "rgba(0,0,0,0.35)" }}>{r.location}</p>
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
  const cats = [
    "Fashion", "Electronics", "Home & Living", "Beauty",
    "Travel", "Food & Dining", "Sports", "Health",
  ];
  const discounts = ["Up to 70%", "Up to 60%", "Up to 55%", "Up to 50%", "Up to 40%", "Up to 50%", "Up to 65%", "Up to 45%"];

  return (
    <section className="py-24" style={{ background: "#f0f0f0", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <h2 className="text-4xl font-black mb-2" style={{ color: "#0a0a0a" }}>Deal Categories</h2>
          <p className="text-sm" style={{ color: "rgba(0,0,0,0.45)" }}>Massive discounts across every department, every day.</p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {cats.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl p-5 group cursor-pointer transition-all hover:shadow-md"
              style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)" }}
            >
              <h3 className="font-bold mb-1.5 group-hover:text-[#ff2d78] transition-colors text-sm" style={{ color: "#0a0a0a" }}>{cat}</h3>
              <span className="text-xs font-semibold" style={{ color: PINK }}>{discounts[i]}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Is Salelooterz completely free to join?", a: "Yes, 100% free. Always has been, always will be. We share deals because we're passionate about helping people save." },
    { q: "How many deals are shared per day?", a: "We typically share 500+ deals per day across Telegram and WhatsApp — spanning electronics, fashion, food, travel, home goods, and more." },
    { q: "Will I get spammed with unnecessary messages?", a: "Absolutely not. Every message is a verified deal with a real discount. No promotional fluff, no sponsored junk." },
    { q: "Are the deals only for India?", a: "Primarily yes — most deals are from Amazon India, Flipkart, Myntra, Nykaa, Meesho, and others. We occasionally share international deals too." },
    { q: "How do I claim a deal once I see it?", a: "Each deal post includes a direct link. Just click it and you'll be taken straight to the checkout or coupon page. No extra steps." },
    { q: "Can I submit deals I've found myself?", a: "Yes! Message our admin on Telegram. We verify and post the best community-submitted deals too." },
  ];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24" style={{ background: "#fff", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
      <div className="max-w-3xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-3" style={{ color: "#0a0a0a" }}>Frequently Asked Questions</h2>
          <p className="text-base" style={{ color: "rgba(0,0,0,0.45)" }}>Everything you need to know about Salelooterz.</p>
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
              style={{ border: "1px solid rgba(0,0,0,0.08)" }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors hover:bg-black/[0.02]"
                style={{ background: open === i ? "#f9f9f9" : "#fff" }}
              >
                <span className="font-semibold text-sm pr-4" style={{ color: "#0a0a0a" }}>{faq.q}</span>
                <ChevronDown
                  className="w-4 h-4 shrink-0 transition-transform duration-300"
                  style={{ color: PINK, transform: open === i ? "rotate(180deg)" : "rotate(0deg)" }}
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
                    style={{ background: "#f9f9f9" }}
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "rgba(0,0,0,0.5)" }}>{faq.a}</p>
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
    <section className="py-24" style={{ background: "#f0f0f0", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-12 md:p-20 text-center"
          style={{ background: "#0a0a0a" }}
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-5 leading-tight">
            Ready to Start Looting?
          </h2>
          <p className="text-base mb-10 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
            Join millions of smart shoppers who never pay full price. Free to join. Deals every day. No spam.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-sm transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: PINK }}
            >
              <TelegramIcon />
              Join on Telegram
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-all hover:bg-white/10 active:scale-95"
              style={{ border: "1.5px solid rgba(255,255,255,0.25)", color: "#fff" }}
            >
              <WhatsAppIcon />
              Join on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#fff", borderTop: "1px solid rgba(0,0,0,0.07)" }} className="py-10">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <img src="/assets/logo.jpg" alt="Salelooterz" className="h-9 w-auto rounded-xl" />
        <div className="flex flex-wrap justify-center gap-6 text-sm" style={{ color: "rgba(0,0,0,0.4)" }}>
          {["Privacy Policy", "Terms", "Contact", "About"].map(link => (
            <a key={link} href="#" className="hover:text-black transition-colors">{link}</a>
          ))}
        </div>
        <p className="text-sm whitespace-nowrap" style={{ color: "rgba(0,0,0,0.3)" }}>
          © {new Date().getFullYear()} Salelooterz
        </p>
      </div>
    </footer>
  );
}
