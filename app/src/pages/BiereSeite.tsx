import { useState } from "react";
import type { Bier } from "../types";
import { filtereBiere } from "../lib/daten";
import BierListe from "../components/BierListe";
import LadeStatus from "../components/LadeStatus";

type Props = { biere: Bier[]; laedt: boolean; fehler: string | null };

// Alle Biere mit Live-Suche: Eingabe -> State -> gefilterte Liste
export default function BiereSeite({ biere, laedt, fehler }: Props) {
  const [suche, setSuche] = useState("");
  const treffer = filtereBiere(biere, suche);

  let status = `${treffer.length} Biere gefunden`;
  if (treffer.length === 1) status = "1 Bier gefunden";
  if (treffer.length === 0) status = `Kein Bier zu „${suche.trim()}“ gefunden.`;

  return (
    <section aria-labelledby="biere-titel">
      <h1 id="biere-titel">Alle Biere</h1>
      <p className="lead">Der Farbstreifen zeigt die echte Bierfarbe, von hellem Lager bis zum schwarzen Stout. Klick auf ein Bier für alle Details.</p>

      <form className="suche" role="search" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="suche">Bier suchen</label>
        <input
          id="suche"
          type="search"
          placeholder="Name, Land, Sorte oder Brauerei"
          autoComplete="off"
          value={suche}
          onChange={(e) => setSuche(e.target.value)}
        />
      </form>

      <LadeStatus laedt={laedt} fehler={fehler} />
      {!laedt && !fehler && <p className="such-status" aria-live="polite">{status}</p>}

      <BierListe biere={treffer} />
    </section>
  );
}
