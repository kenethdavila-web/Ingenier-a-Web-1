// P = principal, r = tasa mensual decimal, n = meses
export function monthlyPayment(P, r, n){
  if (!P || !r || !n) return 0
  const monthly = parseFloat(r)
  const numerator = P * monthly
  const denominator = 1 - Math.pow(1 + monthly, -n)
  return numerator / denominator
}

