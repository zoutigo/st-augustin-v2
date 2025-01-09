import { BlogPost, Entity } from '@prisma/client';

export type BlogPostWithEntity = BlogPost & {
  entity: Entity;
};
