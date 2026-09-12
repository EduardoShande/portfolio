/**
 * Every fact about Eduardo that the site renders lives here.
 *
 * Copy that is purely decorative (headings, eyebrows, button labels) stays in
 * `src/messages/*.json`. Anything factual: a job title, a date, a metric, a
 * project: lives in this file instead, so there is exactly one place to edit
 * when something changes and no risk of the two locales drifting apart on the
 * facts.
 *
 * Bilingual strings are `{ es, en }`. Anything language-neutral (dates, tech
 * names, URLs, numbers) is a plain value.
 */

export type Locale = "es" | "en";
export type I18nString = Record<Locale, string>;

/* ────────────────────────────── Identity ────────────────────────────── */

export const PROFILE = {
  name: "Eduardo Shande Guerrero Yucra",
  shortName: "Eduardo Shande",
  initials: "ES",
  role: {
    es: "Ingeniero de Datos y Automatización",
    en: "Data & Automation Engineer",
  } satisfies I18nString,
  location: {
    es: "Santa Cruz de la Sierra, Bolivia",
    en: "Santa Cruz de la Sierra, Bolivia",
  } satisfies I18nString,
  email: "eduardoshandeone@gmail.com",
  phone: "+591 73115185",
  github: "https://github.com/EduardoShande",
  linkedin:
    "https://linkedin.com/in/eduardo-shande-guerrero-yucra-82aba132a",
  /**
   * Paste the full profile URL for each. Anything left as an empty string is
   * simply not rendered, so there are never dead links on the site.
   */
  instagram: "",
  tiktok: "",
  facebook: "",
  cvPath: "/cv/Eduardo-Guerrero-Resume.pdf",
  /** Client work is delivered under this name. */
  studio: "Sycosmart",
} as const;

/* ──────────────────────────────── Stats ─────────────────────────────── */

/** Every number here traces back to a line in the CV. Do not invent more. */
export const STATS = [
  {
    value: 3,
    suffix: "+",
    label: { es: "Años de experiencia", en: "Years of experience" },
  },
  {
    value: 50,
    suffix: "%",
    label: {
      es: "Menos tiempo de carga de datos",
      en: "Faster data load times",
    },
  },
  {
    value: 40,
    suffix: "%",
    label: {
      es: "Menos tiempo procesando leads",
      en: "Faster lead processing",
    },
  },
  {
    value: 2,
    suffix: "",
    label: {
      es: "Países: Bolivia y EE. UU.",
      en: "Countries: Bolivia and the US",
    },
  },
] as const;

/* ────────────────────────────── Experience ──────────────────────────── */

export type Experience = {
  id: string;
  company: string;
  role: I18nString;
  period: I18nString;
  /** Sorting key: most recent first. */
  order: number;
  current: boolean;
  summary: I18nString;
  highlights: { es: string[]; en: string[] };
  stack: string[];
};

