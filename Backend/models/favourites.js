import mongoose from "mongoose";


const favouriteSchema = new mongoose.Schema({
  userID:String,
    omdbID: String,
    title: String,
    poster: String,
    year: String,
    genre: String,
    rating: String
})


favouriteSchema.index({ userID: 1, omdbID: 1 }, { unique: true });

const Favourite = mongoose.model("Favourite", favouriteSchema);

export default Favourite;