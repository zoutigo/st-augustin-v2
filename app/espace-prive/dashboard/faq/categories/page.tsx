import { getAllFaqCategories } from "@/actions/faq/categories";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ActionIconButton } from "@/components/ui/action-icon-button";
import { BackButton } from "@/components/dashboard/back-button";

const FaqCategoriesPage = async () => {
  const categories = await getAllFaqCategories();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BackButton href="/espace-prive/dashboard/faq" />
          <h1 className="text-4xl font-bold text-secondary">Catégories FAQ</h1>
        </div>
        <Link href="/espace-prive/dashboard/faq/categories/create">
          <ActionIconButton type="add" aria-label="Ajouter une catégorie" />
        </Link>
      </div>
      <Card>
        <CardContent className="p-6 divide-y">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="py-4 flex items-center justify-between"
            >
              <div>
                <p className="text-xl font-semibold text-secondary">
                  {cat.name}
                </p>
                <p className="text-lg text-muted-foreground">{cat.slug}</p>
              </div>
              <Link
                href={`/espace-prive/dashboard/faq/categories/${cat.id}/edit`}
              >
                <ActionIconButton
                  type="edit"
                  aria-label="Modifier la catégorie"
                />
              </Link>
            </div>
          ))}
          {categories.length === 0 && (
            <p className="text-lg text-muted-foreground">Aucune catégorie.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FaqCategoriesPage;