export const EXPERIENCE: Experience[] = [
  {
    id: "carsans-automation",
    company: "CarSans S.R.L",
    role: {
      es: "Ingeniero de Automatización (Contrato)",
      en: "Automation Engineer (Contract)",
    },
    period: { es: "Mar 2026 a Presente", en: "Mar 2026 to Present" },
    order: 1,
    current: true,
    summary: {
      es: "Diseño e implemento flujos automatizados que eliminan coordinación manual entre sistemas internos.",
      en: "I design and implement automated workflows that remove manual coordination between internal systems.",
    },
    highlights: {
      es: [
        "Flujos automatizados de procesos internos con Python y n8n",
        "Integraciones por API entre sistemas internos, reduciendo coordinación manual",
        "Trabajo directo con stakeholders para identificar cuellos de botella y automatizarlos",
      ],
      en: [
        "Automated internal business processes with Python and n8n",
        "API integrations between internal systems, cutting manual coordination overhead",
        "Worked directly with stakeholders to identify bottlenecks and automate them",
      ],
    },
    stack: ["Python", "n8n", "REST APIs", "PostgreSQL", "Docker"],
  },
  {
    id: "quimera",
    company: "Group Quimera",
    role: {
      es: "Ingeniero de Software y Automatización",
      en: "Software & Automation Engineer",
    },
    period: { es: "May 2025 a Abr 2026", en: "May 2025 to Apr 2026" },
    order: 2,
    current: false,
    summary: {
      es: "Lideré el equipo de desarrollo y construí la infraestructura de automatización que conectaba WhatsApp, CRMs y bases de datos en tiempo real.",
      en: "Led the development team and built the automation infrastructure connecting WhatsApp, CRMs and databases in real time.",
    },
    highlights: {
      es: [
        "Lideré el equipo con metodologías ágiles, +30% en velocidad de entrega vía OpenProject",
        "−40% en tiempo de procesamiento de leads con n8n, WhatsApp Business API, CRMs y PostgreSQL",
        "Infraestructura escalable con Docker Compose sobre VPS, con alta disponibilidad",
        "Workflows avanzados en GoHighLevel para campañas, embudos de venta y landing pages",
        "LLMs (GPT, Claude) integrados en flujos de negocio para automatización cognitiva",
        "Administración de servidores VPS (Contabo, AWS) para herramientas y producción",
      ],
      en: [
        "Led the team with agile methodologies, +30% delivery speed via OpenProject",
        "−40% lead processing time with n8n, WhatsApp Business API, CRMs and PostgreSQL",
        "Scalable infrastructure with Docker Compose on VPS, running with high availability",
        "Advanced GoHighLevel workflows for campaigns, sales funnels and landing pages",
        "LLMs (GPT, Claude) integrated into business workflows for cognitive automation",
        "Administered VPS servers (Contabo, AWS) hosting automation tools and production apps",
      ],
    },
    stack: [
      "Docker",
      "n8n",
      "Python",
      "JavaScript",
      "PostgreSQL",
      "GoHighLevel",
      "REST APIs",
      "VPS Linux",
      "AWS",
    ],
  },
  {
    id: "gerona",
    company: "Gerona SVF",
    role: { es: "Ingeniero de Datos", en: "Data Engineer" },
    period: { es: "Abr 2024 a Mar 2025", en: "Apr 2024 to Mar 2025" },
    order: 3,
    current: false,
    summary: {
      es: "Construí los pipelines y el data warehouse que procesaban millones de registros diarios de ventas, inventario y CRM.",
      en: "Built the pipelines and data warehouse processing millions of daily records from sales, inventory and CRM systems.",
    },
    highlights: {
      es: [
        "Pipelines ETL con Python, Apache Airflow y dbt hacia Snowflake y BigQuery",
        "−50% en tiempos de carga mediante paralelización y validación automatizada",
        "Data Warehouse corporativo con esquemas estrella y copo de nieve",
        "95% de confiabilidad en reportes aplicando limpieza, normalización y enriquecimiento",
        "Dashboards interactivos en Power BI para dirección y equipos operativos",
        "Monitoreo de pipelines con alertas automáticas y documentación técnica",
      ],
      en: [
        "ETL pipelines with Python, Apache Airflow and dbt into Snowflake and BigQuery",
        "−50% data load times through parallelization and automated validation",
        "Corporate data warehouse using star and snowflake schemas",
        "95% report reliability through data cleansing, normalization and enrichment",
        "Interactive Power BI dashboards for executives and operational teams",
        "Pipeline monitoring with automated alerts and technical documentation",
      ],
    },
    stack: [
      "Python",
      "Apache Airflow",
      "dbt",
      "Pandas",
      "SQLAlchemy",
      "Snowflake",
      "BigQuery",
      "Power BI",
    ],
  },
  {
    id: "carsans-dev",
    company: "CarSans S.R.L",
    role: { es: "Desarrollador de Software", en: "Software Developer" },
    period: { es: "Mar 2023 a Feb 2024", en: "Mar 2023 to Feb 2024" },
    order: 4,
    current: false,
    summary: {
      es: "Desarrollé aplicaciones web y APIs para pequeñas y medianas empresas.",
      en: "Built web applications and APIs for small and medium businesses.",
    },
    highlights: {
      es: [
        "Aplicaciones web con React, JavaScript, HTML/CSS y WordPress",
        "APIs REST con Django Rest Framework para frontend y móvil",
        "Modelado relacional normalizado, +30% en rendimiento de consultas",
        "Gestión de sprints en Notion, cumpliendo el 95% de las entregas",
      ],
      en: [
        "Web applications with React, JavaScript, HTML/CSS and WordPress",
        "REST APIs with Django Rest Framework supporting frontend and mobile",
        "Normalized relational schemas, +30% query performance",
        "Sprint management in Notion, hitting 95% of deadlines",
      ],
    },
    stack: [
      "React",
      "JavaScript",
      "Python",
      "Django REST",
      "PostgreSQL",
      "WordPress",
    ],
  },
];

