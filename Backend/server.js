import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import favouriteRoutes from "./routes/FavouritesRoutes.js";
import cors from "cors";
import recentlyViewed from "./routes/RecentlyViewed.js";
import RegisterRoutes from "./routes/authRoutes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/favourites", favouriteRoutes);
app.use("/api/recently-viewed", recentlyViewed);
app.use("/api/register", RegisterRoutes);
app.use("/api/login", RegisterRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Cine-Vaultt API");
});


const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server failed to start:", error);
  }
};

startServer();