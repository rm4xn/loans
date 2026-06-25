import { createJSONStorage } from 'zustand/middleware'

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/

export function createSafeStorage() {
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
