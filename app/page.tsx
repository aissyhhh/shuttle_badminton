import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LatestArticles } from "@/components/ArticleLatest";
import { Tournaments } from "@/components/Tournaments";
import { RecentMatch } from "@/components/RecentMatch";
import { Footer } from "@/components/Footer";

export default function Home() {
    return (
        <main className="w-full overflow-x-hidden">
            <Navbar />
            <Hero />

            <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:flex-row lg:gap-10 lg:px-8">
                <div className="min-w-0 flex-1">
                    <LatestArticles />
                </div>

                <div className="w-full lg:w-[400px] xl:w-[480px] lg:shrink-0">
                    <Tournaments />
                </div>
            </div>

            <RecentMatch />
            <Footer />
        </main>
    );
}