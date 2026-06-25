import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import Loan from '../classes/Loan'
import { useStore } from '../store'

export default function LoanForm(props) {
  const { t } = useTranslation()
  const [amount, setAmount] = useState(props.loan?.amount ?? '')
  const [contact, setContact] = useState(props.loan?.contact ?? null)
  const [contactSearch, setContactSearch] = useState(props.loan?.contact?.name ?? '')
  const [showDropdown, setShowDropdown] = useState(false)
  const contacts = useStore((state) => state.contacts)
  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(contactSearch.toLowerCase()),
  )
  const [estimatedPaymentDate, setEstimatedPaymentDate] = useState(
    props.loan?.estimatedPaymentDate ?? '',
  )
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
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h3 className="text-lg font-semibold tracking-tight">
            {isEditing ? t('Edit Loan') : t('New Loan')}
          </h3>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost text-base-content/40 hover:text-base-content">
              <X className="size-4" />
            </button>
          </form>
        </div>

        <div className="px-6 pb-6 space-y-4">
          {!isEditing && (
            <fieldset className="fieldset">
              <legend className="fieldset-legend">{t('Contact')}</legend>
              <div className="dropdown w-full">
                <input
                  type="text"
                  className="input w-full"
                  placeholder={t('Search contacts...')}
                  value={contactSearch}
                  onChange={(e) => {
                    setContactSearch(e.target.value)
                    setContact(null)
                    setShowDropdown(true)
                  }}
                  onFocus={() => setShowDropdown(true)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                  autoComplete="off"
                  required
                />
                {showDropdown && filteredContacts.length > 0 && (
                  <ul className="dropdown-content menu w-full bg-base-100 rounded-box shadow-sm mt-2 p-2 border border-base-200/50 z-10">
                    {filteredContacts.map((c) => (
                      <li key={c.id}>
                        <button
                          className="flex items-center gap-3 py-2"
                          onPointerDown={(e) => {
                            e.preventDefault()
                            setContact(c)
                            setContactSearch(c.name)
                            setShowDropdown(false)
                          }}
                        >
                          <div className="flex size-8 items-center justify-center rounded-full bg-secondary/10 text-xs font-semibold text-secondary shrink-0">
                            {c.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0 flex-1 text-left">
                            <p className="text-sm font-medium truncate">{c.name}</p>
                            <p className="text-xs text-base-content/40 truncate">{c.phoneNumber}</p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </fieldset>
          )}

          <fieldset className="fieldset">
            <legend className="fieldset-legend">{t('Amount ($)')}</legend>
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
              {t('Payment Date')} <span className="text-base-content/40 font-normal">({t('optional')})</span>
            </legend>
            <input
              type="date"
              className="input w-full"
              value={estimatedPaymentDate}
              onChange={(e) => setEstimatedPaymentDate(e.target.value)}
            />
          </fieldset>
        </div>

        <div className="flex gap-2 px-6 pb-6">
          <form method="dialog" className="flex-1">
            <button className="btn btn-block btn-ghost text-base-content/60">
              {t('Cancel')}
            </button>
          </form>
          <button
            className="btn btn-primary btn-block flex-1 shadow-xs disabled:opacity-50"
            onClick={handleClick}
            disabled={!isValid}
          >
            {isEditing ? t('Save Changes') : t('Create Loan')}
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}