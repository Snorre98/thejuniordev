import type { StateCreator } from "zustand";

export type Screen = "lock" | "home" | "messages" | "bio" | "chat" | "project";

export type AppState = {
	currentScreen: Screen;
	isPulledUp: boolean;
	backgrounds: { [key in Screen]?: string };
	defaultBackground: string;
	setScreen: (screen: Screen) => void;
	setPulledUp: (isPulledUp: boolean) => void;
	setBackground: (screen: Screen, background: string) => void;
	setDefaultBackground: (background: string) => void;
};

export const createAppSlice: StateCreator<AppState> = (set) => ({
	currentScreen: "lock",
	isPulledUp: false,
	backgrounds: {},
	defaultBackground: "",
	setScreen: (screen) => set({ currentScreen: screen }),
	setPulledUp: (isPulledUp) => set({ isPulledUp }),
	setBackground: (screen, background) =>
		set((state) => ({
			backgrounds: { ...state.backgrounds, [screen]: background },
		})),
	setDefaultBackground: (background) => set({ defaultBackground: background }),
});
