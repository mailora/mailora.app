'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useChat } from 'ai/react';
import { Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';

import { ChatInput, ChatMessage } from '@/components/chat';
import { ChatLayout } from '@/components/layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUser } from '@/hooks/use-auth';

export default function AIChatPage() {
  const [emailType, setEmailType] = useState('');
  const [tone, setTone] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: user } = useUser();

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: {
      emailType,
      tone,
    },
    onFinish: async (message) => {
      // Invalidate conversations list to refresh sidebar
      queryClient.invalidateQueries({ queryKey: ['conversations'] });

      // If this is the first response, redirect to the conversation page
      if (messages.length === 1) {
        try {
          // Get the conversation ID from the response
          const response = await fetch('/api/conversations');
          const conversations = await response.json();
          const latestConversation = conversations[0];

          if (latestConversation) {
            router.push(`/console/chat/${latestConversation._id}`);
          }
        } catch (error) {
          console.error('Failed to redirect to conversation:', error);
        }
      }
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

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
                  <ChatMessage key={message.id} message={message} userName={user?.name} />
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
        <ChatInput
          input={input}
          emailType={emailType}
          tone={tone}
          isLoading={isLoading}
          onInputChange={handleInputChange}
          onEmailTypeChange={setEmailType}
          onToneChange={setTone}
          onSubmit={onSubmit}
        />
      </div>
    </ChatLayout>
  );
}
