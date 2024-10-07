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

export async function getProjects() {
	try {
		const { data, error } = await supabase.from("projects").select("*");
		if (error) {
			throw error;
		}
		return data;
	} catch (error) {
		console.error("Error fetching apps:", error);
		return [];
	}
}

export async function getProjectByAppId(appId: number) {
	try {
		const { data, error } = await supabase
			.from("apps")
			.select(`
          id,
          app_title,
          icon_url,
          opens,
          project:project (
            id,
            title,
            icon,
            participants,
            category,
            repo,
            description,
            technology,
            techlist
          )
        `)
			.eq("id", appId)
			.single();

		if (error) {
			throw error;
		}

		if (!data || !data.project) {
			throw new Error("Project not found for the given app ID");
		}

		return {
			app: {
				id: data.id,
				app_title: data.app_title,
				icon_url: data.icon_url,
				opens: data.opens,
			},
			project: data.project,
		};
	} catch (error) {
		console.error("Error fetching project by app ID:", error);
		throw error;
	}
}
