import { z } from "zod";

export const BlogFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    summary: z.string().min(1, "Summary is required"),
    thumbnail_url: z.union([z.url("Invalid URL"), z.literal("")]).optional(),
    author_id: z.string().optional().or(z.literal("")),
    content: z.string().min(1, "Content is required"),
    status: z.enum(["draft", "published"]),
    likes_count: z.number().min(0).default(0).optional(),
    tags: z.array(z.string()).optional(),
});

export const BlogUpdateSchema = BlogFormSchema.partial();
