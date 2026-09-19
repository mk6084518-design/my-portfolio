import { useState } from "react";
import { site } from "../../data/site.js";
import Button from "../ui/Button.jsx";
import Reveal from "../ui/Reveal.jsx";

/** Real sending ke liye Formspree/EmailJS endpoint yahan daalo. */
const FORM_ENDPOINT = ""; // e.g. "https://formspree.io/f/xxxxxxx"

export default function Contact() {
  const [status, setStatus] = useState({ text: "", state: "" });
  const [sending, setSending] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      setStatus({ text: "Teeno fields bharo, aur email valid hona chahiye.", state: "error" });
      return;
    }

    if (!FORM_ENDPOINT) {
      setStatus({
        text: "Form endpoint set nahi hai — Contact.jsx me FORM_ENDPOINT bharo.",
        state: "error",
      });
      return;
    }

    setSending(true);
    setStatus({ text: "Sending…", state: "" });

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error(res.statusText);
      form.reset();
      setStatus({ text: "Message chala gaya. Jaldi reply karunga.", state: "success" });
    } catch {
      setStatus({ text: "Message nahi gaya. Seedha email kar do.", state: "error" });
    } finally {
      setSending(false);
    }
  };

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
        </Reveal>

        <form className="contact__form" onSubmit={onSubmit} noValidate>
          <label>
            <span>Name</span>
            <input type="text" name="name" required autoComplete="name" />
          </label>
          <label>
            <span>Email</span>
            <input type="email" name="email" required autoComplete="email" />
          </label>
          <label>
            <span>Message</span>
            <textarea name="message" rows="4" required />
          </label>

          <Button as="button" type="submit" disabled={sending} magnetic={false}>
            {sending ? "Sending…" : "Send message"}
          </Button>

          <p className="contact__status" data-state={status.state} role="status">
            {status.text}
          </p>
        </form>
      </div>
    </section>
  );
}
