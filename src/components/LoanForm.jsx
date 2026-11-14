import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import Loan from '../classes/Loan'
import { useLoansStore } from '../stores/loans'
import { useContactsStore } from '../stores/contacts'
import { useSettingsStore } from '../stores/settings'
import { CURRENCIES } from '../utils/currency'

export default function LoanForm(props) {
  const contacts = useContactsStore((state) => state.items)
  const defaultCurrency = useSettingsStore((state) => state.defaultCurrency)
  const { add: addLoan, update: updateLoan } = useLoansStore()

  const [amount, setAmount] = useState(props.loan?.amount ?? '')
  const [loanDirection, setLoanDirection] = useState(
    props.loan?.direction ?? 'lent',
  )
  const [currency, setCurrency] = useState(
    props.loan?.currency ?? defaultCurrency,
  )
  const [contact, setContact] = useState(
    contacts.find((c) => c.id === props.loan?.contactId ?? null),
  )
  const [contactSearch, setContactSearch] = useState(
    props.loan?.contact?.name ?? '',
  )
  const [estimatedPaymentDate, setEstimatedPaymentDate] = useState(
    props.loan?.estimatedPaymentDate ?? '',
  )
  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(contactSearch.toLowerCase()),
  )

  const [showDropdown, setShowDropdown] = useState(false)
  const { t } = useTranslation()

  function handleClick() {
    if (!amount || !contact) return

    if (props.loan) {
      updateLoan(props.loan.id, {
        loanDirection,
        amount,
        currency,
        estimatedPaymentDate: estimatedPaymentDate,
      })
    } else {
      const loan = new Loan(
        amount,
        contact.id,
        loanDirection,
        currency,
        estimatedPaymentDate,
      )
      addLoan(loan)
    }
    props.onClose()
  }

  const isEditing = Boolean(props.loan)
  const isValid = isEditing
    ? Boolean(amount)
    : Boolean(amount) && Boolean(contact)

  return (
    <dialog id={props.id} className="modal">
      <div className="modal-box rounded-2xl p-0 overflow-hidden max-w-sm">
        <div className="flex items-center px-6 pt-6 pb-4">
          <div className="flex flex-1 items-center justify-between">
            <h3 className="text-lg font-semibold tracking-tight">
              {isEditing ? t('Edit Loan') : t('New Loan')}
            </h3>
            <div className="tabs tabs-sm tabs-box flex-none">
              <input
                type="radio"
                name="loan-direction"
                className="tab"
                value="lent"
                aria-label={t('I lent')}
                checked={loanDirection === 'lent'}
                onChange={(e) => setLoanDirection(e.target.value)}
              />
              <input
                type="radio"
                name="loan-direction"
                className="tab"
                value="borrowed"
                aria-label={t('I borrowed')}
                checked={loanDirection === 'borrowed'}
                onChange={(e) => setLoanDirection(e.target.value)}
              />
            </div>
          </div>
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
                            <p className="text-sm font-medium truncate">
                              {c.name}
                            </p>
                            <p className="text-xs text-base-content/40 truncate">
                              {c.phoneNumber}
                            </p>
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
            <legend className="fieldset-legend">{t('Amount')}</legend>
            <div className="join w-full">
              <input
                type="number"
                className="input join-item flex-1"
                placeholder="0.00"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                autoFocus={isEditing}
                required
              />
              <select
                className="select join-item w-28"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              {t('Payment Date')}{' '}
              <span className="text-base-content/40 font-normal">
                ({t('optional')})
              </span>
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
