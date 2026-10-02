import Magnetic from "./Magnetic.jsx";
import { scrollToSection } from "../../hooks/useLenis.js";

export default function Button({
  as = "a",
  variant = "primary",
  href,
  children,
  magnetic = true,
  ...rest
}) {
  const className = `btn btn--${variant}`;

  const onClick = (e) => {
    if (href?.startsWith("#")) {
      e.preventDefault();
      scrollToSection(href);
    }
    rest.onClick?.(e);
  };

  const node =
    as === "button" ? (
      <button className={className} {...rest}>
        {children}
      </button>
    ) : (
      <a className={className} href={href} {...rest} onClick={onClick}>
        {children}
      </a>
    );

  return magnetic ? <Magnetic>{node}</Magnetic> : node;
}
