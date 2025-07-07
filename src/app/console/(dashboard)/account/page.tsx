import { Link2, Shield, User } from 'lucide-react';

import { ConnectedAccounts } from '@/components/account/connected-accounts';
import { ProfileForm } from '@/components/account/profile-form';
import { SessionList } from '@/components/account/session-list';
import { MainLayout, PageHeader } from '@/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AccountPage() {
  return (
    <MainLayout
      header={{
        showBackButton: true,
        backHref: '/console',
      }}
    >
      <PageHeader title="Account" description="Manage your profile and connected accounts." />

      <div className="space-y-6">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>Your basic profile information and settings.</CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm />
          </CardContent>
        </Card>

        {/* Connected Accounts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Link2 className="mr-2 h-5 w-5" />
              Connected Accounts
            </CardTitle>
            <CardDescription>
              Link your social accounts for easier sign-in and enhanced features.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ConnectedAccounts />
          </CardContent>
        </Card>

        {/* Session Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Session Management
            </CardTitle>
            <CardDescription>
              Monitor and control your active sessions across all devices for enhanced security.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SessionList />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
