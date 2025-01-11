'use client';

import React, { useState } from 'react';
import { BlogPost } from '@prisma/client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { CustomPagination } from '@/components/utils/custom-pagination';

interface EntityBlogPostListProps {
  title: string;
  blogposts: BlogPost[];
  postsPerPage?: number;
  onPostSelect?: (post: BlogPost) => void; // Nouveau gestionnaire
}

export const EntityBlogPostList: React.FC<EntityBlogPostListProps> = ({
  title,
  blogposts,
  postsPerPage = 5, // Nombre de posts par page par défaut
  onPostSelect,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calcul des limites pour afficher les posts de la page courante
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogposts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(blogposts.length / postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Card className="w-full">
      <CardHeader className="bg-gray-100 uppercase font-cursive">
        <CardTitle className="font-bold text-lg text-secondary">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {currentPosts.length > 0 ? (
          <ul className="space-y-2 p-2">
            {currentPosts.map((post) => (
              <li key={post.id}>
                <Button
                  variant="link"
                  onClick={() => onPostSelect && onPostSelect(post)}
                  className="min-w-full text-secondary hover:bg-secondary-ligth  flex items-center justify-start gap-2 px-4"
                >
                  <span className="w-2 h-2 bg-secondary rounded-full"></span>{' '}
                  {/* Marqueur de liste */}
                  <span className="text-left">{post.title}</span>
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun blogpost disponible.</p>
        )}
      </CardContent>
      <div className="mt-4 flex justify-center">
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </Card>
  );
};
