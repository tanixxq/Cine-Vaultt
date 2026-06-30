import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import SearchBar from '../components/SearchBar'
import Trending from '../components/Trending'
import MyPicks from '../components/MyPicks'
import AISection from '../components/AISection'

const HomeScreen = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <SearchBar />
      <Trending />
      <MyPicks />
      <AISection />
    </div>
  )
}

export default HomeScreen