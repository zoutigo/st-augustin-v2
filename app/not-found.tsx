import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[72vh] bg-gradient-to-br from-green-50 via-white to-sky-50 text-secondary">
      <div className="mx-[8%] md:mx-[12%] py-14 md:py-16 flex flex-col gap-10">
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          <div className="relative w-full lg:w-1/2 overflow-hidden rounded-3xl shadow-xl bg-secondary text-white p-8 md:p-10">
            <div className="absolute -left-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -right-14 -bottom-14 w-44 h-44 bg-primary-light/40 rounded-full blur-3xl" />
            <p className="text-sm md:text-base uppercase tracking-[0.35em] text-primary-light">
              Oups...
            </p>
            <h1 className="text-5xl md:text-6xl font-bold mt-2">404</h1>
            <p className="mt-4 text-xl md:text-2xl font-semibold">
              Cette page n&apos;a pas encore rejoint la cour de récré.
            </p>
            <p className="mt-3 text-sm md:text-base text-white/80 leading-relaxed">
              Elle a peut-être été déplacée ou n&apos;existe pas. Retente une
              autre porte de l&apos;école ou retourne à l&apos;accueil.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/">
                <Button className="bg-primary text-secondary font-semibold hover:brightness-110">
                  Retour à l&apos;accueil
                </Button>
              </Link>
              <Link href="/classes">
                <Button className="bg-white text-secondary font-semibold border-white hover:bg-white/90">
                  Voir les classes
                </Button>
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-1/2 bg-white rounded-3xl shadow-lg p-8 md:p-10 border border-primary-light/40">
            <h2 className="text-2xl md:text-3xl font-semibold text-secondary mb-4">
              Liens rapides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Vie scolaire", href: "/vie-scolaire" },
                { label: "Cantine", href: "/vie-scolaire/cantine" },
                { label: "L'école", href: "/ecole" },
                { label: "Blog", href: "/blog" },
                { label: "Classes", href: "/classes" },
                { label: "Nous contacter", href: "/ecole/inscriptions" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center justify-between rounded-xl border border-secondary/10 bg-slate-50 px-4 py-3 hover:border-secondary/30 hover:bg-white transition"
                >
                  <span className="text-lg font-medium">{link.label}</span>
                  <span className="text-primary font-bold transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-sm text-gray-600 leading-relaxed">
              Si le problème persiste, écrivez-nous à travers la page de
              contact. Nous vous aiderons à retrouver le bon chemin.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
