import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import WhatsAppSimulator from "@/components/home/WhatsAppSimulator";
import ServicesOverview from "@/components/home/ServicesOverview";
import SocialProof from "@/components/home/SocialProof";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <WhatsAppSimulator />
      <ServicesOverview />
      <SocialProof />
      <CTASection />
    </>
  );
}
