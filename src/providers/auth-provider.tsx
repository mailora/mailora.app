'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { User, Session } from '@/lib/auth';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: {
    social: (params: { provider: string }) => Promise<void>;
  };
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const sessionData = await authClient.getSession();
        if (sessionData.data) {
          setSession(sessionData.data);
          setUser(sessionData.data.user);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const signIn = {
    social: async (params: { provider: string }) => {
      try {
        setIsLoading(true);
        await authClient.signIn.social(params);
        // After successful sign in, refresh session
        const sessionData = await authClient.getSession();
        if (sessionData.data) {
          setSession(sessionData.data);
          setUser(sessionData.data.user);
        }
      } catch (error) {
        console.error('Sign in error:', error);
      } finally {
        setIsLoading(false);
      }
    },
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await authClient.signOut();
      setSession(null);
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    session,
    user,
    isLoading,
    isAuthenticated: !!session,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function useSession() {
  const { session, isLoading } = useAuth();
  return { data: session, isLoading };
}

export function useUser() {
  const { user, isLoading } = useAuth();
  return { data: user, isLoading };
}
