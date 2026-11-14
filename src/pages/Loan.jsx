import { useParams, useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Calendar, Clock, Pencil, Trash2 } from 'lucide-react'
import { WhatsApp } from '@ridemountainpig/svgl-react'
import { useLoansStore } from '../stores/loans'
import { useContactsStore } from '../stores/contacts'
import { useSettingsStore } from '../stores/settings'
import { getCurrencySymbol } from '../utils/currency'
import LoanForm from '../components/LoanForm'

function Loan() {
  const { t } = useTranslation()
  const { id } = useParams()
  const [loan, deleteLoan] = (() => {
    const { items, delete: deleteLoan } = useLoansStore()
    return [items.find((loan) => loan.id === Number(id)), deleteLoan]
  })()
  const whatsappMessage = useSettingsStore((state) => state.whatsappMessage)
  const contact = useContactsStore((state) =>
    state.items.find((item) => item.id === loan.contactId),
  )
  const navigate = useNavigate()

  const handleDelete = () => {
    if (window.confirm(t('Delete loan confirmation'))) {
      deleteLoan(loan.id)
      navigate(-1)
    }
  }

  if (!loan) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-base-content/30">
        <p className="text-lg font-medium text-base-content/40">
          {t('Loan not found')}
        </p>
      </div>
    )
  }

  const isPaid = loan.status === 'paid'
  const isLent = loan.direction === 'lent'

  return (
    <>
      <button
        className="btn btn-circle btn-ghost btn-sm mb-6"
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        <ArrowLeft className="size-5" />
      </button>

      <div className="bg-base-100 rounded-2xl border border-base-200/50 p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div
            className={
              'flex size-12 shrink-0 items-center justify-center rounded-xl text-base font-semibold ' +
              (isPaid
                ? 'bg-base-200 text-base-content/40'
                : 'bg-primary/10 text-primary')
            }
          >
            {contact.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-semibold tracking-tight truncate">
              {contact.name}
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span
                className={
                  'badge badge-xs ' +
                  (isPaid
                    ? 'badge-soft badge-success'
                    : 'badge-soft badge-warning')
                }
              >
                {isPaid ? t('Paid') : t('Active')}
              </span>
              <span className="text-xs text-base-content/40">
                {contact.phoneNumber}
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs text-base-content/40 font-medium uppercase tracking-widest mb-1">
          {t(isLent ? 'You are owed' : 'You owe')}
        </p>
        <p className="text-4xl font-bold tracking-tight text-base-content mb-6">
          {getCurrencySymbol(loan.currency)}
          {Number(loan.amount).toLocaleString()}
        </p>

        <div className="grid grid-cols-2 gap-4 pt-5 border-t border-base-200/50">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-base-content/40 mb-0.5">
              <Calendar className="size-3.5" />
              <span>{t('Created')}</span>
            </div>
            <p className="text-sm font-medium">
              {loan.createdAt.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs text-base-content/40 mb-0.5">
              <Clock className="size-3.5" />
              <span>{t('Due date')}</span>
            </div>
            <p className="text-sm font-medium">
              {loan.estimatedPaymentDate
                ? new Date(loan.estimatedPaymentDate).toLocaleDateString(
                    'en-US',
                    {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    },
                  )
                : '—'}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <button
          className="btn btn-outline btn-block justify-start gap-3 h-12"
          onClick={() => document.getElementById('loanEditModal').showModal()}
        >
          <Pencil className="size-4" />
          {t('Edit loan')}
        </button>
        {isLent && (
          <button
            className="btn btn-outline btn-block justify-start gap-3 h-12"
            onClick={() => {
              const message = whatsappMessage
                .replace('{{amount}}', loan.amount)
                .replace('{{currency}}', getCurrencySymbol(loan.currency))
              window.open(
                `https://wa.me/${contact.phoneNumber}?text=${encodeURIComponent(message)}`,
                '_blank',
              )
            }}
          >
            <WhatsApp className="size-4" />
            {t('WhatsApp Reminder')}
          </button>
        )}
        <button
          className="btn btn-outline btn-block justify-start gap-3 h-12 text-error/70 hover:text-error hover:border-error/30"
          onClick={handleDelete}
        >
          <Trash2 className="size-4" />
          {t('Delete loan')}
        </button>
      </div>

      <LoanForm
        id="loanEditModal"
        loan={loan}
        onClose={() => document.getElementById('loanEditModal').close()}
      />
    </>
  )
}

export default Loan
