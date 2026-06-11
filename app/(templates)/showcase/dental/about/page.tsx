"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const T = {
  bg:      "#FAFAF8",
  surface: "#F2EDE6",
  sage:    "#5C7A62",
  sageDk:  "#3F5A44",
  sageLt:  "#D4E2D6",
  gold:    "#A8865C",
  text:    "#1A1714",
  textMd:  "#4A4540",
  textLt:  "#7A736C",
  border:  "#DDD8D0",
  white:   "#FFFFFF",
};
const EASE  = [0.23, 1, 0.32, 1] as const;
const SERIF = "'Playfair Display', Georgia, serif";
const SANS  = "'Inter', system-ui, sans-serif";
const BASE  = "/showcase/dental";

const TEAM = [
  {
    name:           "Dr. Sarah Mitchell",
    role:           "Principal Dentist & Cosmetic Specialist",
    qualifications: "BDS (Hons) UCL · MFDS RCS · PgCert Aesthetic Dentistry",
    bio:            "Sarah founded Ivory Dental with a vision to make exceptional dentistry accessible and anxiety-free. With over 14 years in private practice, she specialises in complex smile transformations and full-mouth rehabilitation. She trained at UCL Dental Institute and holds a postgraduate certificate in Aesthetic Dentistry from the London Deanery.",
    img:            "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&q=80",
    specialties:    ["Cosmetic Dentistry", "Smile Design", "Veneers"],
  },
  {
    name:           "Dr. James Okafor",
    role:           "Implantologist & Oral Surgeon",
    qualifications: "BDS King's College · MFDS RCS · MSc Oral Surgery",
    bio:            "James is our specialist in complex implant cases and oral surgery, having placed over 2,000 implants in his 11-year career. He holds a Master's in Oral Surgery from King's College London and is a member of the Association of Dental Implantology. He is particularly experienced in full arch restoration and bone grafting.",
    img:            "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
    specialties:    ["Dental Implants", "Oral Surgery", "Bone Grafting"],
  },
  {
    name:           "Dr. Priya Sharma",
    role:           "Orthodontist",
    qualifications: "BDS · MClinDent Orthodontics · MOrth RCS",
    bio:            "Priya completed her specialist orthodontic training at the Eastman Dental Institute and holds the prestigious MOrth qualification from the Royal College of Surgeons. She is a certified Invisalign Diamond Provider — placing her in the top tier of providers worldwide. Her work is known for its precision and beautifully natural outcomes.",
    img:            "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
    specialties:    ["Invisalign", "Fixed Braces", "Retention"],
  },
  {
    name:           "Hannah Cole",
    role:           "Lead Dental Hygienist",
    qualifications: "DipDH · BSc Oral Health Science",
    bio:            "Hannah is the backbone of our preventive care programme. With a BSc in Oral Health Science and 8 years at Ivory Dental, she delivers airflow therapy, periodontal treatment and personalised oral hygiene coaching. Patients consistently describe her appointments as thorough, gentle and genuinely educational.",
    img:            "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=800&q=80",
    specialties:    ["Periodontics", "Airflow Therapy", "Prevention"],
  },
];

function TeamCard({ member, i }: { member: typeof TEAM[0]; i: number }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const isEven = i % 2 === 0;
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
      style={{ display: "grid", gridTemplateColumns: isEven ? "420px 1fr" : "1fr 420px", background: T.white, border: `1px solid ${T.border}`, overflow: "hidden" }}
      className="team-card"
    >
      {isEven ? (
        <>
          <div style={{ position: "relative", overflow: "hidden", minHeight: 440 }}>
            <img src={member.img} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 15%", transition: "transform 600ms cubic-bezier(0.23,1,0.32,1)" }} loading="lazy"
              onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)")}
              onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(92,122,98,0.1) 0%, transparent 60%)" }} />
          </div>
          <div style={{ padding: "3.5rem 3rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <MemberContent member={member} />
          </div>
        </>
      ) : (
        <>
          <div style={{ padding: "3.5rem 3rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <MemberContent member={member} />
          </div>
          <div style={{ position: "relative", overflow: "hidden", minHeight: 440 }}>
            <img src={member.img} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 15%", transition: "transform 600ms cubic-bezier(0.23,1,0.32,1)" }} loading="lazy"
              onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)")}
              onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(225deg, rgba(92,122,98,0.1) 0%, transparent 60%)" }} />
          </div>
        </>
      )}
    </motion.div>
  );
}

