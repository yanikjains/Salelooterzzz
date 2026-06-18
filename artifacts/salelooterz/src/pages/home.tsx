import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";

const TELEGRAM_URL = "https://t.me/salelooterz";
const WHATSAPP_URL = "https://whatsapp.com/channel/salelooterz";

const BG     = "#fafaf9";
const BG2    = "#f3f2ef";
const TEXT   = "#0a0a0a";
const TEXT2  = "#6b7280";
const FIRE   = "#ea580c";
const GREEN  = "#16a34a";
const BORDER = "rgba(0,0,0,0.08)";

// ─── Icons ────────────────────────────────────────────────────────────────────

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

// ─── Splash Screen ────────────────────────────────────────────────────────────

const SPLASH_BADGES = [
  { text: "🔥 50% OFF",    color: FIRE,      x: "-40%", y: "-32%", rotate: -18, delay: 0.5  },
  { text: "⚡ Flash Sale", color: "#0284c7", x: "40%",  y: "-28%", rotate: 14,  delay: 0.65 },
  { text: "💸 ₹999 Deal",  color: GREEN,     x: "-44%", y: "22%",  rotate: -10, delay: 0.8  },
  { text: "🛍️ Free Ship",  color: "#7c3aed", x: "42%",  y: "24%",  rotate: 12,  delay: 0.9  },
  { text: "🎯 Cashback",   color: "#db2777", x: "0%",   y: "-52%", rotate: -4,  delay: 0.55 },
  { text: "🏷️ Price Drop", color: "#0891b2", x: "-8%",  y: "50%",  rotate: 6,   delay: 0.75 },
];

function SplashScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, [onDone]);
  const letters = "Salelooterz".split("");
  return (
    <motion.div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ background: "#0a0a0a" }}
      exit={{ y: "-100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}>
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 70% 55% at 50% 50%, rgba(234,88,12,0.15) 0%, transparent 70%)` }} />
      <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
      {[...Array(14)].map((_, i) => (
        <motion.div key={i} className="absolute rounded-full"
          style={{ width: Math.random() * 4 + 2, height: Math.random() * 4 + 2, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, background: [FIRE, GREEN, "#f59e0b", "#7c3aed"][i % 4], opacity: 0.5 }}
          animate={{ y: [0, -28, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 1.5, ease: "easeInOut" }} />
      ))}
      <div className="relative flex flex-col items-center select-none">
        <motion.div initial={{ scale: 0, rotate: -20, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.1 }} className="mb-5 relative">
          <motion.div className="absolute inset-0 rounded-2xl blur-2xl" style={{ background: FIRE, opacity: 0.5 }}
            animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0.2, 0.5] }} transition={{ duration: 1.8, repeat: Infinity }} />
          <img src="/assets/logo.jpg" alt="Salelooterz" className="relative h-24 w-24 rounded-2xl object-contain shadow-2xl" />
        </motion.div>
        <div className="flex items-center gap-[2px] mb-3">
          {letters.map((l, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 30, scale: 0.5 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.35 + i * 0.055 }}
              className="text-5xl md:text-7xl font-black leading-none"
              style={{ background: `linear-gradient(135deg, #fff 0%, ${FIRE} 55%, #f59e0b 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontStyle: "italic", letterSpacing: "-0.03em" }}>
              {l}
            </motion.span>
          ))}
        </div>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.5 }}
          className="text-sm font-medium uppercase" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em" }}>
          India's #1 Deal Alert Community
        </motion.p>
        {SPLASH_BADGES.map((b, i) => (
          <motion.div key={i} className="absolute px-3 py-1.5 rounded-full text-white text-xs font-bold pointer-events-none whitespace-nowrap"
            style={{ background: b.color, left: `calc(50% + ${b.x})`, top: `calc(50% + ${b.y})`, transform: `translate(-50%, -50%) rotate(${b.rotate}deg)`, boxShadow: `0 4px 20px ${b.color}55` }}
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 16, delay: b.delay }}>
            {b.text}
          </motion.div>
        ))}
        <motion.div className="mt-10 h-px rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)", width: 180 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
          <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${FIRE}, #f59e0b)` }}
            initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ delay: 1.5, duration: 1.3, ease: "easeInOut" }} />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [splashDone, setSplashDone] = useState(false);
  return (
    <>
      <AnimatePresence>{!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}</AnimatePresence>
      <motion.div style={{ background: BG, color: TEXT, minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}
        initial={{ opacity: 0 }} animate={{ opacity: splashDone ? 1 : 0 }} transition={{ duration: 0.6 }}>
        <AnnouncementBar />
        <Navbar />
        <Hero />
        <HowItWorks />
        <About />
        <Testimonials />
        <FAQ />
        <FinalCTA />
        <Footer />
      </motion.div>
    </>
  );
}