/* ──────────────────────────────── Work ──────────────────────────────── */

export type ProjectCategory = "automation" | "data" | "product" | "web";

export type Project = {
  id: string;
  title: I18nString;
  /** Who it was for. Anonymized where naming the client is not cleared. */
  client: I18nString;
  category: ProjectCategory;
  year: string;
  featured: boolean;
  problem: I18nString;
  solution: I18nString;
  /** Headline outcome. Omit entirely rather than estimating one. */
  outcome?: I18nString;
  stack: string[];
  links?: { label: I18nString; href: string }[];
};

export const PROJECTS: Project[] = [
  {
    id: "lead-automation",
    title: {
      es: "Motor de automatización de leads por WhatsApp",
      en: "WhatsApp lead automation engine",
    },
    client: { es: "Group Quimera", en: "Group Quimera" },
    category: "automation",
    year: "2025",
    featured: true,
    problem: {
      es: "Los leads llegaban por WhatsApp y se procesaban a mano: alguien los copiaba al CRM, los clasificaba y los asignaba. Se perdía tiempo y se perdían leads.",
      en: "Leads arrived over WhatsApp and were processed by hand: someone copied them into the CRM, classified them and assigned them. Time was lost, and so were leads.",
    },
    solution: {
      es: "Construí un flujo en n8n que recibe el mensaje por WhatsApp Business API, extrae y valida los datos, los sincroniza con el CRM y PostgreSQL en tiempo real, y notifica al vendedor correcto.",
      en: "I built an n8n workflow that receives the message through the WhatsApp Business API, extracts and validates the data, syncs it to the CRM and PostgreSQL in real time, and notifies the right salesperson.",
    },
    outcome: {
      es: "40% menos tiempo de procesamiento por lead.",
      en: "40% reduction in processing time per lead.",
    },
    stack: [
      "n8n",
      "WhatsApp Business API",
      "PostgreSQL",
      "REST APIs",
      "Docker",
    ],
  },
  {
    id: "data-warehouse",
    title: {
      es: "Data warehouse y pipelines ETL corporativos",
      en: "Corporate data warehouse and ETL pipelines",
    },
    client: { es: "Gerona SVF", en: "Gerona SVF" },
    category: "data",
    year: "2024",
    featured: true,
    problem: {
      es: "Ventas, inventario y CRM vivían en sistemas separados. Los reportes se armaban a mano y nadie confiaba del todo en los números.",
      en: "Sales, inventory and CRM lived in separate systems. Reports were assembled by hand and nobody entirely trusted the numbers.",
    },
    solution: {
      es: "Diseñé pipelines ETL con Python, Airflow y dbt que procesan millones de registros diarios hacia Snowflake y BigQuery, sobre un warehouse con esquemas estrella y copo de nieve, más dashboards en Power BI y alertas automáticas.",
      en: "I designed ETL pipelines with Python, Airflow and dbt processing millions of daily records into Snowflake and BigQuery, over a warehouse using star and snowflake schemas, plus Power BI dashboards and automated alerting.",
    },
    outcome: {
      es: "50% menos tiempo de carga y 95% de confiabilidad en reportes.",
      en: "50% faster load times and 95% report reliability.",
    },
    stack: [
      "Python",
      "Apache Airflow",
      "dbt",
      "Snowflake",
      "BigQuery",
      "Power BI",
    ],
  },
  {
    id: "casera",
    title: {
      es: "Casera: cuaderno digital para mercados",
      en: "Casera: digital ledger for market vendors",
    },
    client: { es: "Producto propio", en: "My own product" },
    category: "product",
    year: "2026",
    featured: true,
    problem: {
      es: "Las vendedoras de los mercados de Santa Cruz llevan ventas, gastos y fiado en un cuaderno de papel. Si el cuaderno se pierde o se moja, se pierde el negocio.",
      en: "Market vendors in Santa Cruz track sales, expenses and customer credit in a paper notebook. If the notebook is lost or ruined, the business goes with it.",
    },
    solution: {
      es: "Una PWA offline-first pensada para teléfonos Android baratos, centrada en el fiado: quién debe, cuánto y desde cuándo. Sin cuenta, sin internet obligatorio.",
      en: "An offline-first PWA built for cheap Android phones, centred on customer credit: who owes, how much, and since when. No account, no internet required.",
    },
    stack: ["React", "Vite", "PWA", "TypeScript", "Supabase"],
  },
  {
    id: "mesa-abierta",
    title: {
      es: "Mesa Abierta: mesas de juego por asiento",
      en: "Mesa Abierta: board game tables by the seat",
    },
    client: { es: "Producto propio", en: "My own product" },
    category: "product",
    year: "2026",
    featured: false,
    problem: {
      es: "Los locales de juegos de mesa solo alquilan mesas a grupos que ya llegan armados. Quien quiere jugar y no tiene grupo se queda afuera.",
      en: "Board game venues only rent tables to groups that arrive together. Anyone who wants to play without a group has nowhere to sit.",
    },
    solution: {
      es: "Plataforma multi-local donde jugadores solos reservan un asiento en una mesa abierta, los grupos reservan la mesa completa y el local administra la operación.",
      en: "A multi-venue platform where solo players claim a single seat at an open table, groups book the whole table, and the venue runs the operation.",
    },
    stack: ["React", "TypeScript", "Supabase", "Vite", "Vercel"],
  },
  {
    id: "us-ecommerce",
    title: {
      es: "Automatización de operaciones e-commerce",
      en: "E-commerce operations automation",
    },
    client: {
      es: "Cliente en EE. UU.: juguetes y artículos deportivos",
      en: "US client: toys and sports accessories",
    },
    category: "automation",
    year: "2023",
    featured: false,
    problem: {
      es: "Operación de e-commerce con tareas repetitivas entre tienda, proveedores y atención al cliente, y una presencia web desactualizada.",
      en: "An e-commerce operation with repetitive work spread across the store, suppliers and customer service, plus an outdated web presence.",
    },
    solution: {
      es: "Construí flujos de automatización en n8n para las tareas repetitivas y renové su presencia web. Todo el proyecto se gestionó en inglés, de punta a punta.",
      en: "I built n8n automation workflows for the repetitive work and refreshed their web presence. The entire engagement was run in English, end to end.",
    },
    stack: ["n8n", "REST APIs", "JavaScript", "VPS Linux"],
  },
  {
    id: "us-home-automation",
    title: {
      es: "CRM y landing pages para domótica",
      en: "CRM workflows and landing pages for home automation",
    },
    client: {
      es: "Cliente en EE. UU.: cortinas y ventanas automatizadas",
      en: "US client: automated curtains and window systems",
    },
    category: "automation",
    year: "2024",
    featured: false,
    problem: {
      es: "Equipo de ventas sin seguimiento estructurado y sin páginas de captura para sus campañas.",
      en: "A sales team with no structured follow-up and no capture pages behind their campaigns.",
    },
    solution: {
      es: "Configuré los flujos del CRM y desarrollé las landing pages que sostienen la operación de ventas.",
      en: "I configured the CRM workflows and built the landing pages supporting their sales operation.",
    },
    stack: ["GoHighLevel", "REST APIs", "HTML/CSS", "JavaScript"],
  },
  {
    id: "angie-spa",
    title: {
      es: "Angie Spa: identidad y sitio web",
      en: "Angie Spa: identity and website",
    },
    client: {
      es: "Centro de detox corporal, Santa Cruz",
      en: "Body detox studio, Santa Cruz",
    },
    category: "web",
    year: "2026",
    featured: false,
    problem: {
      es: "Un centro de detox sin presencia web propia, compitiendo con perfiles de Instagram genéricos.",
      en: "A detox studio with no web presence of its own, competing against generic Instagram profiles.",
    },
    solution: {
      es: "Diseño original con identidad editorial, paleta de selva tropical y el menú real de tratamientos, con contacto directo por WhatsApp.",
      en: "An original design with an editorial identity, tropical-jungle palette and the real treatment menu, with direct WhatsApp contact.",
    },
    stack: ["HTML5", "CSS3", "JavaScript"],
  },
  {
    id: "local-business-sites",
    title: {
      es: "Sitios para negocios locales",
      en: "Local business websites",
    },
    client: {
      es: "Barberías, gimnasios y centros de bienestar",
      en: "Barbershops, gyms and wellness studios",
    },
    category: "web",
    year: "2026",
    featured: false,
    problem: {
      es: "Negocios de servicios que dependen enteramente de Instagram y pierden reservas fuera de horario.",
      en: "Service businesses that depend entirely on Instagram and lose bookings outside opening hours.",
    },
    solution: {
      es: "Sitios rápidos y hechos a medida con reserva por WhatsApp, pensados para verse bien en el teléfono barato de un cliente real.",
      en: "Fast, made-to-measure sites with WhatsApp booking, built to look right on a real customer's cheap phone.",
    },
    stack: ["HTML5", "CSS3", "JavaScript"],
  },
];

