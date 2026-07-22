import express from "express";
import {addRecentlyViewed,getRecentlyViewed} from "../controllers/RecentlyViewedController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";

const router=express.Router();

router.post("/",authMiddleware,addRecentlyViewed);

router.get("/",authMiddleware,getRecentlyViewed);

export default router;