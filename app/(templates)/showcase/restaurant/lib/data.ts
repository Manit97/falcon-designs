// ── Design Tokens ────────────────────────────────────────────────────────────
export const T = {
  bg:       "#090705",
  bgMd:     "#110D08",
  bgLt:     "#1C1610",
  bgCard:   "#141009",
  amber:    "#C4813A",
  amberLt:  "#D9974E",
  amberDim: "rgba(196,129,58,0.12)",
  cream:    "#F4EFE6",
  textMd:   "#AFA396",
  textLt:   "#6E6257",
  border:   "rgba(196,129,58,0.16)",
  borderLt: "rgba(196,129,58,0.07)",
} as const;

export const DISPLAY = "'Cormorant Garamond', Georgia, serif";
export const SANS    = "'Jost', system-ui, sans-serif";
export const EASE    = "cubic-bezier(0.23,1,0.32,1)";
export const BASE    = "/showcase/restaurant";

// ── Dishes ────────────────────────────────────────────────────────────────────
export const SIGNATURE = [
  {
    name: "Seared Diver Scallop",
    subtitle: "Cauliflower velouté · Brown butter · Oscietra caviar",
    price: "£28",
    desc: "Hand-dived Scottish scallops, seared hard on one side, served on a silk of roasted cauliflower and finished with a spoon of Oscietra. The combination of ocean sweetness and nutty depth is the dish that defines Ember.",
    img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=900&q=85",
  },
  {
    name: "Duck Confit",
    subtitle: "Sour cherry · Pomme purée · Jus gras",
    price: "£36",
    desc: "Gressingham duck leg slow-confit for 18 hours until the skin crackles and the meat pulls with the weight of a fork. Served alongside a pomme purée that crosses the line into something richer than potato should be.",
    img: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=900&q=85",
  },
  {
    name: "Aged Côte de Bœuf",
    subtitle: "55-day dry-aged · Wood-fire · Béarnaise",
    price: "£68",
    desc: "Our signature cut, sourced from a single family farm in Herefordshire and aged in-house for 55 days. Cooked entirely over applewood embers and carved tableside. This is why we are called Ember.",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&q=85",
  },
  {
    name: "Valrhona Chocolate",
    subtitle: "Smoked ganache · Salted caramel · Feuilletine",
    price: "£16",
    desc: "A study in Valrhona Guanaja 70%. The ganache is cold-smoked over cherry wood for four hours before setting. Beneath it: a caramel that walks the tightrope between sweet and salt, and a feuilletine base that provides the only crunch in an otherwise silken landscape.",
    img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=900&q=85",
  },
];

