import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
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
  Bell,
} from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  className?: string;
}

const navigation = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
    current: true,
  },
  {
    name: "Conversations",
    icon: MessageSquare,
    href: "/conversations",
    badge: "12",
    current: false,
  },
  {
    name: "Contacts",
    icon: Users,
    href: "/contacts",
    current: false,
  },
  {
    name: "Opportunities",
    icon: Target,
    href: "/opportunities",
    current: false,
  },
];

const marketing = [
  {
    name: "Campaigns",
    icon: Mail,
    href: "/campaigns",
    current: false,
  },
  {
    name: "Email",
    icon: Mail,
    href: "/email",
    current: false,
  },
  {
    name: "SMS",
    icon: Smartphone,
    href: "/sms",
    current: false,
  },
  {
    name: "Social",
    icon: Globe,
    href: "/social",
    current: false,
  },
];

const automation = [
  {
    name: "Workflows",
    icon: Zap,
    href: "/workflows",
    current: false,
  },
  {
    name: "Forms",
    icon: FileText,
    href: "/forms",
    current: false,
  },
  {
    name: "Calendars",
    icon: Calendar,
    href: "/calendars",
    current: false,
  },
];

const business = [
  {
    name: "Reputation",
    icon: Star,
    href: "/reputation",
    current: false,
  },
  {
    name: "Reporting",
    icon: BarChart3,
    href: "/reporting",
    current: false,
  },
  {
    name: "Marketplace",
    icon: Store,
    href: "/marketplace",
    current: false,
  },
];

export function Sidebar({ className }: SidebarProps) {
  const [marketingOpen, setMarketingOpen] = useState(true);
  const [automationOpen, setAutomationOpen] = useState(true);
  const [businessOpen, setBusinessOpen] = useState(false);

  return (
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
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant={item.current ? "secondary" : "ghost"}
                className="w-full justify-start h-9"
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
                {item.badge && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            ))}
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
                {marketing.map((item) => (
                  <Button
                    key={item.name}
                    variant="ghost"
                    className="w-full justify-start h-8 text-sm"
                  >
                    <item.icon className="mr-3 h-3 w-3" />
                    {item.name}
                  </Button>
                ))}
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
                {automation.map((item) => (
                  <Button
                    key={item.name}
                    variant="ghost"
                    className="w-full justify-start h-8 text-sm"
                  >
                    <item.icon className="mr-3 h-3 w-3" />
                    {item.name}
                  </Button>
                ))}
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
                {business.map((item) => (
                  <Button
                    key={item.name}
                    variant="ghost"
                    className="w-full justify-start h-8 text-sm"
                  >
                    <item.icon className="mr-3 h-3 w-3" />
                    {item.name}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      {/* Settings */}
      <div className="border-t p-4">
        <Button variant="ghost" className="w-full justify-start h-9">
          <Settings className="mr-3 h-4 w-4" />
          Settings
        </Button>
      </div>
    </div>
  );
}