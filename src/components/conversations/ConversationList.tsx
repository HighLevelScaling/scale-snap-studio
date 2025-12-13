import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageSquare, Clock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useConversations } from "@/hooks/use-conversations";
import { formatDistanceToNow } from "date-fns";

const channelIcons = {
  email: Mail,
  sms: MessageSquare,
  phone: Phone,
  chat: MessageSquare,
};

export function ConversationList() {
  const { conversations, isLoading } = useConversations(3);

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            Recent Conversations
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  const activeCount = conversations.filter(c => c.unread_count > 0).length;

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          Recent Conversations
          <Badge variant="secondary">{activeCount} active</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {conversations.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No conversations to display.
          </div>
        ) : (
          <>
            {conversations.map((conversation) => {
              const ChannelIcon = channelIcons[conversation.last_message_channel];
              
              return (
                <div
                  key={conversation.id}
                  className={cn(
                    "flex items-start space-x-3 rounded-lg border p-4 transition-colors hover:bg-muted/50",
                    conversation.unread_count > 0 && "border-primary/20 bg-primary/5"
                  )}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={conversation.contact_avatar || undefined} />
                    <AvatarFallback>{conversation.contact_initials}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{conversation.contact_name}</h4>
                      <div className="flex items-center space-x-2">
                        <ChannelIcon className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(conversation.last_message_timestamp), { addSuffix: true })}
                        </span>
                        {conversation.unread_count > 0 && (
                          <Badge variant="default" className="h-5 w-5 p-0 text-xs">
                            {conversation.unread_count}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {conversation.last_message_content}
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
          </>
        )}
      </CardContent>
    </Card>
  );
}
