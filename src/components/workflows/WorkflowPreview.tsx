import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Mail, 
  MessageSquare, 
  Clock, 
  Users, 
  CheckCircle, 
  PlayCircle,
  Pause,
  Settings 
} from "lucide-react";

interface Workflow {
  id: string;
  name: string;
  status: "active" | "paused" | "draft";
  trigger: string;
  actions: number;
  contacts: number;
  lastRun: string;
  performance: {
    opens: number;
    clicks: number;
    conversions: number;
  };
}

const mockWorkflows: Workflow[] = [
  {
    id: "1",
    name: "Lead Nurture Sequence",
    status: "active",
    trigger: "Form Submission",
    actions: 7,
    contacts: 142,
    lastRun: "2 minutes ago",
    performance: { opens: 89, clicks: 34, conversions: 12 },
  },
  {
    id: "2", 
    name: "Appointment Reminder",
    status: "active",
    trigger: "Booking Confirmed",
    actions: 3,
    contacts: 28,
    lastRun: "15 minutes ago",
    performance: { opens: 95, clicks: 23, conversions: 28 },
  },
  {
    id: "3",
    name: "Re-engagement Campaign",
    status: "paused",
    trigger: "30 Days Inactive",
    actions: 5,
    contacts: 89,
    lastRun: "1 hour ago",
    performance: { opens: 67, clicks: 18, conversions: 7 },
  },
];

const statusConfig = {
  active: { color: "bg-success", icon: PlayCircle, label: "Active" },
  paused: { color: "bg-warning", icon: Pause, label: "Paused" },
  draft: { color: "bg-muted", icon: Settings, label: "Draft" },
};

export function WorkflowPreview() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle>Active Workflows</CardTitle>
          <Button size="sm" variant="outline">
            <Zap className="mr-2 h-4 w-4" />
            Create Workflow
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockWorkflows.map((workflow) => {
          const StatusIcon = statusConfig[workflow.status].icon;
          
          return (
            <div
              key={workflow.id}
              className="rounded-lg border p-4 space-y-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${statusConfig[workflow.status].color}`}>
                    <StatusIcon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">{workflow.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {workflow.trigger} • {workflow.actions} actions
                    </p>
                  </div>
                </div>
                
                <Badge variant={workflow.status === "active" ? "default" : "secondary"}>
                  {statusConfig[workflow.status].label}
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{workflow.contacts} contacts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{workflow.performance.opens}% opens</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  <span>{workflow.performance.conversions} conversions</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Last run: {workflow.lastRun}</span>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" className="h-6 px-2">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 px-2">
                    View Stats
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}