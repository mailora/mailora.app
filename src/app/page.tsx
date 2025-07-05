import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, ArrowRight, Check, Star, Users, Zap, Shield } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Mail className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold">EmailAI</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-slate-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-slate-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="#about" className="text-slate-300 hover:text-white transition-colors">
              About
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/auth">
              <Button
                variant="ghost"
                className="text-slate-300 hover:text-white hover:bg-slate-800"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/auth">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
        <div className="container mx-auto text-center relative z-10">
          <Badge variant="secondary" className="mb-6 bg-slate-800 text-slate-300 border-slate-700">
            ✨ Powered by Advanced AI
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Better Context. Better Agent.
            <span className="block text-blue-400">Better Emails.</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            The most advanced AI email generation platform. Create professional, personalized emails
            that convert with context-aware intelligence and autonomous optimization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/auth">
              <Button size="lg" className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4 border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
            >
              Watch Demo
            </Button>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="bg-slate-900 rounded-lg border border-slate-700 p-6 shadow-2xl">
              <div className="bg-slate-800 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-2 text-left">
                  <div className="text-green-400 text-sm font-mono">
                    {'> Generating professional email...'}
                  </div>
                  <div className="text-blue-400 text-sm font-mono">
                    {'> Context: Sales follow-up, B2B, Professional tone'}
                  </div>
                  <div className="text-purple-400 text-sm font-mono">
                    {'> Optimizing for conversion...'}
                  </div>
                  <div className="text-green-400 text-sm font-mono">
                    {'> Email generated successfully ✓'}
                  </div>
                </div>
              </div>
              <div className="bg-white text-slate-900 rounded-lg p-4 text-left text-sm">
                <div className="font-semibold mb-2">Subject: Following up on our conversation</div>
                <div className="space-y-2 text-slate-700">
                  <p>Hi [Name],</p>
                  <p>I hope this email finds you well. Following up on our conversation about...</p>
                  <p className="text-slate-500">[AI-generated content continues...]</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-slate-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Autonomous Email Intelligence</h2>
            <p className="text-xl text-slate-300">
              AI agents that understand context and optimize for results
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <Zap className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-white">Context-Aware Generation</h3>
                <p className="text-slate-300 mb-4">
                  Advanced AI that understands your business context, recipient history, and
                  communication goals.
                </p>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Industry-specific knowledge
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Recipient personalization
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Goal-oriented optimization
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-white">Team Collaboration</h3>
                <p className="text-slate-300 mb-4">
                  Seamless collaboration with shared templates, brand guidelines, and approval
                  workflows.
                </p>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Shared workspaces
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Brand consistency
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Approval workflows
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-white">Enterprise Security</h3>
                <p className="text-slate-300 mb-4">
                  Bank-level security with compliance standards that enterprise customers trust.
                </p>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    SOC 2 Type II
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    GDPR compliant
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    End-to-end encryption
                  </li>
                </ul>
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
              <p className="text-xl text-slate-300 mb-8">
                Our AI models are trained on millions of high-converting emails across industries,
                ensuring every generated email meets professional standards.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-slate-300">98% customer satisfaction rate</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-slate-300">45% average increase in open rates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-slate-300">Used by 10,000+ professionals</span>
                </div>
              </div>
            </div>
            <div className="bg-slate-900 rounded-lg border border-slate-700 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Email Performance</span>
                  <Badge variant="secondary" className="bg-green-900 text-green-300">
                    +45% Open Rate
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">Open Rate</span>
                    <span className="text-sm text-slate-300">72%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">Click Rate</span>
                    <span className="text-sm text-slate-300">28%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">Conversion Rate</span>
                    <span className="text-sm text-slate-300">12%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Trusted by professionals worldwide</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Chen',
                role: 'Marketing Director',
                company: 'TechCorp',
                content:
                  'EmailAI has transformed our email marketing. Our open rates increased by 60% in just 3 months.',
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
              <Card key={index} className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-300 mb-4">&quot;{testimonial.content}&quot;</p>
                  <div className="text-left">
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-slate-400">
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
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who are already using EmailAI to create better emails
            faster.
          </p>
          <Link href="/auth">
            <Button size="lg" className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Mail className="h-6 w-6 text-blue-500" />
                <span className="text-xl font-bold">EmailAI</span>
              </div>
              <p className="text-slate-400">Generate perfect emails with the power of AI</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Product</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Support</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 EmailAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
