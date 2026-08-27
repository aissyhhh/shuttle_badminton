import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Articles } from "@/components/Articles";
import { Tournaments } from "@/components/Tournaments";
import { RecentMatch} from "@/components/RecentMatch";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <div className="mx-auto flex gap-8 px-8 py-13">
        <Articles />
        <Tournaments />
      </div>
      <RecentMatch />
      <Footer />
    </main>
  );
}