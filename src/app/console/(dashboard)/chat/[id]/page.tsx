'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useChat } from 'ai/react';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';

import { ChatInput, ChatMessage } from '@/components/chat';
import { ChatLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUser } from '@/hooks/use-auth';
import { useConversation } from '@/hooks/use-conversations';

export default function ConversationPage() {
  const params = useParams();
  const conversationId = params.id as string;
  const { data: conversation, isLoading } = useConversation(conversationId);
  const queryClient = useQueryClient();
  const { data: user } = useUser();

  const [emailType, setEmailType] = useState('');
  const [tone, setTone] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    onFinish: () => {
      // Invalidate conversations list to refresh sidebar
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      // Also invalidate this specific conversation
      queryClient.invalidateQueries({ queryKey: ['conversation', conversationId] });
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
                  <ChatMessage key={message.id} message={message} userName={user?.name} />
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
        <ChatInput
          input={input}
          emailType={emailType}
          tone={tone}
          isLoading={isChatLoading}
          placeholder="Continue the conversation..."
          onInputChange={handleInputChange}
          onEmailTypeChange={setEmailType}
          onToneChange={setTone}
          onSubmit={onSubmit}
        />
      </div>
    </ChatLayout>
  );
}
