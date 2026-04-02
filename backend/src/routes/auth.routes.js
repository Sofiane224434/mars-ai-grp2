import { Router } from "express";
import {
  getProfile,
  login,
  logout,
  requestToken,
} from "../controllers/auth.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/request-token", requestToken);
router.post("/login", login);
router.post("/logout", requireAuth(["admin", "jury"]), logout);
router.get("/me", requireAuth(["admin", "jury"]), getProfile);

export default router;
