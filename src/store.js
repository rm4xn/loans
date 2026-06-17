import { create } from 'zustand'

const store = (set) => ({
  loans: [],
  contacts: [],
  addContact: (contact) =>
    set((state) => ({ contacts: [...state.contacts, contact] })),
  addLoan: (loan) => set((state) => ({ loans: [...state.loans, loan] })),
})

export const useStore = create(store)
