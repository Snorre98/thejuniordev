import { type StateCreator, create } from "zustand";
import { type AppState, createAppSlice } from "./slices/appSlice";
import { type ThreadSliceState, createThreadSlice } from "./slices/threadSlice";

export interface CombinedState extends AppState, ThreadSliceState {}

const createRootSlice: StateCreator<CombinedState> = (...a) => ({
	...createAppSlice(...a),
	...createThreadSlice(...a),
});

export const useStore = create<CombinedState>()(createRootSlice);
