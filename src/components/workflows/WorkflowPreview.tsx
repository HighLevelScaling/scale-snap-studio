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
  Settings,
  Loader2
} from "lucide-react";
import { useWorkflows } from "@/hooks/use-workflows";
import { formatDistanceToNow } from "date-fns";

const statusConfig = {
  active: { color: "bg-success", icon: PlayCircle, label: "Active" },
  paused: { color: "bg-warning", icon: Pause, label: "Paused" },
  draft: { color: "bg-muted", icon: Settings, label: "Draft" },
};

export function WorkflowPreview() {
  const { workflows, isLoading, executeWorkflow, isExecuting } = useWorkflows();

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Active Workflows</CardTitle>
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
        <div className="flex items-center justify-between">
          <CardTitle>Active Workflows</CardTitle>
          <Button size="sm" variant="outline">
            <Zap className="mr-2 h-4 w-4" />
            Create Workflow
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {workflows.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No workflows found. Create your first workflow to get started.
          </div>
        ) : (
          workflows.map((workflow) => {
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
                  <span>
                    Last run: {workflow.last_run 
                      ? formatDistanceToNow(new Date(workflow.last_run), { addSuffix: true })
                      : 'Never'}
                  </span>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="h-6 px-2">
                      Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 px-2"
                      onClick={() => executeWorkflow(workflow.id)}
                      disabled={isExecuting || workflow.status !== 'active'}
                    >
                      {isExecuting ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        'Run Now'
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
