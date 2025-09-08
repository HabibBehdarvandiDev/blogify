import { z } from "zod";

export const tagSchema = z.object({
    name: z
        .string()
        .min(1, "Tag name is required")
        .max(50, "Tag name is too long"),
    description: z.string().max(255, "Description is too long").optional(),
});

export const tagUpdateSchema = tagSchema.partial();
