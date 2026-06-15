import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const TELEGRAM_URL = "https://t.me/salelooterz";
const WHATSAPP_URL = "https://whatsapp.com/channel/salelooterz";

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0" aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden font-sans">
      <Navbar />
      <Hero />
      <TrustBar />
      <Stats />
      <FeaturedDeals />
      <HowItWorks />
      <Founder />
      <Testimonials />
      <Categories />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
      <motion.a
        href="#"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-black tracking-tight no-underline"
      >
        <span style={{ color: "#ff2d78" }}>Sale</span>
        <span className="text-white">looter</span>
        <span style={{ color: "#ff2d78" }}>Z</span>
      </motion.a>

      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/50">
        {["Deals", "How It Works", "About", "FAQ"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
            className="hover:text-white transition-colors"
          >
            {item}
          </a>
        ))}
      </nav>

      <motion.a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 border border-white/30 hover:border-white/60 text-white rounded-full px-5 py-2 text-sm font-semibold transition-all hover:bg-white/5"
      >
        <TelegramIcon />
        Join Telegram
      </motion.a>
    </header>
  );
}

function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="w-8 h-8 mb-8 opacity-60">
            <svg viewBox="0 0 32 32" fill="none">
              <path d="M16 2C16 2 10 8 10 16C10 20 13 24 16 24C19 24 22 20 22 16C22 8 16 2 16 2Z" fill="#7c3aed" opacity="0.7" />
              <path d="M16 8C16 8 20 14 20 18C20 20.2 18.2 22 16 22C13.8 22 12 20.2 12 18C12 14 16 8 16 8Z" fill="#a855f7" opacity="0.5" />
            </svg>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-6 text-white">
            Stop Overpaying.<br />
            Start Saving Big.
          </h1>

          <p className="text-base md:text-lg text-white/50 max-w-md mb-10 leading-relaxed">
            Join 2.63M+ shoppers getting instant alerts on the best deals. Flash sales, price drops, and crazy discounts delivered to your phone.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-white text-base transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: "#ff2d78" }}
            >
              <TelegramIcon />
              Telegram
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-white text-base border border-white/30 transition-all hover:bg-white/5 active:scale-95"
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="relative hidden lg:flex items-center justify-center"
          style={{ height: 520 }}
        >
          <DealCardMosaic />
        </motion.div>
      </div>
    </section>
  );
}

