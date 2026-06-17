class Contact {
  constructor(name, phoneNumber) {
    this._id = crypto.randomUUID()
    this.name = name
    this.createdAt = new Date()
    this.phoneNumber = phoneNumber
  }
}

export default Contact