import { useNavigate } from 'react-router'
import { Trash, SquarePen } from 'lucide-react'
import { useStore } from '../store'
import ContactCreation from '../components/ContactCreation'

function Contacts() {
  const contacts = useStore((state) => state.contacts)
  const deleteContact = useStore((state) => state.deleteContact)
  const navigate = useNavigate()

  const handleDeleteContact = (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      deleteContact(contactId)
    }
  }

  return (
    <>
      <div className="mb-4">
        <button
          className="btn btn-block btn-primary"
          onClick={() =>
            document.getElementById('contactCreationModal').showModal()
          }
        >
          Create New Contact
        </button>
        <ContactCreation
          id="contactCreationModal"
          onCreate={() =>
            document.getElementById('contactCreationModal').close()
          }
        />
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
                    onClick={() => navigate(`/contacts/${contact.id}`)}
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
    </>
  )
}

export default Contacts
