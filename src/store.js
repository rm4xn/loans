import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import i18n from '../i18n'
import { getNextId } from './utils/id'
import { applyTheme } from './utils/theme'
import { createSafeStorage } from './utils/storage'

const STORE_VERSION = 1
const STORE_KEY = `store:v${STORE_VERSION}`

const store = (set) => ({
  loans: [],
  addLoan: (loan) =>
    set((state) => ({
      loans: [...state.loans, { ...loan, id: getNextId(state.loans) }],
    })),
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
    set((state) => ({
      contacts: [
        ...state.contacts,
        { ...contact, id: getNextId(state.contacts) },
      ],
    })),
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
  language: 'en',
  setLanguage: (lang) =>
    set(() => {
      i18n.changeLanguage(lang)
      return { language: lang }
    }),
  defaultCurrency: 'USD',
  setDefaultCurrency: (currency) => set({ defaultCurrency: currency }),
  whatsappMessage:
    'Reminder: You are owed {{currency}}{{amount}} by me. Please pay back as soon as possible.',
  setWhatsappMessage: (message) => set({ whatsappMessage: message }),
  theme: 'system',
  setTheme: (theme) =>
    set(() => {
      applyTheme(theme)
      return { theme }
    }),
})

const onRehydrate = () => (state) => {
  if (state?.language) {
    i18n.changeLanguage(state.language)
  }
  if (state?.theme) {
    applyTheme(state.theme)
  } else {
    applyTheme('system')
  }
}

export const useStore = create(
  persist(store, {
    name: STORE_KEY,
    storage: createSafeStorage(),
    onRehydrateStorage: onRehydrate,
  }),
)
