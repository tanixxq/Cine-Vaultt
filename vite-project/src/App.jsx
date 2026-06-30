import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeScreen from "./pages/HomeScreen";
import MovieDetails from "./Pages/MovieDetails";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </>
  );
}

export default App;