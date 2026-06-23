import { useEffect, useState } from 'react'
import { useStore } from '../store'
import Contact from '../classes/Contact'

export default function ContactForm({ id, contact, onClose }) {
  const [name, setName] = useState(contact?.name || '')
  const [phoneNumber, setPhoneNumber] = useState(contact?.phoneNumber || '')

  const addContact = useStore((state) => state.addContact)
  const updateContact = useStore((state) => state.updateContact)

  useEffect(() => {
    document.getElementById(id).showModal()
  }, [id])

  function handleClick() {
    document.getElementById(id).close()
    const formData = { name, phoneNumber }
    if (contact) {
      updateContact(contact.id, formData)
    } else {
      addContact(new Contact(formData.name, formData.phoneNumber))
    }
    onClose()
  }

  return (
    <dialog id={id} className="modal" onClose={onClose}>
      <div className="modal-box w-max">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="text-lg font-bold">
          {contact ? 'Edit Contact' : 'Create Contact'}
        </h3>
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
            {contact ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </dialog>
  )
}
