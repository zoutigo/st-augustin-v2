import React from "react";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type Props = {};

const Dashboard = async (props: Props) => {
  const [entities, totalPosts, activeModal, usersByRole, usersByGrade] =
    await Promise.all([
      db.entity.findMany({
        select: {
          id: true,
          name: true,
          slug: true,
          _count: { select: { blogpages: true } },
        },
        orderBy: { name: "asc" },
      }),
      db.blogPost.count(),
      db.modal.findFirst({
        where: {
          startDate: { lte: new Date() },
          endDate: { gte: new Date() },
        },
        orderBy: { startDate: "desc" },
      }),
      db.user.groupBy({
        by: ["role"],
        _count: { role: true },
      }),
      db.user.groupBy({ by: ["grade"], _count: { grade: true } }),
    ]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total articles</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{totalPosts}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Modale active</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            {activeModal ? (
              <div>
                <div className="font-semibold">{activeModal.title}</div>
                <div>
                  du{" "}
                  {new Date(activeModal.startDate).toLocaleDateString("fr-FR")}{" "}
                  au {new Date(activeModal.endDate).toLocaleDateString("fr-FR")}
                </div>
                <Link
                  className="text-primary underline"
                  href={`/espace-prive/dashboard/modals/${activeModal.id}/edit`}
                >
                  Modifier
                </Link>
              </div>
            ) : (
              <div>Aucune modale active</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Utilisateurs (par grade)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {["ADMIN", "MANAGER", "MODERATOR", "USERS"].map((label) => {
                const key = label === "USERS" ? "NONE" : label;
                const found = usersByGrade.find((x) => String(x.grade) === key);
                const count = found?._count.grade || 0;
                const colorClass =
                  label === "ADMIN"
                    ? "bg-destructive/15 text-destructive"
                    : label === "MANAGER"
                      ? "bg-primary/15 text-primary"
                      : label === "MODERATOR"
                        ? "bg-secondary/15 text-secondary"
                        : "bg-muted text-foreground";
                return (
                  <span
                    key={label}
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${colorClass}`}
                  >
                    {label}
                    <span className="inline-flex items-center justify-center rounded-full bg-background border px-2 py-0.5 text-[10px]">
                      {count}
                    </span>
                  </span>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Entités</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {entities.map((e) => {
              const roleKey = e.slug.toUpperCase();
              const usersForEntity = usersByRole.find(
                (r) => String(r.role) === roleKey,
              );
              const usersCount = usersForEntity?._count.role || 0;
              return (
                <div
                  key={e.id}
                  className="flex items-center justify-between border rounded p-3"
                >
                  <div>
                    <div className="font-medium">{e.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {e.slug}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">
                      Articles
                    </div>
                    <div className="text-lg font-semibold">
                      {e._count.blogpages}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Users
                    </div>
                    <div className="text-lg font-semibold">{usersCount}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
