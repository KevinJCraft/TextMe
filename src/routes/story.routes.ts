import { Router } from "express";
import { StoryController } from "../controllers/story.controller";
import { authenticate } from "../middleware/authenticated";

const router = Router();

router.post("/", authenticate, StoryController.create);
router.get("/", authenticate, StoryController.getAll);
router.get("/my-stories", authenticate, StoryController.getByUserId);
router.get("/:id", authenticate, StoryController.getById);
router.put("/:id", authenticate, StoryController.update);

export default router;
