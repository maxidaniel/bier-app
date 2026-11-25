import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import type { Bier, EigeneBewertungen } from "../types";
import { formatZahl } from "../lib/daten";
import Flagge from "../components/Flagge";
import Sterne from "../components/Sterne";
import LadeStatus from "../components/LadeStatus";

type Props = { biere: Bier[]; eigene: EigeneBewertungen; laedt: boolean; fehler: string | null };

// Detailseite: /biere/:id zeigt genau ein Bier
export default function BierDetail({ biere, eigene, laedt, fehler }: Props) {
  const { id } = useParams(); // ID aus der URL
  const index = biere.findIndex((b) => b.id === id);
  const bier = biere[index];

  // Seitentitel im Browser-Tab anpassen
  useEffect(() => {
    document.title = bier ? `${bier.name} · Bierkarte der Welt` : "Bierkarte der Welt";
  }, [bier]);

  if (laedt || fehler) return <LadeStatus laedt={laedt} fehler={fehler} />;

  if (!bier) {
    return (
      <section className="bier-detail">
        <h1>Bier nicht gefunden</h1>
        <p>Zu dieser Adresse gibt es kein Bier in unserer Liste.</p>
        <Link to="/biere">Zurück zu allen Bieren</Link>
      </section>
    );
  }

  const meine = eigene[bier.id] ?? [];

  return (
    <section className="bier-detail">
      <div className={`beer-color beer-color-gross ebc-${bier.ebc}`} aria-hidden="true" />
      <h1>{bier.name}</h1>
      <p className="lead beer-meta">
        <Flagge land={bier.land} /> {bier.land} · {bier.sorte}
      </p>

      <dl className="fakten">
        <dt>Brauerei</dt><dd>{bier.brauerei}</dd>
        <dt>Alkohol</dt><dd>{formatZahl(bier.alkohol)} % vol.</dd>
        <dt>Farbe</dt><dd>{bier.ebc} EBC</dd>
        <dt>Bewertung</dt>
        <dd>{formatZahl(bier.note)} von 5 <Sterne note={bier.note} /> ({bier.anzahl} Bewertungen)</dd>
        <dt>Rangliste</dt><dd>Platz {index + 1} von {biere.length}</dd>
      </dl>

      <p className="hero-actions">
        <Link className="button" to={`/bewerten?bier=${bier.id}`}>Dieses Bier bewerten</Link>
        <Link className="button button-ghost" to="/biere">Zurück zu allen Bieren</Link>
      </p>

      {meine.length > 0 && (
        <>
          <h2>Deine Bewertungen</h2>
          <ul>
            {meine.map((b, i) => (
              <li key={i}>
                <Sterne note={b.sterne} /> {b.kommentar && `„${b.kommentar}“`}
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
