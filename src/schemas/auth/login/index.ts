import { z } from "zod";

export const LoginFormSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string(),
});
