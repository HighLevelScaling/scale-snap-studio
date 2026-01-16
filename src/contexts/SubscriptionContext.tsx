import { createContext, useContext, useState, ReactNode } from "react";

export type PlanType = "demo" | "agency" | "enterprise";

interface PlanLimits {
  maxContacts: number;
  maxConversations: number;
  maxWorkflows: number;
  maxCampaigns: number;
  hasAdvancedAnalytics: boolean;
  hasWhiteLabel: boolean;
  hasCustomIntegrations: boolean;
  hasPrioritySupport: boolean;
  hasDedicatedManager: boolean;
}

interface Plan {
  id: PlanType;
  name: string;
  price: number;
  description: string;
  limits: PlanLimits;
  paypalLink: string;
}

export const PLANS: Record<PlanType, Plan> = {
  demo: {
    id: "demo",
    name: "Demo",
    price: 0,
    description: "Try out Scale Snap Studio with limited features",
    limits: {
      maxContacts: 100,
      maxConversations: 25,
      maxWorkflows: 3,
      maxCampaigns: 2,
      hasAdvancedAnalytics: false,
      hasWhiteLabel: false,
      hasCustomIntegrations: false,
      hasPrioritySupport: false,
      hasDedicatedManager: false,
    },
    paypalLink: "",
  },
  agency: {
    id: "agency",
    name: "Agency Plan",
    price: 99,
    description: "Full access with unlimited snapshots, priority support, and advanced analytics",
    limits: {
      maxContacts: -1, // unlimited
      maxConversations: -1,
      maxWorkflows: -1,
      maxCampaigns: -1,
      hasAdvancedAnalytics: true,
      hasWhiteLabel: false,
      hasCustomIntegrations: false,
      hasPrioritySupport: true,
      hasDedicatedManager: false,
    },
    paypalLink: "https://www.paypal.com/ncp/payment/2M94DUWF2MHLU",
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise Pro",
    price: 299,
    description: "Premium access with white-label, custom integrations, and dedicated account manager",
    limits: {
      maxContacts: -1,
      maxConversations: -1,
      maxWorkflows: -1,
      maxCampaigns: -1,
      hasAdvancedAnalytics: true,
      hasWhiteLabel: true,
      hasCustomIntegrations: true,
      hasPrioritySupport: true,
      hasDedicatedManager: true,
    },
    paypalLink: "https://www.paypal.com/ncp/payment/4F45APSGDATCJ",
  },
};

interface SubscriptionContextType {
  currentPlan: PlanType;
  planDetails: Plan;
  isDemo: boolean;
  setCurrentPlan: (plan: PlanType) => void;
  checkLimit: (feature: keyof PlanLimits, currentValue?: number) => boolean;
  getRemainingLimit: (feature: keyof PlanLimits, currentValue: number) => number | null;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [currentPlan, setCurrentPlan] = useState<PlanType>("demo");

  const planDetails = PLANS[currentPlan];
  const isDemo = currentPlan === "demo";

  const checkLimit = (feature: keyof PlanLimits, currentValue?: number): boolean => {
    const limit = planDetails.limits[feature];
    if (typeof limit === "boolean") {
      return limit;
    }
    if (limit === -1) return true; // unlimited
    if (currentValue === undefined) return true;
    return currentValue < limit;
  };

  const getRemainingLimit = (feature: keyof PlanLimits, currentValue: number): number | null => {
    const limit = planDetails.limits[feature];
    if (typeof limit === "boolean" || limit === -1) return null;
    return Math.max(0, limit - currentValue);
  };

  return (
    <SubscriptionContext.Provider
      value={{
        currentPlan,
        planDetails,
        isDemo,
        setCurrentPlan,
        checkLimit,
        getRemainingLimit,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
}
