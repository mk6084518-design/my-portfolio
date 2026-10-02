import { site } from "../../data/site.js";
import { ArrowUpRight, BriefcaseBusiness, Code2, FileText, Mail } from "lucide-react";

const socialIcons = { GitHub: Code2, LinkedIn: BriefcaseBusiness, Email: Mail };

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          © {new Date().getFullYear()} {site.name}. Built with React, Vite, and GSAP.
        </p>
        <ul className="footer__links">
          <li>
            <a href={site.resume} target="_blank" rel="noopener noreferrer">
              <FileText size={14} aria-hidden="true" />Resume<ArrowUpRight size={12} aria-hidden="true" />
            </a>
          </li>
          {site.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer">
                {(() => {
                  const Icon = socialIcons[s.label];
                  return Icon ? <Icon size={14} aria-hidden="true" /> : null;
                })()}
                {s.label}<ArrowUpRight size={12} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
