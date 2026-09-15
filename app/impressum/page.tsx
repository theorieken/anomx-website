import Link from "next/link";
import { Experience } from "@/components/experience";
import { legalContact } from "@/lib/legal-contact";

export default function ImpressumPage() {
  return (
    <Experience className="legal-page">

      <section className="section legal-section">
        <article className="legal-document">
          <h1>Impressum</h1>
          <p>
            Angaben zum Anbieter dieser Website und zum Kontakt für Anomx.
          </p>

          <h2>Angaben zum Anbieter</h2>
          <p>
            {legalContact.name}
            <br />
            Anomx
            <br />
            Anschrift: wird ergänzt.
          </p>

          <h2>Kontakt</h2>
          <p>
            E-Mail: <a href={`mailto:${legalContact.email}`}>{legalContact.email}</a>
          </p>

          <h2>Verantwortlich für den Inhalt</h2>
          <p>
            {legalContact.name}
          </p>

          <Link className="legal-back-link" href="/">
            Back home
          </Link>
        </article>

      </section>
    </Experience>
  );
}
