export default class Loan {
  constructor(
    amount,
    contactId,
    direction,
    currency,
    estimatedPaymentDate = null,
  ) {
    this.amount = amount
    this.contactId = contactId
    this.direction = direction
    this.currency = currency
    this.estimatedPaymentDate = estimatedPaymentDate
    this.createdAt = new Date()
  }
}
