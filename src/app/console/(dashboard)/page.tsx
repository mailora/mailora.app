'use client';

import { useChat } from 'ai/react';
import { Copy, Mail, Mic, Plus, Send } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';

import { ChatLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

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
  const [emailType, setEmailType] = useState('');
  const [tone, setTone] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: {
      emailType,
      tone,
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      // Could add toast notification here if needed
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    handleSubmit(e);
  };

  return (
    <ChatLayout
      header={{
        showBackButton: true,
        backHref: '/console',
      }}
    >
      <div className="flex flex-col h-full">
        {/* Chat Messages Area - Fixed height with scroll */}
        <div className="flex-1 min-h-0">
          <ScrollArea className="h-full">
            <div className="p-6 space-y-6 pb-6">
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <Mail className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Start generating emails with AI</h3>
                  <p className="text-muted-foreground">
                    Describe the email you want to create and Mailora will help you generate it.
                  </p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-3xl ${
                        message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-muted'
                      } rounded-lg p-4 shadow-sm`}
                    >
                      {message.role === 'assistant' ? (
                        <div className="space-y-4">
                          <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                            {message.content}
                          </div>
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
                        <div className="text-sm">{message.content}</div>
                      )}
                    </div>
                  </div>
                ))
              )}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-4 shadow-sm">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span className="text-sm">Generating email...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>

        {/* Fixed Input Area at Bottom */}
        <div className="border-t bg-background/95 backdrop-blur-sm">
          <div className="p-6">
            <form onSubmit={onSubmit} className="space-y-4">
              {/* Tools/Settings */}
              <div className="flex items-center space-x-4 flex-wrap gap-2">
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
                    onChange={handleInputChange}
                    placeholder="Describe the email you want to generate..."
                    className="min-h-[60px] max-h-[200px] resize-none pr-12 border-2 focus:border-blue-500 transition-colors"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        onSubmit(e);
                      }
                    }}
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="absolute bottom-2 right-2"
                    disabled={!input.trim() || isLoading}
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
              Mailora can make mistakes. Check important info.{' '}
              <Link href="#" className="underline">
                See Cookie Preferences
              </Link>
            </p>
          </div>
        </div>
      </div>
    </ChatLayout>
  );
}
