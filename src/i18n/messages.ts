import type { Locale } from "@/lib/locale";

/** How the services are grouped for the filters on the home page. */
export type ServiceGroup = "product" | "engineering" | "ai" | "growth";

/** Section labels shared by every service detail page. */
export type DetailChrome = {
  back: string;
  overview: string;
  capabilities: string;
  process: string;
  deliverables: string;
  next: string;
  cta: string;
};

export type Messages = {
  seo: {
    home: { title: string; description: string };
    service: { titleTemplate: string };
  };
  detail: DetailChrome;
  nav: {
    work: string;
    approach: string;
    services: string;
    news: string;
    about: string;
    home: string;
    join: string;
    contact: string;
    team: string;
    blog: string;
    industries: string;
    cases: string;
    ethics: string;
    education: string;
    governance: string;
    company: string;
    companyData: string;
    resources: string;
  };
  /** The header dropdowns: a line per panel and a line per entry. */
  menu: {
    viewAll: string;
    services: string;
    industries: string;
    cases: string;
    company: string;
    resources: string;
    items: Record<"team" | "governance" | "companyData" | "ethics" | "blog" | "news" | "education", string>;
  };
  pages: {
    services: { title: string; titleAccent: string; intro: string };
    projects: { title: string; titleAccent: string; intro: string };
    team: { title: string; titleAccent: string; intro: string; roles: Record<"ceo" | "coo", string> };
    blog: { title: string; titleAccent: string; intro: string; read: string; back: string; more: string; empty: string };
    contact: { title: string; titleAccent: string; intro: string };
    industries: { title: string; titleAccent: string; intro: string };
    cases: { title: string; titleAccent: string; intro: string };
    ethics: {
      title: string;
      titleAccent: string;
      intro: string;
      whatTitle: string;
      what: string[];
      howTitle: string;
      how: string[];
      cta: string;
      /** The channel is still to be confirmed by the team. */
      channel: string;
    };
    news: { title: string; titleAccent: string; intro: string; empty: string; cta: string };
    education: {
      title: string;
      titleAccent: string;
      intro: string;
      formatsTitle: string;
      formats: { title: string; desc: string }[];
      datesTitle: string;
      dates: string;
      cta: string;
    };
    governance: {
      title: string;
      titleAccent: string;
      intro: string;
      structureTitle: string;
      structure: { role: string; name: string; scope: string }[];
      principlesTitle: string;
      principles: { title: string; desc: string }[];
      policiesTitle: string;
      policies: { title: string; desc: string; link: "ethics" | "contact" }[];
      companyTitle: string;
      companyIntro: string;
      companyFields: Record<"name" | "nit" | "registry" | "domicile" | "address" | "activity", string>;
      documentsTitle: string;
      documents: Record<"rut" | "rub" | "certificate", { title: string; desc: string }>;
      download: string;
    };
  };
  hero: {
    rail: string;
    titleParts: string[];
    titleAccent: string;
    titleAccentRotations: string[];
    description: {
      lead: string;
      matters: string;
      buildingWith: string;
      and: string;
    };
    startProject: string;
    howWeWork: string;
  };
  buildingFor: {
    title: string;
    titleAccent: string;
    aria: string;
    all: string;
  };
  tape: string[];
  services: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    /** The filter buttons; keyed by the group in `src/data/services.ts`, plus "all". */
    filters: Record<"all" | ServiceGroup, string>;
    open: string;
    items: {
      productDevelopment: { title: string; desc: string };
      uxui: { title: string; desc: string };
      webEngineering: { title: string; desc: string };
      appliedAI: { title: string; desc: string };
      performanceSEO: { title: string; desc: string };
      brandMotion: { title: string; desc: string };
      platformInfra: { title: string; desc: string };
    };
  };
  projects: {
    marquee: string[];
    badge: { live: string };
  };
  industries: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    intro: string;
    previous: string;
    next: string;
    close: string;
    seeCase: string;
    /** Section headings shared by every industry page. */
    page: { eyebrow: string; demands: string; whatWeBuilt: string; stack: string; gallery: string; caseTitle: string; others: string; back: string; ctaTitle: string; ctaBody: string; ctaButton: string };
    /** Keyed by the industry id in `src/data/industries.ts`. */
    items: Record<
      string,
      {
        category: string;
        title: string;
        body: string[];
        /** What this sector demands of the software; three per industry. */
        demands: { title: string; desc: string }[];
      }
    >;
  };
  cases: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    intro: string;
    caseTitle: string;
    problem: string;
    solution: string;
    why: string;
    tools: string;
    tour: string;
    tourIntro: string;
    open: string;
    visit: string;
    back: string;
    client: string;
    country: string;
    sector: string;
    gallery: string;
    next: string;
    ctaTitle: string;
    ctaBody: string;
    pendingImages: string;
    countries: Record<"CO" | "US" | "MX", string>;
  };
  moreProjects: {
    title: string;
    titleAccent: string;
    visit: string;
    eyebrow: string;
    back: string;
    open: string;
    gallery: string;
    next: string;
  };
  whyWork: {
    eyebrow: string;
    headline: { lead: string; muted: string; tail: string };
    stats: { value: number; suffix: string; label: string }[];
  };
  footer: {
    cta: { lead: string; accent: string };
    tagline: string;
    sitemap: string;
    elsewhere: string;
    line: string;
    rights: string;
  };
  mobileMenu: {
    startProject: string;
    joinUs: string;
    open: string;
    close: string;
  };
  contactForm: {
    title: string;
    subtitle: string;
    name: string;
    service: string;
    serviceSelect: string;
    email: string;
    phone: string;
    company: string;
    role: string;
    message: string;
    attachment: string;
    terms: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    errorRequired: string;
    errorEmail: string;
    errorFile: string;
  };
};

