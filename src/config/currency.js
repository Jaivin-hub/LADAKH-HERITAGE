// ECB reference rate, 2 November 2026. Indicative only; update periodically.
// https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/eurofxref-graph-inr.en.html
export const INR_PER_EUR = 106.4505;
export const euroPrice = (inr) =>
  new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(inr / INR_PER_EUR);
