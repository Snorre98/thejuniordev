import { THEME_KEY, ThemeValue } from './constants';

export function getGlobalBackgroundColor(): string {
  return window.getComputedStyle(document.body, null).getPropertyValue('background-color');
}

export function updateBodyThemeClass(theme: ThemeValue): void {
  document.body.setAttribute(THEME_KEY, theme);
  localStorage.setItem(THEME_KEY, theme);
}
