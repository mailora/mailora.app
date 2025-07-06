'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserNav } from '@/components/user-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import { Mail, Send, Copy, Plus, Mic, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const emailTypes = [
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'support', label: 'Customer Support' },
  { value: 'newsletter', label: 'Newsletter' },
  { value: 'welcome', label: 'Welcome Email' },
  { value: 'followup', label: 'Follow-up' },
];

const tones = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'casual', label: 'Casual' },
  { value: 'formal', label: 'Formal' },
  { value: 'persuasive', label: 'Persuasive' },
];

export default function AIChatPage() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>(
    []
  );
  const [input, setInput] = useState('');
  const [emailType, setEmailType] = useState('');
  const [tone, setTone] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsGenerating(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = `Subject: Welcome to EmailAI - Let's Get Started!

Dear [Name],

Welcome to EmailAI! We're thrilled to have you join our community of professionals who are revolutionizing their email communication with the power of artificial intelligence.

Here's what you can expect:

✨ Generate professional emails in seconds
📊 Access to premium templates and designs  
🤝 Collaborate seamlessly with your team
📈 Track performance with detailed analytics

To get started, simply:
1. Log into your dashboard
2. Choose your email type and tone
3. Describe what you want to write
4. Let our AI do the magic!

We're here to help you succeed. If you have any questions, don't hesitate to reach out to our support team.

Best regards,
The EmailAI Team

P.S. Check out our getting started guide for pro tips and tricks!`;

      setMessages((prev) => [...prev, { role: 'assistant', content: aiResponse }]);
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
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
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Start generating emails with AI</h3>
              <p className="text-muted-foreground">
                Describe the email you want to create and I&apos;ll help you generate it.
              </p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-3xl ${message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-muted'} rounded-lg p-4`}
                >
                  {message.role === 'assistant' ? (
                    <div className="space-y-4">
                      <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                        {message.content}
                      </pre>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopy(message.content)}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </Button>
                        <Button variant="outline" size="sm">
                          <Send className="mr-2 h-4 w-4" />
                          Use Email
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm">{message.content}</p>
                  )}
                </div>
              </div>
            ))
          )}
          {isGenerating && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm">Generating email...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t bg-background p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Tools/Settings */}
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" type="button">
                <Plus className="mr-2 h-4 w-4" />
                Tools
              </Button>
              <Select value={emailType} onValueChange={setEmailType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Email Type" />
                </SelectTrigger>
                <SelectContent>
                  {emailTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Tone" />
                </SelectTrigger>
                <SelectContent>
                  {tones.map((toneOption) => (
                    <SelectItem key={toneOption.value} value={toneOption.value}>
                      {toneOption.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Input */}
            <div className="flex items-end space-x-4">
              <div className="flex-1 relative">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe the email you want to generate..."
                  className="min-h-[60px] max-h-[200px] resize-none pr-12"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute bottom-2 right-2"
                  disabled={!input.trim() || isGenerating}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="outline" size="icon" type="button">
                <Mic className="h-4 w-4" />
              </Button>
            </div>
          </form>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            EmailAI can make mistakes. Check important info.{' '}
            <Link href="#" className="underline">
              See Cookie Preferences
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
