import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
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

    // ── 1. Write to Supabase (dashboard CS Agent reads from here) ──────────
    const supabase = getSupabase();
    const { error: dbError } = await supabase.from("contact_leads").insert({
      name:     body.name,
      email:    body.email,
      company:  body.company ?? null,
      message:  body.message,
      services: body.services ?? [],
      source:   "falcon-designs-website",
      status:   "new",
    });

    if (dbError) console.error("Supabase insert error:", dbError);

    // ── 2. Send notification email via Resend ──────────────────────────────
    const RESEND_KEY = process.env.RESEND_API_KEY;
    if (RESEND_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from:    "Falcon Designs <noreply@falcondesigns.co.uk>",
          to:      ["falcondesigns001@gmail.com"],
          subject: `New enquiry from ${body.name}${body.company ? ` — ${body.company}` : ""}`,
          html: `
            <h2>New Enquiry — Falcon Designs</h2>
            <p><strong>Name:</strong> ${body.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${body.email}">${body.email}</a></p>
            ${body.company ? `<p><strong>Company:</strong> ${body.company}</p>` : ""}
            ${body.services?.length ? `<p><strong>Services:</strong> ${body.services.join(", ")}</p>` : ""}
            <p><strong>Message:</strong></p>
            <blockquote style="border-left:3px solid #f97316; padding-left:12px; color:#555;">
              ${body.message.replace(/\n/g, "<br>")}
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
