import Link from "next/link";

export const FooterCopyrigths: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <div className="bg-white py-3 px-4 border-t border-secondary/10">
      <div className="max-w-6xl mx-auto text-center text-secondary">
        <div className="flex flex-col items-center justify-center gap-2 md:flex-row md:gap-6">
          <span className="text-base sm:text-lg font-semibold">
            © {year} École Saint Augustin – Tous droits réservés
          </span>

          <span className="hidden md:block h-4 w-px bg-secondary/30" />

          <span className="text-sm sm:text-base text-secondary/80">
            Conception bénévole
          </span>

          <span className="hidden md:block h-4 w-px bg-secondary/30" />

          <Link
            href="/politique-de-confidentialite"
            className="text-sm sm:text-base font-semibold text-secondary hover:text-secondary-dark underline underline-offset-4"
          >
            Politique de confidentialité
          </Link>

          <span className="hidden md:block h-4 w-px bg-secondary/30" />

          <Link
            href="/mentions-legales"
            className="text-sm sm:text-base font-semibold text-secondary hover:text-secondary-dark underline underline-offset-4"
          >
            Mentions légales
          </Link>
        </div>
      </div>
    </div>
  );
};
