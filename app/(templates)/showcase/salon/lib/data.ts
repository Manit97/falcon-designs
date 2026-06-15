// ── Maison Noir — Hair Atelier, Marylebone London
// Palette: Deep malachite / warm amber / parchment

export const BASE = "/showcase/salon";

export const T = {
  bg:         "#0B1512",   // deep forest black-green
  bgMd:       "#111A17",   // slightly lighter for cards
  bgPanel:    "#0F1E18",   // moss-dark panels
  bgLight:    "#F0EBE0",   // warm parchment (contrast sections)
  bgLightMd:  "#E8E1D4",   // slightly darker parchment
  amber:      "#C9973A",   // warm amber — CTA, highlights
  amberLt:    "#DDB05A",   // hover state
  cream:      "#EBE4D8",   // primary text on dark
  textMd:     "#9AAF9F",   // muted sage secondary text
  textDk:     "#1A1412",   // text on light sections
  textDkMd:   "#5C4E46",   // muted on light
  border:     "rgba(201,151,58,0.18)",   // subtle amber border
  borderLt:   "rgba(235,228,216,0.08)",  // subtle cream border
  borderDk:   "rgba(90,70,60,0.18)",     // border on light sections
};

export const SERIF = "'Bodoni Moda', serif";
export const SANS  = "'Jost', sans-serif";
export const EASE  = "cubic-bezier(0.23, 1, 0.32, 1)";

// ── Brand
export const BRAND = {
  name:     "MAISON NOIR",
  sub:      "Hair Atelier",
  tagline:  "Colour. Cut. Craft.",
  address:  "12 Marylebone High Street, London W1U 4PG",
  phone:    "020 7946 0382",
  email:    "studio@maisonnoir.co.uk",
  hours:    "Tue – Sat  9:00 – 19:00  ·  Sun  10:00 – 17:00",
};

// ── Services data
export interface Service {
  slug:   string;
  name:   string;
  desc:   string;
  from:   string;
  items:  { name: string; price: string }[];
  img:    string;
}

export const SERVICES: Service[] = [
  {
    slug: "colour",
    name: "Colour",
    desc: "Handcrafted colour work — from lived-in balayage to bold transformations. Every formula is mixed bespoke in-house.",
    from: "£95",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    items: [
      { name: "Balayage",           price: "from £185" },
      { name: "Full Highlights",    price: "from £145" },
      { name: "Root Touch-Up",      price: "from £95"  },
      { name: "Toner / Gloss",      price: "from £55"  },
      { name: "Colour Correction",  price: "POA"       },
      { name: "Bleach & Tone",      price: "from £195" },
    ],
  },
  {
    slug: "cut",
    name: "Cut & Style",
    desc: "Precision cutting that works with your hair's natural movement. Includes consultation, wash, and blow-dry finish.",
    from: "£65",
    img: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80",
    items: [
      { name: "Women's Cut & Blow Dry", price: "from £95"  },
      { name: "Men's Cut",              price: "from £65"  },
      { name: "Fringe Trim",            price: "£20"       },
      { name: "Blow Dry only",          price: "from £50"  },
      { name: "Hair Up",                price: "from £75"  },
      { name: "Dry Cut",                price: "from £60"  },
    ],
  },
  {
    slug: "treatment",
    name: "Treatments",
    desc: "Restorative rituals for hair health. From bond-building to scalp therapy — designed to repair, protect, and transform.",
    from: "£45",
    img: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&q=80",
    items: [
      { name: "Olaplex Treatment",       price: "from £45"  },
      { name: "Keratin Smoothing",       price: "from £250" },
      { name: "Deep Conditioning Mask",  price: "£35"       },
      { name: "Scalp Therapy",           price: "from £55"  },
      { name: "Gloss Treatment",         price: "from £55"  },
      { name: "Bond Repair Course (3×)", price: "from £120" },
    ],
  },
];

// ── Team
export const TEAM = [
  {
    name:        "Isabelle Voss",
    title:       "Creative Director & Senior Colourist",
    credential:  "15 years · Vidal Sassoon trained · Wella Master Colour Expert",
    img:         "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=700&q=80",
    specialty:   "Colour",
  },
  {
    name:        "James Osei",
    title:       "Head of Cut",
    credential:  "12 years · TONI&GUY Academy · L'Oréal Professionnel Artist",
    img:         "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=700&q=80",
    specialty:   "Cut",
  },
  {
    name:        "Nadia Reyes",
    title:       "Senior Stylist",
    credential:  "8 years · Trevor Sorbie trained · Olaplex Specialist",
    img:         "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=700&q=80",
    specialty:   "Colour & Cut",
  },
];

// ── Testimonials
export const TESTIMONIALS = [
  {
    quote:   "Isabelle transformed my hair after three bad salon experiences. I walked out with exactly what I'd been trying to describe for two years. Worth every penny and then some.",
    author:  "Charlotte F.",
    context: "Colour client · 3 years",
  },
  {
    quote:   "James listens. Genuinely listens. He looked at my face shape and suggested something I'd never have thought of — it's become my signature look.",
    author:  "Marcus D.",
    context: "Cut client · 2 years",
  },
  {
    quote:   "The keratin treatment completely changed my morning routine. Maison Noir is the only salon I trust with my hair now.",
    author:  "Priya S.",
    context: "Treatment client · 18 months",
  },
];

// ── Gallery
export const GALLERY = [
  { img: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=700&q=80", tag: "Colour", label: "Balayage" },
  { img: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=700&q=80", tag: "Cut", label: "Precision Cut" },
  { img: "https://images.unsplash.com/photo-1562572159-4efd90232571?w=700&q=80", tag: "Colour", label: "Blonding" },
  { img: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=700&q=80", tag: "Cut", label: "Textured Bob" },
  { img: "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?w=700&q=80", tag: "Colour & Cut", label: "Full Makeover" },
  { img: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=700&q=80", tag: "Colour & Cut", label: "Bridal Style" },
  { img: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=700&q=80", tag: "Colour", label: "Copper Tones" },
  { img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700&q=80", tag: "Colour", label: "Root Melt" },
  { img: "https://images.unsplash.com/photo-1567894340315-735d7c361db0?w=700&q=80", tag: "Cut", label: "Fringe Work" },
];

// ── Ticker items
export const TICKER_ITEMS = [
  "Balayage", "Precision Cut", "Keratin Smoothing", "Highlights",
  "Blow Dry", "Bond Repair", "Root Touch-Up", "Hair Up", "Toner",
  "Scalp Therapy", "Men's Cut", "Colour Correction", "Gloss", "Dry Cut",
];
