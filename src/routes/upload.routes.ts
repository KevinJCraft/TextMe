import { Router } from "express";
import { UploadController } from "../controllers/upload.controller";
import { authenticate } from "../middleware/authenticated";

const router = Router();

router.post("/presigned-url", authenticate, UploadController.getPresignedUrl);

export default router;
