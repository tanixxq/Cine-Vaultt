import React from 'react'
import './Hero.css'

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <h2>Discover films that match your soul</h2>
        <p>
          Explore timeless classics, hidden gems, and AI-powered recommendations.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">Explore Movies</button>
          <button className="secondary-btn">Ask AI</button>
        </div>
      </div>
    </section>
  )
}

export default Hero