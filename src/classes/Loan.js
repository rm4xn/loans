class Loan {
  constructor(amount, contact, estimatedPaymentDate = null) {
    this.amount = amount
    this.contact = contact
    this.paymentDate = null
    this.estimatedPaymentDate = estimatedPaymentDate
    this.createdAt = new Date()
    this.status = 'active'
  }
}

export default Loan
