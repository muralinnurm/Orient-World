/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  MapPin, 
  Phone, 
  Clock, 
  ChevronRight, 
  ChevronLeft,
  Star, 
  Instagram, 
  Facebook, 
  ArrowRight,
  UtensilsCrossed,
  Calendar,
  Quote,
  Play
} from 'lucide-react';

// --- Constants & Data ---

const NAV_LINKS = [
  { name: 'Home', href: '#' },
  { name: 'Menu', href: '#menu' },
  { name: 'About', href: '#about' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Location', href: '#location' },
];

const FEATURED_DISHES = [
  {
    id: 8,
    name: "Shaurma Arabi",
    arabicName: "شاورما عربي",
    description: "Geschnittenes Poulet Fleisch mit Knoblauch, eingelegten Gurken, Pommes Frittes und frischen Tomaten.",
    price: "16.00",
    image: "https://images.deliveryhero.io/image/fd-bd/LH/s6ek-listing.jpg",
    tag: "Bestseller"
  },
  {
    id: 24,
    name: "7 Vegi-Schalen (2 Pers.)",
    arabicName: "7 صحون فيجي",
    description: "Hummus, Baba Ghanuj, Muhammara, Falafel, Musaka, Bohnen und Avokado. Perfekt zum Teilen.",
    price: "35.00",
    image: "https://orientworld.ch/wp-content/uploads/2022/02/WhatsApp-Image-2022-02-17-at-15.29.31-5.jpeg",
    tag: "Chef's Choice"
  },
  {
    id: 16,
    name: "Lamm-Fleisch Teller",
    arabicName: "صحن لحم غنم",
    description: "Zartes Lammfleisch, perfekt gewürzt und serviert mit traditionellen Beilagen.",
    price: "22.00",
    image: "https://diejungskochenundbacken.de/wp-content/uploads/2025/03/Schmor-Lamm25-6.jpg",
    tag: "Premium"
  }
];
const MENU_CATEGORIES = [
  { id: 'salate', name: "Salate", arabicName: "سلطات", icon: "🥗" },
  { id: 'sandwiches', name: "Sandwiches", arabicName: "ساندوتشات", icon: "🥙" },
  { id: 'teller', name: "Teller", arabicName: "صحون", icon: "🍽️" },
  { id: 'mezzen', name: "Mezzen", arabicName: "مزات", icon: "🥣" },
  { id: 'teigtaschen', name: "Teigtaschen", arabicName: "معجنات", icon: "🥟" },
  { id: 'getraenke', name: "Getränke", arabicName: "مشروبات", icon: "🥤" },
  { id: 'suessigkeiten', name: "Süssigkeiten", arabicName: "حلويات", icon: "🍰" }
];

const MENU_DATA = {
  salate: [
    { nr: 1, name: "Fattousch Salat", arabicName: "سلطة فتوش", price: "8.00", description: "Lattich, Tomaten, Gurken, Granatapfel, Salz, Olivenöl, frische Zwiebel, Pfefferminz, Zitrone" }
  ],
  sandwiches: [
    { nr: 2, name: "Falafel", arabicName: "فلافل", price: "8.00", description: "Frittierte Kugeln aus pürierten Bohnen, Kichererbsen, Kräutern und Gewürzen" },
    { nr: 3, name: "Falafel Arabi", arabicName: "فلافل عربي", price: "12.00", description: "Geschnittenes Sandwich mit Beilagen" },
    { nr: 4, name: "Falafel mit Hallumi", arabicName: "فلافل مع حلومي", price: "13.00", description: "Falafel kombiniert mit gegrilltem Hallumikäse" },
    { nr: 5, name: "Hallumi", arabicName: "حلومي", price: "9.00", description: "Hallumikäse, Salatmischung" },
    { nr: 6, name: "Köfta", arabicName: "كفتة", price: "10.00", description: "Hackfleisch mit Zwiebel und Gewürzen, Eisbergsalat und Knoblauchsauce" },
    { nr: 7, name: "Shaurma/Poulet (vom Spiess)", arabicName: "شاورما دجاج", price: "10.00", description: "mit Knoblauch, eingelegte Gurken, Poulet Fleisch" },
    { nr: 8, name: "Shaurma Arabi", arabicName: "شاورما عربي", price: "16.00", description: "Geschnitten: Knoblauch, eingelegte Gurken, Poulet Fleisch, Pommes Frittes, frische Tomaten" },
    { nr: 9, name: "Shaurma/Fleisch (vom Spiess)", arabicName: "شاورما لحم", price: "12.00", description: "mit Hummus, eingelegte Gurken, Lamm-Fleisch" },
    { nr: 10, name: "Msahab Poulet", arabicName: "مسحب دجاج", price: "10.00", description: "Poulet, Peperoni, Tomaten, Zwiebel" },
    { nr: 11, name: "Piadina orientalisch mit Gemüse", arabicName: "بيادينا شرقية", price: "10.00", description: "Auberginen, Tomaten, Zucchetti, Rocula, Parmesan" },
    { nr: 12, name: "Fahita", arabicName: "فاهيتا", price: "12.00", description: "Pouletfleisch, Peperoni, Champignon, Mais und Spezialsauce" }
  ],
  teller: [
    { nr: 13, name: "Vegi-Teller", arabicName: "صحن فيجي", price: "15.00", description: "Bunte Auswahl an vegetarischen Spezialitäten" },
    { nr: 14, name: "Falafel-Teller", arabicName: "صحن فلافل", price: "16.00", description: "Hausgemachte Falafel mit Beilagen" },
    { nr: 15, name: "Hallumikäse-Teller", arabicName: "صحن حلومي", price: "17.00", description: "Gegrillter Hallumi mit frischem Salat" },
    { nr: 16, name: "Lamm-Fleisch Teller", arabicName: "صحن لحم غنم", price: "22.00", description: "Zartes Lammfleisch mit Beilagen" },
    { nr: 17, name: "Poulet-Teller", arabicName: "صحن دجاج", price: "19.00", description: "Gegrilltes Poulet mit Beilagen" },
    { nr: 18, name: "Köfta-Teller", arabicName: "صحن كفتة", price: "19.00", description: "Gewürztes Hackfleisch vom Grill" },
    { nr: 19, name: "Shaurma/Poulet-Teller", arabicName: "صحن شاورما دجاج", price: "20.00", description: "Poulet Shaurma mit Beilagen" },
    { nr: 20, name: "Shaurma/Fleisch-Teller", arabicName: "صحن شاورما لحم", price: "25.00", description: "Lamm Shaurma mit Beilagen" },
    { nr: 21, name: "Fleischmix, 1 Person", arabicName: "ميكس لحوم لشخص", price: "25.00", description: "4 verschiedene Beilagen" },
    { nr: 22, name: "Fleischmix, 2 Pers.", arabicName: "ميكس لحوم لشخصين", price: "50.00", description: "7 verschiedene Beilagen" },
    { nr: 23, name: "Crispy-Teller", arabicName: "صحن كريسبي", price: "20.00", description: "Pouletbrust-Filet, frittiert mit Pommes Frittes und Knoblauchsauce" }
  ],
  mezzen: [
    { nr: 24, name: "7 Vegi-Schalen, 2 Personen", arabicName: "7 صحون فيجي", price: "35.00", description: "Hummus, Baba Ghanuj, Muhammara, Falafel, Musaka, Bohnen, Avokado" },
    { nr: 25, name: "Ein Stück Falafel", arabicName: "قطعة فلافل", price: "1.50", description: "Einzelne Falafel-Kugel" },
    { nr: 26, name: "Becher Hummus/Baba Ghanuj", arabicName: "علبة حمص/بابا غنوج", price: "6.00", description: "250gr Portion" }
  ],
  teigtaschen: [
    { nr: 27, name: "Teigtaschen mit Spinat/Fleisch", arabicName: "معجنات", price: "3.00", description: "Wahlweise mit Spinat oder Fleischfüllung" },
    { nr: 28, name: "Kibbe", arabicName: "كبة", price: "3.50", description: "Hackfleischkugeln, gefüllt mit Zwiebeln und Kräutern" }
  ],
  getraenke: [
    { nr: 29, name: "Schwarztee", arabicName: "شاي أسود", price: "4.00", description: "" },
    { nr: 30, name: "Pfefferminztee", arabicName: "شاي نعناع", price: "4.00", description: "" },
    { nr: 31, name: "Schwarztee mit Pfefferminz", arabicName: "شاي أسود بالنعناع", price: "4.00", description: "" },
    { nr: 32, name: "Arabischer Tee mit Kardamom", arabicName: "شاي عربي بالهيل", price: "4.00", description: "" },
    { nr: 33, name: "Arabischer Tee mit Zimt", arabicName: "شاي عربي بالقرفة", price: "4.00", description: "" },
    { nr: 34, name: "Karkade (warm/kalt)", arabicName: "كركديه", price: "4.00", description: "" },
    { nr: 35, name: "Türkischer Kaffee", arabicName: "قهوة تركية", price: "4.00", description: "" },
    { nr: 36, name: "Arabischer Kaffee mit Kardamom", arabicName: "قهوة عربية بالهيل", price: "4.00", description: "" },
    { nr: 37, name: "Mineralwasser (3dl)", arabicName: "مياه معدنية", price: "4.00", description: "" },
    { nr: 38, name: "Softdrinks / Fruchtsaft (3dl)", arabicName: "مشروبات غازية", price: "4.00", description: "Kola, Rivella, Apfelschorle, Eistee, Uludag Gazoz" },
    { nr: 39, name: "Ayran", arabicName: "عيران", price: "4.00", description: "" }
  ],
  suessigkeiten: [
    { nr: 40, name: "Baklawa", arabicName: "بقلاوة", price: "3.00", description: "Verschiedene Sorten" }
  ]
};

const REVIEWS = [
  {
    name: "Sarah Müller",
    rating: 5,
    text: "The most authentic Levantine flavors I've found in Zürich. The atmosphere is warm and the service is impeccable.",
    date: "2 weeks ago"
  },
  {
    name: "Marc Keller",
    rating: 5,
    text: "Generous portions and incredible spices. The Shawarma plate is a must-try. Feels like a trip to the Orient.",
    date: "1 month ago"
  },
  {
    name: "Elena Rossi",
    rating: 5,
    text: "Beautiful interior and even better food. Perfect for a cozy dinner or a quick, high-quality takeaway.",
    date: "3 days ago"
  }
];

const GALLERY_IMAGES = [
  "https://orientworld.ch/wp-content/uploads/2022/02/WhatsApp-Image-2022-02-17-at-15.29.32-11.jpeg",
  "https://orientworld.ch/wp-content/uploads/2022/02/WhatsApp-Image-2022-02-17-at-15.29.30-2.jpeg",
  "https://orientworld.ch/wp-content/uploads/2022/02/WhatsApp-Image-2022-02-17-at-15.29.31-5.jpeg",
  "https://orientworld.ch/wp-content/uploads/2022/02/WhatsApp-Image-2022-02-17-at-15.29.31-6-e1645460228948.jpeg",
  "https://i.postimg.cc/FHzh48Xk/unnamed.jpg",
  "https://i.postimg.cc/FHzh48Xk/unnamed.jpg",
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass-header py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-ink flex items-center justify-center rounded-full">
            <span className="text-brand-cream font-serif text-xl font-bold">O</span>
          </div>
          <span className={`text-xl sm:text-2xl font-serif font-bold tracking-widest whitespace-nowrap ${isScrolled ? 'text-brand-ink' : 'text-brand-ink'}`}>
            ORIENT WORLD
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium uppercase tracking-widest hover:text-brand-brass transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a href="#location" className="!bg-white !text-black btn-primary text-sm py-2 px-6 hover:bg-brand-cream inline-block">
            Reserve
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-cream border-b border-brand-ink/5 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {NAV_LINKS.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg font-serif italic"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a href="#location" className="btn-primary w-full mt-4 inline-block text-center" onClick={() => setIsMobileMenuOpen(false)}>
                Reserve a Table
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          src="https://i.postimg.cc/c15fsr9B/unnamed.jpg" 
          alt="Orient World Hero" 
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-brand-cream/40 md:bg-gradient-to-r md:from-brand-cream/90 md:via-brand-cream/50 md:to-transparent">
          {/* Subtle Oriental Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.05] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/oriental-tiles.png')]"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-brand-ink/10 text-brand-ink text-xs font-semibold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 bg-brand-brass rounded-full animate-pulse"></span>
            Authentic Levantine Kitchen
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif leading-[0.9] mb-8">
            Experience the <br />
            <span className="text-display">Language of Taste</span>
          </h1>
          
          <p className="text-lg text-brand-ink/70 mb-10 max-w-lg leading-relaxed">
            Discover the rich, aromatic flavors of the Near East in the heart of Zürich. 
            A journey of spices, heritage, and warm hospitality awaits you at Orient World.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#location" className="!bg-brand-ink btn-primary flex items-center justify-center gap-2 group">
              Reserve a Table
              <Calendar className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#menu" className="btn-secondary flex items-center justify-center gap-2 group">
              Explore Menu
              <UtensilsCrossed className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </a>
          </div>

          <div className="mt-16 flex items-center gap-8 text-sm text-brand-ink/60">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-brass" />
              Leonhardstrasse 10, Zürich
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-brass" />
              Open Daily: 11:00 – 23:00
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Cue */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-ink/40"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll</span>
        <div className="w-[1px] h-12 bg-brand-ink/20"></div>
      </motion.div>
    </section>
  );
};

const Story = () => {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-10">
        <img 
          src="https://storage.googleapis.com/static-assets-public/ais-studio/user-uploads/2digraruycq3gtzfb2bdhn/image_1743171406.png" 
          alt="" 
          className="w-full h-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
        <div className="relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10 rounded-2xl overflow-hidden aspect-[4/5]"
          >
            <img 
              src="https://i.postimg.cc/TYwQ9zSL/unnamed.jpg" 
              alt="Our Story" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-brass/10 rounded-full -z-0 blur-3xl"></div>
          <div className="absolute top-1/2 -left-12 -translate-y-1/2 p-8 bg-brand-cream border border-brand-ink/5 rounded-2xl shadow-2xl z-20 hidden lg:block max-w-[240px]">
            <Quote className="text-brand-brass w-8 h-8 mb-4" />
            <p className="text-brand-ink italic font-serif text-lg leading-snug">
              "Food is the soul of our culture, served with love and joy."
            </p>
          </div>
        </div>

        <div>
          <span className="text-brand-brass font-bold uppercase tracking-[0.2em] text-xs mb-4 block">Our Heritage</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
            Blending Tradition & Innovation to create <span className="text-display">unforgettable</span> dining experiences
          </h2>
          <div className="space-y-6 text-brand-ink/70 leading-relaxed">
            <p>
              At Orient World, we believe that every meal should be a celebration. Our journey began with a simple passion: to bring the authentic, vibrant flavors of Levantine cuisine to Zürich.
            </p>
            <p>
              From our hand-picked spices to our charcoal-grilled meats, every detail is crafted to transport you to the bustling markets and warm homes of the Near East. We pride ourselves on using only the freshest local ingredients, prepared with time-honored techniques passed down through generations.
            </p>
          </div>
          
          <div className="mt-10 flex items-center gap-6">
            <div className="flex -space-x-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Customer" />
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-brand-amber">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs font-bold text-brand-ink/60 uppercase tracking-wider mt-1">
                Thousands of satisfied guests
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturedDishes = () => {
  return (
    <section id="menu" className="section-padding bg-brand-cream relative overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.05]">
        <img 
          src="https://storage.googleapis.com/static-assets-public/ais-studio/user-uploads/2digraruycq3gtzfb2bdhn/image_1743171406.png" 
          alt="" 
          className="w-full h-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="max-w-xl">
            <span className="text-brand-brass font-bold uppercase tracking-[0.2em] text-xs mb-4 block">Signature Selection</span>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">
              Your next favorite meal <span className="text-display">awaits</span>
            </h2>
          </div>
          <a href="#menu" className="btn-secondary flex items-center gap-2">
            View Full Menu <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {FEATURED_DISHES.map((dish, idx) => (
            <motion.div 
              key={dish.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-3xl overflow-hidden card-shadow"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={dish.image} 
                  alt={dish.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-brand-cream/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-ink">
                  {dish.tag}
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold group-hover:text-brand-brass transition-colors">{dish.name}</h3>
                    <span className="text-xs text-brand-brass/60 font-serif">{dish.arabicName}</span>
                  </div>
                  <span className="text-brand-brass font-bold">CHF {dish.price}</span>
                </div>
                <p className="text-sm text-brand-ink/60 leading-relaxed mb-6">
                  {dish.description}
                </p>
                <button className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-brand-ink hover:text-brand-brass transition-colors">
                  Order Now <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MenuPreview = () => {
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[1].id);
  const currentCategory = MENU_CATEGORIES.find(c => c.id === activeCategory);

  return (
    <section id="menu-full" className="section-padding bg-brand-ink text-brand-cream relative overflow-hidden">
      {/* Decorative Pattern Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-brand-cream/20 aspect-square"></div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            key={activeCategory + "-header"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-4"
          >
            <span className="text-brand-brass font-serif text-3xl opacity-50 block mb-2">{currentCategory?.arabicName}</span>
            <h2 className="text-4xl md:text-6xl font-serif">Unser <span className="text-display">Angebot</span></h2>
          </motion.div>
          <p className="text-brand-cream/60 max-w-2xl mx-auto mt-4">
            Entdecken Sie die Vielfalt unserer Küche. Von frischen Salaten bis hin zu herzhaften Tellern und süssen Köstlichkeiten.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-20">
          {MENU_CATEGORIES.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 rounded-full border transition-all flex flex-col items-center gap-1 min-w-[120px] ${
                activeCategory === cat.id 
                ? 'bg-brand-brass border-brand-brass text-brand-ink scale-105' 
                : 'border-brand-cream/10 hover:border-brand-brass/30 text-brand-cream/60'
              }`}
            >
              <span className="text-xl mb-1">{cat.icon}</span>
              <span className="text-[10px] uppercase tracking-widest font-bold">{cat.name}</span>
              <span className="text-[10px] opacity-60 font-serif">{cat.arabicName}</span>
            </button>
          ))}
        </div>

        {/* Menu Items List */}
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="contents"
            >
              {MENU_DATA[activeCategory as keyof typeof MENU_DATA].map((item, idx) => (
                <motion.div 
                  key={`${activeCategory}-${item.nr}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative pb-6 border-b border-brand-cream/10 hover:border-brand-brass/30 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-4">
                      <span className="text-brand-brass font-mono text-xs mt-1 opacity-50">{item.nr.toString().padStart(2, '0')}</span>
                      <div>
                        <h3 className="text-xl font-serif group-hover:text-brand-brass transition-colors flex items-center gap-3">
                          {item.name}
                          <span className="text-sm opacity-40 font-serif font-normal">{item.arabicName}</span>
                        </h3>
                        {item.description && (
                          <p className="text-sm text-brand-cream/50 mt-1 leading-relaxed max-w-md italic">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="text-brand-brass font-bold whitespace-nowrap ml-4">CHF {item.price}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-20 p-12 rounded-3xl bg-brand-brass/10 border border-brand-brass/20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-serif mb-2">Lust auf Takeaway?</h3>
            <p className="text-brand-cream/60">Geniessen Sie unsere authentischen Aromen bequem bei Ihnen zu Hause.</p>
          </div>
          <div className="flex gap-4">
            <a href="#menu" className="!bg-brand-brass !text-brand-ink btn-primary hover:bg-brand-brass/90 border-brand-brass inline-block text-center">Online Bestellen</a>
            <a href="#location" className="!bg-white !text-brand-ink btn-primary hover:bg-white/90 border-white inline-block text-center">Tisch Reservieren</a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <section id="testimonials" className="section-padding bg-white relative overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.05]">
        <img 
          src="https://storage.googleapis.com/static-assets-public/ais-studio/user-uploads/2digraruycq3gtzfb2bdhn/image_1743171406.png" 
          alt="" 
          className="w-full h-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand-brass font-bold uppercase tracking-[0.2em] text-xs mb-4 block">Guest Experiences</span>
          <h2 className="text-4xl md:text-5xl font-serif">Where every visit becomes a <br /><span className="text-display">great memory</span></h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Carousel Content */}
          <div className="overflow-hidden px-4 py-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="p-6 md:p-16 rounded-3xl bg-brand-cream/30 border border-brand-ink/5 relative text-center"
              >
                <div className="flex justify-center items-center gap-1 text-brand-amber mb-8">
                  {Array.from({ length: REVIEWS[currentIndex].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                
                <Quote className="w-12 h-12 text-brand-brass/20 absolute top-10 left-10 opacity-50" />
                
                <p className="text-2xl md:text-3xl font-serif italic leading-relaxed mb-10 text-brand-ink/90">
                  "{REVIEWS[currentIndex].text}"
                </p>
                
                <div className="flex flex-col items-center pt-8 border-t border-brand-ink/5">
                  <span className="font-bold text-lg mb-1">{REVIEWS[currentIndex].name}</span>
                  <span className="text-sm text-brand-ink/40 uppercase tracking-widest">{REVIEWS[currentIndex].date}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 rounded-full bg-white border border-brand-ink/10 flex items-center justify-center text-brand-ink hover:bg-brand-brass hover:text-white transition-all shadow-lg z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 rounded-full bg-white border border-brand-ink/10 flex items-center justify-center text-brand-ink hover:bg-brand-brass hover:text-white transition-all shadow-lg z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {REVIEWS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentIndex === idx ? 'bg-brand-brass w-8' : 'bg-brand-ink/10 hover:bg-brand-ink/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  return (
    <section id="gallery" className="section-padding bg-brand-ink text-brand-cream relative overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.05]">
        <img 
          src="https://storage.googleapis.com/static-assets-public/ais-studio/user-uploads/2digraruycq3gtzfb2bdhn/image_1743171406.png" 
          alt="" 
          className="w-full h-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-4xl md:text-5xl font-serif">Taste the vibes through <br /><span className="text-display">our gallery</span></h2>
          <button className="hidden md:flex items-center gap-2 text-brand-brass font-bold uppercase tracking-widest text-xs hover:underline">
            Follow us @orientworld <Instagram className="w-4 h-4" />
          </button>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {GALLERY_IMAGES.map((img, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-2xl"
            >
              <img 
                src={img} 
                alt="Gallery" 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-ink/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-brand-cream/20 backdrop-blur-md flex items-center justify-center">
                  <Instagram className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Location = () => {
  return (
    <section id="location" className="section-padding bg-brand-cream relative overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.05]">
        <img 
          src="https://storage.googleapis.com/static-assets-public/ais-studio/user-uploads/2digraruycq3gtzfb2bdhn/image_1743171406.png" 
          alt="" 
          className="w-full h-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <span className="text-brand-brass font-bold uppercase tracking-[0.2em] text-xs mb-4 block">Visit Us</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-8">Find us in the heart of <span className="text-display">Zürich</span></h2>
          
          <div className="space-y-10">
            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-full bg-brand-ink flex items-center justify-center shrink-0">
                <MapPin className="text-brand-cream w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Address</h4>
                <p className="text-brand-ink/60">Leonhardstrasse 10, 8001 Zürich, Switzerland</p>
                <button className="text-brand-brass text-sm font-bold mt-2 hover:underline">Get Directions</button>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-full bg-brand-ink flex items-center justify-center shrink-0">
                <Clock className="text-brand-cream w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Opening Hours</h4>
                <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm text-brand-ink/60">
                  <span>Mon – Fri:</span> <span>11:00 – 23:00</span>
                  <span>Sat – Sun:</span> <span>12:00 – 23:00</span>
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-full bg-brand-ink flex items-center justify-center shrink-0">
                <Phone className="text-brand-cream w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Contact</h4>
                <p className="text-brand-ink/60">+41 44 252 10 10</p>
                <p className="text-brand-ink/60">hello@orientworld.ch</p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-8 rounded-2xl bg-white border border-brand-ink/5 flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-brand-olive/10 flex items-center justify-center">
              <UtensilsCrossed className="text-brand-olive w-8 h-8" />
            </div>
            <div>
              <h5 className="font-bold">Dine-in & Takeaway</h5>
              <p className="text-sm text-brand-ink/60">Central location, perfect for a quick lunch or cozy dinner.</p>
            </div>
          </div>
        </div>

        <div className="aspect-[4/5] rounded-3xl overflow-hidden border-8 border-white shadow-2xl relative group cursor-pointer">
          {/* Video Preview Image */}
          <img 
            src="https://i.postimg.cc/DwjW1RTV/unnamed.jpg" 
            alt="Orient World Experience" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-ink/20 group-hover:bg-brand-ink/40 transition-colors"></div>
          
          {/* Play Button */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-20 h-20 bg-brand-brass rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
              <Play className="text-brand-ink w-8 h-8 fill-current ml-1" />
            </div>
          </div>

          {/* Label */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="px-6 py-2 bg-brand-ink/80 backdrop-blur-md text-brand-cream text-xs font-bold rounded-full whitespace-nowrap uppercase tracking-widest">
              Watch Our Story
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-ink text-brand-cream pt-24 pb-12 relative overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03]">
        <img 
          src="https://storage.googleapis.com/static-assets-public/ais-studio/user-uploads/2digraruycq3gtzfb2bdhn/image_1743171406.png" 
          alt="" 
          className="w-full h-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-brand-cream flex items-center justify-center rounded-full">
                <span className="text-brand-ink font-serif text-xl font-bold">O</span>
              </div>
              <span className="text-2xl font-serif font-bold tracking-widest">ORIENT WORLD</span>
            </div>
            <p className="text-brand-cream/60 max-w-sm mb-8 leading-relaxed">
              Bringing the authentic soul of Near-Eastern hospitality to the heart of Zürich. Fresh ingredients, rich spices, and unforgettable moments.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-brand-cream/20 flex items-center justify-center hover:bg-brand-cream hover:text-brand-ink transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-brand-cream/20 flex items-center justify-center hover:bg-brand-cream hover:text-brand-ink transition-all">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-8 uppercase tracking-widest text-sm">Quick Links</h4>
            <ul className="space-y-4 text-brand-cream/60 text-sm">
              <li><a href="#" className="hover:text-brand-brass transition-colors">Home</a></li>
              <li><a href="#menu" className="hover:text-brand-brass transition-colors">Our Menu</a></li>
              <li><a href="#about" className="hover:text-brand-brass transition-colors">About Us</a></li>
              <li><a href="#gallery" className="hover:text-brand-brass transition-colors">Gallery</a></li>
              <li><a href="#location" className="hover:text-brand-brass transition-colors">Reservations</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-8 uppercase tracking-widest text-sm">Newsletter</h4>
            <p className="text-brand-cream/60 text-sm mb-6">Get tasty news and special offers straight to your inbox.</p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-brand-cream/5 border border-brand-cream/10 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-brand-brass transition-colors"
              />
            <button className="!bg-brand-brass !text-brand-ink btn-primary py-3">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-brand-cream/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-brand-cream/40 uppercase tracking-[0.2em]">
          <p>© 2026 Orient World Zürich. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-brand-cream transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-cream transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-brand-cream transition-colors">Impressum</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-brand-brass selection:text-brand-cream">
      <Navbar />
      <main>
        <Hero />
        <Story />
        <FeaturedDishes />
        <MenuPreview />
        <Testimonials />
        <Gallery />
        <Location />
        
        {/* Final CTA Banner */}
        <section className="section-padding text-brand-cream text-center relative overflow-hidden min-h-[60vh] flex items-center">
          {/* Background Image with Dark Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://i.postimg.cc/DwjW1RTV/unnamed.jpg" 
              alt="Orient World Exterior" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-ink/80 backdrop-blur-[2px]"></div>
          </div>
          
          <div className="max-w-3xl mx-auto relative z-10">
            <span className="font-bold uppercase tracking-[0.3em] text-xs mb-6 block text-brand-brass">Reserve Your Spot</span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif mb-8 leading-tight">
            Ready for an <span className="italic">unforgettable</span> feast?
          </h2>
            <p className="text-lg mb-10 opacity-80">
              Join us for a celebration of flavors, culture, and hospitality. 
              Tables fill up fast, especially on weekends.
            </p>
            <a href="#location" className="!bg-brand-brass !text-brand-ink btn-primary hover:bg-brand-cream px-12 py-4 text-lg border-none inline-block">
              Book Your Table Now
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
