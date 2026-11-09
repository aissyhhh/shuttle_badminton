import Image from "next/image";

export function ArticleHero() {
    return (
        <section className="relative h-67.5 overflow-hidden">
            <Image src="/heroarticles.png" alt="News Hero" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative mx-auto flex h-full items-center justify-end px-10 mt-15">
                <div className="text-right">
                    <h1 className="text-4xl font-bold text-white">
                        NEWS
                    </h1>

                    <p className="mt-2 text-sm text-white">
                        Get the latest information on the world of badminton, <br /> tournaments, athletes, and other activities.
                    </p>
                </div>
            </div>
        </section>
    );
}