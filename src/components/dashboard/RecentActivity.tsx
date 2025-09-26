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
  Star 
} from "lucide-react";

interface Activity {
  id: string;
  type: "message" | "call" | "meeting" | "opportunity" | "contact" | "workflow" | "review";
  title: string;
  description: string;
  timestamp: string;
  contact?: {
    name: string;
    initials: string;
  };
  status?: "success" | "pending" | "failed";
}

const mockActivities: Activity[] = [
  {
    id: "1",
    type: "message",
    title: "Email sent to lead",
    description: "Welcome sequence email delivered to Sarah Johnson",
    timestamp: "2 minutes ago",
    contact: { name: "Sarah Johnson", initials: "SJ" },
    status: "success",
  },
  {
    id: "2",
    type: "workflow",
    title: "Automation triggered",
    description: "Lead nurture workflow started for new form submission",
    timestamp: "5 minutes ago",
    status: "success",
  },
  {
    id: "3",
    type: "meeting",
    title: "Appointment booked",
    description: "Mike Chen scheduled a consultation for tomorrow",
    timestamp: "15 minutes ago",
    contact: { name: "Mike Chen", initials: "MC" },
    status: "success",
  },
  {
    id: "4",
    type: "opportunity",
    title: "Deal moved to proposal",
    description: "Marketing services opportunity advanced in pipeline",
    timestamp: "1 hour ago",
    status: "success",
  },
  {
    id: "5",
    type: "review",
    title: "New 5-star review",
    description: "Emily Rodriguez left a positive review on Google",
    timestamp: "2 hours ago",
    contact: { name: "Emily Rodriguez", initials: "ER" },
    status: "success",
  },
];

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
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {mockActivities.map((activity) => {
            const Icon = activityIcons[activity.type];
            
            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`rounded-full p-2 ${
                  activity.status === "success" ? "bg-success/10" :
                  activity.status === "pending" ? "bg-warning/10" :
                  "bg-destructive/10"
                }`}>
                  <Icon className={`h-4 w-4 ${
                    activity.status ? statusColors[activity.status] : "text-muted-foreground"
                  }`} />
                </div>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">{activity.title}</h4>
                    <span className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                  
                  {activity.contact && (
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {activity.contact.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">
                        {activity.contact.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}