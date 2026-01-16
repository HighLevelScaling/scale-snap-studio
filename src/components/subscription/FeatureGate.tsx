import { useState, ReactNode } from "react";
import { Lock } from "lucide-react";
import { useSubscription, PlanType } from "@/contexts/SubscriptionContext";
import { UpgradeModal } from "./UpgradeModal";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FeatureGateProps {
  children: ReactNode;
  feature: string;
  requiredPlan?: PlanType;
  showLock?: boolean;
  className?: string;
}

export function FeatureGate({
  children,
  feature,
  requiredPlan = "agency",
  showLock = true,
  className = "",
}: FeatureGateProps) {
  const { currentPlan } = useSubscription();
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);

  const planOrder: PlanType[] = ["demo", "agency", "enterprise"];
  const currentPlanIndex = planOrder.indexOf(currentPlan);
  const requiredPlanIndex = planOrder.indexOf(requiredPlan);
  const hasAccess = currentPlanIndex >= requiredPlanIndex;

  if (hasAccess) {
    return <>{children}</>;
  }

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`relative cursor-pointer ${className}`}
            onClick={() => setUpgradeModalOpen(true)}
          >
            <div className="opacity-50 pointer-events-none">{children}</div>
            {showLock && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
                <div className="flex flex-col items-center gap-2">
                  <Lock className="h-6 w-6 text-muted-foreground" />
                  <Button size="sm" variant="outline" className="text-xs">
                    Upgrade to Unlock
                  </Button>
                </div>
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Upgrade to {requiredPlan === "enterprise" ? "Enterprise Pro" : "Agency Plan"} to access {feature}</p>
        </TooltipContent>
      </Tooltip>

      <UpgradeModal
        open={upgradeModalOpen}
        onOpenChange={setUpgradeModalOpen}
        feature={feature}
      />
    </>
  );
}
