// ── Design Tokens ────────────────────────────────────────────────────────────
export const T = {
  bg:       "#FAF8F5",
  bgMd:     "#F2EDE7",
  bgDk:     "#0F0D0A",
  bgDkMd:   "#1A1713",
  bgDkLt:   "#252017",
  gold:     "#B8956A",
  goldLt:   "#CAAB82",
  rose:     "#D4B5A8",
  text:     "#0F0D0A",
  textMd:   "#5C564E",
  textLt:   "#9B9389",
  textInv:  "#FAF8F5",
  border:   "rgba(184,149,106,0.18)",
  borderLt: "rgba(184,149,106,0.08)",
} as const;

export const SERIF = "'Playfair Display', Georgia, serif";
export const SANS  = "'Inter', system-ui, sans-serif";
export const EASE  = "cubic-bezier(0.23,1,0.32,1)";
export const BASE  = "/showcase/clinic";

// ── Services ─────────────────────────────────────────────────────────────────
export const SERVICES = [
  {
    slug: "facial-rejuvenation",
    title: "Facial Rejuvenation",
    short: "Facials",
    tagline: "Restore luminosity and tone with bespoke treatment protocols",
    intro: "Our facial rejuvenation programmes combine the most advanced clinical technologies with the gentlest touch. From HydraFacial to medical-grade chemical peels and precision microneedling, each treatment is tailored to your skin's unique requirements by our specialist aesthetic nurses.",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    heroImg: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1600&q=85",
    duration: "60 – 90 min",
    recovery: "None to minimal",
    results: "Immediate & cumulative",
    price: "From £180",
    treatments: ["HydraFacial MD", "Chemical Peels", "Microneedling", "Lymphatic Massage"],
    points: [
      "Deeply cleanses and resurfaces skin in a single session",
      "Stimulates collagen and elastin production over time",
      "Reduces hyperpigmentation and uneven skin tone",
      "Suitable for all skin types and tones",
      "Medical-grade actives chosen for your skin profile",
      "Zero downtime for most protocols",
    ],
    steps: [
      { num: "01", title: "Skin Analysis", body: "A clinical assessment using our Observ 520X diagnostic system maps your skin's moisture, pigmentation, and texture before any treatment begins." },
      { num: "02", title: "Cleanse & Prep", body: "Deep double-cleanse removes impurities and prepares the skin barrier for maximum absorption of active ingredients." },
      { num: "03", title: "Treatment", body: "Your bespoke protocol is applied — whether that's a HydraFacial vortex infusion, precision peel, or microneedling with growth factors." },
      { num: "04", title: "Mask & Aftercare", body: "A calming mask suited to your skin type is applied, followed by SPF 50 and a personalised homecare prescription." },
    ],
  },
  {
    slug: "injectables",
    title: "Injectables",
    short: "Injectables",
    tagline: "Natural-looking refinement by consultant-level practitioners",
    intro: "Lumière's injectable treatments are performed exclusively by our Medical Director and senior aesthetic doctors. We believe in enhancement that is invisible to all but the client — subtle facial balancing, natural volumisation, and precise wrinkle relaxation that preserves full expression.",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    heroImg: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=85",
    duration: "30 – 60 min",
    recovery: "24 – 72 hours",
    results: "2 – 4 weeks onset",
    price: "From £250",
    treatments: ["Anti-Wrinkle Injections", "Dermal Fillers", "Lip Enhancement", "Jawline Sculpting"],
    points: [
      "Consultant-level practitioners only",
      "FDA & CE-approved products exclusively",
      "Natural results philosophy — never 'overdone'",
      "Complimentary 2-week review included",
      "Full facial mapping before every treatment",
      "Instant reversal capability on-site",
    ],
    steps: [
      { num: "01", title: "Consultation", body: "A 30-minute medical consultation assesses your facial anatomy, medical history, and aesthetic goals before any treatment is agreed." },
      { num: "02", title: "Facial Mapping", body: "Our doctors use precision facial mapping to identify treatment zones, ensuring symmetry and proportional enhancement." },
      { num: "03", title: "Treatment", body: "Topical anaesthetic is applied where needed. Treatment uses micro-cannulas and ultra-fine needles for minimal trauma." },
      { num: "04", title: "Aftercare", body: "Written aftercare guidance is provided. A complimentary 2-week review ensures results meet expectations." },
    ],
  },
  {
    slug: "laser-therapy",
    title: "Laser & Light",
    short: "Laser",
    tagline: "Clinical precision for resurfacing, pigmentation and hair removal",
    intro: "Our laser suite houses four clinical-grade platforms including the Lumenis M22, Cynosure PicoSure, and Candela GentleMax Pro. Every laser treatment is designed around your Fitzpatrick skin type and specific concern — never a one-size programme.",
    img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
    heroImg: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1600&q=85",
    duration: "30 – 120 min",
    recovery: "1 – 7 days",
    results: "Progressive over 4 – 6 weeks",
    price: "From £120",
    treatments: ["IPL Photofacial", "Laser Resurfacing", "Laser Hair Removal", "LED Phototherapy"],
    points: [
      "Four clinical laser platforms on-site",
      "Calibrated to your Fitzpatrick skin type",
      "Certified laser technicians — 1,000+ hours clinical time",
      "Mandatory patch test for every new client",
      "Treats pigmentation, redness, texture, and hair",
      "Multi-session packages available",
    ],
    steps: [
      { num: "01", title: "Patch Test", body: "A mandatory patch test is conducted at least 48 hours prior to any first laser treatment to assess skin sensitivity." },
      { num: "02", title: "Skin Calibration", body: "Laser settings are precisely calibrated to your Fitzpatrick type, concern depth, and target chromophore." },
      { num: "03", title: "Treatment", body: "Protective eyewear is applied. Each pulse is delivered with active cooling to maximise comfort and safety." },
      { num: "04", title: "Aftercare", body: "Post-treatment cooling and SPF 50+ are applied. A detailed recovery and sun-protection protocol is provided." },
    ],
  },
  {
    slug: "body-contouring",
    title: "Body Contouring",
    short: "Body",
    tagline: "Non-surgical sculpting for lasting body definition",
    intro: "Lumière's body contouring suite uses the most clinically proven technologies for fat reduction, skin tightening, and body definition. Our protocols combine cryolipolysis, monopolar radiofrequency, and HIFU ultrasound for targeted, cumulative results — without surgery.",
    img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
    heroImg: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=85",
    duration: "60 – 180 min",
    recovery: "Minimal to moderate",
    results: "8 – 12 weeks post-treatment",
    price: "From £300",
    treatments: ["Cryolipolysis", "Radiofrequency", "HIFU Ultrasound", "Lymphatic Drainage"],
    points: [
      "No surgery, no needles, no general anaesthetic",
      "Up to 27% fat reduction in treated areas",
      "Skin tightening and contouring in the same session",
      "Results continue for 3 months post-treatment",
      "Full body composition analysis included",
      "Complements nutrition and lifestyle programmes",
    ],
    steps: [
      { num: "01", title: "Body Assessment", body: "A full body composition analysis and photographic assessment establishes your baseline before treatment begins." },
      { num: "02", title: "Treatment Mapping", body: "Target zones are marked with precision guides to ensure even coverage and optimal device placement." },
      { num: "03", title: "Treatment", body: "Your combination protocol is applied — typically cryolipolysis followed by radiofrequency skin tightening." },
      { num: "04", title: "Review Programme", body: "Results are tracked at 6 and 12 weeks. Maintenance programmes are designed around your goals." },
    ],
  },
  {
    slug: "skin-consultations",
    title: "Skin Consultations",
    short: "Consultations",
    tagline: "Evidence-based analysis and bespoke treatment planning",
    intro: "A Lumière Skin Consultation is the foundation of everything we do. Using the Observ 520X diagnostic system, our clinical aestheticians map your skin in UV, cross-polarised, parallel-polarised, and true-daylight modes to reveal what the naked eye cannot see.",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    heroImg: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1600&q=85",
    duration: "45 – 60 min",
    recovery: "None",
    results: "Roadmap from day one",
    price: "Complimentary",
    treatments: ["Observ 520X Imaging", "Treatment Planning", "Product Review", "Follow-up Care"],
    points: [
      "Observ 520X multi-spectral skin imaging",
      "Detailed written skin health report provided",
      "Bespoke treatment roadmap and timeline",
      "Homecare programme prescription",
      "No obligation — genuinely educational",
      "Complimentary for all new clients",
    ],
    steps: [
      { num: "01", title: "Medical History", body: "A detailed skin and medical history form is completed, covering medications, allergies, previous treatments, and lifestyle factors." },
      { num: "02", title: "Observ Imaging", body: "The Observ 520X captures your skin across five light modalities, revealing pigmentation, vascular concerns, and UV damage." },
      { num: "03", title: "Clinical Analysis", body: "Our aesthetician reviews your images in real time, explaining precisely what they reveal and what they mean for your skin health." },
      { num: "04", title: "Treatment Plan", body: "A written bespoke plan is emailed within 24 hours with prioritised recommendations and indicative investment." },
    ],
  },
  {
    slug: "iv-wellness",
    title: "IV Therapy",
    short: "IV Therapy",
    tagline: "Cellular-level nutrition for skin, energy and immune resilience",
    intro: "Our IV therapy lounge delivers pharmaceutical-grade vitamin and mineral infusions directly into the bloodstream for 100% bioavailability. Formulated by our in-house nutritional medicine doctor, every drip is personalised to your blood panel and wellness goals.",
    img: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&q=80",
    heroImg: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1600&q=85",
    duration: "45 – 90 min",
    recovery: "None",
    results: "Immediate & progressive",
    price: "From £150",
    treatments: ["Radiance Drip", "Immunity Boost", "NAD+ Infusion", "Glutathione Push"],
    points: [
      "100% bioavailability vs 20–40% oral supplements",
      "Formulated by a Nutritional Medicine doctor",
      "Blood panel review before first infusion",
      "Private, clinic-grade IV suites",
      "12 protocols — or fully bespoke",
      "Courses of 4 recommended for optimal outcomes",
    ],
    steps: [
      { num: "01", title: "Blood Panel", body: "A baseline blood panel assesses micronutrient levels and any deficiencies that should inform your bespoke protocol." },
      { num: "02", title: "Protocol Design", body: "Our nutritional medicine doctor designs a bespoke infusion or recommends from our library based on your results." },
      { num: "03", title: "Infusion", body: "You relax in our private IV suite while the infusion is administered over 45–90 minutes, monitored throughout." },
      { num: "04", title: "Review", body: "A 6-week blood panel review measures the impact of your protocol and allows for adjustment and optimisation." },
    ],
  },
] as const;

