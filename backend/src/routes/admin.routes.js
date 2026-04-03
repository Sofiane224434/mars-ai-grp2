import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { inviteJury } from "../controllers/admin.controller.js";

const router = Router();

router.use(requireAuth(["admin"]));
router.post("/jury/invite", inviteJury);

export default router;
