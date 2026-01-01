// pages/blog/[blogpostId].tsx

import { getBlogPostById } from "@/actions/blogposts/get"; // Créez une action pour récupérer un blogpost par ID.
import { PageHolder } from "@/components/page-holder";
import PageContent from "@/components/tiptap/page-content";
import { capitalizeFirstLetter } from "@/components/utils/capitalize-first.letter";
import React from "react";

type Props = {
  params: { blogpostId: string };
};

const BlogPostPage = async ({ params }: Props) => {
  const { blogpostId } = params;
  const blogpost = await getBlogPostById(blogpostId);

  if ("error" in blogpost) {
    return (
      <PageHolder>
        <p className="text-red-500">Erreur : {blogpost.error}</p>
      </PageHolder>
    );
  }

  return (
    <PageHolder>
      <h1 className="text-3xl font-bold mb-4 text-secondary">
        {capitalizeFirstLetter(blogpost.title)}
      </h1>
      <p className="text-gray-500 mb-6">
        Publié le {new Date(blogpost.createdAt).toLocaleDateString("fr-FR")}
      </p>
      <div>
        <PageContent content={blogpost.content} />{" "}
      </div>
    </PageHolder>
  );
};

export default BlogPostPage;
