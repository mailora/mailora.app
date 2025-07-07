'use client';

import { Mail, MessageSquare, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useConversations, useDeleteConversation } from '@/hooks/use-conversations';

export function AppSidebar() {
  const pathname = usePathname();
  const { data: conversations = [], isLoading } = useConversations();
  const deleteConversation = useDeleteConversation();

  const handleDeleteConversation = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm('Are you sure you want to delete this conversation?')) {
      try {
        await deleteConversation.mutateAsync(id);
      } catch (error) {
        console.error('Failed to delete conversation:', error);
      }
    }
  };

  return (
    <Sidebar variant="inset" collapsible="offcanvas">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-4 py-2">
          <Mail className="h-6 w-6" />
          <span className="font-semibold">Mailora</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <Button asChild className="w-full justify-start">
              <Link href="/console">
                <Plus className="mr-2 h-4 w-4" />
                New Chat
              </Link>
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Recent Conversations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {isLoading ? (
                <div className="px-4 py-2 text-sm text-muted-foreground">Loading...</div>
              ) : conversations.length === 0 ? (
                <div className="px-4 py-2 text-sm text-muted-foreground">No conversations yet</div>
              ) : (
                conversations.map((conversation) => (
                  <SidebarMenuItem key={conversation._id}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={`/console/chat/${conversation._id}`}
                        className={`group flex items-center justify-between ${
                          pathname === `/console/chat/${conversation._id}` ? 'bg-accent' : ''
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <MessageSquare className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate text-sm">{conversation.title}</span>
                        </div>
                        <button
                          onClick={(e) => handleDeleteConversation(conversation._id, e)}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/20 rounded-sm transition-opacity"
                        >
                          <Trash2 className="h-3 w-3 text-destructive" />
                        </button>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 border-t">
          <div className="text-xs text-muted-foreground">{conversations.length} conversations</div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
