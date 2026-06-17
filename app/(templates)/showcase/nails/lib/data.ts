// ── DESIGN TOKENS ──────────────────────────────────────────────────────────────
export const C = {
  bg:      "#FDFAF8",
  surface: "#F7EEF2",
  blush:   "#EDD8DE",
  rose:    "#C05472",
  roseLt:  "#E8A0B8",
  mauve:   "#9A6B8E",
  plum:    "#3E1D4A",
  gold:    "#C4956A",
  text:    "#28152A",
  textMd:  "#6A5068",
  textLt:  "#9A8A9C",
  border:  "#E8D5DC",
  white:   "#FFFFFF",
};

export const DISPLAY = "'Cormorant Garamond', 'Cormorant', Georgia, serif";
export const BODY    = "'Montserrat', system-ui, sans-serif";
export const BASE    = "/showcase/nails";
export const EASE    = "cubic-bezier(0.23,1,0.32,1)";

// ── SERVICES ──────────────────────────────────────────────────────────────────
export const SERVICES = [
  {
    slug:     "nail-paint",
    name:     "Nail Paint",
    tagline:  "Classic colour, perfected.",
    img:      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80",
    heroImg:  "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1600&q=85",
    duration: "45 min",
    from:     "£18",
    desc:     "Our nail paint service begins with expert preparation — nails shaped, cuticles tended — before a flawless application of your chosen shade. We carry over 200 colours.",
    includes: ["Nail shaping & filing", "Cuticle care & push-back", "Base coat", "2 coats chosen colour", "High-shine top coat"],
    pricing: [
      { name: "Fingers", price: "£18", desc: "Standard nail paint — hands" },
      { name: "Toes", price: "£16", desc: "Standard nail paint — feet" },
      { name: "Fingers + Toes", price: "£30", desc: "Full combo deal" },
      { name: "French", price: "£22", desc: "Classic French tip finish" },
    ],
    process: [
      { num: "01", title: "Consultation", desc: "Shape, length and colour palette discussed." },
      { num: "02", title: "Prep", desc: "Nails cleaned, filed, cuticles gently tended." },
      { num: "03", title: "Application", desc: "Precise base, colour and top coat layering." },
      { num: "04", title: "Finish", desc: "Rapid dry lamp and nourishing cuticle oil." },
    ],
    faqs: [
      { q: "How long does it last?", a: "With proper care, standard nail paint lasts 5–7 days." },
      { q: "Can I bring my own polish?", a: "Of course — we're happy to work with your chosen colour." },
    ],
  },
  {
    slug:     "gel-nails",
    name:     "Gel Nails",
    tagline:  "Chip-free. For weeks.",
    img:      "https://images.unsplash.com/photo-1604946989636-d4b76e25e05b?w=800&q=80",
    heroImg:  "https://images.unsplash.com/photo-1604946989636-d4b76e25e05b?w=1600&q=85",
    duration: "60 min",
    from:     "£28",
    desc:     "Our LED-cured gel delivers a glass-like finish and chip-free wear for up to three weeks. Flex with your lifestyle — not around your nails.",
    includes: ["Nail prep & dehydrate", "Primer application", "LED-cured gel base", "2 colour coats", "Gel top coat", "Cuticle oil"],
    pricing: [
      { name: "Gel Fingers", price: "£28", desc: "Full gel application — hands" },
      { name: "Gel Toes", price: "£24", desc: "Full gel application — feet" },
      { name: "Gel French", price: "£32", desc: "French finish in gel" },
      { name: "Gel Removal", price: "£10", desc: "Safe, gentle soak-off" },
    ],
    process: [
      { num: "01", title: "Prep", desc: "Nails dehydrated and primed for maximum adhesion." },
      { num: "02", title: "Base", desc: "LED-cured bonding base coat applied." },
      { num: "03", title: "Colour", desc: "Two thin gel coats, cured under LED after each." },
      { num: "04", title: "Seal", desc: "High-gloss or matte top coat and final cure." },
    ],
    faqs: [
      { q: "How long does gel last?", a: "Gel polish typically lasts 2–3 weeks without chipping." },
      { q: "Does removal damage nails?", a: "Our soak-off method is gentle and minimises any thinning." },
    ],
  },
  {
    slug:     "nail-art",
    name:     "Nail Art",
    tagline:  "Wearable miniature art.",
    img:      "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=800&q=80",
    heroImg:  "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=1600&q=85",
    duration: "90–150 min",
    from:     "£35",
    desc:     "From delicate florals to geometric line work, our nail artists bring your vision to life — one nail at a time. Every design is hand-painted, never stamped.",
    includes: ["Full design consultation", "Gel or polish base", "Hand-painted artwork", "Encapsulation if needed", "Protective seal coat"],
    pricing: [
      { name: "Accent Nails", price: "£35+", desc: "1–2 nails, simple design" },
      { name: "Full Set Art", price: "£55+", desc: "All nails, single theme" },
      { name: "Premium Design", price: "£80+", desc: "Complex bespoke artwork" },
      { name: "3D & Embellishments", price: "£60+", desc: "Gems, foil, 3D elements" },
    ],
    process: [
      { num: "01", title: "Design Brief", desc: "Inspiration, colours and style discussed in detail." },
      { num: "02", title: "Base", desc: "Perfect colour base applied and cured." },
      { num: "03", title: "Artwork", desc: "Hand-painted design built up layer by layer." },
      { num: "04", title: "Seal", desc: "Protective top coat for lasting wear." },
    ],
    faqs: [
      { q: "Can I bring reference images?", a: "Absolutely — Instagram saves and Pinterest boards are welcome." },
      { q: "How long does nail art last?", a: "With a gel base, most nail art lasts 2–3 weeks." },
    ],
  },
  {
    slug:     "manicure",
    name:     "Manicure",
    tagline:  "Hands that speak for you.",
    img:      "https://images.unsplash.com/photo-1604954892701-0c95a2b3c0d5?w=800&q=80",
    heroImg:  "https://images.unsplash.com/photo-1604954892701-0c95a2b3c0d5?w=1600&q=85",
    duration: "50–75 min",
    from:     "£30",
    desc:     "A full hand treatment from soak to shine. Our manicures go beyond the nails — we soften, sculpt and pamper your hands to absolute perfection.",
    includes: ["Rose-infused hand soak", "Sugar exfoliation scrub", "Cuticle treatment", "Deep hand massage", "Nail shaping & buff", "Polish or gel colour"],
    pricing: [
      { name: "Classic Manicure", price: "£30", desc: "Soak, scrub, shape, polish" },
      { name: "Gel Manicure", price: "£42", desc: "Classic + gel colour" },
      { name: "Luxury Manicure", price: "£55", desc: "Spa treatment + paraffin wax" },
      { name: "Mini Manicure", price: "£20", desc: "Shape, buff and clear coat" },
    ],
    process: [
      { num: "01", title: "Soak", desc: "Rose-infused warm soak softens skin and cuticles." },
      { num: "02", title: "Exfoliate", desc: "Sugar scrub removes dead skin from hands and wrists." },
      { num: "03", title: "Massage", desc: "Deep hand and wrist massage with nourishing cream." },
      { num: "04", title: "Finish", desc: "Shaping, cuticle tidy and colour of your choice." },
    ],
    faqs: [
      { q: "What differs in the luxury tier?", a: "Paraffin wax dip plus extended massage — deeply conditioning." },
      { q: "Is massage included?", a: "Yes — hand massage is standard across all manicure services." },
    ],
  },
  {
    slug:     "pedicure",
    name:     "Pedicure",
    tagline:  "Step into softness.",
    img:      "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=800&q=80",
    heroImg:  "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=1600&q=85",
    duration: "60–90 min",
    from:     "£35",
    desc:     "A restorative foot ritual that leaves your feet soft, smooth and beautifully polished. Spa-grade treatments care for hard skin and tired muscles.",
    includes: ["Mineral salt foot soak", "Hard skin removal", "Callus treatment", "Foot & lower leg massage", "Nail shaping & cuticle care", "Polish or gel colour"],
    pricing: [
      { name: "Classic Pedicure", price: "£35", desc: "Full treatment + polish" },
      { name: "Gel Pedicure", price: "£45", desc: "Classic + gel colour" },
      { name: "Spa Pedicure", price: "£60", desc: "Extended + paraffin mask" },
      { name: "Express Pedicure", price: "£25", desc: "Tidy, buff and paint" },
    ],
    process: [
      { num: "01", title: "Soak", desc: "Mineral salts soak to relax and soften tired feet." },
      { num: "02", title: "Hard Skin", desc: "Gentle callus removal and professional foot file." },
      { num: "03", title: "Massage", desc: "Foot and calf massage with conditioning cream." },
      { num: "04", title: "Polish", desc: "Nail shaping, cuticle care and colour of choice." },
    ],
    faqs: [
      { q: "Do I need to prepare?", a: "No special prep needed — arrive and let us take care of you." },
      { q: "Is it suitable during pregnancy?", a: "Yes, with our specially adapted gentle technique." },
    ],
  },
  {
    slug:     "treatments",
    name:     "Nail Treatments",
    tagline:  "Restore. Strengthen. Protect.",
    img:      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80",
    heroImg:  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&q=85",
    duration: "30–60 min",
    from:     "£25",
    desc:     "Targeted protocols for damaged, brittle or weak nails. We rebuild nail health from the plate up using clinical-grade serums and strengthening overlays.",
    includes: ["Nail health assessment", "Targeted treatment serum", "Strengthening overlay", "Nourishing cuticle oil", "Personalised aftercare plan"],
    pricing: [
      { name: "Nail Repair", price: "£25", desc: "Single nail or spot treatment" },
      { name: "Strengthening Set", price: "£38", desc: "Full set strengthener" },
      { name: "Recovery Programme", price: "£65", desc: "3-week restorative course" },
      { name: "Silk Wrap", price: "£42", desc: "Protective silk overlay" },
    ],
    process: [
      { num: "01", title: "Assessment", desc: "Nail health analysis to identify damage type and cause." },
      { num: "02", title: "Treatment", desc: "Targeted serum or strengthener applied precisely." },
      { num: "03", title: "Protect", desc: "Overlay to seal the nail and reinforce structure." },
      { num: "04", title: "Advise", desc: "Personalised home-care routine to maintain results." },
    ],
    faqs: [
      { q: "How many sessions will I need?", a: "Most clients see meaningful improvement after 2–3 sessions." },
      { q: "Can I wear polish during treatment?", a: "Yes — we use breathable formulas to allow recovery." },
    ],
  },
];

