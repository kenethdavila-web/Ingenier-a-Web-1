import React from 'react'
import CreditsGrid from '../components/CreditsGrid'

export default function Home(){
  return (
    <main className="container">
      <header className="hero">
        <div className="container">
          <h2>Bienvenido a CreditSmart</h2>
          <p>Encuentra el crédito perfecto para ti</p>
        </div>
      </header>

      <section className="credits-section">
        <h3>Nuestros Productos Crediticios</h3>
        <CreditsGrid showFilters={false} />
      </section>
    </main>
  )
}

