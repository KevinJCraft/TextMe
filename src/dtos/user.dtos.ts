import { z } from "zod";

// Create
export const CreateUserSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.email("Invalid email address"),
});
export type CreateUserDto = z.infer<typeof CreateUserSchema>;

// Update
export const UpdateUserSchema = z.object({
	name: z.string().min(1, "Name is required").optional(),
	email: z.email("Invalid email address").optional(),
});
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
