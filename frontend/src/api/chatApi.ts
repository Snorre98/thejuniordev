import { supabase } from "../../supabaseClient";
import { STORAGE_BASE_URL } from "../constants";

export function getFullIconUrl(iconPath: string) {
	if (!iconPath) {
		console.error("Invalid icon path");
		return "";
	}
	return `${STORAGE_BASE_URL}avatars/${iconPath}`;
}

export interface Message {
	id: number;
	created_at: string;
	message_text: string;
	is_sender: boolean;
	sender: string;
}

export async function fetchMessages(): Promise<Message[]> {
	try {
		const { data, error } = await supabase.from("chat_message").select("*");

		if (error) {
			console.error("Error fetching messages:", error);
			return [];
		}
		return data || [];
	} catch (error) {
		console.error("Exception while fetching messages:", error);
		return [];
	}
}

export async function fetchLatestMessage(): Promise<Message | null> {
	try {
		const { data, error } = await supabase
			.from("chat_message")
			.select("*")
			.order("created_at", { ascending: false })
			.limit(1)
			.single();

		if (error) {
			console.error("Error fetching latest message:", error);
			return null;
		}
		return data || null;
	} catch (error) {
		console.error("Exception while fetching latest message:", error);
		return null;
	}
}

export interface User {
	id: string;
	user_name: string;
	avatar: string;
}

export async function fetchUsername(id: string): Promise<Partial<User> | null> {
	try {
		const { data, error } = await supabase
			.from("user")
			.select("user_name")
			.eq("id", id)
			.single();
		if (error) {
			console.error("Error fetching latest message:", error);
			return null;
		}
		return data;
	} catch (error) {
		console.error("Exception while fetching latest message:", error);
		return null;
	}
}
