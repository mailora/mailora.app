'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Mail,
  Phone,
  MapPin,
  ArrowLeft,
  Send,
  MessageSquare,
  CheckCircle,
  Twitter,
  Linkedin,
  Github,
} from 'lucide-react';
import AppConfig from '@/lib/app-config';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitted(true);
    setIsSubmitting(false);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        company: '',
        phone: '',
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="text-muted-foreground">Back to Home</span>
          </Link>
          <div className="flex items-center space-x-2">
            <Mail className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">{AppConfig.name}</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            <MessageSquare className="h-4 w-4 mr-2" />
            Get in Touch
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">We&apos;d love to hear from you</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about {AppConfig.name}? Want to see a demo? Our team is here to help you
            transform your email communications.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                <p className="text-muted-foreground mb-8">
                  Choose the way that works best for you. We&apos;re here to help with any
                  questions, demos, or support you need.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                <Card className="border-border hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Email Us</h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          Send us an email and we&apos;ll get back to you within 24 hours
                        </p>
                        <a
                          href={`mailto:${AppConfig.contact.email}`}
                          className="text-primary hover:underline font-medium"
                        >
                          {AppConfig.contact.email}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          Monday to Friday from 9am to 6pm PST
                        </p>
                        <a
                          href={`tel:${AppConfig.contact.phone}`}
                          className="text-primary hover:underline font-medium"
                        >
                          {AppConfig.contact.phone}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Visit Us</h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          Come visit our office in beautiful San Francisco
                        </p>
                        <p className="text-primary font-medium">{AppConfig.contact.address}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href={AppConfig.social.twitter}
                    className="bg-primary/10 p-3 rounded-lg hover:bg-primary/20 transition-colors"
                  >
                    <Twitter className="h-5 w-5 text-primary" />
                  </a>
                  <a
                    href={AppConfig.social.linkedin}
                    className="bg-primary/10 p-3 rounded-lg hover:bg-primary/20 transition-colors"
                  >
                    <Linkedin className="h-5 w-5 text-primary" />
                  </a>
                  <a
                    href={AppConfig.social.github}
                    className="bg-primary/10 p-3 rounded-lg hover:bg-primary/20 transition-colors"
                  >
                    <Github className="h-5 w-5 text-primary" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Send us a message</span>
                </CardTitle>
                <CardDescription>
                  Fill out this form and we&apos;ll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your Company"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 123-4567"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="How can we help you?"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us more about your needs..."
                        className="mt-1"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Send className="h-4 w-4" />
                          <span>Send Message</span>
                        </div>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Common questions about {AppConfig.name} and how we can help you
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  How quickly can I get started?
                </h3>
                <p className="text-muted-foreground text-sm">
                  You can start using {AppConfig.name} immediately after signing up. Our AI is ready
                  to help you create your first email in seconds.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  Do you offer enterprise support?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Yes, we offer dedicated enterprise support with custom integrations, training, and
                  priority assistance for larger organizations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">Is my data secure?</h3>
                <p className="text-muted-foreground text-sm">
                  Absolutely. We use bank-level encryption and are SOC 2 Type II certified. Your
                  data is never shared with third parties.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  Can I integrate with my existing tools?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Yes, {AppConfig.name} integrates with popular email clients, CRM systems, and
                  marketing platforms through our robust API.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
