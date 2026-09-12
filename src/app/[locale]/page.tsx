import HeroSection from "@/components/home/HeroSection";
import MarqueeStrip from "@/components/home/MarqueeStrip";
import ClientStrip from "@/components/home/ClientStrip";
import CapabilityTiles from "@/components/home/CapabilityTiles";
import StatsBand from "@/components/home/StatsBand";
import AutomationAnatomy from "@/components/home/AutomationAnatomy";
import ProcessHex from "@/components/home/ProcessHex";
import SelectedWork from "@/components/home/SelectedWork";
import BeforeAfter from "@/components/home/BeforeAfter";
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
      <ProcessHex />
      <SelectedWork />
      <BeforeAfter />
      <CTASection />
    </>
  );
}
