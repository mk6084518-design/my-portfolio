/** Add new projects here without changing the component. */
export const projects = [
  {
    id: "ai-resume-analyzer",
    title: "AI Resume Analyzer",
    tagline: "Upload a resume, choose a target role, and let AI handle the analysis.",
    points: [
      "Users upload their resume and provide a job title and description to receive a personalized analysis.",
      "The Google Gemini API generates five tailored resume-improvement questions and answers.",
      "AI-driven behavioral interview Q&A helps users prepare for their target role.",
    ],
    tags: [
      "React.js",
      "Redux Toolkit",
      "Node.js",
      "Express.js",
      "JWT",
      "Google Gemini API",
      "REST APIs",
    ],
    live: "#",
    repo: "https://github.com/mk6084518-design",
    accent: "var(--violet)",
    featured: true,
  },
  {
    id: "interest-media-search",
    title: "Interest — Media Search Platform",
    tagline: "Search images, videos, and GIFs from a single search box.",
    points: [
      "A responsive media discovery platform for searching images, videos, and GIFs.",
      "Real-time results and dynamic media retrieval powered by the Unsplash, Pexels, and Tenor APIs.",
      "Reusable React components with category-based rendering.",
    ],
    tags: ["React.js", "Redux Toolkit", "Vite", "Unsplash API", "Pexels API", "Tenor API"],
    live: "#",
    repo: "https://github.com/mk6084518-design",
    accent: "var(--cyan)",
    featured: false,
  },
];
