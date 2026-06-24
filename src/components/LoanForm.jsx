import { useState } from 'react'
import { X } from 'lucide-react'
import Loan from '../classes/Loan'
import { useStore } from '../store'

export default function LoanForm(props) {
  const [amount, setAmount] = useState(props.loan?.amount ?? '')
  const [contact, setContact] = useState(props.loan?.contact ?? null)
  const [contactInput, setContactInput] = useState(props.loan?.contact?.name ?? '')
  const [estimatedPaymentDate, setEstimatedPaymentDate] = useState(
    props.loan?.estimatedPaymentDate ?? '',
  )
  const contacts = useStore((state) => state.contacts)
  const addLoan = useStore((state) => state.addLoan)
  const updateLoan = useStore((state) => state.updateLoan)

  function handleClick() {
    if (amount && (contact || props.loan)) {
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
  const isValid = isEditing
    ? Boolean(amount)
    : Boolean(amount) && Boolean(contact)

  return (
    <dialog id={props.id} className="modal">
      <div className="modal-box rounded-2xl p-0 overflow-hidden max-w-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h3 className="text-lg font-semibold tracking-tight">
            {isEditing ? 'Edit Loan' : 'New Loan'}
          </h3>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost text-base-content/40 hover:text-base-content">
              <X className="size-4" />
            </button>
          </form>
        </div>

        {/* Body */}
        <div className="px-6 pb-6 space-y-4">
          {!isEditing && (
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Contact</legend>
              <input
                id="contact-input"
                type="text"
                className="input w-full"
                placeholder="Search contacts..."
                list="contacts"
                value={contactInput}
                onChange={(e) => {
                  setContactInput(e.target.value)
                  const selected = contacts.find(
                    (c) => c.name === e.target.value,
                  )
                  if (selected) setContact(selected)
                }}
                onBlur={(e) => {
                  const selectedContact = contacts.find(
                    (c) => c.name === e.target.value,
                  )
                  if (!selectedContact) {
                    setContactInput(contact ? contact.name : '')
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
            </fieldset>
          )}

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Amount ($)</legend>
            <input
              type="number"
              className="input w-full"
              placeholder="0.00"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              autoFocus={isEditing}
              required
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              Payment Date <span className="text-base-content/40 font-normal">(optional)</span>
            </legend>
            <input
              type="date"
              className="input w-full"
              value={estimatedPaymentDate}
              onChange={(e) => setEstimatedPaymentDate(e.target.value)}
            />
          </fieldset>
        </div>

        {/* Footer */}
        <div className="flex gap-2 px-6 pb-6">
          <form method="dialog" className="flex-1">
            <button className="btn btn-block btn-ghost text-base-content/60">
              Cancel
            </button>
          </form>
          <button
            className="btn btn-primary btn-block flex-1 shadow-xs disabled:opacity-50"
            onClick={handleClick}
            disabled={!isValid}
          >
            {isEditing ? 'Save Changes' : 'Create Loan'}
          </button>
        </div>
      </div>

      {/* Backdrop click to close */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}