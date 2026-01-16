import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Target,
  Mail,
  Smartphone,
  Zap,
  Globe,
  FileText,
  Calendar,
  Star,
  BarChart3,
  Settings,
  Store,
  ChevronDown,
  Crown,
  Lock,
  Sparkles,
} from "lucide-react";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { UpgradeModal } from "@/components/subscription/UpgradeModal";
import { Link } from "react-router-dom";

interface SidebarProps {
  className?: string;
}

const navigation = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
    current: true,
    requiredPlan: "demo" as const,
  },
  {
    name: "Conversations",
    icon: MessageSquare,
    href: "/conversations",
    badge: "12",
    current: false,
    requiredPlan: "demo" as const,
  },
  {
    name: "Contacts",
    icon: Users,
    href: "/contacts",
    current: false,
    requiredPlan: "demo" as const,
  },
  {
    name: "Opportunities",
    icon: Target,
    href: "/opportunities",
    current: false,
    requiredPlan: "demo" as const,
  },
];

const marketing = [
  {
    name: "Campaigns",
    icon: Mail,
    href: "/campaigns",
    current: false,
    requiredPlan: "demo" as const,
  },
  {
    name: "Email",
    icon: Mail,
    href: "/email",
    current: false,
    requiredPlan: "demo" as const,
  },
  {
    name: "SMS",
    icon: Smartphone,
    href: "/sms",
    current: false,
    requiredPlan: "agency" as const,
  },
  {
    name: "Social",
    icon: Globe,
    href: "/social",
    current: false,
    requiredPlan: "agency" as const,
  },
];

const automation = [
  {
    name: "Workflows",
    icon: Zap,
    href: "/workflows",
    current: false,
    requiredPlan: "demo" as const,
  },
  {
    name: "Forms",
    icon: FileText,
    href: "/forms",
    current: false,
    requiredPlan: "demo" as const,
  },
  {
    name: "Calendars",
    icon: Calendar,
    href: "/calendars",
    current: false,
    requiredPlan: "agency" as const,
  },
];

const business = [
  {
    name: "Reputation",
    icon: Star,
    href: "/reputation",
    current: false,
    requiredPlan: "agency" as const,
  },
  {
    name: "Reporting",
    icon: BarChart3,
    href: "/reporting",
    current: false,
    requiredPlan: "agency" as const,
  },
  {
    name: "Marketplace",
    icon: Store,
    href: "/marketplace",
    current: false,
    requiredPlan: "enterprise" as const,
  },
];

type PlanType = "demo" | "agency" | "enterprise";

