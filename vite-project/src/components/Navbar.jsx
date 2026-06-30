import React from 'react'
import './Navbar.css'
const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>CineVault 🎬</h1>

      <ul>
        <li>Home</li>
        <li>Explore</li>
        <li>Directors</li>
        <li>My Picks</li>
      </ul>
    </nav>
  )
}

export default Navbar