// ── Team ──────────────────────────────────────────────────────────────────────
export const TEAM = [
  {
    name: "Dr. Sophie Marchand",
    role: "Medical Director & Founder",
    area: "Aesthetics · Dermatology",
    bio: "Dr. Marchand trained at the Hôpital Saint-Louis in Paris and the Royal College of Surgeons before founding Lumière in 2014. Her philosophy — enhancement that is invisible — defines every treatment at the clinic.",
    quals: ["MB ChB, University of Edinburgh", "Diploma in Aesthetic Medicine", "Fellow, British College of Aesthetic Medicine"],
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80",
  },
  {
    name: "Dr. James Okafor",
    role: "Senior Aesthetic Doctor",
    area: "Injectables · Lasers",
    bio: "Dr. Okafor's dual specialisation in injectable treatments and laser medicine allows him to treat complex skin concerns with multi-modal protocols. He holds over 3,000 hours of injectable clinical time.",
    quals: ["MBBS, King's College London", "MSc Aesthetic Medicine", "Allergan Medical Institute Faculty"],
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80",
  },
  {
    name: "Elena Vasquez",
    role: "Lead Clinical Aesthetician",
    area: "Facials · Skin Analysis",
    bio: "Elena trained at the International Dermal Institute and has specialised in evidence-based skincare for over a decade. Her Observ 520X diagnostic approach is the foundation of every Lumière consultation.",
    quals: ["CIDESCO Diploma, Int'l Dermal Institute", "Gernetic International Certified", "Dermalogica Expert Educator"],
    img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80",
  },
];

