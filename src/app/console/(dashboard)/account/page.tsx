import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MainLayout, PageHeader } from '@/components/layout';
import { ProfileForm } from '@/components/account/profile-form';
import { ConnectedAccounts } from '@/components/account/connected-accounts';
import { User, Link2 } from 'lucide-react';

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
      </div>
    </MainLayout>
  );
}
