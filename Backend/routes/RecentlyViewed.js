import express from "express";
import {
  addRecentlyViewed,
  getRecentlyViewed,
} from "../controllers/RecentlyViewedController.js";

const router = express.Router();

router.post("/", addRecentlyViewed);

router.get("/:userID", getRecentlyViewed);

export default router;