import { Router } from "express";
import { requireAuth } from "../middlewares/requireAuth.js";
import {
  getMoviesForReview,
  inviteJury,
  sendOfficialEmail,
} from "../controllers/admin.controller.js";

const router = Router();

router.use(requireAuth("admin"));
router.get("/review", requireAuth("admin"), getMoviesForReview);
router.post("/jury/invite", inviteJury);
router.post("/movies/:movieId/email", requireAuth("admin"), sendOfficialEmail);

export default router;
