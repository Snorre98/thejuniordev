import { create } from 'zustand';
import { type AppState, createAppSlice } from './slices/appSlice';

export const useStore = create<AppState>()((...a) => ({
  ...createAppSlice(...a),
}));
