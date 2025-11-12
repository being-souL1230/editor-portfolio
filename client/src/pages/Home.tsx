import ParticlesBackground from '@/components/ParticlesBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
import Pricing from '@/components/Pricing';
import DemoVideo from '@/components/DemoVideo';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      <ParticlesBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Portfolio />
        <Pricing />
        <DemoVideo />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
