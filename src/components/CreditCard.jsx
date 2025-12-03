import React from 'react'
import { formatCOP } from '../utils/format'

export default function CreditCard({credit, onRequest}){
  return (
    <div className="credit-card">
      <div className="card-header">
      <span className="icon">{credit.icon}</span>
      <h4>{credit.name}</h4>
    </div>

      <p>{credit.description}</p>
      <div className="details">
        <div className="detail-item"><span className="label">Tasa:</span><span className="value">{(credit.rateMonthly*100).toFixed(2)}% / mes</span></div>
        <div className="detail-item"><span className="label">Monto:</span><span className="value">{formatCOP(credit.min)} - {formatCOP(credit.max)}</span></div>
        <div className="detail-item"><span className="label">Plazo:</span><span className="value">hasta {credit.termMax} meses</span></div>
      </div>
      <div style={{display:'flex',gap:'8px'}}>
        <button className="btn-primary" onClick={() => onRequest(credit)}>Solicitar ahora</button>
      </div>
    </div>
  )
}

