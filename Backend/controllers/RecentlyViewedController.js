import RecentlyViewed from "../models/RecentlyViewed.js";

// Add or Update Recently Viewed
export const addRecentlyViewed = async (req, res) => {
  try {
    const {
      omdbID,
      title,
      poster,
      year,
      genre,
      rating,
      userID,
    } = req.body;

    const existingEntry = await RecentlyViewed.findOne({
      userID,
      omdbID,
    });

    if (existingEntry) {
      existingEntry.viewedAt = new Date();
      await existingEntry.save();

      return res.status(200).json({
        message: "Recently viewed updated successfully",
      });
    }

    const newEntry = new RecentlyViewed({
      userID,
      omdbID,
      title,
      poster,
      year,
      genre,
      rating,
    });

    await newEntry.save();

    const allMovies = await RecentlyViewed.find({ userID })
      .sort({ viewedAt: -1 });

    if (allMovies.length > 10) {
      const moviesToDelete = allMovies.slice(10);

      const ids = moviesToDelete.map(movie => movie._id);

      await RecentlyViewed.deleteMany({
        _id: { $in: ids },
      });
    }

    return res.status(201).json({
      message: "Recently viewed added successfully",
    });

  } catch (error) {
    return res.status(500).json({
      error: "Failed to add recently viewed movie",
    });
  }
};

export const getRecentlyViewed = async (req, res) => {
  try {
    const { userID } = req.params;

    const recentlyViewed = await RecentlyViewed.find({ userID })
      .sort({ viewedAt: -1 })
      .limit(10);

    return res.status(200).json(recentlyViewed);

  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch recently viewed movies",
    });
  }
};