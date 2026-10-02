import { useState } from "react";
import { Radar } from "lucide-react";
import SectionTitle from "../ui/SectionTitle.jsx";
import Reveal from "../ui/Reveal.jsx";

const skills = [
  { label: "React.js", score: 90 },
  { label: "Redux Toolkit", score: 82 },
  { label: "Node.js", score: 84 },
  { label: "Express.js", score: 80 },
  { label: "MongoDB", score: 75 },
  { label: "JWT Auth", score: 78 },
  { label: "Tailwind", score: 88 },
  { label: "Gemini AI", score: 70 },
];

const colors = ["var(--pink)", "var(--amber)", "var(--lime)", "var(--cyan)", "var(--violet)"];
const center = { x: 280, y: 220 };
const radius = 138;

function pointAt(index, distance) {
  const angle = -Math.PI / 2 + (index * Math.PI * 2) / skills.length;
  return {
    x: center.x + Math.cos(angle) * distance,
    y: center.y + Math.sin(angle) * distance,
  };
}

const polygonPoints = skills
  .map((_, index) => {
    const point = pointAt(index, radius);
    return `${point.x},${point.y}`;
  })
  .join(" ");

const scorePoints = skills
  .map((skill, index) => {
    const point = pointAt(index, (radius * skill.score) / 100);
    return `${point.x},${point.y}`;
  })
  .join(" ");

export default function SkillMatrix() {
  const [activeIndex, setActiveIndex] = useState(null);
  const activeSkill = activeIndex === null ? null : skills[activeIndex];
  const circumference = 2 * Math.PI * 31;

  return (
    <section className="skill-matrix section" aria-labelledby="skill-matrix-title">
      <div className="container">
        <SectionTitle icon={Radar} accent="var(--violet)">
          <span id="skill-matrix-title">Skill Matrix</span>
        </SectionTitle>

        <Reveal className="skill-matrix__panel">
          <svg className="skill-matrix__chart" viewBox="0 0 560 440" role="img" aria-label="Interactive radar chart of eight technical skills">
            {[0.25, 0.5, 0.75, 1].map((fraction) => (
              <polygon
                className="skill-matrix__grid"
                key={fraction}
                points={skills.map((_, index) => {
                  const point = pointAt(index, radius * fraction);
                  return `${point.x},${point.y}`;
                }).join(" ")}
              />
            ))}

            {skills.map((skill, index) => {
              const point = pointAt(index, radius);
              const valuePoint = pointAt(index, (radius * skill.score) / 100);
              const labelPoint = pointAt(index, radius + 28);
              const color = colors[index % colors.length];
              const isActive = activeIndex === index;

              return (
                <g className={`skill-matrix__node${isActive ? " is-active" : ""}`} key={skill.label}>
                  <line
                    className="skill-matrix__spoke"
                    x1={center.x}
                    y1={center.y}
                    x2={point.x}
                    y2={point.y}
                    style={isActive ? { stroke: color } : undefined}
                  />
                  <text
                    className={`skill-matrix__label${isActive ? " is-active" : ""}`}
                    x={labelPoint.x}
                    y={labelPoint.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    role="button"
                    tabIndex={0}
                    aria-label={`${skill.label}: ${skill.score} percent`}
                    aria-pressed={isActive}
                    onPointerEnter={() => setActiveIndex(index)}
                    onPointerLeave={(event) => {
                      if (event.pointerType !== "touch" && document.activeElement !== event.currentTarget) {
                        setActiveIndex(null);
                      }
                    }}
                    onFocus={() => setActiveIndex(index)}
                    onBlur={() => setActiveIndex(null)}
                    onClick={() => setActiveIndex(index)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setActiveIndex(index);
                      }
                    }}
                  >
                    {skill.label}
                  </text>
                  <g
                    className="skill-matrix__hit"
                  >
                    <circle className="skill-matrix__hit-area" cx={valuePoint.x} cy={valuePoint.y} r="20" />
                    <circle className="skill-matrix__ring" cx={valuePoint.x} cy={valuePoint.y} r="7" style={{ "--node-color": color }} />
                    <circle className="skill-matrix__dot" cx={valuePoint.x} cy={valuePoint.y} r="5" style={{ "--node-color": color }} />
                  </g>
                </g>
              );
            })}

            <polygon className="skill-matrix__area" points={scorePoints} />
            {skills.map((skill, index) => {
              const point = pointAt(index, (radius * skill.score) / 100);
              return <circle className="skill-matrix__value-dot" key={skill.label} cx={point.x} cy={point.y} r="3" style={{ "--node-color": colors[index % colors.length] }} />;
            })}

            <circle className="skill-matrix__score-track" cx={center.x} cy={center.y} r="31" />
            <circle
              className="skill-matrix__score-progress"
              cx={center.x}
              cy={center.y}
              r="31"
              strokeDasharray={`${(circumference * (activeSkill?.score || 0)) / 100} ${circumference}`}
              style={{ "--score-color": activeSkill ? colors[activeIndex % colors.length] : "var(--violet)" }}
            />
            <text className="skill-matrix__center-label" x={center.x} y={center.y - 4} textAnchor="middle">
              {activeSkill ? `${activeSkill.score}%` : "SKILLS"}
            </text>
            {activeSkill && (
              <text className="skill-matrix__center-name" x={center.x} y={center.y + 12} textAnchor="middle">
                {activeSkill.label}
              </text>
            )}
          </svg>
        </Reveal>
      </div>
    </section>
  );
}