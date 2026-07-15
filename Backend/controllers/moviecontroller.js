import Favourite from "../models/Favourite.js";

// GET all favourites
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

// DELETE a favourite
export const removeFavourite = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFavourite = await Favourite.findByIdAndDelete(id);

    if (!deletedFavourite) {
      return res.status(404).json({
        error: "Favourite not found",
      });
    }

    res.status(200).json({
      message: "Favourite removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};