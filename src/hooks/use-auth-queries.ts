'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';

// Query Keys
export const authQueryKeys = {
  session: ['auth', 'session'] as const,
  user: ['auth', 'user'] as const,
  accounts: ['auth', 'accounts'] as const,
} as const;

// Accounts Query
export function useAccountsQuery() {
  return useQuery({
    queryKey: authQueryKeys.accounts,
    queryFn: async () => {
      const result = await authClient.listAccounts();
      return result.data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}

// Session Query
export function useSessionQuery() {
  return useQuery({
    queryKey: authQueryKeys.session,
    queryFn: async () => {
      const result = await authClient.getSession();
      return result.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}

// User Query
export function useUserQuery() {
  return useQuery({
    queryKey: authQueryKeys.user,
    queryFn: async () => {
      const result = await authClient.getSession();
      return result.data?.user || null;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}

// Sign In Mutation
export function useSignInMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { provider: string }) => {
      return await authClient.signIn.social(params);
    },
    onSuccess: async () => {
      // Invalidate and refetch session data
      await queryClient.invalidateQueries({ queryKey: authQueryKeys.session });
      await queryClient.invalidateQueries({ queryKey: authQueryKeys.user });
      toast.success('Successfully signed in!');
    },
    onError: (error) => {
      console.error('Sign in error:', error);
      toast.error('Failed to sign in', {
        description: 'Please try again or contact support if the issue persists.',
      });
    },
  });
}

// Sign Out Mutation
export function useSignOutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await authClient.signOut();
    },
    onSuccess: () => {
      // Clear all auth-related queries
      queryClient.clear();
      toast.success('Successfully signed out!');
    },
    onError: (error) => {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out', {
        description: 'Please try again.',
      });
    },
  });
}

// Update User Mutation
export function useUpdateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: { name?: string; email?: string }) => {
      return await authClient.updateUser(userData);
    },
    onSuccess: async () => {
      // Invalidate and refetch user data
      await queryClient.invalidateQueries({ queryKey: authQueryKeys.user });
      await queryClient.invalidateQueries({ queryKey: authQueryKeys.session });
      toast.success('Profile updated successfully!', {
        description: 'Your profile information has been saved.',
      });
    },
    onError: (error) => {
      console.error('Update user error:', error);
      toast.error('Failed to update profile', {
        description: 'Please try again. If the problem persists, contact support.',
      });
    },
  });
}

// Link Account Mutation
export function useLinkAccountMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { provider: string }) => {
      return await authClient.linkSocial(params);
    },
    onSuccess: async (_, variables) => {
      // Invalidate and refetch session data
      await queryClient.invalidateQueries({ queryKey: authQueryKeys.session });
      await queryClient.invalidateQueries({ queryKey: authQueryKeys.user });
      await queryClient.invalidateQueries({ queryKey: authQueryKeys.accounts });
      toast.success('Account linked successfully!', {
        description: `Your ${variables.provider} account has been connected.`,
      });
    },
    onError: (error, variables) => {
      console.error(`Link account error:`, error);
      toast.error(`Failed to link ${variables.provider} account`, {
        description: 'Please try again. Make sure you have the necessary permissions.',
      });
    },
  });
}

// Unlink Account Mutation
export function useUnlinkAccountMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { provider: string; accountId?: string }) => {
      return await authClient.unlinkAccount({
        providerId: params.provider,
        ...(params.accountId && { accountId: params.accountId }),
      });
    },
    onSuccess: async (_, variables) => {
      // Invalidate and refetch session data
      await queryClient.invalidateQueries({ queryKey: authQueryKeys.session });
      await queryClient.invalidateQueries({ queryKey: authQueryKeys.user });
      await queryClient.invalidateQueries({ queryKey: authQueryKeys.accounts });
      toast.success('Account disconnected', {
        description: `Your ${variables.provider} account has been disconnected.`,
      });
    },
    onError: (error, variables) => {
      console.error(`Unlink account error:`, error);
      toast.error(`Failed to disconnect ${variables.provider} account`, {
        description: 'Please try again later.',
      });
    },
  });
}

// Convenience hooks
export function useAuth() {
  const sessionQuery = useSessionQuery();
  const signInMutation = useSignInMutation();
  const signOutMutation = useSignOutMutation();
  const linkAccountMutation = useLinkAccountMutation();
  const unlinkAccountMutation = useUnlinkAccountMutation();

  return {
    session: sessionQuery.data,
    user: sessionQuery.data?.user || null,
    isLoading: sessionQuery.isLoading,
    isAuthenticated: !!sessionQuery.data,
    signIn: {
      social: signInMutation.mutate,
      isLoading: signInMutation.isPending,
    },
    signOut: {
      mutate: signOutMutation.mutate,
      isLoading: signOutMutation.isPending,
    },
    linkAccount: {
      mutate: linkAccountMutation.mutate,
      isLoading: linkAccountMutation.isPending,
    },
    unlinkAccount: {
      mutate: unlinkAccountMutation.mutate,
      isLoading: unlinkAccountMutation.isPending,
    },
  };
}

export function useSession() {
  const sessionQuery = useSessionQuery();
  return {
    data: sessionQuery.data,
    isLoading: sessionQuery.isLoading,
    error: sessionQuery.error,
  };
}

export function useUser() {
  const userQuery = useUserQuery();
  return {
    data: userQuery.data,
    isLoading: userQuery.isLoading,
    error: userQuery.error,
  };
}
