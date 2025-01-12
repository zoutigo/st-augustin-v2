'use client';

import React, { useState } from 'react';
import { BlogPost } from '@prisma/client';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import Link from 'next/link';
import { CustomPagination } from '../utils/custom-pagination';
import { capitalizeFirstLetter } from '../utils/capitalize-first.letter';

interface BlogPostListProps {
  blogposts: BlogPost[];
}

export const BlogPostList: React.FC<BlogPostListProps> = ({ blogposts }) => {
  const postsPerPage = 6; // Articles par page
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(blogposts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogposts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {currentPosts.map((post) => (
          <Card key={post.id} className="w-full">
            <Link href={`/blog/${post.id}`}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-secondary hover:underline">
                  {capitalizeFirstLetter(post.title)}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  Publié le{' '}
                  {new Date(post.createdAt).toLocaleDateString('fr-FR')}
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6">
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};
