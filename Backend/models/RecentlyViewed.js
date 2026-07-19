import mongoose from "mongoose";

const recentlyViewedSchema = new mongoose.Schema(
    {
      userID: {
        type: String,
        required: true
      },
      omdbID: {
        type: String,
        required: true
      },
      title: String,
      poster: String,
      year: String,
      genre: String,
      rating: String,
      viewedAt: {
        type: Date,
        default: Date.now
      }
    },
    {
      timestamps: true
    }
  );

recentlyViewedSchema.index({userID:1,omdbID:1},{unique:true});

const RecentlyViewed = mongoose.model("RecentlyViewed",recentlyViewedSchema);

export default RecentlyViewed;


