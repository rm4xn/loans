import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const store = (set) => ({
  loans: [],
  contacts: [],
  addContact: (contact) =>
    set((state) => ({ contacts: [...state.contacts, contact] })),
  addLoan: (loan) => set((state) => ({ loans: [...state.loans, loan] })),
})

export const useStore = create(persist(store, { name: 'store' }))
