import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Crown, Rocket } from "lucide-react";
import { PLANS, PlanType } from "@/contexts/SubscriptionContext";

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feature?: string;
}

const planFeatures: Record<PlanType, string[]> = {
  demo: [
    "100 contacts limit",
    "25 conversations",
    "3 workflows",
    "2 campaigns",
    "Basic analytics",
  ],
  agency: [
    "Unlimited contacts",
    "Unlimited conversations",
    "Unlimited workflows",
    "Unlimited campaigns",
    "Advanced analytics",
    "Priority support",
  ],
  enterprise: [
    "Everything in Agency",
    "White-label options",
    "Custom integrations",
    "Dedicated account manager",
    "Enterprise-grade support",
    "API access",
  ],
};

export function UpgradeModal({ open, onOpenChange, feature }: UpgradeModalProps) {
  const handleUpgrade = (paypalLink: string) => {
    window.open(paypalLink, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Rocket className="h-6 w-6 text-primary" />
            Upgrade Your Plan
          </DialogTitle>
          <DialogDescription>
            {feature
              ? `Unlock ${feature} and more by upgrading to a paid plan.`
              : "Get access to unlimited features and premium support."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {/* Agency Plan */}
          <div className="relative border rounded-lg p-6 hover:border-primary transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">{PLANS.agency.name}</h3>
            </div>
            <div className="mb-4">
              <span className="text-3xl font-bold">${PLANS.agency.price}</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {PLANS.agency.description}
            </p>
            <ul className="space-y-2 mb-6">
              {planFeatures.agency.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-success" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              className="w-full bg-gradient-primary border-0"
              onClick={() => handleUpgrade(PLANS.agency.paypalLink)}
            >
              Get Agency Plan
            </Button>
          </div>

          {/* Enterprise Pro Plan */}
          <div className="relative border-2 border-primary rounded-lg p-6">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-primary">
              Most Popular
            </Badge>
            <div className="flex items-center gap-2 mb-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              <h3 className="font-semibold text-lg">{PLANS.enterprise.name}</h3>
            </div>
            <div className="mb-4">
              <span className="text-3xl font-bold">${PLANS.enterprise.price}</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {PLANS.enterprise.description}
            </p>
            <ul className="space-y-2 mb-6">
              {planFeatures.enterprise.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-success" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 border-0 text-white hover:from-yellow-600 hover:to-orange-600"
              onClick={() => handleUpgrade(PLANS.enterprise.paypalLink)}
            >
              Get Enterprise Pro
            </Button>
          </div>
        </div>

        <p className="text-xs text-center text-muted-foreground mt-4">
          Secure payment powered by PayPal. Cancel anytime.
        </p>
      </DialogContent>
    </Dialog>
  );
}
