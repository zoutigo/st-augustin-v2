import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-[12%] my-10 bg-secondary/5 border border-secondary/10 rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-secondary mb-2">
        Page non trouvée
      </h2>
      <p className="text-secondary/80 mb-4">
        Le contenu demandé n&apos;est pas disponible pour le moment. Essayez
        depuis la navigation ou retournez à l&apos;accueil.
      </p>
      <Link href="/" className="text-primary font-semibold">
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
