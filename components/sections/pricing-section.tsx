import { ModernPricingPage } from "@/components/ui/animated-glassy-pricing";
import { pricingPlans } from "@/data/pricing";

export default function PricingSection() {
  return (
    <ModernPricingPage
      title={
        <>
          Find the <span className="text-cyan-400">Perfect Plan</span> for Your Business
        </>
      }
      subtitle="Start for free, then grow with us. Flexible plans for projects of all sizes."
      plans={pricingPlans}
      showAnimatedBackground={false} 
    />
  );
}
