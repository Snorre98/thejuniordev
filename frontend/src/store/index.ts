import { create } from 'zustand'
import { AppState, createAppSlice } from './slices/appSlice'

export const useStore = create<AppState>()((...a) => ({
  ...createAppSlice(...a),
}))