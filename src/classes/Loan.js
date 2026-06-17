class Loan {
  constructor(amount, contact, paymentDate = null) {
    this.id = crypto.randomUUID()
    this.amount = amount
    this.contact = contact
    this.paymentDate = paymentDate
    this.createdAt = new Date()
    this.status = 'active'
  }
}

export default Loan
