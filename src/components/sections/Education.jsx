import { education } from "../../data/education.js";
import SectionTitle from "../ui/SectionTitle.jsx";
import Reveal from "../ui/Reveal.jsx";

export default function Education() {
  return (
    <section className="education section" id="education">
      <div className="container">
        <SectionTitle kicker="Background">Education</SectionTitle>

        <Reveal className="education__list" stagger>
          {education.map((item) => (
            <article className="education__item" key={item.degree}>
              <p className="education__period">{item.period}</p>
              <div>
                <h3>{item.degree}</h3>
                <p>
                  {item.institute}, {item.place}
                </p>
                <p className="education__note">{item.note}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
