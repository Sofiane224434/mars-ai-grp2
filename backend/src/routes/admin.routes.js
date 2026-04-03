import { Router } from "express";
import { inviteJury } from "../controllers/admin.controller.js";

const router = Router();

router.post("/jury/invite", inviteJury);

export default router;
