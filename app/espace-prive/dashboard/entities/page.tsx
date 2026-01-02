// app/espace-prive/dashboard/pages/page.tsx
import React from "react";
import { Entity } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, BookOpen, Users, FileText } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { getAllEntities } from "@/actions/entity/get";
import { EntitiesColumns } from "@/components/dashboard/entities/entities-colums";
import { Card, CardContent } from "@/components/ui/card";
import { ActionIconButton } from "@/components/ui/action-icon-button";
import { BackButton } from "@/components/dashboard/back-button";

const EntitiesPage = async () => {
  let entities: Entity[] = [];
  let error: string | null = null;

  try {
    entities = await getAllEntities();
  } catch (err) {
    error = (err as Error).message;
  }

  const total = entities.length;
  const lastUpdated = entities
    .map((e) => e.updatedAt)
    .sort((a, b) => (a > b ? -1 : 1))[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Tableau de bord
          </p>
          <h1 className="text-4xl font-black text-secondary">Entités</h1>
          <p className="text-base text-muted-foreground">
            Gérez les pages des classes et sections avec la même ergonomie que
            les pages du site.
          </p>
        </div>
        <BackButton href="/espace-prive/dashboard" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-gradient-to-br from-slate-50 via-white to-blue-50 shadow-sm border-slate-200">
          <CardContent className="p-4 flex items-center gap-3">
            <FileText className="h-10 w-10 text-blue-600" />
            <div>
              <p className="text-sm text-muted-foreground">Entités totales</p>
              <p className="text-2xl font-semibold text-secondary">{total}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-50 via-white to-emerald-100 shadow-sm border-slate-200">
          <CardContent className="p-4 flex items-center gap-3">
            <Users className="h-10 w-10 text-emerald-600" />
            <div>
              <p className="text-sm text-muted-foreground">Classes/sections</p>
              <p className="text-2xl font-semibold text-secondary">{total}</p>
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
                {lastUpdated
                  ? new Date(lastUpdated).toLocaleDateString()
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
                Gestion des entités
              </p>
              <h2 className="text-2xl font-semibold text-secondary">
                Liste des entités
              </h2>
            </div>
            <Link href={"/espace-prive/dashboard/entities/create"} passHref>
              <ActionIconButton type="add" aria-label="Ajouter une entité" />
            </Link>
          </div>
          <DataTable data={entities} columns={EntitiesColumns} />
        </CardContent>
      </Card>
    </div>
  );
};

export default EntitiesPage;
