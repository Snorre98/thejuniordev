import { StateCreator } from "zustand"

export type AppState = {
  currentScreen: 'lock' | 'home' | 'messages' | 'bio' | 'portfolio' | 'cv'
  isPulledUp: boolean
  setScreen: (screen: AppState['currentScreen']) => void
  setPulledUp: (isPulledUp: boolean) => void
}

export const createAppSlice: StateCreator<AppState> = (set) => ({
  currentScreen: 'lock',
  isPulledUp: false,
  setScreen: (screen) => set({ currentScreen: screen }),
  setPulledUp: (isPulledUp) => set({ isPulledUp }),
})