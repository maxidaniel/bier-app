import { useSearchParams } from "react-router-dom";
import type { Bier } from "../types";
import { LAENDER, formatZahl, nachKonsum } from "../lib/daten";
import { KARTEN_FLAGGEN } from "../data/europa";
import EuropaKarte from "../components/EuropaKarte";
import BierListe from "../components/BierListe";
import Flagge from "../components/Flagge";
import LadeStatus from "../components/LadeStatus";

type Props = { biere: Bier[]; laedt: boolean; fehler: string | null };

// Karte: Klick auf Land, Flagge oder Knopf zeigt die Biere dieses Landes.
// Das gewählte Land steht in der URL (/karte?land=de), so ist jede Auswahl verlinkbar.
export default function KarteSeite({ biere, laedt, fehler }: Props) {
  const [params, setParams] = useSearchParams();

  const laenderAufKarte = KARTEN_FLAGGEN.map((f) => f.land).sort(nachKonsum);
  const code = params.get("land");
  const land = laenderAufKarte.find((l) => LAENDER[l]?.code === code) ?? laenderAufKarte[0];

  function waehle(neuesLand: string) {
    setParams({ land: LAENDER[neuesLand].code });
  }

  const imLand = biere.filter((b) => b.land === land);
  const schnitt = imLand.reduce((s, b) => s + b.note, 0) / (imLand.length || 1);
  const info = LAENDER[land];

  return (
    <>
      <section aria-labelledby="karte-titel">
        <h1 id="karte-titel">Wo kommen die Biere her?</h1>
        <p className="lead">Farbig sind die Länder mit Bieren in unserer Liste, darunter die zehn Länder, in denen pro Kopf am meisten Bier getrunken wird. Klick auf ein Land oder eine Flagge.</p>

        <div className="karte-layout">
          <figure className="karte">
            <EuropaKarte aktiv={land} onLandKlick={waehle} />
          </figure>
          <div>
            <h2 className="klein">Land wählen</h2>
            <div className="land-knoepfe">
              {laenderAufKarte.map((l) => (
                <button key={l} type="button" className="land-knopf" aria-pressed={l === land} onClick={() => waehle(l)}>
                  <Flagge land={l} /> {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="land-auswahl" aria-live="polite">
        <h2><Flagge land={land} /> Biere aus {land}</h2>
        <LadeStatus laedt={laedt} fehler={fehler} />
        {!laedt && !fehler && (
          <p className="such-status">
            {imLand.length} Biere · Durchschnitt {formatZahl(schnitt, 2)} von 5
            {info?.platz && ` · ${formatZahl(info.liter!)} Liter Bier pro Kopf und Jahr (Platz ${info.platz} weltweit)`}
          </p>
        )}
        <BierListe biere={imLand} />
      </section>
    </>
  );
}
