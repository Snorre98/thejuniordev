import { StateCreator } from 'zustand'

export type AppState = {
  currentScreen: 'lock' | 'home' | 'messages' | 'bio' | 'portfolio' | 'cv'
  setScreen: (screen: AppState['currentScreen']) => void
}

export const createAppSlice: StateCreator<AppState> = (set) => ({
  currentScreen: 'lock',
  setScreen: (screen) => set({ currentScreen: screen }),
})