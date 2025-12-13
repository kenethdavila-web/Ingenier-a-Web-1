import useCreditsFirebase from "../hooks/useCreditsFirebase";
import CreditCard from './CreditCard'
import { useNavigate } from 'react-router-dom'

export default function CreditsGrid({ showFilters = true, limit = null }) {
  const { credits, query, setQuery, minRange, setMinRange, maxRange, setMaxRange, sortBy, setSortBy } = useCreditsFirebase();
  const nav = useNavigate()

  const handleRequest = (credit) => {
    nav('/solicitar', { state: { preselect: credit.id } })
  }

  // Aplicar límite si existe
  const visibleCredits = limit ? credits.slice(0, limit) : credits

  return (
    <>
      {/* FILTROS SOLO SI showFilters ES true */}
      {showFilters && (
        <div className="filters">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar por nombre"
          />

          <select
            onChange={e => {
              const v = e.target.value
              if (v === '') { setMinRange(null); setMaxRange(null) }
              else if (v === '1') { setMinRange(1000000); setMaxRange(30000000) }
              else if (v === '2') { setMinRange(10000000); setMaxRange(50000000) }
              else if (v === '3') { setMinRange(50000000); setMaxRange(999999999) }
            }}
          >
            <option value="">Filtrar por monto </option>
            <option value="1">$1M - $30M</option>
            <option value="2">$10M - $50M</option>
            <option value="3">Más de $50M</option>
          </select>

          <select onChange={e => setSortBy(e.target.value)}>
            <option value="">Ordenar</option>
            <option value="rate">Menor tasa</option>
            <option value="min">Menor monto</option>
          </select>
        </div>
      )}

      {/* TARJETAS */}
      <div className="credits-grid">
        {visibleCredits.map(c => (
          <CreditCard key={c.id} credit={c} onRequest={handleRequest} />
        ))}
      </div>
    </>
  )
}
