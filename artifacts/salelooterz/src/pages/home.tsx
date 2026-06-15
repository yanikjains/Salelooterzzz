import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { Search, Menu, ShoppingBag, Clock, Percent, Zap, Share2, Star, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <TopNav />
      <Ticker />
      <Hero />
      <Categories />
      <HotDeals />
      <TrendingDeals />
      <HowItWorks />
      <StorePartners />
      <DealOfDay />
      <Newsletter />
      <Footer />
    </div>
  );
}

function TopNav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center -rotate-12">
            <Zap className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">
            SALE<span className="text-primary">LOOTERZ</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 font-medium">
          <Link href="/" className="text-white hover:text-primary transition-colors">Home</Link>
          <Link href="#deals" className="text-white hover:text-primary transition-colors">Deals</Link>
          <Link href="#categories" className="text-white hover:text-primary transition-colors">Categories</Link>
          <Link href="#hot" className="text-white hover:text-primary transition-colors flex items-center gap-1">
            Hot Picks <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
          </Link>
        </nav>

        <div className="hidden lg:flex items-center relative w-64">
          <input 
            type="text" 
            placeholder="Search deals..." 
            className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-primary text-white"
          />
          <Search className="w-4 h-4 text-muted-foreground absolute right-3" />
        </div>

        <div className="flex items-center gap-4">
          <Button className="hidden md:flex bg-primary hover:bg-primary/90 text-white font-bold rounded-full px-6">
            Get Deals
          </Button>
          <button className="md:hidden text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}

