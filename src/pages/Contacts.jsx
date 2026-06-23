import { Trash, SquarePen } from 'lucide-react'
import { useStore } from '../store'
import ContactForm from '../components/ContactForm'
import { useState } from 'react'

function Contacts() {
  const contacts = useStore((state) => state.contacts)
  const deleteContact = useStore((state) => state.deleteContact)
  const [selectedContact, setSelectedContact] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleDeleteContact = (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      deleteContact(contactId)
    }
  }

  const handleCreateContact = () => {
    setSelectedContact(null)
    setIsOpen(true)
  }

  const handleEditContact = (contact) => {
    setSelectedContact(contact)
    setIsOpen(true)
  }

  return (
    <>
      <div className="mb-4">
        <button
          className="btn btn-block btn-primary"
          onClick={handleCreateContact}
        >
          Create New Contact
        </button>
      </div>

      <section>
        <h1 className="pt-4 pb-2 text-2xl font-bold">My Contacts</h1>

        <ul className="list bg-base-100 rounded-box shadow-md">
          {contacts
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((contact) => (
              <li className="list-row" key={contact.id}>
                <div></div>
                <div>
                  <div>{contact.name}</div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {contact.phoneNumber}
                  </div>
                </div>
                <div>
                  <button
                    className="btn btn-square btn-ghost"
                    onClick={() => handleEditContact(contact)}
                  >
                    <SquarePen />
                  </button>
                  <button
                    className="btn btn-square btn-ghost btn-error"
                    onClick={() => handleDeleteContact(contact.id)}
                  >
                    <Trash />
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </section>
      {isOpen && (
        <ContactForm
          id="contactModal"
          onClose={() => {
            setIsOpen(false)
          }}
          {...(selectedContact && { contact: selectedContact })}
        />
      )}
    </>
  )
}

export default Contacts
