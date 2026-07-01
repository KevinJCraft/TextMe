import { z } from "zod";

export const CreateStorySchema = z.object({
	title: z.string().min(1, "Title is required"),
	content: z.string().optional(),
});
export type CreateStoryDto = z.infer<typeof CreateStorySchema>;

export const UpdateStorySchema = z.object({
	title: z.string().min(1, "Title is required").optional(),
	content: z.string().optional(),
});

export type UpdateStoryDto = z.infer<typeof UpdateStorySchema>;
