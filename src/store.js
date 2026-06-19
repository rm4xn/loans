import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

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
  deleteContact: (id) =>
    set((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    })),
})

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
const storage = createJSONStorage(() => localStorage, {
  reviver: (key, value) =>
    typeof value === 'string' && ISO_DATE_REGEX.test(value)
      ? new Date(value)
      : value,
})

export const useStore = create(
  persist(store, {
    name: 'store',
    storage,
  }),
)
