import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Crown, Sparkles, ArrowLeft } from "lucide-react";
import { PLANS, PlanType, useSubscription } from "@/contexts/SubscriptionContext";
import { Link } from "react-router-dom";

const planFeatures: Record<PlanType, { included: string[]; highlighted?: string }> = {
  demo: {
    included: [
      "Up to 100 contacts",
      "25 active conversations",
      "3 automated workflows",
      "2 marketing campaigns",
      "Basic dashboard analytics",
      "Email support",
    ],
    highlighted: "Perfect for trying out the platform",
  },
  agency: {
    included: [
      "Unlimited contacts",
      "Unlimited conversations",
      "Unlimited workflows",
      "Unlimited campaigns",
      "Advanced analytics & reporting",
      "Priority email & chat support",
      "Custom branding options",
      "API access",
    ],
    highlighted: "Best for growing agencies",
  },
  enterprise: {
    included: [
      "Everything in Agency Plan",
      "White-label solution",
      "Custom integrations",
      "Dedicated account manager",
      "24/7 phone support",
      "Custom onboarding",
      "SLA guarantee",
      "Advanced security features",
    ],
    highlighted: "For large-scale operations",
  },
};

export default function Pricing() {
  const { currentPlan, setCurrentPlan } = useSubscription();

  const handleSelectPlan = (planId: PlanType) => {
    if (planId === "demo") {
      setCurrentPlan("demo");
    } else {
      window.open(PLANS[planId].paypalLink, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <Badge className="mb-4 bg-gradient-primary">Pricing Plans</Badge>
        <h1 className="text-4xl font-bold mb-4">
          Choose the Perfect Plan for Your Business
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Start with our free demo or upgrade to unlock unlimited features and premium support.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Demo Plan */}
          <Card className="relative">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-muted-foreground" />
                <CardTitle>{PLANS.demo.name}</CardTitle>
              </div>
              <div className="mb-2">
                <span className="text-4xl font-bold">Free</span>
              </div>
              <CardDescription>{planFeatures.demo.highlighted}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {planFeatures.demo.included.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                variant={currentPlan === "demo" ? "secondary" : "outline"}
                className="w-full"
                onClick={() => handleSelectPlan("demo")}
                disabled={currentPlan === "demo"}
              >
                {currentPlan === "demo" ? "Current Plan" : "Start Free Demo"}
              </Button>
            </CardFooter>
          </Card>

          {/* Agency Plan */}
          <Card className="relative border-2 border-primary">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-primary">
              Recommended
            </Badge>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-primary" />
                <CardTitle>{PLANS.agency.name}</CardTitle>
              </div>
              <div className="mb-2">
                <span className="text-4xl font-bold">${PLANS.agency.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <CardDescription>{planFeatures.agency.highlighted}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {planFeatures.agency.included.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-gradient-primary border-0"
                onClick={() => handleSelectPlan("agency")}
                disabled={currentPlan === "agency"}
              >
                {currentPlan === "agency" ? "Current Plan" : "Get Agency Plan"}
              </Button>
            </CardFooter>
          </Card>

          {/* Enterprise Pro Plan */}
          <Card className="relative">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Crown className="h-5 w-5 text-yellow-500" />
                <CardTitle>{PLANS.enterprise.name}</CardTitle>
              </div>
              <div className="mb-2">
                <span className="text-4xl font-bold">${PLANS.enterprise.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <CardDescription>{planFeatures.enterprise.highlighted}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {planFeatures.enterprise.included.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 border-0 text-white hover:from-yellow-600 hover:to-orange-600"
                onClick={() => handleSelectPlan("enterprise")}
                disabled={currentPlan === "enterprise"}
              >
                {currentPlan === "enterprise" ? "Current Plan" : "Get Enterprise Pro"}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            All plans include a 14-day money-back guarantee. Secure payment powered by PayPal.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Questions? Contact us at{" "}
            <a href="mailto:kian@veridiandatasystems.com" className="text-primary hover:underline">
              kian@veridiandatasystems.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
