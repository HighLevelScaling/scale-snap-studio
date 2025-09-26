import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageSquare, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Conversation {
  id: string;
  contact: {
    name: string;
    avatar?: string;
    initials: string;
  };
  lastMessage: {
    content: string;
    timestamp: string;
    channel: "email" | "sms" | "phone" | "chat";
  };
  unreadCount: number;
  priority: "high" | "medium" | "low";
  tags: string[];
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    contact: { name: "Sarah Johnson", initials: "SJ" },
    lastMessage: {
      content: "I'm interested in your marketing services. Can we schedule a call?",
      timestamp: "2 min ago",
      channel: "email",
    },
    unreadCount: 2,
    priority: "high",
    tags: ["Hot Lead", "Services"],
  },
  {
    id: "2",
    contact: { name: "Mike Chen", initials: "MC" },
    lastMessage: {
      content: "Thanks for the quick response!",
      timestamp: "1 hour ago",
      channel: "sms",
    },
    unreadCount: 0,
    priority: "medium",
    tags: ["Customer"],
  },
  {
    id: "3",
    contact: { name: "Emily Rodriguez", initials: "ER" },
    lastMessage: {
      content: "Missed call - Left voicemail",
      timestamp: "3 hours ago",
      channel: "phone",
    },
    unreadCount: 1,
    priority: "high",
    tags: ["Follow-up"],
  },
];

const channelIcons = {
  email: Mail,
  sms: MessageSquare,
  phone: Phone,
  chat: MessageSquare,
};

export function ConversationList() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          Recent Conversations
          <Badge variant="secondary">12 active</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockConversations.map((conversation) => {
          const ChannelIcon = channelIcons[conversation.lastMessage.channel];
          
          return (
            <div
              key={conversation.id}
              className={cn(
                "flex items-start space-x-3 rounded-lg border p-4 transition-colors hover:bg-muted/50",
                conversation.unreadCount > 0 && "border-primary/20 bg-primary/5"
              )}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={conversation.contact.avatar} />
                <AvatarFallback>{conversation.contact.initials}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{conversation.contact.name}</h4>
                  <div className="flex items-center space-x-2">
                    <ChannelIcon className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {conversation.lastMessage.timestamp}
                    </span>
                    {conversation.unreadCount > 0 && (
                      <Badge variant="default" className="h-5 w-5 p-0 text-xs">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {conversation.lastMessage.content}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    {conversation.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Badge
                    variant={
                      conversation.priority === "high"
                        ? "destructive"
                        : conversation.priority === "medium"
                        ? "default"
                        : "secondary"
                    }
                    className="text-xs"
                  >
                    {conversation.priority}
                  </Badge>
                </div>
              </div>
            </div>
          );
        })}
        
        <Button variant="outline" className="w-full">
          View All Conversations
        </Button>
      </CardContent>
    </Card>
  );
}