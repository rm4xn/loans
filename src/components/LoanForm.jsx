import { useState } from 'react'
import Loan from '../classes/Loan'
import { useStore } from '../store'

export default function LoanForm(props) {
  const [amount, setAmount] = useState(props.loan?.amount ?? '')
  const [contact, setContact] = useState(props.loan?.contact ?? null)
  const [estimatedPaymentDate, setEstimatedPaymentDate] = useState(
    props.loan?.estimatedPaymentDate ?? '',
  )
  const contacts = useStore((state) => state.contacts)
  const addLoan = useStore((state) => state.addLoan)
  const updateLoan = useStore((state) => state.updateLoan)

  function handleClick() {
    if (amount && contact) {
      if (props.loan) {
        updateLoan(props.loan.id, {
          amount,
          estimatedPaymentDate: estimatedPaymentDate,
        })
      } else {
        const loan = new Loan(amount, contact, estimatedPaymentDate)
        addLoan(loan)
      }
      props.onClose()
    }
  }

  const isEditing = Boolean(props.loan)

  return (
    <dialog id={props.id} className="modal">
      <div className="modal-box w-max">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">
          {isEditing ? 'Edit Loan' : 'Create New Loan'}
        </h3>
        <div className="fieldset">
          {!isEditing && (
            <>
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
            </>
          )}
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
            value={estimatedPaymentDate}
            onChange={(e) => setEstimatedPaymentDate(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-neutral mt-4"
            onClick={handleClick}
          >
            {isEditing ? 'Save Changes' : 'Create Loan'}
          </button>
        </div>
      </div>
    </dialog>
  )
}
