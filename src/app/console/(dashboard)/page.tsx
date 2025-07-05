import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserNav } from '@/components/user-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import { Mail, Calendar, CreditCard, Check } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-semibold">EmailAI</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              Community Plan
            </Badge>
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
          <h1 className="text-3xl font-bold mb-2">Subscription</h1>
          <p className="text-muted-foreground">Manage your subscription and billing details.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* User Messages */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">User Messages</CardTitle>
              <Link href="#" className="text-sm text-blue-600 hover:underline">
                View usage
              </Link>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">50.00 available</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">50 renew monthly</p>
              <div className="w-full bg-secondary rounded-full h-2 mb-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground">Used 0 of 50 this month</p>
              <p className="text-sm text-muted-foreground mt-4">
                Add a payment method to purchase additional user messages.
              </p>
            </CardContent>
          </Card>

          {/* Billing */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Billing</CardTitle>
              <Link href="#" className="text-sm text-blue-600 hover:underline">
                Payment history
              </Link>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">July 27, 2025</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Next Billing Date</p>
              <p className="text-sm text-muted-foreground mb-4">No payment method on file</p>
              <p className="text-sm text-muted-foreground mb-4">
                Configure a payment method to enable automatic billing for your subscription.
              </p>
              <Button className="w-full">
                <CreditCard className="mr-2 h-4 w-4" />
                Add Payment Method
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Current Plan */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Current plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Community Plan</h3>
                <div className="space-y-2 mt-4">
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
                    <span className="text-sm">MCP & Native Tools</span>
                  </div>
                  <Button variant="link" className="p-0 h-auto text-blue-600">
                    Show more
                  </Button>
                </div>
                <div className="mt-4 space-y-1">
                  <p className="text-sm text-muted-foreground">$0.00/user/mo • 1 seat purchased</p>
                  <p className="text-sm font-medium">Monthly total: $0.00</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
              >
                Cancel subscription
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Change Subscription */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Change your subscription</CardTitle>
            <CardDescription>
              Switch plans or contact sales about Enterprise options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">
                  Switch plans or contact sales about Enterprise options
                </p>
              </div>
              <Button>Change plan</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
