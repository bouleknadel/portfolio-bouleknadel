// Language-independent data (names, links, tech labels) lives at the top level.
// Everything that is displayed as prose lives in `content.en` / `content.fr`.

import {
  SiAngular, SiApachekafka, SiApachespark, SiDocker, SiDotnet, SiFastapi, SiFlutter, SiGitlab,
  SiGooglegemini, SiJavascript, SiLangchain, SiLanggraph, SiLaravel, SiModelcontextprotocol,
  SiMongodb, SiMysql, SiN8N, SiNeo4J, SiNextdotjs, SiNodedotjs, SiPostgresql, SiPython,
  SiPytorch, SiReact, SiSpringboot, SiTensorflow, SiTypescript,
} from "react-icons/si";
import { FaAws, FaJava } from "react-icons/fa";
import { GrOracle } from "react-icons/gr";
import { RiOpenaiFill } from "react-icons/ri";

const BASE = import.meta.env.BASE_URL;

// Single source for the profile photo (navbar, about section).
export const profilePhoto = `${BASE}profile.jpg`;

// Each page is a separate HTML entry (see vite.config.js), so links are plain URLs.
export const routes = {
  home: BASE,
  projects: `${BASE}projects/`,
  certifications: `${BASE}certifications/`,
};

export const contactInfo = {
  firstName: "Abderrahmane",
  lastName: "Bouleknadel",
  email: "bouleknadelabderrahmane33@gmail.com",
  linkedin: "https://www.linkedin.com/in/abderrahmane-bouleknadel-55700b25b/",
  github: "https://github.com/bouleknadel",
};

const cvFiles = {
  backend: `${BASE}cv/CV_Bouleknadel_Backend_FullStack.pdf`,
  genai: `${BASE}cv/CV_Bouleknadel_IA_Generative.pdf`,
};

// Issuer logos for certifications: official brand icons when react-icons has one,
// otherwise a styled initials badge (`short`).
export const issuers = {
  AWS: { icons: [FaAws], bg: "#232F3E", fg: "#FF9900" },
  Oracle: { icons: [GrOracle], bg: "#C74634", fg: "#fff" },
  OpenClassrooms: { short: "OC", bg: "#7451EB", fg: "#fff" },
  "MOOC Gestion de Projet": { short: "GdP", bg: "#0e7490", fg: "#ecfeff" },
};

