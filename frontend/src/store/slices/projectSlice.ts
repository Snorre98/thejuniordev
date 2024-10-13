import type { StateCreator } from "zustand";
import type { CombinedState } from "../store";

export interface AppSliceState {
	currentAppId: number | null;
	setCurrentAppId: (appId: number) => void;
	clearCurrentAppId: () => void;
}

export const createAppSlice: StateCreator<
	CombinedState,
	[],
	[],
	AppSliceState
> = (set) => ({
	currentAppId: null,
	setCurrentAppId: (appId: number) => set({ currentAppId: appId }),
	clearCurrentAppId: () => set({ currentAppId: null }),
});
