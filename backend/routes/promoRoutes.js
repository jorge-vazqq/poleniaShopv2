import express from "express";
const router = express.Router();
import {
  getPromos,
  getPromoById,
  createPromo,
  updatePromo,
  deletePromo,
} from "../controllers/promoController.js";
import { protect, admin } from "../middleware/authMiddleware.js"; // Assuming you have authentication middleware

// Route for fetching all promos and creating a promo
router.route("/").get(getPromos).post(protect, admin, createPromo);

// Route for fetching, updating, and deleting a promo by ID
router
  .route("/:id")
  .get(getPromoById)
  .put(protect, admin, updatePromo)
  .delete(protect, admin, deletePromo);

export default router;
