import { useState } from "react";
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
import { DemoBanner } from "@/components/subscription/DemoBanner";
import { FeatureGate } from "@/components/subscription/FeatureGate";
import { LimitIndicator } from "@/components/subscription/LimitIndicator";
import { UpgradeModal } from "@/components/subscription/UpgradeModal";
import { useSubscription } from "@/contexts/SubscriptionContext";
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
  Crown,
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { isDemo, planDetails, currentPlan } = useSubscription();
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);

  // Demo data - in production this would come from API
  const demoStats = {
    contacts: isDemo ? 87 : 2847,
    conversations: isDemo ? 18 : 124,
    workflows: isDemo ? 2 : 15,
    campaigns: isDemo ? 1 : 8,
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <DemoBanner />
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold">Dashboard</h1>
                  {isDemo && (
                    <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                      Demo Mode
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground">
                  Welcome back! Here's what's happening with your business.
                </p>
              </div>
              <div className="flex items-center gap-2">
                {isDemo && (
                  <Button
                    variant="outline"
                    onClick={() => setUpgradeModalOpen(true)}
                  >
                    <Crown className="mr-2 h-4 w-4 text-yellow-500" />
                    Upgrade
                  </Button>
                )}
                <Button className="bg-gradient-primary border-0">
                  <Zap className="mr-2 h-4 w-4" />
                  Create Workflow
                </Button>
              </div>
            </div>

            {/* Demo Limits Card - Only show for demo users */}
            {isDemo && (
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>Demo Usage Limits</span>
                    <Link to="/pricing">
                      <Button size="sm" variant="link" className="text-primary">
                        View Plans
                      </Button>
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <LimitIndicator
                      feature="maxContacts"
                      currentValue={demoStats.contacts}
                      label="Contacts"
                    />
                    <LimitIndicator
                      feature="maxConversations"
                      currentValue={demoStats.conversations}
                      label="Conversations"
                    />
                    <LimitIndicator
                      feature="maxWorkflows"
                      currentValue={demoStats.workflows}
                      label="Workflows"
                    />
                    <LimitIndicator
                      feature="maxCampaigns"
                      currentValue={demoStats.campaigns}
                      label="Campaigns"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="Total Contacts"
                value={demoStats.contacts.toLocaleString()}
                change={isDemo ? "87/100 limit" : "+12% this month"}
                changeType={isDemo ? "neutral" : "positive"}
                icon={Users}
                gradient="bg-gradient-primary"
              />
              <StatsCard
                title="Active Conversations" 
                value={demoStats.conversations.toString()}
                change={isDemo ? "18/25 limit" : "+8% today"}
                changeType={isDemo ? "neutral" : "positive"}
                icon={MessageSquare}
                gradient="bg-gradient-success"
              />
              <StatsCard
                title="Open Opportunities"
                value={isDemo ? "$12,400" : "$45,200"}
                change={isDemo ? "Demo data" : "+23% this week"}
                changeType={isDemo ? "neutral" : "positive"}
                icon={Target}
                gradient="bg-orange-500"
              />
              <StatsCard
                title="Conversion Rate"
                value={isDemo ? "12.3%" : "18.5%"}
                change={isDemo ? "Demo data" : "+2.1% this month"}
                changeType={isDemo ? "neutral" : "positive"}
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
                
                {/* Performance Metrics - Gated for demo */}
                <FeatureGate feature="Advanced Analytics" requiredPlan="agency">
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
                </FeatureGate>
                
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email Campaign
                      {isDemo && demoStats.campaigns >= 2 && (
                        <Badge variant="outline" className="ml-auto text-xs text-destructive">
                          Limit Reached
                        </Badge>
                      )}
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Phone className="mr-2 h-4 w-4" />
                      Schedule Follow-up Call
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="mr-2 h-4 w-4" />
                      Book Appointment
                    </Button>
                    <FeatureGate feature="Advanced Reporting" requiredPlan="agency" showLock={false}>
                      <Button variant="outline" className="w-full justify-start">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        View Reports
                        {isDemo && (
                          <Badge variant="secondary" className="ml-auto text-xs">
                            Pro
                          </Badge>
                        )}
                      </Button>
                    </FeatureGate>
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
                      <span className="text-2xl font-bold text-primary">{isDemo ? 8 : 24}</span>
                    </div>
                    <p className="text-sm font-medium">New Leads</p>
                    <Badge variant="secondary" className="text-xs">{isDemo ? "+1 today" : "+3 today"}</Badge>
                  </div>
                  
                  <div className="text-center">
                    <div className="h-20 rounded-lg bg-gradient-to-b from-blue-500/20 to-blue-500/5 flex items-center justify-center mb-2">
                      <span className="text-2xl font-bold text-blue-600">{isDemo ? 5 : 18}</span>
                    </div>
                    <p className="text-sm font-medium">Qualified</p>
                    <Badge variant="secondary" className="text-xs">+1 today</Badge>
                  </div>
                  
                  <div className="text-center">
                    <div className="h-20 rounded-lg bg-gradient-to-b from-orange-500/20 to-orange-500/5 flex items-center justify-center mb-2">
                      <span className="text-2xl font-bold text-orange-600">{isDemo ? 3 : 12}</span>
                    </div>
                    <p className="text-sm font-medium">Proposal</p>
                    <Badge variant="secondary" className="text-xs">{isDemo ? "1 pending" : "2 pending"}</Badge>
                  </div>
                  
                  <div className="text-center">
                    <div className="h-20 rounded-lg bg-gradient-to-b from-purple-500/20 to-purple-500/5 flex items-center justify-center mb-2">
                      <span className="text-2xl font-bold text-purple-600">{isDemo ? 2 : 8}</span>
                    </div>
                    <p className="text-sm font-medium">Negotiation</p>
                    <Badge variant="secondary" className="text-xs">closing soon</Badge>
                  </div>
                  
                  <div className="text-center">
                    <div className="h-20 rounded-lg bg-gradient-success flex items-center justify-center mb-2">
                      <span className="text-2xl font-bold text-white">{isDemo ? 1 : 6}</span>
                    </div>
                    <p className="text-sm font-medium">Closed Won</p>
                    <Badge variant="default" className="text-xs bg-success">{isDemo ? "+1 this week" : "+2 this week"}</Badge>
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
                      <span className="font-medium">{isDemo ? "1 this week" : "12 this week"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Average Open Rate</span>
                      <span className="font-medium text-success">{isDemo ? "42.1%" : "68.4%"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Click Through Rate</span>
                      <span className="font-medium text-success">{isDemo ? "8.2%" : "12.8%"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <FeatureGate feature="Social Media Analytics" requiredPlan="agency">
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
              </FeatureGate>
            </div>

            {/* Upgrade CTA for Demo Users */}
            {isDemo && (
              <Card className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border-primary/20">
                <CardContent className="py-8">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Ready to unlock your full potential?</h3>
                      <p className="text-muted-foreground">
                        Upgrade to Agency Plan for unlimited contacts, workflows, and advanced analytics.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Link to="/pricing">
                        <Button variant="outline">View All Plans</Button>
                      </Link>
                      <Button
                        className="bg-gradient-primary border-0"
                        onClick={() => setUpgradeModalOpen(true)}
                      >
                        <Crown className="mr-2 h-4 w-4" />
                        Upgrade Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>

      <UpgradeModal open={upgradeModalOpen} onOpenChange={setUpgradeModalOpen} />
    </div>
  );
};

export default Index;
