import Reveal from "./Reveal.jsx";

export default function SectionTitle({ children, kicker, icon: Icon, accent = "var(--cyan)" }) {
  return (
    <Reveal className="section__head" stagger style={{ "--section-accent": accent }}>
      {kicker && <p className="section__kicker">{kicker}</p>}
      <div className="section__title-row">
        {Icon && <Icon className="section__icon" aria-hidden="true" />}
        <h2 className="section__title">{children}</h2>
      </div>
    </Reveal>
  );
}
