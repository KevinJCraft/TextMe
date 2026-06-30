import { Request, Response } from "express";
import { asyncHandler } from "../lib/asyncHandler";
import { LoginSchema, RegisterSchema } from "../dtos/auth.dtos";
import { AuthModel } from "../models/auth.model";
import { AppError } from "../middleware/errorHandler";
import bcrypt from "bcrypt";
import { config } from "../config";
import jwt from "jsonwebtoken";
import { sendSuccess } from "../lib/apiResponse";

export const AuthController = {
	register: asyncHandler(async (req: Request, res: Response) => {
		const body = RegisterSchema.parse(req.body);

		const existing = await AuthModel.findByEmail(body.email);
		if (existing) throw new AppError("Email already in use", 400);

		const hashedPassword = await bcrypt.hash(body.password, 10);
		const user = await AuthModel.createUser({
			name: body.name,
			email: body.email,
			password: hashedPassword,
		});

		const token = jwt.sign({ id: user.id }, config.jwt.secret, { expiresIn: "7d" });

		sendSuccess(res, { token }, 201, "User registered successfully");
	}),

	login: asyncHandler(async (req: Request, res: Response) => {
		const body = LoginSchema.parse(req.body);

		const user = await AuthModel.findByEmail(body.email);
		if (!user) throw new AppError("Invalid Credentials", 401);

		const valid = await bcrypt.compare(body.password, user.password);
		if (!valid) throw new AppError("Invalid Credentials", 401);

		const token = jwt.sign({ id: user.id }, config.jwt.secret, { expiresIn: "7d" });

		sendSuccess(res, { token }, 200, "Login successful");
	}),
};
