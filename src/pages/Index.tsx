import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ConversationList } from "@/components/conversations/ConversationList";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { WorkflowPreview } from "@/components/workflows/WorkflowPreview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  MessageSquare,
  Target,
  TrendingUp,
  Calendar,
  Zap,
  Mail,
  Phone,
  BarChart3,
  Star,
  Globe,
} from "lucide-react";

const Index = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome back! Here's what's happening with your business.
                </p>
              </div>
              <Button className="bg-gradient-primary border-0">
                <Zap className="mr-2 h-4 w-4" />
                Create Workflow
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="Total Contacts"
                value="2,847"
                change="+12% this month"
                changeType="positive"
                icon={Users}
                gradient="bg-gradient-primary"
              />
              <StatsCard
                title="Active Conversations" 
                value="124"
                change="+8% today"
                changeType="positive"
                icon={MessageSquare}
                gradient="bg-gradient-success"
              />
              <StatsCard
                title="Open Opportunities"
                value="$45,200"
                change="+23% this week"
                changeType="positive"
                icon={Target}
                gradient="bg-orange-500"
              />
              <StatsCard
                title="Conversion Rate"
                value="18.5%"
                change="+2.1% this month"
                changeType="positive"
                icon={TrendingUp}
                gradient="bg-blue-500"
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <ConversationList />
                <WorkflowPreview />
              </div>
              
              <div className="space-y-6">
                <RecentActivity />
                
                {/* Performance Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Today's Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Email Open Rate</span>
                        <span className="font-medium">68%</span>
                      </div>
                      <Progress value={68} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>SMS Response Rate</span>
                        <span className="font-medium">24%</span>
                      </div>
                      <Progress value={24} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Call Connect Rate</span>
                        <span className="font-medium">89%</span>
                      </div>
                      <Progress value={89} />
                    </div>
                  </CardContent>
                </Card>
                
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email Campaign
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Phone className="mr-2 h-4 w-4" />
                      Schedule Follow-up Call
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="mr-2 h-4 w-4" />
                      Book Appointment
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      View Reports
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Pipeline Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Pipeline Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-5">
                  <div className="text-center">
                    <div className="h-20 rounded-lg bg-gradient-to-b from-primary/20 to-primary/5 flex items-center justify-center mb-2">
                      <span className="text-2xl font-bold text-primary">24</span>
                    </div>
                    <p className="text-sm font-medium">New Leads</p>
                    <Badge variant="secondary" className="text-xs">+3 today</Badge>
                  </div>
                  
                  <div className="text-center">
                    <div className="h-20 rounded-lg bg-gradient-to-b from-blue-500/20 to-blue-500/5 flex items-center justify-center mb-2">
                      <span className="text-2xl font-bold text-blue-600">18</span>
                    </div>
                    <p className="text-sm font-medium">Qualified</p>
                    <Badge variant="secondary" className="text-xs">+1 today</Badge>
                  </div>
                  
                  <div className="text-center">
                    <div className="h-20 rounded-lg bg-gradient-to-b from-orange-500/20 to-orange-500/5 flex items-center justify-center mb-2">
                      <span className="text-2xl font-bold text-orange-600">12</span>
                    </div>
                    <p className="text-sm font-medium">Proposal</p>
                    <Badge variant="secondary" className="text-xs">2 pending</Badge>
                  </div>
                  
                  <div className="text-center">
                    <div className="h-20 rounded-lg bg-gradient-to-b from-purple-500/20 to-purple-500/5 flex items-center justify-center mb-2">
                      <span className="text-2xl font-bold text-purple-600">8</span>
                    </div>
                    <p className="text-sm font-medium">Negotiation</p>
                    <Badge variant="secondary" className="text-xs">closing soon</Badge>
                  </div>
                  
                  <div className="text-center">
                    <div className="h-20 rounded-lg bg-gradient-success flex items-center justify-center mb-2">
                      <span className="text-2xl font-bold text-white">6</span>
                    </div>
                    <p className="text-sm font-medium">Closed Won</p>
                    <Badge variant="default" className="text-xs bg-success">+2 this week</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Marketing Channels Performance */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="mr-2 h-5 w-5" />
                    Email Marketing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Campaigns Sent</span>
                      <span className="font-medium">12 this week</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Average Open Rate</span>
                      <span className="font-medium text-success">68.4%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Click Through Rate</span>
                      <span className="font-medium text-success">12.8%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="mr-2 h-5 w-5" />
                    Social Media
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Posts Scheduled</span>
                      <span className="font-medium">24 this week</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Engagement Rate</span>
                      <span className="font-medium text-success">8.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">New Followers</span>
                      <span className="font-medium text-success">+127</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
