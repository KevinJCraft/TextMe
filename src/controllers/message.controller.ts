import { Response } from "express";
import { asyncHandler } from "../lib/asyncHandler";
import { sendSuccess } from "../lib/apiResponse";
import { AppError } from "../middleware/errorHandler";
import { AuthRequest } from "../middleware/authenticated";
import { MessageModel } from "../models/message.model";
import { CreateMessageSchema, UpdateMessageSchema } from "../dtos/message.dtos";

export const MessageController = {
	getAll: asyncHandler(async (req: AuthRequest, res: Response) => {
		const messages = await MessageModel.findAll(Number(req.params.threadId));
		sendSuccess(res, messages, 200);
	}),

	getById: asyncHandler(async (req: AuthRequest, res: Response) => {
		const message = await MessageModel.findById(Number(req.params.id));
		if (!message) throw new AppError("Message not found", 404);
		sendSuccess(res, message, 200);
	}),

	create: asyncHandler(async (req: AuthRequest, res: Response) => {
		const body = CreateMessageSchema.parse(req.body);
		const { characterId, sentAt, ...rest } = body;

		const message = await MessageModel.create({
			...rest,
			sentAt: new Date(sentAt),
			thread: { connect: { id: Number(req.params.threadId) } },
			character: { connect: { id: characterId } },
		});
		sendSuccess(res, message, 201, "Message created successfully");
	}),

	update: asyncHandler(async (req: AuthRequest, res: Response) => {
		const body = UpdateMessageSchema.parse(req.body);
		const message = await MessageModel.update(Number(req.params.id), {
			...body,
			...(body.sentAt && { sentAt: new Date(body.sentAt) }),
		});
		sendSuccess(res, message, 200);
	}),

	delete: asyncHandler(async (req: AuthRequest, res: Response) => {
		await MessageModel.delete(Number(req.params.id));
		sendSuccess(res, null, 200, "Message deleted successfully");
	}),
};
