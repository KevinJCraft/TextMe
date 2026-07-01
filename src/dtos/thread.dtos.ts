import { z } from "zod";

export const CreateThreadSchema = z.object({
	title: z.string().min(1, "Title is required"),
});
export type CreateThreadDto = z.infer<typeof CreateThreadSchema>;

export const UpdateThreadSchema = z.object({
	title: z.string().min(1, "Title is required").optional(),
});
export type UpdateThreadDto = z.infer<typeof UpdateThreadSchema>;
