import { site } from "../../data/site.js";
import Button from "../ui/Button.jsx";
import Reveal from "../ui/Reveal.jsx";
import { BriefcaseBusiness, Code2, Mail, MapPin, MessageCircle, Phone, FileDown } from "lucide-react";

const socialIcons = {
  GitHub: Code2,
  LinkedIn: BriefcaseBusiness,
  Email: Mail,
};

export default function Contact() {
  return (
    <section className="contact section" id="contact">
      <div className="container contact__inner">
        <Reveal className="contact__intro" stagger>
          <h2 className="contact__title"><MessageCircle size={23} aria-hidden="true" />Let's build something.</h2>
          <p>Whether you have an internship, freelance, or full-time opportunity, I would love to hear from you.</p>

          <ul className="contact__details">
            <li>
                <span><Mail size={14} aria-hidden="true" />Email</span>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
                <span><Phone size={14} aria-hidden="true" />Phone</span>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
            </li>
            <li>
                <span><MapPin size={14} aria-hidden="true" />Location</span>
              <p>{site.location}</p>
            </li>
          </ul>

          <Button href={site.resume} variant="ghost" target="_blank" rel="noopener noreferrer">
            <FileDown size={16} aria-hidden="true" />View resume
          </Button>

          <nav className="contact__socials" aria-label="Social links">
            {site.socials
              .filter(({ label }) => socialIcons[label])
              .map(({ label, href }) => (
                <a
                  className="contact__social"
                  href={href}
                  key={label}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${label} profile`}
                >
                  {(() => {
                    const Icon = socialIcons[label];
                    return <Icon size={17} aria-hidden="true" />;
                  })()}
                  <span>{label}</span>
                </a>
              ))}
          </nav>
        </Reveal>
      </div>
    </section>
  );
}
