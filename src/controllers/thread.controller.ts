import { Response } from "express";
import { asyncHandler } from "../lib/asyncHandler";
import { sendSuccess } from "../lib/apiResponse";
import { AppError } from "../middleware/errorHandler";
import { AuthRequest } from "../middleware/authenticated";
import { ThreadModel } from "../models/thread.model";
import { CreateThreadSchema, UpdateThreadSchema } from "../dtos/thread.dtos";

export const ThreadController = {
	getAll: asyncHandler(async (req: AuthRequest, res: Response) => {
		const threads = await ThreadModel.findAll(Number(req.params.storyId));
		sendSuccess(res, threads, 200);
	}),

	getById: asyncHandler(async (req: AuthRequest, res: Response) => {
		const thread = await ThreadModel.findById(Number(req.params.id));
		if (!thread) throw new AppError("Thread not found", 404);
		sendSuccess(res, thread, 200);
	}),

	create: asyncHandler(async (req: AuthRequest, res: Response) => {
		const body = CreateThreadSchema.parse(req.body);
		const thread = await ThreadModel.create({
			...body,
			story: { connect: { id: Number(req.params.storyId) } },
		});
		sendSuccess(res, thread, 201, "Thread created successfully");
	}),

	update: asyncHandler(async (req: AuthRequest, res: Response) => {
		const body = UpdateThreadSchema.parse(req.body);
		const thread = await ThreadModel.update(Number(req.params.id), body);
		sendSuccess(res, thread, 200);
	}),

	delete: asyncHandler(async (req: AuthRequest, res: Response) => {
		await ThreadModel.delete(Number(req.params.id));
		sendSuccess(res, null, 200, "Thread deleted successfully");
	}),

	addCharacter: asyncHandler(async (req: AuthRequest, res: Response) => {
		const { characterId } = req.body;
		await ThreadModel.addCharacter(Number(req.params.id), Number(characterId));
		sendSuccess(res, null, 200, "Character added to thread");
	}),

	removeCharacter: asyncHandler(async (req: AuthRequest, res: Response) => {
		const { characterId } = req.body;
		await ThreadModel.removeCharacter(Number(req.params.id), Number(characterId));
		sendSuccess(res, null, 200, "Character removed from thread");
	}),
};
