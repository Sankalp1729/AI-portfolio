import AboutSection from "../components/sections/AboutSection";
import Certifications from "../components/sections/Certifications";
import Contact from "../components/sections/Contact";
import Experience from "../components/sections/Experience";
import Footer from "../components/sections/Footer";
import HeroSection from "../components/sections/HeroSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import Skills from "../components/sections/Skills";
import Timeline from "../components/sections/Timeline";
import Cursor from "../components/ui/Cursor";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Cursor />

      <HeroSection />

      <AboutSection />

      <Skills />

      <ProjectsSection />

      <Experience />

      <Timeline />

      <Certifications />

      <Contact />

      <Footer />
    </main>
  );
}
