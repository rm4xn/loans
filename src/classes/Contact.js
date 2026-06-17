class Contact {
  constructor(name, phoneNumber) {
    this.id = crypto.randomUUID()
    this.name = name
    this.createdAt = new Date()
    this.phoneNumber = phoneNumber
  }
}

export default Contact