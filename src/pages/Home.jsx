import { useNavigate } from 'react-router'
import { ChevronRight } from 'lucide-react'
import { useStore } from '../store'
import LoanCreation from '../components/LoanCreation'

function Home() {
  const loans = useStore((state) => state.loans)
  const navigate = useNavigate()

  return (
    <>
      <div className="mb-4">
        <button
          className="btn btn-block btn-primary"
          onClick={() =>
            document.getElementById('loanCreationModal').showModal()
          }
        >
          Create New Loan
        </button>
        <LoanCreation
          id="loanCreationModal"
          onClose={() => document.getElementById('loanCreationModal').close()}
        />
      </div>
      <section>
        <h1 className="pt-4 pb-2 text-2xl font-bold">My Loans</h1>

        <ul className="list bg-base-100 rounded-box shadow-md">
          {loans
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((loan) => (
              <li className="list-row" key={loan._id}>
                <div></div>
                <div>
                  <div>{loan.contact.name}</div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {loan.createdAt.toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center">
                  <div
                    className={
                      'font-bold ' +
                      (loan.status === 'paid'
                        ? 'text-green-500'
                        : 'text-red-500')
                    }
                  >
                    ${loan.amount}
                  </div>
                </div>
                <button
                  className="btn btn-square btn-ghost"
                  onClick={() => navigate(`/loans/${loan.id}`)}
                >
                  <ChevronRight />
                </button>
              </li>
            ))}
        </ul>
      </section>
    </>
  )
}

export default Home
