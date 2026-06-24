import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const STORE_VERSION = 1
const STORE_KEY = `store:v${STORE_VERSION}`

const store = (set) => ({
  loans: [],
  addLoan: (loan) => set((state) => ({ loans: [...state.loans, loan] })),
  updateLoan: (id, updatedLoan) =>
    set((state) => ({
      loans: state.loans.map((loan) =>
        loan.id === id ? { ...loan, ...updatedLoan, id: loan.id } : loan,
      ),
    })),
  deleteLoan: (id) =>
    set((state) => ({ loans: state.loans.filter((loan) => loan.id !== id) })),
  contacts: [],
  addContact: (contact) =>
    set((state) => ({ contacts: [...state.contacts, contact] })),
  updateContact: (id, updatedContact) =>
    set((state) => ({
      contacts: state.contacts.map((contact) =>
        contact.id === id ? { ...updatedContact, id: contact.id } : contact,
      ),
    })),
  deleteContact: (id) =>
    set((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    })),
})

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/

function createSafeStorage() {
  try {
    // Test localStorage availability (throws in private browsing)
    localStorage.getItem('__test')
  } catch {
    // Fallback in-memory storage when localStorage is unavailable
    const store = new Map()
    return createJSONStorage(() => ({
      getItem: (key) => store.get(key) ?? null,
      setItem: (key, value) => store.set(key, value),
      removeItem: (key) => store.delete(key),
    }))
  }

  return createJSONStorage(() => localStorage, {
    reviver: (key, value) =>
      typeof value === 'string' && ISO_DATE_REGEX.test(value)
        ? new Date(value)
        : value,
  })
}

export const useStore = create(
  persist(store, {
    name: STORE_KEY,
    storage: createSafeStorage(),
  }),
)