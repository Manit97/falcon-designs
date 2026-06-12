export const BASE = "/showcase/law";

export const T = {
  navy:    "#0A0E1A",
  navyMd:  "#111827",
  navyLt:  "#1C2333",
  gold:    "#C9A84C",
  goldLt:  "#E8D5A3",
  goldDk:  "#A07830",
  cream:   "#F8F6F0",
  creamMd: "#EDE8DF",
  text:    "#F8F6F0",
  textMd:  "rgba(248,246,240,0.7)",
  textLt:  "rgba(248,246,240,0.45)",
  border:  "rgba(201,168,76,0.18)",
  borderLt:"rgba(201,168,76,0.08)",
};

export const SERIF = "'Cormorant', 'Georgia', serif";
export const SANS  = "'Montserrat', system-ui, sans-serif";
export const EASE  = "cubic-bezier(0.23, 1, 0.32, 1)";

// ─── Practice Areas ───────────────────────────────────────────────────────────

export interface SubCategory {
  slug:    string;
  title:   string;
  tagline: string;
  intro:   string;
  points:  string[];
  img:     string;
}

export interface PracticeArea {
  slug:       string;
  title:      string;
  short:      string;
  tagline:    string;
  intro:      string;
  img:        string;
  heroImg:    string;
  icon:       string; // SVG path d=""
  subs:       SubCategory[];
}

