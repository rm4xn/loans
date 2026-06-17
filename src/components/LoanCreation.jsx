import { useState } from 'react'
import Loan from '../classes/Loan'
import Contact from '../classes/Contact'
import ContactCreation from './ContactCreation'

function LoanCreation(props) {
  const [amount, setAmount] = useState('')
  const [contact, setContact] = useState(null)
  const [contacts, setContacts] = useState([
    new Contact('John Doe', '123-456-7890'),
    new Contact('Jane Smith', '098-765-4321')
  ])

  function handleClick() {
    if (amount && contact) {
      props.onCreate(new Loan(amount, contact))
    }
  }
  return (
    <>
      Create a new Loan
      <form>
        <fieldset>
          <label>
            Amount
            <input
              type='number'
              placeholder='Amount'
              id='amountInput'
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </label>
        </fieldset>
        <fieldset>
          <label>
            Contact
            <input
              type='text'
              placeholder='Contact'
              id='contactInput'
              list='contacts'
              value={contact?.name || ''}
              onChange={e =>
                setContact(contacts.find(c => c.name === e.target.value))
              }
            />
            <datalist id='contacts'>
              {contacts.map(contact => (
                <option key={contact.name} value={contact.name} />
              ))}
            </datalist>
          </label>
        </fieldset>
        <input type='button' value='Create Loan' onClick={handleClick} />
      </form>
      <ContactCreation
        onCreate={contact => setContacts([...contacts, contact])}
      />
    </>
  )
}

export default LoanCreation