function MemberContent({ member }: { member: typeof TEAM[0] }) {
  return (
    <>
      <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: T.sage, marginBottom: "0.6rem" }}>{member.role}</p>
      <h2 style={{ fontFamily: SERIF, fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 500, color: T.text, marginBottom: "0.6rem" }}>{member.name}</h2>
      <p style={{ fontSize: "0.75rem", color: T.textLt, letterSpacing: "0.04em", marginBottom: "1.5rem", fontStyle: "italic" }}>{member.qualifications}</p>
      <p style={{ fontSize: "0.87rem", color: T.textMd, lineHeight: "1.82", marginBottom: "2rem" }}>{member.bio}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {member.specialties.map(s => (
          <span key={s} style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase", color: T.sage, background: T.sageLt, padding: "4px 12px" }}>{s}</span>
        ))}
      </div>
    </>
  );
}

export default function AboutPage() {
  return (
    <div style={{ background: T.bg, fontFamily: SANS }}>

      {/* ── HERO ── */}
      <section style={{ position: "relative", height: 420, overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1629909615184-74f495363b67?w=1600&q=80" alt="About Ivory Dental" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.65) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", padding: "3rem 2rem", textAlign: "center" }}>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)", marginBottom: "0.75rem" }}>Our story</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, ease: EASE }}
            style={{ fontFamily: SERIF, fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 500, color: "#fff", lineHeight: 1.1 }}>
            Meet the experts behind your smile
          </motion.h1>
        </div>
      </section>

      {/* ── PRACTICE STORY — SPLIT ── */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 520 }} className="story-section">
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80" alt="Ivory Dental practice" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, transparent 65%, ${T.bg})` }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "5rem clamp(2rem,5vw,5rem) 5rem 4rem", background: T.bg }}>
          <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.sage, marginBottom: "1rem" }}>Founded 2010</p>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 500, color: T.text, lineHeight: 1.15, marginBottom: "1.75rem" }}>
            Built on the belief that<br />
            <em style={{ color: T.sage }}>everyone deserves</em><br />
            exceptional dental care.
          </h2>
          <p style={{ fontSize: "0.88rem", color: T.textMd, lineHeight: "1.85", marginBottom: "1.25rem" }}>
            Ivory Dental was founded in 2010 by Dr. Sarah Mitchell, who trained at UCL and spent her early career working in specialist practices across London. She opened Ivory Dental on Harley Street with a simple ambition: to create a practice where patients felt genuinely listened to and cared for — not processed.
          </p>
          <p style={{ fontSize: "0.88rem", color: T.textMd, lineHeight: "1.85", marginBottom: "2rem" }}>
            Fourteen years later, the practice has grown to a team of four specialist clinicians, served over 4,800 patients and earned a 4.9-star Google rating. The founding ambition hasn't changed. Every appointment — whether a check-up or a full-arch restoration — is approached with the same attention and care.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {[{ v: "2010", l: "Year founded" }, { v: "4,800+", l: "Patients treated" }, { v: "4.9★", l: "Google rating" }, { v: "4", l: "Specialist clinicians" }].map(s => (
              <div key={s.l} style={{ borderLeft: `3px solid ${T.sageLt}`, paddingLeft: "1rem" }}>
                <div style={{ fontFamily: SERIF, fontSize: "1.5rem", fontWeight: 600, color: T.text }}>{s.v}</div>
                <div style={{ fontSize: "0.72rem", color: T.textLt, letterSpacing: "0.08em" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:768px){ .story-section{grid-template-columns:1fr!important} }`}</style>
      </section>

      {/* ── OUR VALUES ── */}
      <section style={{ background: T.surface, borderTop: `1px solid ${T.border}`, padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.sage, marginBottom: "0.75rem" }}>What drives us</p>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 500, color: T.text }}>The principles that guide us</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2px", background: T.border }}>
            {[
              { num: "01", title: "Clinical excellence",   desc: "We hold ourselves to the highest standards — using the latest techniques and materials, and continuously refining our craft through ongoing education and peer review." },
              { num: "02", title: "Patient partnership",   desc: "We believe the best outcomes happen when dentist and patient work together. We listen first, explain clearly, and never proceed without your full understanding and consent." },
              { num: "03", title: "Absolute transparency", desc: "You will always know exactly what we recommend and why, what it costs, and what the alternatives are. No surprises on the treatment plan or the bill." },
              { num: "04", title: "Genuine compassion",    desc: "Many patients arrive anxious. We never rush, we never judge, and we always go at your pace. Your comfort — physical and emotional — is as important as the clinical outcome." },
            ].map((v, i) => (
              <motion.div key={v.num} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 16 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.45, ease: EASE }}
                style={{ background: T.white, padding: "2.75rem 2.25rem" }}>
                <p style={{ fontFamily: SERIF, fontSize: "2.5rem", fontWeight: 400, color: T.sageLt, lineHeight: 1, marginBottom: "1.25rem" }}>{v.num}</p>
                <h3 style={{ fontFamily: SERIF, fontSize: "1.2rem", fontWeight: 500, color: T.text, marginBottom: "0.75rem" }}>{v.title}</h3>
                <p style={{ fontSize: "0.84rem", color: T.textLt, lineHeight: "1.78" }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "6rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.sage, marginBottom: "0.75rem" }}>The clinical team</p>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 500, color: T.text }}>The people behind every smile</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {TEAM.map((member, i) => <TeamCard key={member.name} member={member} i={i} />)}
        </div>
        <style>{`.team-card { grid-template-columns: 420px 1fr } @media(max-width:860px){ .team-card{grid-template-columns:1fr!important} .team-card>div:has(img){min-height:300px!important} }`}</style>
      </section>

      {/* ── ACCREDITATIONS ── */}
      <section style={{ background: T.surface, borderTop: `1px solid ${T.border}`, padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.sage, marginBottom: "0.75rem" }}>Recognised & regulated</p>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(1.8rem,3vw,2.5rem)", fontWeight: 500, color: T.text }}>Our accreditations</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "2px", background: T.border }}>
            {[
              { title: "British Dental Association",        desc: "Full BDA membership — the hallmark of professional standards in UK dentistry." },
              { title: "Care Quality Commission",           desc: "CQC-registered and inspected. Independently verified for safety and care quality." },
              { title: "General Dental Council",            desc: "All clinicians are GDC-registered and maintain full continuing professional development." },
              { title: "Invisalign Diamond Provider",       desc: "Top 1% of Invisalign providers globally, based on case volume and clinical outcomes." },
              { title: "Royal College of Surgeons",         desc: "MFDS and specialist qualifications held by our clinical team." },
              { title: "Assoc. of Dental Implantology",    desc: "ADI membership — specialist knowledge, ethics and ongoing implant training." },
            ].map((a, i) => (
              <motion.div key={a.title} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 12 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4, ease: EASE }}
                style={{ background: T.white, padding: "2rem 1.75rem" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.sage, marginBottom: "1rem" }} />
                <h4 style={{ fontFamily: SERIF, fontSize: "0.95rem", fontWeight: 500, color: T.text, marginBottom: "0.5rem" }}>{a.title}</h4>
                <p style={{ fontSize: "0.8rem", color: T.textLt, lineHeight: "1.7" }}>{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "5rem 2rem", textAlign: "center", background: T.bg }}>
        <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.sage, marginBottom: "0.75rem" }}>Come and meet us</p>
        <h2 style={{ fontFamily: SERIF, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 500, color: T.text, marginBottom: "1.25rem" }}>Book your first appointment</h2>
        <p style={{ fontSize: "0.9rem", color: T.textLt, maxWidth: 440, margin: "0 auto 2rem", lineHeight: "1.75" }}>New patients receive a complimentary smile assessment — a full examination with no obligation to proceed.</p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href={`${BASE}/book`}
            style={{ padding: "0.875rem 2.25rem", background: T.sage, color: "#fff", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none", transition: "background 220ms" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.sageDk}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = T.sage}>
            Book now
          </Link>
          <Link href={`${BASE}/services`}
            style={{ padding: "0.875rem 2.25rem", background: "transparent", color: T.sage, fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", border: `1.5px solid ${T.sage}`, textDecoration: "none", transition: "all 220ms" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T.sage; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = T.sage; }}>
            View our services
          </Link>
        </div>
      </section>

    </div>
  );
}
