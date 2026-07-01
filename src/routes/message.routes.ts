import { Router } from "express";
import { MessageController } from "../controllers/message.controller";
import { authenticate } from "../middleware/authenticated";

const router = Router({ mergeParams: true });

router.get("/", authenticate, MessageController.getAll);
router.get("/:id", authenticate, MessageController.getById);
router.post("/", authenticate, MessageController.create);
router.put("/:id", authenticate, MessageController.update);
router.delete("/:id", authenticate, MessageController.delete);

export default router;
