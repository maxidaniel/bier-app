import { Link } from "react-router-dom";
import type { Bier } from "../types";
import { formatZahl } from "../lib/daten";
import Flagge from "./Flagge";
import Sterne from "./Sterne";

type Props = {
  bier: Bier;
  platz?: number; // optional: Platz in der Rangliste
};

// Eine klickbare Karte für EIN Bier. Die Daten kommen über Props.
export default function BierKarte({ bier, platz }: Props) {
  return (
    <article className="beer-card beer-card-link">
      <div className={`beer-color ebc-${bier.ebc}`} aria-hidden="true" />
      <h3>
        <Link to={`/biere/${bier.id}`}>
          {platz !== undefined && `${platz}. `}
          {bier.name}
        </Link>
      </h3>
      <p className="beer-meta">
        <Flagge land={bier.land} /> {bier.land} · {bier.sorte}
      </p>
      <p className="beer-rating">
        <span className="score">{formatZahl(bier.note)}</span> <Sterne note={bier.note} />
        <br />
        {bier.anzahl} Bewertungen
      </p>
    </article>
  );
}
