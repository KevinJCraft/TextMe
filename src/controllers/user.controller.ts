import { Response } from "express";
import { asyncHandler } from "../lib/asyncHandler";
import { sendSuccess } from "../lib/apiResponse";
import { AppError } from "../middleware/errorHandler";
import { AuthRequest } from "../middleware/authenticated";
import { UserModel } from "../models/user.model";
import { UpdateUserSchema } from "../dtos/user.dtos";

export const UserController = {
	update: asyncHandler(async (req: AuthRequest, res: Response) => {
		if (Number(req.params.id) !== req.userId) {
			throw new AppError("Forbidden", 403);
		}
		const body = UpdateUserSchema.parse(req.body);
		const user = await UserModel.update(Number(req.params.id), body);
		sendSuccess(res, user, 200);
	}),

	delete: asyncHandler(async (req: AuthRequest, res: Response) => {
		if (Number(req.params.id) !== req.userId) {
			throw new AppError("Forbidden", 403);
		}
		await UserModel.delete(Number(req.params.id));
		sendSuccess(res, null, 200, "Account deleted successfully");
	}),
};
