import { StateCreator } from 'zustand'

export interface AppSlice {
  currentScreen: 'lock' | 'home' | 'messages'
  setScreen: (screen: AppSlice['currentScreen']) => void
}

export const createAppSlice: StateCreator<AppSlice> = (set) => ({
  currentScreen: 'lock',
  setScreen: (screen) => set({ currentScreen: screen }),
})