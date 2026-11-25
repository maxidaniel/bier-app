import { Link } from "react-router-dom";
import type { Bier } from "../types";
import { LAENDER, formatZahl, laenderWertung } from "../lib/daten";
import Flagge from "../components/Flagge";
import LadeStatus from "../components/LadeStatus";

type Props = { biere: Bier[]; laedt: boolean; fehler: string | null };

// Länder-Wertung: wird aus den Bier-Noten berechnet (inkl. eigener Bewertungen)
export default function LaenderSeite({ biere, laedt, fehler }: Props) {
  const wertung = laenderWertung(biere);

  return (
    <section aria-labelledby="laender-titel">
      <h1 id="laender-titel">Länder-Wertung</h1>
      <p className="lead">Durchschnittliche Bewertung aller Biere eines Landes. Deine eigenen Bewertungen fließen sofort mit ein. Klick auf ein Land, um es auf der Karte zu sehen.</p>
      <LadeStatus laedt={laedt} fehler={fehler} />
      <table className="ranking">
        <caption>Länder sortiert nach Durchschnittsbewertung (von 5)</caption>
        <thead>
          <tr><th scope="col">Platz</th><th scope="col">Land</th><th scope="col">Bewertung</th><th scope="col">Biere</th></tr>
        </thead>
        <tbody>
          {wertung.map((e, i) => (
            <tr key={e.land}>
              <td>{i + 1}</td>
              <th scope="row">
                <Link to={`/karte?land=${LAENDER[e.land]?.code ?? ""}`}>
                  <Flagge land={e.land} /> {e.land}
                </Link>
              </th>
              <td>
                <meter min={0} max={5} value={e.note}>{formatZahl(e.note, 2)}</meter> {formatZahl(e.note, 2)}
              </td>
              <td>{e.anzahl}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
