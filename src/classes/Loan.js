class Loan {  
  constructor(amount, contact) {
    this._id = crypto.randomUUID()
    this.amount = amount
    this.contact = contact
    this.createdAt = new Date()
    this.status = 'active'
  }
}

export default Loan