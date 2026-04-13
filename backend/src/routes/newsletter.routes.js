import { Router } from "express";
import {
  subscribeNewsletter,
  unsubscribeNewsletter,
  unsubscribeNewsletterFromToken,
} from "../controllers/newsletter.controller.js";

const router = Router();

// Inscription publique depuis le formulaire footer.
router.post("/subscribe", subscribeNewsletter);
// Désinscription explicite depuis l'application.
router.post("/unsubscribe", unsubscribeNewsletter);
// Désinscription via lien tokenisé de l'application.
router.get("/unsubscribe", unsubscribeNewsletterFromToken);

export default router;
