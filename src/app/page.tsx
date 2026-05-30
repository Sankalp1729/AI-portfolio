import AboutSection from "@/components/sections/AboutSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import ContactSection from "@/components/sections/ContactSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import MarqueeSection from "@/components/sections/MarqueeSection";
import SkillsSection from "@/components/sections/SkillsSection";
import TimelineSection from "@/components/sections/TimelineSection";
import Cursor from "@/components/ui/Cursor";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Cursor />

      <HeroSection />
      <AboutSection />
      <MarqueeSection />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <TimelineSection />
      <CertificationsSection />
      <ContactSection />
    </main>
  );
}
