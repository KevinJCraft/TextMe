import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { asyncHandler } from "../lib/asyncHandler";
import { AppError } from "../middleware/errorHandler";

export const UserController = {
	getAll: asyncHandler(async (_req: Request, res: Response) => {
		const users = await UserModel.findAll();
		res.json(users);
	}),

	getById: asyncHandler(async (req: Request, res: Response) => {
		const user = await UserModel.findById(Number(req.params.id));
		if (!user) throw new AppError("User not found", 404);
		res.json(user);
	}),

	create: asyncHandler(async (req: Request, res: Response) => {
		const user = await UserModel.create(req.body);
		res.status(201).json(user);
	}),

	update: asyncHandler(async (req: Request, res: Response) => {
		const user = await UserModel.update(Number(req.params.id), req.body);
		res.json(user);
	}),

	delete: asyncHandler(async (req: Request, res: Response) => {
		await UserModel.delete(Number(req.params.id));
		res.status(204).send();
	}),
};
