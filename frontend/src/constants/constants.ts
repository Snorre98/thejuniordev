export const THEME = {
    DARK: "theme-dark",
    LIGHT: "theme-light",
} as const;

export type ThemeKey = keyof typeof THEME;
export type ThemeValue = (typeof THEME)[ThemeKey]

export const THEME_KEY = "data-theme"

export const largeDesktopBpLower = 1201;
export const desktopBpUpper = 1200;
export const desktopBpLower = 993;

export const tabletBpUpper = 992;
export const tabletBpLower = 769;

export const mobileBpUpper = 768;