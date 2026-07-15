import { Router } from "express";
import Favourite from "../models/favourites.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const favourite = await Favourite.create(req.body);

    res.status(201).json(favourite);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const favourites = await Favourite.find();

    res.status(200).json(favourites);
  } catch (error) {
    res.status(500).json({ error: error.message });
    }
});

export default router;