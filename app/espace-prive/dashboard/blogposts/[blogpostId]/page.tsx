import React from "react";
import PageContent from "@/components/tiptap/page-content";
import { BlogPostWithEntity } from "@/types/model";
import { getBlogPostById } from "@/actions/blogposts/get";

interface BlogpostDetailPageProps {
  params: {
    blogpostId: string;
  };
}

const BlogpostDetailPage = async ({ params }: BlogpostDetailPageProps) => {
  let blogpost: BlogPostWithEntity | null = null;
  let error: string | null = null;

  try {
    const result = await getBlogPostById(params.blogpostId);
    if ("error" in result) {
      error = result.error;
    } else {
      blogpost = result as BlogPostWithEntity;
    }
  } catch (err) {
    error = (err as Error).message;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!blogpost) {
    return <p className="text-red-500">Blog post not found</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{blogpost.title}</h1>
      <h2 className="text-2xl font-bold mb-4">{blogpost.entity.name}</h2>
      <PageContent content={blogpost.content} />

      <p>Created at: {new Date(blogpost.createdAt).toLocaleDateString()}</p>
      <p>Updated at: {new Date(blogpost.updatedAt).toLocaleDateString()}</p>
    </div>
  );
};

export default BlogpostDetailPage;
