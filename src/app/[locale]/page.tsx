import HeroSection from "@/components/home/HeroSection";
import MarqueeStrip from "@/components/home/MarqueeStrip";
import StatsBar from "@/components/home/StatsBar";
import SelectedWork from "@/components/home/SelectedWork";
import WhatsAppSimulator from "@/components/home/WhatsAppSimulator";
import ExperienceSection from "@/components/home/ExperienceSection";
import ServicesOverview from "@/components/home/ServicesOverview";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <StatsBar />
      <SelectedWork />
      <WhatsAppSimulator />
      <ExperienceSection />
      <ServicesOverview />
      <CTASection />
    </>
  );
}
