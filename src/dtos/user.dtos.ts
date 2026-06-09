import { z } from "zod";

// Update
export const UpdateUserSchema = z.object({
	name: z.string().min(1, "Name is required").optional(),
	email: z.email("Invalid email address").optional(),
});
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
