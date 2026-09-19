import { useRef, useState } from "react";
import { gsap, useGSAP } from "../../lib/gsap.js";
import { site } from "../../data/site.js";

/**
 * Profile image section. Image na mile to initials wala gradient fallback dikhta hai,
 * isliye site kabhi tooti hui nahi lagegi.
 */
export default function ProfileCard() {
  const ref = useRef(null);
  const [failed, setFailed] = useState(false);

  const initials = site.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  useGSAP(
    () => {
      gsap.from(ref.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        scrollTrigger: { trigger: ref.current, start: "top 88%" },
      });

      // Halka floating parallax
      gsap.to(".profile-card__media", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    },
    { scope: ref }
  );

  return (
    <figure className="profile-card" ref={ref}>
      <div className="profile-card__media">
        {failed ? (
          <div className="profile-card__fallback">{initials}</div>
        ) : (
          <img
            src={site.profileImage}
            alt={`${site.name}, ${site.role}`}
            loading="lazy"
            onError={() => setFailed(true)}
          />
        )}
      </div>

      <figcaption className="profile-card__meta">
        <strong>{site.name}</strong>
        <span>{site.role}</span>
        <span className="profile-card__location">{site.location}</span>
      </figcaption>
    </figure>
  );
}
