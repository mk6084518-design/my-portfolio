import { education } from "../../data/education.js";
import SectionTitle from "../ui/SectionTitle.jsx";
import Reveal from "../ui/Reveal.jsx";
import { Award, CalendarDays, GraduationCap, MapPin } from "lucide-react";

export default function Education() {
  return (
    <section className="education section" id="education">
      <div className="container">
        <SectionTitle kicker="Background" icon={GraduationCap} accent="var(--lime)">Education</SectionTitle>

        <Reveal className="education__list" stagger>
          {education.map((item) => (
            <article className="education__item" key={item.degree}>
              <p className="education__period"><CalendarDays size={15} aria-hidden="true" />{item.period}</p>
              <div>
                <h3>{item.degree}</h3>
                <p className="education__place"><MapPin size={14} aria-hidden="true" />
                  {item.institute}, {item.place}
                </p>
                <p className="education__note"><Award size={13} aria-hidden="true" />{item.note}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
