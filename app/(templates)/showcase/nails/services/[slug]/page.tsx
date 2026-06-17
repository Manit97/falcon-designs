import { notFound } from "next/navigation";
import { SERVICES } from "../../lib/data";
import ServiceDetailClient from "./ServiceDetailClient";

export async function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find(s => s.slug === slug);
  if (!service) notFound();
  return <ServiceDetailClient service={service!} />;
}
