'use client';

import { useChat } from 'ai/react';
import { Bot, Clock, Copy, Cpu, Mail, Mic, Plus, Send, User, Zap } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';

interface MessageTokens {
  input: number;
  output: number;
  total: number;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  tokens?: MessageTokens;
  timeTaken?: number;
}
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
    onFinish: () => {
      // Refresh conversations list when a new conversation is created
      window.location.reload();
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const [copySuccess, setCopySuccess] = useState<{ [key: string]: boolean }>({});

  const handleCopy = async (content: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopySuccess((prev) => ({ ...prev, [messageId]: true }));

      // Reset success state after 2 seconds
      setTimeout(() => {
        setCopySuccess((prev) => ({ ...prev, [messageId]: false }));
      }, 2000);
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
                  <div key={message.id} className="flex gap-3 max-w-4xl">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.role === 'user'
                            ? 'bg-blue-600'
                            : 'bg-gradient-to-br from-purple-500 to-indigo-600'
                        }`}
                      >
                        {message.role === 'user' ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Bot className="h-4 w-4 text-white" />
                        )}
                      </div>
                    </div>

                    {/* Message Content */}
                    <div className="flex-1 min-w-0">
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-blue-600 text-white ml-auto max-w-lg'
                            : 'bg-card border shadow-sm'
                        }`}
                      >
                        {message.role === 'assistant' ? (
                          <div className="space-y-4">
                            <div className="relative">
                              {(() => {
                                // Try to parse as JSON first
                                try {
                                  // Remove any potential markdown code blocks
                                  const cleanContent = message.content
                                    .replace(/```json\n?|\n?```/g, '')
                                    .trim();
                                  const parsed = JSON.parse(cleanContent);

                                  if (parsed.subject && parsed.body) {
                                    return (
                                      <div className="space-y-2">
                                        {/* Compact Subject */}
                                        <div className="bg-blue-50/70 dark:bg-blue-950/30 border-l-4 border-blue-400 px-3 py-2 rounded-r-lg">
                                          <div className="flex items-center gap-2 mb-1">
                                            <Mail className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                                            <span className="text-xs font-medium text-blue-700 dark:text-blue-400 uppercase tracking-wide">
                                              Subject
                                            </span>
                                          </div>
                                          <div className="font-semibold text-blue-900 dark:text-blue-100 text-sm">
                                            {parsed.subject}
                                          </div>
                                        </div>

                                        {/* Compact Body */}
                                        <div className="bg-green-50/70 dark:bg-green-950/30 border-l-4 border-green-400 px-3 py-2 rounded-r-lg">
                                          <div className="flex items-center gap-2 mb-1">
                                            <Send className="h-3 w-3 text-green-600 dark:text-green-400" />
                                            <span className="text-xs font-medium text-green-700 dark:text-green-400 uppercase tracking-wide">
                                              Body
                                            </span>
                                          </div>
                                          <div className="whitespace-pre-wrap text-green-900 dark:text-green-100 text-sm leading-relaxed">
                                            {parsed.body}
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }
                                } catch {
                                  // If JSON parsing fails, check if it's a partial JSON response
                                  const content = message.content.trim();
                                  if (content.startsWith('{') && !content.endsWith('}')) {
                                    return (
                                      <div className="bg-amber-50/70 dark:bg-amber-950/30 border-l-4 border-amber-400 px-3 py-2 rounded-r-lg">
                                        <div className="flex items-center gap-2 mb-1">
                                          <div className="animate-spin rounded-full h-3 w-3 border-2 border-amber-600 border-t-transparent"></div>
                                          <span className="text-xs font-medium text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                                            Generating...
                                          </span>
                                        </div>
                                        <div className="text-sm text-amber-800 dark:text-amber-200 font-mono">
                                          {content}
                                        </div>
                                      </div>
                                    );
                                  }
                                }

                                // Fallback to display as-is
                                return (
                                  <div className="text-sm text-foreground leading-relaxed">
                                    {message.content}
                                  </div>
                                );
                              })()}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-2">
                              {(() => {
                                try {
                                  const cleanContent = message.content
                                    .replace(/```json\n?|\n?```/g, '')
                                    .trim();
                                  const parsed = JSON.parse(cleanContent);

                                  if (parsed.subject && parsed.body) {
                                    return (
                                      <>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="bg-white/80 hover:bg-blue-50 border-blue-200 text-blue-700 hover:text-blue-800"
                                          onClick={() =>
                                            handleCopy(parsed.subject, `${message.id}-subject`)
                                          }
                                        >
                                          <Copy className="mr-2 h-4 w-4" />
                                          {copySuccess[`${message.id}-subject`]
                                            ? 'Copied!'
                                            : 'Copy Subject'}
                                        </Button>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="bg-white/80 hover:bg-emerald-50 border-emerald-200 text-emerald-700 hover:text-emerald-800"
                                          onClick={() =>
                                            handleCopy(parsed.body, `${message.id}-body`)
                                          }
                                        >
                                          <Copy className="mr-2 h-4 w-4" />
                                          {copySuccess[`${message.id}-body`]
                                            ? 'Copied!'
                                            : 'Copy Body'}
                                        </Button>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="bg-white/80 hover:bg-purple-50 border-purple-200 text-purple-700 hover:text-purple-800"
                                          onClick={() =>
                                            handleCopy(
                                              `Subject: ${parsed.subject}\n\n${parsed.body}`,
                                              `${message.id}-full`
                                            )
                                          }
                                        >
                                          <Copy className="mr-2 h-4 w-4" />
                                          {copySuccess[`${message.id}-full`]
                                            ? 'Copied!'
                                            : 'Copy All'}
                                        </Button>
                                      </>
                                    );
                                  }
                                } catch {
                                  // Fallback to original copy button
                                }

                                return (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-white/80 hover:bg-gray-50 border-gray-200"
                                    onClick={() => handleCopy(message.content, message.id)}
                                  >
                                    <Copy className="mr-2 h-4 w-4" />
                                    {copySuccess[message.id] ? 'Copied!' : 'Copy'}
                                  </Button>
                                );
                              })()}
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-white/80 hover:bg-indigo-50 border-indigo-200 text-indigo-700 hover:text-indigo-800"
                              >
                                <Send className="mr-2 h-4 w-4" />
                                Use Email
                              </Button>
                            </div>

                            {/* Compact Performance Metrics */}
                            {(() => {
                              const chatMessage = message as unknown as ChatMessage;
                              if (!chatMessage.timeTaken && !chatMessage.tokens) return null;

                              return (
                                <div className="bg-muted/50 border rounded-lg px-3 py-2 mt-2">
                                  <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-3">
                                      {chatMessage.timeTaken && (
                                        <div className="flex items-center gap-1.5 text-muted-foreground">
                                          <Clock className="h-3 w-3" />
                                          <span className="font-medium">
                                            {(chatMessage.timeTaken / 1000).toFixed(2)}s
                                          </span>
                                        </div>
                                      )}
                                      {chatMessage.tokens && (
                                        <div className="flex items-center gap-1.5 text-muted-foreground">
                                          <Cpu className="h-3 w-3" />
                                          <span className="font-medium">
                                            {chatMessage.tokens.total}
                                          </span>
                                          <span className="text-green-600">
                                            ↑{chatMessage.tokens.input}
                                          </span>
                                          <span className="text-blue-600">
                                            ↓{chatMessage.tokens.output}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-1 text-muted-foreground">
                                      <Zap className="h-3 w-3 text-amber-500" />
                                      <span className="font-medium">AI</span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        ) : (
                          <div className="text-sm">{message.content}</div>
                        )}
                      </div>
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
