import { Router } from "express";
import { requireAuth } from "../middlewares/requireAuth.js";
import { updateAdminMovieStatusSchema } from "../schemas/admin.schema.js";
import {
  getMovieByIdForAdmin,
  getMoviesForReview,
  inviteJury,
  sendOfficialEmail,
  getAllMoviesForAdmin,
  getAdminStats,
  updateMovieStatusForAdmin
} from "../controllers/admin.controller.js";

const router = Router();

const validateRequest = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    const details = error?.issues || error?.errors || [{ message: 'Requete invalide.' }];
    return res.status(400).json({ erreurs: details });
  }
};

router.use(requireAuth("admin"));
router.get("/stats", requireAuth("admin"), getAdminStats);
router.get("/movies/review", requireAuth("admin"), getMoviesForReview);
router.get('/movies', requireAuth('admin'), getAllMoviesForAdmin);// Récupérer tous les films
router.get("/movies/:movieId", requireAuth("admin"), getMovieByIdForAdmin);
router.put('/movies/:movieId/status', requireAuth('admin'), validateRequest(updateAdminMovieStatusSchema), updateMovieStatusForAdmin);
router.post("/jury/invite", requireAuth("admin"), inviteJury);
router.post("/movies/:movieId/email", requireAuth("admin"), sendOfficialEmail);


export default router;