function DealCardMosaic() {
  const cards = [
    { label: "MEN'S CLOTHING", sub: "UP TO 45% OFF", bg: "#f5f0eb", textColor: "#111", accent: "#e63946", img: "/assets/product1.png", rotate: -8, top: "8%", left: "2%", width: 180 },
    { label: "MEN'S WATCH", sub: "94% SALE", bg: "#f9f3e8", textColor: "#111", accent: "#c9a84c", img: "/assets/product3.png", rotate: 5, top: "0%", left: "32%", width: 165 },
    { label: "ELECTRONICS", sub: "UP TO 60% OFF", bg: "#101014", textColor: "#fff", accent: "#ff6b35", img: "/assets/product2.png", rotate: -4, top: "5%", left: "60%", width: 158 },
    { label: "FLASH DEAL", sub: "128GB STORAGE", bg: "#12121c", textColor: "#fff", accent: "#e040fb", img: "/assets/hero.png", rotate: 7, top: "45%", left: "15%", width: 170 },
    { label: "BEAUTY", sub: "BUY 2 GET 1 FREE", bg: "#fff0f3", textColor: "#111", accent: "#ff2d78", img: "/assets/product1.png", rotate: -5, top: "50%", left: "50%", width: 162 },
  ];

  return (
    <div className="relative w-full" style={{ height: 520 }}>
      {cards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 * i, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: card.top,
            left: card.left,
            width: card.width,
            zIndex: 5 - i,
            rotate: `${card.rotate}deg`,
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
          }}
        >
          <div style={{ background: card.bg, padding: "12px 12px 16px", borderRadius: 16 }}>
            <div style={{ width: "100%", aspectRatio: "3/4", borderRadius: 10, overflow: "hidden", marginBottom: 10, background: "#ddd" }}>
              <img src={card.img} alt={card.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <p style={{ color: card.textColor, fontWeight: 900, fontSize: 11, letterSpacing: "0.05em", marginBottom: 3 }}>{card.label}</p>
            <p style={{ color: card.accent, fontWeight: 700, fontSize: 10 }}>{card.sub}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function TrustBar() {
  const items = [
    { icon: "shield", label: "100% Free to Join" },
    { icon: "zap", label: "Instant Deal Alerts" },
    { icon: "ban", label: "Zero Spam, Ever" },
    { icon: "users", label: "2.63M+ Members" },
    { icon: "clock", label: "Deals Posted 24/7" },
  ];

  const icons: Record<string, JSX.Element> = {
    shield: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    zap: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
    ban: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M4.93 4.93l14.14 14.14" /></svg>,
    users: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    clock: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
  };

  return (
    <section className="border-y border-white/5 bg-white/[0.015] py-5 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap" style={{ animationDuration: "20s" }}>
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 mx-10 text-sm font-semibold text-white/50 shrink-0">
            <span style={{ color: "#ff2d78" }}>{icons[item.icon]}</span>
            {item.label}
          </span>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: "2.63M+", label: "Active Members" },
    { value: "500+", label: "Deals Posted Daily" },
    { value: "80%", label: "Avg. Discount Found" },
    { value: "4.9/5", label: "Member Rating" },
  ];

  return (
    <section className="py-20 max-w-[1400px] mx-auto px-6 md:px-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-white/8 bg-white/[0.03] p-8 text-center"
          >
            <div className="text-4xl md:text-5xl font-black mb-2" style={{ color: "#ff2d78" }}>
              {s.value}
            </div>
            <div className="text-white/50 text-sm font-medium">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FeaturedDeals() {
  const deals = [
    { store: "Amazon", category: "Electronics", title: "Sony WH-1000XM5 Wireless Headphones", original: "₹29,990", sale: "₹18,990", off: "37%", color: "#ff6b35" },
    { store: "Flipkart", category: "Fashion", title: "Levi's Men's Slim Fit Jeans", original: "₹3,999", sale: "₹1,299", off: "67%", color: "#e040fb" },
    { store: "Myntra", category: "Beauty", title: "Lakme Absolute Skin Gloss Bundle", original: "₹1,800", sale: "₹699", off: "61%", color: "#ff2d78" },
    { store: "Nykaa", category: "Health", title: "Mamaearth Vitamin C Serum Pack", original: "₹999", sale: "₹449", off: "55%", color: "#00d2ff" },
    { store: "Meesho", category: "Home", title: "Saral Home 300 TC Cotton Bedsheet Set", original: "₹1,499", sale: "₹499", off: "66%", color: "#c9a84c" },
    { store: "Amazon", category: "Gadgets", title: "boAt Airdopes 141 Bluetooth Earbuds", original: "₹4,490", sale: "₹999", off: "77%", color: "#ff2d78" },
  ];

  return (
    <section id="deals" className="py-20 border-t border-white/5 bg-white/[0.015]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: "#ff2d78" }} />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: "#ff2d78" }} />
            </span>
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#ff2d78" }}>
              Live from Our Channel
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-3">Featured Deals</h2>
          <p className="text-white/40 text-lg">A glimpse of what our members get every single day.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {deals.map((deal, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 hover:border-white/20 hover:bg-white/[0.05] transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-3 py-1 rounded-full border border-white/10 text-white/50">
                  {deal.category}
                </span>
                <span
                  className="text-sm font-black px-3 py-1 rounded-full"
                  style={{ backgroundColor: deal.color + "22", color: deal.color }}
                >
                  {deal.off} OFF
                </span>
              </div>
              <h3 className="text-white font-bold text-base mb-4 leading-snug group-hover:text-[#ff2d78] transition-colors">
                {deal.title}
              </h3>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white/30 line-through text-sm">{deal.original}</p>
                  <p className="text-2xl font-black text-white">{deal.sale}</p>
                </div>
                <span className="text-xs font-semibold text-white/40 bg-white/5 px-3 py-1.5 rounded-lg">
                  via {deal.store}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/30 text-sm mt-8"
        >
          500+ more deals like these posted every day in our channel.{" "}
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-white/60 transition-colors">
            Join now to see them all.
          </a>
        </motion.p>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { num: "01", title: "Join Our Channel", desc: "Click the Telegram or WhatsApp button to join the Salelooterz community instantly. Free forever.", icon: <TelegramIcon /> },
    { num: "02", title: "Get Instant Alerts", desc: "We post flash sales, price drops, and hidden deals the moment they go live — direct to your phone.", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg> },
    { num: "03", title: "Loot the Savings", desc: "Click through our verified links to claim the deal instantly. No fees, no catch — just pure savings.", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg> },
  ];

  return (
    <section id="how-it-works" className="py-28 max-w-[1400px] mx-auto px-6 md:px-12">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">How It Works</h2>
        <p className="text-white/40 text-lg max-w-md mx-auto">Three steps to never paying full price again.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 relative">
        <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="rounded-2xl border border-white/8 bg-white/[0.03] p-8 text-center flex flex-col items-center"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
              style={{ backgroundColor: "#ff2d78" + "22", color: "#ff2d78" }}
            >
              {step.icon}
            </div>
            <span className="text-5xl font-black mb-4 leading-none" style={{ color: "#ff2d78", opacity: 0.2 }}>{step.num}</span>
            <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
            <p className="text-white/45 leading-relaxed text-sm">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section id="about" className="py-28 border-t border-white/5 bg-white/[0.015]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#ff2d78" }}>
            Our Story
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2">Meet the Founder</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div
              className="w-72 h-72 md:w-96 md:h-96 rounded-3xl mx-auto lg:mx-0 flex items-center justify-center relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #1a0a14, #0f0f1a)" }}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{ background: "radial-gradient(circle at 50% 50%, #ff2d78 0%, transparent 70%)" }}
              />
              <div className="relative z-10 text-center">
                <div
                  className="w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl font-black border-4"
                  style={{ background: "linear-gradient(135deg, #ff2d78, #a855f7)", borderColor: "#ff2d78" + "40" }}
                >
                  S
                </div>
                <p className="text-white font-bold text-lg">Founder & CEO</p>
                <p className="text-white/40 text-sm">Salelooterz</p>
              </div>
            </div>

            <div
              className="absolute -bottom-4 -right-4 lg:right-8 bg-[#111] border border-white/10 rounded-2xl p-4 shadow-xl"
            >
              <p className="text-xs text-white/40 mb-1">Community Started</p>
              <p className="text-white font-black text-lg">2021</p>
              <p className="text-xs" style={{ color: "#ff2d78" }}>3+ years of saving</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <blockquote
              className="text-3xl md:text-4xl font-black text-white leading-tight mb-8 border-l-4 pl-6"
              style={{ borderColor: "#ff2d78" }}
            >
              "I was tired of overpaying. So I built a community to make sure no one else had to."
            </blockquote>

            <div className="space-y-5 text-white/55 text-base leading-relaxed">
              <p>
                Salelooterz was born out of frustration. I used to spend hours every week comparing prices, hunting coupon codes, and waiting for the right moment to buy. It was exhausting — and I knew I wasn't alone.
              </p>
              <p>
                In 2021, I started sharing deals with a small group of friends on Telegram. Within months, thousands of people had joined, and the community took on a life of its own. Today, Salelooterz is home to millions of smart shoppers across India and beyond.
              </p>
              <p>
                Our mission has never changed: <span className="text-white font-semibold">find the best deals, share them instantly, and help every member save money every single day</span>. No fluff, no filler — just pure savings.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-10">
              <div className="rounded-xl border border-white/8 bg-white/[0.03] px-6 py-4 text-center">
                <p className="text-2xl font-black text-white">3+</p>
                <p className="text-white/40 text-xs font-medium mt-1">Years Running</p>
              </div>
              <div className="rounded-xl border border-white/8 bg-white/[0.03] px-6 py-4 text-center">
                <p className="text-2xl font-black text-white">2.63M</p>
                <p className="text-white/40 text-xs font-medium mt-1">Members Helped</p>
              </div>
              <div className="rounded-xl border border-white/8 bg-white/[0.03] px-6 py-4 text-center">
                <p className="text-2xl font-black" style={{ color: "#ff2d78" }}>₹100Cr+</p>
                <p className="text-white/40 text-xs font-medium mt-1">Saved by Community</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { name: "Priya Sharma", location: "Delhi", text: "I saved ₹12,000 on my laptop because of a deal I found on Salelooterz. Literally the best Telegram channel I've ever joined.", stars: 5 },
    { name: "Rahul Verma", location: "Mumbai", text: "The deals are legit and instant. By the time I see a flash sale on social media, Salelooterz has already posted it 2 hours earlier.", stars: 5 },
    { name: "Sneha Iyer", location: "Bangalore", text: "I've shared this channel with my entire family. We collectively save thousands every month. Everyone should join!", stars: 5 },
    { name: "Arjun Mehta", location: "Hyderabad", text: "Got a 77% off deal on earbuds that I'd been eyeing for months. The channel posts crazy deals daily, never disappointed.", stars: 5 },
    { name: "Divya Nair", location: "Chennai", text: "Best thing about Salelooterz is there's zero spam. Only real deals, no noise. Finally a group worth keeping notifications on.", stars: 5 },
    { name: "Karan Patel", location: "Ahmedabad", text: "Joined 6 months ago and I've already saved over ₹25,000. This community has completely changed how I shop online.", stars: 5 },
  ];

  return (
    <section className="py-28 max-w-[1400px] mx-auto px-6 md:px-12">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">What Members Say</h2>
        <p className="text-white/40 text-lg max-w-md mx-auto">Real stories from real savers in our community.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {reviews.map((review, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl border border-white/8 bg-white/[0.03] p-7 hover:border-white/20 transition-all"
          >
            <div className="flex gap-1 mb-4">
              {Array.from({ length: review.stars }).map((_, j) => (
                <svg key={j} className="w-4 h-4" style={{ fill: "#ff2d78" }} viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p className="text-white/65 leading-relaxed text-sm mb-6">"{review.text}"</p>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-black shrink-0"
                style={{ background: "linear-gradient(135deg, #ff2d78, #a855f7)" }}
              >
                {review.name[0]}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{review.name}</p>
                <p className="text-white/35 text-xs">{review.location}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Categories() {
  const cats = [
    { name: "Fashion", discount: "Up to 70%" },
    { name: "Electronics", discount: "Up to 60%" },
    { name: "Home & Living", discount: "Up to 55%" },
    { name: "Beauty", discount: "Up to 50%" },
    { name: "Travel", discount: "Up to 40%" },
    { name: "Food & Dining", discount: "Up to 50%" },
    { name: "Sports", discount: "Up to 65%" },
    { name: "Health", discount: "Up to 45%" },
  ];

  return (
    <section className="py-20 border-t border-white/5 bg-white/[0.015]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <h2 className="text-4xl font-black text-white mb-3">Deal Categories</h2>
          <p className="text-white/40">Massive discounts across every department, every day.</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {cats.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-white/8 bg-white/[0.03] p-5 hover:border-white/20 hover:bg-white/[0.05] transition-all cursor-pointer group"
            >
              <h3 className="font-bold text-white mb-1.5 group-hover:text-[#ff2d78] transition-colors">{cat.name}</h3>
              <span className="text-xs font-semibold" style={{ color: "#ff2d78" }}>{cat.discount}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Is Salelooterz completely free to join?", a: "Yes, 100% free. Always has been, always will be. We make no money from your membership. We share deals because we're passionate about helping people save." },
    { q: "How many deals are shared per day?", a: "We typically share 500+ deals per day across our Telegram and WhatsApp channels. The deals span all categories — electronics, fashion, food, travel, home goods, and more." },
    { q: "Will I get spammed with unnecessary messages?", a: "Absolutely not. Every message we send is a verified deal with a real discount. We have strict quality control — no promotional fluff, no sponsored junk." },
    { q: "Are the deals only for India?", a: "Primarily yes — most deals are from Indian e-commerce platforms like Amazon India, Flipkart, Myntra, Nykaa, Meesho, and others. Occasionally we share international deals too." },
    { q: "How do I claim a deal once I see it?", a: "Each deal post includes a direct link to the product or offer. Just click it and you'll be taken straight to the checkout or coupon page. No extra steps needed." },
    { q: "Can I submit deals I've found myself?", a: "We love community contributions! If you spot an incredible deal, you can message our admin on Telegram. We verify and post the best community-submitted deals too." },
  ];

  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-28 max-w-[1400px] mx-auto px-6 md:px-12">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Frequently Asked Questions</h2>
        <p className="text-white/40 text-lg max-w-md mx-auto">Everything you need to know about Salelooterz.</p>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl border border-white/8 overflow-hidden"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-6 py-5 text-left bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
            >
              <span className="font-semibold text-white pr-4">{faq.q}</span>
              <ChevronDown
                className="w-5 h-5 shrink-0 transition-transform duration-300"
                style={{ color: "#ff2d78", transform: open === i ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-white/50 leading-relaxed text-sm">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden p-12 md:p-20 text-center"
          style={{ background: "linear-gradient(135deg, #1a0a14 0%, #0a0a0a 50%, #0a0a1a 100%)", border: "1px solid rgba(255,45,120,0.2)" }}
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-5 leading-tight">
            Ready to Start Looting?
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
            Join millions of smart shoppers who never pay full price. Free to join. Deals every day. No spam.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-white text-base transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: "#ff2d78" }}
            >
              <TelegramIcon />
              Join on Telegram
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-white text-base border border-white/30 transition-all hover:bg-white/5 active:scale-95"
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
    <footer className="border-t border-white/5 py-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="text-xl font-black">
          <span style={{ color: "#ff2d78" }}>Sale</span>
          <span className="text-white">looter</span>
          <span style={{ color: "#ff2d78" }}>Z</span>
        </span>

        <div className="flex flex-wrap justify-center gap-6 text-white/40 text-sm">
          <a href="#deals" className="hover:text-white transition-colors">Deals</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>

        <p className="text-white/30 text-sm whitespace-nowrap">
          © {new Date().getFullYear()} Salelooterz
        </p>
      </div>
    </footer>
  );
}
