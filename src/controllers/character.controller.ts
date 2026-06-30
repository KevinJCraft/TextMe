import { Response } from "express";
import { asyncHandler } from "../lib/asyncHandler";
import { AuthRequest } from "../middleware/authenticated";
import { CharacterModel } from "../models/character.model";
import { sendSuccess } from "../lib/apiResponse";
import { AppError } from "../middleware/errorHandler";
import { CreateCharacterSchema, UpdateCharacterSchema } from "../dtos/character.dtos";

export const CharacterController = {
	getAll: asyncHandler(async (req: AuthRequest, res: Response) => {
		const characters = await CharacterModel.findAll(Number(req.params.storyId));
		sendSuccess(res, characters, 200);
	}),

	getById: asyncHandler(async (req: AuthRequest, res: Response) => {
		const character = await CharacterModel.findById(Number(req.params.id));
		if (!character) throw new AppError("Character not found", 404);
		sendSuccess(res, character, 200);
	}),

	create: asyncHandler(async (req: AuthRequest, res: Response) => {
		const body = CreateCharacterSchema.parse(req.body);
		const character = await CharacterModel.create({
			...body,
			story: { connect: { id: Number(req.params.storyId) } },
		});
		sendSuccess(res, character, 201, "Character created successfully");
	}),

	update: asyncHandler(async (req: AuthRequest, res: Response) => {
		const body = UpdateCharacterSchema.parse(req.body);
		const character = await CharacterModel.update(Number(req.params.id), body);
		sendSuccess(res, character, 200);
	}),

	delete: asyncHandler(async (req: AuthRequest, res: Response) => {
		await CharacterModel.delete(Number(req.params.id));
		sendSuccess(res, null, 200, "Character deleted successfully");
	}),
};
