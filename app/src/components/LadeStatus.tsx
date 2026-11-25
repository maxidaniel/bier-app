type Props = {
  laedt: boolean;
  fehler: string | null;
};

// Sichtbarer Lade- und Fehlerzustand für alle Seiten
export default function LadeStatus({ laedt, fehler }: Props) {
  if (fehler) return <p className="such-status" role="alert">Die Biere konnten nicht geladen werden ({fehler}).</p>;
  if (laedt) return <p className="such-status">Biere werden geladen …</p>;
  return null;
}
