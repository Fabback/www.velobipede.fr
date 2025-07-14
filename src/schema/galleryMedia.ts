import { z } from "zod";

export const mediaSchema = z.object({
    id: z.string().optional(),
    title: z.string(),
    description: z.string().optional(),
    
})

export type media = z.infer<typeof mediaSchema>;