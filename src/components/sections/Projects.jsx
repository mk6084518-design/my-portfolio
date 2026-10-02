import { projects } from "../../data/projects.js";
import SectionTitle from "../ui/SectionTitle.jsx";
import ProjectCard from "./ProjectCard.jsx";
import { BriefcaseBusiness } from "lucide-react";

export default function Projects() {
  return (
    <section className="projects section" id="projects">
      <div className="container">
        <SectionTitle icon={BriefcaseBusiness} accent="var(--amber)">Projects</SectionTitle>

        <div className="projects__grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
