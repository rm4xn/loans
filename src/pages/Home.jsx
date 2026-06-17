import { useState } from 'react'
import { useNavigate } from 'react-router'
import { ChevronRight } from 'lucide-react'
import Loan from '../classes/Loan'
import Contact from '../classes/Contact'
import LoanCreation from '../components/LoanCreation'

function Home() {
  const [loans, setLoans] = useState([
    new Loan(1000, new Contact('John Doe', '123-456-7890')),
    new Loan(2000, new Contact('Jane Smith', '098-765-4321'))
  ])

  const sendWhatsAppReminder = loan => {
    const message = `Reminder: You are owed $${loan.amount} by me. Please pay back as soon as possible.`
    const whatsappUrl = `https://wa.me/${loan.contact.phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const navigate = useNavigate()

  return (
    <>
      <div className='mb-4'>
        <button
          className='btn btn-block btn-primary'
          onClick={() => document.getElementById('my_modal_1').showModal()}
        >
          Create New Loan
        </button>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        {/* <button className="btn">open modal</button> */}
        <dialog id='my_modal_1' className='modal'>
          <div className='modal-box'>
            <LoanCreation onCreate={loan => setLoans([...loans, loan])} />
            {/* <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">Press ESC key or click the button below to close</p> */}
            <div className='modal-action'>
              <form method='dialog'>
                {/* if there is a button in form, it will close the modal */}
                <button className='btn'>Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>

      <section>
        <h1 className='pt-4 pb-2 text-2xl font-bold'>My Loans</h1>

        <ul className='list bg-base-100 rounded-box shadow-md'>
          {loans
            .sort((a, b) => b.createdAt - a.createdAt)
            .map(loan => (
              <li className='list-row' key={loan._id}>
                <div>
                  <img
                    className='size-10 rounded-box'
                    src='https://img.daisyui.com/images/profile/demo/1@94.webp'
                  />
                </div>
                <div>
                  <div>{loan.contact.name}</div>
                  <div className='text-xs uppercase font-semibold opacity-60'>
                    {loan.createdAt.toLocaleString()}
                  </div>
                </div>
                <div className='flex items-center'>
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
                  className='btn btn-square btn-ghost'
                  onClick={() => navigate(`/loans/${loan._id}`)}
                >
                  <ChevronRight />
                </button>
              </li>
              // <li key={loan._id}>
              //   {/* <p>Status: {loan.status}</p> */}
              //   <p>Amount: {loan.amount}</p>
              //   <p>Contact: {loan.contact.name}</p>
              //   <p>Created At: {loan.createdAt.toLocaleString()}</p>
              //   <button
              //     onClick={() => {
              //       sendWhatsAppReminder(loan)
              //     }}
              //     >
              //     Send WhatsApp Reminder
              //   </button>
              //   <button
              //     onClick={() => {
              //       setLoans(
              //         loans.map(l => (l === loan ? { ...l, status: 'paid' } : l))
              //       )
              //     }}
              //     >
              //     Mark as Paid
              //   </button>
              // </li>
            ))}
        </ul>
      </section>

      {/* <section>
        <h2>My Paid Loans</h2>
        <ol>
          {loans
            .filter(loan => loan.status === 'paid')
            .sort((a, b) => b.createdAt - a.createdAt)
            .map(loan => (
              <li key={loan._id}>
                <p>Status: {loan.status}</p>
                <p>Amount: {loan.amount}</p>
                <p>Contact: {loan.contact.name}</p>
                <p>Created At: {loan.createdAt.toLocaleString()}</p>
              </li>
            ))}
        </ol>
      </section> */}
    </>
  )
}

export default Home
