// Standalone layout — no Falcon nav, footer, or smooth scroll.
// Template pages build their own complete UI.
export default function TemplateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