export const PRACTICES: PracticeArea[] = [
  {
    slug:    "civil-litigation",
    title:   "Civil Litigation",
    short:   "Litigation",
    tagline: "Resolving disputes with precision and determination.",
    intro:   "Our Civil Litigation team has represented individuals and businesses in complex disputes for over two decades. We combine forensic legal analysis with strategic courtroom advocacy to deliver results.",
    img:     "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    heroImg: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1600&q=80",
    icon:    "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z",
    subs: [
      {
        slug:    "landlord-tenant",
        title:   "Landlord & Tenant",
        tagline: "Protecting your property rights.",
        intro:   "Whether you are a landlord facing a difficult tenant or a tenant whose rights have been breached, our team provides expert guidance through every stage of the dispute.",
        points:  ["Possession proceedings", "Rent arrears recovery", "Disrepair claims", "Lease forfeiture"],
        img:     "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
      },
      {
        slug:    "bankruptcy",
        title:   "Bankruptcy & Insolvency",
        tagline: "Navigating financial complexity with clarity.",
        intro:   "Our insolvency specialists provide pragmatic advice to debtors and creditors alike, guiding clients through personal and corporate insolvency processes with minimal disruption.",
        points:  ["Bankruptcy petitions", "Individual voluntary arrangements", "Debt relief orders", "Creditor representation"],
        img:     "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
      },
      {
        slug:    "debt-collection",
        title:   "Debt Collection",
        tagline: "Recovering what is rightfully yours.",
        intro:   "We pursue outstanding debts swiftly and effectively, from Letter Before Action through to enforcement proceedings, always seeking the most cost-efficient route to recovery.",
        points:  ["Letter Before Action", "County Court claims", "High Court enforcement", "Charging orders"],
        img:     "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80",
      },
      {
        slug:    "consumer-law",
        title:   "Consumer Law",
        tagline: "Standing up for consumer rights.",
        intro:   "Our consumer law team handles disputes involving faulty goods, mis-sold products, unfair contracts and trading standards breaches, holding businesses accountable under UK consumer legislation.",
        points:  ["Faulty goods claims", "Mis-sold financial products", "Unfair contract terms", "Trading standards"],
        img:     "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
      },
    ],
  },
  {
    slug:    "family-law",
    title:   "Family Law",
    short:   "Family",
    tagline: "Guiding families through life's most difficult moments.",
    intro:   "Family law matters are intensely personal. Our specialist family solicitors provide compassionate, discreet and expert advice, always prioritising the best outcome for you and your loved ones.",
    img:     "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    heroImg: "https://images.unsplash.com/photo-1511895426328-dc8714191011?w=1600&q=80",
    icon:    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
    subs: [
      {
        slug:    "divorce-separation",
        title:   "Divorce & Separation",
        tagline: "A considered approach to one of life's biggest transitions.",
        intro:   "We guide clients through divorce and separation with sensitivity and precision, handling financial settlements, property division and spousal maintenance to reach fair and lasting resolutions.",
        points:  ["No-fault divorce", "Financial settlements", "Property division", "Spousal maintenance"],
        img:     "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=1200&q=80",
      },
      {
        slug:    "child-arrangements",
        title:   "Child Arrangements",
        tagline: "Your children's wellbeing, our priority.",
        intro:   "Our child law specialists help parents navigate arrangements for children after separation, including residence, contact and specific issue orders, always keeping the child's best interests at the fore.",
        points:  ["Child arrangements orders", "Prohibited steps orders", "Relocation applications", "International child abduction"],
        img:     "https://images.unsplash.com/photo-1536349788264-1b816db3cc13?w=1200&q=80",
      },
      {
        slug:    "prenuptial-agreements",
        title:   "Prenuptial Agreements",
        tagline: "Protecting your future with clarity.",
        intro:   "A well-drafted prenuptial agreement provides financial clarity and peace of mind. Our solicitors draft bespoke agreements that reflect your circumstances and stand up to judicial scrutiny.",
        points:  ["Pre-nuptial agreements", "Post-nuptial agreements", "Cohabitation agreements", "Financial disclosure"],
        img:     "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
      },
      {
        slug:    "adoption",
        title:   "Adoption",
        tagline: "Building families with expertise and care.",
        intro:   "Our adoption solicitors guide prospective parents and birth families through every stage of the adoption process, from application through to the making of the adoption order.",
        points:  ["Domestic adoption", "Intercountry adoption", "Step-parent adoption", "Special guardianship"],
        img:     "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=1200&q=80",
      },
    ],
  },
  {
    slug:    "corporate-commercial",
    title:   "Corporate & Commercial",
    short:   "Corporate",
    tagline: "Commercial expertise that drives business forward.",
    intro:   "Our Corporate & Commercial team advises businesses of all sizes — from ambitious start-ups to established enterprises — on the full spectrum of commercial legal matters.",
    img:     "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    heroImg: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
    icon:    "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
    subs: [
      {
        slug:    "mergers-acquisitions",
        title:   "Mergers & Acquisitions",
        tagline: "Structuring deals that create lasting value.",
        intro:   "From due diligence through to completion, our M&A team provides comprehensive legal support for buyers and sellers across a range of sectors, ensuring transactions complete efficiently and on favourable terms.",
        points:  ["Share purchase agreements", "Due diligence", "Management buyouts", "Cross-border transactions"],
        img:     "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
      },
      {
        slug:    "commercial-contracts",
        title:   "Commercial Contracts",
        tagline: "Clear, enforceable agreements that protect your interests.",
        intro:   "Our commercial solicitors draft, review and negotiate contracts across all areas of business, from supply chain agreements to complex service contracts, minimising risk and maximising clarity.",
        points:  ["Supply agreements", "Service contracts", "Distribution agreements", "Joint ventures"],
        img:     "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
      },
      {
        slug:    "employment-law",
        title:   "Employment Law",
        tagline: "Expert advice for employers and employees.",
        intro:   "We advise both employers and employees on the full range of employment law matters, from contracts and policies through to tribunal representation, providing practical and commercially-minded solutions.",
        points:  ["Employment contracts", "Redundancy", "Discrimination claims", "Employment tribunal"],
        img:     "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80",
      },
      {
        slug:    "intellectual-property",
        title:   "Intellectual Property",
        tagline: "Safeguarding the assets that define your business.",
        intro:   "Our IP specialists help businesses identify, protect and enforce their intellectual property rights, from trade marks and copyright through to confidential information and passing off claims.",
        points:  ["Trade mark registration", "Copyright protection", "IP licensing", "Infringement proceedings"],
        img:     "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80",
      },
    ],
  },
  {
    slug:    "property-law",
    title:   "Property Law",
    short:   "Property",
    tagline: "Expert guidance across every property transaction.",
    intro:   "Whether you are buying your first home or managing a complex commercial portfolio, our property team provides meticulous legal support at every stage of the transaction.",
    img:     "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&q=80",
    heroImg: "https://images.unsplash.com/photo-1560185009-5bf9f2849488?w=1600&q=80",
    icon:    "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
    subs: [
      {
        slug:    "residential-conveyancing",
        title:   "Residential Conveyancing",
        tagline: "Moving you forward with confidence.",
        intro:   "Our residential conveyancing team provides a seamless, transparent service for buyers and sellers of all property types, keeping you informed at every stage and completing transactions on time.",
        points:  ["Freehold purchases", "Leasehold transactions", "Remortgaging", "Transfer of equity"],
        img:     "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80",
      },
      {
        slug:    "commercial-property",
        title:   "Commercial Property",
        tagline: "Strategic advice for property investors and occupiers.",
        intro:   "From acquisitions and disposals to portfolio management and development funding, our commercial property team advises investors, developers and occupiers across all commercial property asset classes.",
        points:  ["Acquisitions & disposals", "Development finance", "Commercial leases", "Property portfolio"],
        img:     "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
      },
      {
        slug:    "planning-development",
        title:   "Planning & Development",
        tagline: "Navigating the planning system with expertise.",
        intro:   "Our planning solicitors work with developers, landowners and local authorities to navigate the complexities of the planning system, from initial applications through to judicial review.",
        points:  ["Planning applications", "Planning appeals", "Section 106 agreements", "Judicial review"],
        img:     "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
      },
      {
        slug:    "lease-disputes",
        title:   "Lease Disputes",
        tagline: "Resolving property conflicts efficiently.",
        intro:   "Lease disputes can be costly and disruptive. Our specialist property litigators resolve lease-related conflicts swiftly, whether through negotiation, mediation or court proceedings.",
        points:  ["Lease extensions", "Service charge disputes", "Forfeiture proceedings", "Break clause disputes"],
        img:     "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
      },
    ],
  },
  {
    slug:    "wills-probate",
    title:   "Wills & Probate",
    short:   "Wills",
    tagline: "Securing your legacy and protecting your loved ones.",
    intro:   "Our Private Client team provides thoughtful, expert advice on all aspects of estate planning and administration, helping individuals and families plan for the future with confidence.",
    img:     "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?w=800&q=80",
    heroImg: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80",
    icon:    "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
    subs: [
      {
        slug:    "will-writing",
        title:   "Will Writing",
        tagline: "A gift of clarity to those you love.",
        intro:   "A professionally drafted Will ensures your estate is distributed according to your wishes, minimises potential disputes and can provide significant tax planning benefits. Our solicitors make the process straightforward.",
        points:  ["Simple Wills", "Mirror Wills", "Trust Wills", "Business succession"],
        img:     "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1200&q=80",
      },
      {
        slug:    "estate-administration",
        title:   "Estate Administration",
        tagline: "Managing estates with precision and care.",
        intro:   "Administering an estate after bereavement can be complex and time-consuming. Our probate team handles every aspect of the administration process, allowing you to focus on what matters most.",
        points:  ["Grant of probate", "Inheritance tax returns", "Estate accounts", "Deeds of variation"],
        img:     "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80",
      },
      {
        slug:    "lasting-power-attorney",
        title:   "Lasting Power of Attorney",
        tagline: "Protecting your interests if the unexpected happens.",
        intro:   "A Lasting Power of Attorney is one of the most important documents you can have. Our solicitors explain your options clearly and draft LPAs that give you complete peace of mind.",
        points:  ["Property & financial LPA", "Health & welfare LPA", "Registration service", "Capacity advice"],
        img:     "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80",
      },
      {
        slug:    "inheritance-disputes",
        title:   "Inheritance Disputes",
        tagline: "Protecting your rightful inheritance.",
        intro:   "Disputes over estates can be emotionally and financially draining. Our contentious probate specialists resolve inheritance disputes with sensitivity and determination, whether through negotiation or litigation.",
        points:  ["Will challenges", "Undue influence claims", "Reasonable financial provision", "Trust disputes"],
        img:     "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80",
      },
    ],
  },
];

