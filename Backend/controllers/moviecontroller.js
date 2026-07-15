import Favourite from "../models/Favourite.js";

export const getFavourites = async (req, res) => {
  try {
    const favourites = await Favourite.find();

    res.status(200).json(favourites);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};