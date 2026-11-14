import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { formatDate, formatDue } from '../utils/date'
import { getCurrencySymbol } from '../utils/currency'
import { useContactsStore } from '../stores/contacts'

export default function LoanCard({ loan }) {
  const isPaid = loan.status === 'paid'
  const isLent = loan.direction === 'lent'

  const contact = useContactsStore((state) =>
    state.items.find((item) => item.id === loan.contactId),
  )

  const navigate = useNavigate()
  const handleNavigate = () => navigate(`/loans/${loan.id}`)
  const { t } = useTranslation()

  return (
    <div
      className="group flex items-center gap-4 bg-base-100 rounded-xl px-5 py-4 border border-base-200/50 cursor-pointer transition-all duration-200 hover:border-primary/20 hover:shadow-sm active:scale-[0.99]"
      onClick={handleNavigate}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleNavigate()
        }
      }}
    >
      <div
        className={
          'flex size-11 shrink-0 items-center justify-center rounded-xl text-sm font-semibold ' +
          (isPaid
            ? 'bg-base-200 text-base-content/40'
            : 'bg-primary/10 text-primary')
        }
      >
        {contact.name.charAt(0).toUpperCase()}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span
            className={
              'truncate text-sm font-medium ' +
              (isPaid ? 'text-base-content/50 line-through' : '')
            }
          >
            {contact.name}
          </span>
          <span
            className={
              'badge badge-sm ' +
              (isPaid ? 'badge-soft badge-success' : 'badge-soft badge-warning')
            }
          >
            {isPaid ? t('Paid') : t('Active')}
          </span>
        </div>
        <div className="mt-1 text-xs text-base-content/40">
          {t(isLent ? 'I lent' : 'I borrowed')} ·{' '}
          {formatDate(loan.createdAt, t)}
        </div>
      </div>

      <div className="shrink-0 text-right -mr-1">
        <span
          className={
            'tabular-nums text-lg font-bold ' +
            (isPaid
              ? 'text-base-content/30'
              : isLent
                ? 'text-red-700'
                : 'text-green-700')
          }
        >
          {isLent ? '-' : '+'}
          {getCurrencySymbol(loan.currency)}
          {Number(loan.amount).toLocaleString()}
        </span>
        {loan.estimatedPaymentDate && !isPaid ? (
          <div className="mt-0.5 text-[11px] text-base-content/40">
            {formatDue(loan.estimatedPaymentDate, t)}
          </div>
        ) : null}
      </div>
    </div>
  )
}
