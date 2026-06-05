import { Request, Response, NextFunction } from "express";

type AsyncController = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const asyncHandler = (fn: AsyncController) => {
	return (req: Request, res: Response, next: NextFunction) => {
		fn(req, res, next).catch(next); // .catch(next) is the same as catch(err) { next(err) }
	};
};
