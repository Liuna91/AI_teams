import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AgentTeam from "@/components/AgentTeam";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <AgentTeam />
      <Features />
      <Footer />
    </main>
  );
}