// ─── Announcement Bar ─────────────────────────────────────────────────────────

function AnnouncementBar() {
  return (
    <div className="flex items-center justify-center gap-8 px-6 py-2 text-xs font-medium" style={{ background: TEXT, color: "rgba(255,255,255,0.7)" }}>
      <span>Free to join · No spam, ever</span>
      <span className="hidden sm:block" style={{ color: "rgba(255,255,255,0.25)" }}>|</span>
      <span className="hidden sm:block">2.63M+ members saving daily</span>
      <span className="hidden md:block" style={{ color: "rgba(255,255,255,0.25)" }}>|</span>
      <span className="hidden md:block">500+ deals posted every day</span>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className="sticky top-0 z-50 transition-all duration-300"
      style={{ background: scrolled ? "rgba(250,250,249,0.96)" : BG, backdropFilter: "blur(12px)", borderBottom: `1px solid ${scrolled ? BORDER : "transparent"}` }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between gap-6">
        <a href="#" className="flex items-center gap-2.5 no-underline">
          <img src="/assets/logo.jpg" alt="Salelooterz" className="h-8 w-8 rounded-lg object-contain" />
          <span className="font-black text-xl" style={{ color: TEXT, letterSpacing: "-0.04em", fontStyle: "italic" }}>Salelooterz</span>
        </a>
        <div className="flex items-center gap-3">
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: TEXT }}>
            <TelegramIcon /> Join Telegram
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all hover:bg-black/5 active:scale-95"
            style={{ border: `1px solid ${BORDER}`, color: TEXT }}>
            <WhatsAppIcon /> WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-10 pt-10 pb-6">
      <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-center">

        {/* Left */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6"
            style={{ background: `${FIRE}12`, color: FIRE, border: `1px solid ${FIRE}25` }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse" style={{ background: FIRE }} />
            Live deals updated every hour
          </div>

          <h1 className="font-black uppercase leading-[0.95] mb-6"
            style={{ fontSize: "clamp(2.8rem, 5.5vw, 5.2rem)", color: TEXT, letterSpacing: "-0.02em" }}>
            YOUR ULTIMATE{" "}
            <span style={{ color: FIRE }}>✦</span>{" "}
            DEAL{" "}
            <span style={{ color: FIRE }}>✦</span>
            <br />ALERT COMMUNITY
          </h1>

          <p className="text-base leading-relaxed mb-8 max-w-sm" style={{ color: TEXT2 }}>
            Instant deal alerts, flash sales, and massive discounts delivered straight to your phone. Join 2.63M+ smart shoppers.
          </p>

          <div className="flex flex-wrap gap-3">
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: TEXT }}>
              <TelegramIcon size={15} /> Join on Telegram
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold transition-all hover:bg-black/5 active:scale-95"
              style={{ border: `1.5px solid ${BORDER}`, color: TEXT }}>
              <WhatsAppIcon size={15} /> Join on WhatsApp
            </a>
          </div>

          <div className="flex gap-8 mt-10 pt-8" style={{ borderTop: `1px solid ${BORDER}` }}>
            {[
              { v: "2.63M+", l: "Members" },
              { v: "80%",    l: "Avg Discount" },
              { v: "4.9★",   l: "Community Rating" },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-2xl font-black" style={{ color: TEXT }}>{s.v}</p>
                <p className="text-xs font-medium mt-0.5" style={{ color: TEXT2 }}>{s.l}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: image collage */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
          className="grid grid-cols-2 gap-3">
          <div className="col-span-1 row-span-2 relative rounded-2xl overflow-hidden" style={{ aspectRatio: "3/4", background: BG2 }}>
            <img src="/assets/product1.png" alt="Deal" className="w-full h-full object-cover" />
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9 }}
              className="absolute top-4 right-4 px-3 py-2 rounded-xl text-xs shadow-lg"
              style={{ background: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}>
              <div className="flex items-center gap-1.5">
                <span className="text-base">🤖</span>
                <div>
                  <p className="font-black text-xs" style={{ color: TEXT }}>Deal Finder</p>
                  <p className="text-[10px]" style={{ color: TEXT2 }}>AI-curated picks</p>
                </div>
              </div>
            </motion.div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="px-3 py-2 rounded-xl text-xs font-bold backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.92)", color: TEXT }}>
                <span style={{ color: FIRE }}>37% OFF</span> · Sony WH-1000XM5
              </div>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "1/1", background: BG2 }}>
            <img src="/assets/product3.png" alt="Deal" className="w-full h-full object-cover" />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white" style={{ background: GREEN }}>🔥 Hot Deal</div>
          </div>
          <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "1/1", background: BG2 }}>
            <img src="/assets/hero.png" alt="Deal" className="w-full h-full object-cover" />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white" style={{ background: "#7c3aed" }}>⚡ Flash Sale</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    { num: "01", icon: "📲", title: "Join Our Channel",   desc: "Click Telegram or WhatsApp to join instantly. It's completely free, forever." },
    { num: "02", icon: "⚡", title: "Get Instant Alerts", desc: "Flash sales and price drops hit your phone the moment they go live." },
    { num: "03", icon: "🎯", title: "Loot the Savings",   desc: "Click the verified link, claim the deal. No fees, no catch." },
  ];

  return (
    <section style={{ background: BG2, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }} className="py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: FIRE }}>Simple & free</p>
          <h2 className="text-3xl md:text-5xl font-black uppercase" style={{ color: TEXT, letterSpacing: "-0.02em" }}>
            How It Works <span style={{ color: FIRE }}>✦</span>
          </h2>
          <p className="text-base mt-3 max-w-sm" style={{ color: TEXT2 }}>Three steps to never paying full price again.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }} whileHover={{ y: -4 }}
              className="rounded-2xl p-8" style={{ background: BG, border: `1px solid ${BORDER}` }}>
              <div className="text-3xl mb-4">{step.icon}</div>
              <span className="block text-6xl font-black mb-3 leading-none" style={{ color: TEXT, opacity: 0.06 }}>{step.num}</span>
              <h3 className="text-lg font-black mb-2 uppercase" style={{ color: TEXT, letterSpacing: "-0.02em" }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: TEXT2 }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About / Founder ──────────────────────────────────────────────────────────

