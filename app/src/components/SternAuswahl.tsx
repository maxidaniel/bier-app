import { useState } from "react";

type Props = {
  wert: number; // 0 = noch nichts gewählt
  onWahl: (sterne: number) => void;
};

// 5 klickbare Sterne. Beim Drüberfahren leuchten die Sterne bis zur Maus auf.
export default function SternAuswahl({ wert, onWahl }: Props) {
  const [hover, setHover] = useState(0); // lokaler Zustand nur für den Hover-Effekt
  const anzeige = hover || wert;
  const texte = ["", "schlecht", "geht so", "okay", "gut", "hervorragend"];

  return (
    <fieldset className="stern-auswahl">
      <legend>Deine Bewertung</legend>
      <div className="sterne-reihe" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <label key={n} className={n <= anzeige ? "stern an" : "stern"} onMouseEnter={() => setHover(n)}>
            <input
              type="radio"
              name="sterne"
              value={n}
              checked={wert === n}
              onChange={() => onWahl(n)}
              required
            />
            <span aria-hidden="true">★</span>
            <span className="sr-only">{n} {n === 1 ? "Stern" : "Sterne"}</span>
          </label>
        ))}
        <span className="stern-text">{anzeige > 0 ? `${anzeige} von 5 – ${texte[anzeige]}` : "Bitte Sterne wählen"}</span>
      </div>
    </fieldset>
  );
}
