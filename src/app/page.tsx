import {
  ArrowRight,
  Bot,
  Check,
  Clock,
  Globe,
  Mail,
  Shield,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppConfig from '@/lib/app-config';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Mail className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">{AppConfig.name}</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#contact"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/sign-in">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10"></div>
        <div className="container mx-auto text-center relative z-10">
          <Badge
            variant="secondary"
            className="mb-6 bg-secondary text-secondary-foreground border-border"
          >
            ✨ Powered by Advanced AI
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            {AppConfig.tagline.split('.')[0]}.
            <span className="block text-primary">
              {AppConfig.tagline.split('.')[1]}. {AppConfig.tagline.split('.')[2]}.
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            {AppConfig.descriptions}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/sign-in">
              <Button size="lg" className="text-lg px-8 py-4 bg-primary hover:bg-primary/90">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4 border-border text-muted-foreground hover:bg-accent bg-transparent"
            >
              Watch Demo
            </Button>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="bg-card rounded-lg border border-border p-6 shadow-2xl">
              <div className="bg-muted rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-2 text-left">
                  <div className="text-green-600 text-sm font-mono">
                    {'> Generating professional email...'}
                  </div>
                  <div className="text-primary text-sm font-mono">
                    {'> Context: Sales follow-up, B2B, Professional tone'}
                  </div>
                  <div className="text-purple-600 text-sm font-mono">
                    {'> Optimizing for conversion...'}
                  </div>
                  <div className="text-green-600 text-sm font-mono">
                    {'> Email generated successfully ✓'}
                  </div>
                </div>
              </div>
              <div className="bg-background text-foreground rounded-lg p-4 text-left text-sm border border-border">
                <div className="font-semibold mb-2">Subject: Following up on our conversation</div>
                <div className="space-y-2 text-muted-foreground">
                  <p>Hi [Name],</p>
                  <p>I hope this email finds you well. Following up on our conversation about...</p>
                  <p className="text-muted-foreground/70">[AI-generated content continues...]</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Bento Grid */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features for Modern Email</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to create, optimize, and manage your email communications
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Large Feature Card */}
            <Card className="md:col-span-2 lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-8 h-full flex flex-col justify-between">
                <div>
                  <Bot className="h-16 w-16 text-primary mb-6" />
                  <h3 className="text-2xl font-bold mb-4 text-foreground">AI-Powered Writing</h3>
                  <p className="text-muted-foreground mb-6 text-lg">
                    Advanced AI that understands context, tone, and purpose to generate emails that
                    actually convert.
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      Context-aware generation
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      Tone matching
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      Industry-specific knowledge
                    </li>
                  </ul>
                </div>
                <div className="mt-6">
                  <div className="bg-background/50 rounded-lg p-4 border border-border/50">
                    <div className="text-sm text-muted-foreground mb-2">
                      Sample Generated Email:
                    </div>
                    <div className="text-sm font-mono text-foreground">
                      &quot;Subject: Quick follow-up on our conversation&quot;
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Speed Card */}
            <Card className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Clock className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-foreground">Lightning Fast</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Generate professional emails in seconds, not minutes.
                </p>
                <div className="bg-muted rounded-lg p-3">
                  <div className="text-2xl font-bold text-primary">10x</div>
                  <div className="text-sm text-muted-foreground">Faster than manual writing</div>
                </div>
              </CardContent>
            </Card>

            {/* Collaboration Card */}
            <Card className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-foreground">Team Collaboration</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Work together with shared templates and approval workflows.
                </p>
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-full border-2 border-background"></div>
                  <div className="w-8 h-8 bg-secondary rounded-full border-2 border-background"></div>
                  <div className="w-8 h-8 bg-accent rounded-full border-2 border-background"></div>
                  <div className="w-8 h-8 bg-muted rounded-full border-2 border-background flex items-center justify-center text-xs">
                    +5
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Analytics Card */}
            <Card className="md:col-span-2 bg-card border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <TrendingUp className="h-12 w-12 text-primary mb-2" />
                    <h3 className="text-xl font-semibold text-foreground">Smart Analytics</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">+45%</div>
                    <div className="text-sm text-muted-foreground">Open Rate</div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4 text-sm">
                  Track performance and optimize your email strategy with detailed insights.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="text-lg font-semibold text-foreground">72%</div>
                    <div className="text-xs text-muted-foreground">Open Rate</div>
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="text-lg font-semibold text-foreground">28%</div>
                    <div className="text-xs text-muted-foreground">Click Rate</div>
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="text-lg font-semibold text-foreground">12%</div>
                    <div className="text-xs text-muted-foreground">Conversion</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Multi-language Card */}
            <Card className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Globe className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-foreground">Multi-language</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Generate emails in multiple languages with perfect grammar.
                </p>
                <div className="flex gap-2">
                  <Badge variant="secondary">EN</Badge>
                  <Badge variant="secondary">ES</Badge>
                  <Badge variant="secondary">FR</Badge>
                  <Badge variant="secondary">+20</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Security Card */}
            <Card className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-foreground">Enterprise Security</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Bank-level security with compliance standards.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-muted-foreground">SOC 2 Type II</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-muted-foreground">GDPR Compliant</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Industry Leading Quality */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Industry leading quality</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Our AI models are trained on millions of high-converting emails across industries,
                ensuring every generated email meets professional standards.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">98% customer satisfaction rate</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-muted-foreground">45% average increase in open rates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-muted-foreground">Used by 10,000+ professionals</span>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Email Performance</span>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  >
                    +45% Open Rate
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Open Rate</span>
                    <span className="text-sm text-foreground">72%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Click Rate</span>
                    <span className="text-sm text-foreground">28%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Conversion Rate</span>
                    <span className="text-sm text-foreground">12%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Trusted by professionals worldwide</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Chen',
                role: 'Marketing Director',
                company: 'TechCorp',
                content:
                  'Mailora has transformed our email marketing. Our open rates increased by 60% in just 3 months.',
              },
              {
                name: 'Michael Rodriguez',
                role: 'Sales Manager',
                company: 'GrowthCo',
                content:
                  'The context-aware generation is incredible. It understands our industry and creates perfect follow-ups.',
              },
              {
                name: 'Emily Johnson',
                role: 'CEO',
                company: 'StartupXYZ',
                content:
                  "We've saved 10+ hours per week on email creation while improving our response rates significantly.",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">&quot;{testimonial.content}&quot;</p>
                  <div className="text-left">
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Get more out of every email</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who are already using {AppConfig.name} to create better
            emails faster.
          </p>
          <Link href="/sign-in">
            <Button size="lg" className="text-lg px-8 py-4 bg-primary hover:bg-primary/90">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Mail className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-foreground">{AppConfig.name}</span>
              </div>
              <p className="text-muted-foreground mb-4">{AppConfig.descriptions.split('.')[0]}.</p>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Founded: {AppConfig.company.founded}</p>
                <p>Location: {AppConfig.company.location}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#features" className="hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-foreground transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/ai-chat" className="hover:text-foreground transition-colors">
                    AI Chat
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#about" className="hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href={AppConfig.social.linkedin}
                    className="hover:text-foreground transition-colors"
                  >
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link
                    href={AppConfig.social.twitter}
                    className="hover:text-foreground transition-colors"
                  >
                    Twitter
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Contact</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#contact" className="hover:text-foreground transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <a
                    href={`mailto:${AppConfig.contact.email}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {AppConfig.contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${AppConfig.contact.phone}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {AppConfig.contact.phone}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>
              &copy; {AppConfig.company.founded} {AppConfig.name}. All rights reserved. Version{' '}
              {AppConfig.version}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