const en: Messages = {
  seo: {
    home: {
      title: "Lumintik SAS, software studio that builds inevitable products",
      description:
        "Lumintik SAS is a software engineering studio for companies that care about craft. Headless commerce, applied AI, web engineering and design systems for Samsung, Claro, Coca-Cola, EZDocuAI and more.",
    },
    service: { titleTemplate: "%s, Services" },
  },
  detail: {
    back: "All services",
    overview: "Overview",
    capabilities: "What it covers",
    process: "How we work",
    deliverables: "What you get",
    next: "Next service",
    cta: "Start a project",
  },
  nav: {
    work: "Work",
    approach: "Approach",
    services: "Services",
    news: "News",
    about: "About",
    home: "Home",
    join: "Join",
    contact: "Contact",
    team: "Our team",
    blog: "Blog",
    industries: "Industries",
    cases: "Success stories",
    ethics: "Ethics line",
    governance: "Corporate governance",
    company: "Company",
    companyData: "Company details",
    resources: "Resources",
    education: "Education",
  },
  menu: {
    viewAll: "See all",
    services: "Everything we build, from the idea to the platform it runs on.",
    industries: "The sectors we have already shipped for.",
    cases: "Real projects with the result each one produced.",
    company: "Who we are and how we govern ourselves.",
    resources: "What we write, announce and teach.",
    items: {
      team: "The people who design and build.",
      governance: "Structure, principles and policies.",
      companyData: "Tax ID, registry and documents to download.",
      ethics: "A confidential channel to report concerns.",
      blog: "Notes from the projects.",
      news: "Announcements from the studio.",
      education: "Workshops and talks for teams.",
    },
  },
  pages: {
    services: {
      title: "What we",
      titleAccent: "do.",
      intro: "Seven services, each one described by how we work, not by promises.",
    },
    projects: {
      title: "What we have",
      titleAccent: "built.",
      intro: "Every project, case studies first. Each one opens its own page.",
    },
    team: {
      title: "The people",
      titleAccent: "behind it.",
      intro: "A small team that designs and builds in the same room.",
      roles: { ceo: "Chief Executive Officer", coo: "Chief Operating Officer" },
    },
    blog: {
      title: "What we learn",
      titleAccent: "while building.",
      intro: "Notes from the projects: what the problem was, what we built and what it changed.",
      read: "Read the post",
      back: "Back to the blog",
      more: "More posts",
      empty: "No posts yet.",
    },
    contact: {
      title: "Let's talk about",
      titleAccent: "your project.",
      intro: "Tell us what you need. We reply by email.",
    },
    industries: {
      title: "Where we have",
      titleAccent: "shipped.",
      intro: "Every industry has its own rules, data and pace. These are the ones we have already built for, with the project behind each one.",
    },
    cases: {
      title: "Results with",
      titleAccent: "a name on them.",
      intro: "The problem, what we built and what it changed, for each client that let us tell it.",
    },
    ethics: {
      title: "A channel to",
      titleAccent: "speak up.",
      intro: "If something in how we work does not sit right with you, this is the place to say it. Reports are received confidentially and every one gets an answer.",
      whatTitle: "What you can report",
      what: [
        "Conduct that goes against the law or against what we agreed with a client.",
        "Misuse of data, credentials or infrastructure entrusted to us.",
        "Conflicts of interest, discrimination or harassment involving our team.",
        "Any situation you would rather raise outside the regular channels.",
      ],
      howTitle: "How it works",
      how: [
        "Write to us with as much detail as you can. You may do it anonymously.",
        "Reports are read only by the leadership team and handled in confidence.",
        "We confirm receipt, look into it and reply with what was done.",
      ],
      cta: "Send a report",
      channel: "[pending: dedicated ethics line email]",
    },
    news: {
      title: "What is",
      titleAccent: "new.",
      intro: "Announcements from the studio: launches, partnerships and where we will be.",
      empty: "No news published yet. The first announcements will appear here.",
      cta: "Write to us to hear first",
    },
    education: {
      title: "Learning to",
      titleAccent: "build better.",
      intro: "Workshops, talks and material for teams that want to understand the software they depend on.",
      formatsTitle: "Formats",
      formats: [
        { title: "Team workshops", desc: "Half a day or a full day with your team on one topic: applied AI, observability, product delivery. Hands on, with your own product as the material." },
        { title: "Talks", desc: "Forty minutes on what we have learned building for real operations, for events, universities and internal sessions." },
        { title: "Technical mentoring", desc: "Recurring sessions with a tech lead or founding team: architecture reviews, roadmap and hiring decisions." },
      ],
      datesTitle: "Upcoming dates",
      dates: "[pending: first published dates]",
      cta: "Request a session",
    },
    governance: {
      title: "How we",
      titleAccent: "govern ourselves.",
      intro: "A small studio still needs clear rules: who decides what, what we promise every client, and where to go when something is not right.",
      structureTitle: "Structure",
      structure: [
        { role: "Chief Executive Officer", name: "David Espejo", scope: "Strategy, clients and the technical direction of every project." },
        { role: "Chief Operating Officer", name: "Andrey Plazas", scope: "Operations, delivery, finance and the team." },
      ],
      principlesTitle: "Principles",
      principles: [
        { title: "The client owns what we build", desc: "Code, infrastructure and accounts are set up in the client's name from the first day. Leaving us never means losing the product." },
        { title: "Their cloud, their constraints", desc: "We work on top of the client's cloud, data residency and compliance rules instead of imposing a stack of our own." },
        { title: "Data stays where it belongs", desc: "We process the minimum data needed, in the client's infrastructure whenever it is sensitive, and we never use it to train models." },
        { title: "One truth about the state of a project", desc: "Scope, budget and risks are written down and visible to the client at all times; there is no version of the project only we know." },
        { title: "No conflicts of interest", desc: "We do not take engagements that compete with an active client's core business without telling both sides." },
      ],
      policiesTitle: "Policies and channels",
      policies: [
        { title: "Ethics line", desc: "A confidential channel for anyone, inside or outside the studio, to report conduct that goes against these principles.", link: "ethics" },
        { title: "Data protection", desc: "Requests about personal data we hold, from a client, a candidate or a visitor, are answered through the contact channel.", link: "contact" },
        { title: "Security incidents", desc: "If you believe you found a vulnerability in something we built or run, write to us; we acknowledge every report.", link: "contact" },
      ],
      companyTitle: "Company details",
      companyIntro: "As registered with the Colombian tax authority (DIAN) and the Bogotá Chamber of Commerce.",
      companyFields: { name: "Legal name", nit: "Tax ID (NIT)", registry: "Commercial registration", domicile: "Domicile", address: "Registered address", activity: "Main activity" },
      documentsTitle: "Documents",
      documents: {
        rut: { title: "Tax registry (RUT)", desc: "DIAN single tax registry form, updated September 3, 2026." },
        rub: { title: "Beneficial owners report", desc: "Report of beneficial owners filed with DIAN on June 2, 2026." },
        certificate: { title: "Certificate of existence and legal representation", desc: "Issued by the Bogotá Chamber of Commerce on September 7, 2026. Verification code B26583477B5F84." },
      },
      download: "Download PDF",
    },
  },
  hero: {
    rail: "What we do",
    titleParts: ["We", "build", "software", "that", "feels"],
    titleAccent: "intuitive.",
    titleAccentRotations: ["intuitive.", "scalable.", "indispensable."],
    description: {
      lead: "Software engineering studio for companies that understand the difference between a product that works and one that",
      matters: "matters",
      buildingWith: "Currently building with",
      and: "and",
    },
    startProject: "Start a project",
    howWeWork: "How we work",
  },
  buildingFor: {
    title: "Who we",
    titleAccent: "build for.",
    aria: "Companies we build for",
    all: "See every client",
  },
  tape: [
    "Software that feels inevitable",
    "Headless commerce at the edge",
    "Applied AI, shipped to production",
    "Design and engineering, in the same room",
    "Built by engineers, not by templates",
  ],
  services: {
    eyebrow: "Our services",
    title: "Our",
    titleAccent: "services.",
    filters: { all: "All", product: "Product and design", engineering: "Engineering", ai: "AI and data", growth: "Growth" },
    open: "See the service",
    items: {
      productDevelopment: {
        title: "Product Development",
        desc: "From discovery to ship: software products that earn trust.",
      },
      uxui: {
        title: "UX / UI",
        desc: "Interfaces designed for clarity, scale and conversion.",
      },
      webEngineering: {
        title: "Web Engineering",
        desc: "Performant, accessible web at the edge, with sub-second LCP by default.",
      },
      appliedAI: {
        title: "Applied AI",
        desc: "Practical AI pipelines: RAG, agents, streaming LLM workflows.",
      },
      performanceSEO: {
        title: "Performance & SEO",
        desc: "Core Web Vitals, technical SEO, and infra-level wins.",
      },
      brandMotion: {
        title: "Brand & Motion",
        desc: "Identity systems, motion design and storytelling that scales.",
      },
      platformInfra: {
        title: "Platform & Infra",
        desc: "Multi-region, observability-first platforms ready for prime time.",
      },
    },
  },
  industries: {
    eyebrow: "Industries",
    title: "Where we have",
    titleAccent: "shipped.",
    intro: "Every industry has its own rules, data and pace. These are the ones we have already built for, with the project behind each one.",
    previous: "Previous",
    next: "Next",
    close: "Close",
    seeCase: "See the project",
    page: {
      eyebrow: "Industry",
      demands: "What this sector demands",
      whatWeBuilt: "What we built",
      stack: "What we work with",
      gallery: "From the project",
      caseTitle: "The case behind it",
      others: "Other industries",
      back: "All industries",
      ctaTitle: "Do you work in this sector?",
      ctaBody: "Tell us what you are trying to solve. We reply by email with what we would do and what it would take.",
      ctaButton: "Start a project",
    },
    items: {
      aerospace: {
        category: "Aerospace",
        title: "From the Orion camp to Cape Canaveral.",
        body: [
          "In 2024 we won Orion, a robotics and space exploration camp, with a rover we built and programmed ourselves.",
          "The prize was a trip to Cape Canaveral, at the Kennedy Space Center, where we programmed one of the modules of a part of the Space Station.",
        ],
        demands: [
          { title: "There is no second attempt", desc: "A module already in space cannot be patched. The code is reviewed, simulated and tested before, not after." },
          { title: "Hardware and software at once", desc: "Motors, sensors and control are programmed against the real part, not against a comfortable abstraction." },
          { title: "Documentation as part of the deliverable", desc: "Every decision is written down so another team can pick it up years later." },
        ],
      },
      retail: {
        category: "Retail and e-commerce",
        title: "The whole network working as one inventory.",
        body: [
          "For Samsung's official distributor in Colombia, more than 30 points of sale had scattered stock: what ran out in one city was left over in another.",
          "We built an algorithm that matches each store's stock against the real distance to the customer, picks the best store and generates the shipping label. Deliveries now take 24 hours at most.",
        ],
        demands: [
          { title: "Inventory lies if it is not real time", desc: "Selling what no longer exists costs more than not selling it. Stock is queried, not assumed." },
          { title: "Delivery is part of the product", desc: "Picking the wrong source store adds days. The real distance to the customer goes into the decision." },
          { title: "Peaks give no warning", desc: "A launch or a Black Friday multiplies traffic. The platform is sized for that from day one." },
        ],
      },
      telecom: {
        category: "Telecommunications",
        title: "Deciding with data in the Mi Claro super app.",
        body: [
          "Claro needed to understand how customers use the Mi Claro app to decide what to improve.",
          "We did the consulting and the telemetry: an event plan, funnels and dashboards for data analysis.",
        ],
        demands: [
          { title: "Scale changes the rules", desc: "Millions of lines turn any detail into an incident. You measure before you decide." },
          { title: "Nobody improves what they cannot see", desc: "Without an event plan, each team argues with its own version of the data." },
          { title: "Systems from several eras coexist", desc: "The new has to talk to what has been running for years, without breaking it." },
        ],
      },
      trade: {
        category: "Foreign trade and logistics",
        title: "Customs documents reviewed by AI.",
        body: [
          "For Griver we built an AI OCR pipeline that reads customs entries and invoices, cross-checks them and flags the differences, with a self hosted model so the data never leaves their infrastructure.",
          "A review that took a full day now takes about ten minutes.",
        ],
        demands: [
          { title: "The data cannot leave", desc: "Customs entries and invoices carry client and cargo information. The model runs inside the client's infrastructure." },
          { title: "An error costs fines", desc: "A misread figure reaches customs. The system flags differences instead of approving them silently." },
          { title: "The volume is daily", desc: "It is not ten documents a month; it is hundreds a day, and the process has to hold that pace." },
        ],
      },
      legal: {
        category: "Legal and immigration",
        title: "USCIS forms completed in minutes.",
        body: [
          "Immigration attorneys in the United States were filling in long USCIS forms by hand.",
          "EZMig is a guided flow with AI that completes and validates the forms in minutes, with output certified by USCIS.",
        ],
        demands: [
          { title: "The format is the law", desc: "An agency rejects a form over one misplaced field. Validation happens per field, not at the end." },
          { title: "Sensitive data about real people", desc: "Passports, addresses and histories. We process the minimum needed and keep a record of every change." },
          { title: "The filing has stages", desc: "A case lives for months and passes through several hands. The state of every document has to be obvious." },
        ],
      },
      translation: {
        category: "Translation and documents",
        title: "Translators editing instead of retyping.",
        body: [
          "EZDocuAI translates documents keeping the original layout, so a translator's time per page went from about twenty minutes to three.",
          "Document parsing, layout reconstruction and a review editor built for professionals.",
        ],
        demands: [
          { title: "Layout is content", desc: "Stamps, tables and columns mean something. Rebuilding them by hand takes most of the time." },
          { title: "The document is private", desc: "Personal certificates, diplomas and contracts. Encrypted in transit and at rest, and deleted with proof." },
          { title: "The professional reviews, does not retype", desc: "The tool hands over an editable draft so the certified translator can apply their judgement." },
        ],
      },
      sports: {
        category: "Sports and communities",
        title: "A live app that could not stop for each change.",
        body: [
          "FUTTEM is a mobile app in production in Colombia, on the App Store and Google Play, with real users who could not be interrupted by every release.",
          "We set up three separate environments, controlled deployments and end to end tracing.",
        ],
        demands: [
          { title: "The app is used at seven in the evening", desc: "When everyone comes in at once is not the moment for something to fail." },
          { title: "Availability changes by the minute", desc: "Slots, fields and line ups move in real time or the booking is useless." },
          { title: "Publishing to stores is a process", desc: "The App Store and Google Play impose their timing and reviews; releases are planned around that." },
        ],
      },
      support: {
        category: "Customer support",
        title: "One AI agent on every channel.",
        body: [
          "Customers in commerce and personal finance writing on WhatsApp, Instagram and the web at all hours, with the same questions.",
          "An AI agent connected to the catalog, the stock and the stores answers on every channel: one intelligence, instant answers and the team free to sell.",
        ],
        demands: [
          { title: "Customers write wherever they want", desc: "WhatsApp, Instagram or the web: the answer has to be the same on all three." },
          { title: "Answering without knowing is useless", desc: "The agent connects to the catalog, the stock and the stores before it speaks." },
          { title: "Knowing when to hand over to a person", desc: "A hard conversation goes to the team with all the context, it is not abandoned." },
        ],
      },
      fintech: {
        category: "Fintech",
        title: "Financial education at the scale of a community.",
        body: [
          "Fridoom is a financial education brand with more than 200,000 followers.",
          "It is one of the clients of the multichannel AI agent, which answers its users inside the app.",
        ],
        demands: [
          { title: "Trust is lost only once", desc: "A mistake with someone's money is not made up for with an apology." },
          { title: "Clarity is the feature", desc: "If the person does not understand their own balance, the product is not finished." },
          { title: "The audience arrives in waves", desc: "One post can bring thousands of users in an hour; the platform holds or it fails in public." },
        ],
      },
    },
  },
  projects: {
    marquee: ["SHOW CASE", "PROJECTS", "CASE STUDIES", "WORKS"],
    badge: { live: "Live" },
  },
  cases: {
    eyebrow: "Case studies",
    title: "Real problems,",
    titleAccent: "solved with data.",
    intro:
      "Seven projects in production. For each one, the problem, how we solved it and why it worked.",
    caseTitle: "How we solved it with {client}",
    problem: "The problem",
    solution: "The solution",
    why: "Why it worked",
    tools: "Tools",
    tour: "A tour of the product",
    tourIntro: "Real screens from the platform in production. Hover to pause, or pick a stop on the rail.",
    open: "Read the full case study",
    visit: "Visit the site",
    back: "All case studies",
    client: "Client",
    country: "Country",
    sector: "Sector",
    gallery: "Project images",
    next: "Next case study",
    ctaTitle: "Facing a similar problem?",
    ctaBody: "Tell us what you need. We review your case and reply by email.",
    pendingImages: "Images pending",
    countries: { CO: "Colombia", US: "United States", MX: "Mexico" },
  },
  moreProjects: {
    title: "More",
    titleAccent: "projects.",
    visit: "opens their site in a new tab",
    eyebrow: "Project",
    back: "All projects",
    open: "See the project",
    gallery: "Screens",
    next: "Next project",
  },
  whyWork: {
    eyebrow: "Why work with us?",
    headline: {
      lead: "It's not just about shipping software. It's about ",
      muted: "engineering products that earn trust",
      tail: " and outlast trends.",
    },
    stats: [
      { value: 100, suffix: "%", label: "Work completed in house" },
      { value: 2, suffix: "+", label: "Years crafting digital products" },
      { value: 15, suffix: "+", label: "Happy clients across 3 continents" },
      { value: 12, suffix: "+", label: "Industries shipped: fintech, AI, telecom, e-commerce" },
    ],
  },
  footer: {
    cta: { lead: "Let's build something", accent: "inevitable." },
    tagline: "Software engineering studio for companies that care about craft.",
    sitemap: "Sitemap",
    elsewhere: "Elsewhere",
    line: "Lumintik Developers SAS, NIT 902069502-5, Bogotá, 2026",
    rights: "",
  },
  mobileMenu: {
    startProject: "Start a project",
    joinUs: "Join us",
    open: "Open menu",
    close: "Close menu",
  },
  contactForm: {
    title: "Get a Quote",
    subtitle: "Complete the form and discover how we can help you achieve your growth goals with custom solutions.",
    name: "Name *",
    service: "Service/Solution of interest",
    serviceSelect: "Select a product",
    email: "Email address *",
    phone: "Phone",
    company: "Company name",
    role: "Your role",
    message: "Tell us a bit about your company",
    attachment: "Attach file (PDF, Image, etc.)",
    terms: "By submitting you agree to our privacy policy and terms and conditions",
    submit: "Send",
    sending: "Sending…",
    success: "Thanks! Your message is on its way. We'll be in touch shortly.",
    error: "Something went wrong sending your message. Please try again or email us directly.",
    errorRequired: "Please complete the required fields.",
    errorEmail: "Please enter a valid email address.",
    errorFile: "The attachment is too large (max 8 MB).",
  },
};

