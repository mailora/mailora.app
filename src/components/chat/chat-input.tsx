'use client';

import { Mic, Plus, Send } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';

import { Button } from '@/components/ui/button';
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

interface ChatInputProps {
  input: string;
  emailType: string;
  tone: string;
  isLoading: boolean;
  placeholder?: string;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onEmailTypeChange: (value: string) => void;
  onToneChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ChatInput({
  input,
  emailType,
  tone,
  isLoading,
  placeholder = 'Describe the email you want to generate...',
  onInputChange,
  onEmailTypeChange,
  onToneChange,
  onSubmit,
}: ChatInputProps) {
  return (
    <div className="border-t bg-background/95 backdrop-blur-sm">
      <div className="p-6">
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Tools/Settings */}
          <div className="flex items-center space-x-4 flex-wrap gap-2">
            <Button variant="outline" size="sm" type="button">
              <Plus className="mr-2 h-4 w-4" />
              Tools
            </Button>
            <Select value={emailType} onValueChange={onEmailTypeChange}>
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
            <Select value={tone} onValueChange={onToneChange}>
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
                onChange={onInputChange}
                placeholder={placeholder}
                className="min-h-[60px] max-h-[200px] resize-none pr-12 border-2 focus:border-primary transition-colors"
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
  );
}