export function Sidebar({ className }: SidebarProps) {
  const [marketingOpen, setMarketingOpen] = useState(true);
  const [automationOpen, setAutomationOpen] = useState(true);
  const [businessOpen, setBusinessOpen] = useState(false);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  
  const { currentPlan, isDemo, planDetails } = useSubscription();

  const planOrder: PlanType[] = ["demo", "agency", "enterprise"];
  
  const hasAccess = (requiredPlan: PlanType) => {
    const currentPlanIndex = planOrder.indexOf(currentPlan);
    const requiredPlanIndex = planOrder.indexOf(requiredPlan);
    return currentPlanIndex >= requiredPlanIndex;
  };

  const renderNavItem = (item: typeof navigation[0]) => {
    const isLocked = !hasAccess(item.requiredPlan);
    
    return (
      <Button
        key={item.name}
        variant={item.current ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start h-9",
          isLocked && "opacity-60"
        )}
        onClick={isLocked ? () => setUpgradeModalOpen(true) : undefined}
      >
        <item.icon className="mr-3 h-4 w-4" />
        {item.name}
        {item.badge && !isLocked && (
          <Badge variant="secondary" className="ml-auto text-xs">
            {item.badge}
          </Badge>
        )}
        {isLocked && (
          <Lock className="ml-auto h-3 w-3 text-muted-foreground" />
        )}
      </Button>
    );
  };

  return (
    <>
      <div className={cn("flex h-full w-64 flex-col border-r bg-card", className)}>
        <div className="flex h-16 items-center px-6 border-b">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-sm">HighLevel Scaling</h1>
              <p className="text-xs text-muted-foreground">Agency Dashboard</p>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 px-4">
          <div className="space-y-6 py-6">
            {/* Main Navigation */}
            <div className="space-y-1">
              {navigation.map(renderNavItem)}
            </div>

            {/* Marketing Section */}
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start h-8 text-xs font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setMarketingOpen(!marketingOpen)}
              >
                MARKETING
                <ChevronDown
                  className={cn(
                    "ml-auto h-3 w-3 transition-transform",
                    marketingOpen ? "rotate-180" : ""
                  )}
                />
              </Button>
              {marketingOpen && (
                <div className="space-y-1 ml-2">
                  {marketing.map((item) => {
                    const isLocked = !hasAccess(item.requiredPlan);
                    return (
                      <Button
                        key={item.name}
                        variant="ghost"
                        className={cn(
                          "w-full justify-start h-8 text-sm",
                          isLocked && "opacity-60"
                        )}
                        onClick={isLocked ? () => setUpgradeModalOpen(true) : undefined}
                      >
                        <item.icon className="mr-3 h-3 w-3" />
                        {item.name}
                        {isLocked && (
                          <Lock className="ml-auto h-3 w-3 text-muted-foreground" />
                        )}
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Automation Section */}
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start h-8 text-xs font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setAutomationOpen(!automationOpen)}
              >
                AUTOMATION
                <ChevronDown
                  className={cn(
                    "ml-auto h-3 w-3 transition-transform",
                    automationOpen ? "rotate-180" : ""
                  )}
                />
              </Button>
              {automationOpen && (
                <div className="space-y-1 ml-2">
                  {automation.map((item) => {
                    const isLocked = !hasAccess(item.requiredPlan);
                    return (
                      <Button
                        key={item.name}
                        variant="ghost"
                        className={cn(
                          "w-full justify-start h-8 text-sm",
                          isLocked && "opacity-60"
                        )}
                        onClick={isLocked ? () => setUpgradeModalOpen(true) : undefined}
                      >
                        <item.icon className="mr-3 h-3 w-3" />
                        {item.name}
                        {isLocked && (
                          <Lock className="ml-auto h-3 w-3 text-muted-foreground" />
                        )}
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Business Section */}
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start h-8 text-xs font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setBusinessOpen(!businessOpen)}
              >
                BUSINESS
                <ChevronDown
                  className={cn(
                    "ml-auto h-3 w-3 transition-transform",
                    businessOpen ? "rotate-180" : ""
                  )}
                />
              </Button>
              {businessOpen && (
                <div className="space-y-1 ml-2">
                  {business.map((item) => {
                    const isLocked = !hasAccess(item.requiredPlan);
                    return (
                      <Button
                        key={item.name}
                        variant="ghost"
                        className={cn(
                          "w-full justify-start h-8 text-sm",
                          isLocked && "opacity-60"
                        )}
                        onClick={isLocked ? () => setUpgradeModalOpen(true) : undefined}
                      >
                        <item.icon className="mr-3 h-3 w-3" />
                        {item.name}
                        {isLocked && (
                          <Lock className="ml-auto h-3 w-3 text-muted-foreground" />
                        )}
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        {/* Upgrade Card for Demo Users */}
        {isDemo && (
          <div className="p-4 border-t">
            <Card className="bg-gradient-to-br from-primary/10 to-purple-500/10 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Demo Mode</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Upgrade to unlock all features
                </p>
                <Button
                  size="sm"
                  className="w-full bg-gradient-primary border-0"
                  onClick={() => setUpgradeModalOpen(true)}
                >
                  <Crown className="mr-2 h-3 w-3" />
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Settings */}
        <div className="border-t p-4">
          <Button variant="ghost" className="w-full justify-start h-9">
            <Settings className="mr-3 h-4 w-4" />
            Settings
          </Button>
          <Link to="/pricing">
            <Button variant="ghost" className="w-full justify-start h-9 text-muted-foreground">
              <Crown className="mr-3 h-4 w-4" />
              Billing & Plans
            </Button>
          </Link>
        </div>
      </div>

      <UpgradeModal open={upgradeModalOpen} onOpenChange={setUpgradeModalOpen} />
    </>
  );
}
