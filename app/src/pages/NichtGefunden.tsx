import { Link } from "react-router-dom";

// Für alle unbekannten Adressen (Route "*")
export default function NichtGefunden() {
  return (
    <section>
      <h1>Seite nicht gefunden</h1>
      <p>Diese Adresse gibt es in der Bierkarte nicht.</p>
      <Link to="/">Zur Startseite</Link>
    </section>
  );
}
