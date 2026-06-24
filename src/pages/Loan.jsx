import { useParams } from 'react-router'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { useStore } from '../store'
import LoanForm from '../components/LoanForm'

function Loan() {
  const { t } = useTranslation()
  const { id } = useParams()
  const loan = useStore((state) => state.loans.find((loan) => loan.id === id))
  const deleteLoan = useStore((state) => state.deleteLoan)
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
            {loan.contact.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-semibold tracking-tight truncate">
              {loan.contact.name}
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
                {loan.contact.phoneNumber}
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs text-base-content/40 font-medium uppercase tracking-widest mb-1">
          {t('Loan amount')}
        </p>
        <p className="text-4xl font-bold tracking-tight text-base-content mb-6">
          ${Number(loan.amount).toLocaleString()}
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
                ? new Date(loan.estimatedPaymentDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
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
          {t('Edit loan')}
        </button>
        <button
          className="btn btn-outline btn-block justify-start gap-3 h-12"
          onClick={() => {
            const message = t('WhatsApp reminder message', { amount: loan.amount })
            window.open(
              `https://wa.me/${loan.contact.phoneNumber}?text=${encodeURIComponent(message)}`,
              '_blank',
            )
          }}
        >
          {t('WhatsApp Reminder')}
        </button>
        <button
          className="btn btn-outline btn-block justify-start gap-3 h-12 text-error/70 hover:text-error hover:border-error/30"
          onClick={handleDelete}
        >
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