import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  Calendar, 
  Target, 
  User,
  Zap,
  Star,
  Loader2
} from "lucide-react";
import { useActivityLog } from "@/hooks/use-activity-log";
import { formatDistanceToNow } from "date-fns";

const activityIcons = {
  message: Mail,
  call: Phone,
  meeting: Calendar,
  opportunity: Target,
  contact: User,
  workflow: Zap,
  review: Star,
};

const statusColors = {
  success: "text-success",
  pending: "text-warning",
  failed: "text-destructive",
};

export function RecentActivity() {
  const { activities, isLoading } = useActivityLog(5);

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {activities.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No recent activity to display.
            </div>
          ) : (
            activities.map((activity) => {
              const Icon = activityIcons[activity.type];
              
              return (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`rounded-full p-2 ${
                    activity.status === "success" ? "bg-success/10" :
                    activity.status === "pending" ? "bg-warning/10" :
                    activity.status === "failed" ? "bg-destructive/10" :
                    "bg-muted"
                  }`}>
                    <Icon className={`h-4 w-4 ${
                      activity.status ? statusColors[activity.status] : "text-muted-foreground"
                    }`} />
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">{activity.title}</h4>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                    
                    {activity.contact_name && activity.contact_initials && (
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {activity.contact_initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">
                          {activity.contact_name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
