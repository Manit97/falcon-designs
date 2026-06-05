import { motion } from "framer-motion";

const EXPO = [0.16, 1, 0.3, 1] as const;

export const metadata = {
  title: "Privacy Policy — Falcon Designs",
  description: "Privacy Policy and GDPR compliance for Falcon Designs.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-fd-black pt-20">
      {/* Header */}
      <section className="py-20 px-6 md:px-10 border-b border-fd-border">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display font-extrabold text-fd-white mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
            Privacy Policy
          </h1>
          <p className="font-body text-fd-dim text-sm">
            Last updated: June 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 md:px-10">
        <div className="max-w-3xl mx-auto space-y-8 font-body text-sm text-fd-dim">

          <div>
            <h2 className="font-display font-semibold text-fd-white mb-4">1. Introduction</h2>
            <p>
              Falcon Designs (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the Falcon Designs website. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
          </div>

          <div>
            <h2 className="font-display font-semibold text-fd-white mb-4">2. Information We Collect</h2>
            <p className="mb-3">We may collect information about you in a variety of ways. The information we may collect on the site includes:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><span className="font-semibold text-fd-white">Personal Data:</span> Name, email address, phone number, company name, and any other information you provide via contact forms.</li>
              <li><span className="font-semibold text-fd-white">Technical Data:</span> IP address, browser type, operating system, pages visited, and time spent on pages (via analytics).</li>
              <li><span className="font-semibold text-fd-white">Cookie Data:</span> Information stored in your browser to remember your preferences and consent choices.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display font-semibold text-fd-white mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>To respond to your inquiries and provide customer support</li>
              <li>To send you promotional communications (only with your consent)</li>
              <li>To analyze website usage and improve our services</li>
              <li>To comply with legal obligations</li>
              <li>To prevent fraud and ensure security</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display font-semibold text-fd-white mb-4">4. Cookies</h2>
            <p>
              We use cookies to enhance your browsing experience and remember your consent choices. Most browsers allow you to refuse cookies and to alert you when cookies are being sent. However, refusing cookies may limit your ability to use certain features of the website.
            </p>
          </div>

          <div>
            <h2 className="font-display font-semibold text-fd-white mb-4">5. GDPR Compliance</h2>
            <p className="mb-3">
              We are committed to complying with the General Data Protection Regulation (GDPR). You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Restrict processing of your data</li>
              <li>Opt out of marketing communications</li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, please contact us at{" "}
              <a href="mailto:falcondesigns001@gmail.com" className="text-fd-orange hover:underline">
                falcondesigns001@gmail.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="font-display font-semibold text-fd-white mb-4">6. Data Retention</h2>
            <p>
              We retain your personal data only as long as necessary to fulfill the purposes for which we collected it, or as required by law. Typically, contact form submissions are retained for up to 2 years.
            </p>
          </div>

          <div>
            <h2 className="font-display font-semibold text-fd-white mb-4">7. Third-Party Services</h2>
            <p>
              Our website may use third-party services for analytics and communication (such as Resend for email). These providers have their own privacy policies. We encourage you to review them.
            </p>
          </div>

          <div>
            <h2 className="font-display font-semibold text-fd-white mb-4">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by updating the &quot;Last Updated&quot; date at the top of this policy.
            </p>
          </div>

          <div>
            <h2 className="font-display font-semibold text-fd-white mb-4">9. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our privacy practices, please contact us at{" "}
              <a href="mailto:falcondesigns001@gmail.com" className="text-fd-orange hover:underline">
                falcondesigns001@gmail.com
              </a>
              .
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
