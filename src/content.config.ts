import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const postSchema = z.object({
  title: z.string(),
  authors: z.array(z.object({
    name: z.string(),
    email: z.string().email(),
  })).min(1),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  cover: z.string().optional(),
  summary: z.string(),
  doi: z.string().optional(),
});

const newsSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  summary: z.string(),
  cover: z.string().optional(),
  source: z.string().optional(),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: postSchema,
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/news' }),
  schema: newsSchema,
});

export const collections = { posts, news };
