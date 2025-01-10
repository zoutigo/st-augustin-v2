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
}

export const EntityBlogPostList: React.FC<EntityBlogPostListProps> = ({
  title,
  blogposts,
  postsPerPage = 5, // Nombre de posts par page par défaut
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
      <CardHeader className="bg-gray-100 uppercase">
        <CardTitle className="font-bold text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {currentPosts.length > 0 ? (
          <ul className="space-y-2">
            {currentPosts.map((post) => (
              <li key={post.id}>
                <Button variant="link">{post.title}</Button>
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
