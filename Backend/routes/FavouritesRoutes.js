import { Router } from "express";
import Favourite from "../models/favourites.js";

const router = Router();

router.delete("/remove/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFavourite = await Favourite.findByIdAndDelete(id);

    if (!deletedFavourite) {
      return res.status(404).json({ error: "Favourite not found" });
    }

    res.status(200).json({ message: "Favourite removed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }});

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