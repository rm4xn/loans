import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import i18n from '../i18n'
import { getNextId } from './utils/id'

const STORE_VERSION = 1
const STORE_KEY = `store:v${STORE_VERSION}`

let mediaQuery = null

function applyTheme(theme) {
  if (theme === 'system') {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', handleSystemChange)
  } else if (mediaQuery) {
    mediaQuery.removeEventListener('change', handleSystemChange)
    mediaQuery = null
  }

  document.documentElement.setAttribute('data-theme', theme)
}

function handleSystemChange(e) {
  document.documentElement.setAttribute(
    'data-theme',
    e.matches ? 'dark' : 'light',
  )
}

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
      contacts: [...state.contacts, { ...contact, id: getNextId(state.contacts) }],
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
  theme: 'system',
  setTheme: (theme) =>
    set(() => {
      applyTheme(theme)
      return { theme }
    }),
})

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/

function createSafeStorage() {
  try {
    localStorage.getItem('__test')
  } catch {
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

// Sync i18n language and theme when store is rehydrated from storage
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
