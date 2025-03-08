import { useQuery } from '@tanstack/react-query';
import { fetchLatestMessage, fetchMessages, fetchThreads, fetchUser, getFullIconUrl } from '../api/chatApi';

// Query keys for better cache management
export const chatQueryKeys = {
  threads: 'threads',
  messages: (threadId: string) => ['messages', threadId],
  latestMessage: 'latestMessage',
  user: (userId: string) => ['user', userId],
};

export function useThreads() {
  return useQuery({
    queryKey: [chatQueryKeys.threads],
    queryFn: fetchThreads,
    select: (threads) =>
      threads.map((thread) => ({
        ...thread,
        user_2: {
          ...thread.user_2,
          avatar: getFullIconUrl(thread.user_2?.avatar || ''),
        },
      })),
  });
}

export function useMessages(threadId: string | null) {
  return useQuery({
    queryKey: chatQueryKeys.messages(threadId || ''),
    queryFn: () => fetchMessages(threadId || ''),
    enabled: !!threadId, // Only run if threadId is provided
  });
}

export function useLatestMessage() {
  return useQuery({
    queryKey: [chatQueryKeys.latestMessage],
    queryFn: fetchLatestMessage,
  });
}

export function useUser(userId: string | null) {
  return useQuery({
    queryKey: chatQueryKeys.user(userId || ''),
    queryFn: () => fetchUser(userId || ''),
    enabled: !!userId, // Only run if userId is provided
  });
}