// ── TEAM ──────────────────────────────────────────────────────────────────────
export const TEAM = [
  {
    name:  "Isabelle Laurent",
    role:  "Founder & Lead Nail Artist",
    bio:   "12 years perfecting the craft across London and Paris. Isabelle founded Velour with a single ambition — a nail studio that treats every appointment like a private sitting.",
    img:   "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
    spec:  "Nail Art, Gel Systems",
  },
  {
    name:  "Priya Mehta",
    role:  "Senior Nail Technician",
    bio:   "A specialist in gel extensions and nail health recovery. Priya's precision and gentle touch have earned her a loyal following of clients who've been coming for years.",
    img:   "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
    spec:  "Gel Extensions, Treatments",
  },
  {
    name:  "Sofia Reyes",
    role:  "Nail Artist",
    bio:   "A fine arts graduate who turned her painting skills toward the smallest canvas. Sofia's botanical nail art has been featured in Vogue and Glamour UK.",
    img:   "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80",
    spec:  "Nail Art, 3D Design",
  },
  {
    name:  "Mei Chen",
    role:  "Spa & Pedicure Specialist",
    bio:   "Trained in traditional Korean spa techniques and modern podiatry, Mei brings a deeply restorative approach to every foot and nail care treatment.",
    img:   "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
    spec:  "Pedicure, Nail Wellness",
  },
];

