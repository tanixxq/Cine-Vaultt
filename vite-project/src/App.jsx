import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeScreen from "./Pages/Homescreen";
import MovieDetails from "./Pages/MovieDetails";
import WatchList from "./Pages/WatchList";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/watchlist" element={<WatchList />} />
      </Routes>
    </>
  );
}

export default App;