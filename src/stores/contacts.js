import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getNextId } from '../utils/id'
import { createSafeStorage } from '../utils/storage'

const contactsStore = (set) => ({
  items: [],
  add: (contact) =>
    set((state) => ({
      items: [...state.items, { ...contact, id: getNextId(state.items) }],
    })),
  update: (id, updated) =>
    set((state) => ({
      items: state.items.map((contact) =>
        contact.id === id ? { ...updated, id: contact.id } : contact,
      ),
    })),
  delete: (id) =>
    set((state) => ({
      items: state.items.filter((contact) => contact.id !== id),
    })),
})

export const useContactsStore = create(
  persist(contactsStore, {
    name: 'contacts-storage',
    storage: createSafeStorage()
  }),
)
