"use client";

import { useState, useEffect } from "react";
import { ModernPricingPage } from "@/components/ui/animated-glassy-pricing";
import { pricingPlans } from "@/data/pricing";
import type { PricingPlan } from "@/types";

export default function PricingSection() {
  const [plans, setPlans] = useState<PricingPlan[]>(pricingPlans);

  useEffect(() => {
    fetch("/api/pricing")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setPlans(data.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <ModernPricingPage
      title={
        <>
          Find the <span className="text-cyan-400">Perfect Plan</span> for Your Business
        </>
      }
      subtitle="Start for free, then grow with us. Flexible plans for projects of all sizes."
      plans={plans}
      showAnimatedBackground={false} 
    />
  );
}
