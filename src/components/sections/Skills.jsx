import { skillGroups } from "../../data/skills.js";
import SectionTitle from "../ui/SectionTitle.jsx";
import Reveal from "../ui/Reveal.jsx";
import { BrainCircuit, Braces, CloudCog, CodeXml, Wrench, BadgeCheck } from "lucide-react";
import { getTechnology } from "../../lib/technology.js";

const groupIcons = {
  Frontend: CodeXml,
  "Backend & Databases": Braces,
  "AI & Third-Party APIs": BrainCircuit,
  "Tools & Utilities": Wrench,
  "Core Concepts": CloudCog,
};

export default function Skills() {
  return (
    <section className="skills section" id="skills">
      <div className="container">
        <SectionTitle icon={CodeXml} accent="var(--cyan)">Technical skills</SectionTitle>

        <Reveal className="skills__groups" stagger>
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.title} style={{ "--accent": group.accent }}>
              <h3>
                {(() => {
                  const Icon = groupIcons[group.title] || BadgeCheck;
                  return <Icon size={18} aria-hidden="true" />;
                })()}
                {group.title}
              </h3>
              <ul className="chip-list">
                {group.items.map((item) => {
                  const { Icon, accent } = getTechnology(item);
                  return (
                    <li key={item} style={{ "--technology-accent": accent }}>
                      <Icon size={14} aria-hidden="true" />{item}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
