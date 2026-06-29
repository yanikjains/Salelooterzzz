import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const TELEGRAM_URL = "https://t.me/salelooterz";
const WHATSAPP_URL = "https://whatsapp.com/channel/salelooterz";

// ── Design tokens ──────────────────────────────────────────────────────────────
const BG       = "#111111";
const CARD     = "#1c1c1c";
const CARD2    = "#222222";
const PINK     = "#ff1f7e";
const TEXT     = "#ffffff";
const TEXT2    = "rgba(255,255,255,0.45)";
const BORDER   = "rgba(255,255,255,0.08)";

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
  useEffect(() => { const t = setTimeout(onDone, 3200); return () => clearTimeout(t); }, [onDone]);
  return (
    <motion.div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none"
      style={{ background: BG }}
      exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}>
      <div className="flex flex-col items-center gap-5">
        <MaskedReveal delay={0.1}>
          <img src="/assets/logo.jpg" alt="Salelooterz" className="h-16 w-16 rounded-2xl object-contain" />
        </MaskedReveal>
        <MaskedReveal delay={0.28}>
          <h1 className="font-black italic uppercase leading-none"
            style={{ fontSize: "clamp(3.5rem, 12vw, 9rem)", color: TEXT, letterSpacing: "-0.035em" }}>
            Salelooterz
          </h1>
        </MaskedReveal>
        <div style={{ width: "100%", overflow: "hidden", height: 2 }}>
          <motion.div style={{ height: "100%", background: PINK, transformOrigin: "left" }}
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.9, ease: EXPO_EASE }} />
        </div>
        <MaskedReveal delay={1.1}>
          <p className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: TEXT2, letterSpacing: "0.22em" }}>
            India's #1 Deal Alert Community
          </p>
        </MaskedReveal>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: BORDER }}>
        <motion.div className="h-full" style={{ background: PINK }}
          initial={{ width: "0%" }} animate={{ width: "100%" }}
          transition={{ delay: 0.4, duration: 2.4, ease: "linear" }} />
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
      <motion.div style={{ background: BG, minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}
        initial={{ opacity: 0 }} animate={{ opacity: splashDone ? 1 : 0 }} transition={{ duration: 0.5 }}>
        <Navbar />
        <Hero />
        <Stats />
        <FAQ />
        <FinalCTA />
        <Footer />
      </motion.div>
    </>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <motion.header initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EXPO }}
      className="flex items-center justify-between px-6 md:px-10 py-5">
      <a href="#" className="flex items-center gap-2.5 no-underline">
        <img src="/assets/logo.jpg" alt="Salelooterz" className="h-8 w-8 rounded-xl object-contain" />
        <span className="font-black text-lg" style={{ color: PINK, letterSpacing: "-0.03em" }}>SaleLooterz</span>
      </a>
      <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:opacity-85 active:scale-95"
        style={{ background: CARD2, border: `1px solid ${BORDER}` }}>
        <TelegramIcon size={14} /> Join Telegram
      </a>
    </motion.header>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────────
const DEAL_IMAGES = [
  { src: "/assets/product1.png", label: "37% OFF",  labelBg: PINK },
  { src: "/assets/hero.png",     label: "⚡ Flash",  labelBg: "#7c3aed" },
  { src: "/assets/product3.png", label: "🔥 Hot",   labelBg: "#ea580c" },
  { src: "/assets/product2.png", label: "Up to 80% OFF", labelBg: PINK },
  { src: "/assets/product1.png", label: "Deal Alert", labelBg: "#059669" },
  { src: "/assets/product3.png", label: "Loot Price", labelBg: "#7c3aed" },
];

