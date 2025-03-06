import { supabase } from "../supabaseClient";
import { STORAGE_BASE_URL, APPS_BUCKET_NAME } from "../constants";

export function getFullIconUrl(iconPath: string) {
  if (!iconPath) {
    console.error("Invalid icon path");
    return "";
  }
  return `${STORAGE_BASE_URL}${APPS_BUCKET_NAME}${iconPath}`;
}

export async function getFavoriteApps() {
  try {
    const { data, error } = await supabase
      .from("favorite_apps")
      .select("id, app_title, opens, icon_url, project")
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
      .select("id, app_title, opens, icon_url, project")
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
    const { data: projectData, error } = await supabase
      .from("project")
      .select(
        `
                id,
                title,
                icon,
                participants,
                category,
                repo,
                description,
                technology,
                techlist
            `
      )
      .eq("id", appId)
      .single();

    if (error) {
      throw error;
    }

    if (!projectData) {
      throw new Error("Project not found for the given app ID");
    }

    return projectData;
  } catch (error) {
    console.error("Error fetching project by app ID:", error);
    throw error;
  }
}