/* ─────────────────────────────── Services ───────────────────────────── */

export type Service = {
  id: string;
  title: I18nString;
  description: I18nString;
  deliverables: { es: string[]; en: string[] };
};

export const SERVICES: Service[] = [
  {
    id: "automation",
    title: {
      es: "Automatización de procesos",
      en: "Process automation",
    },
    description: {
      es: "Identifico dónde tu equipo pierde horas en trabajo repetitivo y lo reemplazo con flujos que corren solos.",
      en: "I find where your team loses hours to repetitive work and replace it with workflows that run on their own.",
    },
    deliverables: {
      es: [
        "Mapa del proceso actual y dónde se pierde el tiempo",
        "Flujos en n8n o Airflow, documentados",
        "Integraciones por API entre tus sistemas actuales",
        "Monitoreo con alertas cuando algo falla",
      ],
      en: [
        "A map of the current process and where the time goes",
        "Documented workflows in n8n or Airflow",
        "API integrations between the systems you already use",
        "Monitoring with alerts when something breaks",
      ],
    },
  },
  {
    id: "data",
    title: {
      es: "Ingeniería de datos",
      en: "Data engineering",
    },
    description: {
      es: "Llevo tus datos dispersos a un solo lugar confiable, para que los reportes dejen de ser una discusión.",
      en: "I bring your scattered data into one reliable place, so reports stop being an argument.",
    },
    deliverables: {
      es: [
        "Pipelines ETL/ELT en Python, Airflow y dbt",
        "Data warehouse con modelado dimensional",
        "Limpieza, normalización y reglas de validación",
        "Dashboards en Power BI sobre datos en los que se puede confiar",
      ],
      en: [
        "ETL/ELT pipelines in Python, Airflow and dbt",
        "A data warehouse with proper dimensional modelling",
        "Cleansing, normalization and validation rules",
        "Power BI dashboards on numbers you can actually trust",
      ],
    },
  },
  {
    id: "ai",
    title: {
      es: "Integración de IA y LLMs",
      en: "AI and LLM integration",
    },
    description: {
      es: "Conecto modelos de lenguaje a procesos reales de negocio. No un chatbot de adorno: trabajo que antes hacía una persona.",
      en: "I wire language models into real business processes. Not a decorative chatbot: work a person used to do by hand.",
    },
    deliverables: {
      es: [
        "Agentes conectados a tus sistemas reales, no a una demo",
        "Clasificación, extracción y resumen de información",
        "Integración con OpenAI, Claude y LangChain",
        "Controles de costo y límites de uso",
      ],
      en: [
        "Agents wired into your real systems, not a demo",
        "Classification, extraction and summarization",
        "Integration with OpenAI, Claude and LangChain",
        "Cost controls and usage limits",
      ],
    },
  },
  {
    id: "web",
    title: {
      es: "Desarrollo web y APIs",
      en: "Web development and APIs",
    },
    description: {
      es: "Aplicaciones y sitios que cargan rápido, funcionan en teléfonos baratos y se conectan con el resto de tu operación.",
      en: "Applications and sites that load fast, work on cheap phones and connect to the rest of your operation.",
    },
    deliverables: {
      es: [
        "Frontends en React o Next.js",
        "APIs REST en FastAPI o Django",
        "Bases de datos PostgreSQL o Supabase",
        "Despliegue en VPS o Vercel con Docker",
      ],
      en: [
        "Frontends in React or Next.js",
        "REST APIs in FastAPI or Django",
        "PostgreSQL or Supabase databases",
        "Deployment to VPS or Vercel with Docker",
      ],
    },
  },
];