function Ticker() {
  return (
    <div className="bg-secondary text-secondary-foreground py-2 mt-20 overflow-hidden flex font-bold text-sm tracking-wide">
      <div className="flex animate-marquee whitespace-nowrap min-w-full">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex shrink-0">
            <span className="mx-4 flex items-center gap-2"><Zap className="w-4 h-4" /> 50% OFF Electronics!</span>
            <span className="mx-4 flex items-center gap-2"><Clock className="w-4 h-4" /> Flash Sale: Fashion up to 70% OFF!</span>
            <span className="mx-4 flex items-center gap-2"><Percent className="w-4 h-4" /> Extra 20% off with code LOOT20</span>
            <span className="mx-4 flex items-center gap-2"><Star className="w-4 h-4" /> Top rated home goods restocked</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative pt-16 pb-32 overflow-hidden flex items-center min-h-[80vh]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background -z-10" />
      
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent font-semibold text-sm mb-6">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
            </span>
            Over 1,400+ Active Deals Today
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6">
            NEVER PAY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              FULL PRICE
            </span> AGAIN.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Join the smartest shoppers on the internet. We hunt down the best sales, pricing errors, and limited-time discounts so you don't have to.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full h-14 px-8 text-lg font-bold shadow-[0_0_30px_rgba(236,72,153,0.3)] hover:shadow-[0_0_40px_rgba(236,72,153,0.5)] transition-all">
              Start Looting
            </Button>
            <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg font-bold border-white/20 hover:bg-white/5">
              Browse Categories
            </Button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/30 blur-[100px] rounded-full" />
          <img 
            src="/assets/hero.png" 
            alt="Excited shoppers abstract" 
            className="relative z-10 w-full h-auto rounded-3xl border border-white/10 shadow-2xl"
          />
          
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-8 top-10 bg-card border border-white/10 p-4 rounded-2xl shadow-xl z-20"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                <Percent className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-semibold">Just Found</p>
                <p className="text-sm font-bold text-white">Nike Shoes 60% Off</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Categories() {
  const categories = [
    { name: "Electronics", discount: "Up to 80%", icon: "💻" },
    { name: "Fashion", discount: "Up to 70%", icon: "👗" },
    { name: "Home & Garden", discount: "Up to 60%", icon: "🏡" },
    { name: "Beauty", discount: "Up to 50%", icon: "✨" },
    { name: "Travel", discount: "Up to 40%", icon: "✈️" },
    { name: "Food & Dining", discount: "Up to 50%", icon: "🍔" },
    { name: "Sports", discount: "Up to 65%", icon: "⚽" },
    { name: "Automotive", discount: "Up to 30%", icon: "🚗" },
    { name: "Entertainment", discount: "Up to 75%", icon: "🎮" },
    { name: "Health", discount: "Up to 45%", icon: "💊" },
  ];

  return (
    <section id="categories" className="py-24 bg-black/50 border-y border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Shop by Category</h2>
            <p className="text-muted-foreground">Find massive discounts in your favorite departments.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-white/5 hover:border-primary/50 rounded-2xl p-6 text-center group cursor-pointer transition-all"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{cat.icon}</div>
              <h3 className="font-bold text-white mb-2">{cat.name}</h3>
              <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-bold">
                {cat.discount}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CountdownTimer({ initialHours }: { initialHours: number }) {
  const [timeLeft, setTimeLeft] = useState(initialHours * 3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const h = Math.floor(timeLeft / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;

  return (
    <div className="flex gap-1 text-xs font-mono font-bold text-destructive">
      <Clock className="w-3 h-3" />
      <span>{h.toString().padStart(2, '0')}:{m.toString().padStart(2, '0')}:{s.toString().padStart(2, '0')}</span>
    </div>
  );
}

function HotDeals() {
  const deals = [
    { title: "Razer Blade 15 Gaming Laptop", old: "$2,999", new: "$1,499", store: "Amazon", off: "50%", img: "/assets/product1.png" },
    { title: "Sony WH-1000XM5 Headphones", old: "$398", new: "$198", store: "Best Buy", off: "50%", img: "/assets/product2.png" },
    { title: "Apple Watch Series 8", old: "$399", new: "$249", store: "Target", off: "37%", img: "/assets/product3.png" },
    { title: "Samsung 65\" OLED 4K TV", old: "$2,499", new: "$1,299", store: "Walmart", off: "48%", gradient: "from-blue-500 to-purple-500" },
    { title: "Dyson V15 Detect Vacuum", old: "$749", new: "$499", store: "Dyson", off: "33%", gradient: "from-orange-500 to-red-500" },
    { title: "Nespresso Essenza Mini", old: "$179", new: "$99", store: "Macy's", off: "44%", gradient: "from-green-500 to-teal-500" },
  ];

  return (
    <section id="hot" className="py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="text-primary w-6 h-6" />
              <h2 className="text-3xl md:text-4xl font-black text-white">Hot Deals</h2>
            </div>
            <p className="text-muted-foreground">These deals are selling out fast. Grab them before they're gone.</p>
          </div>
          <Button variant="outline" className="hidden sm:flex rounded-full border-white/10 hover:bg-white/5">
            View All <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-white/5 rounded-3xl overflow-hidden group hover:border-white/20 transition-all flex flex-col"
            >
              <div className="relative aspect-video overflow-hidden bg-muted">
                {deal.img ? (
                  <img src={deal.img} alt={deal.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-tr ${deal.gradient} opacity-50`} />
                )}
                <div className="absolute top-4 left-4 bg-primary text-white font-black px-3 py-1 rounded-full text-sm">
                  {deal.off} OFF
                </div>
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  <CountdownTimer initialHours={Math.floor(Math.random() * 12) + 1} />
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{deal.store}</span>
                </div>
                <h3 className="font-bold text-lg text-white mb-4 line-clamp-2">{deal.title}</h3>
                <div className="mt-auto flex items-end justify-between">
                  <div>
                    <span className="text-muted-foreground line-through text-sm mr-2">{deal.old}</span>
                    <span className="text-2xl font-black text-secondary">{deal.new}</span>
                  </div>
                  <Button className="rounded-full bg-white text-black hover:bg-white/90 font-bold px-6">
                    Get Deal
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrendingDeals() {
  const deals = Array.from({ length: 8 }).map((_, i) => ({
    title: `Trending Item ${i + 1}`,
    price: `$${Math.floor(Math.random() * 100) + 20}.99`,
    off: `${Math.floor(Math.random() * 40) + 20}%`
  }));

  return (
    <section className="py-24 bg-black/30 border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-black text-white">Trending Now</h2>
      </div>
      
      <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar pl-4 md:pl-[max(1rem,calc((100vw-1280px)/2))]">
        <div className="flex gap-4 pr-4">
          {deals.map((deal, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="snap-start shrink-0 w-72 bg-card border border-white/5 rounded-2xl p-4 flex gap-4 items-center group cursor-pointer hover:bg-white/5 transition-colors"
            >
              <div className="w-20 h-20 bg-muted rounded-xl shrink-0" />
              <div>
                <span className="text-primary text-xs font-bold">{deal.off} OFF</span>
                <h4 className="font-bold text-white mb-1 line-clamp-1">{deal.title}</h4>
                <p className="text-lg font-black text-white">{deal.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: <Search className="w-8 h-8" />, title: "Browse Deals", desc: "We scan thousands of stores daily to find the absolute lowest prices on top products." },
    { icon: <Zap className="w-8 h-8" />, title: "Click & Save", desc: "Click through our verified links to claim the deal instantly. No hidden fees." },
    { icon: <Share2 className="w-8 h-8" />, title: "Share With Friends", desc: "Found an insane deal? Share it with the squad so everyone can loot the savings." }
  ];

  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-16">How To Loot</h2>
        
        <div className="grid md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          {steps.map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 bg-card border border-white/10 rounded-full flex items-center justify-center text-primary mb-6 shadow-xl">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-muted-foreground max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StorePartners() {
  const stores = ["AMAZON", "BEST BUY", "WALMART", "TARGET", "MACYS", "HOME DEPOT", "LOWES", "NIKE"];
  
  return (
    <section className="py-24 bg-white text-black text-center">
      <div className="container mx-auto px-4">
        <p className="text-sm font-bold tracking-widest text-black/50 mb-12 uppercase">We hunt deals across 500+ top retailers</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {stores.map(store => (
            <span key={store} className="text-xl md:text-3xl font-black tracking-tighter">{store}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function DealOfDay() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/10" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-gradient-to-br from-card to-background border border-white/10 p-8 md:p-16 rounded-[3rem] shadow-2xl grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-destructive text-white font-black px-4 py-2 rounded-full mb-6">
              DEAL OF THE DAY
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Secretlab Blade 16
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              The ultimate gaming machine is currently sitting at a historic low price. This pricing error might get fixed at any moment.
            </p>
            
            <div className="flex items-center gap-6 mb-10">
              <div className="text-5xl font-black text-secondary">$1,899</div>
              <div className="text-2xl text-muted-foreground line-through">$3,499</div>
            </div>

            <div className="p-6 bg-black/30 rounded-2xl border border-white/5 mb-8">
              <p className="text-sm font-bold text-white mb-2">Deal Expires In:</p>
              <div className="text-3xl">
                <CountdownTimer initialHours={4} />
              </div>
            </div>

            <Button size="lg" className="w-full sm:w-auto text-lg h-16 px-12 bg-primary hover:bg-primary/90 text-white rounded-full font-bold">
              Claim This Deal Now
            </Button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-secondary/20 blur-[100px] rounded-full" />
            <img src="/assets/product1.png" alt="Deal of the day" className="relative z-10 w-full h-auto rounded-3xl drop-shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="py-32 bg-accent/10 border-y border-white/5">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <Zap className="w-8 h-8 text-accent" />
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Never Miss a Glitch Price</h2>
        <p className="text-xl text-muted-foreground mb-10">
          We send out an alert the second a massive discount or pricing error goes live. Be the first to loot it.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 h-14 text-white focus:outline-none focus:border-accent"
          />
          <Button className="h-14 px-8 rounded-full bg-accent hover:bg-accent/90 text-black font-black text-lg">
            Send Me Alerts
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-6">No spam. Just straight fire deals. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-black pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center -rotate-12">
                <Zap className="text-white w-4 h-4" />
              </div>
              <span className="text-xl font-black tracking-tighter text-white">
                SALE<span className="text-primary">LOOTERZ</span>
              </span>
            </div>
            <p className="text-muted-foreground max-w-sm">
              The internet's premier destination for massive discounts, glitch prices, and unmissable deals.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6">Navigation</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Categories</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Hot Picks</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6">Legal</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Salelooterz. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
