import type { StateCreator } from "zustand";
import type { Screens } from "../../types";
import type { CombinedState } from "../store";

export interface AppState {
	currentScreen: Screens;
	isPulledUp: boolean;
	backgrounds: { [key in Screens]?: string };
	defaultBackground: string;
	setScreen: (screen: Screens) => void;
	setPulledUp: (isPulledUp: boolean) => void;
	setBackground: (screen: Screens, background: string) => void;
	setDefaultBackground: (background: string) => void;
}

export const createAppSlice: StateCreator<CombinedState, [], [], AppState> = (
	set,
) => ({
	currentScreen: "lock",
	isPulledUp: false,
	backgrounds: {},
	defaultBackground: "",
	setScreen: (screen) => set({ currentScreen: screen }),
	setPulledUp: (isPulledUp) => set({ isPulledUp }),
	setBackground: (screen, background) =>
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		set((state: { backgrounds: any }) => ({
			backgrounds: { ...state.backgrounds, [screen]: background },
		})),
	setDefaultBackground: (background) => set({ defaultBackground: background }),
});
