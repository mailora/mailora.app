import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface Conversation {
  _id: string;
  title: string;
  emailType?: string;
  tone?: string;
  totalTokens: number;
  timeTaken: number;
  createdAt: string;
  updatedAt: string;
}

interface ConversationDetail extends Conversation {
  userId: string;
  messages: Array<{
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
    tokens?: {
      input: number;
      output: number;
      total: number;
    };
    timeTaken?: number;
  }>;
}

export function useConversations() {
  return useQuery<Conversation[]>({
    queryKey: ['conversations'],
    queryFn: async () => {
      const response = await fetch('/api/conversations');
      if (!response.ok) {
        throw new Error('Failed to fetch conversations');
      }
      return response.json();
    },
  });
}

export function useConversation(id: string) {
  return useQuery<ConversationDetail>({
    queryKey: ['conversation', id],
    queryFn: async () => {
      const response = await fetch(`/api/conversations/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch conversation');
      }
      return response.json();
    },
    enabled: !!id,
  });
}

export function useDeleteConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/conversations/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete conversation');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
}
