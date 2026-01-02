// app/espace-prive/dashboard/pages/page.tsx
import React from "react";
import { Page } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, FileText, BookOpen, Eye, PenLine } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { PageColumns } from "@/components/dashboard/page/page-colums";
import { getAllPages } from "@/actions/pages/get";
import { Card, CardContent } from "@/components/ui/card";
import { ActionIconButton } from "@/components/ui/action-icon-button";

const PageList = async () => {
  let pagesData: Page[] = [];
  let error: string | null = null;

  try {
    const result = await getAllPages();
    if ("error" in result) {
      error = result.error;
    } else {
      pagesData = result;
    }
  } catch (err) {
    error = (err as Error).message;
  }

  const published = pagesData.filter((p) => p.release).length;
  const drafts = pagesData.length - published;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Tableau de bord
          </p>
          <h1 className="text-4xl font-black text-secondary">Pages du site</h1>
          <p className="text-base text-muted-foreground">
            Ajoutez, organisez et publiez vos pages institutionnelles en un clin
            d&apos;œil.
          </p>
        </div>
        <Link href={"/espace-prive/dashboard"}>
          <Button variant="ghost" className="gap-2 rounded-full shadow-sm">
            ← Retour
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-slate-50 via-white to-blue-50 shadow-sm border-slate-200">
          <CardContent className="p-4 flex items-center gap-3">
            <FileText className="h-10 w-10 text-blue-600" />
            <div>
              <p className="text-sm text-muted-foreground">Pages totales</p>
              <p className="text-2xl font-semibold text-secondary">
                {pagesData.length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-50 via-white to-emerald-100 shadow-sm border-slate-200">
          <CardContent className="p-4 flex items-center gap-3">
            <Eye className="h-10 w-10 text-emerald-600" />
            <div>
              <p className="text-sm text-muted-foreground">Publiées</p>
              <p className="text-2xl font-semibold text-secondary">
                {published}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 via-white to-amber-100 shadow-sm border-slate-200">
          <CardContent className="p-4 flex items-center gap-3">
            <PenLine className="h-10 w-10 text-amber-600" />
            <div>
              <p className="text-sm text-muted-foreground">Brouillons</p>
              <p className="text-2xl font-semibold text-secondary">{drafts}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-indigo-50 via-white to-indigo-100 shadow-sm border-slate-200">
          <CardContent className="p-4 flex items-center gap-3">
            <BookOpen className="h-10 w-10 text-indigo-600" />
            <div>
              <p className="text-sm text-muted-foreground">
                Dernière mise à jour
              </p>
              <p className="text-lg font-semibold text-secondary">
                {pagesData[0]?.updatedAt
                  ? new Date(pagesData[0].updatedAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-4 sm:p-6 space-y-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                Gestion des pages
              </p>
              <h2 className="text-2xl font-semibold text-secondary">
                Liste des pages
              </h2>
            </div>
            <Link href={"/espace-prive/dashboard/pages/create"} passHref>
              <ActionIconButton type="add" aria-label="Ajouter une page" />
            </Link>
          </div>
          <DataTable data={pagesData} columns={PageColumns} />
        </CardContent>
      </Card>
    </div>
  );
};

export default PageList;
