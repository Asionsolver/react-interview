export const allChipSuggestions = [
  // 🧱 Frontend Frameworks
  { label: "React", category: "frontend" },
  { label: "Next.js", category: "frontend" },
  { label: "Vue.js", category: "frontend" },
  { label: "Angular", category: "frontend" },
  { label: "Svelte", category: "frontend" },

  // 🎨 Styling & UI
  { label: "Tailwind", category: "styling" },
  { label: "Bootstrap", category: "styling" },
  { label: "Material-UI", category: "styling" },
  { label: "Chakra UI", category: "styling" },
  { label: "Styled Components", category: "styling" },
  { label: "Sass", category: "styling" },
  { label: "Less", category: "styling" },
  { label: "CSS3", category: "styling" },
  { label: "HTML5", category: "styling" },

  // ⚙️ Backend & Frameworks
  { label: "Node.js", category: "backend" },
  { label: "Express", category: "backend" },
  { label: "Django", category: "backend" },
  { label: "Flask", category: "backend" },
  { label: "Laravel", category: "backend" },
  { label: "Spring", category: "backend" },
  { label: "Rails", category: "backend" },
  { label: "ASP.NET", category: "backend" },

  // 🧠 Languages
  { label: "JavaScript", category: "language" },
  { label: "TypeScript", category: "language" },
  { label: "Python", category: "language" },
  { label: "Ruby", category: "language" },
  { label: "PHP", category: "language" },
  { label: "Java", category: "language" },
  { label: "C#", category: "language" },
  { label: "Go", category: "language" },
  { label: "Rust", category: "language" },
  { label: "Swift", category: "language" },
  { label: "Kotlin", category: "language" },

  // 🗄️ Databases
  { label: "MongoDB", category: "database" },
  { label: "PostgreSQL", category: "database" },
  { label: "MySQL", category: "database" },
  { label: "SQLite", category: "database" },
  { label: "Redis", category: "database" },
  { label: "Elasticsearch", category: "database" },

  // ☁️ Cloud & DevOps
  { label: "AWS", category: "devops" },
  { label: "Azure", category: "devops" },
  { label: "GCP", category: "devops" },
  { label: "Docker", category: "devops" },
  { label: "Kubernetes", category: "devops" },
  { label: "CI/CD", category: "devops" },
  { label: "Jenkins", category: "devops" },
  { label: "Travis CI", category: "devops" },
  { label: "Circle CI", category: "devops" },
  { label: "Netlify", category: "devops" },
  { label: "Vercel", category: "devops" },
  { label: "Heroku", category: "devops" },
  { label: "Digital Ocean", category: "devops" },

  // ⚡ Tools
  { label: "Git", category: "tool" },
  { label: "GitHub", category: "tool" },
  { label: "GitLab", category: "tool" },
  { label: "Bitbucket", category: "tool" },
  { label: "Webpack", category: "tool" },
  { label: "Rollup", category: "tool" },
  { label: "Vite", category: "tool" },
  { label: "Babel", category: "tool" },
  { label: "ESLint", category: "tool" },
  { label: "Jest", category: "tool" },
  { label: "Cypress", category: "tool" },

  // 🔌 APIs & Protocols
  { label: "REST API", category: "api" },
  { label: "GraphQL", category: "api" },
  { label: "WebSocket", category: "api" },
  { label: "OAuth", category: "api" },
  { label: "JWT", category: "api" },

  // 📦 State Management
  { label: "Redux", category: "state" },
  { label: "Redux Saga", category: "state" },
  { label: "Redux Thunk", category: "state" },
  { label: "MobX", category: "state" },
  { label: "Zustand", category: "state" },
  { label: "React Query", category: "state" },
  { label: "SWR", category: "state" },

  // 🧩 ORM / Data Layer
  { label: "Prisma", category: "orm" },
  { label: "Sequelize", category: "orm" },
  { label: "Mongoose", category: "orm" },
  { label: "TypeORM", category: "orm" },

  // 🧮 Visualization
  { label: "Three.js", category: "visualization" },
  { label: "D3.js", category: "visualization" },
  { label: "Chart.js", category: "visualization" },
  { label: "Tableau", category: "visualization" },
  { label: "Power BI", category: "visualization" },

  // 📱 Mobile / Desktop
  { label: "React Native", category: "mobile" },
  { label: "Flutter", category: "mobile" },
  { label: "Ionic", category: "mobile" },
  { label: "Electron", category: "desktop" },
  { label: "Unity", category: "desktop" },

  // 🛍️ CMS / E-commerce
  { label: "WordPress", category: "cms" },
  { label: "Drupal", category: "cms" },
  { label: "Joomla", category: "cms" },
  { label: "Magento", category: "ecommerce" },
  { label: "Shopify", category: "ecommerce" },
  { label: "WooCommerce", category: "ecommerce" },

  // 💰 Payment / Blockchain
  { label: "Stripe", category: "payment" },
  { label: "PayPal", category: "payment" },
  { label: "Blockchain", category: "blockchain" },
  { label: "Solidity", category: "blockchain" },
  { label: "Web3.js", category: "blockchain" },
  { label: "IPFS", category: "blockchain" },

  // 🤖 AI / Data Science
  { label: "TensorFlow", category: "ai" },
  { label: "PyTorch", category: "ai" },
  { label: "Machine Learning", category: "ai" },
  { label: "Data Science", category: "ai" },
  { label: "Big Data", category: "ai" },
  { label: "Hadoop", category: "ai" },
  { label: "Spark", category: "ai" },

  // 📊 Analytics & SEO
  { label: "SEO", category: "analytics" },
  { label: "Google Analytics", category: "analytics" },
  { label: "Contentful", category: "cms" },
  { label: "Sanity", category: "cms" },
  { label: "Strapi", category: "cms" },
  { label: "Headless CMS", category: "cms" },
];

export const categoryColors = {
  frontend: "bg-blue-200 text-blue-800",
  styling: "bg-pink-200 text-pink-800",
  backend: "bg-green-200 text-green-800",
  language: "bg-yellow-200 text-yellow-800",
  database: "bg-purple-200 text-purple-800",
  devops: "bg-orange-200 text-orange-800",
  tool: "bg-gray-200 text-gray-800",
  api: "bg-cyan-200 text-cyan-800",
  state: "bg-indigo-200 text-indigo-800",
  orm: "bg-teal-200 text-teal-800",
  visualization: "bg-amber-200 text-amber-800",
  mobile: "bg-fuchsia-200 text-fuchsia-800",
  desktop: "bg-stone-300 text-slate-800",
  cms: "bg-lime-200 text-lime-800",
  ecommerce: "bg-rose-200 text-rose-800",
  payment: "bg-red-200 text-red-800",
  blockchain: "bg-violet-200 text-violet-800",
  ai: "bg-emerald-200 text-emerald-800",
  analytics: "bg-sky-200 text-sky-800",
  default: "bg-gray-200 text-gray-800",
};
