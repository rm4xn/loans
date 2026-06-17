import { useState } from 'react'
import Contact from '../classes/Contact'
import { useStore } from '../store'

function ContactCreation(props) {
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const addContact = useStore((state) => state.addContact)

  function handleClick() {
    if (name && phoneNumber) {
      const contact = new Contact(name, phoneNumber)
      addContact(contact)
      props.onCreate()
    }
  }

  return (
    <dialog id={props.id} className="modal">
      <div className="modal-box w-max">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="text-lg font-bold">Create Contact</h3>
        <div className="fieldset">
          <label className="label">Name</label>
          <input
            type="text"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="label">Phone Number</label>
          <input
            type="tel"
            className="input"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <button className="btn btn-neutral mt-4" onClick={handleClick}>
            Create Contact
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default ContactCreation
