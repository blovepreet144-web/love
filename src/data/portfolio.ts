import aestheticAura from "@/assets/project-aesthetic-aura.jpg";
import dhillonSkinClinic from "@/assets/project-dhillon-skin-clinic.jpg";
import wildWing from "@/assets/project-wild-wing.jpg";
import allansFiresideGrill from "@/assets/project-allans-fireside-grill.jpg";
import profilePhoto from "@/assets/profile-lovepreet.png";
import brandLogo from "@/assets/logo.jpg";

export const profile = {
  name: "Lovepreet Singh Bhangu",
  title: "Web & Social Designer",
  photo: profilePhoto,
  logo: brandLogo,
  headline: "I Design Digital Experiences That Help Businesses Stand Out.",
  intro:
    "I design and build modern websites and social-first visuals for businesses that want a digital presence they can be proud of — combining interface design, usability, branding and search-friendly structure.",
  email: "blovepreet144@gmail.com",
  phoneDisplay: "+91 79868 55515",
  phoneRaw: "+917986855515",
  whatsapp: "https://wa.me/917986855515",
  socials: {
    facebook: "https://www.facebook.com/share/1F6oKNckyR/?mibextid=wwXIfr",
    instagram:
      "https://www.instagram.com/web_socialdesigne?stkn=Yjgyd2xxZ2N0MjYx&utm_source=qr",
    linkedin:
      "https://www.linkedin.com/in/lovepreet-singh-0b2921237?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
  },
  tagline: "Designing modern digital experiences for ambitious businesses.",
};

export const navItems = [
  { label: "Home", hash: "home" },
  { label: "About", hash: "about" },
  { label: "Services", hash: "services" },
  { label: "Projects", hash: "projects" },
  { label: "Experience", hash: "experience" },
  { label: "Contact", hash: "contact" },
];

export const skillGroups = [
  {
    id: "web",
    label: "Web",
    items: [
      "Website Design",
      "Website Development",
      "Responsive Web Design",
      "Landing Page Design",
      "Modern UI Design",
      "Website Structure & Layout",
    ],
  },
  {
    id: "uiux",
    label: "UI/UX",
    items: [
      "User Interface Design",
      "User Experience Design",
      "Visual Hierarchy",
      "Responsive Design",
      "Conversion-Focused Layouts",
      "User-Friendly Navigation",
    ],
  },
  {
    id: "social",
    label: "Social Media",
    items: [
      "Social Media Design",
      "Social Post Design",
      "Creative Campaign Visuals",
      "Social Branding",
      "Digital Content Design",
    ],
  },
  {
    id: "branding",
    label: "Branding",
    items: [
      "Visual Identity",
      "Brand Presentation",
      "Creative Direction",
      "Digital Branding",
    ],
  },
  {
    id: "growth",
    label: "Marketing / Growth",
    items: ["SEO", "Conversion-Focused Design", "Online Presence Strategy"],
  },
];

export const services = [
  {
    icon: "Layout",
    title: "Website Design",
    description:
      "Modern, responsive, professional websites tailored to the brand and business goals.",
  },
  {
    icon: "Code2",
    title: "Website Development",
    description:
      "Functional, responsive, optimized websites that turn designs into usable digital experiences.",
  },
  {
    icon: "MousePointerClick",
    title: "UI/UX Design",
    description:
      "User-focused interface and experience design built around clarity, usability and modern visual standards.",
  },
  {
    icon: "Rocket",
    title: "Landing Page Design",
    description:
      "High-impact landing pages designed for strong presentation, engagement and conversions.",
  },
  {
    icon: "Share2",
    title: "Social Media Design",
    description:
      "Professional creative designs for social platforms that strengthen brand identity.",
  },
  {
    icon: "Sparkles",
    title: "Branding",
    description:
      "Digital branding and visual identity direction for businesses that want a consistent online presence.",
  },
  {
    icon: "Search",
    title: "SEO",
    description:
      "Search-engine-friendly website structure and foundational SEO implementation to improve discoverability.",
  },
] as const;

export const whyWorkWithMe = [
  "Modern design",
  "Business-focused thinking",
  "Responsive experiences",
  "Creative visual direction",
  "User-friendly interfaces",
  "Website + social media expertise",
  "Personalized solutions",
  "Professional communication",
];

export type Service = {
  icon?: string;
  title: string;
  description: string;
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  url?: string;
  summary: string;
  image: string;
  video?: string;
  tags: string[];
  objective: string;
  approach: string;
  servicesProvided: string[];
  decisions: string[];
};

