/* =====================================================================
   ARTOPIA 3.0 — CENTRAL CONFIGURATION
   Organizers: this is the ONLY file you need to edit for event info.
   Anything in [SQUARE BRACKETS] is a placeholder and shows in gold.
   (The registration FORM FIELDS live in  shared/formOptions.js )
   ===================================================================== */
export const CONFIG = {
  // ---- 1. REGISTRATION ---------------------------------------------------
  registration: {
    // "open" | "soon" | "closed"  ("closed" disables every Register button)
    status: 'open',
    // Optional extra line next to the status, e.g. "Closes 20 Nov". "" hides it.
    announcement: '',
    // WhatsApp group shown inside the registration form and on the success screen.
    whatsapp: {
      qrImage: '/images/whatsapp-qr.png',
      groupLink: 'https://chat.whatsapp.com/JnDWvnAqnjTDrTZan1WyRF',
    },
  },

  // ---- 2. EVENT FACTS ----------------------------------------------------
  // Leave a value as '' to display "To be announced".
  details: {
    date: '25 November 2026',
    time: '[INSERT START AND END TIME]',
    venue: 'GLA University, Mathura',
    venueExact: 'KC Ground',
    deadline: '[INSERT DEADLINE]',
    eligibility: '[INSERT ELIGIBILITY]',
    format: '[INSERT PARTICIPATION FORMAT]',
    fee: '[INSERT CONFIRMED FEE]',
    competition: '[INSERT COMPETITION DETAILS — rules, themes, categories, judging]',
  },

  // ---- 3. VENUE MAP ------------------------------------------------------
  venueMap: {
    directionsUrl: '', // Google Maps link for the "Get directions" button
    embedUrl: '',      // Google Maps "Embed a map" src URL (optional)
  },

  // ---- 4. EXPERIENCES (proposed categories) -------------------------------
  // art: painting | trophy | frame | nodes | stall      link: '' hides the link
  experiences: [
    { kind: 'UNIVERSE 01', title: 'Live Art & Painting', art: 'painting', accent: '#E62429', link: '',
      desc: 'Canvases, colours and creators in one place. Watch ideas take shape in real time.' },
    { kind: 'UNIVERSE 02', title: 'Creative Competitions', art: 'trophy', accent: '#F5B942', link: '',
      desc: 'Bring your style and measure it against artists from other colleges.' },
    { kind: 'UNIVERSE 03', title: 'Art Exhibitions', art: 'frame', accent: '#38BDF8', link: '',
      desc: 'Walk through a gallery of work from many perspectives, hung and lit like it matters.' },
    { kind: 'UNIVERSE 04', title: 'Interactive Art Experiences', art: 'nodes', accent: '#8B5CF6', link: '',
      desc: 'Step into pieces you can touch, change and add to. Art that answers back.' },
    { kind: 'UNIVERSE 05', title: 'Campus Stalls & Discoveries', art: 'stall', accent: '#FF7A3D', link: '',
      desc: 'Browse stalls, find small treasures and meet makers across the campus.' },
  ],

  // ---- 5. WHY ATTEND -------------------------------------------------------
  whyAttend: [
    { c: '#E62429', t: 'Showcase your creativity', d: 'Put your work in front of people who came to look at art.' },
    { c: '#F5B942', t: 'Compete with artists from other colleges', d: 'See how your style stacks up against fresh perspectives.' },
    { c: '#38BDF8', t: 'Discover different art styles', d: 'Every campus brings its own voice. Hear a few new ones.' },
    { c: '#8B5CF6', t: 'Explore the exhibition and stalls', d: "Wander the campus and find something you didn't expect." },
    { c: '#E62429', t: 'Connect with a creative community', d: 'Meet people who also draw on the margins of their notebooks.' },
    { c: '#F5B942', t: 'Feel the multiverse atmosphere', d: 'A Marvel-inspired setting that turns the campus into another dimension.' },
  ],

  // ---- 6. ARTOPIA 2.0 GALLERY ----------------------------------------------
  // Photos from the Artopia 2.0 archive in public/images/artopia-2/.
  gallery: {
    showPlaceholderNotice: false,
    items: [
      { src: '/images/artopia-2/event-stage.jpg',         title: 'The festival stage',       alt: 'Artopia 2.0 stage and festival decorations in the campus courtyard', span: 'big' },
      { src: '/images/artopia-2/festival-ground.jpg',     title: 'A moment on the grounds',  alt: 'Visitors gather near the Artopia 2.0 stage on the university grounds', span: '' },
      { src: '/images/artopia-2/wing-installation.jpg',   title: 'Wings in the courtyard',   alt: 'A visitor poses beside the large feathered wing installation at Artopia 2.0', span: 'tall' },
      { src: '/images/artopia-2/artopia-highlights.png',  title: 'Artopia 2.0 highlights',   alt: 'Festival recap collage featuring artists, student work, and the Artopia 2.0 team', span: '' },
      { src: '/images/artopia-2/student-artwork.jpg',      title: 'Portrait in progress',     alt: 'A detailed student portrait drawing among artwork displayed at the festival', span: 'wide' },
      { src: '/images/artopia-2/artwork-showcase.jpg',    title: 'Artworks on display',      alt: 'Student paintings and illustrations arranged across an outdoor exhibition table', span: '' },
      { src: '/images/artopia-2/painting-session.png',    title: 'Making art together',      alt: 'Students sit together on the lawn and work on their paintings', span: '' },
      { src: '/images/artopia-2/kaleidos-stage.png',      title: 'The Kaleidos stage',       alt: 'The Artopia 2.0 stage, art installations, and Kaleidos lettering', span: 'feature' },
    ],
  },

  // ---- 7. TIMELINE (structure only — confirm before launch) ------------------
  timelineNote: 'This schedule is a placeholder structure. Final timings will be confirmed by the organizers.',
  timeline: [
    { time: '[TIME TBA]', title: 'Registrations open', desc: 'Fill in the registration form to secure your place.' },
    { time: '[TIME TBA]', title: 'Event inauguration', desc: 'The portal opens and Artopia 3.0 begins.' },
    { time: '[TIME TBA]', title: 'Competition sessions', desc: 'Creative competitions run through the day.' },
    { time: '[TIME TBA]', title: 'Exhibition and stall exploration', desc: 'Explore the exhibits and stalls around campus.' },
    { time: '[TIME TBA]', title: 'Closing ceremony', desc: 'Wrap-up and a last look at the day.' },
  ],

  // ---- 8. COORDINATORS --------------------------------------------------------
  // photo: '' shows a silhouette.  phone: '+91XXXXXXXXXX'   instagram: full https:// link
  coordinators: [
    { name: '[Coordinator Name]', role: '[Faculty Coordinator]', photo: '', phone: '', email: '', instagram: '' },
    { name: '[Coordinator Name]', role: '[Student Coordinator]', photo: '', phone: '', email: '', instagram: '' },
    { name: '[Coordinator Name]', role: '[Event Coordinator]', photo: '', phone: '', email: '', instagram: '' },
  ],

  // ---- 9. SOCIAL LINKS (full https:// URLs; empty = hidden) ---------------------
  social: { instagram: 'https://www.instagram.com/kaleidos.glau?srtk=bzh2bnN0bmhvYWR5', youtube: '', linkedin: '', facebook: '' },

  // ---- 10. FAQ ------------------------------------------------------------------
  faqFallback: 'Please refer to the registration form or contact the organizers for confirmation.',
  faq: [
    { q: 'Who can participate?', a: '' },
    { q: 'How do I register?', a: 'Tap any “Register now” button on this page, fill in the form and submit. You will see a confirmation with your registration ID.' },
    { q: 'Is there a registration fee?', a: '' },
    { q: 'Can students from other colleges attend?', a: 'Artopia brings together creative minds from different colleges. For specific eligibility, please contact the organizers.' },
    { q: 'What should participants bring?', a: '' },
    { q: 'Where and when is the event?', a: '' },
    { q: 'Who can I contact for help?', a: '' },
  ],
};
