'use client';

import { Bot, Clock, Copy, Cpu, Mail, Send, User, Zap } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

interface MessageTokens {
  input: number;
  output: number;
  total: number;
}

interface ChatMessageProps {
  message: {
    id: string;
    role: 'user' | 'assistant' | 'system' | 'data';
    content: string;
    tokens?: MessageTokens;
    timeTaken?: number;
    timestamp?: string;
  };
  userName?: string;
}

export function ChatMessage({ message, userName }: ChatMessageProps) {
  const [copySuccess, setCopySuccess] = useState<{ [key: string]: boolean }>({});

  // Only render user and assistant messages
  if (message.role !== 'user' && message.role !== 'assistant') {
    return null;
  }

  const messageTime = message.timestamp
    ? new Date(message.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleCopy = async (content: string, messageId: string) => {
    try {
      // Check if navigator.clipboard is available
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(content);
      } else {
        // Fallback for older browsers or non-HTTPS environments
        const textArea = document.createElement('textarea');
        textArea.value = content;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      setCopySuccess((prev) => ({ ...prev, [messageId]: true }));

      // Reset success state after 2 seconds
      setTimeout(() => {
        setCopySuccess((prev) => ({ ...prev, [messageId]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div
      className={`flex gap-3 container m-auto max-w-5xl ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            message.role === 'user'
              ? 'bg-primary text-primary-foreground'
              : 'bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500'
          }`}
        >
          {message.role === 'user' ? (
            <User className="h-4 w-4" />
          ) : (
            <Bot className="h-4 w-4 text-white" />
          )}
        </div>
      </div>

      {/* Message Content */}
      <div className={`flex-1 min-w-0 ${message.role === 'user' ? 'text-right' : ''}`}>
        {/* User/AI Name and Timestamp */}
        <div
          className={`text-xs text-muted-foreground mb-1 ml-1 ${message.role === 'user' ? 'text-right mr-1' : ''}`}
        >
          <span className="font-medium">
            {message.role === 'user' ? userName || 'You' : 'Mailora AI'}
          </span>
          <span className="ml-2">{messageTime}</span>
        </div>

        <div
          className={`rounded-2xl px-4 py-3 ${
            message.role === 'user'
              ? 'bg-primary text-primary-foreground ml-auto max-w-lg'
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
                    const cleanContent = message.content.replace(/```json\n?|\n?```/g, '').trim();
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
                    <div className="text-sm text-foreground leading-relaxed">{message.content}</div>
                  );
                })()}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                {(() => {
                  try {
                    const cleanContent = message.content.replace(/```json\n?|\n?```/g, '').trim();
                    const parsed = JSON.parse(cleanContent);

                    if (parsed.subject && parsed.body) {
                      return (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-background/80 hover:bg-blue-50 dark:hover:bg-blue-950/50 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                            onClick={() => handleCopy(parsed.subject, `${message.id}-subject`)}
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            {copySuccess[`${message.id}-subject`] ? 'Copied!' : 'Copy Subject'}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-background/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300"
                            onClick={() => handleCopy(parsed.body, `${message.id}-body`)}
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            {copySuccess[`${message.id}-body`] ? 'Copied!' : 'Copy Body'}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-background/80 hover:bg-purple-50 dark:hover:bg-purple-950/50 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
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
                      className="bg-background/80 hover:bg-muted/50 border-border"
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
                  className="bg-background/80 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Use Email
                </Button>
              </div>

              {/* Enhanced Performance Metrics */}
              {(() => {
                if (!message.timeTaken && !message.tokens) return null;

                return (
                  <div className="bg-gradient-to-r from-muted/50 to-muted/30 border rounded-xl px-4 py-3 mt-3 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {message.timeTaken && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-lg">
                              <Clock className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="text-sm">
                              <span className="font-semibold text-foreground">
                                {(message.timeTaken / 1000).toFixed(2)}s
                              </span>
                              <span className="text-xs text-muted-foreground ml-1">response</span>
                            </div>
                          </div>
                        )}
                        {message.tokens && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <div className="bg-emerald-100 dark:bg-emerald-900/30 p-1.5 rounded-lg">
                              <Cpu className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div className="text-sm">
                              <span className="font-semibold text-foreground">
                                {message.tokens.total}
                              </span>
                              <span className="text-xs text-muted-foreground ml-1">tokens</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs ml-2">
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-green-600 dark:text-green-400 font-medium">
                                  {message.tokens.input}
                                </span>
                                <span className="text-muted-foreground text-[10px]">in</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-blue-600 dark:text-blue-400 font-medium">
                                  {message.tokens.output}
                                </span>
                                <span className="text-muted-foreground text-[10px]">out</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium bg-muted/50 px-2 py-1 rounded-lg">
                        <Zap className="h-3 w-3 text-amber-500" />
                        <span>Mailora AI</span>
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
  );
}
