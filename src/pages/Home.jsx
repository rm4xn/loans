import { useNavigate } from 'react-router'
import { ChevronRight, Plus, Wallet, CircleAlert } from 'lucide-react'
import { useStore } from '../store'
import LoanForm from '../components/LoanForm'

function Home() {
  const loans = useStore((state) => state.loans)
  const navigate = useNavigate()

  const sorted = [...loans].sort((a, b) => b.createdAt - a.createdAt)
  const activeCount = loans.filter((l) => l.status === 'active').length

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-base-content">
            My Loans
          </h1>
          {loans.length > 0 && (
            <p className="text-sm text-base-content/50 mt-1">
              {activeCount > 0
                ? `${activeCount} active loan${activeCount === 1 ? '' : 's'}`
                : `${loans.length} total`}
            </p>
          )}
        </div>
        <button
          className="btn btn-primary btn-sm shadow-xs"
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

      {/* Empty State */}
      {sorted.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-base-content/30">
          <div className="size-16 rounded-2xl bg-base-200 flex items-center justify-center mb-5">
            <Wallet className="size-8 stroke-1" />
          </div>
          <p className="text-lg font-medium text-base-content/40">
            No loans yet
          </p>
          <p className="text-sm mt-1.5 text-base-content/30">
            Create your first loan to get started
          </p>
        </div>
      )}

      {/* Loan List */}
      {sorted.length > 0 && (
        <div className="space-y-3">
          {sorted.map((loan) => {
            const isPaid = loan.status === 'paid'
            return (
              <div
                key={loan.id}
                className="group relative flex items-center gap-4 bg-base-100 rounded-xl px-5 py-4 border border-base-200/60 cursor-pointer transition-all duration-200 hover:border-base-300 hover:shadow-sm active:scale-[0.99]"
                onClick={() => navigate(`/loans/${loan.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ')
                    navigate(`/loans/${loan.id}`)
                }}
              >
                {/* Avatar */}
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

                {/* Info */}
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
                      {isPaid ? 'Paid' : 'Active'}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-base-content/40">
                    {formatDate(loan.createdAt)}
                  </div>
                </div>

                {/* Amount */}
                <div className="shrink-0 text-right">
                  <div
                    className={
                      'tabular-nums text-base font-semibold ' +
                      (isPaid ? 'text-base-content/40 line-through' : '')
                    }
                  >
                    ${Number(loan.amount).toLocaleString()}
                  </div>
                  {loan.estimatedPaymentDate && !isPaid && (
                    <div className="mt-0.5 text-[11px] text-base-content/40 flex items-center gap-1 justify-end">
                      <CircleAlert className="size-3" />
                      <span>
                        {formatDue(loan.estimatedPaymentDate)}
                      </span>
                    </div>
                  )}
                </div>

                <ChevronRight className="size-4 shrink-0 text-base-content/20 transition-colors group-hover:text-base-content/40" />
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

function formatDue(dateStr) {
  const due = new Date(dateStr)
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const diff = due.getTime() - now.getTime()
  const days = Math.ceil(diff / 86400000)
  if (days < 0) return `${Math.abs(days)}d overdue`
  if (days === 0) return 'Due today'
  if (days === 1) return 'Due tomorrow'
  return `${days}d left`
}

export default Home