function Hero() {
  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden px-6 md:px-10">
      {/* Decorative background glow */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div style={{
          position: "absolute", top: "10%", left: "5%",
          width: 500, height: 500, borderRadius: "50%",
          background: `radial-gradient(circle, ${PINK}18 0%, transparent 70%)`,
        }} />
        <div style={{
          position: "absolute", top: "30%", right: "10%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
        }} />
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        {/* Decorative asterisks */}
        <span className="absolute text-3xl font-black select-none"
          style={{ top: "22%", left: "18%", color: PINK, opacity: 0.7 }}>✦</span>
        <span className="absolute text-2xl font-black select-none"
          style={{ top: "55%", right: "28%", color: "#7c3aed", opacity: 0.6 }}>✦</span>
        <span className="absolute text-lg font-black select-none"
          style={{ bottom: "18%", left: "32%", color: "rgba(255,255,255,0.15)" }}>•</span>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.85, ease: EXPO }}
            className="font-black leading-none mb-6"
            style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", color: TEXT, letterSpacing: "-0.04em" }}>
            Stop Overpaying.<br />
            <span style={{ color: PINK }}>Start Saving Big.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="text-base leading-relaxed mb-10 max-w-sm"
            style={{ color: TEXT2, fontFamily: "'Courier New', monospace" }}>
            Join 2.63M+ shoppers getting instant alerts on the best deals. Flash sales, price drops, and
            crazy discounts delivered to your phone
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap gap-3">
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: PINK }}>
              <TelegramIcon size={15} /> Telegram
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:bg-white/10 active:scale-95"
              style={{ background: CARD2, border: `1px solid ${BORDER}` }}>
              <WhatsAppIcon size={15} /> WhatsApp
            </a>
          </motion.div>
        </div>

        {/* Right: image grid */}
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: EXPO }}
          className="hidden lg:grid grid-cols-3 gap-3"
          style={{ transform: "perspective(900px) rotateY(-4deg) rotateX(3deg)" }}>
          {DEAL_IMAGES.map((img, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: i % 2 === 0 ? 0 : 20 }}
              transition={{ delay: 0.3 + i * 0.07, duration: 0.7, ease: EXPO }}
              className="relative rounded-2xl overflow-hidden"
              style={{ aspectRatio: "3/4", background: CARD }}>
              <img src={img.src} alt="Deal" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)" }} />
              <span className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-full text-[10px] font-bold text-white"
                style={{ background: img.labelBg }}>
                {img.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Stats ──────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "2.63M+",  label: "Active Members",      sub: "Across Telegram & WhatsApp" },
  { value: "330K+",   label: "Telegram Subscribers", sub: "Growing every day" },
  { value: "500+",    label: "Deals Per Day",         sub: "Across all categories" },
  { value: "₹100Cr+", label: "Community Savings",    sub: "Estimated total saved" },
];

function Stats() {
  return (
    <section className="px-6 md:px-10 pb-20">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6, ease: EXPO }}
            className="rounded-2xl p-7"
            style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <p className="font-black mb-1" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", color: TEXT, letterSpacing: "-0.04em" }}>{s.value}</p>
            <p className="font-bold text-sm mb-1" style={{ color: TEXT }}>{s.label}</p>
            <p className="text-xs" style={{ color: TEXT2 }}>{s.sub}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ── FAQ ─────────────────────────────────────────────────────────────────────────
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
    <section className="px-6 md:px-10 pb-20">
      <div className="max-w-3xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, ease: EXPO }}
          className="font-black mb-8 text-center"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: TEXT, letterSpacing: "-0.035em" }}>
          Frequently Asked<br /><span style={{ color: PINK }}>Questions</span>
        </motion.h2>
        <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${BORDER}` }}>
          {FAQS.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-7 py-5 text-left transition-colors hover:bg-white/[0.03]"
                style={{ borderBottom: i < FAQS.length - 1 ? `1px solid ${BORDER}` : "none", background: CARD }}>
                <span className="font-semibold text-sm pr-6" style={{ color: TEXT }}>{faq.q}</span>
                <ChevronDown className="w-4 h-4 shrink-0 transition-transform duration-300"
                  style={{ color: PINK, transform: open === i ? "rotate(180deg)" : "rotate(0deg)" }} />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div key="body" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}
                    className="overflow-hidden" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
                    <p className="px-7 pb-5 pt-1 text-sm leading-relaxed" style={{ color: TEXT2 }}>{faq.a}</p>
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
  return (
    <section className="px-6 md:px-10 pb-20">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: EXPO }}
          className="rounded-3xl p-14 text-center relative overflow-hidden"
          style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse 60% 80% at 50% 0%, ${PINK}20 0%, transparent 65%)` }} />
          <div className="relative z-10">
            <p className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-6"
              style={{ background: `${PINK}20`, color: PINK }}>
              Join 2.63M+ smart shoppers
            </p>
            <h2 className="font-black text-white mb-4 leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.035em" }}>
              Ready to start saving?
            </h2>
            <p className="text-base mb-10 max-w-sm mx-auto" style={{ color: TEXT2 }}>
              Free to join. Deals every day. No spam. No catch.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white hover:opacity-90 transition-all active:scale-95"
                style={{ background: PINK }}>
                <TelegramIcon size={14} /> Join Telegram — Free
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white transition-all active:scale-95"
                style={{ background: CARD2, border: `1px solid ${BORDER}` }}>
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
    <footer className="px-6 md:px-10 py-8" style={{ borderTop: `1px solid ${BORDER}` }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <img src="/assets/logo.jpg" alt="Salelooterz" className="h-7 w-7 rounded-xl object-contain" />
          <span className="font-black text-base" style={{ color: PINK, letterSpacing: "-0.03em" }}>SaleLooterz</span>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-xs" style={{ color: TEXT2 }}>
          {["Privacy Policy", "Terms", "Contact", "About"].map(l => (
            <a key={l} href="#" className="transition-colors hover:text-white">{l}</a>
          ))}
        </div>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>© {new Date().getFullYear()} Salelooterz</p>
      </div>
    </footer>
  );
}