/* ──────────────────────────────── Skills ────────────────────────────── */

export const SKILL_GROUPS = [
  {
    id: "automation",
    label: { es: "Automatización y flujos", en: "Automation & workflows" },
    items: [
      "n8n",
      "Apache Airflow",
      "Make",
      "LangChain",
      "Puppeteer",
      "REST APIs",
      "Webhooks",
    ],
  },
  {
    id: "data",
    label: { es: "Ingeniería de datos", en: "Data engineering" },
    items: [
      "Python",
      "SQL",
      "Pandas",
      "dbt",
      "SQLAlchemy",
      "ETL/ELT",
      "Modelado dimensional",
      "Power BI",
    ],
  },
  {
    id: "databases",
    label: { es: "Bases de datos", en: "Databases" },
    items: [
      "PostgreSQL",
      "Snowflake",
      "BigQuery",
      "MongoDB",
      "Supabase",
      "MySQL",
    ],
  },
  {
    id: "development",
    label: { es: "Desarrollo", en: "Development" },
    items: [
      "Python",
      "JavaScript (ES6+)",
      "Node.js",
      "React",
      "Next.js",
      "Django",
      "FastAPI",
    ],
  },
  {
    id: "infra",
    label: { es: "Infraestructura y DevOps", en: "Infrastructure & DevOps" },
    items: ["Docker", "Docker Compose", "VPS/Linux", "Git", "AWS", "Contabo"],
  },
  {
    id: "ai",
    label: { es: "IA y LLMs", en: "AI & LLMs" },
    items: [
      "OpenAI API",
      "Claude API",
      "LangChain",
      "Flowise",
      "Hugging Face",
    ],
  },
] as const;

