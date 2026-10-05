import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import Introduction from "@/components/Introduction";
import SelectedWork from "@/components/SelectedWork";
import Services from "@/components/Services";
import Architecture from "@/components/Architecture";
import WhyZerythous from "@/components/WhyZerythous";
import Process from "@/components/Process";
import ProjectBuilder from "@/components/ProjectBuilder";
import Team from "@/components/Team";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <TechMarquee />
      <Introduction />
      <SelectedWork />
      <Services />
      <Architecture />
      <WhyZerythous />
      <Process />
      <ProjectBuilder />
      <Team />
      <Contact />
    </main>
  );
}
