import type { StateCreator } from "zustand";
import type { CombinedState } from "../store";

export interface ThreadSliceState {
	currentThreadId: string | null;
	setCurrentThreadId: (threadId: string) => void;
	clearCurrentThreadId: () => void;
}

export const createThreadSlice: StateCreator<
	CombinedState,
	[],
	[],
	ThreadSliceState
> = (set) => ({
	currentThreadId: null,
	setCurrentThreadId: (threadId: string) => set({ currentThreadId: threadId }),
	clearCurrentThreadId: () => set({ currentThreadId: null }),
});
