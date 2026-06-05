import { Request, Response } from "express";

export const notFound = (req: Request, res: Response) => {
	res.status(404).json({
		success: false,
		statusCode: 404,
		message: `Route ${req.method} ${req.url} not found`,
	});
};
