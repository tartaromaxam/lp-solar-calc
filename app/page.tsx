import Hero from "./components/Hero";
import PainSection from "./components/PainSection";
import Benefits from "./components/Benefits";
import SolarWidget from "./components/SolarWidget";
import Projects from "./components/Projects";
import LeadForm from "./components/LeadForm";
import Footer from "./components/Footer";

export default function Home(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-[#0F0F12]">
      <Hero />
      <PainSection />
      <Benefits />
      <SolarWidget />
      <Projects />
      <LeadForm />
      <Footer />
    </main>
  );
}
