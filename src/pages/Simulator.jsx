import React from 'react'
import CreditsGrid from '../components/CreditsGrid'

export default function Simulator(){
  return (
    <main className="container">
      <header className="hero">
        <div className="container">
          <h2>Simulador de Créditos</h2>
          <p>Busca y filtra productos</p>
        </div>
      </header>

      <section className="credits-section">
        <h3>Simulador</h3>
        <CreditsGrid showFilters={true} limit={2}/>
      </section>
    </main>
  )
}

