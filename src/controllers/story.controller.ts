import { Response } from "express";
import { asyncHandler } from "../lib/asyncHandler";
import { sendSuccess } from "../lib/apiResponse";
import { CreateStorySchema, UpdateStorySchema } from "../dtos/story.dtos";
import { StoryModel } from "../models/story.model";
import { AuthRequest } from "../middleware/authenticated";
import { AppError } from "../middleware/errorHandler";

export const StoryController = {
	create: asyncHandler(async (req: AuthRequest, res: Response) => {
		const body = CreateStorySchema.parse(req.body);

		const story = await StoryModel.create({
			...body,
			user: { connect: { id: req.userId } },
		});

		sendSuccess(res, story, 201, "Story Created Successfully");
	}),

	update: asyncHandler(async (req: AuthRequest, res: Response) => {
		const body = UpdateStorySchema.parse(req.body);
		const existing = await StoryModel.checkOwnership(Number(req.params.id), Number(req.userId));
		const story = await StoryModel.update(existing.id, body);
		sendSuccess(res, story, 200);
	}),

	getAll: asyncHandler(async (req: AuthRequest, res: Response) => {
		const stories = await StoryModel.findAll();
		sendSuccess(res, stories, 200);
	}),

	getById: asyncHandler(async (req: AuthRequest, res: Response) => {
		const story = await StoryModel.findById(Number(req.params.id));
		if (!story) throw new AppError("Story not found", 404);
		sendSuccess(res, story, 200);
	}),

	getByUserId: asyncHandler(async (req: AuthRequest, res: Response) => {
		const stories = await StoryModel.findByUserId(Number(req.userId));
		if (!stories.length) throw new AppError("Story not found", 404);
		sendSuccess(res, stories, 200);
	}),

	delete: asyncHandler(async (req: AuthRequest, res: Response) => {
		await StoryModel.checkOwnership(Number(req.params.id), Number(req.userId));
		await StoryModel.delete(Number(req.params.id));
		sendSuccess(res, null, 200, "Story deleted successfully");
	}),
};
