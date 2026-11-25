import { useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { Bier } from "../types";
import { formatZahl, laenderWertung, nachKonsum } from "../lib/daten";
import SternAuswahl from "../components/SternAuswahl";
import LadeStatus from "../components/LadeStatus";

type Props = {
  biere: Bier[];
  laedt: boolean;
  fehler: string | null;
  onBewerten: (id: string, sterne: number, kommentar: string) => void;
};

// Formular -> Zustand in App -> alle Listen und Wertungen rechnen neu
export default function Bewerten({ biere, laedt, fehler, onBewerten }: Props) {
  const [params] = useSearchParams();
  const [bierId, setBierId] = useState(params.get("bier") ?? ""); // /bewerten?bier=… wählt vor
  const [sterne, setSterne] = useState(0);
  const [kommentar, setKommentar] = useState("");
  const [bewertetId, setBewertetId] = useState<string | null>(null);
  const [hinweis, setHinweis] = useState("");

  function abschicken(e: FormEvent) {
    e.preventDefault();
    if (!bierId || sterne === 0) {
      setHinweis("Bitte ein Bier und 1 bis 5 Sterne wählen.");
      return;
    }
    onBewerten(bierId, sterne, kommentar.trim());
    setBewertetId(bierId);
    setHinweis("");
    setSterne(0);
    setKommentar("");
  }

  // Auswahlliste: pro Land eine Gruppe, darin die Biere alphabetisch
  const laender = [...new Set(biere.map((b) => b.land))].sort(nachKonsum);

  // Ergebnis nach dem Abschicken: biere ist schon neu berechnet und sortiert
  const platz = biere.findIndex((b) => b.id === bewertetId) + 1;
  const bewertet = biere[platz - 1];
  const landPlatz = bewertet ? laenderWertung(biere).findIndex((w) => w.land === bewertet.land) + 1 : 0;

  return (
    <section aria-labelledby="bewerten-titel">
      <h1 id="bewerten-titel">Bier bewerten</h1>
      <p className="lead">Du hast ein Bier probiert? Such es aus der Liste aus und vergib 1 bis 5 Sterne. Danach siehst du sofort, wo es jetzt steht.</p>
      <LadeStatus laedt={laedt} fehler={fehler} />

      <form className="rating-form" onSubmit={abschicken}>
        <label htmlFor="bier">Welches Bier hast du probiert?</label>
        <select id="bier" value={bierId} onChange={(e) => setBierId(e.target.value)} required>
          <option value="">Bitte wählen</option>
          {laender.map((land) => (
            <optgroup key={land} label={land}>
              {biere
                .filter((b) => b.land === land)
                .sort((a, b) => a.name.localeCompare(b.name, "de"))
                .map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
            </optgroup>
          ))}
        </select>

        <SternAuswahl wert={sterne} onWahl={setSterne} />

        <label htmlFor="kommentar">Kommentar (optional)</label>
        <textarea id="kommentar" rows={4} value={kommentar} onChange={(e) => setKommentar(e.target.value)} />

        {hinweis && <p className="such-status" role="alert">{hinweis}</p>}
        <button className="button" type="submit">Bewertung abschicken</button>
      </form>

      {bewertet && (
        <section className="ergebnis" aria-live="polite">
          <h2>Danke für deine Bewertung!</h2>
          <p>{bewertet.name} hat jetzt {formatZahl(bewertet.note, 2)} von 5 Punkten aus {bewertet.anzahl} Bewertungen.</p>
          <p>Damit steht es auf Platz {platz} von {biere.length} Bieren. {bewertet.land} liegt in der Länder-Wertung auf Platz {landPlatz}.</p>
          <p className="hero-actions">
            <Link className="button" to={`/biere/${bewertet.id}`}>Zum Bier</Link>
            <Link className="button button-ghost" to="/laender">Zur Länder-Wertung</Link>
          </p>
        </section>
      )}
    </section>
  );
}
