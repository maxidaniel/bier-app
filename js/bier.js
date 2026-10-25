// Detailseite: bier.html?id=tegernseer-hell zeigt genau ein Bier
import { ladeBiere, rangliste, formatZahl, flagge } from "./daten.js";

const bereich = document.querySelector("#bier-detail");

// Welches Bier? Steht in der Adresse hinter "?id="
const id = new URLSearchParams(window.location.search).get("id");

// Eine Zeile "Bezeichnung: Wert" für die Faktenliste
function fakt(liste, bezeichnung, wert) {
  const dt = document.createElement("dt");
  dt.textContent = bezeichnung;
  const dd = document.createElement("dd");
  dd.textContent = wert;
  liste.append(dt, dd);
}

function zeigeBier(bier, platz, gesamt) {
  document.title = `${bier.name} · Bierkarte der Welt`;

  const farbe = document.createElement("div");
  farbe.className = `beer-color beer-color-gross ebc-${bier.ebc}`;
  farbe.setAttribute("aria-hidden", "true");

  const h1 = document.createElement("h1");
  h1.textContent = bier.name;

  const meta = document.createElement("p");
  meta.className = "lead beer-meta";
  meta.append(flagge(bier.land), ` ${bier.land} · ${bier.sorte}`);

  const fakten = document.createElement("dl");
  fakten.className = "fakten";
  fakt(fakten, "Brauerei", bier.brauerei);
  fakt(fakten, "Alkohol", `${formatZahl(bier.alkohol)} % vol.`);
  fakt(fakten, "Farbe", `${bier.ebc} EBC`);
  fakt(fakten, "Bewertung", `${formatZahl(bier.note)} von 5 (${bier.anzahl} Bewertungen)`);
  fakt(fakten, "Rangliste", `Platz ${platz} von ${gesamt}`);

  const aktionen = document.createElement("p");
  aktionen.className = "hero-actions";
  const bewerten = document.createElement("a");
  bewerten.className = "button";
  bewerten.href = "bewerten.html";
  bewerten.textContent = "Dieses Bier bewerten";
  const zurueck = document.createElement("a");
  zurueck.className = "button button-ghost";
  zurueck.href = "biere.html";
  zurueck.textContent = "Zurück zu allen Bieren";
  aktionen.append(bewerten, zurueck);

  bereich.replaceChildren(farbe, h1, meta, fakten, aktionen);
}

function zeigeFehler(text) {
  const h1 = document.createElement("h1");
  h1.textContent = "Bier nicht gefunden";
  const p = document.createElement("p");
  p.textContent = text;
  const link = document.createElement("a");
  link.href = "biere.html";
  link.textContent = "Zurück zu allen Bieren";
  bereich.replaceChildren(h1, p, link);
}

async function start() {
  try {
    const liste = rangliste(await ladeBiere());
    const index = liste.findIndex((b) => b.id === id);
    if (index === -1) {
      zeigeFehler("Zu dieser Adresse gibt es kein Bier in unserer Liste.");
    } else {
      zeigeBier(liste[index], index + 1, liste.length);
    }
  } catch (fehler) {
    zeigeFehler(`Die Biere konnten nicht geladen werden (${fehler.message}).`);
  }
}

start();
