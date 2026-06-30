import { Router } from "express";
import { authenticate } from "../middleware/authenticated";
import { CharacterController } from "../controllers/character.controller";

const router = Router({ mergeParams: true });

router.get("/", authenticate, CharacterController.getAll);
router.get("/:id", authenticate, CharacterController.getById);
router.post("/", authenticate, CharacterController.create);
router.put("/:id", authenticate, CharacterController.update);
router.delete("/:id", authenticate, CharacterController.delete);

export default router;
