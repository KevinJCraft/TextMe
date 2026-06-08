import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export class AppError extends Error {
	statusCode: number;

	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
	}
}

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
	// Zod validation error
	if (err instanceof ZodError) {
		return res.status(400).json({
			success: false,
			statusCode: 400,
			message: "Validation error",
			errors: err.issues.map((e) => ({
				field: e.path.join("."),
				message: e.message,
			})),
		});
	}

	// Known app error
	if (err instanceof AppError) {
		return res.status(err.statusCode).json({
			success: false,
			statusCode: err.statusCode,
			message: err.message,
		});
	}

	// Unknown error
	const message = err instanceof Error ? err.message : "Internal Server Error";
	console.error(`[Error] ${message}`);
	return res.status(500).json({
		success: false,
		statusCode: 500,
		message,
	});
};
