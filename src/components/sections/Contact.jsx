import { site } from "../../data/site.js";
import Button from "../ui/Button.jsx";
import Reveal from "../ui/Reveal.jsx";

const socialIcons = {
  GitHub: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.05c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.84 1.23 1.84 1.23 1.07 1.84 2.8 1.31 3.48 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.34V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM3.54 20.45H7.1V8.99H3.54v11.46ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
    </svg>
  ),
  Email: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2 4h20a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 3.2v.2l10 6.25L22 7.4v-.2H2Zm20 2.56-9.47 5.92a1 1 0 0 1-1.06 0L2 9.76V18h20V9.76Z" />
    </svg>
  ),
};

export default function Contact() {
  return (
    <section className="contact section" id="contact">
      <div className="container contact__inner">
        <Reveal className="contact__intro" stagger>
          <h2 className="contact__title">Let's build something.</h2>
          <p>Internship, freelance ya full-time — koi bhi baat ho, message kar do.</p>

          <ul className="contact__details">
            <li>
              <span>Email</span>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <span>Phone</span>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
            </li>
            <li>
              <span>Location</span>
              <p>{site.location}</p>
            </li>
          </ul>

          <Button href={site.resume} variant="ghost" download>
            Download resume
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
                  {socialIcons[label]}
                  <span>{label}</span>
                </a>
              ))}
          </nav>
        </Reveal>
      </div>
    </section>
  );
}
