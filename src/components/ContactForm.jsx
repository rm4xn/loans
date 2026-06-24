import { useEffect, useState } from 'react'
import { useStore } from '../store'
import Contact from '../classes/Contact'
import { X } from 'lucide-react'

export default function ContactForm({ id, contact, onClose }) {
  const [name, setName] = useState(contact?.name || '')
  const [phoneNumber, setPhoneNumber] = useState(contact?.phoneNumber || '')

  const addContact = useStore((state) => state.addContact)
  const updateContact = useStore((state) => state.updateContact)

  useEffect(() => {
    document.getElementById(id).showModal()
  }, [id])

  function handleClick() {
    if (!name.trim()) return
    document.getElementById(id).close()
    const formData = { name: name.trim(), phoneNumber: phoneNumber.trim() }
    if (contact) {
      updateContact(contact.id, formData)
    } else {
      addContact(new Contact(formData.name, formData.phoneNumber))
    }
    onClose()
  }

  return (
    <dialog id={id} className="modal" onClose={onClose}>
      <div className="modal-box rounded-2xl p-0 overflow-hidden max-w-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h3 className="text-lg font-semibold tracking-tight">
            {contact ? 'Edit Contact' : 'New Contact'}
          </h3>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost text-base-content/40 hover:text-base-content">
              <X className="size-4" />
            </button>
          </form>
        </div>

        {/* Body */}
        <div className="px-6 pb-6 space-y-4">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Name</legend>
            <input
              type="text"
              className="input w-full"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              required
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Phone Number</legend>
            <input
              type="tel"
              className="input w-full"
              placeholder="+1 555-0000"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </fieldset>
        </div>

        {/* Footer */}
        <div className="flex gap-2 px-6 pb-6">
          <form method="dialog" className="flex-1">
            <button className="btn btn-block btn-ghost text-base-content/60">
              Cancel
            </button>
          </form>
          <button
            className="btn btn-primary btn-block flex-1 shadow-xs disabled:opacity-50"
            onClick={handleClick}
            disabled={!name.trim()}
          >
            {contact ? 'Save Changes' : 'Create Contact'}
          </button>
        </div>
      </div>

      {/* Backdrop click to close */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}