// ─── Team ─────────────────────────────────────────────────────────────────────

export const TEAM = [
  {
    name:    "Jonathan Sterling",
    role:    "Senior Partner",
    area:    "Corporate & Commercial",
    bio:     "Called to the Bar in 1998, Jonathan founded Sterling & Co with a conviction that exceptional legal work demands both intellectual rigour and genuine client care. He has advised on transactions exceeding £2 billion in aggregate value.",
    img:     "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80",
    quals:   ["LLB (Hons) — University of Oxford", "LPC — The College of Law", "Solicitor of England & Wales"],
  },
  {
    name:    "Victoria Ashford",
    role:    "Partner — Family Law",
    area:    "Family Law",
    bio:     "Victoria is one of London's most respected family solicitors, recognised in the Legal 500 for her empathetic approach and formidable negotiating skill. She specialises in high-net-worth divorce and complex children matters.",
    img:     "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
    quals:   ["LLB — University of Cambridge", "Accredited Mediator (Law Society)", "Resolution Member"],
  },
  {
    name:    "Marcus Chen",
    role:    "Partner — Property",
    area:    "Property Law",
    bio:     "Marcus leads our award-winning property practice, advising on transactions from £500k residential sales to £50m commercial acquisitions. His pragmatic, commercial approach consistently delivers for clients.",
    img:     "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
    quals:   ["LLB — University of Bristol", "Diploma in Property Law", "RICS Commercial Property"],
  },
  {
    name:    "Priya Sharma",
    role:    "Associate — Litigation",
    area:    "Civil Litigation",
    bio:     "Priya joined the firm after eight years at a Magic Circle practice, bringing deep expertise in complex commercial disputes. She is particularly noted for her work in technology sector litigation and IP enforcement.",
    img:     "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&q=80",
    quals:   ["LLB — King's College London", "Bar Professional Training Course", "Fellow — Chartered Institute of Arbitrators"],
  },
  {
    name:    "Edward Pemberton",
    role:    "Associate — Wills & Probate",
    area:    "Wills & Probate",
    bio:     "Edward advises private clients and families on estate planning, trust structures and probate administration. His patient, thorough approach is particularly valued by clients navigating complex family circumstances.",
    img:     "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    quals:   ["LLB — University of Exeter", "STEP Affiliate", "Wills & Probate Accreditation (Law Society)"],
  },
  {
    name:    "Amara Osei",
    role:    "Associate — Corporate",
    area:    "Corporate & Commercial",
    bio:     "Amara advises on mergers, acquisitions and commercial contracts across a range of sectors. Her background in international trade law brings a valuable cross-border perspective to every transaction.",
    img:     "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80",
    quals:   ["LLB — LSE", "LLM International Trade Law — UCL", "Qualified in England, Wales & Ghana"],
  },
];

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export const BLOG_POSTS = [
  {
    slug:     "no-fault-divorce-one-year-on",
    title:    "No-Fault Divorce: One Year On",
    category: "Family Law",
    date:     "12 May 2026",
    author:   "Victoria Ashford",
    excerpt:  "Twelve months after the landmark reform came into force, we examine how no-fault divorce has changed the landscape for separating couples and what it means in practice.",
    img:      "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&q=80",
    content:  "The Divorce, Dissolution and Separation Act 2020 introduced no-fault divorce in April 2022, removing the requirement for either party to attribute blame for the breakdown of a marriage. One year on, the statistics tell a compelling story: applications have risen significantly, but the tone of proceedings has changed dramatically...",
  },
  {
    slug:     "commercial-lease-breaks-guide",
    title:    "Exercising Lease Break Clauses: A Practical Guide",
    category: "Property Law",
    date:     "28 April 2026",
    author:   "Marcus Chen",
    excerpt:  "Break clauses offer tenants flexibility, but exercising them correctly is fraught with technical requirements. Get it wrong, and you may be locked in for another term.",
    img:      "https://images.unsplash.com/photo-1560185009-5bf9f2849488?w=800&q=80",
    content:  "A break clause in a commercial lease can be a tenant's most valuable asset — or a costly trap. The courts have consistently held that break conditions must be strictly complied with...",
  },
  {
    slug:     "employment-tribunal-reforms-2026",
    title:    "Employment Tribunal Reforms: What Employers Need to Know",
    category: "Corporate & Commercial",
    date:     "14 April 2026",
    author:   "Amara Osei",
    excerpt:  "Proposed reforms to the employment tribunal system will significantly affect how workplace disputes are resolved. We outline the key changes and how to prepare.",
    img:      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
    content:  "The Employment Rights Bill currently progressing through Parliament represents the most significant overhaul of employment law in a generation. For employers, the implications are substantial...",
  },
  {
    slug:     "lasting-power-of-attorney-myths",
    title:    "Five Myths About Lasting Powers of Attorney",
    category: "Wills & Probate",
    date:     "2 April 2026",
    author:   "Edward Pemberton",
    excerpt:  "Misunderstandings about LPAs are widespread. Here we separate fact from fiction and explain why every adult should have one in place.",
    img:      "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?w=800&q=80",
    content:  "Despite their importance, Lasting Powers of Attorney remain widely misunderstood. Many people believe they only need one when they are elderly or seriously ill. This is one of the most dangerous misconceptions in private client law...",
  },
  {
    slug:     "debt-recovery-post-covid",
    title:    "Commercial Debt Recovery in a Post-Pandemic Economy",
    category: "Civil Litigation",
    date:     "18 March 2026",
    author:   "Priya Sharma",
    excerpt:  "With insolvencies rising and credit terms stretched, businesses are increasingly reliant on effective debt recovery strategies. We outline the options and their relative merits.",
    img:      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    content:  "The economic aftermath of the pandemic has left many businesses managing significant levels of unpaid debt. County Court statistics show a marked increase in debt claims over the past twelve months...",
  },
  {
    slug:     "ip-protection-startups",
    title:    "Intellectual Property Protection for Startups",
    category: "Corporate & Commercial",
    date:     "5 March 2026",
    author:   "Jonathan Sterling",
    excerpt:  "Your IP may be your most valuable business asset. We explain the key steps founders should take to protect it from day one.",
    img:      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    content:  "For technology and creative businesses, intellectual property is often the single most valuable asset on the balance sheet. Yet many founders neglect IP protection in the early stages, focusing instead on product development and fundraising...",
  },
];