// ── TESTIMONIALS ──────────────────────────────────────────────────────────────
export const TESTIMONIALS = [
  {
    quote:  "I've been to nail studios across London and nothing comes close. The attention to detail — from the moment you walk in to the finishing oil — is extraordinary.",
    author: "Charlotte W.",
    title:  "Client since 2022",
    img:    "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=120&q=70",
  },
  {
    quote:  "Isabelle does nail art that genuinely looks like jewellery. I posted one photo and got 400 saves. The studio itself is like a little piece of Paris.",
    author: "Amara K.",
    title:  "Client since 2023",
    img:    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&q=70",
  },
  {
    quote:  "I came in with the most damaged nails after removing acrylics badly elsewhere. Three treatment sessions later they're genuinely stronger than before. Remarkable.",
    author: "Rebecca T.",
    title:  "Client since 2024",
    img:    "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=120&q=70",
  },
  {
    quote:  "Sofia created the most intricate botanical design I've ever seen on nails. I get stopped in the street. Worth every penny and I'll never go anywhere else.",
    author: "Valentina M.",
    title:  "Client since 2023",
    img:    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&q=70",
  },
  {
    quote:  "Booked a pedicure with Mei before my wedding and honestly it was the most relaxing two hours I've ever spent. My feet looked perfect for two full weeks.",
    author: "Grace O.",
    title:  "Bridal client",
    img:    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=120&q=70",
  },
  {
    quote:  "The gel manicure lasted a full three weeks without a single chip. I work with my hands constantly and was certain it wouldn't hold — I was completely wrong.",
    author: "Priya S.",
    title:  "Client since 2024",
    img:    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=70",
  },
  {
    quote:  "What sets Velour apart isn't just the skill — it's how unhurried everything feels. They never make you feel rushed. It's an actual treat, not just an errand.",
    author: "Léa D.",
    title:  "Client since 2022",
    img:    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&q=70",
  },
];

