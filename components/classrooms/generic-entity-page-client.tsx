"use client";

import React, { useCallback, useState } from "react";
import { EntityBlogPostList } from "@/components/dashboard/entities/entity-blogposts-list";
import { PageHolder } from "@/components/page-holder";
import PageContent from "@/components/tiptap/page-content";
import { BlogPost, Entity } from "@prisma/client";
import { getPageBySlug } from "@/actions/pages/get";
import { Button } from "@/components/ui/button";
import { Spinner } from "../utils/spinner";
import { capitalizeFirstLetter } from "../utils/capitalize-first.letter";

interface GenericEntityPageClientProps {
  entity: Entity;
  blogposts: BlogPost[];
  blogpostsTitle: string;
  isClassroom: boolean;
}

export const GenericEntityPageClient: React.FC<
  GenericEntityPageClientProps
> = ({ entity, blogposts, blogpostsTitle, isClassroom }) => {
  const [showFournitureList, setShowFournitureList] = useState(false);
  const [fournitureContent, setFournitureContent] = useState<string | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handlePostSelect = useCallback((post: BlogPost) => {
    setSelectedPost({ ...post });
  }, []);

  const toggleFournitureList = async () => {
    if (!showFournitureList) {
      setIsLoading(true);

      try {
        const fournituresPage = await getPageBySlug(
          `fournitures-${entity.slug}`,
        );

        if ("error" in fournituresPage) {
          setFournitureContent(
            "Une erreur est survenue lors du chargement des fournitures.",
          );
        } else if (!fournituresPage.content) {
          setFournitureContent("Aucune donnée disponible.");
        } else {
          setFournitureContent(fournituresPage.content);
        }
      } catch (error) {
        setFournitureContent(
          "Une erreur inattendue est survenue lors du chargement des fournitures.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    setShowFournitureList(!showFournitureList);
  };

  return (
    <PageHolder>
      <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-4 lg:space-y-0">
        {/* Section principale */}
        <div className="lg:w-2/3">
          <PageContent content={entity.description} />
        </div>

        {/* Section blogposts */}
        <div className="lg:w-1/3">
          <EntityBlogPostList
            title={blogpostsTitle}
            blogposts={blogposts}
            postsPerPage={4}
            onPostSelect={handlePostSelect}
          />

          {/* Bouton et section des fournitures */}
          {isClassroom && (
            <div className="mt-4">
              <Button
                onClick={toggleFournitureList}
                className="text-secondary"
                disabled={isLoading}
              >
                {showFournitureList
                  ? "Masquer les fournitures"
                  : "Liste des fournitures"}
              </Button>

              {isLoading ? (
                <div className="flex justify-center items-center mt-4">
                  <Spinner size="h-8 w-8" className="text-primary" />
                </div>
              ) : (
                showFournitureList && (
                  <div className="mt-4 p-4 bg-gray-100 rounded">
                    <PageContent
                      content={fournitureContent || "Aucune donnée disponible."}
                    />
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* Affichage du post sélectionné */}
      {selectedPost && selectedPost.content && (
        <div className="mt-8 p-4 border border-gray-300 rounded-lg bg-white shadow-md">
          <h2 className="text-xl font-bold mb-4 text-secondary">
            {capitalizeFirstLetter(selectedPost.title)}
          </h2>
          <PageContent key={selectedPost.id} content={selectedPost.content} />
        </div>
      )}
    </PageHolder>
  );
};
