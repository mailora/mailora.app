/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useChat } from 'ai/react';
import { Clock, Copy, Cpu, Mail, Mic, Plus, Send, Zap } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
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
import { useConversation } from '@/hooks/use-conversations';

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

export default function ConversationPage() {
  const params = useParams();
  const conversationId = params.id as string;
  const { data: conversation, isLoading } = useConversation(conversationId);

  const [emailType, setEmailType] = useState('');
  const [tone, setTone] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [copySuccess, setCopySuccess] = useState<{ [key: string]: boolean }>({});

  // Initialize chat with conversation data
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading: isChatLoading,
    setMessages,
  } = useChat({
    api: '/api/chat',
    body: {
      emailType,
      tone,
      conversationId,
    },
  });

  // Load conversation messages when data is available
  useEffect(() => {
    if (conversation && conversation.messages) {
      setMessages(
        conversation.messages.map((msg) => ({
          id: msg.id,
          role: msg.role,
          content: msg.content,
        }))
      );
      setEmailType(conversation.emailType || '');
      setTone(conversation.tone || '');
    }
  }, [conversation, setMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isChatLoading]);

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
    if (!input.trim() || isChatLoading) return;
    handleSubmit(e);
  };

  if (isLoading) {
    return (
      <ChatLayout
        header={{
          showBackButton: true,
          backHref: '/console',
        }}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading conversation...</p>
          </div>
        </div>
      </ChatLayout>
    );
  }

  if (!conversation) {
    return (
      <ChatLayout
        header={{
          showBackButton: true,
          backHref: '/console',
        }}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Conversation not found</p>
            <Button asChild>
              <Link href="/console">Go back to dashboard</Link>
            </Button>
          </div>
        </div>
      </ChatLayout>
    );
  }

  return (
    <ChatLayout
      header={{
        showBackButton: true,
        backHref: '/console',
        title: conversation.title,
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
                  <h3 className="text-lg font-medium mb-2">Continue this conversation</h3>
                  <p className="text-muted-foreground">
                    Add more messages to this email conversation.
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
                                    <div className="space-y-4">
                                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 dark:bg-blue-950/20 dark:border-blue-800">
                                        <div className="flex items-center gap-2 mb-2">
                                          <Mail className="h-4 w-4 text-blue-600" />
                                          <div className="text-xs font-medium text-blue-700 dark:text-blue-400">
                                            SUBJECT LINE
                                          </div>
                                        </div>
                                        <div className="font-semibold text-blue-900 dark:text-blue-100">
                                          {parsed.subject}
                                        </div>
                                      </div>
                                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 dark:bg-green-950/20 dark:border-green-800">
                                        <div className="flex items-center gap-2 mb-2">
                                          <Send className="h-4 w-4 text-green-600" />
                                          <div className="text-xs font-medium text-green-700 dark:text-green-400">
                                            EMAIL BODY
                                          </div>
                                        </div>
                                        <div className="whitespace-pre-wrap text-green-900 dark:text-green-100">
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
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 dark:bg-yellow-950/20 dark:border-yellow-800">
                                      <div className="flex items-center gap-2 mb-2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600"></div>
                                        <div className="text-xs font-medium text-yellow-700 dark:text-yellow-400">
                                          GENERATING EMAIL...
                                        </div>
                                      </div>
                                      <div className="text-sm text-yellow-800 dark:text-yellow-200">
                                        {content}
                                      </div>
                                    </div>
                                  );
                                }
                              }

                              // Fallback to display as-is
                              return <div className="text-sm">{message.content}</div>;
                            })()}
                          </div>
                          <div className="flex space-x-2 flex-wrap">
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
                                        onClick={() =>
                                          handleCopy(
                                            `Subject: ${parsed.subject}\n\n${parsed.body}`,
                                            `${message.id}-full`
                                          )
                                        }
                                      >
                                        <Copy className="mr-2 h-4 w-4" />
                                        {copySuccess[`${message.id}-full`] ? 'Copied!' : 'Copy All'}
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
                                  onClick={() => handleCopy(message.content, message.id)}
                                >
                                  <Copy className="mr-2 h-4 w-4" />
                                  {copySuccess[message.id] ? 'Copied!' : 'Copy'}
                                </Button>
                              );
                            })()}
                            <Button variant="outline" size="sm">
                              <Send className="mr-2 h-4 w-4" />
                              Use Email
                            </Button>
                          </div>

                          {/* Performance Metrics */}
                          <div className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/40 dark:to-gray-900/40 border border-slate-200/60 dark:border-slate-700/40 rounded-xl px-4 py-3 backdrop-blur-sm shadow-sm">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-5">
                                {typeof (message as any).timeTaken === 'number' && (
                                  <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
                                    <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 p-2 rounded-lg shadow-sm">
                                      <Clock className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div className="text-sm">
                                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                                        {((message as any).timeTaken / 1000).toFixed(2)}s
                                      </span>
                                      <span className="text-xs text-slate-500 dark:text-slate-400 ml-1 font-medium">
                                        response
                                      </span>
                                    </div>
                                  </div>
                                )}
                                {(message as any).tokens && (
                                  <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
                                    <div className="bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/40 dark:to-green-900/40 p-2 rounded-lg shadow-sm">
                                      <Cpu className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <div className="text-sm">
                                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                                        {(message as any).tokens.total}
                                      </span>
                                      <span className="text-xs text-slate-500 dark:text-slate-400 ml-1 font-medium">
                                        tokens
                                      </span>
                                    </div>
                                    <div className="h-4 w-px bg-slate-300 dark:bg-slate-600/50 mx-1"></div>
                                    <div className="flex items-center gap-2.5 text-xs">
                                      <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 bg-green-500 rounded-full shadow-sm"></div>
                                        <span className="text-green-600 dark:text-green-400 font-semibold">
                                          {(message as any).tokens.input}
                                        </span>
                                        <span className="text-slate-500 text-[10px]">in</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full shadow-sm"></div>
                                        <span className="text-blue-600 dark:text-blue-400 font-semibold">
                                          {(message as any).tokens.output}
                                        </span>
                                        <span className="text-slate-500 text-[10px]">out</span>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-800 dark:to-gray-800 px-3 py-1.5 rounded-lg shadow-sm">
                                <Zap className="h-3 w-3 text-amber-500" />
                                <span>AI Generated</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm">{message.content}</div>
                      )}
                    </div>
                  </div>
                ))
              )}

              {isChatLoading && (
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
                    placeholder="Continue the conversation..."
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
                    disabled={!input.trim() || isChatLoading}
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
