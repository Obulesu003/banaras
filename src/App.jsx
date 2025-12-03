import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExperienceHighlight from './components/ExperienceHighlight';
import JourneyMap from './components/JourneyMap';
import Itinerary from './components/Itinerary';
import Inclusions from './components/Inclusions';
import Audience from './components/Audience';
import MediaWall from './components/MediaWall';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import WhatsAppWidget from './components/WhatsAppWidget';

function App() {
  return (
    <div className="bg-dark-base min-h-screen text-white font-body selection:bg-neon-pink selection:text-white">
      <Navbar />
      <WhatsAppWidget />
      <main>
        <Hero />
        <ExperienceHighlight />
        <JourneyMap />
        <Itinerary />
        <Inclusions />
        <Audience />
        <MediaWall />
        <FAQ />
        <FinalCTA />
      </main>
    </div>
  );
}

export default App;
