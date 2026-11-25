import { LAND_PFADE, KARTEN_FLAGGEN } from "../data/europa";

type Props = {
  aktiv: string | null;
  onLandKlick: (land: string) => void;
};

// Europakarte als SVG. Klick auf eine Landfläche oder Flagge meldet das Land nach oben.
export default function EuropaKarte({ aktiv, onLandKlick }: Props) {
  return (
    <svg className="europa" viewBox="0 0 800 737" role="img" aria-label="Europakarte: Länder mit Bieren in unserer Liste sind farbig">
      {LAND_PFADE.map((pfad, i) =>
        pfad.land ? (
          <path
            key={pfad.land}
            className={pfad.land === aktiv ? `${pfad.klasse} aktiv` : pfad.klasse}
            d={pfad.d}
            onClick={() => onLandKlick(pfad.land!)}
          >
            <title>{pfad.land}</title>
          </path>
        ) : (
          <path key={`grau-${i}`} className={pfad.klasse} d={pfad.d} />
        )
      )}
      {KARTEN_FLAGGEN.map((f) => (
        <image
          key={f.land}
          className={f.land === aktiv ? "flagge-karte aktiv" : "flagge-karte"}
          href={`/img/flaggen/${f.code}.svg`}
          x={f.x}
          y={f.y}
          width={24}
          height={18}
          onClick={() => onLandKlick(f.land)}
        >
          <title>{f.land}</title>
        </image>
      ))}
    </svg>
  );
}