// ── Menu ──────────────────────────────────────────────────────────────────────
export const MENU = {
  snacks: [
    { name: "Gougères", desc: "Gruyère, smoked paprika", price: "£6" },
    { name: "Oyster, Mignonette", desc: "West Mersea, cucumber granita", price: "£5 each" },
    { name: "Beef Tartare Tart", desc: "Cornichon, shallot, mustard ice cream", price: "£14" },
    { name: "Oscietra Caviar", desc: "50g, crème fraîche, blini", price: "£85" },
  ],
  starters: [
    { name: "Seared Diver Scallop", desc: "Cauliflower velouté, brown butter, Oscietra", price: "£28" },
    { name: "Foie Gras Parfait", desc: "Brioche, Sauternes gel, hazelnut", price: "£24" },
    { name: "Heritage Tomato", desc: "Burrata, aged balsamic, Ligurian olive oil", price: "£18" },
    { name: "Langoustine Bisque", desc: "Fennel, tarragon, puff pastry lid", price: "£22" },
  ],
  mains: [
    { name: "Duck Confit", desc: "Sour cherry, pomme purée, jus gras", price: "£36" },
    { name: "Sea Bass en Papillote", desc: "Lemongrass, ginger, coconut nage", price: "£34" },
    { name: "Rack of Lamb", desc: "Herb crust, confit garlic, rosemary jus", price: "£42" },
    { name: "Risotto Bianco", desc: "Black truffle, aged Parmesan, chive", price: "£28" },
    { name: "Turbot, Beurre Blanc", desc: "Caper, dill, champagne sauce", price: "£46" },
  ],
  grill: [
    { name: "Côte de Bœuf (55-day)", desc: "For two, béarnaise, triple-cooked chips", price: "£68 pp" },
    { name: "Fillet of Beef", desc: "200g, bone marrow, watercress", price: "£54" },
    { name: "Ibérico Presa", desc: "Romesco, sherry vinegar, almonds", price: "£38" },
    { name: "Whole Lobster", desc: "Herb butter, grilled lemon, frites", price: "£62" },
  ],
  desserts: [
    { name: "Valrhona Chocolate", desc: "Smoked ganache, salted caramel, feuilletine", price: "£16" },
    { name: "Île Flottante", desc: "Anglaise, praline, nougatine", price: "£12" },
    { name: "Cheese Trolley", desc: "Selection of three, quince, crackers", price: "£18" },
    { name: "Tarte Tatin", desc: "Comice pear, cardamom, crème fraîche", price: "£14" },
  ],
  wines: [
    { name: "Chablis Premier Cru, Fourchaume", desc: "Domaine William Fèvre · 2021", price: "£95" },
    { name: "Gevrey-Chambertin Village", desc: "Rossignol-Trapet · 2019", price: "£120" },
    { name: "Meursault, Les Charmes", desc: "Domaine Guy Roulot · 2020", price: "£145" },
    { name: "Pomerol, Château Certan", desc: "Vieux Château Certan · 2018", price: "£280" },
    { name: "Champagne, Blanc de Blancs", desc: "Jacques Selosse · NV", price: "£185" },
  ],
};

// ── Gallery ───────────────────────────────────────────────────────────────────
export const GALLERY = [
  { img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85", alt: "Restaurant interior", span: "tall" },
  { img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80", alt: "Dining room", span: "wide" },
  { img: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=700&q=80", alt: "Candlelit table", span: "sq" },
  { img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80", alt: "Wine selection", span: "sq" },
  { img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80", alt: "Kitchen", span: "wide" },
];

// ── Press ─────────────────────────────────────────────────────────────────────
export const PRESS = [
  { outlet: "The Guardian", quote: "One of the finest wood-fire kitchens in the country.", rating: "★★★★★" },
  { outlet: "The Times", quote: "Laurent's cooking is precise, generous, and deeply pleasurable.", rating: "★★★★★" },
  { outlet: "Eater London", quote: "This is what a great London restaurant looks like in 2024.", rating: "Critic's Pick" },
];

// ── Team ──────────────────────────────────────────────────────────────────────
export const CHEF = {
  name: "Thomas Laurent",
  role: "Head Chef & Co-founder",
  bio: "Thomas trained under Pierre Gagnaire in Paris and Michel Bras in Laguiole before spending four years as sous-chef at The Fat Duck. He opened Ember in 2018 with a single ambition: to cook food that is honest, seasonal, and defined by fire.",
  bio2: "His obsession with fire — its unpredictability, its capacity for both subtlety and drama — has produced a cooking style unlike anything else in London. Every dish passes through flame at some point in its journey to the table.",
  img: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=900&q=85",
  awards: ["Michelin Bib Gourmand 2022, 2023, 2024", "AA Rosette ✦✦✦", "Observer Food Monthly: Best Chef 2023", "Square Meal Top 100 London Restaurants"],
};

// ── Private Dining ────────────────────────────────────────────────────────────
export const PRIVATE = {
  name: "The Cellar Room",
  capacity: "Up to 18 guests",
  desc: "Housed in our original Victorian wine cellar beneath the restaurant, The Cellar Room offers an entirely private dining experience for up to 18 guests. Bespoke menus, sommelier-led wine pairings, and the same kitchen delivering at full tilt.",
  img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=85",
};
