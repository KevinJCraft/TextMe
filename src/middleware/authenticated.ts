import { NextFunction, Request, Response } from "express";
import { AppError } from "./errorHandler";
import jwt from "jsonwebtoken";
import { config } from "../config";

export interface AuthRequest extends Request {
	userId?: number;
}

export const authenticate = (req: AuthRequest, _res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new AppError("Unauthorized", 401);
	}

	const token = authHeader.split(" ")[1];
	if (!token) throw new AppError("Unauthorized", 401);

	try {
		const decoded = jwt.verify(token, config.jwt.secret) as unknown as { id: number };
		req.userId = decoded.id;
		next();
	} catch {
		throw new AppError("Invalid or expired token", 401);
	}
};
