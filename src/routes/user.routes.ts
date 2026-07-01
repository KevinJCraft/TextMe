import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authenticate } from "../middleware/authenticated";

const router = Router();

router.put("/:id", authenticate, UserController.update);
router.delete("/:id", authenticate, UserController.delete);

export default router;