function About() {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-10 py-24">
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: FIRE }}>Our Story</p>
        <h2 className="text-3xl md:text-5xl font-black uppercase" style={{ color: TEXT, letterSpacing: "-0.02em" }}>
          Meet the Founder <span style={{ color: FIRE }}>✦</span>
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
          <div className="relative w-72 md:w-96 mx-auto lg:mx-0">
            <div className="rounded-3xl overflow-hidden" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.10)" }}>
              <img src="/assets/founder.jpeg" alt="The Yanik – Founder"
                className="w-full block" style={{ aspectRatio: "3/4", objectFit: "cover", objectPosition: "top" }} />
            </div>
            <div className="absolute -bottom-4 -right-4 rounded-2xl px-5 py-3 shadow-lg"
              style={{ background: "#fff", border: `1px solid ${BORDER}` }}>
              <p className="font-black text-base" style={{ color: TEXT }}>The Yanik</p>
              <p className="text-xs font-semibold" style={{ color: FIRE }}>Founder, Salelooterz</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <blockquote className="text-2xl md:text-3xl font-black leading-tight mb-8 pl-5 uppercase"
            style={{ borderLeft: `4px solid ${FIRE}`, color: TEXT, letterSpacing: "-0.02em" }}>
            "I was tired of overpaying. So I built a community to make sure no one else had to."
          </blockquote>
          <div className="space-y-4 text-sm leading-relaxed" style={{ color: TEXT2 }}>
            <p>Salelooterz was born out of frustration. I used to spend hours comparing prices, hunting coupon codes, and waiting for the right moment to buy. It was exhausting — and I knew I wasn't alone.</p>
            <p>In 2021, I started sharing deals with a small group of friends on Telegram. Within months, thousands had joined, and the community took on a life of its own.</p>
            <p>Our mission: <strong style={{ color: TEXT }}>find the best deals, share them instantly, and help every member save money every single day.</strong></p>
          </div>
          <div className="flex flex-wrap gap-4 mt-10">
            {[{ v: "3+", l: "Years Running" }, { v: "2.63M", l: "Members Helped" }, { v: "₹100Cr+", l: "Community Savings" }].map((s, i) => (
              <div key={i} className="rounded-xl px-6 py-4 text-center" style={{ background: BG2, border: `1px solid ${BORDER}` }}>
                <p className="text-2xl font-black" style={{ color: i === 2 ? FIRE : TEXT }}>{s.v}</p>
                <p className="text-xs font-medium mt-1" style={{ color: TEXT2 }}>{s.l}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-8">
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: TEXT }}>
              <TelegramIcon size={14} /> Join Telegram
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold transition-all hover:bg-black/5 active:scale-95"
              style={{ border: `1.5px solid ${BORDER}`, color: TEXT }}>
              <WhatsAppIcon size={14} /> WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function Testimonials() {
  const reviews = [
    { name: "Priya Sharma",  location: "Delhi",     text: "I saved ₹12,000 on my laptop because of a deal on Salelooterz. Literally the best Telegram channel I've ever joined." },
    { name: "Rahul Verma",   location: "Mumbai",    text: "The deals are legit and instant. By the time I see a flash sale elsewhere, Salelooterz posted it 2 hours earlier." },
    { name: "Sneha Iyer",    location: "Bangalore", text: "I've shared this channel with my entire family. We collectively save thousands every month." },
    { name: "Arjun Mehta",   location: "Hyderabad", text: "Got a 77% off deal on earbuds I'd been eyeing for months. The channel posts crazy deals daily." },
    { name: "Divya Nair",    location: "Chennai",   text: "Best thing — zero spam. Only real deals. Finally a group worth keeping notifications on." },
    { name: "Karan Patel",   location: "Ahmedabad", text: "Joined 6 months ago and saved over ₹25,000. This community completely changed how I shop online." },
  ];

  return (
    <section style={{ background: BG2, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }} className="py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: FIRE }}>Real savings</p>
          <h2 className="text-3xl md:text-5xl font-black uppercase" style={{ color: TEXT, letterSpacing: "-0.02em" }}>
            What Members Say <span style={{ color: FIRE }}>✦</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.07 }} whileHover={{ y: -4 }}
              className="rounded-2xl p-6" style={{ background: BG, border: `1px solid ${BORDER}` }}>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} width="12" height="12" viewBox="0 0 24 24" style={{ fill: FIRE }}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: TEXT2 }}>"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0"
                  style={{ background: TEXT }}>
                  {r.name[0]}
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: TEXT }}>{r.name}</p>
                  <p className="text-xs" style={{ color: TEXT2 }}>{r.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQ() {
  const faqs = [
    { q: "Is Salelooterz completely free to join?",      a: "Yes, 100% free. Always has been, always will be. We share deals because we're passionate about helping people save." },
    { q: "How many deals are shared per day?",            a: "We typically share 500+ deals per day across Telegram and WhatsApp — electronics, fashion, food, travel, home goods, and more." },
    { q: "Will I get spammed with unnecessary messages?", a: "Absolutely not. Every message is a verified deal with a real discount. No promotional fluff, no sponsored junk." },
    { q: "Are the deals only for India?",                 a: "Primarily yes — most deals are from Amazon India, Flipkart, Myntra, Nykaa, Meesho, and others. We occasionally share international deals too." },
    { q: "How do I claim a deal once I see it?",          a: "Each deal post includes a direct link. Just click it and you'll be taken straight to the checkout or coupon page." },
    { q: "Can I submit deals I've found myself?",         a: "Yes! Message our admin on Telegram. We verify and post the best community-submitted deals too." },
  ];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="max-w-6xl mx-auto px-6 md:px-10 py-20">
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: FIRE }}>Got questions?</p>
        <h2 className="text-3xl md:text-5xl font-black uppercase" style={{ color: TEXT, letterSpacing: "-0.02em" }}>
          Frequently Asked <span style={{ color: FIRE }}>✦</span>
        </h2>
      </motion.div>

      <div className="max-w-3xl space-y-2">
        {faqs.map((faq, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.05 }} className="rounded-2xl overflow-hidden"
            style={{ border: `1px solid ${open === i ? `${FIRE}40` : BORDER}`, transition: "border-color 0.2s" }}>
            <button onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-black/[0.015] transition-colors"
              style={{ background: open === i ? "#fff" : BG }}>
              <span className="font-semibold text-sm pr-4" style={{ color: TEXT }}>{faq.q}</span>
              <ChevronDown className="w-4 h-4 shrink-0 transition-transform duration-300"
                style={{ color: FIRE, transform: open === i ? "rotate(180deg)" : "rotate(0deg)" }} />
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div key="c" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}
                  className="overflow-hidden" style={{ background: "#fff", borderTop: `1px solid ${BORDER}` }}>
                  <p className="px-6 pb-5 pt-4 text-sm leading-relaxed" style={{ color: TEXT2 }}>{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────

function FinalCTA() {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-10 pb-20">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="rounded-3xl p-12 md:p-20 text-center relative overflow-hidden"
        style={{ background: TEXT }}>
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 70% 60% at 50% 50%, rgba(234,88,12,0.15) 0%, transparent 70%)` }} />
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>Join the community</p>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-5 leading-tight uppercase" style={{ letterSpacing: "-0.03em" }}>
            Ready to Start <span style={{ color: FIRE }}>✦</span><br />Looting?
          </h2>
          <p className="text-base mb-10 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>
            Join millions of smart shoppers who never pay full price. Free to join. Deals every day. No spam.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: FIRE, boxShadow: `0 0 40px ${FIRE}50` }}>
              <TelegramIcon size={15} /> Join on Telegram
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm text-white transition-all hover:bg-white/10 active:scale-95"
              style={{ border: "1.5px solid rgba(255,255,255,0.2)" }}>
              <WhatsAppIcon size={15} /> Join on WhatsApp
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ background: BG2, borderTop: `1px solid ${BORDER}` }} className="py-10">
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <img src="/assets/logo.jpg" alt="Salelooterz" className="h-8 w-8 rounded-lg object-contain" />
          <span className="font-black italic text-xl" style={{ color: TEXT, letterSpacing: "-0.04em" }}>Salelooterz</span>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm" style={{ color: TEXT2 }}>
          {["Privacy Policy", "Terms", "Contact", "About"].map(link => (
            <a key={link} href="#" className="hover:text-black transition-colors">{link}</a>
          ))}
        </div>
        <p className="text-sm whitespace-nowrap" style={{ color: "rgba(107,114,128,0.45)" }}>
          © {new Date().getFullYear()} Salelooterz
        </p>
      </div>
    </footer>
  );
}
