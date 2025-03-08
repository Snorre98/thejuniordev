import { type StateCreator, create } from "zustand";
import { type AppState, createAppSlice } from "./slices/appSlice";
import {
  type AppSliceState,
  createAppSlice as createCurrentAppSlice,
} from "./slices/projectSlice";
import { type ThreadSliceState, createThreadSlice } from "./slices/threadSlice";

export interface CombinedState
  extends AppState,
    ThreadSliceState,
    AppSliceState {}

const createRootSlice: StateCreator<CombinedState> = (...a) => ({
  ...createAppSlice(...a),
  ...createThreadSlice(...a),
  ...createCurrentAppSlice(...a),
});

export const useStore = create<CombinedState>()(createRootSlice);
