import { skillGroups } from "../../data/skills.js";
import SectionTitle from "../ui/SectionTitle.jsx";
import Reveal from "../ui/Reveal.jsx";

export default function Skills() {
  return (
    <section className="skills section" id="skills">
      <div className="container">
        <SectionTitle kicker="Toolkit">Technical skills</SectionTitle>

        <Reveal className="skills__groups" stagger>
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.title} style={{ "--accent": group.accent }}>
              <h3>{group.title}</h3>
              <ul className="chip-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
