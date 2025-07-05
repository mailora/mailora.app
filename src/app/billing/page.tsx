import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserNav } from '@/components/user-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import { Mail, CreditCard, Download, Calendar, Check, ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function BillingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex items-center space-x-2">
              <Mail className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-semibold">EmailAI</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">sumantablog@gmail.com</span>
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Billing & Subscription</h1>
          <p className="text-muted-foreground">
            Manage your subscription, billing details, and payment methods.
          </p>
        </div>

        <div className="space-y-6">
          {/* Current Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Current Plan</span>
                <Badge variant="secondary">Community Plan</Badge>
              </CardTitle>
              <CardDescription>Your current subscription details and usage.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">50</div>
                  <div className="text-sm text-muted-foreground">Messages/Month</div>
                  <div className="text-xs text-muted-foreground mt-1">0 used this month</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">$0</div>
                  <div className="text-sm text-muted-foreground">Monthly Cost</div>
                  <div className="text-xs text-muted-foreground mt-1">Free tier</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">∞</div>
                  <div className="text-sm text-muted-foreground">Valid Until</div>
                  <div className="text-xs text-muted-foreground mt-1">No expiration</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Plan Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">50 user messages per month</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Context Engine</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Basic email types</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Standard support</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button>Upgrade Plan</Button>
                <Button variant="outline">View All Plans</Button>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Payment Method
              </CardTitle>
              <CardDescription>
                Manage your payment methods and billing information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
                    <div>
                      <div className="font-medium">No payment method</div>
                      <div className="text-sm text-muted-foreground">
                        Add a payment method to upgrade your plan
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Add Method
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Configure a payment method to enable automatic billing for your subscription and
                purchase additional credits.
              </p>
            </CardContent>
          </Card>

          {/* Billing History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Billing History
                </span>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </CardTitle>
              <CardDescription>View and download your past invoices and payments.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No billing history</h3>
                <p className="text-muted-foreground mb-4">
                  You haven&apos;t been billed yet. Your billing history will appear here once you
                  upgrade to a paid plan.
                </p>
                <Button>Upgrade to Paid Plan</Button>
              </div>
            </CardContent>
          </Card>

          {/* Usage & Limits */}
          <Card>
            <CardHeader>
              <CardTitle>Usage & Limits</CardTitle>
              <CardDescription>Monitor your current usage and account limits.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Email Messages</span>
                    <span className="text-sm text-muted-foreground">0 / 50</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Resets on July 27, 2025</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">API Requests</span>
                    <span className="text-sm text-muted-foreground">0 / 1,000</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Resets monthly</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Storage Used</span>
                    <span className="text-sm text-muted-foreground">0 MB / 100 MB</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Templates and saved emails</p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900 dark:text-blue-100">
                      Need more resources?
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      Upgrade to a paid plan for higher limits, advanced features, and priority
                      support.
                    </p>
                    <Button size="sm" className="mt-3">
                      View Upgrade Options
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Management */}
          <Card>
            <CardHeader>
              <CardTitle>Subscription Management</CardTitle>
              <CardDescription>Manage your subscription settings and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Auto-renewal</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatically renew your subscription
                  </p>
                </div>
                <Badge variant="secondary">Free Plan</Badge>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Billing notifications</h4>
                  <p className="text-sm text-muted-foreground">
                    Get notified about upcoming charges
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Usage alerts</h4>
                  <p className="text-sm text-muted-foreground">
                    Get notified when approaching limits
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Set Alerts
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
