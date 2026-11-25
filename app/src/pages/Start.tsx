import { Link } from "react-router-dom";
import type { Bier } from "../types";
import { formatZahl } from "../lib/daten";
import BierListe from "../components/BierListe";
import LadeStatus from "../components/LadeStatus";
import Flagge from "../components/Flagge";
import Sterne from "../components/Sterne";

type Props = { biere: Bier[]; laedt: boolean; fehler: string | null };

// Startseite: das beste Bier groß, darunter die Top 3
export default function Start({ biere, laedt, fehler }: Props) {
  const top3 = biere.slice(0, 3); // biere ist schon nach Bewertung sortiert
  const bestes = biere[0];

  return (
    <>
      <section className="hero">
        <h1>Welches Land braut das beste Bier?</h1>
        <p className="lead">Wir sammeln Bewertungen von Bieren aus aller Welt und rechnen aus, welches Land vorne liegt. Probier, bewerte und vergleiche.</p>
        <p className="hero-actions">
          <Link className="button" to="/bewerten">Bier bewerten</Link>
          <Link className="button button-ghost" to="/laender">Zur Länder-Wertung</Link>
        </p>
      </section>

      <LadeStatus laedt={laedt} fehler={fehler} />

      {bestes && (
        <section className="bestes-bier" aria-labelledby="bestes-titel">
          <p className="klein">Aktuell bestes Bier</p>
          <h2 id="bestes-titel">
            <Link to={`/biere/${bestes.id}`}>{bestes.name}</Link>
          </h2>
          <p className="beer-meta">
            <Flagge land={bestes.land} /> {bestes.land} · {bestes.sorte}
          </p>
          <p className="beer-rating">
            <span className="score">{formatZahl(bestes.note, 2)}</span> <Sterne note={bestes.note} /> aus {bestes.anzahl} Bewertungen
          </p>
        </section>
      )}

      <section className="top" aria-labelledby="top-titel">
        <h2 id="top-titel">Die drei bestbewerteten Biere</h2>
        <BierListe biere={top3} mitPlatz />
        <p>
          <Link to="/biere">Alle Biere ansehen</Link> · <Link to="/karte">Biere auf der Karte entdecken</Link>
        </p>
      </section>
    </>
  );
}
