import React from 'react';
import { getAllBlogPosts } from '@/actions/blogposts/get';
import { PageHolder } from '@/components/page-holder';
import { BlogPost } from '@prisma/client';
import { BlogPostList } from '@/components/blog/blogpost-list';

type Props = {};

const BlogPage: React.FC<Props> = async () => {
  const blogposts: BlogPost[] | { error: string } = await getAllBlogPosts();

  if ('error' in blogposts) {
    return (
      <PageHolder>
        <p className="text-red-500">Erreur : {blogposts.error}</p>
      </PageHolder>
    );
  }

  if (blogposts.length === 0) {
    return (
      <PageHolder>
        <p className="text-red-500">Aucun article de blog disponible</p>
      </PageHolder>
    );
  }

  return (
    <PageHolder>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold mb-6 text-secondary">
          Les articles de blog
        </h1>
        {/* Passe les données au composant client */}
        <BlogPostList blogposts={blogposts} />
      </div>
    </PageHolder>
  );
};

export default BlogPage;
