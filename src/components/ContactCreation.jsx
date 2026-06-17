import { useState } from 'react'
import Contact from '../classes/Contact'

function ContactCreation(props) {
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  function handleClick() {
    if (name && phoneNumber) {
      const contact = new Contact(name, phoneNumber)
      props.onCreate(contact)
    }
  }

  return (
    <>
      Create a new Contact
      <form>
        <fieldset>
          <label>
            Name
            <input
              type='text'
              placeholder='Contact Name'
              id='contactInput'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>
        </fieldset>
        <fieldset>
          <label>
            Phone Number
            <input
              type='tel'
              placeholder='Phone Number'
              id='phoneInput'
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
            />
          </label>
        </fieldset>
        <input type='button' value='Create Contact' onClick={handleClick} />
      </form>
    </>
  )
}

export default ContactCreation
