import type { Bier } from "../types";
import BierKarte from "./BierKarte";

type Props = {
  biere: Bier[];
  mitPlatz?: boolean;
};

// Raster aus Bier-Karten; jede Karte bekommt ihr Bier per Prop
export default function BierListe({ biere, mitPlatz = false }: Props) {
  return (
    <div className="beer-grid">
      {biere.map((bier, i) => (
        <BierKarte key={bier.id} bier={bier} platz={mitPlatz ? i + 1 : undefined} />
      ))}
    </div>
  );
}
