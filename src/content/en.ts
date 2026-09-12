import type { SiteContent } from "./types";

// English content (served at "/en"). The old site had no real English version,
// so this is a faithful translation of the Arabic copy in ar.ts.

const brand = "Gypsum Decor Makkah";

export const en: SiteContent = {
  locale: "en",

  ui: {
    brand: "Gypsum Board Master Makkah",
    tagline: "High-quality gypsum board decor with creative designs",
    skipToContent: "Skip to content",
    nav: {
      home: "Home",
      about: "About us",
      services: "Services",
      gallery: "Our work",
      faq: "FAQ",
      contact: "Contact",
      blog: "Articles",
    },
    legalNav: { privacy: "Privacy policy", terms: "Terms & conditions" },
    menuOpen: "Open menu",
    menuClose: "Close menu",
    switchLanguage: "العربية",
    switchLanguageLabel: "عرض هذه الصفحة بالعربية",
    callUs: "Call us",
    callNow: "Call now",
    whatsapp: "WhatsApp",
    whatsappUs: "Message us on WhatsApp",
    emailUs: "Email us",
    phoneLabel: "Phone",
    emailLabel: "Email",
    followUs: "Follow us",
    openMap: "View معلم جبس بورد مكة on Google Maps",
    serviceArea: "We serve Makkah and the surrounding areas.",
    readMore: "Read article",
    seeAllWork: "See all our work",
    allServices: "See all services",
    latestPosts: "More articles",
    playVideo: "Play video",
    gallery: { open: "View larger image", close: "Close", prev: "Previous image", next: "Next image", counter: "{current} of {total}" },
    breadcrumbHome: "Home",
    footerAboutTitle: "About us",
    footerAbout:
      "Gypsum Decor – we offer the best gypsum decor solutions with high quality and creative designs. We always aim to meet our clients' expectations through an outstanding team and complete services.",
    footerContactTitle: "Contact us today!",
    footerLinksTitle: "Useful links",
    copyright: "All rights reserved © 2024 Gypsum Decor Makkah.",
    videoUnsupported: "Your browser does not support video playback.",
    notFoundTitle: "Page not found",
    notFoundBody: "Sorry, we couldn't find the page you were looking for. It may have moved or its address may have changed.",
    backHome: "Back to home",
    form: {
      name: "Name",
      namePlaceholder: "Your name",
      phone: "Mobile number",
      phonePlaceholder: "05xxxxxxxx",
      details: "Project details",
      detailsPlaceholder: "e.g. Gypsum board ceiling with hidden lighting for a living room, about 5×6 m",
      submit: "Send via WhatsApp",
      note: "WhatsApp will open with a ready-made message containing your details, so you can review it before sending.",
      required: "required",
      errors: {
        name: "Please enter your name (at least 2 characters).",
        phone: "Please enter a valid Saudi mobile number, e.g. 0595428955.",
        details: "Please describe your project (at least 10 characters).",
        summary: "Please fix the highlighted fields and try again.",
      },
      message: `Hello, I would like to request a service from Moalim Gypsum Board Makkah (معلم جبس بورد مكة).\n\nName: {name}\nMobile: {phone}\nProject details:\n{details}`,
    },
  },

  home: {
    seo: {
      title: "Gypsum Board Contractor in Makkah | Ceilings, Walls & Decor",
      description:
        "Gypsum board specialist in Makkah: suspended ceilings, partition walls, plain gypsum, cement board and modern gypsum decor by a skilled Pakistani team. Call 0595428955 for a quote.",
    },
    hero: {
      title: "Gypsum Board Master in Makkah",
      body: "Looking to transform your spaces into stunning interior and exterior designs? At Gypsum Board Makkah we specialise in gypsum board installation and offer a wide range of modern, elegant solutions for ceilings, walls, partitions and more. Whether it's for your home, office or commercial space, our team of skilled professionals is here to bring your vision to life.",
      pic: { image: "home-gypsum-master", alt: "Living room with a stepped gypsum board ceiling, hidden lighting and spotlights" },
    },
    intro: {
      title: brand,
      paragraphs: [
        "At Gypsum Decor Makkah we bring you outstanding experience in gypsum board decor. We specialise in designing and building the latest interior and exterior decor, including suspended ceilings, walls, partitions and unique gypsum TV-wall designs.",
        "Using high-quality materials and a skilled Pakistani workforce, we guarantee impressive, long-lasting results. Whether you want an elegant gypsum board ceiling or creative gypsum decor, we are here to deliver your vision in a modern style with unmatched quality.",
        "Gypsum Decor Makkah – where creativity meets professionalism!",
      ],
      pic: { image: "gallery-dressing-room", alt: "Dressing room with gypsum board decor and hidden ceiling light lines" },
    },
    pakistani: {
      title: "Pakistani-style gypsum board decor in Makkah",
      body: "We create Pakistani-style gypsum board decor that blends authenticity with modern beauty, with distinctive designs for ceilings and walls. We use the best materials to ensure durability and high quality.",
      pic: { image: "gallery-ladies-majlis", alt: "Majlis with a gypsum board ceiling and hidden side lighting" },
    },
    servicesIntro: {
      title: "Our services",
      body: "At Gypsum Decor Makkah we offer a complete range of gypsum decor services to meet all your needs, from design to installation. We focus on creative, modern solutions that combine beauty and function to turn your spaces into works of art.",
    },
    plainGypsum: [
      {
        id: "plain-gypsum-ceilings-walls",
        title: "Plain gypsum design and installation for ceilings and walls",
        body: "We install plain gypsum with elegant designs and high quality to suit every kind of space. Our specialist team ensures a precise finish and an artistic touch that adds beauty to your home or office at a fair price.",
        pic: { image: "poster-video-gypsum-decor", alt: "Moisture-resistant gypsum boards being installed on a ceiling" },
        schemaName: "Plain gypsum ceilings and walls",
      },
      {
        id: "plain-gypsum-contractor",
        title: "Trusted plain gypsum contractor in Makkah",
        body: "We are experts in plain gypsum work with long experience in interior decor. We use excellent materials and offer modern and classic designs for every taste, with full commitment to deadlines and build quality.",
        pic: { image: "home-ceiling-installation", alt: "Metal frame for a suspended ceiling with gypsum boards being fixed" },
        schemaName: "Plain gypsum contractor in Makkah",
      },
    ],
    services: [
      {
        id: "modern-ceilings",
        title: "1. Modern ceilings",
        body: "Armstrong ceilings in modern designs for every taste, and aluminium strip ceilings that add an elegant, refined touch to any space.",
        pic: { image: "service-modern-ceilings", alt: "Modern gypsum board ceiling with built-in lighting" },
        schemaName: "Modern and suspended ceilings",
      },
      {
        id: "partition-walls",
        title: "2. Partition walls",
        body: "High-quality gypsum board walls that give you flexibility in dividing spaces while keeping elegance and privacy.",
        pic: { image: "service-partition-walls", alt: "Gypsum board partition wall dividing an interior space" },
        schemaName: "Gypsum board partition walls",
      },
      {
        id: "material-alternatives",
        title: "3. Material alternatives",
        body: "Realistic marble and wood alternatives that give a luxurious look at a lower cost and with easier maintenance.",
        pic: { image: "service-material-alternatives", alt: "Wall clad with marble and wood alternative panels" },
        schemaName: "Marble and wood alternatives",
      },
      {
        id: "interior-exterior-decor",
        title: "4. Interior and exterior decor",
        body: "Professional gypsum decor for both interior and exterior spaces, adding a sense of luxury and elegance to any place.",
        pic: { image: "service-interior-exterior-decor", alt: "Luxurious interior and exterior gypsum decor" },
        schemaName: "Interior and exterior gypsum decor",
      },
    ],
    moreServices: [
      {
        id: "gypsum-board-master",
        title: "Gypsum board master in Makkah",
        body: "We install and finish all kinds of gypsum board work in Makkah with high professionalism and guaranteed quality, whether you need gypsum decor for ceilings, walls or partitions.",
        pic: { image: "home-2324", alt: "Classic gypsum ceiling with a central dome, chandelier and spotlights" },
        schemaName: "Gypsum board installer in Makkah",
      },
      {
        id: "plain-gypsum-makkah",
        title: "Plain gypsum in Makkah",
        body: "We install plain gypsum in Makkah to the highest standards of quality and precision, designing and building gypsum ceilings and walls with a refined finish that suits every style of decor.",
        pic: { image: "home-5-29", alt: "Gypsum ceiling with cut-out patterns and hidden perimeter lighting" },
        schemaName: "Plain gypsum installation in Makkah",
      },
      {
        id: "cement-board",
        title: "Cement board decor in Makkah",
        body: "We design and install cement board decor in Makkah with high quality and excellent durability. Cement board resists moisture and heat, which makes it a good choice for façades and wet areas.",
        pic: { image: "poster-video-rest-house-work", alt: "Ceiling boards being installed in a rest house" },
        schemaName: "Cement board decor in Makkah",
      },
    ],
    team: {
      title: "Our team",
      body: "Our team is made up of skilled Pakistani craftsmen with wide experience and great precision. We promise creativity in design, professionalism in execution and attention to every small detail, for impressive results that exceed your expectations.",
    },
    work: {
      title: "Discover our work",
      body: "From gypsum board ceilings to gypsum board decor, our portfolio shows a variety of projects that highlight our experience. Let us help you create a space that reflects your personality and style.",
      items: [
        { image: "gallery-tv-wall-decor", title: "TV wall decor", alt: "TV wall with gypsum board decor and lighting" },
        { image: "gallery-bathroom-gypsum-board", title: "Bathroom gypsum board decor", alt: "Bathroom with a gypsum board ceiling and hidden lighting" },
        { image: "gallery-bedroom-decor", title: "Bedroom decor", alt: "Bedroom with a gypsum board ceiling and hidden lighting" },
        { image: "gallery-kitchen-decor", title: "Kitchen decor", alt: "Kitchen with a gypsum board ceiling and hidden LED lighting" },
        { image: "gallery-ladies-majlis", title: "Ladies' majlis decor", alt: "Ladies' majlis with a gypsum board ceiling and hidden side lighting" },
        { image: "gallery-hidden-lighting-design", title: "New hidden lighting design", alt: "Ceiling and wall with modern hidden light lines" },
        { image: "gallery-strip-light", title: "Strip lighting", alt: "Gypsum board ceiling with strip light lines" },
        { image: "gallery-dressing-room", title: "Dressing room decor", alt: "Dressing room with a gypsum ceiling and light lines" },
        { image: "gallery-bedroom-bed-wall", title: "Bed wall decor", alt: "Wall behind the bed with gypsum decor and hidden lighting" },
        { image: "gallery-entrance-decor", title: "Entrance decor", alt: "Entrance ceiling with overlapping square light design" },
        { image: "gallery-light-installation", title: "Light installation", alt: "Collection of linear lighting designs built into walls and ceilings" },
        { image: "gallery-reception-hall", title: "Reception hall decor", alt: "Reception hall with a gypsum board ceiling and linear lighting" },
        { image: "gallery-gypsum-board-wall", title: "Gypsum board wall", alt: "Gypsum board partition wall frame under construction" },
        { image: "gallery-strong-60x60-ceiling", title: "Strong 60×60 ceiling", alt: "Strong 60×60 suspended ceiling during installation" },
    ],
    },
    videos: {
      title: "Videos of our work",
      items: [
        { video: "video-gypsum-board-installation", title: "Gypsum board installation", description: "A clip of gypsum board installation on one of our projects." },
        { video: "video-living-room-curtain-decor", title: "Living room with curtain pelmet", description: "Gypsum decor for a living room with a curtain pelmet and hidden lighting." },
        { video: "video-ceiling-walls-hidden-lighting", title: "Ceiling and walls with hidden lighting", description: "Building a gypsum board ceiling and walls with hidden lighting." },
        { video: "video-rest-house-work", title: "Gypsum work in a rest house", description: "A walk-through of gypsum board work inside a rest house during construction." },
      ],
    },
    contact: {
      title: "Contact us today!",
      body: "Ready to upgrade your spaces with Gypsum Board Makkah? Get in touch today for a consultation or a quote. We are here to make your dream design a reality!",
    },
  },

  about: {
    seo: {
      title: "About Gypsum Decor Makkah | Gypsum Board Specialists",
      description:
        "Meet Gypsum Decor Makkah: a skilled Pakistani team specialising in suspended ceilings, partition walls and gypsum board decor in Makkah, Saudi Arabia.",
    },
    title: "About us – Gypsum Board Makkah",
    intro: [
      "Welcome to Gypsum Decor Makkah – your first choice for renovating and designing spaces with outstanding gypsum decor!",
      "At Gypsum Decor Makkah we believe beautiful spaces inspire everyday life. That is why we offer creative, modern solutions in interior and exterior decor using the latest gypsum board techniques.",
    ],
    blocks: [
      { type: "h2", text: "Who we are" },
      {
        type: "p",
        text: "We are a team of professionals specialising in the design and installation of gypsum board decor, with years of experience turning ordinary spaces into stunning works of art. Our complete services include:",
      },
      {
        type: "ul",
        items: [
          "Suspended ceilings of all kinds (Armstrong, aluminium strips and more).",
          "High-quality partition walls.",
          "Realistic, luxurious marble and wood alternatives.",
          "Gypsum TV walls and foam and gypsum frames in custom designs.",
        ],
      },
      { type: "h2", text: "What sets us apart" },
      {
        type: "ul",
        items: [
          { label: "Quality first", text: "We use the best materials and latest techniques for long-lasting results." },
          { label: "Creative design", text: "We offer unique designs to suit every taste and space." },
          { label: "Professional team", text: "Our skilled Pakistani craftsmen bring precision and creativity to every detail." },
          { label: "Customer satisfaction", text: "We work to meet our clients' expectations and give a great experience from start to finish." },
        ],
      },
      { type: "h2", text: "Our vision" },
      {
        type: "p",
        text: "To be the first choice for anyone looking for beauty and quality in gypsum board decor in Makkah and the surrounding areas. We always strive to offer creative solutions that reflect our clients' personalities and add a touch of luxury to their spaces.",
      },
      { type: "h2", text: "Our mission" },
      {
        type: "p",
        text: "To provide high-quality gypsum decor services at competitive prices, while staying committed to deadlines and precise workmanship. We are here to make your design dreams come true!",
      },
      { type: "p", text: "Gypsum Decor Makkah – where creativity meets professionalism!" },
    ],
  },

  services: {
    seo: {
      title: "Gypsum Board Services in Makkah | Ceilings & Partitions",
      description:
        "Gypsum board services in Makkah: Armstrong and aluminium suspended ceilings, sound-insulating partition walls, marble and wood alternatives, and interior and exterior decor. Free consultation.",
    },
    title: "Our services",
    intro:
      "At Gypsum Decor Makkah we offer a complete range of gypsum board decor services for your home, office or commercial space. We focus on creative, modern solutions that combine beauty and function to turn your spaces into works of art.",
    items: [
      {
        id: "suspended-ceilings",
        title: "1. Suspended ceilings",
        body: "Design and installation of modern suspended ceilings: Armstrong, aluminium strips and gypsum board ceilings.",
        lead: "We design and install modern, practical suspended ceilings, including:",
        points: [
          { label: "Armstrong ceilings", text: "lightweight and easy to install, ideal for commercial and residential spaces." },
          { label: "Aluminium strips", text: "an elegant, refined look with high durability and rust resistance." },
          { label: "Gypsum board ceilings", text: "custom designs for every taste, from classic to modern." },
        ],
        pic: { image: "service-modern-ceilings", alt: "Modern suspended gypsum board ceiling with built-in lighting" },
        schemaName: "Suspended ceiling installation",
      },
      {
        id: "partition-walls",
        title: "2. Partition walls",
        body: "High-quality gypsum board walls that give you flexibility in dividing spaces while keeping elegance and privacy.",
        lead: "We build high-quality gypsum board partition walls that offer:",
        points: ["Flexibility in dividing spaces.", "Effective sound insulation.", "A variety of designs for residential and commercial use."],
        pic: { image: "service-partition-walls", alt: "Gypsum board partition walls dividing an office" },
        schemaName: "Gypsum board partition walls",
      },
      {
        id: "marble-wood-alternatives",
        title: "3. Marble and wood alternatives",
        body: "Realistic marble and wood alternatives with a luxurious look, lower cost and easier maintenance.",
        lead: "We offer realistic marble and wood alternatives that feature:",
        points: ["A luxurious look at a lower cost.", "Easy maintenance and high resistance to wear.", "Suitability for all interior and exterior decor."],
        pic: { image: "service-material-alternatives", alt: "Wall clad with marble and wood alternatives" },
        schemaName: "Marble and wood alternatives",
      },
      {
        id: "interior-exterior-decor",
        title: "4. Interior and exterior decor",
        body: "Complete gypsum decor solutions for interior and exterior spaces.",
        lead: "We offer complete gypsum decor solutions for interior and exterior spaces, including:",
        points: ["3D wall decor designs.", "Weather-resistant exterior decor.", "Custom designs for large and small spaces."],
        pic: { image: "service-interior-exterior-decor", alt: "Luxurious interior and exterior gypsum decor" },
        schemaName: "Interior and exterior gypsum decor",
      },
    ],
    why: {
      title: "Why choose our services?",
      items: [
        { label: "High quality", text: "We use high-quality materials for durable, long-lasting finishes." },
        { label: "Custom designs", text: "We offer design solutions that suit your taste and needs." },
        { label: "Professional team", text: "Our skilled Pakistani craftsmen have wide experience delivering projects." },
        { label: "Competitive prices", text: "We give clear quotes that suit every budget." },
        { label: "On time", text: "We make sure projects are handed over on the agreed date." },
      ],
    },
    how: {
      title: "How we work",
      steps: [
        { label: "Consultation", text: "we start by understanding your needs and giving a free consultation." },
        { label: "Design", text: "we present initial designs that match your vision." },
        { label: "Installation", text: "our skilled team carries out the project with precision and professionalism." },
        { label: "Handover", text: "we deliver the project on time and make sure you are fully satisfied." },
      ],
    },
    closing:
      "Ready to transform your spaces? Call us today for a free consultation or a quote. Gypsum Decor Makkah – where creativity meets professionalism!",
  },

  gallery: {
    seo: {
      title: "Gypsum Board Decor Portfolio, Makkah | Photos & Videos",
      description:
        "Real photos and videos of our gypsum board work: suspended ceilings, hidden lighting, TV walls, bedrooms and majlis rooms. See the quality of our work before you ask for a quote.",
    },
    title: "Our work",
    intro:
      "Discover our creations! At Gypsum Decor Makkah we present some of our best gypsum board decor work. From suspended ceilings to unique walls, here are designs that combine beauty and function.",
    workTitle: "Discover our work",
    workBody:
      "From gypsum board ceilings to gypsum board decor, our portfolio shows a variety of projects that highlight our experience. Let us help you create a space that reflects your personality and style.",
    items: [
      { image: "gallery-tv-wall-decor", title: "TV wall decor", alt: "TV wall with gypsum board decor and lighting" },
      { image: "gallery-bathroom-gypsum-board", title: "Bathroom gypsum board decor", alt: "Bathroom with a gypsum board ceiling and hidden lighting" },
      { image: "gallery-bedroom-decor", title: "Bedroom decor", alt: "Bedroom with a gypsum board ceiling and hidden lighting" },
      { image: "gallery-kitchen-decor", title: "Kitchen decor", alt: "Kitchen with a gypsum board ceiling and hidden LED lighting" },
      { image: "gallery-ladies-majlis", title: "Ladies' majlis decor", alt: "Ladies' majlis with a gypsum board ceiling and hidden side lighting" },
      { image: "gallery-hidden-lighting-design", title: "New hidden lighting design", alt: "Ceiling and wall with modern hidden light lines" },
      { image: "gallery-strip-light", title: "Strip lighting", alt: "Gypsum board ceiling with strip light lines" },
      { image: "gallery-dressing-room", title: "Dressing room decor", alt: "Dressing room with a gypsum ceiling and light lines" },
      { image: "gallery-bedroom-bed-wall", title: "Bed wall decor", alt: "Wall behind the bed with gypsum decor and hidden lighting" },
      { image: "gallery-entrance-decor", title: "Entrance decor", alt: "Entrance ceiling with overlapping square light design" },
      { image: "gallery-prayer-area-decor", title: "Prayer room frames", alt: "Wall with gypsum frames and pictures in a home prayer room" },
      { image: "gallery-wall-hidden-lighting", title: "Wall with hidden lighting", alt: "Wall with vertical hidden lighting profiles" },
      { image: "gallery-light-installation", title: "Light installation", alt: "Collection of linear lighting designs built into walls and ceilings" },
      { image: "gallery-chandelier-ceiling", title: "Chandelier ceiling medallion", alt: "Decorative round gypsum medallion for hanging a chandelier" },
      { image: "gallery-gypsum-cornice", title: "Gypsum cornice", alt: "Size 36 gypsum cornice piece ready to install" },
      { image: "gallery-cinema-panel", title: "Home cinema panel", alt: "Home cinema board wall before final finishing" },
      { image: "gallery-reception-hall", title: "Reception hall decor", alt: "Reception hall with a gypsum board ceiling and linear lighting" },
      { image: "gallery-gypsum-board-doors", title: "Gypsum board door frames", alt: "Arched gypsum board door frame being finished" },
      { image: "gallery-gypsum-board-wall", title: "Gypsum board wall", alt: "Gypsum board partition wall frame under construction" },
      { image: "gallery-strong-60x60-ceiling", title: "Strong 60×60 ceiling", alt: "Strong 60×60 suspended ceiling during installation" },
    ],
    videosTitle: "Videos of our work",
    videos: [
      { video: "video-gypsum-board-installation", title: "Gypsum board installation", description: "A clip of gypsum board installation on one of our projects." },
      { video: "video-living-room-curtain-decor", title: "Living room with curtain pelmet", description: "Gypsum decor for a living room with a curtain pelmet and hidden lighting." },
      { video: "video-ceiling-walls-hidden-lighting", title: "Ceiling and walls with hidden lighting", description: "Building a gypsum board ceiling and walls with hidden lighting." },
      { video: "video-gypsum-decor", title: "Gypsum decor", description: "Stages of gypsum decor work on a moisture-resistant ceiling." },
      { video: "video-staircase-gypsum-decor", title: "Staircase gypsum decor", description: "Gypsum board decor on a staircase wall with openings and lighting." },
      { video: "video-rest-house-work", title: "Gypsum work in a rest house", description: "A walk-through of gypsum board work inside a rest house during construction." },
    ],
  },

  faq: {
    seo: {
      title: "Gypsum Board FAQ, Makkah | Timing, Cost & Warranty",
      description:
        "How long does gypsum board work take? How are gypsum board prices in Makkah calculated? Is there a warranty? Clear answers about our services, materials and how to book.",
    },
    title: "Frequently asked questions",
    intro:
      "At Gypsum Decor Makkah we want to give you all the information you need to make informed decisions about gypsum board decor. Here are the questions we are asked most often about our services, materials, the installation process and more. If your question isn't here, feel free to contact us – our team is always ready to help!",
    items: [
      {
        q: "1. What are Gypsum Decor Makkah's main services?",
        a: [
          { type: "p", text: "We offer a wide range of gypsum decor services, including:" },
          {
            type: "ul",
            items: [
              "Suspended ceiling installation (Armstrong and aluminium strips).",
              "Gypsum board partition walls.",
              "Design and installation of gypsum TV walls and frames.",
              "Modern marble and wood alternatives.",
            ],
          },
        ],
      },
      {
        q: "2. How long does a gypsum board project take?",
        a: [
          {
            type: "p",
            text: "It depends on the size of the project and the complexity of the design. In general a small project can take 1 to 3 days, while a larger one may need a week or more. We always keep to the agreed schedule.",
          },
        ],
      },
      {
        q: "3. What materials do you use?",
        a: [
          {
            type: "p",
            text: "We use high-quality materials such as moisture-resistant gypsum board, durable aluminium strips, and marble and wood alternatives that give a luxurious look at a lower cost.",
          },
        ],
      },
      {
        q: "4. Do you also offer design services?",
        a: [{ type: "p", text: "Yes, we offer custom design to suit your taste and needs. You can discuss your ideas with our team and we will turn them into reality." }],
      },
      {
        q: "5. How much does gypsum board installation cost?",
        a: [
          {
            type: "p",
            text: "The cost depends on several factors such as the work area, the type of materials and the complexity of the design. We give competitive quotes after assessing the project.",
          },
        ],
      },
      {
        q: "6. Do you work outside Makkah?",
        a: [{ type: "p", text: "Yes, we serve Makkah and the surrounding areas. Contact us to check whether we cover your area." }],
      },
      {
        q: "7. How can I request a service or a consultation?",
        a: [{ type: "p", text: "You can reach us by phone, WhatsApp or email, or use the contact form on our website to request a service or book a free consultation." }],
      },
      {
        q: "8. Do you offer a warranty on your work?",
        a: [{ type: "p", text: "Yes, we offer a warranty on all our work so that you are completely satisfied with the results." }],
      },
    ],
    outro: "Can't find your question? Don't worry! The Gypsum Decor Makkah team is always available to answer your questions. Contact us now for help!",
  },

  contact: {
    seo: {
      title: "Contact Gypsum Board Master Makkah | Call or WhatsApp",
      description:
        "Contact our gypsum board team in Makkah for a free consultation or a quote for gypsum board, plain gypsum or cement board work. Call or WhatsApp 0595428955.",
    },
    title: "Contact us",
    intro:
      "At Gypsum Decor Makkah we are here to help you achieve your design dreams! Whether you need a consultation, a quote or have any questions, our team is ready to support you and answer all your questions.",
    cardTitle: "Contact us today!",
    cardBody:
      "Ready to upgrade your spaces with Gypsum Board Makkah? Get in touch today for a consultation or a quote. We are here to make your dream design a reality!",
    formTitle: "Send us your project details",
    mapTitle: "Service area",
    mapBody: "We serve Makkah and the surrounding areas. Tell us where your project is and we will confirm coverage.",
  },

  blog: {
    seo: {
      title: "Gypsum Board Decor Articles | Ideas & Tips from Makkah",
      description:
        "Gypsum board decor ideas for ceilings, walls and TV walls, plus tips on choosing a gypsum board contractor in Makkah and refreshing your home or office.",
    },
    title: "Creative gypsum board decor ideas: turn your spaces into works of art",
    intro:
      "Discover the latest gypsum board decor ideas and designs for every taste and space. At Gypsum Decor Makkah we share tips and inspiration to turn your home or office into a unique space that reflects your personality. Learn how to use suspended ceilings, walls and gypsum TV walls to create stunning decor.",
    postsTitle: "Latest articles",
  },

  privacy: {
    seo: {
      title: "Privacy Policy | Gypsum Decor Makkah",
      description: "How the Gypsum Decor Makkah website handles your data: what we collect, how we use and protect it, and your right to access or delete it.",
    },
    title: "Privacy policy",
    intro:
      "Welcome to the privacy policy of the Gypsum Decor Makkah website. We care about protecting your privacy and keeping your personal information safe. This policy explains how we collect, use and protect your data when you use our website or services.",
    blocks: [
      { type: "h2", text: "1. Information we collect" },
      { type: "p", text: "We may collect different kinds of information to improve your experience with us, including:" },
      {
        type: "ul",
        items: [
          { label: "Personal information", text: "such as your name, email address, phone number and address when you place a request or enquiry." },
          { label: "Browsing information", text: "such as IP address, browser type and operating system, recorded automatically in server logs for security and operation." },
          { label: "Contact data", text: "any messages or enquiries you send us by WhatsApp, phone or email." },
        ],
      },
      {
        type: "p",
        text: "When you use the contact form on this website, WhatsApp opens with a ready-made message containing what you typed. That data is not stored on the website's servers.",
      },
      { type: "h2", text: "2. How we use information" },
      { type: "p", text: "We use the information we collect to:" },
      {
        type: "ul",
        items: [
          "Provide the services you request and improve your experience with us.",
          "Contact you about your requests or enquiries.",
          "Keep the website running well and securely.",
          "Send updates or promotional offers (if you agree to this).",
        ],
      },
      { type: "h2", text: "3. Protecting information" },
      {
        type: "p",
        text: "We are committed to protecting your personal information and use advanced security techniques to prevent unauthorised access, leaks or changes. However, complete security of information sent over the internet cannot be guaranteed.",
      },
      { type: "h2", text: "4. Sharing information" },
      { type: "p", text: "We do not sell, rent or share your personal information with third parties except:" },
      { type: "ul", items: ["When needed to provide the services you requested.", "To comply with laws or regulations.", "With your explicit consent."] },
      { type: "h2", text: "5. Cookies" },
      {
        type: "p",
        text: "Our website does not use cookies for tracking, advertising or analytics. You can always manage or disable cookies in your browser settings.",
      },
      { type: "h2", text: "6. Your rights" },
      { type: "p", text: "You have the right to:" },
      {
        type: "ul",
        items: [
          "Access the personal information we hold about you.",
          "Ask us to correct or update your information.",
          "Ask us to delete your personal information (within the limits of the law).",
          "Object to the use of your information for marketing.",
        ],
      },
      { type: "h2", text: "7. Changes to this policy" },
      { type: "p", text: "We may update this privacy policy from time to time. We will let you know about any significant changes through our website or by email." },
      { type: "h2", text: "8. Contact us" },
      { type: "p", text: "If you have any questions about our privacy policy, please contact us through:" },
    ],
  },

  terms: {
    seo: {
      title: "Terms & Conditions | Gypsum Decor Makkah",
      description: "Terms and conditions for using the Gypsum Decor Makkah website and ordering gypsum board services: requests, payment, cancellation and liability.",
    },
    title: "Terms & conditions",
    intro:
      "Welcome to the terms and conditions of the Gypsum Decor Makkah website. Please read these terms carefully before using our website or services. By using the website you agree to these terms and conditions. If you do not agree with any part of them, please do not use our website.",
    blocks: [
      { type: "h2", text: "1. Use of the website" },
      {
        type: "ul",
        items: [
          "The Gypsum Decor Makkah website may be used for lawful personal or business purposes only.",
          "Using the website for any illegal or harmful purpose, or one that infringes the rights of others, is forbidden.",
          "We reserve the right to restrict or block access to the website for any user who breaks these terms.",
        ],
      },
      { type: "h2", text: "2. Intellectual property" },
      {
        type: "ul",
        items: [
          "All content on the website, including text, images, logos and designs, belongs to Gypsum Decor Makkah and is protected by intellectual property laws.",
          "Copying, modifying, distributing or using any content from the website without our written permission is forbidden.",
        ],
      },
      { type: "h2", text: "3. Service requests" },
      {
        type: "ul",
        items: [
          "When requesting a service, please make sure the information you give (such as name, address and phone number) is correct.",
          "We reserve the right to refuse any request without giving reasons.",
          "Prices shown on the website may change without prior notice.",
        ],
      },
      { type: "h2", text: "4. Payment and invoices" },
      {
        type: "ul",
        items: ["Payment is made according to the terms agreed when the request is placed.", "If payment is late, we reserve the right to suspend services or apply late fees."],
      },
      { type: "h2", text: "5. Cancelling or changing services" },
      {
        type: "ul",
        items: [
          "You may cancel or change your request before work starts, subject to any fees that may apply.",
          "If services are cancelled after work has started, cancellation fees may apply in line with our policies.",
        ],
      },
      { type: "h2", text: "6. Liability" },
      {
        type: "ul",
        items: [
          "We work hard to provide high-quality services, but we are not liable for any indirect damage arising from the use of the website or our services.",
          "We are liable only for direct damage resulting from our negligence or mistakes.",
        ],
      },
      { type: "h2", text: "7. External links" },
      { type: "ul", items: ["The website may contain links to external sites. We are not responsible for the content or privacy practices of those sites."] },
      { type: "h2", text: "8. Changes to these terms" },
      { type: "ul", items: ["We reserve the right to change these terms and conditions at any time. We will let you know about significant changes through our website."] },
      { type: "h2", text: "9. Contact us" },
      { type: "p", text: "If you have any questions about our terms and conditions, please contact us through:" },
    ],
  },

  posts: [
    {
      slug: "gypsum-board-decor-makkah",
      datePublished: "2025-02-23",
      dateModified: "2025-10-31",
      title: "Gypsum board decor in Makkah: the latest designs and high-quality services",
      seo: {
        title: "Gypsum Board Decor in Makkah | Latest Designs",
        description:
          "The latest gypsum board decor designs in Makkah: gypsum ceilings, partition walls, gypsum TV walls and 3D decor, plus how we work and why clients choose us.",
      },
      pic: { image: "gallery-tv-wall-decor", alt: "TV wall with gypsum board decor and hidden lighting" },
      excerpt:
        "Looking for elegant, high-quality gypsum board decor in Makkah? Discover the latest designs and services we offer for homes, offices and commercial spaces.",
      blocks: [
        {
          type: "p",
          text: "Looking for elegant, high-quality gypsum board decor in Makkah? At Gypsum Decor Makkah we offer the latest gypsum board designs for every taste and space. Whether you want to renovate your home, office or commercial space, our skilled team is ready to deliver your vision to the highest standards.",
        },
        { type: "h2", text: "Our gypsum board decor services" },
        { type: "p", text: "We specialise in a wide range of gypsum board decor services, including:" },
        {
          type: "ul",
          items: [
            { label: "Gypsum ceilings", text: "Armstrong ceilings, aluminium strips and custom designs." },
            { label: "Partition walls", text: "sound-insulating walls in modern designs." },
            { label: "Gypsum TV walls", text: "unique gypsum features for walls and ceilings." },
            { label: "Marble and wood alternatives", text: "creative solutions for a luxurious look at a lower cost." },
            { label: "3D decor", text: "an artistic touch for your spaces." },
          ],
        },
        { type: "img", pic: { image: "service-modern-ceilings", alt: "Modern gypsum board ceiling with built-in lighting" } },
        { type: "h2", text: "Why choose us?" },
        {
          type: "ul",
          items: [
            { label: "Creative designs", text: "we offer the latest designs for every taste." },
            { label: "High quality", text: "we use the best gypsum board materials, resistant to moisture and weather." },
            { label: "Professional team", text: "gypsum craftsmen with wide project experience." },
            { label: "Competitive prices", text: "clear quotes that suit every budget." },
            { label: "On time", text: "we hand projects over on the agreed date." },
          ],
        },
        { type: "h2", text: "Our previous work" },
        {
          type: "p",
          text: "Browse our portfolio to see some of the projects we have completed in Makkah. We are proud to deliver stunning gypsum decor that our clients love.",
        },
        { type: "h2", text: "How we work" },
        {
          type: "ol",
          items: [
            { label: "Contact us", text: "reach us by phone or WhatsApp for a free consultation." },
            { label: "Design", text: "we present initial designs that match your vision." },
            { label: "Installation", text: "our skilled team carries out the project with precision." },
            { label: "Handover", text: "we deliver on time and make sure you are fully satisfied." },
          ],
        },
        { type: "h2", text: "Contact us today!" },
        { type: "p", text: "Get in touch for the best gypsum board decor in Makkah. We are here to help you turn your spaces into works of art!" },
      ],
    },
    {
      slug: "moalim-gypsum-board-makkah",
      datePublished: "2025-02-23",
      dateModified: "2025-10-31",
      title: "Gypsum board master in Makkah",
      seo: {
        title: "Gypsum Board Master in Makkah | Services & Fair Prices",
        description:
          "Looking for an experienced gypsum board installer in Makkah? We install gypsum ceilings, partition walls and gypsum TV walls with high quality and competitive prices.",
      },
      pic: { image: "gallery-reception-hall", alt: "Reception hall with a gypsum board ceiling and linear lighting" },
      excerpt:
        "Looking for a professional, experienced gypsum board master in Makkah? We offer the best gypsum board decor services with high quality and competitive prices.",
      blocks: [
        {
          type: "p",
          text: "Looking for a professional, experienced gypsum board master in Makkah? You're in the right place! At Gypsum Decor Makkah we offer the best gypsum board decor services with high quality and competitive prices. Whether you want gypsum ceilings, partition walls or a unique gypsum TV wall, our skilled team is ready to turn your vision into reality.",
        },
        { type: "h2", text: "Our services" },
        { type: "p", text: "We specialise in all gypsum board services, including:" },
        {
          type: "ul",
          items: [
            { label: "Gypsum ceiling installation", text: "Armstrong ceilings, aluminium strips and custom designs." },
            { label: "Partition walls", text: "sound-insulating walls in modern designs." },
            { label: "Gypsum TV walls", text: "unique gypsum features for walls and ceilings." },
            { label: "Marble and wood alternatives", text: "creative solutions for a luxurious look at a lower cost." },
          ],
        },
        { type: "h2", text: "Why us?" },
        {
          type: "ul",
          items: [
            { label: "Professional team", text: "gypsum craftsmen with wide project experience." },
            { label: "High quality", text: "we use the best gypsum board materials, resistant to moisture and weather." },
            { label: "Custom designs", text: "design solutions that suit your taste and needs." },
            { label: "Fair prices", text: "competitive quotes for every budget." },
          ],
        },
        { type: "h2", text: "How we work" },
        {
          type: "ol",
          items: [
            { label: "Contact us", text: "reach us by phone or WhatsApp for a free consultation." },
            { label: "Design", text: "we present initial designs that match your vision." },
            { label: "Installation", text: "our skilled team carries out the project with precision." },
            { label: "Handover", text: "we deliver on time and make sure you are fully satisfied." },
          ],
        },
        { type: "h2", text: "Contact us today!" },
        { type: "p", text: "Get in touch with Gypsum Board Master Makkah for the best service. We are here to help you turn your spaces into works of art!" },
      ],
    },
  ],
};
