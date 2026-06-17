import { useState } from 'react'
import Loan from '../classes/Loan'
import { useStore } from '../store'

function LoanCreation(props) {
  const [amount, setAmount] = useState('')
  const [contact, setContact] = useState(null)
  const [paymentDate, setPaymentDate] = useState('')
  const contacts = useStore((state) => state.contacts)
  const addLoan = useStore((state) => state.addLoan)

  function handleClick() {
    if (amount && contact) {
      const loan = new Loan(amount, contact, paymentDate)
      addLoan(loan)
      props.onCreate()
    }
  }

  return (
    <dialog id={props.id} className="modal">
      <div className="modal-box w-max">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Create New Loan</h3>
        <div className="fieldset">
          <label className="label">Contact</label>
          <input
            id="contact-input"
            type="text"
            className="input"
            list="contacts"
            onBlur={(e) => {
              const selectedContact = contacts.find(
                (c) => c.name === e.target.value,
              )
              if (!selectedContact) {
                e.target.value = contact ? contact.name : ''
                return
              }
              setContact(selectedContact)
            }}
            required
          />
          <datalist id="contacts">
            {contacts.map((contact) => (
              <option key={contact.id} value={contact.name} />
            ))}
          </datalist>

          <label className="label">Amount</label>
          <input
            type="number"
            className="input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <label className="label">Payment Date</label>
          <input
            type="date"
            className="input"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
          />
          <button className="btn btn-neutral mt-4" onClick={handleClick}>
            Create Loan
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default LoanCreation
