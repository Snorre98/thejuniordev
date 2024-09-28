import { supabase } from "../../supabaseClient";
import { STORAGE_BASE_URL } from "../constants";

export function getFullIconUrl(iconPath: string) {
	if (!iconPath) {
		console.error("Invalid icon path");
		return "";
	}
	return `${STORAGE_BASE_URL}app.icons/${iconPath}`;
}

export async function getFavoriteApps() {
	try {
		const { data, error } = await supabase
			.from("favorite_apps")
			.select("id, app_title, opens, icon_url")
			.order("app_title", { ascending: true });

		if (error) {
			throw error;
		}

		return data;
	} catch (error) {
		console.error("Error fetching apps:", error);
		return [];
	}
}

export async function getApps() {
	try {
		const { data, error } = await supabase
			.from("apps")
			.select("id, app_title, opens, icon_url")
			.order("app_title", { ascending: true });

		if (error) {
			throw error;
		}

		return data;
	} catch (error) {
		console.error("Error fetching apps:", error);
		return [];
	}
}
