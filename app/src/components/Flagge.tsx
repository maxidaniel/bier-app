import { LAENDER } from "../lib/daten";

type Props = { land: string };

// Kleine Flagge; der Landname steht daneben als Text, deshalb alt=""
export default function Flagge({ land }: Props) {
  const code = LAENDER[land]?.code ?? "xx";
  return <img className="flagge" src={`/img/flaggen/${code}.svg`} alt="" width={24} height={18} />;
}
