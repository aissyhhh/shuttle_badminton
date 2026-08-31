import { Navbar } from "@/components/Navbar";
import { ArticleHero } from "@/components/ArticleHero";
import { ArticleSection } from "@/components/ArticleSection";
import { Footer } from "@/components/Footer";

export default function ArtikelPage() {
  return (
    <main>
      <Navbar />
      <ArticleHero />
      <ArticleSection />
      <Footer />
    </main>
  );
}