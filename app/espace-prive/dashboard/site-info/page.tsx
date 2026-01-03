import { getInfoSite } from "@/data/infosite";
import { SitePanel } from "@/components/dashboard/site/site-panel";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SiteInfoPage = async () => {
  const info = await getInfoSite();

  return (
    <div className="mt-8 space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Site
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-secondary">
            Coordonnées & contact
          </h1>
          <p className="text-base text-muted-foreground">
            Consultez et mettez à jour les informations générales du site.
          </p>
        </div>
        <Link href="/espace-prive/dashboard">
          <Button variant="ghost" className="gap-2 rounded-full shadow-sm">
            ← Retour
          </Button>
        </Link>
      </header>

      <SitePanel info={info} />
    </div>
  );
};

export default SiteInfoPage;
