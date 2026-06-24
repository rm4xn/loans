import { useNavigate } from 'react-router'
import { ChevronRight, Plus, Wallet } from 'lucide-react'
import { useStore } from '../store'
import LoanForm from '../components/LoanForm'

function Home() {
  const loans = useStore((state) => state.loans)
  const navigate = useNavigate()

  const sorted = [...loans].sort((a, b) => b.createdAt - a.createdAt)
  const activeCount = loans.filter((l) => l.status === 'active').length

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">My Loans</h1>
          {loans.length > 0 && (
            <p className="text-sm text-base-content/60 mt-0.5">
              {activeCount > 0
                ? `${activeCount} active loan${activeCount === 1 ? '' : 's'}`
                : `${loans.length} total`}
            </p>
          )}
        </div>
        <button
          className="btn btn-primary"
          onClick={() =>
            document.getElementById('loanCreationModal').showModal()
          }
        >
          <Plus className="size-4" />
          New Loan
        </button>
        <LoanForm
          id="loanCreationModal"
          onClose={() => document.getElementById('loanCreationModal').close()}
        />
      </div>

      {sorted.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-base-content/40">
          <Wallet className="size-14 mb-4 stroke-1" />
          <p className="text-lg font-medium">No loans yet</p>
          <p className="text-sm mt-1">Create your first loan to get started</p>
        </div>
      )}

      {sorted.length > 0 && (
        <div className="space-y-2">
          {sorted.map((loan) => {
            const isPaid = loan.status === 'paid'
            return (
              <div
                key={loan.id}
                className="group flex items-center gap-4 bg-base-100 rounded-xl px-5 py-4 shadow-xs border border-base-200/50 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-base-300"
                onClick={() => navigate(`/loans/${loan.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ')
                    navigate(`/loans/${loan.id}`)
                }}
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {loan.contact.name.charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">
                    {loan.contact.name}
                  </div>
                  <div className="mt-0.5 text-xs text-base-content/50">
                    {formatDate(loan.createdAt)}
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <div className="tabular-nums font-semibold">
                    ${Number(loan.amount).toLocaleString()}
                  </div>
                  <div
                    className={
                      'mt-0.5 inline-block rounded-full px-1.5 py-0.5 text-[10px] font-medium ' +
                      (isPaid
                        ? 'bg-success/10 text-success'
                        : 'bg-warning/10 text-warning')
                    }
                  >
                    {isPaid ? 'Paid' : 'Active'}
                  </div>
                </div>

                <ChevronRight className="size-4 shrink-0 text-base-content/30 transition-colors group-hover:text-base-content/60" />
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

function formatDate(date) {
  if (!date) return ''
  const d = date instanceof Date ? date : new Date(date)
  const diff = Date.now() - d.getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  if (days < 365) return `${Math.floor(days / 30)}mo ago`
  return d.toLocaleDateString()
}

export default Home
