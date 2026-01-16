import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Search, Plus, ChevronDown, Crown, Sparkles, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { UpgradeModal } from "@/components/subscription/UpgradeModal";
import { Link } from "react-router-dom";

export function Header() {
  const { currentPlan, planDetails, isDemo } = useSubscription();
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);

  const getPlanIcon = () => {
    switch (currentPlan) {
      case "demo":
        return <Sparkles className="h-3 w-3 mr-1" />;
      case "agency":
        return <Zap className="h-3 w-3 mr-1" />;
      case "enterprise":
        return <Crown className="h-3 w-3 mr-1" />;
    }
  };

  const getPlanBadgeStyle = () => {
    switch (currentPlan) {
      case "demo":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "agency":
        return "bg-primary/10 text-primary border-primary/30";
      case "enterprise":
        return "bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0";
    }
  };

  return (
    <>
      <header className="flex h-16 items-center justify-between border-b bg-card px-6">
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search contacts, conversations..."
              className="w-80 pl-10"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Plan Badge */}
          <Link to="/pricing">
            <Badge
              variant="outline"
              className={`cursor-pointer hover:opacity-80 transition-opacity ${getPlanBadgeStyle()}`}
            >
              {getPlanIcon()}
              {planDetails.name}
            </Badge>
          </Link>

          {/* Upgrade Button - Only show for demo users */}
          {isDemo && (
            <Button
              size="sm"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
              onClick={() => setUpgradeModalOpen(true)}
            >
              <Crown className="mr-2 h-4 w-4" />
              Upgrade
            </Button>
          )}

          {/* Quick Actions */}
          <Button size="sm" className="bg-gradient-primary border-0">
            <Plus className="mr-2 h-4 w-4" />
            Add Contact
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -right-1 -top-1 h-5 w-5 p-0 text-xs">
              {isDemo ? 1 : 3}
            </Badge>
          </Button>

          {/* Account Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-9 px-3">
                <div className="flex items-center space-x-2">
                  <div className="text-left">
                    <p className="text-sm font-medium">
                      {isDemo ? "Demo Account" : "Digital Marketing Pro"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {planDetails.name}
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>Switch Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex items-center space-x-2">
                  <div className="h-6 w-6 rounded bg-gradient-primary" />
                  <div>
                    <p className="text-sm font-medium">
                      {isDemo ? "Demo Account" : "Digital Marketing Pro"}
                    </p>
                    <p className="text-xs text-muted-foreground">{planDetails.name}</p>
                  </div>
                </div>
              </DropdownMenuItem>
              {!isDemo && (
                <DropdownMenuItem>
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-6 rounded bg-gradient-success" />
                    <div>
                      <p className="text-sm font-medium">Local Restaurant</p>
                      <p className="text-xs text-muted-foreground">Client Location</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                  <AvatarFallback>{isDemo ? "DU" : "JD"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{isDemo ? "Demo User" : "John Doe"}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/pricing">Billing & Plans</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <UpgradeModal open={upgradeModalOpen} onOpenChange={setUpgradeModalOpen} />
    </>
  );
}
