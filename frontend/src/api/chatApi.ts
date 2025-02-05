import { supabase } from "~/supabaseClient.js";
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

export async function fetchMessages(threadId: string): Promise<Message[]> {
	try {
		const { data, error } = await supabase
			.from("chat_message")
			.select("*")
			.eq("thread", threadId)
			.order("created_at", { ascending: true });

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

export async function fetchUser(id: string): Promise<User | undefined> {
	try {
		const { data, error } = await supabase
			.from("user")
			.select("*")
			.eq("id", id)
			.single();
		if (error) {
			console.error("Error fetching latest message:", error);
			return undefined;
		}
		return data;
	} catch (error) {
		console.error("Exception while fetching latest message:", error);
		return undefined;
	}
}

export interface Thread {
	id: string;
	created_at: string;
	user_1: User;
	user_2: User;
	last_message: Message;
}

export async function fetchThreads(): Promise<Thread[]> {
	try {
		const { data, error } = await supabase
			.from("chat_thread")
			.select(`
		  *,
		  user_1:user!chat_thread_user_1_fkey(*),
		  user_2:user!chat_thread_user_2_fkey(*),
		  chat_message(*)
		`)
			.order("created_at", { ascending: false });

		if (error) {
			console.error("Error fetching threads:", error);
			return [];
		}

		return (
			data?.map((thread) => ({
				...thread,
				last_message: thread.chat_message.sort(
					(
						a: { created_at: string | number | Date },
						b: { created_at: string | number | Date },
					) =>
						new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
				)[0],
			})) || []
		);
	} catch (error) {
		console.error("Exception while fetching threads:", error);
		return [];
	}
}
