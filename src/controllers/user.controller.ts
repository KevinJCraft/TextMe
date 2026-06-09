import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { asyncHandler } from "../lib/asyncHandler";
import { AppError } from "../middleware/errorHandler";
import { UpdateUserSchema } from "../dtos/user.dtos";
import { sendSuccess } from "../lib/apiResponse";

export const UserController = {
	getAll: asyncHandler(async (_req: Request, res: Response) => {
		const users = await UserModel.findAll();
		sendSuccess(res, users);
	}),

	getById: asyncHandler(async (req: Request, res: Response) => {
		const user = await UserModel.findById(Number(req.params.id));
		if (!user) throw new AppError("User not found", 404);
		sendSuccess(res, user);
	}),

	update: asyncHandler(async (req: Request, res: Response) => {
		const body = UpdateUserSchema.parse(req.body);
		const user = await UserModel.update(Number(req.params.id), body);
		sendSuccess(res, user);
	}),

	delete: asyncHandler(async (req: Request, res: Response) => {
		await UserModel.delete(Number(req.params.id));
		sendSuccess(res, null, 200, "User deleted successfully");
	}),
};
