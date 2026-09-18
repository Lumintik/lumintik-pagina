import type { Locale } from "@/lib/locale";
import type { ServiceKey } from "@/data/services";

export type ServiceContent = {
  overview: string;
  capabilities: { title: string; desc: string }[];
  process: { title: string; desc: string }[];
  deliverables: string[];
  outcome: string;
};

/**
 * Long-form copy for the service pages. Deliberately free of figures, client
 * counts and guaranteed outcomes — everything here describes how the studio
 * works, which is the only thing we can state accurately.
 */
export const serviceDetails: Record<Locale, Record<ServiceKey, ServiceContent>> = {
  EN: {
    productDevelopment: {
      overview:
        "Product Development covers the whole arc: framing the problem, deciding what to build, and shipping it to production with real users on it. It fits companies that already have a business running and need software that has to hold up under real use — a new platform, an internal tool that no longer fits in a spreadsheet, a second version the current codebase cannot support. Design and engineering work on the same team, so scope is decided with quality of execution and cost on the same table. We build in slices you can open and use, not in phases you have to take on faith.",
      capabilities: [
        {
          title: "Discovery and scoping",
          desc: "We map the problem, the users and the constraints before writing code. The output is a build plan that starts by naming the risky parts.",
        },
        {
          title: "Prototypes that answer questions",
          desc: "Clickable flows and technical spikes settle what a document leaves open. We test the risky assumption before it turns into a sprint.",
        },
        {
          title: "Product architecture",
          desc: "Data model, API contracts and rendering strategy chosen for how the product will actually grow. TypeScript end to end, Postgres, and edge runtime where it is justified.",
        },
        {
          title: "Full-stack build",
          desc: "Next.js and React at the front, typed services and background jobs behind them. One team owns the interface and the system underneath, so nothing is left in between.",
        },
        {
          title: "Release engineering",
          desc: "CI/CD, preview environments, feature flags and staged rollouts. Every change goes out the same way and is verified before it reaches production.",
        },
        {
          title: "Instrumentation and iteration",
          desc: "Analytics, error tracking and performance budgets wired in from the first release. After launch, decisions come from what the product reports, not from opinion.",
        },
      ],
      process: [
        {
          title: "Frame",
          desc: "We sit with your team, your data and your constraints. We come back with the shortest version of the product that is still worth shipping.",
        },
        {
          title: "Design and de-risk",
          desc: "Interface and architecture move together. Whatever carries the most technical or product risk gets prototyped first.",
        },
        {
          title: "Build in slices",
          desc: "Working software lands in a preview environment you can open and use, slice by slice. Scope is adjusted according to what is already running, not to a Gantt chart.",
        },
        {
          title: "Ship and hand over",
          desc: "Production release, monitoring in place, documentation and a walkthrough for whoever keeps it running. We stay on through the start of production traffic, for the period we agree on.",
        },
      ],
      deliverables: [
        "Product brief with prioritized scope and mapped risks",
        "Clickable prototype of the core flows",
        "Architecture and data model documentation",
        "Production codebase in your repository, under your accounts",
        "CI/CD pipeline with preview environments",
        "Monitoring, analytics and handover documentation",
      ],
      outcome:
        "You end with a product in production, not a deck about one. The team that built it leaves behind a codebase your engineers can read, a release process they can run, and instrumentation that shows what to fix next. The system is designed to be extended as the business changes, rather than replaced.",
    },
    uxui: {
      overview:
        "UX/UI at Lumintik happens inside the product, not next to it. We design interfaces where detail compounds: e-commerce catalogs, internal dashboards, sign-up and onboarding flows, AI products that have to explain themselves while they run. The scope covers information architecture, interaction design, visual language, design systems and the front-end implementation that takes them to production. It fits companies that already have a product and know where it hurts: a funnel with leaks, a dashboard nobody can read, a design system that drifted apart across teams.",
      capabilities: [
        {
          title: "Product interface design",
          desc: "We design the whole surface, not the happy path: empty states, errors, loading, permissions, long content and small screens. Every state is decided before it reaches code.",
        },
        {
          title: "Design systems and tokens",
          desc: "Component libraries built on design tokens, with typographic and spacing scales and documented variants. Built to hold up across several teams and several releases instead of drifting apart.",
        },
        {
          title: "Conversion flows",
          desc: "We rework the screens where drop-off happens: checkout, sign-up, forms, pricing, search. Fewer decisions per screen, clearer copy and instrumentation so the change can be read.",
        },
        {
          title: "Accessibility and readability",
          desc: "Contrast, keyboard navigation, visible focus, correct semantics and type that holds up on real devices. We check against WCAG criteria, not against taste.",
        },
        {
          title: "Design to code",
          desc: "We hand off in React, TypeScript and Tailwind, or in Figma files an engineer can build from without guessing. The system lives in the repository, not only in the design file.",
        },
        {
          title: "Motion with intent",
          desc: "Transitions that explain a state change instead of decorating it. Built with GSAP or Framer Motion and kept inside a performance budget agreed with your team.",
        },
      ],
      process: [
        {
          title: "Audit and framing",
          desc: "We go through the current product, the analytics you already have and the real paths people take through it. We start from what exists and agree on which problem is worth solving first.",
        },
        {
          title: "Structure before pixels",
          desc: "Information architecture, flows and wireframes get settled first. Visual direction comes once the skeleton holds and the edge cases are on the table.",
        },
        {
          title: "System and high fidelity",
          desc: "The visual language becomes a component system with tokens, states and rules. We review it in the browser, at real breakpoints, not only inside the design file.",
        },
        {
          title: "Implementation and iteration",
          desc: "We build the interface alongside your engineering team, instrument the key flows and adjust with what usage shows. The system gets documented as it ships.",
        },
      ],
      deliverables: [
        "Interface audit with prioritized findings",
        "Flow maps and annotated wireframes",
        "High-fidelity screens with every state covered",
        "Design system with tokens and documented components",
        "Production-ready React components",
        "Accessibility checklist and handoff notes",
      ],
      outcome:
        "Your team stops arguing screen by screen and starts building from a shared system. The product reads the same everywhere: same spacing, same states, same language, so a new feature no longer reopens decisions that were already made. And when a flow has to change, it is clear where to touch it and what to watch afterwards.",
    },
    webEngineering: {
      overview:
        "Web Engineering covers the build itself: the front end, the rendering strategy, and the runtime it ships to. We work in Next.js, React and TypeScript deployed at the edge, and we treat performance and accessibility as constraints from the first commit rather than a cleanup phase at the end. That means server components where they help, streaming where it pays off, and a performance budget agreed on before implementation starts. It fits companies whose site or app carries real operational load — commerce, onboarding, dashboards, content at scale — and where a slow first render is a business problem, not a cosmetic one.",
      capabilities: [
        {
          title: "Rendering strategy",
          desc: "We decide route by route: static, streamed, server-rendered or client-side. The choice depends on the data, the cache and how the page is actually used, not on the framework default.",
        },
        {
          title: "Edge delivery and caching",
          desc: "Deployment at the edge with an explicit caching contract: what gets cached, for how long, and how it is invalidated. Tag-based revalidation so content updates without a full rebuild.",
        },
        {
          title: "Accessibility built in",
          desc: "Semantic markup, keyboard navigation, focus management and contrast reviewed while we build. We test with a screen reader, not only with an automated audit.",
        },
        {
          title: "Design system in code",
          desc: "Design tokens, typed components and documented states. The interface stays consistent as the team and the product surface grow.",
        },
        {
          title: "Performance budgets and monitoring",
          desc: "Core Web Vitals measured in CI and in production with field data. A regression shows up as a failed check, not as a complaint from a user.",
        },
        {
          title: "Integrations and data layer",
          desc: "Typed APIs, headless CMS and commerce back ends, Postgres when a relational store is the right fit. Contracts are defined up front so the front end never has to guess the shape of the data.",
        },
      ],
      process: [
        {
          title: "Audit and budget",
          desc: "We measure what already exists: field data, bundle, critical path and accessibility. With that on the table we agree on a performance and quality budget before writing code.",
        },
        {
          title: "Architecture",
          desc: "Routes, rendering mode, caching and data contracts are decided together, written down and reviewed with your team before implementation.",
        },
        {
          title: "Build in slices",
          desc: "We ship route by route behind previews. Every pull request runs typecheck, tests, Lighthouse and accessibility checks in CI, so review happens on a real URL.",
        },
        {
          title: "Launch and hand-off",
          desc: "Production rollout with monitoring already in place, then documentation and a working session so your team can keep shipping changes without depending on us.",
        },
      ],
      deliverables: [
        "Production Next.js codebase in TypeScript, with repository and CI pipeline",
        "Typed component library with design tokens and documented states",
        "Rendering and caching architecture document",
        "Accessibility review against WCAG criteria, with the fixes applied",
        "Core Web Vitals dashboard and performance budget wired into CI",
        "Hand-off documentation and a recorded walkthrough for your team",
      ],
      outcome:
        "Rendering, caching and data contracts stop being implicit: they are decided, documented and visible in the code. Performance and accessibility become numbers your team can watch — measured in CI and against a budget agreed on up front — instead of a hunch. Whoever touches the code next inherits a system, not a mystery.",
    },
    appliedAI: {
      overview:
        "We build AI features that reach production, not demos. The work covers retrieval over your own content, agents that call real tools, and streaming LLM workflows wired into the stack you already run: TypeScript, Next.js, Postgres with pgvector, queues, edge and node runtimes. We treat prompts, models and retrieval as code — versioned, covered by evals, observable request by request. It fits teams that already have data, users and an operating cost to justify — support, documents, internal search, onboarding — and need the AI layer to be reviewed and tested like the rest of the system.",
      capabilities: [
        {
          title: "RAG over your own content",
          desc: "Ingestion, chunking, embeddings and hybrid search across your documents and databases. Answers arrive with citations to the source, so whoever reads them can check where each claim came from.",
        },
        {
          title: "Agents with real tools",
          desc: "Tool calling against your APIs, with typed schemas, retries, timeouts and a human approval step wherever the action is irreversible. The scope is declared in code: an agent can only call the tools you gave it.",
        },
        {
          title: "Streaming interfaces",
          desc: "Token-by-token responses with server actions and edge runtime, with cancellation, partial state and reconnection. The interface stays usable while the model is still writing.",
        },
        {
          title: "Evals and regression tests",
          desc: "A golden set built from your real cases, run in CI on every change to a prompt, a model or the retrieval layer. Each version is compared against the previous one instead of assumed to be better.",
        },
        {
          title: "Document and data extraction",
          desc: "Parsing, OCR and structured extraction with schema validation, so model output lands in typed fields instead of loose text. Anything that fails validation goes to a review queue.",
        },
        {
          title: "Cost, latency and routing",
          desc: "Model routing per task, prompt caching, batching, and per-request traces of tokens, latency and spend. Cost becomes something you can query per feature and per request, not a line you read on the monthly invoice.",
        },
      ],
      process: [
        {
          title: "Frame the use case",
          desc: "We start with the task, not the model: what comes in, what output is acceptable, who reviews it. We write the acceptance criteria with your team and rule out whatever does not need an LLM.",
        },
        {
          title: "Prototype on real data",
          desc: "A minimal end-to-end version of the flow, running against your actual documents and traffic. Real data surfaces the retrieval and formatting problems that a curated demo hides.",
        },
        {
          title: "Harden the pipeline",
          desc: "Evals, guardrails, fallbacks, rate limits and observability. We set cost and latency budgets, and make failures visible and recoverable instead of silent.",
        },
        {
          title: "Ship and hand over",
          desc: "We deploy inside your infrastructure with CI/CD, dashboards and a runbook. Your team keeps the repository, the evals and the documentation, and can keep iterating without us.",
        },
      ],
      deliverables: [
        "Production pipeline deployed in your own infrastructure, source code included",
        "Streaming API endpoints, with their documentation",
        "Eval suite with a golden set built from your own cases",
        "Prompts, model and retrieval configuration versioned in the repository",
        "Tracing of tokens, latency and cost per request",
        "Runbook and technical handover session",
      ],
      outcome:
        "The AI stops being something one person runs on a laptop and becomes a feature with an owner, tests and a cost you can read. When a model, a prompt or a document set changes, you can measure the effect before shipping it. And because the logic lives in your repository and not in a vendor's console, switching providers is work you do in code you already own.",
    },
    performanceSEO: {
      overview:
        "Performance can be measured, so we treat it as an engineering problem rather than a marketing one. This service covers Core Web Vitals, technical SEO and the infrastructure decisions underneath both: rendering strategy, caching, image and font delivery, crawling and indexation, structured data. It is built for teams whose site already brings in revenue or leads — commerce, media, SaaS, anywhere a slow LCP or a broken canonical costs real traffic. We work on the site you have, in the stack you have. No rewrite is required to start.",
      capabilities: [
        {
          title: "Core Web Vitals audit",
          desc: "We measure LCP, INP and CLS with lab and field data, and trace every regression back to the code or asset that causes it. Field data sets the priorities, not intuition.",
        },
        {
          title: "Rendering and caching strategy",
          desc: "Static, streamed, ISR or edge: we choose the rendering mode route by route instead of applying one to the whole site. Cache headers, revalidation and CDN behavior are part of the design, not something added at the end.",
        },
        {
          title: "Asset and bundle discipline",
          desc: "Image formats and sizing, font loading, third-party scripts and JavaScript weight. We remove what the page does not need and defer what it does not need yet.",
        },
        {
          title: "Technical SEO",
          desc: "Crawling, indexation, canonicals, sitemaps, redirects, internationalization with hreflang, and structured data that matches what the page actually says. We sort out the technical base first; content comes after.",
        },
        {
          title: "Infrastructure-level work",
          desc: "Edge runtime, regional placement, compression, and HTTP caching at the CDN and at the origin. Often the fastest response is the one that never reaches your origin.",
        },
        {
          title: "Regression control",
          desc: "Performance budgets in CI, Lighthouse on every pull request, and field monitoring after release. What nobody watches drifts back.",
        },
      ],
      process: [
        {
          title: "Baseline",
          desc: "We start with lab and field data on the routes that matter: templates, not just the home page. Nothing changes before we know where we are starting from.",
        },
        {
          title: "Diagnosis and priorities",
          desc: "Every problem is traced to its cause and prioritized by effort and impact. You get the list, and the reasoning behind the order.",
        },
        {
          title: "Implementation",
          desc: "We ship in small, reviewable increments: rendering and caching first, then assets, then markup and metadata. Each change is measured against the baseline.",
        },
        {
          title: "Guardrails",
          desc: "We leave budgets, CI checks and dashboards in place so the work survives the next feature. If your team ships, your team keeps the controls.",
        },
      ],
      deliverables: [
        "Performance and technical SEO audit, route by route",
        "Prioritized backlog with cause, fix and estimated effort",
        "Changes implemented in your repository, as reviewable pull requests",
        "Before and after measurements, from lab and field data",
        "Performance budgets and CI checks wired into your pipeline",
        "Monitoring dashboard and a short handover document for your team",
      ],
      outcome:
        "The work targets what a user actually feels: how soon the page paints, how soon it answers, and whether search engines can crawl and understand the site. Your team stops guessing which change caused a regression, because the measurement lives in the pipeline. And the work stays yours: same repository, same stack, documented.",
    },
    brandMotion: {
      overview:
        "Brand & Motion covers the identity system and the motion language that carries it onto every screen. We treat brand as a system, not a slide deck: type scale, color ramps, grid, iconography and design tokens that reach the code your team ships. Motion gets the same rigor: easing curves, durations and transitions defined once, then reused. It fits companies whose brand lives mostly on screens — a product UI, a launch site, an investor deck, a demo video. It is most useful when several teams touch the brand and the result keeps drifting.",
      capabilities: [
        {
          title: "Identity systems",
          desc: "Logo, marks, type scale, color ramps, grid and iconography. Defined as rules other teams can apply without asking us first.",
        },
        {
          title: "Design tokens and libraries",
          desc: "A Figma library paired with tokens exported to code: CSS variables, a Tailwind theme, a shared package. The brand ships as source, not as a PDF.",
        },
        {
          title: "Motion language",
          desc: "Easing curves, durations, entrance and exit rules, and how state changes read on screen. Implemented with GSAP, Framer Motion or plain CSS, whichever the product needs.",
        },
        {
          title: "WebGL and 3D moments",
          desc: "Shader work, scroll-driven scenes and hero pieces built against a performance budget. If the effect does not fit the budget, it gets cut.",
        },
        {
          title: "Video and programmatic motion",
          desc: "Brand video, animated explainers and Lottie files, and Remotion when the video should be rendered from React and real product data instead of by hand.",
        },
        {
          title: "Narrative and messaging",
          desc: "Positioning, naming and the copy structure behind them: what the home page says first, how a case study is built, what the deck argues.",
        },
      ],
      process: [
        {
          title: "Audit and direction",
          desc: "We read what already exists — product, site, decks, the category you compete in — and find what is worth keeping. Then we narrow to one or two directions, shown on real screens rather than moodboards alone.",
        },
        {
          title: "System build",
          desc: "We build the core: type, color, grid, iconography and motion rules. Every decision is tested on real screens before it is documented.",
        },
        {
          title: "Motion and production",
          desc: "We define the motion language and produce the pieces that need it: interface transitions, animated assets, video. Each one carries a performance budget from the start.",
        },
        {
          title: "Handoff and governance",
          desc: "Guidelines, token package and source files, and a working session with your team. The goal is that the next page can be built without us in the room.",
        },
      ],
      deliverables: [
        "Brand guidelines with usage rules and clear limits",
        "Logo, marks and variants in production-ready formats",
        "Figma library and design token package wired to code",
        "Motion spec: easing curves, durations and transition rules",
        "Animated assets: Lottie files, video masters and source projects",
        "Applied templates for site, deck and social media",
      ],
      outcome:
        "The brand stops being a file someone has to remember and becomes something your team can build with. New pages, features and campaigns look like they belong, because the decisions were made once and written into the code. Motion becomes part of the system instead of an improvisation on every project.",
    },
    platformInfra: {
      overview:
        "Platform and infrastructure work for teams whose product is already in production, or about to be. We design multi-region topologies, wire the deployment pipeline, and instrument the system so that answering \"what is happening right now\" is a query someone can run, not a war room. It fits companies with real traffic, several environments, and a team that can no longer afford deploys that feel like a gamble. We work on top of your cloud and your constraints — data residency, compliance, budget — instead of imposing a stack of our own.",
      capabilities: [
        {
          title: "Multi-region architecture",
          desc: "Traffic served close to the user, with regional failover and data residency decided deliberately rather than by default. Edge runtime where it pays off, regional compute where the state lives.",
        },
        {
          title: "Observability from the start",
          desc: "We instrument OpenTelemetry traces, structured logs and metrics before launch, not after the first incident. Dashboards and alerts answer to SLOs agreed with the team.",
        },
        {
          title: "Infrastructure as code",
          desc: "Environments defined in Terraform or Pulumi and reproducible from a repository. No click-ops, and no server that only one person knows how to rebuild.",
        },
        {
          title: "Delivery pipelines",
          desc: "CI/CD with preview environments per branch, progressive rollouts and a rollback that is one command away. Shipping is set up as routine work, not as a scheduled event.",
        },
        {
          title: "Resilient data layer",
          desc: "Postgres with replicas, pooling and cache tiers sized for the read patterns you actually have. Backups verified with restore drills instead of taken for granted.",
        },
        {
          title: "Security and access control",
          desc: "Managed secrets, least-privilege IAM, audit logs and dependency scanning inside the pipeline. Access is granted by role and denied by default.",
        },
      ],
      process: [
        {
          title: "Read the system as it is",
          desc: "We map topology, traffic patterns, failure modes and cost before proposing anything. What we find gets written down, including the parts that already work.",
        },
        {
          title: "Target architecture",
          desc: "A written architecture document with the trade-offs made explicit and a decision record for each one. The migration is planned in stages that can be shipped and reverted separately.",
        },
        {
          title: "Build and migrate",
          desc: "Infrastructure as code, pipelines and observability go in first; the cutover lives alongside the current system until it turns boring. Nothing moves without a rollback path.",
        },
        {
          title: "Operate and hand over",
          desc: "Runbooks, alert routing and on-call practice with your team, so the platform does not depend on us. We stay as long as it is useful, not as long as possible.",
        },
      ],
      deliverables: [
        "Documented target architecture with decision records",
        "Infrastructure-as-code repository covering every environment",
        "CI/CD pipelines with preview environments and rollback",
        "Observability: dashboards, traces, alerts and SLOs",
        "Runbooks and incident playbooks",
        "Staged migration and cutover plan",
      ],
      outcome:
        "The point of the work is that deploys stop being events. When something breaks there is a trace pointing at it and a rollback one command away, and the handover is designed so your team runs both without calling us. The platform turns into something you can grow on, instead of something you work around.",
    },
  },
  ES: {
    productDevelopment: {
      overview:
        "Desarrollo de Producto cubre el arco completo: encuadrar el problema, decidir qué construir y ponerlo en producción con usuarios reales usándolo. Le sirve a empresas que ya tienen un negocio andando y necesitan software que tenga que sostener uso real: una plataforma nueva, una herramienta interna que ya no cabe en una hoja de cálculo, una segunda versión que el código actual no soporta. Diseño e ingeniería trabajan en el mismo equipo, así que el alcance se decide con la calidad de ejecución y el costo sobre la misma mesa. Construimos por partes que puedes abrir y usar, no por fases que hay que aceptar a ciegas.",
      capabilities: [
        {
          title: "Discovery y definición de alcance",
          desc: "Mapeamos el problema, los usuarios y las restricciones antes de escribir código. El resultado es un plan de construcción que empieza por nombrar las partes riesgosas.",
        },
        {
          title: "Prototipos que responden preguntas",
          desc: "Flujos navegables y spikes técnicos resuelven lo que un documento deja abierto. Probamos el supuesto riesgoso antes de que se convierta en un sprint.",
        },
        {
          title: "Arquitectura de producto",
          desc: "Modelo de datos, contratos de API y estrategia de renderizado elegidos según cómo va a crecer el producto. TypeScript de punta a punta, Postgres y edge runtime donde se justifica.",
        },
        {
          title: "Construcción full-stack",
          desc: "Next.js y React al frente, servicios tipados y background jobs detrás. Un mismo equipo es dueño de la interfaz y del sistema que la sostiene, así nada queda en tierra de nadie.",
        },
        {
          title: "Ingeniería de releases",
          desc: "CI/CD, entornos de preview, feature flags y despliegues por etapas. Cada cambio sale por el mismo camino y se verifica antes de llegar a producción.",
        },
        {
          title: "Instrumentación e iteración",
          desc: "Analítica, seguimiento de errores y presupuestos de performance conectados desde el primer release. Después del lanzamiento, las decisiones salen de lo que reporta el producto, no de opiniones.",
        },
      ],
      process: [
        {
          title: "Encuadre",
          desc: "Nos sentamos con tu equipo, tus datos y tus restricciones. Volvemos con la versión más corta del producto que todavía vale la pena lanzar.",
        },
        {
          title: "Diseño y reducción de riesgo",
          desc: "Interfaz y arquitectura avanzan juntas. Lo que tiene más riesgo técnico o de producto se prototipa primero.",
        },
        {
          title: "Construcción por partes",
          desc: "El software funcional llega a un entorno de preview que puedes abrir y usar, parte por parte. El alcance se ajusta según lo que ya está corriendo, no según un diagrama de Gantt.",
        },
        {
          title: "Lanzamiento y traspaso",
          desc: "Release a producción, monitoreo en marcha, documentación y una sesión de traspaso para quien lo va a mantener. Acompañamos el arranque en producción durante el periodo que acordemos.",
        },
      ],
      deliverables: [
        "Brief de producto con alcance priorizado y riesgos mapeados",
        "Prototipo navegable de los flujos principales",
        "Documentación de arquitectura y modelo de datos",
        "Código de producción en tu repositorio y bajo tus cuentas",
        "Pipeline de CI/CD con entornos de preview",
        "Monitoreo, analítica y documentación de traspaso",
      ],
      outcome:
        "Terminas con un producto en producción, no con una presentación sobre un producto. El equipo que lo construyó deja atrás un código que tus ingenieros pueden leer, un proceso de release que pueden ejecutar e instrumentación que muestra qué corregir después. El sistema queda diseñado para extenderse a medida que el negocio cambia, no para reemplazarse.",
    },
    uxui: {
      overview:
        "El trabajo de UX/UI en Lumintik ocurre dentro del producto, no al lado. Diseñamos interfaces donde el detalle se acumula: catálogos de e-commerce, dashboards internos, flujos de registro y onboarding, productos de IA que deben explicarse mientras trabajan. El alcance cubre arquitectura de información, diseño de interacción, lenguaje visual, design systems y la implementación front-end que los lleva a producción. Encaja con empresas que ya tienen producto y saben dónde duele: un funnel con fugas, un dashboard que nadie logra leer, un design system que se desalineó entre equipos.",
      capabilities: [
        {
          title: "Diseño de interfaz de producto",
          desc: "Diseñamos toda la superficie, no solo el camino feliz: estados vacíos, errores, carga, permisos, contenido largo y pantallas pequeñas. Cada estado se decide antes de llegar al código.",
        },
        {
          title: "Design systems y tokens",
          desc: "Bibliotecas de componentes construidas sobre design tokens, con escalas tipográficas y de espaciado y variantes documentadas. Pensadas para sostenerse entre varios equipos y varios releases en lugar de desalinearse.",
        },
        {
          title: "Flujos de conversión",
          desc: "Rediseñamos las pantallas donde la gente abandona: checkout, registro, formularios, precios, búsqueda. Menos decisiones por pantalla, textos más claros e instrumentación para poder leer el cambio.",
        },
        {
          title: "Accesibilidad y legibilidad",
          desc: "Contraste, navegación por teclado, foco visible, semántica correcta y tipografía que aguanta en dispositivos reales. Revisamos contra los criterios de WCAG, no contra el gusto de nadie.",
        },
        {
          title: "Del diseño al código",
          desc: "Entregamos en React, TypeScript y Tailwind, o en archivos de Figma a partir de los cuales un ingeniero puede construir sin adivinar. El sistema vive en el repositorio, no solo en el archivo de diseño.",
        },
        {
          title: "Motion con criterio",
          desc: "Transiciones que explican un cambio de estado en lugar de decorarlo. Hechas con GSAP o Framer Motion y dentro de un presupuesto de performance acordado con tu equipo.",
        },
      ],
      process: [
        {
          title: "Auditoría y encuadre",
          desc: "Recorremos el producto actual, la analítica que ya tienes y los recorridos reales que hace la gente dentro. Partimos de lo que existe y acordamos qué problema vale la pena resolver primero.",
        },
        {
          title: "Estructura antes que píxeles",
          desc: "Primero se cierran arquitectura de información, flujos y wireframes. La dirección visual llega cuando el esqueleto se sostiene y los casos límite están sobre la mesa.",
        },
        {
          title: "Sistema y alta fidelidad",
          desc: "El lenguaje visual se convierte en un sistema de componentes con tokens, estados y reglas. Lo revisamos en el navegador, en breakpoints reales, no solo dentro del archivo de diseño.",
        },
        {
          title: "Implementación e iteración",
          desc: "Construimos la interfaz junto a tu equipo de ingeniería, instrumentamos los flujos clave y ajustamos con lo que muestra el uso. El sistema se documenta a medida que sale a producción.",
        },
      ],
      deliverables: [
        "Auditoría de interfaz con hallazgos priorizados",
        "Mapas de flujo y wireframes anotados",
        "Pantallas en alta fidelidad con todos sus estados",
        "Design system con tokens y componentes documentados",
        "Componentes React listos para producción",
        "Checklist de accesibilidad y notas de handoff",
      ],
      outcome:
        "Tu equipo deja de discutir pantalla por pantalla y empieza a construir desde un sistema compartido. El producto se lee igual en todas partes: mismo espaciado, mismos estados, mismo lenguaje, así que una función nueva ya no reabre decisiones que estaban tomadas. Y cuando un flujo tiene que cambiar, queda claro dónde tocarlo y qué observar después.",
    },
    webEngineering: {
      overview:
        "Ingeniería Web cubre la construcción en sí: el front end, la estrategia de renderizado y el runtime donde se despliega. Trabajamos con Next.js, React y TypeScript desplegados en el edge, y tratamos el rendimiento y la accesibilidad como restricciones desde el primer commit, no como una limpieza al final. Eso significa server components donde aportan, streaming donde compensa y un presupuesto de rendimiento acordado antes de empezar a implementar. Encaja con empresas cuyo sitio o aplicación sostiene operación real — comercio, onboarding, dashboards, contenido a escala — y donde un primer render lento es un problema de negocio, no un asunto estético.",
      capabilities: [
        {
          title: "Estrategia de renderizado",
          desc: "Decidimos ruta por ruta: estático, streaming, renderizado en servidor o en cliente. La decisión depende de los datos, del caché y del uso real de la página, no del valor por defecto del framework.",
        },
        {
          title: "Entrega en el edge y caché",
          desc: "Despliegue en el edge con un contrato de caché explícito: qué se cachea, por cuánto tiempo y cómo se invalida. Revalidación por tags para actualizar contenido sin reconstruir todo el sitio.",
        },
        {
          title: "Accesibilidad desde el código",
          desc: "Marcado semántico, navegación por teclado, manejo del foco y contraste revisados mientras construimos. Probamos con lector de pantalla, no solo con una auditoría automática.",
        },
        {
          title: "Design system en código",
          desc: "Design tokens, componentes tipados y estados documentados. La interfaz se mantiene consistente a medida que crecen el equipo y la superficie del producto.",
        },
        {
          title: "Presupuestos de rendimiento y monitoreo",
          desc: "Core Web Vitals medidos en CI y en producción con datos de campo. Una regresión aparece como una verificación que falla, no como la queja de un usuario.",
        },
        {
          title: "Integraciones y capa de datos",
          desc: "APIs tipadas, CMS headless y backends de comercio, Postgres cuando una base relacional es lo que corresponde. Los contratos se definen desde el inicio para que el front end nunca tenga que adivinar la forma de los datos.",
        },
      ],
      process: [
        {
          title: "Auditoría y presupuesto",
          desc: "Medimos lo que ya existe: datos de campo, bundle, ruta crítica y accesibilidad. Con eso sobre la mesa acordamos un presupuesto de rendimiento y calidad antes de escribir código.",
        },
        {
          title: "Arquitectura",
          desc: "Rutas, modo de renderizado, caché y contratos de datos se deciden en conjunto, quedan por escrito y se revisan con tu equipo antes de implementar.",
        },
        {
          title: "Construcción por partes",
          desc: "Entregamos ruta por ruta con previews. Cada pull request pasa typecheck, tests, Lighthouse y revisiones de accesibilidad en CI, de modo que la revisión ocurre sobre una URL real.",
        },
        {
          title: "Lanzamiento y traspaso",
          desc: "Salida a producción con el monitoreo ya activo, luego documentación y una sesión de trabajo para que tu equipo siga publicando cambios sin depender de nosotros.",
        },
      ],
      deliverables: [
        "Código de producción en Next.js y TypeScript, con repositorio y pipeline de CI",
        "Biblioteca de componentes tipados con design tokens y estados documentados",
        "Documento de arquitectura de renderizado y caché",
        "Revisión de accesibilidad según los criterios WCAG, con las correcciones aplicadas",
        "Dashboard de Core Web Vitals y presupuesto de rendimiento integrado en CI",
        "Documentación de traspaso y una sesión grabada para tu equipo",
      ],
      outcome:
        "El renderizado, el caché y los contratos de datos dejan de ser implícitos: quedan decididos, documentados y visibles en el código. El rendimiento y la accesibilidad pasan a ser números que tu equipo puede vigilar — medidos en CI y contra un presupuesto acordado desde el inicio — en lugar de una intuición. Quien toque el código después hereda un sistema, no un misterio.",
    },
    appliedAI: {
      overview:
        "Construimos funcionalidades de IA que llegan a producción, no demos. El trabajo cubre recuperación sobre tu propio contenido, agentes que ejecutan herramientas reales y flujos LLM en streaming integrados al stack que ya usas: TypeScript, Next.js, Postgres con pgvector, colas y runtimes edge y node. Tratamos los prompts, los modelos y la recuperación como código: versionados, cubiertos por evals y observables petición a petición. Encaja con equipos que ya tienen datos, usuarios y un costo operativo que justificar — soporte, documentos, búsqueda interna, onboarding — y necesitan que la capa de IA se revise y se pruebe como el resto del sistema.",
      capabilities: [
        {
          title: "RAG sobre tu propio contenido",
          desc: "Ingesta, chunking, embeddings y búsqueda híbrida sobre tus documentos y bases de datos. Las respuestas llegan con citas a la fuente, para que quien las lea pueda verificar de dónde salió cada afirmación.",
        },
        {
          title: "Agentes con herramientas reales",
          desc: "Tool calling contra tus APIs, con esquemas tipados, reintentos, timeouts y un paso de aprobación humana cuando la acción es irreversible. El alcance se declara en código: un agente solo puede llamar a las herramientas que le diste.",
        },
        {
          title: "Interfaces en streaming",
          desc: "Respuestas token a token con server actions y edge runtime, con cancelación, estado parcial y reconexión. La interfaz sigue siendo usable mientras el modelo escribe.",
        },
        {
          title: "Evals y pruebas de regresión",
          desc: "Un golden set construido con tus casos reales, que se ejecuta en CI en cada cambio de prompt, de modelo o de la capa de recuperación. Cada versión se compara con la anterior en vez de darla por mejor.",
        },
        {
          title: "Extracción de documentos y datos",
          desc: "Parsing, OCR y extracción estructurada con validación de esquema, para que la salida del modelo caiga en campos tipados y no en texto suelto. Lo que no pasa la validación entra a una cola de revisión.",
        },
        {
          title: "Costo, latencia y enrutamiento",
          desc: "Enrutamiento de modelos por tarea, caché de prompts, batching y trazas de tokens, latencia y gasto por petición. El costo pasa a ser algo que puedes consultar por funcionalidad y por petición, no una línea que lees en la factura del mes.",
        },
      ],
      process: [
        {
          title: "Delimitar el caso de uso",
          desc: "Empezamos por la tarea, no por el modelo: qué entra, qué salida es aceptable, quién la revisa. Escribimos los criterios de aceptación con tu equipo y descartamos todo lo que no necesita un LLM.",
        },
        {
          title: "Prototipar con datos reales",
          desc: "Una versión mínima del flujo completo, de punta a punta, contra tus documentos y tu tráfico reales. Los datos reales sacan a la luz los problemas de recuperación y de formato que una demo curada esconde.",
        },
        {
          title: "Endurecer el pipeline",
          desc: "Evals, guardrails, fallbacks, rate limits y observabilidad. Definimos presupuestos de costo y latencia, y hacemos que los fallos sean visibles y recuperables en vez de silenciosos.",
        },
        {
          title: "Desplegar y entregar",
          desc: "Desplegamos dentro de tu infraestructura con CI/CD, dashboards y un runbook. Tu equipo se queda con el repositorio, los evals y la documentación, y puede seguir iterando sin nosotros.",
        },
      ],
      deliverables: [
        "Pipeline en producción desplegado en tu propia infraestructura, con el código fuente",
        "Endpoints de API en streaming, con su documentación",
        "Suite de evals con un golden set construido a partir de tus propios casos",
        "Prompts, modelo y configuración de recuperación versionados en el repositorio",
        "Trazas de tokens, latencia y costo por petición",
        "Runbook y sesión de traspaso técnico",
      ],
      outcome:
        "La IA deja de ser algo que una sola persona ejecuta en su portátil y pasa a ser una funcionalidad con responsable, pruebas y un costo que se puede leer. Cuando cambia un modelo, un prompt o un conjunto de documentos, puedes medir el efecto antes de publicarlo. Y como la lógica vive en tu repositorio y no en la consola de un proveedor, cambiar de proveedor se resuelve en código que ya es tuyo.",
    },
    performanceSEO: {
      overview:
        "El performance se puede medir, así que lo tratamos como un problema de ingeniería y no de marketing. Este servicio cubre Core Web Vitals, SEO técnico y las decisiones de infraestructura que hay detrás de ambos: estrategia de renderizado, caché, entrega de imágenes y fuentes, rastreo e indexación, datos estructurados. Está pensado para equipos cuyo sitio ya genera ingresos o leads: comercio, medios, SaaS, cualquier caso en el que un LCP lento o un canonical roto cueste tráfico real. Trabajamos sobre el sitio que ya tienes, en el stack que ya tienes. No hace falta reescribir nada para empezar.",
      capabilities: [
        {
          title: "Auditoría de Core Web Vitals",
          desc: "Medimos LCP, INP y CLS con datos de laboratorio y de campo, y rastreamos cada regresión hasta el código o el asset que la causa. Las prioridades las marca el dato de campo, no la intuición.",
        },
        {
          title: "Estrategia de renderizado y caché",
          desc: "Estático, streaming, ISR o edge: elegimos el modo de renderizado ruta por ruta, en lugar de aplicar uno solo a todo el sitio. Los headers de caché, la revalidación y el comportamiento del CDN son parte del diseño, no algo que se agrega al final.",
        },
        {
          title: "Disciplina de assets y bundles",
          desc: "Formatos y tamaños de imagen, carga de fuentes, scripts de terceros y peso de JavaScript. Quitamos lo que la página no necesita y diferimos lo que todavía no necesita.",
        },
        {
          title: "SEO técnico",
          desc: "Rastreo, indexación, canonicals, sitemaps, redirecciones, internacionalización con hreflang y datos estructurados que coincidan con lo que la página dice de verdad. Primero ordenamos la base técnica; el contenido viene después.",
        },
        {
          title: "Trabajo a nivel de infraestructura",
          desc: "Edge runtime, ubicación regional, compresión y caché HTTP en el CDN y en el origen. Muchas veces la respuesta más rápida es la que nunca llega a tu origen.",
        },
        {
          title: "Control de regresiones",
          desc: "Performance budgets en CI, Lighthouse en cada pull request y monitoreo de campo después del release. Lo que nadie vigila se degrada.",
        },
      ],
      process: [
        {
          title: "Línea base",
          desc: "Empezamos con datos de laboratorio y de campo sobre las rutas que importan: plantillas, no solo la página de inicio. No cambiamos nada antes de saber de dónde partimos.",
        },
        {
          title: "Diagnóstico y prioridades",
          desc: "Cada problema se rastrea hasta su causa y se prioriza según esfuerzo e impacto. Recibes la lista y también el porqué de ese orden.",
        },
        {
          title: "Implementación",
          desc: "Entregamos en incrementos pequeños y revisables: primero renderizado y caché, luego assets, luego markup y metadatos. Cada cambio se mide contra la línea base.",
        },
        {
          title: "Blindaje",
          desc: "Dejamos budgets, checks en CI y dashboards para que el trabajo sobreviva a la siguiente feature. Si tu equipo despliega, tu equipo se queda con los controles.",
        },
      ],
      deliverables: [
        "Auditoría de performance y SEO técnico, ruta por ruta",
        "Backlog priorizado con causa, solución y esfuerzo estimado",
        "Cambios implementados en tu repositorio, en pull requests revisables",
        "Mediciones de antes y después, con datos de laboratorio y de campo",
        "Performance budgets y checks de CI integrados en tu pipeline",
        "Dashboard de monitoreo y un documento breve de entrega para tu equipo",
      ],
      outcome:
        "El trabajo apunta a lo que el usuario siente: qué tan pronto pinta la página, qué tan pronto responde y si los buscadores pueden rastrear y entender el sitio. Tu equipo deja de adivinar qué cambio causó una regresión, porque la medición vive en el pipeline. Y el trabajo queda tuyo: mismo repositorio, mismo stack, documentado.",
    },
    brandMotion: {
      overview:
        "Brand & Motion cubre el sistema de identidad y el lenguaje de movimiento que lo lleva a cada pantalla. Tratamos la marca como un sistema, no como una presentación: escala tipográfica, escalas de color, retícula, iconografía y design tokens que llegan al código que tu equipo despliega. El motion recibe el mismo rigor: curvas de easing, duraciones y transiciones que se definen una vez y se reutilizan. Está pensado para empresas cuya marca vive sobre todo en pantalla: la interfaz de un producto, un sitio de lanzamiento, una presentación para inversionistas, un video demo. Es más útil cuando varios equipos tocan la marca y el resultado se va desalineando.",
      capabilities: [
        {
          title: "Sistemas de identidad",
          desc: "Logotipo, símbolos, escala tipográfica, escalas de color, retícula e iconografía. Definidos como reglas que otros equipos pueden aplicar sin consultarnos.",
        },
        {
          title: "Design tokens y librerías",
          desc: "Librería de Figma junto con tokens exportados a código: variables CSS, tema de Tailwind, paquete compartido. La marca se entrega como fuente, no como PDF.",
        },
        {
          title: "Lenguaje de motion",
          desc: "Curvas de easing, duraciones, reglas de entrada y salida, y cómo se leen los cambios de estado. Implementado con GSAP, Framer Motion o CSS puro, según lo que pida el producto.",
        },
        {
          title: "WebGL y momentos 3D",
          desc: "Shaders, escenas ligadas al scroll y piezas de portada construidas contra un presupuesto de rendimiento. Si el efecto no cabe en el presupuesto, se recorta.",
        },
        {
          title: "Video y motion programático",
          desc: "Video de marca, piezas explicativas y archivos Lottie, y Remotion cuando el video debe renderizarse desde React con datos reales del producto en lugar de a mano.",
        },
        {
          title: "Narrativa y mensaje",
          desc: "Posicionamiento, naming y la estructura de copy que hay detrás: qué dice primero la página de inicio, cómo se arma un caso de estudio, qué argumenta la presentación.",
        },
      ],
      process: [
        {
          title: "Auditoría y dirección",
          desc: "Leemos lo que ya existe —producto, sitio, presentaciones, la categoría en la que compites— y encontramos qué vale la pena conservar. Luego reducimos a una o dos direcciones, mostradas sobre pantallas reales y no solo en moodboards.",
        },
        {
          title: "Construcción del sistema",
          desc: "Armamos el núcleo: tipografía, color, retícula, iconografía y reglas de motion. Cada decisión se prueba en pantallas reales antes de documentarse.",
        },
        {
          title: "Motion y producción",
          desc: "Definimos el lenguaje de movimiento y producimos las piezas que lo requieren: transiciones de interfaz, assets animados, video. Cada una nace con un presupuesto de rendimiento.",
        },
        {
          title: "Entrega y gobernanza",
          desc: "Manual de marca, paquete de tokens y archivos fuente, y una sesión de trabajo con tu equipo. El objetivo es que la siguiente página se pueda construir sin nosotros en la sala.",
        },
      ],
      deliverables: [
        "Manual de marca con reglas de uso y límites claros",
        "Logotipo, símbolos y variantes en formatos listos para producción",
        "Librería de Figma y paquete de design tokens conectado al código",
        "Especificación de motion: curvas de easing, duraciones y reglas de transición",
        "Assets animados: archivos Lottie, masters de video y proyectos fuente",
        "Plantillas aplicadas para sitio, presentación y redes sociales",
      ],
      outcome:
        "La marca deja de ser un archivo que alguien tiene que recordar y pasa a ser algo con lo que tu equipo puede construir. Las páginas, funcionalidades y campañas nuevas se ven como parte de lo mismo, porque las decisiones se tomaron una vez y quedaron escritas en el código. El motion se vuelve parte del sistema en lugar de una improvisación proyecto a proyecto.",
    },
    platformInfra: {
      overview:
        "Trabajo de plataforma e infraestructura para equipos cuyo producto ya está en producción, o está a punto de estarlo. Diseñamos topologías multi-región, montamos el pipeline de despliegue e instrumentamos el sistema para que responder «¿qué está pasando ahora mismo?» sea una consulta que alguien ejecuta, y no una sala de crisis. Encaja en empresas con tráfico real, varios entornos y un equipo que ya no puede permitirse que cada despliegue sea una apuesta. Trabajamos sobre tu nube y tus restricciones — residencia de datos, cumplimiento, presupuesto — en lugar de imponer un stack propio.",
      capabilities: [
        {
          title: "Arquitectura multi-región",
          desc: "Tráfico servido cerca del usuario, con failover regional y una residencia de datos decidida de forma deliberada, no por defecto. Edge runtime donde compensa, cómputo regional donde vive el estado.",
        },
        {
          title: "Observabilidad desde el principio",
          desc: "Instrumentamos trazas con OpenTelemetry, logs estructurados y métricas antes del lanzamiento, no después del primer incidente. Dashboards y alertas que responden a SLOs acordados con el equipo.",
        },
        {
          title: "Infraestructura como código",
          desc: "Entornos definidos en Terraform o Pulumi y reproducibles desde un repositorio. Sin click-ops y sin ningún servidor que solo una persona sepa reconstruir.",
        },
        {
          title: "Pipelines de entrega",
          desc: "CI/CD con entornos de preview por rama, despliegues progresivos y un rollback a un comando de distancia. Publicar queda montado como trabajo de rutina, no como un evento agendado.",
        },
        {
          title: "Capa de datos resiliente",
          desc: "Postgres con réplicas, pooling y capas de caché dimensionadas para los patrones de lectura que de verdad tienes. Backups verificados con simulacros de restauración, no dados por hecho.",
        },
        {
          title: "Seguridad y control de acceso",
          desc: "Secretos gestionados, IAM de mínimo privilegio, registros de auditoría y escaneo de dependencias dentro del pipeline. El acceso se concede por rol y se deniega por defecto.",
        },
      ],
      process: [
        {
          title: "Leer el sistema tal como está",
          desc: "Mapeamos topología, patrones de tráfico, modos de fallo y costo antes de proponer nada. Lo que encontramos queda por escrito, incluido lo que ya funciona bien.",
        },
        {
          title: "Arquitectura objetivo",
          desc: "Un documento de arquitectura con los trade-offs explícitos y un registro de decisión para cada uno. La migración se planifica en etapas que se pueden desplegar y revertir por separado.",
        },
        {
          title: "Construir y migrar",
          desc: "Primero se montan la infraestructura como código, los pipelines y la observabilidad; el cutover convive con el sistema actual hasta que se vuelve aburrido. Nada se mueve sin una ruta de rollback.",
        },
        {
          title: "Operar y traspasar",
          desc: "Runbooks, enrutamiento de alertas y práctica de on-call con tu equipo, para que la plataforma no dependa de nosotros. Nos quedamos mientras sea útil, no todo lo que se pueda.",
        },
      ],
      deliverables: [
        "Arquitectura objetivo documentada con registros de decisión",
        "Repositorio de infraestructura como código que cubre todos los entornos",
        "Pipelines de CI/CD con entornos de preview y rollback",
        "Observabilidad: dashboards, trazas, alertas y SLOs",
        "Runbooks y playbooks de incidentes",
        "Plan de migración y cutover por etapas",
      ],
      outcome:
        "El objetivo del trabajo es que los despliegues dejen de ser eventos. Cuando algo falla hay una traza que lo señala y un rollback a un comando de distancia, y el traspaso está diseñado para que tu equipo ejecute ambos sin llamarnos. La plataforma pasa a ser algo sobre lo que puedes crecer, en lugar de algo que hay que esquivar.",
    },
  },
};
