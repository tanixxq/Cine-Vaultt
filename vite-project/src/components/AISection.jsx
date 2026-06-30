import React from 'react'
import './AISection.css'
const AISection = () => {
  return (
    <section className="ai-section">
      <h2>Ask CineVault AI 🤖</h2>
      <input type="text" placeholder="Suggest dark thrillers..." />
      <button>Ask</button>
    </section>
  )
}

export default AISection