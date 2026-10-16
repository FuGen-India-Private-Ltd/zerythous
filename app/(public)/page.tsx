import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import Introduction from "@/components/Introduction";
import SelectedWork from "@/components/SelectedWork";
import Services from "@/components/Services";
import ArchitecturePlayground from "@/components/ArchitecturePlayground";
import CostEstimator from "@/components/CostEstimator";
import WhyZerythous from "@/components/WhyZerythous";
import Process from "@/components/Process";
import ProjectBuilder from "@/components/ProjectBuilder";
import Team from "@/components/Team";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-background text-foreground transition-colors duration-300">
      <Hero />
      <TechMarquee />
      <Introduction />
      <SelectedWork />
      <Services />
      <ArchitecturePlayground />
      <CostEstimator />
      <WhyZerythous />
      <Process />
      <ProjectBuilder />
      <Team />
      <Contact />
    </main>
  );
}
