import HeroSection from "@/components/home/HeroSection";
import MarqueeStrip from "@/components/home/MarqueeStrip";
import ClientStrip from "@/components/home/ClientStrip";
import CapabilityTiles from "@/components/home/CapabilityTiles";
import StatsBand from "@/components/home/StatsBand";
import AutomationAnatomy from "@/components/home/AutomationAnatomy";
import ProcessRibbon from "@/components/home/ProcessRibbon";
import SelectedWork from "@/components/home/SelectedWork";
import WhatsAppSimulator from "@/components/home/WhatsAppSimulator";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <ClientStrip />
      <CapabilityTiles />
      <StatsBand />
      <AutomationAnatomy />
      <ProcessRibbon />
      <SelectedWork />
      <WhatsAppSimulator />
      <CTASection />
    </>
  );
}
