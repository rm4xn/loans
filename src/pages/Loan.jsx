import { useParams } from 'react-router'
import { ArrowLeft, Calendar, Clock, Tag, Trash, Pencil, MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router'
import { useStore } from '../store'
import LoanForm from '../components/LoanForm'

function Loan() {
  const { id } = useParams()
  const loan = useStore((state) => state.loans.find((loan) => loan.id === id))
  const deleteLoan = useStore((state) => state.deleteLoan)
  const navigate = useNavigate()

  const sendWhatsAppReminder = () => {
    const message = `Reminder: You are owed $${loan.amount} by me. Please pay back as soon as possible.`
    const whatsappUrl = `https://wa.me/${loan.contact.phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this loan?')) {
      deleteLoan(loan.id)
      navigate(-1)
    }
  }

  if (!loan) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-base-content/30">
        <div className="size-16 rounded-2xl bg-base-200 flex items-center justify-center mb-5">
          <Tag className="size-8 stroke-1" />
        </div>
        <p className="text-lg font-medium text-base-content/40">
          Loan not found
        </p>
      </div>
    )
  }

  const isPaid = loan.status === 'paid'

  return (
    <>
      {/* Back button */}
      <button
        className="btn btn-circle btn-ghost btn-sm mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="size-5" />
      </button>

      {/* Hero Card */}
      <div className="bg-base-100 rounded-2xl border border-base-200/60 p-6 mb-6">
        <div className="flex items-center gap-4 mb-5">
          <div
            className={
              'flex size-14 shrink-0 items-center justify-center rounded-2xl text-xl font-semibold ' +
              (isPaid
                ? 'bg-base-200 text-base-content/40'
                : 'bg-primary/10 text-primary')
            }
          >
            {loan.contact.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-semibold tracking-tight truncate">
              {loan.contact.name}
            </h1>
            <div className="flex items-center gap-2 mt-1">
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
              <span className="text-xs text-base-content/40">
                {loan.contact.phoneNumber}
              </span>
            </div>
          </div>
        </div>

        {/* Amount */}
        <div className="mb-6">
          <p className="text-xs text-base-content/40 font-medium uppercase tracking-widest mb-1">
            Amount
          </p>
          <p className="text-3xl font-bold tracking-tight">
            ${Number(loan.amount).toLocaleString()}
          </p>
        </div>

        {/* Detail grid */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-base-200/60">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-base-content/40 font-medium mb-1">
              <Calendar className="size-3.5" />
              <span>Created</span>
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
            <div className="flex items-center gap-1.5 text-xs text-base-content/40 font-medium mb-1">
              <Clock className="size-3.5" />
              <span>Due Date</span>
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

      {/* Actions */}
      <div className="space-y-2">
        <button
          className="btn btn-outline btn-block justify-start gap-3 h-12"
          onClick={() => document.getElementById('loanEditModal').showModal()}
        >
          <Pencil className="size-4" />
          Edit Loan
        </button>
        <button
          className="btn btn-outline btn-block justify-start gap-3 h-12"
          onClick={sendWhatsAppReminder}
        >
          <MessageCircle className="size-4 text-[#25D366]" />
          WhatsApp Reminder
        </button>
        <button
          className="btn btn-outline btn-block justify-start gap-3 h-12 text-error/70 hover:text-error hover:border-error/30"
          onClick={handleDelete}
        >
          <Trash className="size-4" />
          Delete Loan
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