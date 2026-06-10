import { z } from "zod";

export const CreateStorySchema = z.object({
	title: z.string().min(1, "Title is required"),
});

export type CreateStoryDto = z.infer<typeof CreateStorySchema>;

export const UpdateStorySchema = z.object({
	title: z.string().min(1, "Title is required"),
});

export type UpdateStoryDto = z.infer<typeof UpdateStorySchema>;
