import { Plus, Wallet } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useStore } from '../store'
import EmptyState from '../components/EmptyState'
import LoanCard from '../components/LoanCard'
import LoanForm from '../components/LoanForm'

function Home() {
  const { t } = useTranslation()
  const loans = useStore((state) => state.loans)

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
        <EmptyState
          icon={Wallet}
          title={t('No loans yet')}
          description={t('Create your first loan to get started')}
        />
      ) : (
        <div className="space-y-3">
          {sorted.map((loan) => (
            <LoanCard key={loan.id} loan={loan} />
          ))}
        </div>
      )}
    </>
  )
}

export default Home