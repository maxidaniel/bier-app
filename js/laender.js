// Länder-Wertung: Tabelle wird aus den Bier-Daten berechnet
import { ladeBiere, laenderWertung, formatZahl, flagge, LAENDER } from "./daten.js";

const tbody = document.querySelector("#laender-tabelle");

function zeile(eintrag, platz) {
  const tr = document.createElement("tr");

  const tdPlatz = document.createElement("td");
  tdPlatz.textContent = platz;

  // Landname mit Flagge, verlinkt auf die Karte
  const th = document.createElement("th");
  th.scope = "row";
  const link = document.createElement("a");
  link.href = `karte.html?land=${LAENDER[eintrag.land]?.code ?? ""}`;
  link.append(flagge(eintrag.land), ` ${eintrag.land}`);
  th.append(link);

  const tdNote = document.createElement("td");
  const meter = document.createElement("meter");
  meter.min = 0;
  meter.max = 5;
  meter.value = eintrag.note;
  meter.textContent = formatZahl(eintrag.note, 2);
  tdNote.append(meter, ` ${formatZahl(eintrag.note, 2)}`);

  const tdAnzahl = document.createElement("td");
  tdAnzahl.textContent = eintrag.anzahl;

  tr.append(tdPlatz, th, tdNote, tdAnzahl);
  return tr;
}

async function start() {
  try {
    const wertung = laenderWertung(await ladeBiere());
    tbody.replaceChildren(...wertung.map((eintrag, i) => zeile(eintrag, i + 1)));
  } catch (fehler) {
    tbody.textContent = `Die Daten konnten nicht geladen werden (${fehler.message}).`;
  }
}

start();
