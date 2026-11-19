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
    payments: [
      { qrImage: '/images/codex-clipboard-503d58db-3585-43f7-80cf-4beedacae448.png' },
      { qrImage: '/images/codex-clipboard-1d697bf7-24dc-4db5-9173-a18a20fe5b0b.png' },
    ],
  },

  // ---- 2. EVENT FACTS ----------------------------------------------------
  // Leave a value as '' to display "To be announced".
  details: {
    date: '25 November 2026',
    venue: 'GLA University',
    venueExact: 'KC Ground',
    deadline: '24 November 2026',
    eligibility: 'College students only.',
    format: '',
    fee: '₹49 per participant',
  },
  eventRules: [
    { title: 'Art competition materials', detail: 'Paints, brushes, and canvases will be provided. Participants may bring any additional art materials they need.' },
    { title: 'Prizes', items: [
      { label: '1st Position', value: '₹3,000' },
      { label: '2nd Position', value: '₹2,000' },
    ] },
    { title: 'Games', detail: 'Various games will be held. Game participation fees will be announced at the venue.' },
    { title: 'Shops and stalls', detail: 'Multiple shops and stalls will be set up during the event.' },
  ],

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
  timelineNote: '',
  timeline: [
    { time: '11:00 AM', title: 'On-site registration opens', desc: 'Participant registration begins at KC Ground.' },
    { time: '12:00 PM', title: 'Event begins', desc: 'Competitions, games, and stalls open.' },
    { time: '12:00–3:00 PM', title: 'Art competition', desc: 'Three hours to create your artwork.' },
    { time: '4:00 PM', title: 'Results announced', desc: 'Winners of the art competition are announced.' },
    { time: '5:00 PM', title: 'Event wrap-up', desc: 'The event concludes.' },
  ],

  // ---- 8. COORDINATORS --------------------------------------------------------
  // photo: '' shows a silhouette.  phone: '+91XXXXXXXXXX'   instagram: full https:// link
  coordinators: [
    { name: 'Silpakrishnan VS', role: 'Faculty Coordinator', photo: '/images/codex-clipboard-ef0ffd83-7d69-4623-8ce3-7ecd01c9dcbc.png', phone: '', email: '', instagram: '' },
    { name: 'Aditya Anand', role: 'President', photo: '/images/aditya-anand.png', phone: '', email: '', instagram: '' },
    { name: 'Vaibhav Rathour', role: 'Vice President', photo: '/images/codex-clipboard-abdaf4d4-2249-49b8-9c7a-1643adfa7fd7.png', phone: '', email: '', instagram: '' },
    { name: 'Madhavika Sisodia', role: 'Vice President', photo: '/images/codex-clipboard-9de23f45-3025-42b1-95b0-1fb109b6d9a8.png', phone: '', email: '', instagram: '' },
  ],

  // ---- 9. SOCIAL LINKS (full https:// URLs; empty = hidden) ---------------------
  social: { instagram: 'https://www.instagram.com/kaleidos.glau?srtk=bzh2bnN0bmhvYWR5', youtube: '', linkedin: '', facebook: '' },

  // ---- 10. FAQ ------------------------------------------------------------------
  faqFallback: 'Contact an event coordinator for help.',
  faq: [
    { q: 'How do I register?', a: 'Complete the online form, follow the payment step, enter your 12-digit UTR number, join the event WhatsApp group, and submit to receive your registration ID.' },
    { q: 'How do I verify my payment?', a: 'Pay using either QR code in the registration form and enter the 12-digit UTR number shown by your UPI app.' },
    { q: 'Where can I find event updates?', a: 'The registration form shows the WhatsApp group QR code and joining link before you submit.' },
    { q: 'Who can I contact for help?', a: 'Contact Abhinna Singh at +91 7897740582, Arpit Gupta at +91 8865930678, or Simran Sachdeva at +91 8795961912.' },
  ],
};
