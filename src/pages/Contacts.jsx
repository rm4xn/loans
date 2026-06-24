import { Trash, SquarePen, Phone, Plus, Users } from 'lucide-react'
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

  const sorted = [...contacts].sort((a, b) => b.createdAt - a.createdAt)

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-base-content">
            Contacts
          </h1>
          {contacts.length > 0 ? (
            <p className="text-sm text-base-content/50 mt-1">
              {contacts.length} contact{contacts.length === 1 ? '' : 's'}
            </p>
          ) : null}
        </div>
        <button
          className="btn btn-primary btn-sm shadow-xs"
          onClick={handleCreateContact}
        >
          <Plus className="size-4" />
          Add Contact
        </button>
      </div>

      {/* Empty State */}
      {sorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-base-content/30">
          <div className="size-16 rounded-2xl bg-base-200 flex items-center justify-center mb-5">
            <Users className="size-8 stroke-1" />
          </div>
          <p className="text-lg font-medium text-base-content/40">
            No contacts yet
          </p>
          <p className="text-sm mt-1.5 text-base-content/30">
            Add your first contact to start tracking loans
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((contact) => (
            <div
              key={contact.id}
              className="group flex items-center gap-4 bg-base-100 rounded-xl px-5 py-4 border border-base-200/60 transition-all duration-200 hover:border-base-300 hover:shadow-sm"
            >
              {/* Avatar */}
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-sm font-semibold text-secondary">
                {contact.name.charAt(0).toUpperCase()}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">
                  {contact.name}
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-base-content/40">
                  <Phone className="size-3" />
                  <span>{contact.phoneNumber}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  className="btn btn-square btn-ghost btn-sm size-9"
                  onClick={() => handleEditContact(contact)}
                  title="Edit contact"
                >
                  <SquarePen className="size-4" />
                </button>
                <button
                  className="btn btn-square btn-ghost btn-sm size-9 text-error/70 hover:text-error"
                  onClick={() => handleDeleteContact(contact.id)}
                  title="Delete contact"
                >
                  <Trash className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isOpen && (
        <ContactForm
          id="contactModal"
          contact={selectedContact}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default Contacts