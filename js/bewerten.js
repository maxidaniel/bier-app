// Bewerten: Bier aus der Liste wählen, Sterne vergeben, neuen Stand anzeigen
import {
  ladeBiere, rangliste, laenderWertung, speichereBewertung, formatZahl, LAENDER,
} from "./daten.js";

const form = document.querySelector("#bewerten-form");
const auswahl = document.querySelector("#bier");
const ergebnis = document.querySelector("#ergebnis");

// Auswahlliste füllen: pro Land eine Gruppe (<optgroup>), darin die Biere
function fuelleAuswahl(biere) {
  const laender = [...new Set(biere.map((b) => b.land))]
    .sort((a, b) => (LAENDER[a].platz ?? 99) - (LAENDER[b].platz ?? 99));

  for (const land of laender) {
    const gruppe = document.createElement("optgroup");
    gruppe.label = land;
    const imLand = biere
      .filter((b) => b.land === land)
      .sort((a, b) => a.name.localeCompare(b.name, "de"));
    for (const bier of imLand) {
      gruppe.append(new Option(bier.name, bier.id));
    }
    auswahl.append(gruppe);
  }

  // bewerten.html?bier=tegernseer-hell wählt das Bier schon vor
  const vorauswahl = new URLSearchParams(window.location.search).get("bier");
  if (vorauswahl) auswahl.value = vorauswahl;
}

// Nach dem Abschicken: neuen Durchschnitt und Platz zeigen
async function zeigeErgebnis(id) {
  const biere = rangliste(await ladeBiere()); // lädt neu, jetzt mit deiner Bewertung
  const platz = biere.findIndex((b) => b.id === id) + 1;
  const bier = biere[platz - 1];
  const landPlatz = laenderWertung(biere).findIndex((e) => e.land === bier.land) + 1;

  const h2 = document.createElement("h2");
  h2.textContent = "Danke für deine Bewertung!";

  const p1 = document.createElement("p");
  p1.textContent = `${bier.name} hat jetzt ${formatZahl(bier.note, 2)} von 5 Punkten aus ${bier.anzahl} Bewertungen.`;
  const p2 = document.createElement("p");
  p2.textContent = `Damit steht es auf Platz ${platz} von ${biere.length} Bieren. ${bier.land} liegt in der Länder-Wertung auf Platz ${landPlatz}.`;

  const links = document.createElement("p");
  links.className = "hero-actions";
  const zumBier = document.createElement("a");
  zumBier.className = "button";
  zumBier.href = `bier.html?id=${encodeURIComponent(bier.id)}`;
  zumBier.textContent = "Zum Bier";
  const zuLaendern = document.createElement("a");
  zuLaendern.className = "button button-ghost";
  zuLaendern.href = "laender.html";
  zuLaendern.textContent = "Zur Länder-Wertung";
  links.append(zumBier, zuLaendern);

  ergebnis.replaceChildren(h2, p1, p2, links);
  ergebnis.hidden = false;
  ergebnis.scrollIntoView({ behavior: "smooth" });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // nicht an einen Server schicken, wir speichern im Browser

  const daten = new FormData(form);
  const id = daten.get("bier");
  const sterne = Number(daten.get("sterne"));
  const kommentar = daten.get("kommentar").trim();

  speichereBewertung(id, sterne, kommentar);
  form.reset();
  await zeigeErgebnis(id);
});

async function start() {
  try {
    fuelleAuswahl(await ladeBiere());
  } catch (fehler) {
    ergebnis.textContent = `Die Biere konnten nicht geladen werden (${fehler.message}).`;
    ergebnis.hidden = false;
  }
}

start();
