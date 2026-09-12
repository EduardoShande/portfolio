import HeroSection from "@/components/home/HeroSection";
import MarqueeStrip from "@/components/home/MarqueeStrip";
import StatsBar from "@/components/home/StatsBar";
import WhatsAppSimulator from "@/components/home/WhatsAppSimulator";
import ServicesOverview from "@/components/home/ServicesOverview";
import ProcessSteps from "@/components/home/ProcessSteps";
import SocialProof from "@/components/home/SocialProof";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <StatsBar />
      <WhatsAppSimulator />
      <ServicesOverview />
      <ProcessSteps />
      <SocialProof />
      <CTASection />
    </>
  );
}
