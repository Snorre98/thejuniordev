import { supabase } from '../../supabaseClient';

export interface Message {
  id: number;
  created_at: string;
  message_text: string;
  is_sender: boolean;
  sender: string;
}

export async function fetchMessages(): Promise<Message[]> {
  try {
    let { data, error } = await supabase.from('chat_messages').select('*');

    if (error) {
      console.error('Error fetching messages:', error);
      return [];
    } else {
      return data || [];
    }
  } catch (err) {
    console.error('Exception while fetching messages:', err);
    return [];
  }
}
