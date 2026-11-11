import { useState } from 'react';
import { RegistrationProvider } from './context/RegistrationContext.jsx';
import Preloader from './components/Preloader.jsx';
import Navbar from './components/Navbar.jsx';
import ScrollWidgets from './components/ScrollWidgets.jsx';
import CursorLight from './components/CursorLight.jsx';
import Hero from './components/Hero.jsx';
import Transmission from './components/sections/Transmission.jsx';
import Experiences from './components/sections/Experiences.jsx';
import WhyAttend from './components/sections/WhyAttend.jsx';
import Gallery from './components/sections/Gallery.jsx';
import Briefing from './components/sections/Briefing.jsx';
import Timeline from './components/sections/Timeline.jsx';
import Venue from './components/sections/Venue.jsx';
import Coordinators from './components/sections/Coordinators.jsx';
import Faq from './components/sections/Faq.jsx';
import FinalCta from './components/sections/FinalCta.jsx';
import Footer from './components/Footer.jsx';
import { useReveal } from './hooks/useReveal.js';
import { usePointerFx } from './hooks/usePointerFx.js';
import { RM } from './lib/env.js';

// The intro plays once per browser session, and never with reduced motion.
const seen = (() => { try { return !!sessionStorage.getItem('artopia3-intro'); } catch { return false; } })();
const SKIP_INTRO = RM || seen;

export default function App() {
  const [introOn, setIntroOn] = useState(!SKIP_INTRO);
  const [ready, setReady] = useState(SKIP_INTRO);
  useReveal();
  usePointerFx();

  return (
    <RegistrationProvider>
      {introOn && <Preloader onReveal={() => setReady(true)} onDone={() => setIntroOn(false)} />}
      <a className="skip" href="#main">Skip to content</a>
      <div className="grain" aria-hidden="true" />
      <CursorLight />
      <Navbar />
      <ScrollWidgets />
      <main id="main">
        <Hero ready={ready} />
        <Transmission />
        <Experiences />
        <WhyAttend />
        <Gallery />
        <Briefing />
        <Timeline />
        <Venue />
        <Coordinators />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </RegistrationProvider>
  );
}
