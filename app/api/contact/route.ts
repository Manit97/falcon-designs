import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

/** Escape HTML special characters to prevent XSS in email templates */
function escHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      name: string;
      email: string;
      company?: string;
      message: string;
      services?: string[];
    };

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Basic length limits
    if (body.name.length > 200 || body.email.length > 200 || body.message.length > 5000) {
      return NextResponse.json({ error: "Input too long" }, { status: 400 });
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // ── 1. Write to Supabase ──────────────────────────────────────────────
    const supabase = getSupabase();
    const nameTrimmed    = body.name.trim();
    const emailTrimmed   = body.email.trim().toLowerCase();
    const companyTrimmed = body.company?.trim() ?? null;
    const msgTrimmed     = body.message.trim();
    const servicesList   = body.services ?? [];

    const { error: dbError } = await supabase.from("contact_leads").insert({
      name:     nameTrimmed,
      email:    emailTrimmed,
      company:  companyTrimmed,
      message:  msgTrimmed,
      services: servicesList,
      source:   "falcon-designs-website",
      status:   "new",
    });

    if (dbError) console.error("Supabase contact_leads insert error:", dbError);

    // Also insert into shared leads table so Dashboard CRM can see it
    const { error: leadsError } = await supabase.from("leads").insert({
      name:            nameTrimmed,
      email:           emailTrimmed,
      trade:           servicesList.length > 0 ? servicesList.join(", ") : companyTrimmed ?? "Unknown",
      location:        null,
      website_quality: null,
      fit_reason:      msgTrimmed,
      status:          "new",
      drafted_email:   null,
    });

    if (leadsError) console.error("Supabase leads insert error:", leadsError);

    // ── 2. Send notification email via Resend ─────────────────────────────
    const RESEND_KEY = process.env.RESEND_API_KEY;
    if (RESEND_KEY) {
      // Escape all user-supplied content before inserting into HTML
      const safeName     = escHtml(body.name.trim());
      const safeEmail    = escHtml(body.email.trim());
      const safeCompany  = body.company ? escHtml(body.company.trim()) : "";
      const safeMessage  = escHtml(body.message.trim()).replace(/\n/g, "<br>");
      const safeServices = body.services?.map(escHtml).join(", ") ?? "";

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from:    "Falcon Designs <noreply@falcondesigns.co.uk>",
          to:      ["falcondesigns001@gmail.com"],
          subject: `New enquiry from ${safeName}${safeCompany ? ` — ${safeCompany}` : ""}`,
          html: `
            <h2>New Enquiry — Falcon Designs</h2>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
            ${safeCompany ? `<p><strong>Company:</strong> ${safeCompany}</p>` : ""}
            ${safeServices ? `<p><strong>Services:</strong> ${safeServices}</p>` : ""}
            <p><strong>Message:</strong></p>
            <blockquote style="border-left:3px solid #f97316; padding-left:12px; color:#555;">
              ${safeMessage}
            </blockquote>
          `,
        }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
