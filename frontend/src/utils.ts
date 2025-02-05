export function getGlobalBackgroundColor(): string {
	return window
		.getComputedStyle(document.body, null)
		.getPropertyValue("background-color");
}
