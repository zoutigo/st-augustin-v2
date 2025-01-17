// app/espace-prive/dashboard/pages/page.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DataTable } from '@/components/data-table';
import { getAllBlogPosts } from '@/actions/blogposts/get';
import { BlogpostsColumns } from '@/components/dashboard/bloposts/blogposts-colums';
import { BlogPostWithEntity } from '@/types/model';

const BlogpostPage = async () => {
  let blogpost: BlogPostWithEntity[] = [];
  let error: string | null = null;

  try {
    const result = await getAllBlogPosts();
    if ('error' in result) {
      error = result.error;
    } else {
      blogpost = result;
    }
  } catch (err) {
    error = (err as Error).message;
  }

  return (
    <div>
      <div className="flex ">
        <h1 className="text-2xl font-bold mb-4 flex-grow">Liste des entités</h1>
        <Button variant={'default'} className="text-secondary text-xl">
          <Link href={'/espace-prive/dashboard/blogposts/create'} passHref>
            Créer un post
          </Link>
        </Button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <DataTable data={blogpost} columns={BlogpostsColumns} />
    </div>
  );
};

export default BlogpostPage;
