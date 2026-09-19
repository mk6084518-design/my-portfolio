import { site } from "../../data/site.js";
import { strengths, languages } from "../../data/skills.js";
import SectionTitle from "../ui/SectionTitle.jsx";
import Reveal from "../ui/Reveal.jsx";
import ProfileCard from "./ProfileCard.jsx";

export default function About() {
  return (
    <section className="about section" id="about">
      <div className="container">
        <SectionTitle>About me</SectionTitle>

        <div className="about__inner">
          <ProfileCard />

          <div className="about__body">
            {site.about.map((para, i) => (
              <Reveal as="p" key={i}>
                {para}
              </Reveal>
            ))}

            <Reveal className="about__lists" stagger>
              <div>
                <h3>Strengths</h3>
                <ul className="chip-list">
                  {strengths.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3>Languages</h3>
                <ul className="about__languages">
                  {languages.map((l) => (
                    <li key={l.name}>
                      <strong>{l.name}</strong> — {l.level}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
