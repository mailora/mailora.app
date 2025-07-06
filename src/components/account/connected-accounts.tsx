'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useAuth } from '@/providers/auth-provider';
import { Github, Mail, Link2, Unlink } from 'lucide-react';
import { toast } from 'sonner';

export function ConnectedAccounts() {
  const { user, linkAccount } = useAuth();
  const [isLinking, setIsLinking] = useState(false);

  const handleLinkAccount = async (provider: string) => {
    try {
      setIsLinking(true);
      await linkAccount({ provider });
      toast.success('Account linked successfully!', {
        description: `Your ${provider} account has been connected.`,
      });
    } catch (error) {
      console.error(`Error linking ${provider}:`, error);
      toast.error(`Failed to link ${provider} account`, {
        description: 'Please try again. Make sure you have the necessary permissions.',
      });
    } finally {
      setIsLinking(false);
    }
  };

  const handleUnlinkAccount = async (provider: string) => {
    try {
      // This would need to be implemented with better-auth's unlink functionality
      console.log(`Unlinking ${provider}`);
      toast.success('Account disconnected', {
        description: `Your ${provider} account has been disconnected.`,
      });
    } catch (error) {
      console.error(`Error unlinking ${provider}:`, error);
      toast.error(`Failed to disconnect ${provider} account`, {
        description: 'Please try again later.',
      });
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-4">
      {/* Google Account */}
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          </div>
          <div>
            <div className="font-medium">Google</div>
            <div className="text-sm text-muted-foreground">Connected as {user.email}</div>
          </div>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Unlink className="mr-2 h-4 w-4" />
              Disconnect
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Disconnect Google Account?</AlertDialogTitle>
              <AlertDialogDescription>
                This will remove your Google account connection. You can always reconnect it later.
                You&apos;ll need to use another connected account or email/password to sign in.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleUnlinkAccount('google')}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Disconnect
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* GitHub Account */}
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
            <Github className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-medium">GitHub</div>
            <div className="text-sm text-muted-foreground">
              {/* In a real app, this would check if GitHub is connected */}
              Not connected
            </div>
          </div>
        </div>
        {/* Show connect button when not connected, disconnect when connected */}
        {false ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Unlink className="mr-2 h-4 w-4" />
                Disconnect
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Disconnect GitHub Account?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will remove your GitHub account connection. You can always reconnect it
                  later. Make sure you have another way to sign in to your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleUnlinkAccount('github')}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Disconnect
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Button
            variant="outline"
            size="sm"
            disabled={isLinking}
            onClick={() => handleLinkAccount('github')}
          >
            <Link2 className="mr-2 h-4 w-4" />
            {isLinking ? 'Connecting...' : 'Connect'}
          </Button>
        )}
      </div>

      {/* Microsoft Account */}
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#f25022" d="M1 1h10v10H1z" />
              <path fill="#00a4ef" d="M13 1h10v10H13z" />
              <path fill="#7fba00" d="M1 13h10v10H1z" />
              <path fill="#ffb900" d="M13 13h10v10H13z" />
            </svg>
          </div>
          <div>
            <div className="font-medium">Microsoft</div>
            <div className="text-sm text-muted-foreground">
              {/* In a real app, this would check if Microsoft is connected */}
              Not connected
            </div>
          </div>
        </div>
        {/* Show connect button when not connected, disconnect when connected */}
        {false ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Unlink className="mr-2 h-4 w-4" />
                Disconnect
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Disconnect Microsoft Account?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will remove your Microsoft account connection. You can always reconnect it
                  later. Make sure you have another way to sign in to your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleUnlinkAccount('microsoft')}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Disconnect
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Button
            variant="outline"
            size="sm"
            disabled={isLinking}
            onClick={() => handleLinkAccount('microsoft')}
          >
            <Link2 className="mr-2 h-4 w-4" />
            {isLinking ? 'Connecting...' : 'Connect'}
          </Button>
        )}
      </div>

      <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-start space-x-3">
          <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 dark:text-blue-100">Why connect accounts?</h4>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              Linking accounts allows you to sign in with any connected provider and helps us
              provide a better experience across all your accounts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
