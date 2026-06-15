import { motion } from "framer-motion";

const TELEGRAM_URL = "https://t.me/salelooterz";
const WHATSAPP_URL = "https://whatsapp.com/channel/salelooterz";

const dealCards = [
  {
    label: "MEN'S CLOTHING",
    sub: "UP TO 45% OFF",
    bg: "#f5f0eb",
    textColor: "#111",
    accent: "#e63946",
    img: "/assets/product1.png",
    rotate: -6,
    scale: 1,
    zIndex: 3,
    x: 0,
    y: 0,
  },
  {
    label: "MEN'S WATCH",
    sub: "94% SALE",
    bg: "#f9f3e8",
    textColor: "#111",
    accent: "#c9a84c",
    img: "/assets/product3.png",
    rotate: 4,
    scale: 0.95,
    zIndex: 2,
    x: 140,
    y: -20,
  },
  {
    label: "ELECTRONICS",
    sub: "UP TO 60% OFF",
    bg: "#0f1117",
    textColor: "#fff",
    accent: "#ff6b35",
    img: "/assets/product2.png",
    rotate: -3,
    scale: 0.9,
    zIndex: 1,
    x: 260,
    y: 30,
  },
  {
    label: "FLASH DEAL",
    sub: "128GB STORAGE",
    bg: "#1a1a2e",
    textColor: "#fff",
    accent: "#e040fb",
    img: "/assets/hero.png",
    rotate: 5,
    scale: 0.88,
    zIndex: 0,
    x: 370,
    y: -10,
  },
];

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden font-sans">
      <Navbar />
      <Hero />
      <Stats />
      <HowItWorks />
      <Categories />
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-2xl font-black tracking-tight">
          <span style={{ color: "#ff2d78" }}>Sale</span>
          <span className="text-white">looter</span>
          <span style={{ color: "#ff2d78" }}>Z</span>
        </span>
      </motion.div>

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
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2C16 2 10 8 10 16C10 20 13 24 16 24C19 24 22 20 22 16C22 8 16 2 16 2Z" fill="#7c3aed" opacity="0.7"/>
              <path d="M16 8C16 8 20 14 20 18C20 20.2 18.2 22 16 22C13.8 22 12 20.2 12 18C12 14 16 8 16 8Z" fill="#a855f7" opacity="0.5"/>
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
    {
      label: "MEN'S CLOTHING",
      sub: "UP TO 45% OFF",
      bg: "#f5f0eb",
      textColor: "#111",
      accent: "#e63946",
      img: "/assets/product1.png",
      rotate: -8,
      top: "8%",
      left: "2%",
      width: 180,
    },
    {
      label: "MEN'S WATCH",
      sub: "94% SALE",
      bg: "#f9f3e8",
      textColor: "#111",
      accent: "#c9a84c",
      img: "/assets/product3.png",
      rotate: 5,
      top: "0%",
      left: "32%",
      width: 165,
    },
    {
      label: "ELECTRONICS",
      sub: "UP TO 60% OFF",
      bg: "#101014",
      textColor: "#fff",
      accent: "#ff6b35",
      img: "/assets/product2.png",
      rotate: -4,
      top: "5%",
      left: "60%",
      width: 158,
    },
    {
      label: "FLASH DEAL",
      sub: "128GB STORAGE",
      bg: "#12121c",
      textColor: "#fff",
      accent: "#e040fb",
      img: "/assets/hero.png",
      rotate: 7,
      top: "45%",
      left: "15%",
      width: 170,
    },
    {
      label: "BEAUTY",
      sub: "BUY 2 GET 1 FREE",
      bg: "#fff0f3",
      textColor: "#111",
      accent: "#ff2d78",
      img: "/assets/product1.png",
      rotate: -5,
      top: "50%",
      left: "50%",
      width: 162,
    },
  ];

  return (
    <div className="relative w-full" style={{ height: 520 }}>
      {cards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40, rotate: card.rotate }}
          animate={{ opacity: 1, y: 0, rotate: card.rotate }}
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
          <div
            style={{
              background: card.bg,
              padding: "12px 12px 16px",
              borderRadius: 16,
            }}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "3/4",
                borderRadius: 10,
                overflow: "hidden",
                marginBottom: 10,
                background: "#ddd",
              }}
            >
              <img
                src={card.img}
                alt={card.label}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <p
              style={{
                color: card.textColor,
                fontWeight: 900,
                fontSize: 11,
                letterSpacing: "0.05em",
                marginBottom: 3,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {card.label}
            </p>
            <p
              style={{
                color: card.accent,
                fontWeight: 700,
                fontSize: 10,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {card.sub}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function Stats() {
  const stats = [
    { value: "2.63M+", label: "Active Members" },
    { value: "500+", label: "Deals Posted Daily" },
    { value: "80%", label: "Avg. Discount Found" },
    { value: "4.9★", label: "Community Rating" },
  ];

  return (
    <section className="border-y border-white/5 bg-white/[0.02] py-16">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="text-4xl font-black mb-2" style={{ color: "#ff2d78" }}>
              {s.value}
            </div>
            <div className="text-white/50 text-sm font-medium">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Join Our Channel",
      desc: "Click the Telegram or WhatsApp button to join the Salelooterz community instantly. Free forever.",
    },
    {
      num: "02",
      title: "Get Instant Alerts",
      desc: "We post flash sales, price drops, and hidden deals the moment they go live — direct to your phone.",
    },
    {
      num: "03",
      title: "Loot the Savings",
      desc: "Click, buy, save. Share deals with friends and family so everyone wins.",
    },
  ];

  return (
    <section className="py-28 max-w-[1400px] mx-auto px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">How It Works</h2>
        <p className="text-white/40 text-lg max-w-md">
          Three steps to never paying full price again.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="rounded-2xl border border-white/8 bg-white/[0.03] p-8 hover:border-white/20 transition-colors"
          >
            <span
              className="block text-6xl font-black mb-6 leading-none"
              style={{ color: "#ff2d78", opacity: 0.25 }}
            >
              {step.num}
            </span>
            <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
            <p className="text-white/45 leading-relaxed">{step.desc}</p>
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
    <section className="py-20 border-t border-white/5 bg-white/[0.02]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
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
              <h3 className="font-bold text-white mb-1.5 group-hover:text-[#ff2d78] transition-colors">
                {cat.name}
              </h3>
              <span className="text-xs font-semibold" style={{ color: "#ff2d78" }}>
                {cat.discount}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-3xl overflow-hidden p-12 text-center"
          style={{ background: "linear-gradient(135deg, #1a0a14 0%, #0a0a0a 50%, #0a0a1a 100%)", border: "1px solid rgba(255,45,120,0.2)" }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Ready to Start Looting?
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
            Join millions of smart shoppers who never pay full price. Free to join. Deals every day.
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
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-xl font-black">
          <span style={{ color: "#ff2d78" }}>Sale</span>
          <span className="text-white">looter</span>
          <span style={{ color: "#ff2d78" }}>Z</span>
        </span>

        <div className="flex gap-8 text-white/40 text-sm">
          <a href="#" className="hover:text-white transition-colors">About</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>

        <p className="text-white/30 text-sm">
          © {new Date().getFullYear()} Salelooterz. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
