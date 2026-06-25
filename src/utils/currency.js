const CURRENCIES = [
  { code: 'USD', symbol: '$', label: 'US Dollar' },
  { code: 'PEN', symbol: 'S/', label: 'Peruvian Nuevo Sol' },
  { code: 'EUR', symbol: '€', label: 'Euro' },
  { code: 'GBP', symbol: '£', label: 'British Pound' },
  { code: 'JPY', symbol: '¥', label: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', label: 'Chinese Yuan' },
  { code: 'MXN', symbol: 'MX$', label: 'Mexican Peso' },
  { code: 'BRL', symbol: 'R$', label: 'Brazilian Real' },
  { code: 'ARS', symbol: 'AR$', label: 'Argentine Peso' },
  { code: 'CAD', symbol: 'CA$', label: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', label: 'Australian Dollar' },
  { code: 'CHF', symbol: 'CHF', label: 'Swiss Franc' },
  { code: 'INR', symbol: '₹', label: 'Indian Rupee' },
  { code: 'KRW', symbol: '₩', label: 'South Korean Won' },
]

function getCurrencySymbol(code) {
  return CURRENCIES.find((c) => c.code === code)?.symbol ?? '$'
}

export { CURRENCIES, getCurrencySymbol }
