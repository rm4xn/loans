import i18n from '../../i18n'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { applyTheme } from '../utils/theme'
import { createSafeStorage } from '../utils/storage'

const settingsStore = (set) => ({
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

export const useSettingsStore = create(
  persist(settingsStore, {
    name: 'settings-storage',
    storage: createSafeStorage(),
    onRehydrateStorage: onRehydrate,
  }),
)