// Official certificate titles are kept verbatim (not translated).
// `featured` ones appear on the home page; the full list lives on /certifications/.
const certificationList = [
  { name: "AWS Academy Graduate – AWS Academy Cloud Architecting", issuer: "AWS", date: "2025-05", featured: 1, url: "https://www.credly.com/badges/7a37df0d-7ccf-49f4-af92-f72c0228233b/public_url" },
  { name: "Oracle Certified Professional: Java SE 17 Developer", issuer: "Oracle", date: "2025-02", featured: 2, url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=D675A20962294321CC9DE67F611CF18DF65818FDC51608E2B1FD3680E8EA6264" },
  { name: "Oracle Cloud Infrastructure 2024 Certified DevOps Professional", issuer: "Oracle", date: "2025-02", expires: "2027-02", featured: 3, url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=9213871BD700BA5173BBC3FC946DBD0D0CC771DF07B9F91D851B4C6B22CA42E7" },
  { name: "Spécialisation Gestion de projet agile avec Scrum", issuer: "MOOC Gestion de Projet", date: "2025-12", featured: 4, url: "https://moocgdp.gestiondeprojet.pm/certificates/e22ee79d1aff4ea09c5e092f055712fe" },
  { name: "Spécialisation Introduction aux principaux outils de TRIZ", issuer: "MOOC Gestion de Projet", date: "2025-12", url: "https://moocgdp.gestiondeprojet.pm/certificates/8b7b5329f71b43f1ba8315bd6fdef8e3" },
  { name: "Attestation session 26 — Parcours Classique", issuer: "MOOC Gestion de Projet", date: "2025-12", url: "https://certification.gestiondeprojet.pm/GdP26AP/GdP26PC-BoRVnIexA.pdf" },
  { name: "AWS Academy Graduate – AWS Academy Cloud Developing", issuer: "AWS", date: "2025-04", url: "https://www.credly.com/badges/a17d613b-5fa3-4a81-97b8-c598aac5db42/public_url" },
  { name: "AWS Academy Graduate – AWS Academy Cloud Foundations", issuer: "AWS", date: "2025-04", url: "https://www.credly.com/badges/f3a2b39d-5346-4b45-b254-9f059cd9f3d4/linked_in_profile" },
  { name: "Create Web Page Layouts With CSS", issuer: "OpenClassrooms", date: "2023-02" },
  { name: "Apprenez à programmer avec JavaScript", issuer: "OpenClassrooms", date: "2023-01" },
  { name: "Créez votre site web avec HTML5 et CSS3", issuer: "OpenClassrooms", date: "2023-01" },
  { name: "Apprenez à programmer en Java", issuer: "OpenClassrooms", date: "2022-11" },
];

// "2025-05" → "May 2025" / "mai 2025"
export function formatMonth(iso, lang) {
  const [y, m] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat(lang, { month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(y, m - 1, 1))
  );
}

// `icons`: official logos (Simple Icons first; other react-icons brand packs for
// brands Simple Icons no longer ships: Java, AWS, Oracle, OpenAI).
// `short` is only a fallback for technologies with no official icon.
const skillItems = {
  ai: [
    { label: "LangChain", icons: [SiLangchain], bg: "#1C3C3C", fg: "#3fcf8e" },
    { label: "LangGraph", icons: [SiLanggraph], bg: "#1C3C3C", fg: "#3fcf8e" },
    { label: "RAG", short: "RAG", bg: "#312e81", fg: "#c7d2fe" },
    { label: "MCP", icons: [SiModelcontextprotocol], bg: "#312e81", fg: "#fff" },
    { label: "LangSmith", short: "LS", bg: "#1C3C3C", fg: "#3fcf8e" },
    { label: "OpenAI / Gemini API", icons: [RiOpenaiFill, SiGooglegemini], bg: "#10a37f", fg: "#fff" },
    { label: "ChromaDB", short: "Chr", bg: "#6c5ce7", fg: "#fff" },
    { label: "n8n", icons: [SiN8N], bg: "#ea4b71", fg: "#fff" },
  ],
  backend: [
    { label: "Python", icons: [SiPython], bg: "#3776AB", fg: "#FFD43B" },
    { label: "Java", icons: [FaJava], bg: "#f89820", fg: "#1a1200" },
    { label: "TypeScript", icons: [SiTypescript], bg: "#3178C6", fg: "#fff" },
    { label: "JavaScript", icons: [SiJavascript], bg: "#F7DF1E", fg: "#1a1200" },
    { label: "C# / .NET", icons: [SiDotnet], bg: "#512BD4", fg: "#fff" },
    { label: "Spring Boot", icons: [SiSpringboot], bg: "#6DB33F", fg: "#fff" },
    { label: "FastAPI", icons: [SiFastapi], bg: "#009688", fg: "#fff" },
    { label: "Node.js", icons: [SiNodedotjs], bg: "#339933", fg: "#fff" },
    { label: "Laravel", icons: [SiLaravel], bg: "#FF2D20", fg: "#fff" },
  ],
  frontend: [
    { label: "React", icons: [SiReact], bg: "#0a1a2e", fg: "#61DAFB", border: "#61DAFB" },
    { label: "Angular", icons: [SiAngular], bg: "#DD0031", fg: "#fff" },
    { label: "Next.js", icons: [SiNextdotjs], bg: "#000000", fg: "#fff", border: "#333" },
    { label: "Flutter", icons: [SiFlutter], bg: "#02569B", fg: "#fff" },
    { label: "React Native", icons: [SiReact], bg: "#0a1a2e", fg: "#61DAFB", border: "#61DAFB" },
  ],
  data: [
    { label: "Docker", icons: [SiDocker], bg: "#2496ED", fg: "#fff" },
    { label: "GitLab CI/CD", icons: [SiGitlab], bg: "#FC6D26", fg: "#fff" },
    { label: "AWS", icons: [FaAws], bg: "#232F3E", fg: "#FF9900" },
    { label: "PostgreSQL", icons: [SiPostgresql], bg: "#336791", fg: "#fff" },
    { label: "MySQL", icons: [SiMysql], bg: "#4479A1", fg: "#fff" },
    { label: "MongoDB", icons: [SiMongodb], bg: "#47A248", fg: "#fff" },
    { label: "Neo4j", icons: [SiNeo4J], bg: "#018BFF", fg: "#fff" },
    { label: "Kafka / Spark", icons: [SiApachekafka, SiApachespark], bg: "#231F20", fg: "#e8803a", border: "#e8803a" },
    { label: "TensorFlow / PyTorch", icons: [SiTensorflow, SiPytorch], bg: "#FF6F00", fg: "#fff" },
  ],
};

// All projects, in display order. `featured` ones (max 5) are shown as case
// studies on the home page; every project is listed on /projects/.
// To add a project: append an entry here + its prose in `en.projects` / `fr.projects`.
// `repo` is null when the code is private or not public yet.
const projectMeta = [
  { key: "construction", title: "AI Construction Assistant", year: "2026", featured: true, repo: null, stack: ["LangChain", "LangGraph", "FastAPI", "ChromaDB", "Groq", "OpenAI / Gemini", "LangSmith", "n8n"] },
  { key: "devpilot", title: "DevPilot", year: "2026", featured: true, repo: null, stack: ["Python", "LangGraph", "MCP", "Docker", "GitHub API"] },
  { key: "enviscan", title: "EnviScan+", year: null, featured: true, repo: "https://github.com/bouleknadel/EnviScanPlus", stack: ["Android", "TensorFlow Lite", "ARCore", "Spring Boot", "Spring AI"] },
  { key: "reskif", title: "Reskif", year: "2026", featured: true, repo: null, stack: ["Matrix / Synapse", "Docker", "Caddy", "PostgreSQL", "React"] },
  { key: "iti", title: "ITI Training Chatbot", year: "2025", featured: false, repo: null, stack: ["Python", "Embeddings", "Vector store", "XML/XSLT", "GitLab Pages"] },
  { key: "devtracker", title: "DevProductivityTracker", year: "2025", featured: false, repo: "https://github.com/bouleknadel/DevProductivityTracker", stack: ["VS Code API", "Spring Boot", "REST"] },
  { key: "exammaster", title: "ExamMaster", year: null, featured: false, repo: null, stack: ["Java", "Spring Boot", "Spring Security"] },
  { key: "elearning", title: { en: "Online Training Platform", fr: "Plateforme de Formation en Ligne" }, year: null, featured: false, repo: null, stack: ["Laravel", "MySQL"] },
  { key: "oracledist", title: { en: "Distributed Databases on Oracle Servers", fr: "Gestion de Bases de Données Distribuées sur des Serveurs Oracle" }, year: null, featured: false, repo: null, stack: ["Oracle"] },
];

const MAX_FEATURED_PROJECTS = 5;

const navHrefs = ["#home", "#about", "#experience", "#projects", "#skills", "#contact"];

const en = {
  lang: "en",
  nav: {
    links: ["Home", "About", "Experience", "Projects", "Skills", "Contact"],
    cta: "Get in touch",
    langLabel: "Language",
    backHome: "Back to home",
  },
  profile: {
    title: "Software Engineer",
    subtitle: "Generative AI & Full-Stack Developer",
    tagline:
      "I design and ship intelligent, production-grade software — from autonomous AI agents and RAG pipelines to robust full-stack applications.",
    location: "Rouen, France",
    availability: "Available for a 6-month final-year internship starting January 2027.",
    bioParagraphs: [
      "I'm a final-year engineering student at INSA Rouen Normandie, completing a double degree with ENSA El Jadida (Morocco). My work sits at the intersection of Generative AI and solid software engineering: I don't just prototype — I take ideas all the way to production.",
      "During my latest internship, I built a RAG assistant to help field teams retrieve information from technical documents. I've also designed autonomous agents with LangChain and LangGraph, and shipped secure, scalable backend systems in Java and Python across four internships. One of my research projects was even published in Elsevier SoftwareX.",
      "I care about clean architecture, rigorous evaluation and real user impact — not just demos that work once. When I'm not coding, I'm usually exploring the latest in agentic AI, sketching, or on a football pitch.",
    ],
  },
  hero: {
    viewWork: "View my work",
    contact: "Get in touch",
    scroll: "Scroll ↓",
  },
  about: {
    eyebrow: "About me",
    title: ["Engineer by training,", "builder by nature."],
    education: "Education",
    certifications: "Certifications",
  },
  cv: {
    button: "Download CV",
    options: { backend: "CV — Backend & Full-Stack", genai: "CV — Generative AI" },
    hint: "PDF · French",
  },
  certificationsPage: {
    eyebrow: "Certifications",
    title: ["Certified, and", "verifiable."],
    intro: "Every certificate below links to its official verification page when the issuer provides one.",
    viewAll: (n) => `View all certifications (${n}) →`,
    verify: "Verify",
    noLink: "No public link",
    expires: "expires",
    columns: { date: "Date", name: "Certification", issuer: "Issuer" },
    docTitle: "Certifications — Abderrahmane Bouleknadel",
  },
  experienceSection: {
    eyebrow: "Experience",
    title: ["Four internships,", "one obsession: shipping."],
  },
  projectsSection: {
    eyebrow: "Selected work",
    title: ["Projects I'm", "proud to show."],
    viewArchive: (n) => `View full project archive (${n}) →`,
    labels: {
      problem: "Problem",
      role: "My role",
      decisions: "Key technical decisions",
      result: "Result",
      code: "Code",
      private: "Private code",
    },
  },
  archive: {
    eyebrow: "Archive",
    title: ["All projects,", "in detail."],
    intro: "Every project I've built, each with the problem, my role and the decisions behind it. Click a row to open its case study.",
    columns: { year: "Year", project: "Project", context: "Context", stack: "Built with", link: "Link" },
    docTitle: "Project archive — Abderrahmane Bouleknadel",
  },
  aiSection: {
    eyebrow: "How I build AI products",
    title: ["Beyond the demo:", "measured, observable, safe."],
    seenIn: "Applied in",
    points: [
      { title: "Evaluate before shipping", body: "RAG pipelines get a test set validated by the business team; I iterate on retrieval and prompts against it instead of eyeballing answers.", projects: ["AI Construction Assistant"] },
      { title: "Keep LLM costs in check", body: "Retrieve → rerank → send only the top chunks, so prompts stay small. The model provider (Groq, OpenAI, Gemini) sits behind one interface and can be swapped without rewriting the pipeline.", projects: ["AI Construction Assistant"] },
      { title: "Make it observable", body: "Each step — retrieval, reranking, generation — is traced in LangSmith, so a bad answer can be traced back to a missing document or a weak prompt.", projects: ["AI Construction Assistant"] },
      { title: "Guardrails by design", body: "Answers are grounded on retrieved sources only, and agent-generated code runs in an isolated Docker sandbox — never on the host.", projects: ["DevPilot", "AI Construction Assistant", "ITI Training Chatbot"] },
    ],
  },
  skillsSection: {
    eyebrow: "Tech stack",
    title: ["Tools I reach for", "every day."],
  },
  contact: {
    eyebrow: "Get in touch",
    title: ["Let's build something", "great together."],
    body: "Whether it's an internship opportunity or just a conversation about AI agents — my inbox is open.",
    send: "Send me a message",
    mailSubject: "Internship opportunity",
  },
  footer: {
    builtWith: "Built with React, Three.js & a lot of coffee.",
  },
  education: [
    { school: "INSA Rouen Normandie", degree: "Engineering Degree, Computer Science & IT (Double Degree)", period: "2025 – Present", location: "Rouen, France" },
    { school: "ENSA El Jadida", degree: "Engineering Degree, Computer Engineering", period: "2023 – 2025", location: "El Jadida, Morocco" },
    { school: "Faculté des Sciences et Techniques de Settat", degree: "Bachelor's Degree, Computer Engineering", period: "2022 – 2023", location: "Settat, Morocco" },
  ],
  languages: [
    { name: "Arabic", level: "Native" },
    { name: "French", level: "Fluent" },
    { name: "English", level: "Intermediate / Professional" },
  ],
  strengths: [
    { title: "Generative AI & Agents", description: "RAG pipelines, LLM orchestration, autonomous agents (LangChain, LangGraph, MCP) with memory & reasoning." },
    { title: "Backend Engineering", description: "Secure, scalable APIs and microservices in Java/Spring Boot, Python/FastAPI, Node.js and .NET." },
    { title: "Full-Stack Applications", description: "End-to-end web & mobile products with React, Angular, Next.js and Flutter." },
    { title: "Cloud & DevOps", description: "Docker, CI/CD pipelines, AWS — shipping software that's actually deployable." },
  ],
  skillGroupLabels: {
    ai: "Generative AI & Agents",
    backend: "Languages & Backend",
    frontend: "Frontend & Mobile",
    data: "Data, Cloud & DevOps",
  },
  projects: {
    construction: {
      tag: "GenAI · RAG",
      status: "In production",
      context: "Internship — Bouzid et Fils",
      problem: "Construction field teams spent up to 4 hours digging through 400+ technical documents to find a single piece of information.",
      role: "Generative AI / backend intern — I designed and shipped the RAG pipeline and its FastAPI service end to end.",
      decisions: [
        "Ingestion → embeddings → ChromaDB index, with a reranking step so only the most relevant chunks reach the LLM.",
        "LangGraph to orchestrate retrieval and generation; Groq or OpenAI/Gemini behind the same interface.",
        "Iterative prompt engineering, n8n workflows to harden the chain, LangSmith to trace and evaluate it.",
      ],
      result: "Lookup time cut from 4 h to 20 min · >85% of answers rated relevant by business teams.",
    },
    devpilot: {
      tag: "AI Agent",
      status: "In progress",
      context: "AI project",
      problem: "Code review and unit-test writing are slow, repetitive bottlenecks on every pull request.",
      role: "Sole developer — agent design, MCP integration and sandboxed execution.",
      decisions: [
        "GitHub connected through the Model Context Protocol (MCP), so the agent's tools stay standard and swappable.",
        "LangGraph workflow: analyse the PR → generate unit tests → run them → post a review comment.",
        "Generated tests execute in an isolated Docker container — LLM-written code never runs on the host.",
      ],
      result: "End-to-end flow working from PR analysis to an automated review comment.",
    },
    enviscan: {
      tag: "Computer Vision",
      status: "Published",
      context: "Academic project — Elsevier SoftwareX",
      problem: "Make plant identification instant and understandable for non-experts, straight from a phone camera.",
      role: "Developer on the Android app and the Spring Boot / Spring AI backend, through to the scientific publication.",
      decisions: [
        "On-device TensorFlow Lite model for real-time recognition without a server round-trip.",
        "ARCore overlays to display results directly on the plant.",
        "Spring Boot / Spring AI backend powering a bilingual FR/EN chatbot.",
      ],
      result: "Published in Elsevier SoftwareX after a rigorous evaluation protocol.",
    },
    reskif: {
      tag: "Decentralized Systems",
      status: "2026 – present",
      context: "INSA Rouen engineering project (PIC) — team",
      problem: "Build a community messaging platform that doesn't depend on a single central server.",
      role: "Quality & Git lead and backend developer in the student team.",
      decisions: [
        "Matrix protocol with federation across several Synapse homeservers.",
        "Docker + Caddy + PostgreSQL for a reproducible, self-hosted stack.",
        "React frontend on matrix-js-sdk for accounts and real-time messaging.",
      ],
      result: "Federated homeservers exchanging messages in real time; I own the team's Git workflow and quality process.",
    },
    iti: {
      tag: "Conversational AI",
      status: "2025",
      context: "Academic project",
      problem: "A large training catalogue structured in XML/XSLT could only be browsed, not queried in natural language.",
      role: "Developer — data pipeline, RAG chatbot and deployment.",
      decisions: [
        "Scraping and text cleaning of the XML/XSLT catalogue before chunking.",
        "Embeddings in a vector store; the LLM answers from retrieved passages only.",
        "Static deployment on GitLab Pages.",
      ],
      result: null,
    },
    devtracker: {
      tag: "Dev Tooling",
      status: "2025",
      context: "Academic project",
      problem: "Development teams lack objective signals on where developer time actually goes.",
      role: "Developer — VS Code extension and Spring Boot backend.",
      decisions: [
        "VS Code Extension API to collect activity metrics without leaving the editor.",
        "Spring Boot REST API to collect and analyse the metrics.",
        "AI-assisted insights computed server-side for the team.",
      ],
      result: null,
    },
    exammaster: {
      tag: "Full-Stack",
      status: "Academic",
      context: "Academic project",
      problem: "Managing and scheduling exams by hand is slow and error-prone.",
      role: "Full-stack developer.",
      decisions: [
        "Spring Boot application secured with Spring Security.",
        "Role management and authentication for each type of user.",
        "An integrated intelligent assistant inside the app.",
      ],
      result: null,
    },
    elearning: {
      tag: "Web App",
      status: "Academic",
      context: "Academic project",
      problem: "Training organisations need one place to manage their courses and follow each learner's progress, instead of scattered files and spreadsheets.",
      role: "Developer — data model, back office and learner-facing pages.",
      decisions: [
        "Laravel MVC with Eloquent models for trainings, courses, learners and enrolments.",
        "Relational MySQL schema so that progress tracking stays consistent across courses.",
        "Separate spaces for administrators (manage trainings and courses) and learners (follow their progress).",
      ],
      result: null,
    },
    oracledist: {
      tag: "Databases",
      status: "Academic",
      context: "Academic project",
      problem: "Spread one database across several Oracle servers while keeping queries transparent for the application.",
      role: "Designed the distribution scheme and implemented it across the servers.",
      decisions: [
        "Horizontal and vertical fragmentation of tables according to where the data is used.",
        "Replication of shared data between sites to keep reads local.",
        "Database links between servers to run distributed queries over the fragments.",
      ],
      result: null,
    },
  },
  experience: [
    {
      role: "Generative AI / Backend Developer Intern",
      company: "Bouzid et Fils",
      location: "El Jadida, Morocco",
      period: "June – August 2026",
      highlights: [
        "Designed and shipped a production RAG assistant (LangChain, LangGraph, Groq, OpenAI/Gemini API) for exploiting technical construction documents — ingestion, embeddings, ChromaDB vector indexing (400+ documents), reranked retrieval and grounded generation.",
        "Built a FastAPI service for automatic report synthesis, cutting document lookup time from 4 hours to 20 minutes for field teams.",
        "Iterated on prompt engineering and set up n8n automation workflows to harden the processing pipeline.",
        "Monitored and evaluated the pipeline with LangSmith, reaching a relevance rate above 85% on business-validated test cases.",
      ],
    },
    {
      role: "Full-Stack / Backend Developer Intern",
      company: "Harmony",
      location: "Rabat, Morocco",
      period: "July – August 2025",
      highlights: [
        "Built a cross-platform mobile app (Flutter) connected to a Spring Boot backend, with JWT authentication and two-factor authentication (2FA).",
        "Designed REST APIs for real-time data synchronization between users, with fine-grained role and permission management.",
        "Optimized critical endpoints, reducing average response time by 30% on synchronization operations.",
      ],
    },
    {
      role: "Web Developer Intern",
      company: "Wimtech",
      location: "Rabat, Morocco",
      period: "June – July 2024",
      highlights: [
        "Designed and developed microservices (Spring Boot, Angular, Next.js) for a website & e-commerce generation platform.",
        "Integrated the Angular frontend with backend microservices, including authentication and session management.",
        "Contributed to the API-oriented backend architecture and established code review best practices.",
      ],
    },
    {
      role: "Web Developer Intern",
      company: "SA Express Maroc SARL",
      location: "Salé, Morocco",
      period: "April – June 2023",
      highlights: [
        "Built a residential community management web application (Laravel, MySQL, Bootstrap, Ajax, jQuery).",
        "Implemented CRUD features and an administration interface for community managers.",
      ],
    },
  ],
};

const fr = {
  lang: "fr",
  nav: {
    links: ["Accueil", "À propos", "Expérience", "Projets", "Compétences", "Contact"],
    cta: "Me contacter",
    langLabel: "Langue",
    backHome: "Retour à l'accueil",
  },
  profile: {
    title: "Ingénieur logiciel",
    subtitle: "Développeur IA générative & Full-Stack",
    tagline:
      "Je conçois et déploie des logiciels intelligents prêts pour la production — des agents IA autonomes et pipelines RAG aux applications full-stack robustes.",
    location: "Rouen, France",
    availability: "Disponible pour un stage de fin d'études de 6 mois à partir de janvier 2027.",
    bioParagraphs: [
      "Élève ingénieur en dernière année à l'INSA Rouen Normandie, en double diplôme avec l'ENSA El Jadida (Maroc). Mon travail se situe à la croisée de l'IA générative et d'un génie logiciel solide : je ne me contente pas de prototyper — j'emmène les idées jusqu'en production.",
      "Lors de mon dernier stage, j'ai développé un assistant RAG permettant aux équipes terrain de retrouver facilement des informations dans des documents techniques. J'ai aussi conçu des agents autonomes avec LangChain et LangGraph, et livré des systèmes backend sécurisés et scalables en Java et Python au fil de quatre stages. L'un de mes projets de recherche a même été publié dans Elsevier SoftwareX.",
      "J'attache de l'importance à une architecture propre, à une évaluation rigoureuse et à un réel impact pour les utilisateurs — pas seulement à des démos qui fonctionnent une fois. Quand je ne code pas, j'explore les dernières avancées de l'IA agentique, je dessine ou je suis sur un terrain de foot.",
    ],
  },
  hero: {
    viewWork: "Voir mes projets",
    contact: "Me contacter",
    scroll: "Défiler ↓",
  },
  about: {
    eyebrow: "À propos de moi",
    title: ["Ingénieur de formation,", "bâtisseur par nature."],
    education: "Formation",
    certifications: "Certifications",
  },
  cv: {
    button: "Télécharger mon CV",
    options: { backend: "CV — Backend & Full-Stack", genai: "CV — IA générative" },
    hint: "PDF · français",
  },
  certificationsPage: {
    eyebrow: "Certifications",
    title: ["Certifié,", "et vérifiable."],
    intro: "Chaque certificat ci-dessous renvoie vers sa page de vérification officielle lorsque l'organisme en fournit une.",
    viewAll: (n) => `Voir toutes mes certifications (${n}) →`,
    verify: "Voir le diplôme",
    noLink: "Pas de lien public",
    expires: "expire",
    columns: { date: "Date", name: "Certification", issuer: "Organisme" },
    docTitle: "Certifications — Abderrahmane Bouleknadel",
  },
  experienceSection: {
    eyebrow: "Expérience",
    title: ["Quatre stages,", "une obsession : livrer."],
  },
  projectsSection: {
    eyebrow: "Réalisations",
    title: ["Des projets dont", "je suis fier."],
    viewArchive: (n) => `Voir toutes mes réalisations (${n}) →`,
    labels: {
      problem: "Problème",
      role: "Mon rôle",
      decisions: "Décisions techniques clés",
      result: "Résultat",
      code: "Code",
      private: "Code privé",
    },
  },
  archive: {
    eyebrow: "Archive",
    title: ["Tous mes projets,", "en détail."],
    intro: "Tous les projets que j'ai réalisés, avec le problème, mon rôle et les décisions prises. Cliquez sur une ligne pour ouvrir l'étude de cas.",
    columns: { year: "Année", project: "Projet", context: "Contexte", stack: "Technologies", link: "Lien" },
    docTitle: "Archive des projets — Abderrahmane Bouleknadel",
  },
  aiSection: {
    eyebrow: "Comment je construis des produits IA",
    title: ["Au-delà de la démo :", "mesuré, observable, sûr."],
    seenIn: "Appliqué dans",
    points: [
      { title: "Évaluer avant de livrer", body: "Chaque pipeline RAG a un jeu de test validé par le métier ; j'itère sur la recherche et les prompts face à ce jeu plutôt qu'à l'intuition.", projects: ["AI Construction Assistant"] },
      { title: "Maîtriser les coûts LLM", body: "Recherche → reranking → seuls les meilleurs passages partent dans le prompt, qui reste court. Le fournisseur (Groq, OpenAI, Gemini) est derrière une seule interface et peut être changé sans réécrire le pipeline.", projects: ["AI Construction Assistant"] },
      { title: "Rendre le système observable", body: "Chaque étape — recherche, reranking, génération — est tracée dans LangSmith : une mauvaise réponse se rattache à un document manquant ou à un prompt faible.", projects: ["AI Construction Assistant"] },
      { title: "Des garde-fous dès la conception", body: "Les réponses s'appuient uniquement sur les sources retrouvées, et le code généré par un agent s'exécute dans un sandbox Docker isolé — jamais sur l'hôte.", projects: ["DevPilot", "AI Construction Assistant", "ITI Training Chatbot"] },
    ],
  },
  skillsSection: {
    eyebrow: "Stack technique",
    title: ["Les outils que j'utilise", "au quotidien."],
  },
  contact: {
    eyebrow: "Contact",
    title: ["Construisons ensemble", "quelque chose de grand."],
    body: "Que ce soit pour une opportunité de stage ou simplement pour échanger sur les agents IA — ma boîte mail est ouverte.",
    send: "Envoyez-moi un message",
    mailSubject: "Opportunité de stage",
  },
  footer: {
    builtWith: "Conçu avec React, Three.js & beaucoup de café.",
  },
  education: [
    { school: "INSA Rouen Normandie", degree: "Diplôme d'ingénieur, Informatique & Technologies de l'information (double diplôme)", period: "2025 – Aujourd'hui", location: "Rouen, France" },
    { school: "ENSA El Jadida", degree: "Diplôme d'ingénieur, Génie informatique", period: "2023 – 2025", location: "El Jadida, Maroc" },
    { school: "Faculté des Sciences et Techniques de Settat", degree: "Licence, Génie informatique", period: "2022 – 2023", location: "Settat, Maroc" },
  ],
  languages: [
    { name: "Arabe", level: "Langue maternelle" },
    { name: "Français", level: "Courant" },
    { name: "Anglais", level: "Intermédiaire / Professionnel" },
  ],
  strengths: [
    { title: "IA générative & agents", description: "Pipelines RAG, orchestration de LLM, agents autonomes (LangChain, LangGraph, MCP) avec mémoire & raisonnement." },
    { title: "Ingénierie backend", description: "API et microservices sécurisés et scalables en Java/Spring Boot, Python/FastAPI, Node.js et .NET." },
    { title: "Applications full-stack", description: "Produits web & mobiles de bout en bout avec React, Angular, Next.js et Flutter." },
    { title: "Cloud & DevOps", description: "Docker, pipelines CI/CD, AWS — pour livrer des logiciels réellement déployables." },
  ],
  skillGroupLabels: {
    ai: "IA générative & agents",
    backend: "Langages & backend",
    frontend: "Frontend & mobile",
    data: "Données, cloud & DevOps",
  },
  projects: {
    construction: {
      tag: "GenAI · RAG",
      status: "En production",
      context: "Stage — Bouzid et Fils",
      problem: "Les équipes terrain du BTP passaient jusqu'à 4 heures à fouiller plus de 400 documents techniques pour retrouver une information.",
      role: "Stagiaire IA générative / backend — j'ai conçu et mis en production le pipeline RAG et son service FastAPI de bout en bout.",
      decisions: [
        "Ingestion → embeddings → index ChromaDB, avec une étape de reranking pour n'envoyer au LLM que les passages les plus pertinents.",
        "LangGraph pour orchestrer recherche et génération ; Groq ou OpenAI/Gemini derrière la même interface.",
        "Prompt engineering itératif, workflows n8n pour fiabiliser la chaîne, LangSmith pour la tracer et l'évaluer.",
      ],
      result: "Temps de recherche réduit de 4 h à 20 min · plus de 85 % de réponses jugées pertinentes par le métier.",
    },
    devpilot: {
      tag: "Agent IA",
      status: "En cours",
      context: "Projet IA",
      problem: "La revue de code et l'écriture de tests unitaires sont des goulots d'étranglement lents et répétitifs sur chaque Pull Request.",
      role: "Seul développeur — conception de l'agent, intégration MCP et exécution en sandbox.",
      decisions: [
        "GitHub connecté via le Model Context Protocol (MCP), pour des outils d'agent standards et interchangeables.",
        "Workflow LangGraph : analyse de la PR → génération des tests → exécution → commentaire de revue.",
        "Les tests générés s'exécutent dans un conteneur Docker isolé — le code écrit par le LLM ne tourne jamais sur l'hôte.",
      ],
      result: "Chaîne complète fonctionnelle, de l'analyse de la PR au commentaire de revue automatique.",
    },
    enviscan: {
      tag: "Vision par ordinateur",
      status: "Publié",
      context: "Projet académique — Elsevier SoftwareX",
      problem: "Rendre l'identification des plantes instantanée et compréhensible pour des non-experts, directement depuis la caméra du téléphone.",
      role: "Développeur de l'application Android et du backend Spring Boot / Spring AI, jusqu'à la publication scientifique.",
      decisions: [
        "Modèle TensorFlow Lite embarqué pour une reconnaissance en temps réel, sans aller-retour serveur.",
        "Surcouches ARCore pour afficher les résultats directement sur la plante.",
        "Backend Spring Boot / Spring AI pour un chatbot bilingue FR/EN.",
      ],
      result: "Publié dans Elsevier SoftwareX après un protocole d'évaluation rigoureux.",
    },
    reskif: {
      tag: "Systèmes décentralisés",
      status: "2026 – en cours",
      context: "Projet d'ingénierie INSA Rouen (PIC) — en équipe",
      problem: "Construire une messagerie communautaire qui ne dépende pas d'un unique serveur central.",
      role: "Responsable qualité & Git et développeur backend dans l'équipe.",
      decisions: [
        "Protocole Matrix avec fédération entre plusieurs homeservers Synapse.",
        "Docker + Caddy + PostgreSQL pour une stack auto-hébergée et reproductible.",
        "Frontend React sur matrix-js-sdk pour les comptes et les échanges en temps réel.",
      ],
      result: "Homeservers fédérés échangeant en temps réel ; je pilote le workflow Git et la démarche qualité de l'équipe.",
    },
    iti: {
      tag: "IA conversationnelle",
      status: "2025",
      context: "Projet académique",
      problem: "Un référentiel de formation structuré en XML/XSLT ne pouvait qu'être parcouru, pas interrogé en langage naturel.",
      role: "Développeur — pipeline de données, chatbot RAG et déploiement.",
      decisions: [
        "Scraping et nettoyage du référentiel XML/XSLT avant découpage en passages.",
        "Embeddings dans une base vectorielle ; le LLM répond uniquement à partir des passages retrouvés.",
        "Déploiement statique sur GitLab Pages.",
      ],
      result: null,
    },
    devtracker: {
      tag: "Outillage dev",
      status: "2025",
      context: "Projet académique",
      problem: "Les équipes de développement manquent d'indicateurs objectifs sur l'usage réel du temps de développement.",
      role: "Développeur — extension VS Code et backend Spring Boot.",
      decisions: [
        "API d'extension VS Code pour collecter les métriques d'activité sans quitter l'éditeur.",
        "API REST Spring Boot pour collecter et analyser ces métriques.",
        "Analyses assistées par IA calculées côté serveur pour l'équipe.",
      ],
      result: null,
    },
    exammaster: {
      tag: "Full-Stack",
      status: "Académique",
      context: "Projet académique",
      problem: "Gérer et planifier des examens à la main est lent et source d'erreurs.",
      role: "Développeur full-stack.",
      decisions: [
        "Application Spring Boot sécurisée avec Spring Security.",
        "Gestion des rôles et authentification pour chaque type d'utilisateur.",
        "Un assistant intelligent intégré à l'application.",
      ],
      result: null,
    },
    elearning: {
      tag: "Application web",
      status: "Académique",
      context: "Projet académique",
      problem: "Les organismes de formation ont besoin d'un outil unique pour gérer leurs cours et suivre la progression de chaque apprenant, plutôt que des fichiers et tableurs éparpillés.",
      role: "Développeur — modèle de données, back-office et pages apprenants.",
      decisions: [
        "Architecture MVC Laravel avec des modèles Eloquent pour les formations, cours, apprenants et inscriptions.",
        "Schéma relationnel MySQL pour garder un suivi de progression cohérent entre les cours.",
        "Espaces distincts pour les administrateurs (gestion des formations et des cours) et les apprenants (suivi de leur progression).",
      ],
      result: null,
    },
    oracledist: {
      tag: "Bases de données",
      status: "Académique",
      context: "Projet académique",
      problem: "Répartir une base de données sur plusieurs serveurs Oracle tout en gardant des requêtes transparentes pour l'application.",
      role: "Conception du schéma de distribution et mise en œuvre sur les serveurs.",
      decisions: [
        "Fragmentation horizontale et verticale des tables selon le lieu d'utilisation des données.",
        "Réplication des données partagées entre les sites pour privilégier les lectures locales.",
        "Database links entre serveurs pour exécuter des requêtes distribuées sur les fragments.",
      ],
      result: null,
    },
  },
  experience: [
    {
      role: "Stagiaire développeur IA générative / backend",
      company: "Bouzid et Fils",
      location: "El Jadida, Maroc",
      period: "Juin – août 2026",
      highlights: [
        "Conception et mise en production d'un assistant RAG (LangChain, LangGraph, Groq, API OpenAI/Gemini) pour exploiter la documentation technique du BTP — ingestion, embeddings, indexation vectorielle ChromaDB (plus de 400 documents), recherche avec reranking et génération sourcée.",
        "Développement d'un service FastAPI de synthèse automatique de rapports, réduisant le temps de recherche documentaire de 4 heures à 20 minutes pour les équipes terrain.",
        "Itérations sur le prompt engineering et mise en place de workflows d'automatisation n8n pour fiabiliser la chaîne de traitement.",
        "Suivi et évaluation du pipeline avec LangSmith, avec un taux de pertinence supérieur à 85 % sur des cas de test validés par le métier.",
      ],
    },
    {
      role: "Stagiaire développeur full-stack / backend",
      company: "Harmony",
      location: "Rabat, Maroc",
      period: "Juillet – août 2025",
      highlights: [
        "Développement d'une application mobile multiplateforme (Flutter) connectée à un backend Spring Boot, avec authentification JWT et double authentification (2FA).",
        "Conception d'API REST pour la synchronisation des données en temps réel entre utilisateurs, avec une gestion fine des rôles et des permissions.",
        "Optimisation des endpoints critiques, réduisant de 30 % le temps de réponse moyen des opérations de synchronisation.",
      ],
    },
    {
      role: "Stagiaire développeur web",
      company: "Wimtech",
      location: "Rabat, Maroc",
      period: "Juin – juillet 2024",
      highlights: [
        "Conception et développement de microservices (Spring Boot, Angular, Next.js) pour une plateforme de génération de sites web & e-commerce.",
        "Intégration du frontend Angular avec les microservices backend, y compris l'authentification et la gestion des sessions.",
        "Contribution à l'architecture backend orientée API et mise en place de bonnes pratiques de revue de code.",
      ],
    },
    {
      role: "Stagiaire développeur web",
      company: "SA Express Maroc SARL",
      location: "Salé, Maroc",
      period: "Avril – juin 2023",
      highlights: [
        "Développement d'une application web de gestion de résidences (Laravel, MySQL, Bootstrap, Ajax, jQuery).",
        "Implémentation des fonctionnalités CRUD et d'une interface d'administration pour les gestionnaires de résidence.",
      ],
    },
  ],
};

// Merge shared data with each language's prose so components get one flat object.
function build(t) {
  const projects = projectMeta.map((p) => ({
    ...p,
    ...t.projects[p.key],
    title: typeof p.title === "string" ? p.title : p.title[t.lang],
  }));
  const certifications = [...certificationList].sort((a, b) => b.date.localeCompare(a.date));
  return {
    ...t,
    profile: { ...contactInfo, ...t.profile },
    certifications,
    featuredCertifications: certificationList
      .filter((c) => c.featured)
      .sort((a, b) => a.featured - b.featured),
    cvs: Object.entries(cvFiles).map(([key, href]) => ({ key, href, label: t.cv.options[key] })),
    navLinks: navHrefs.map((href, i) => ({ href, label: t.nav.links[i] })),
    skillGroups: Object.entries(skillItems).map(([key, items]) => ({
      key,
      label: t.skillGroupLabels[key],
      items,
    })),
    projects,
    featuredProjects: projects.filter((p) => p.featured).slice(0, MAX_FEATURED_PROJECTS),
  };
}

export const content = { en: build(en), fr: build(fr) };
export const LANGS = ["en", "fr"];