// ── PRODUCTS ──────────────────────────────────────────────────────────────────
export type Product = {
  id: string; name: string; cat: string; price: number;
  img: string; desc: string; badge?: string;
};

export const PRODUCTS: Product[] = [
  { id: "p1",  name: "Velvet Rose Gel Polish",      cat: "gel",       price: 16.99, badge: "Bestseller", img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80", desc: "Rich, long-wearing gel in our signature dusty rose." },
  { id: "p2",  name: "Midnight Plum Gel",            cat: "gel",       price: 16.99, img: "https://images.unsplash.com/photo-1577904487778-38eebc19c0fd?w=600&q=80", desc: "Deep plum gel for a moody, sophisticated finish." },
  { id: "p3",  name: "Sheer Blush Gel",              cat: "gel",       price: 14.99, badge: "New",        img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80", desc: "A barely-there blush that reads pure elegance." },
  { id: "p4",  name: "Gold Foil Gel",                cat: "gel",       price: 18.99, img: "https://images.unsplash.com/photo-1577904487778-38eebc19c0fd?w=600&q=80", desc: "Warm gold with real foil fleck for statement nails." },
  { id: "p5",  name: "Classic Red Nail Polish",      cat: "polish",    price: 12.99, badge: "Classic",   img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80", desc: "The red that never goes out of style. Deep and glossy." },
  { id: "p6",  name: "Barely There Nude",            cat: "polish",    price: 11.99, img: "https://images.unsplash.com/photo-1604946989636-d4b76e25e05b?w=600&q=80", desc: "Your nails, only better. Universal nude finish." },
  { id: "p7",  name: "Coral Sunset Polish",          cat: "polish",    price: 11.99, img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80", desc: "Warm coral that glows on every skin tone." },
  { id: "p8",  name: "Winter Berry Polish",          cat: "polish",    price: 11.99, badge: "Seasonal",  img: "https://images.unsplash.com/photo-1604946989636-d4b76e25e05b?w=600&q=80", desc: "Muted burgundy — rich, refined and wearable all year." },
  { id: "p9",  name: "Nail Strengthening Serum",     cat: "care",      price: 24.99, badge: "Pro",       img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80", desc: "Clinical-grade keratin complex to rebuild weak nails." },
  { id: "p10", name: "Rose Cuticle Oil",             cat: "care",      price: 14.99, img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80", desc: "Rosehip and vitamin E oil for supple, healthy cuticles." },
  { id: "p11", name: "Hand & Nail Cream",            cat: "care",      price: 19.99, img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80", desc: "Deep-conditioning cream that sinks in without grease." },
  { id: "p12", name: "Nail Repair Kit",              cat: "care",      price: 34.99, badge: "Kit",       img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80", desc: "Everything you need to rescue damaged nails at home." },
  { id: "p13", name: "Pro Nail File Set",            cat: "tools",     price: 9.99,  img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80", desc: "Glass and crystal files in 3 grits for perfect shaping." },
  { id: "p14", name: "Gel LED Lamp",                 cat: "tools",     price: 49.99, badge: "Pro Tool",  img: "https://images.unsplash.com/photo-1577904487778-38eebc19c0fd?w=600&q=80", desc: "36W LED lamp compatible with all gel brands." },
  { id: "p15", name: "Cuticle Pusher Set",           cat: "tools",     price: 12.99, img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80", desc: "Stainless steel dual-ended tools for clean cuticle lines." },
  { id: "p16", name: "Wavy Lace Front Wig — Blond",  cat: "wigs",      price: 89.99, badge: "New",       img: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&q=80", desc: "Natural-looking wavy lace front in champagne blond." },
  { id: "p17", name: "Straight Wig — Jet Black",     cat: "wigs",      price: 79.99, img: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80", desc: "Sleek, straight wig in a deep, luminous black." },
  { id: "p18", name: "Curly Bob Wig — Brunette",     cat: "wigs",      price: 84.99, img: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&q=80", desc: "Bouncy curly bob in warm chestnut brown." },
  { id: "p19", name: "Velour Gift Card — £50",       cat: "gifts",     price: 50.00, badge: "Gift",      img: "https://images.unsplash.com/photo-1582553564861-c840e89a0d32?w=600&q=80", desc: "The perfect gift — redeemable on all services and products." },
  { id: "p20", name: "The Velour Starter Kit",       cat: "gifts",     price: 44.99, badge: "Kit",       img: "https://images.unsplash.com/photo-1582553564861-c840e89a0d32?w=600&q=80", desc: "Polish, cuticle oil, file set and hand cream in one luxe box." },
];

export const PRODUCT_CATS = [
  { id: "all",    label: "All" },
  { id: "gel",    label: "Gel Polish" },
  { id: "polish", label: "Nail Polish" },
  { id: "care",   label: "Nail Care" },
  { id: "tools",  label: "Tools" },
  { id: "wigs",   label: "Wigs" },
  { id: "gifts",  label: "Gifts" },
];

// ── SLIDER IMAGES ─────────────────────────────────────────────────────────────
export const SLIDER_IMAGES = [
  { src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80",  alt: "Nail art" },
  { src: "https://images.unsplash.com/photo-1604946989636-d4b76e25e05b?w=600&q=80",  alt: "Gel nails" },
  { src: "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=600&q=80",  alt: "Nail painting" },
  { src: "https://images.unsplash.com/photo-1604954892701-0c95a2b3c0d5?w=600&q=80",  alt: "Manicure" },
  { src: "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=600&q=80",  alt: "Pedicure" },
  { src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80",  alt: "Nail products" },
  { src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80",     alt: "Salon" },
  { src: "https://images.unsplash.com/photo-1577904487778-38eebc19c0fd?w=600&q=80",  alt: "Polish collection" },
  { src: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80",  alt: "Gel polish" },
  { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80",  alt: "Spa treatment" },
];