export const projects: Project[] = [
  {
    slug: "aesthetic-aura",
    name: "Aesthetic Aura",
    category: "Skin & Aesthetic Clinic",
    url: "https://www.aestheticaura.world/",
    summary:
      "A clinical aesthetic website created for Dr. Tanveer Kaur in Sri Muktsar Sahib, featuring personalized treatment protocols, HydraFacial and laser therapies, patient reviews, and direct WhatsApp consultation booking.",
    image: aestheticAura,
    tags: ["Website Design", "UI/UX", "Clinical Branding", "Local SEO"],
    objective:
      "Design a calm, luxury-clinical digital presence for Dr. Tanveer Kaur's aesthetic clinic in Sri Muktsar Sahib, presenting evidence-based skin and hair treatments with clear patient guidance and frictionless booking.",
    approach:
      "Warm champagne and cream visual language with refined editorial typography, prominent 1-on-1 doctor consultation details, transparent treatment breakdowns, Google review trust proof, and virtual appointment access.",
    servicesProvided: ["Website Design", "Website Development", "UI/UX Design", "Clinical Branding", "Responsive Design"],
    decisions: [
      "Anchor the experience around Dr. Tanveer Kaur's 2.5+ years of doctor-led expertise to establish immediate medical confidence.",
      "Structure treatments (HydraFacial, Laser Hair Reduction, PRP, Medical Peels) with clear expectations rather than dense clinical jargon.",
      "Incorporate 1-click WhatsApp consultation and virtual video appointment slots for patients outside Sri Muktsar Sahib.",
      "Highlight genuine 5.0 Google review ratings and clinic interior photography to ease new patient decision-making.",
    ],
  },
  {
    slug: "dhillon-skin-clinic",
    name: "Dhillon Skin Clinic",
    category: "Healthcare / Skin Clinic",
    summary:
      "A clinic website focused on professional presentation, clear service communication and trust-building design.",
    image: dhillonSkinClinic,
    tags: ["Website Design", "UI/UX", "Information Architecture"],
    objective:
      "Present a skin clinic professionally online, with important information easy to find for prospective patients.",
    approach:
      "A calm, clinical visual direction with a clear hierarchy: who the clinic is, what it offers and how to get in touch, without overwhelming the visitor.",
    servicesProvided: ["Website Design", "UI/UX Design", "Responsive Design"],
    decisions: [
      "Prioritise clarity and legibility over decoration, in line with a healthcare context.",
      "Surface contact and location details on every screen size.",
      "Structure services so each one can be understood at a glance.",
    ],
  },
  {
    slug: "wild-wing-restaurants",
    name: "Wild Wing Restaurants",
    category: "Sports Bar & Restaurant Franchise",
    url: "https://www.wildwingrestaurants.com/",
    summary:
      "A high-impact digital presence for Wild Wing Restaurants, Canada's famous sports restaurant franchise known for Canadian-raised chicken wings in 101 flavours, multi-province menu selection, game day bundles, and streamlined online takeout ordering.",
    image: wildWing,
    tags: ["Restaurant Web Design", "UI/UX", "Menu Architecture", "Multi-Location SEO"],
    objective:
      "Showcase Canada's premier sports restaurant franchise with a bold, appetizing web experience that drives online takeout orders, makes multi-province location discovery effortless across 6 provinces, and highlights their famous 101-flavour wing lineup.",
    approach:
      "High-energy sports bar aesthetic featuring game-day bundle promotions, high-contrast visual menus, persistent multi-location region switcher (Ontario, Alberta, Manitoba, BC, Quebec, Saskatchewan), and frictionless 1-click 'Order Online' pathways.",
    servicesProvided: [
      "Website Design",
      "UI/UX Design",
      "Menu Architecture",
      "Multi-Location SEO",
      "Responsive Design",
      "Franchise Information Design",
    ],
    decisions: [
      "Highlight signature 101 wing flavours and game-day platters with bold, mouth-watering photography that drives immediate appetite appeal.",
      "Implement multi-region filtering across 6 Canadian provinces so guests instantly access localized pricing, takeout menus, and drink specials.",
      "Position sticky, high-contrast 'Order Online' call-to-actions to maximize conversion during peak game nights and family dinner rushes.",
      "Streamline mobile menu navigation with intuitive category filtering across bone-in wings, boneless, flatbreads, burgers, and craft pints.",
    ],
  },
  {
    slug: "allans-fireside-grill",
    name: "Allan's Fireside Grill",
    category: "Casual Dining & Grill Restaurant",
    url: "https://allansfiresidegrill.com/",
    summary:
      "A welcoming restaurant digital experience for Allan's Fireside Grill in Port Elgin, Ontario, highlighting fresh-food family dining, signature AAA steaks, smoked BBQ ribs, patio seating, and accessible downloadable menus.",
    image: allansFiresideGrill,
    tags: ["Restaurant Web Design", "UI/UX", "Local Business Branding", "Menu Architecture"],
    objective:
      "Create a warm, community-focused web presence for Port Elgin's popular family grill, making menus, daily features, location info, and direct phone ordering simple and accessible on all devices.",
    approach:
      "Warm hospitality design reflecting the restaurant's fireplace and patio ambiance, featuring high-contrast typography, downloadable PDF menus, direct click-to-call ordering (519.832.4745), and prominent location guidance.",
    servicesProvided: [
      "Website Design",
      "UI/UX Design",
      "Menu Architecture",
      "Local SEO",
      "Responsive Design",
    ],
    decisions: [
      "Showcase signature steak, BBQ ribs, and salad dishes with prominent food photography to capture diners' appetite instantly.",
      "Implement direct 1-tap call-to-order (519.832.4745) to streamline takeout orders for local residents and Port Elgin visitors.",
      "Organize food offerings clearly across lunch, dinner, kids' menu, signature items, and drink/wine pairings.",
      "Highlight essential visitor logistics prominently, including the outdoor patio, private parking lot, and downtown Port Elgin location.",
    ],
  },
];

export const serviceOptions = [
  "Website Design",
  "Website Development",
  "UI/UX Design",
  "Landing Page Design",
  "Social Media Design",
  "Branding",
  "SEO",
  "Something else",
];