const es: Messages = {
  seo: {
    home: {
      title: "Lumintik SAS, estudio de software que construye productos inevitables",
      description:
        "Lumintik SAS es un estudio de ingeniería de software para empresas que cuidan el detalle. Headless commerce, IA aplicada, ingeniería web y design systems para Samsung, Claro, Coca-Cola, EZDocuAI y más.",
    },
    service: { titleTemplate: "%s, Servicios" },
  },
  detail: {
    back: "Todos los servicios",
    overview: "Resumen",
    capabilities: "Qué incluye",
    process: "Cómo trabajamos",
    deliverables: "Qué recibes",
    next: "Siguiente servicio",
    cta: "Empezar un proyecto",
  },
  nav: {
    work: "Proyectos",
    approach: "Enfoque",
    services: "Servicios",
    news: "Noticias",
    about: "Nosotros",
    home: "Inicio",
    join: "Únete",
    contact: "Contacto",
    team: "Nuestro equipo",
    blog: "Blog",
    industries: "Industrias",
    cases: "Casos de éxito",
    ethics: "Línea ética",
    governance: "Gobierno corporativo",
    company: "Empresa",
    companyData: "Datos de la empresa",
    resources: "Recursos",
    education: "Educación",
  },
  menu: {
    viewAll: "Ver todo",
    services: "Todo lo que construimos, de la idea a la plataforma donde corre.",
    industries: "Los sectores en los que ya hemos entregado.",
    cases: "Proyectos reales con el resultado que produjo cada uno.",
    company: "Quiénes somos y cómo nos gobernamos.",
    resources: "Lo que escribimos, anunciamos y enseñamos.",
    items: {
      team: "Las personas que diseñan y construyen.",
      governance: "Estructura, principios y políticas.",
      companyData: "NIT, matrícula y documentos para descargar.",
      ethics: "Un canal confidencial para reportar inquietudes.",
      blog: "Notas desde los proyectos.",
      news: "Anuncios del estudio.",
      education: "Talleres y charlas para equipos.",
    },
  },
  pages: {
    services: {
      title: "Qué",
      titleAccent: "hacemos.",
      intro: "Siete servicios, cada uno descrito por cómo trabajamos, no por promesas.",
    },
    projects: {
      title: "Lo que hemos",
      titleAccent: "construido.",
      intro: "Todos los proyectos, primero los casos. Cada uno abre su propia página.",
    },
    team: {
      title: "Las personas",
      titleAccent: "detrás.",
      intro: "Un equipo pequeño que diseña y construye en la misma sala.",
      roles: { ceo: "Director ejecutivo", coo: "Director de operaciones" },
    },
    blog: {
      title: "Lo que aprendemos",
      titleAccent: "construyendo.",
      intro: "Notas desde los proyectos: cuál era el problema, qué construimos y qué cambió.",
      read: "Leer la entrada",
      back: "Volver al blog",
      more: "Más entradas",
      empty: "Aún no hay entradas.",
    },
    contact: {
      title: "Hablemos de",
      titleAccent: "tu proyecto.",
      intro: "Cuéntanos qué necesitas. Te respondemos por correo.",
    },
    industries: {
      title: "Donde ya hemos",
      titleAccent: "construido.",
      intro: "Cada industria tiene sus reglas, sus datos y su ritmo. Estas son en las que ya hemos trabajado, con el proyecto detrás de cada una.",
    },
    cases: {
      title: "Resultados con",
      titleAccent: "nombre propio.",
      intro: "El problema, lo que construimos y lo que cambió, por cada cliente que nos dejó contarlo.",
    },
    ethics: {
      title: "Un canal para",
      titleAccent: "hablar.",
      intro: "Si algo en nuestra forma de trabajar no te parece correcto, este es el lugar para decirlo. Los reportes se reciben de forma confidencial y todos tienen respuesta.",
      whatTitle: "Qué puedes reportar",
      what: [
        "Conductas contrarias a la ley o a lo acordado con un cliente.",
        "Uso indebido de datos, credenciales o infraestructura que se nos confió.",
        "Conflictos de interés, discriminación o acoso que involucren a nuestro equipo.",
        "Cualquier situación que prefieras plantear fuera de los canales habituales.",
      ],
      howTitle: "Cómo funciona",
      how: [
        "Escríbenos con todo el detalle que puedas. Puedes hacerlo de forma anónima.",
        "Los reportes los lee únicamente el equipo directivo y se manejan con confidencialidad.",
        "Confirmamos el recibo, investigamos y te respondemos con lo que se hizo.",
      ],
      cta: "Enviar un reporte",
      channel: "[dato pendiente: correo de la línea ética]",
    },
    news: {
      title: "Lo que hay",
      titleAccent: "de nuevo.",
      intro: "Anuncios del estudio: lanzamientos, alianzas y dónde vamos a estar.",
      empty: "Aún no hay noticias publicadas. Los primeros anuncios aparecerán aquí.",
      cta: "Escríbenos para enterarte primero",
    },
    education: {
      title: "Aprender a",
      titleAccent: "construir mejor.",
      intro: "Talleres, charlas y material para equipos que quieren entender el software del que dependen.",
      formatsTitle: "Formatos",
      formats: [
        { title: "Talleres para equipos", desc: "Media jornada o un día completo con tu equipo sobre un tema: IA aplicada, observabilidad, entrega de producto. Prácticos, con tu propio producto como material." },
        { title: "Charlas", desc: "Cuarenta minutos sobre lo que hemos aprendido construyendo para operaciones reales, en eventos, universidades y sesiones internas." },
        { title: "Mentoría técnica", desc: "Sesiones recurrentes con un líder técnico o un equipo fundador: revisiones de arquitectura, hoja de ruta y decisiones de contratación." },
      ],
      datesTitle: "Próximas fechas",
      dates: "[dato pendiente: primeras fechas publicadas]",
      cta: "Solicitar una sesión",
    },
    governance: {
      title: "Cómo nos",
      titleAccent: "gobernamos.",
      intro: "Un estudio pequeño también necesita reglas claras: quién decide qué, qué le prometemos a cada cliente y a dónde acudir cuando algo no está bien.",
      structureTitle: "Estructura",
      structure: [
        { role: "Director ejecutivo", name: "David Espejo", scope: "Estrategia, clientes y la dirección técnica de cada proyecto." },
        { role: "Director de operaciones", name: "Andrey Plazas", scope: "Operación, entrega, finanzas y el equipo." },
      ],
      principlesTitle: "Principios",
      principles: [
        { title: "El cliente es dueño de lo que construimos", desc: "Código, infraestructura y cuentas quedan a nombre del cliente desde el primer día. Dejar de trabajar con nosotros nunca significa perder el producto." },
        { title: "Su nube, sus restricciones", desc: "Trabajamos sobre la nube del cliente, su residencia de datos y sus reglas de cumplimiento, en lugar de imponer un stack propio." },
        { title: "Los datos se quedan donde deben", desc: "Procesamos el mínimo de datos necesario, dentro de la infraestructura del cliente cuando son sensibles, y nunca los usamos para entrenar modelos." },
        { title: "Una sola verdad sobre el estado del proyecto", desc: "Alcance, presupuesto y riesgos quedan por escrito y visibles para el cliente en todo momento; no existe una versión del proyecto que solo nosotros conocemos." },
        { title: "Sin conflictos de interés", desc: "No tomamos trabajos que compitan con el negocio principal de un cliente activo sin decírselo a ambas partes." },
      ],
      policiesTitle: "Políticas y canales",
      policies: [
        { title: "Línea ética", desc: "Un canal confidencial para que cualquier persona, dentro o fuera del estudio, reporte conductas contrarias a estos principios.", link: "ethics" },
        { title: "Protección de datos", desc: "Las solicitudes sobre datos personales que tengamos, de un cliente, un candidato o un visitante, se atienden por el canal de contacto.", link: "contact" },
        { title: "Incidentes de seguridad", desc: "Si crees haber encontrado una vulnerabilidad en algo que construimos u operamos, escríbenos; confirmamos todos los reportes.", link: "contact" },
      ],
      companyTitle: "Datos de la empresa",
      companyIntro: "Tal como constan en la DIAN y en la Cámara de Comercio de Bogotá.",
      companyFields: { name: "Razón social", nit: "NIT", registry: "Matrícula mercantil", domicile: "Domicilio", address: "Dirección registrada", activity: "Actividad principal" },
      documentsTitle: "Documentos",
      documents: {
        rut: { title: "Registro Único Tributario (RUT)", desc: "Formulario del RUT de la DIAN, actualizado el 3 de septiembre de 2026." },
        rub: { title: "Reporte de beneficiarios finales", desc: "Reporte presentado ante la DIAN el 2 de junio de 2026." },
        certificate: { title: "Certificado de existencia y representación legal", desc: "Expedido por la Cámara de Comercio de Bogotá el 7 de septiembre de 2026. Código de verificación B26583477B5F84." },
      },
      download: "Descargar PDF",
    },
  },
  hero: {
    rail: "Lo que hacemos",
    titleParts: ["Creamos", "software", "que", "se", "siente"],
    titleAccent: "intuitivo.",
    titleAccentRotations: ["intuitivo.", "escalable.", "indispensable."],
    description: {
      lead: "Estudio de ingeniería de software para empresas que entienden la diferencia entre un producto que funciona y uno que",
      matters: "importa",
      buildingWith: "Actualmente construyendo con",
      and: "y",
    },
    startProject: "Iniciar un proyecto",
    howWeWork: "Cómo trabajamos",
  },
  buildingFor: {
    title: "Para quién",
    titleAccent: "construimos.",
    aria: "Empresas para las que construimos",
    all: "Ver todos los clientes",
  },
  tape: [
    "Software que se siente inevitable",
    "Commerce headless en el edge",
    "IA aplicada, lista para producción",
    "Diseño e ingeniería, en la misma sala",
    "Hecho por ingenieros, no por plantillas",
  ],
  services: {
    eyebrow: "Nuestros servicios",
    title: "Nuestros",
    titleAccent: "servicios.",
    filters: { all: "Todos", product: "Producto y diseño", engineering: "Ingeniería", ai: "IA y datos", growth: "Crecimiento" },
    open: "Ver el servicio",
    items: {
      productDevelopment: {
        title: "Desarrollo de Producto",
        desc: "De la idea al lanzamiento: productos de software que se ganan la confianza.",
      },
      uxui: {
        title: "UX / UI",
        desc: "Interfaces diseñadas para claridad, escala y conversión.",
      },
      webEngineering: {
        title: "Ingeniería Web",
        desc: "Web rápida y accesible en el edge, con LCP por debajo de un segundo por defecto.",
      },
      appliedAI: {
        title: "IA Aplicada",
        desc: "Pipelines de IA prácticos: RAG, agentes y flujos LLM en streaming.",
      },
      performanceSEO: {
        title: "Performance y SEO",
        desc: "Core Web Vitals, SEO técnico y mejoras a nivel de infraestructura.",
      },
      brandMotion: {
        title: "Marca y Motion",
        desc: "Sistemas de identidad, motion design y narrativa que escala.",
      },
      platformInfra: {
        title: "Plataforma e Infraestructura",
        desc: "Plataformas multi-región con observabilidad lista para producción.",
      },
    },
  },
  industries: {
    eyebrow: "Industrias",
    title: "Donde ya hemos",
    titleAccent: "construido.",
    intro: "Cada industria tiene sus reglas, sus datos y su ritmo. Estas son en las que ya hemos trabajado, con el proyecto detrás de cada una.",
    previous: "Anterior",
    next: "Siguiente",
    close: "Cerrar",
    seeCase: "Ver el proyecto",
    page: {
      eyebrow: "Industria",
      demands: "Lo que exige este sector",
      whatWeBuilt: "Lo que construimos",
      stack: "Con qué trabajamos",
      gallery: "Del proyecto",
      caseTitle: "El caso detrás",
      others: "Otras industrias",
      back: "Todas las industrias",
      ctaTitle: "¿Trabajas en este sector?",
      ctaBody: "Cuéntanos qué necesitas resolver. Te respondemos por correo con qué haríamos y qué tomaría.",
      ctaButton: "Iniciar un proyecto",
    },
    items: {
      aerospace: {
        category: "Aeroespacial",
        title: "Del campamento Orion a Cabo Cañaveral.",
        body: [
          "En 2024 ganamos Orion, un campamento de robótica y exploración espacial, con un róver que construimos y programamos nosotros mismos.",
          "El premio fue viajar a Cabo Cañaveral, en el Centro Espacial Kennedy, y programar allí uno de los módulos de una pieza de la Estación Espacial.",
        ],
        demands: [
          { title: "No hay segundo intento", desc: "Un módulo que ya salió al espacio no se parchea. El código se revisa, se simula y se prueba antes, no después." },
          { title: "Hardware y software a la vez", desc: "Motores, sensores y control se programan contra la pieza real, no contra una abstracción cómoda." },
          { title: "Documentación como parte del entregable", desc: "Cada decisión queda escrita para que otro equipo pueda retomarla años después." },
        ],
      },
      retail: {
        category: "Retail y e-commerce",
        title: "Toda la red trabajando como un solo inventario.",
        body: [
          "Para el distribuidor oficial de Samsung en Colombia, más de 30 puntos de venta tenían el inventario disperso: lo que se agotaba en una ciudad sobraba en otra.",
          "Construimos un algoritmo que cruza el stock de cada tienda con la distancia real al cliente, elige la tienda óptima y genera la guía de envío. Las entregas ahora toman máximo 24 horas.",
        ],
        demands: [
          { title: "El inventario miente si no es en tiempo real", desc: "Vender lo que ya no existe cuesta más que no venderlo. El stock se consulta, no se supone." },
          { title: "La entrega es parte del producto", desc: "Elegir mal la tienda de origen agrega días. La distancia real al cliente entra en la decisión." },
          { title: "Los picos no avisan", desc: "Un lanzamiento o un Black Friday multiplican el tráfico. La plataforma se dimensiona para eso desde el día uno." },
        ],
      },
      telecom: {
        category: "Telecomunicaciones",
        title: "Decidir con datos en la super app Mi Claro.",
        body: [
          "Claro necesitaba entender cómo usan la app sus clientes para decidir qué mejorar.",
          "Hicimos la consultoría y la telemetría: plan de eventos, embudos y tableros para análisis de datos.",
        ],
        demands: [
          { title: "La escala cambia las reglas", desc: "Millones de líneas convierten cualquier detalle en un incidente. Se mide antes de decidir." },
          { title: "Nadie mejora lo que no ve", desc: "Sin plan de eventos, cada equipo discute con su propia versión de los datos." },
          { title: "Conviven sistemas de varias épocas", desc: "Lo nuevo tiene que hablar con lo que lleva años funcionando, sin romperlo." },
        ],
      },
      trade: {
        category: "Comercio exterior y logística",
        title: "Documentos aduaneros revisados con IA.",
        body: [
          "Para Griver construimos un pipeline de OCR con IA que lee pedimentos y facturas, los cruza y marca las diferencias, con un modelo auto hospedado para que los datos no salgan de su infraestructura.",
          "Una revisión que tomaba un día completo ahora toma unos diez minutos.",
        ],
        demands: [
          { title: "Los datos no pueden salir", desc: "Pedimentos y facturas llevan información de clientes y mercancía. El modelo corre dentro de la infraestructura del cliente." },
          { title: "Un error cuesta multas", desc: "Una cifra mal leída llega a la aduana. El sistema marca diferencias en vez de aprobarlas en silencio." },
          { title: "El volumen es diario", desc: "No son diez documentos al mes; son cientos al día, y el proceso tiene que sostener ese ritmo." },
        ],
      },
      legal: {
        category: "Legal y migración",
        title: "Formularios de USCIS completos en minutos.",
        body: [
          "Abogados de inmigración en Estados Unidos llenaban a mano formularios largos de USCIS.",
          "EZMig es un flujo guiado con IA que completa y valida los formularios en minutos, con salida certificada por USCIS.",
        ],
        demands: [
          { title: "El formato es la ley", desc: "Una entidad rechaza un formulario por un campo mal puesto. La validación es por campo, no al final." },
          { title: "Datos sensibles de personas reales", desc: "Pasaportes, direcciones e historiales. Se procesa el mínimo necesario y queda registro de cada cambio." },
          { title: "El trámite tiene etapas", desc: "Un caso vive meses y pasa por varias manos. El estado de cada documento tiene que ser evidente." },
        ],
      },
      translation: {
        category: "Traducción y documentos",
        title: "Traductores que editan en vez de transcribir.",
        body: [
          "EZDocuAI traduce documentos conservando el diseño original, así que el tiempo de un traductor por página pasó de unos veinte minutos a tres.",
          "Lectura de documentos, reconstrucción del diseño y un editor de revisión hecho para profesionales.",
        ],
        demands: [
          { title: "El diseño es contenido", desc: "Sellos, tablas y columnas significan algo. Reconstruirlos a mano se lleva la mayor parte del tiempo." },
          { title: "El documento es privado", desc: "Actas, diplomas y contratos personales. Se cifran en tránsito y en reposo, y se borran con constancia." },
          { title: "El profesional revisa, no transcribe", desc: "La herramienta entrega un borrador editable para que el traductor certificado aporte su criterio." },
        ],
      },
      sports: {
        category: "Deporte y comunidades",
        title: "Una app en producción que no podía detenerse.",
        body: [
          "FUTTEM es una app móvil en producción en Colombia, en App Store y Google Play, con usuarios reales que no podían interrumpirse con cada cambio.",
          "Montamos tres ambientes separados, despliegues controlados y trazas de extremo a extremo.",
        ],
        demands: [
          { title: "La app se usa a las siete de la noche", desc: "Cuando todos entran a la vez, no es el momento de que algo falle." },
          { title: "La disponibilidad cambia por minuto", desc: "Cupos, canchas y alineaciones se mueven en tiempo real o la reserva no sirve." },
          { title: "Publicar en tiendas es un proceso", desc: "App Store y Google Play imponen sus tiempos y revisiones; el despliegue se planea con eso." },
        ],
      },
      support: {
        category: "Atención al cliente",
        title: "Un agente de IA en todos los canales.",
        body: [
          "Clientes de comercio y finanzas personales que escriben por WhatsApp, Instagram y la web a toda hora, con las mismas preguntas.",
          "Un agente de IA conectado al catálogo, al stock y a las tiendas responde en cada canal: una sola inteligencia, respuestas al instante y el equipo libre para vender.",
        ],
        demands: [
          { title: "El cliente escribe por donde quiere", desc: "WhatsApp, Instagram o la web: la respuesta tiene que ser la misma en los tres." },
          { title: "Responder sin saber no sirve", desc: "El agente se conecta al catálogo, al stock y a las tiendas antes de abrir la boca." },
          { title: "Saber cuándo pasar a una persona", desc: "Una conversación difícil se entrega al equipo con todo el contexto, no se abandona." },
        ],
      },
      fintech: {
        category: "Fintech",
        title: "Educación financiera a escala de comunidad.",
        body: [
          "Fridoom es una marca de educación financiera con más de 200.000 seguidores.",
          "Es uno de los clientes del agente de IA multicanal, que responde a sus usuarios dentro de la app.",
        ],
        demands: [
          { title: "La confianza se pierde una sola vez", desc: "Un error con el dinero de alguien no se compensa con una disculpa." },
          { title: "La claridad es la función", desc: "Si la persona no entiende su propio saldo, el producto no está terminado." },
          { title: "La audiencia llega en oleadas", desc: "Una publicación puede traer miles de usuarios en una hora; la plataforma lo aguanta o se cae en público." },
        ],
      },
    },
  },
  projects: {
    marquee: ["MOSTRARIO", "PROYECTOS", "CASOS DE ESTUDIO", "TRABAJOS"],
    badge: { live: "En vivo" },
  },
  cases: {
    eyebrow: "Casos",
    title: "Problemas reales,",
    titleAccent: "resueltos con datos.",
    intro:
      "Siete proyectos en producción. En cada uno, el problema que había, cómo lo resolvimos y por qué funcionó.",
    caseTitle: "Cómo lo resolvimos con {client}",
    problem: "El problema",
    solution: "La solución",
    why: "Por qué funcionó",
    tools: "Herramientas",
    tour: "Un recorrido por el producto",
    tourIntro: "Pantallas reales de la plataforma en producción. Pasa el cursor para pausar, o elige una parada en el riel.",
    open: "Ver el caso completo",
    visit: "Visitar el sitio",
    back: "Todos los casos",
    client: "Cliente",
    country: "País",
    sector: "Sector",
    gallery: "Imágenes del proyecto",
    next: "Siguiente caso",
    ctaTitle: "¿Tienes un problema parecido?",
    ctaBody: "Cuéntanos qué necesitas. Revisamos tu caso y te respondemos por correo.",
    pendingImages: "Imágenes pendientes",
    countries: { CO: "Colombia", US: "Estados Unidos", MX: "México" },
  },
  moreProjects: {
    title: "Más",
    titleAccent: "proyectos.",
    visit: "abre su sitio en una pestaña nueva",
    eyebrow: "Proyecto",
    back: "Todos los proyectos",
    open: "Ver el proyecto",
    gallery: "Pantallas",
    next: "Siguiente proyecto",
  },
  whyWork: {
    eyebrow: "¿Por qué trabajar con nosotros?",
    headline: {
      lead: "No se trata solo de lanzar software. Se trata de ",
      muted: "ingeniería de productos que se ganan la confianza",
      tail: " y trascienden las tendencias.",
    },
    stats: [
      { value: 100, suffix: "%", label: "Trabajo realizado in-house" },
      { value: 2, suffix: "+", label: "Años creando productos digitales" },
      { value: 15, suffix: "+", label: "Clientes felices en 3 continentes" },
      { value: 12, suffix: "+", label: "Industrias atendidas: fintech, IA, telco, e-commerce" },
    ],
  },
  footer: {
    cta: { lead: "Construyamos algo", accent: "inevitable." },
    tagline: "Estudio de ingeniería de software para empresas que valoran el oficio.",
    sitemap: "Mapa del sitio",
    elsewhere: "En otros lugares",
    line: "Lumintik Developers SAS, NIT 902069502-5, Bogotá, 2026",
    rights: "",
  },
  mobileMenu: {
    startProject: "Iniciar un proyecto",
    joinUs: "Únete",
    open: "Abrir menú",
    close: "Cerrar menú",
  },
  contactForm: {
    title: "Cotización",
    subtitle: "Completa el formulario de cotización y descubre cómo podemos ayudarte a alcanzar tus objetivos de crecimiento con soluciones personalizadas.",
    name: "Nombre *",
    service: "Servicio/Solución de interés",
    serviceSelect: "Selecciona un producto",
    email: "Correo electrónico *",
    phone: "Teléfono",
    company: "Nombre de la empresa",
    role: "Tu cargo",
    message: "Cuéntanos un poco sobre tu empresa",
    attachment: "Adjuntar archivo (PDF, Imagen, etc.)",
    terms: "Al enviar aceptas la política de tratamiento de datos personales y los términos y condiciones",
    submit: "Enviar",
    sending: "Enviando…",
    success: "¡Gracias! Tu mensaje va en camino. Te contactaremos muy pronto.",
    error: "Hubo un problema al enviar tu mensaje. Inténtalo de nuevo o escríbenos directamente.",
    errorRequired: "Por favor completa los campos obligatorios.",
    errorEmail: "Por favor ingresa un correo electrónico válido.",
    errorFile: "El archivo adjunto es demasiado grande (máx. 8 MB).",
  },
};

export const messages: Record<Locale, Messages> = { EN: en, ES: es };
