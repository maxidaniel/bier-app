type Props = { note: number };

// Zeigt eine Note (1 bis 5) als Sterne an, z. B. 4,3 -> ★★★★☆
export default function Sterne({ note }: Props) {
  const voll = Math.round(note);
  return (
    <span className="sterne-anzeige" aria-label={`${note.toFixed(1)} von 5 Sternen`}>
      {"★".repeat(voll)}
      <span className="sterne-leer">{"★".repeat(5 - voll)}</span>
    </span>
  );
}
