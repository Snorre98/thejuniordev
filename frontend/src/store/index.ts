import { create } from 'zustand'
import { AppSlice, createAppSlice } from './slices/appSlice'

type StoreState = AppSlice;

export const useStore = create<StoreState>()((...a) => ({
  ...createAppSlice(...a),
}))