import { Response } from "express";
import { asyncHandler } from "../lib/asyncHandler";
import { AuthRequest } from "../middleware/authenticated";
import { generatePresignedUrl } from "../lib/s3";
import { sendSuccess } from "../lib/apiResponse";
import { v4 as uuidv4 } from "uuid";

export const UploadController = {
	getPresignedUrl: asyncHandler(async (req: AuthRequest, res: Response) => {
		const { contentType } = req.body;

		const key = `images/${uuidv4()}.webp`;
		const url = await generatePresignedUrl(key, contentType);

		sendSuccess(res, { url, key }, 200, "Presigned URL generated");
	}),
};
