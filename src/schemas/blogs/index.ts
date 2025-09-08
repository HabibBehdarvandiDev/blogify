import { z } from "zod";

export const BlogFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    summary: z.string().min(1, "Summary is required"),
    thumbnail_url: z.string().url("Invalid URL").optional(),
    content: z.string().min(1, "Content is required"),
    author_id: z.uuid("Invalid author ID"),
    status: z.enum(["draft", "published"]).default("draft"),
    likes_count: z.number().min(0).default(0).optional(),
    tags: z.array(z.string()).optional(),
});

export const BlogUpdateSchema = BlogFormSchema.partial();