// ─── Stats ────────────────────────────────────────────────────────────────────

export const STATS = [
  { value: "28+", label: "Years of Excellence" },
  { value: "4,200+", label: "Cases Resolved" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "£2.1bn", label: "In Transactions Advised" },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const TESTIMONIALS = [
  {
    quote: "Sterling & Co handled our acquisition with exceptional professionalism. Jonathan and his team were available at every hour, and the deal completed on time and within budget.",
    author: "Chief Executive, Technology Company",
    context: "M&A — £18m share acquisition",
  },
  {
    quote: "Victoria guided me through my divorce with tremendous care. What could have been a protracted battle was resolved amicably and fairly. I cannot recommend her highly enough.",
    author: "Private Client",
    context: "Family Law — High-Net-Worth Divorce",
  },
  {
    quote: "Marcus and his property team have handled over thirty transactions for our portfolio. Their attention to detail and commercial awareness is unmatched.",
    author: "Director, Property Investment Fund",
    context: "Commercial Property",
  },
];

// ─── Accreditations ───────────────────────────────────────────────────────────

export const ACCREDITATIONS = [
  "Law Society Conveyancing Quality Scheme",
  "Lexcel Quality Mark",
  "Legal 500 — Recommended Firm",
  "Resolution — Family Law",
  "STEP — Private Client",
  "Chambers UK — Ranked",
];