// ── Testimonials ──────────────────────────────────────────────────────────────
export const TESTIMONIALS = [
  { quote: "I have been to clinics all over London. Lumière is different — they actually look at your skin and tell you what you need, not what is most expensive. The results speak for themselves.", author: "Charlotte B.", context: "Client since 2019" },
  { quote: "Dr. Marchand has completely transformed how I feel about aesthetic treatments. Her approach is so measured and natural. I look like myself, just better.", author: "Isabelle T.", context: "Injectables client" },
  { quote: "The skin consultation alone was worth the trip. They showed me things about my skin I never knew using that imaging machine. It changed my entire approach to skincare.", author: "Marcus L.", context: "Skin consultation" },
];

// ── Stats ─────────────────────────────────────────────────────────────────────
export const STATS = [
  { value: "12+", label: "Years of Excellence" },
  { value: "8,400+", label: "Treatments Delivered" },
  { value: "4.9★", label: "Average Rating" },
  { value: "94%", label: "Return Client Rate" },
];

// ── Accreditations ────────────────────────────────────────────────────────────
export const ACCREDITATIONS = [
  "Care Quality Commission",
  "British College of Aesthetic Medicine",
  "Allergan Medical Institute",
  "Save Face Registered",
  "Treatments You Can Trust",
];
