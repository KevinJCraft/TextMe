import { z } from "zod";

export const CreateMessageSchema = z.object({
	content: z.string().min(1, "Content is required").optional(),
	imgUrl: z.string().optional(),
	type: z.enum(["TEXT", "IMAGE"]).default("TEXT"),
	sentAt: z.string().min(1, "sentAt is required"),
	characterId: z.number().int(),
});
export type CreateMessageDto = z.infer<typeof CreateMessageSchema>;

export const UpdateMessageSchema = z.object({
	content: z.string().min(1, "Content is required").optional(),
	imgUrl: z.string().optional(),
	sentAt: z.string().optional(),
});
export type UpdateMessageDto = z.infer<typeof UpdateMessageSchema>;
