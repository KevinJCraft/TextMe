import { Router } from "express";
import { ThreadController } from "../controllers/thread.controller";
import { authenticate } from "../middleware/authenticated";

const router = Router({ mergeParams: true });

router.get("/", authenticate, ThreadController.getAll);
router.get("/:id", authenticate, ThreadController.getById);
router.post("/", authenticate, ThreadController.create);
router.put("/:id", authenticate, ThreadController.update);
router.delete("/:id", authenticate, ThreadController.delete);
router.post("/:id/characters", authenticate, ThreadController.addCharacter);
router.delete("/:id/characters", authenticate, ThreadController.removeCharacter);

export default router;
