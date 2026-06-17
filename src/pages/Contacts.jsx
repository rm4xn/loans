import { useNavigate } from 'react-router'
import { ChevronRight } from 'lucide-react'
import { useStore } from '../store'
import ContactCreation from '../components/ContactCreation'

function Contacts() {
  const contacts = useStore((state) => state.contacts)
  const navigate = useNavigate()

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
              <li className="list-row" key={contact._id}>
                <div></div>
                <div className="flex items-center">{contact.name}</div>
                <button
                  className="btn btn-square btn-ghost"
                  onClick={() => navigate(`/contacts/${contact._id}`)}
                >
                  <ChevronRight />
                </button>
              </li>
            ))}
        </ul>
      </section>
    </>
  )
}

export default Contacts
