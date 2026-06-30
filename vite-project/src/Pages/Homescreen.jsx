import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import Trending from "../components/Trending";
import MyPicks from "../components/MyPicks";
import AISection from "../components/AISection";

const HomeScreen = () => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <Navbar />
      <Hero />
      <SearchBar search={search} setSearch={setSearch} />
      <Trending search={search} />
      <MyPicks />
      <AISection />
    </div>
  );
};

export default HomeScreen;