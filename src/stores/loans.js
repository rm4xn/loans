import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getNextId } from '../utils/id'
import { createSafeStorage } from '../utils/storage'

const loansStore = (set) => ({
  items: [],
  add: (item) =>
    set((state) => ({
      items: [...state.items, { ...item, id: getNextId(state.items) }],
    })),
  update: (id, updated) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, ...updated, id: item.id } : item,
      ),
    })),
  delete: (id) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
})

export const useLoansStore = create(
  persist(loansStore, {
    name: 'loans-storage',
    storage: createSafeStorage(),
  }),
)
