import { useNavigate } from 'react-router'
import { Plus, Wallet } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useStore } from '../store'
import { formatDate, formatDue } from '../utils/date'
import { getCurrencySymbol } from '../utils/currency'
import LoanForm from '../components/LoanForm'

function Home() {
  const { t } = useTranslation()
  const loans = useStore((state) => state.loans)
  const navigate = useNavigate()

  const sorted = [...loans].sort((a, b) => b.createdAt - a.createdAt)
  const activeCount = loans.filter((l) => l.status === 'active').length

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-base-content">
            {t('My Loans')}
          </h1>
          {loans.length > 0 ? (
            <p className="text-sm text-base-content/50 mt-1">
              {activeCount > 0
                ? t('active loan', { count: activeCount })
                : t('total', { count: loans.length })}
            </p>
          ) : null}
        </div>
        <button
          className="btn btn-primary btn-sm shadow-xs"
          onClick={() =>
            document.getElementById('loanCreationModal').showModal()
          }
        >
          <Plus className="size-4" />
          {t('New Loan')}
        </button>
        <LoanForm
          id="loanCreationModal"
          onClose={() => document.getElementById('loanCreationModal').close()}
        />
      </div>

      {sorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-base-content/30">
          <div className="size-16 rounded-2xl bg-base-200 flex items-center justify-center mb-5">
            <Wallet className="size-8 stroke-1" />
          </div>
          <p className="text-lg font-medium text-base-content/40">
            {t('No loans yet')}
          </p>
          <p className="text-sm mt-1.5 text-base-content/30">
            {t('Create your first loan to get started')}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((loan) => {
            const isPaid = loan.status === 'paid'
            return (
              <div
                key={loan.id}
                className="group flex items-center gap-4 bg-base-100 rounded-xl px-5 py-4 border border-base-200/50 cursor-pointer transition-all duration-200 hover:border-primary/20 hover:shadow-sm active:scale-[0.99]"
                onClick={() => navigate(`/loans/${loan.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ')
                    navigate(`/loans/${loan.id}`)
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
                  {loan.contact.name.charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={
                        'truncate text-sm font-medium ' +
                        (isPaid ? 'text-base-content/50 line-through' : '')
                      }
                    >
                      {loan.contact.name}
                    </span>
                    <span
                      className={
                        'badge badge-sm ' +
                        (isPaid
                          ? 'badge-soft badge-success'
                          : 'badge-soft badge-warning')
                      }
                    >
                      {isPaid ? t('Paid') : t('Active')}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-base-content/40">
                    {formatDate(loan.createdAt, t)}
                  </div>
                </div>

                <div className="shrink-0 text-right -mr-1">
                  <span
                    className={
                      'tabular-nums text-lg font-bold ' +
                      (isPaid ? 'text-base-content/30' : 'text-base-content')
                    }
                  >
                    {getCurrencySymbol(loan.currency)}{Number(loan.amount).toLocaleString()}
                  </span>
                  {loan.estimatedPaymentDate && !isPaid ? (
                    <div className="mt-0.5 text-[11px] text-base-content/40">
                      {formatDue(loan.estimatedPaymentDate, t)}
                    </div>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default Home