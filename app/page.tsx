import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PainSection from "./components/PainSection";
import Benefits from "./components/Benefits";
import SolarWidget from "./components/SolarWidget";
import BehindTheScenes from "./components/BehindTheScenes";
import Projects from "./components/Projects";
import LeadForm from "./components/LeadForm";
import Footer from "./components/Footer";

export default function Home(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-[#0F0F12]">
      <Navbar />
      <Hero />
      <PainSection />
      <Benefits />
      <SolarWidget />
      <BehindTheScenes />
      <Projects />
      <LeadForm />
      <Footer />
    </main>
  );
}
