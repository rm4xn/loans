class Loan {
  constructor(amount, contact, estimatedPaymentDate = null, currency = 'USD') {
    this.amount = amount
    this.contact = contact
    this.currency = currency
    this.paymentDate = null
    this.estimatedPaymentDate = estimatedPaymentDate
    this.createdAt = new Date()
    this.status = 'active'
  }
}

export default Loan
