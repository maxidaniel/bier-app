// Seite "Alle Biere": Karten aus biere.json erzeugen + Live-Suche
import { ladeBiere, rangliste, karte } from "./daten.js";

const suchfeld = document.querySelector("#suche");
const liste = document.querySelector("#bier-liste");
const status = document.querySelector("#such-status");

let alleBiere = []; // wird einmal geladen, danach nur noch gefiltert

// Zeigt nur die Biere, die zum Suchtext passen
function zeige(suchtext) {
  const text = suchtext.trim().toLowerCase();

  const treffer = alleBiere.filter((bier) =>
    `${bier.name} ${bier.land} ${bier.sorte} ${bier.brauerei}`.toLowerCase().includes(text)
  );

  liste.replaceChildren(...treffer.map((bier) => karte(bier)));

  if (treffer.length === 0) {
    status.textContent = `Kein Bier zu „${suchtext.trim()}“ gefunden.`;
  } else if (treffer.length === 1) {
    status.textContent = "1 Bier gefunden";
  } else {
    status.textContent = `${treffer.length} Biere gefunden`;
  }
}

async function start() {
  try {
    alleBiere = rangliste(await ladeBiere()); // beste zuerst
    zeige(suchfeld.value);
  } catch (fehler) {
    status.textContent = `Die Biere konnten nicht geladen werden (${fehler.message}).`;
  }
}

// Bei jedem Tastendruck neu filtern
suchfeld.addEventListener("input", () => zeige(suchfeld.value));

// Enter im Suchfeld soll die Seite nicht neu laden
document.querySelector(".suche").addEventListener("submit", (event) => {
  event.preventDefault();
});

start();