/* ───────────────────────── Education & learning ─────────────────────── */

export const EDUCATION = {
  degree: {
    es: "Ingeniería Informática",
    en: "Computer Engineering",
  },
  institution: {
    es: "Universidad Gabriel René Moreno, Santa Cruz, Bolivia",
    en: "Gabriel René Moreno University, Santa Cruz, Bolivia",
  },
} as const;

export const CERTIFICATIONS = [
  { name: "Python & Django", issuer: "Udemy" },
  { name: "Python Programming", issuer: "Academia X" },
  { name: "JavaScript ES6+", issuer: "Academia X" },
  { name: "React.js Development", issuer: "Academia X" },
  { name: "HTML5 & CSS3", issuer: "Academia X" },
  { name: "SQL & Database Management", issuer: "Academia X" },
] as const;

export const LANGUAGES = [
  {
    name: { es: "Español", en: "Spanish" },
    level: { es: "Nativo", en: "Native" },
  },
  {
    name: { es: "Inglés", en: "English" },
    level: {
      es: "C1, competencia profesional completa",
      en: "C1, full professional proficiency",
    },
  },
] as const;


/* ─────────────────────── Header work index ──────────────────────── */

/**
 * The four entries listed down the right of the header, numbered 01 to 04.
 *
 * The reference this layout comes from leads with the client name and puts
 * the nature of the job underneath, so that is the split here: `name` is who
 * it was for (or the product name, where the product is his own) and `desc`
 * is what the thing actually is. Kept separate from PROJECTS because the
 * full project titles are too long to set at header scale.
 */
export const HEADER_WORK: {
  id: string;
  name: string;
  desc: I18nString;
}[] = [
  {
    id: "lead-automation",
    name: "Group Quimera",
    desc: {
      es: "Motor de leads por WhatsApp",
      en: "WhatsApp lead engine",
    },
  },
  {
    id: "data-warehouse",
    name: "Gerona SVF",
    desc: {
      es: "Data warehouse y ETL",
      en: "Data warehouse and ETL",
    },
  },
  {
    id: "casera",
    name: "Casera",
    desc: {
      es: "Cuaderno digital para mercados",
      en: "Digital ledger for market vendors",
    },
  },
  {
    id: "mesa-abierta",
    name: "Mesa Abierta",
    desc: {
      es: "Mesas de juego por asiento",
      en: "Board game tables by the seat",
    },
  },
];

/* ─────────────────────────────── Helpers ────────────────────────────── */

/** Narrow an arbitrary next-intl locale to the two this content supports. */
export function toLocale(locale: string): Locale {
  return locale === "en" ? "en" : "es";
}

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
