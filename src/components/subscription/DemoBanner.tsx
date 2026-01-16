import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Sparkles, ArrowRight } from "lucide-react";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { UpgradeModal } from "./UpgradeModal";

export function DemoBanner() {
  const { isDemo, planDetails } = useSubscription();
  const [dismissed, setDismissed] = useState(false);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);

  if (!isDemo || dismissed) return null;

  return (
    <>
      <div className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border-b border-primary/20">
        <div className="px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
              <Sparkles className="h-3 w-3 mr-1" />
              Demo Mode
            </Badge>
            <span className="text-sm text-muted-foreground">
              You're using the demo version with limited features.
              <span className="hidden sm:inline">
                {" "}Upgrade to unlock unlimited access.
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="bg-gradient-primary border-0 text-xs"
              onClick={() => setUpgradeModalOpen(true)}
            >
              Upgrade Now
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setDismissed(true)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <UpgradeModal open={upgradeModalOpen} onOpenChange={setUpgradeModalOpen} />
    </>
  );
}
