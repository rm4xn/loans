import { Trash, SquarePen, Phone, Plus, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useContactsStore } from '../stores/contacts'
import EmptyState from '../components/EmptyState'
import ContactForm from '../components/ContactForm'

function Contacts() {
  const { t } = useTranslation()
  const { items: contacts, delete: deleteContact } = useContactsStore()
  const [selectedContact, setSelectedContact] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleDeleteContact = (contactId) => {
    if (window.confirm(t('Delete contact confirmation'))) {
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-base-content">
            {t('Contacts')}
          </h1>
          {contacts.length > 0 ? (
            <p className="text-sm text-base-content/50 mt-1">
              {t('contact', { count: contacts.length })}
            </p>
          ) : null}
        </div>
        <button
          className="btn btn-primary btn-sm shadow-xs"
          onClick={handleCreateContact}
        >
          <Plus className="size-4" />
          {t('Add Contact')}
        </button>
      </div>

      {sorted.length === 0 ? (
        <EmptyState
          icon={Users}
          title={t('No contacts yet')}
          description={t('Add your first contact to start tracking loans')}
        />
      ) : (
        <div className="space-y-3">
          {sorted.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center gap-4 bg-base-100 rounded-xl px-5 py-4 border border-base-200/50 transition-all duration-200 hover:border-primary/20 hover:shadow-sm"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-sm font-semibold text-secondary">
                {contact.name.charAt(0).toUpperCase()}
              </div>

              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">
                  {contact.name}
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-base-content/40">
                  <Phone className="size-3" />
                  <span>{contact.phoneNumber}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  className="btn btn-square btn-ghost btn-sm size-9 text-base-content/40 hover:text-base-content"
                  onClick={() => handleEditContact(contact)}
                  aria-label={t('Edit contact')}
                >
                  <SquarePen className="size-4" />
                </button>
                <button
                  className="btn btn-square btn-ghost btn-sm size-9 text-error/50 hover:text-error"
                  onClick={() => handleDeleteContact(contact.id)}
                  aria-label={t('Delete contact')}
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
          key={selectedContact?.id ?? 'new'}
          contact={selectedContact}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default Contacts
