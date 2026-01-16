import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowUpRight } from "lucide-react";
import { useSubscription, PlanType } from "@/contexts/SubscriptionContext";
import { UpgradeModal } from "./UpgradeModal";

interface LimitIndicatorProps {
  feature: "maxContacts" | "maxConversations" | "maxWorkflows" | "maxCampaigns";
  currentValue: number;
  label: string;
  showUpgrade?: boolean;
}

const featureLabels = {
  maxContacts: "Contacts",
  maxConversations: "Conversations",
  maxWorkflows: "Workflows",
  maxCampaigns: "Campaigns",
};

export function LimitIndicator({
  feature,
  currentValue,
  label,
  showUpgrade = true,
}: LimitIndicatorProps) {
  const { planDetails, isDemo, getRemainingLimit } = useSubscription();
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);

  const limit = planDetails.limits[feature];

  // If unlimited, don't show indicator
  if (typeof limit !== "number" || limit === -1) {
    return null;
  }

  const percentage = Math.min((currentValue / limit) * 100, 100);
  const remaining = getRemainingLimit(feature, currentValue);
  const isNearLimit = remaining !== null && remaining <= limit * 0.2;
  const isAtLimit = remaining === 0;

  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{label}</span>
          <div className="flex items-center gap-2">
            <span className={isAtLimit ? "text-destructive font-medium" : ""}>
              {currentValue} / {limit}
            </span>
            {isNearLimit && !isAtLimit && (
              <Badge variant="outline" className="text-yellow-600 border-yellow-600 text-xs">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Near Limit
              </Badge>
            )}
            {isAtLimit && (
              <Badge variant="destructive" className="text-xs">
                Limit Reached
              </Badge>
            )}
          </div>
        </div>
        <Progress
          value={percentage}
          className={`h-2 ${isAtLimit ? "[&>div]:bg-destructive" : isNearLimit ? "[&>div]:bg-yellow-500" : ""}`}
        />
        {isDemo && showUpgrade && (isNearLimit || isAtLimit) && (
          <Button
            variant="link"
            size="sm"
            className="h-auto p-0 text-xs text-primary"
            onClick={() => setUpgradeModalOpen(true)}
          >
            Upgrade for unlimited {featureLabels[feature].toLowerCase()}
            <ArrowUpRight className="h-3 w-3 ml-1" />
          </Button>
        )}
      </div>

      <UpgradeModal open={upgradeModalOpen} onOpenChange={setUpgradeModalOpen} />
    </>
  );
}
