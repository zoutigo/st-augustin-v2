import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export const LandingActivity = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary via-white to-secondary/10 text-secondary py-10 md:py-14">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-10 top-4 w-32 h-32 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 w-40 h-40 rounded-full bg-primary/20 blur-3xl" />
      </div>
      <div className="landing-container mx-auto flex flex-col gap-6 md:gap-8 relative">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-secondary/70">
              En direct de l&apos;école
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-cursive text-secondary">
              Restez connectés à l&apos;activité de l&apos;école
            </h2>
            <p className="text-base md:text-lg text-secondary/80 mt-2 max-w-2xl">
              Retrouvez les moments forts, l&apos;agenda et les ressources pour
              suivre la vie scolaire au quotidien.
            </p>
          </div>
          <Link href="/blog">
            <Button className="inline-flex items-center gap-2 bg-secondary text-white hover:brightness-110">
              Visiter le blog
              <FiArrowRight />
            </Button>
          </Link>
        </header>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-6 md:p-8 text-secondary">
          <p className="text-base md:text-lg leading-relaxed">
            Pour toute nouvelle inscription, merci de contacter le secrétariat
            par téléphone ou par email. Les coordonnées sont disponibles dans le
            pied de page du site.
          </p>
        </div>
      </div>
    </section>
  );
};
