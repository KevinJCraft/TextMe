import { z } from "zod";

export const CreateCharacterSchema = z.object({
	name: z.string().min(1, "Name is required"),
	color: z.string().optional(),
});
export type CreateCharacterDto = z.infer<typeof CreateCharacterSchema>;

export const UpdateCharacterSchema = z.object({
	name: z.string().min(1, "Name is required").optional(),
	color: z.string().optional(),
});
export type UpdateCharacterDto = z.infer<typeof UpdateCharacterSchema>;
