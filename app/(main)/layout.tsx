import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MouseGlow from "@/components/MouseGlow";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <MouseGlow />
      <Nav />
      <main>{children}</main>
      <Footer />
    </SmoothScroll>
  );
}
