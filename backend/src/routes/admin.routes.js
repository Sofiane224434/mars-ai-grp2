import { Router } from "express";
import { requireAuth } from "../middlewares/requireAuth.js";
import {
  getMovieByIdForAdmin,
  getMoviesForReview,
  inviteJury,
  sendOfficialEmail,
  getAllMoviesForAdmin,
  getAdminStats
} from "../controllers/admin.controller.js";

const router = Router();

router.use(requireAuth("admin"));
router.get("/stats", requireAuth("admin"), getAdminStats);
router.get("/movies/review", requireAuth("admin"), getMoviesForReview);
router.get('/movies', requireAuth('admin'), getAllMoviesForAdmin);// Récupérer tous les films
router.get("/movies/:movieId", requireAuth("admin"), getMovieByIdForAdmin);
router.post("/jury/invite", requireAuth("admin"), inviteJury);
router.post("/movies/:movieId/email", requireAuth("admin"), sendOfficialEmail);


export default router;
