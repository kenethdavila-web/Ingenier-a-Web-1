export const formatCOP = (value) => {
  if (isNaN(value)) return ''
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value)
}
