import Reveal from "./Reveal.jsx";

export default function SectionTitle({ children, kicker }) {
  return (
    <Reveal className="section__head" stagger>
      {kicker && <p className="section__kicker">{kicker}</p>}
      <h2 className="section__title">{children}</h2>
    </Reveal>
  );
}
