// Karte: Klick auf ein Land (Fläche, Flagge oder Knopf) zeigt seine Biere
import { ladeBiere, rangliste, karte, flagge, formatZahl, LAENDER } from "./daten.js";

const knoepfe = document.querySelector("#land-knoepfe");
const titel = document.querySelector("#land-titel");
const info = document.querySelector("#land-info");
const liste = document.querySelector("#land-biere");

let alleBiere = [];

function waehleLand(land) {
  const biere = alleBiere.filter((b) => b.land === land);

  // Markierung auf der Karte und bei den Knöpfen umschalten
  for (const el of document.querySelectorAll("[data-land]")) {
    el.classList.toggle("aktiv", el.dataset.land === land);
  }
  for (const knopf of knoepfe.querySelectorAll("button")) {
    knopf.setAttribute("aria-pressed", knopf.dataset.land === land);
  }

  titel.replaceChildren(flagge(land), ` Biere aus ${land}`);

  const schnitt = biere.reduce((s, b) => s + b.note, 0) / biere.length;
  const daten = LAENDER[land];
  info.textContent = `${biere.length} Biere · Durchschnitt ${formatZahl(schnitt, 2)} von 5`;
  if (daten?.platz) {
    info.textContent += ` · ${formatZahl(daten.liter)} Liter Bier pro Kopf und Jahr (Platz ${daten.platz} weltweit)`;
  }

  liste.replaceChildren(...biere.map((bier) => karte(bier, "h3")));
}

// Für jedes Land einen Knopf mit Flagge (auch für Tastatur-Nutzer)
function baueKnoepfe() {
  const laender = [...new Set(alleBiere.map((b) => b.land))]
    .filter((land) => document.querySelector(`.land[data-land="${land}"]`)) // nur Länder auf der Karte
    .sort((a, b) => (LAENDER[a].platz ?? 99) - (LAENDER[b].platz ?? 99));

  for (const land of laender) {
    const knopf = document.createElement("button");
    knopf.type = "button";
    knopf.className = "land-knopf";
    knopf.dataset.land = land;
    knopf.setAttribute("aria-pressed", "false");
    knopf.append(flagge(land), ` ${land}`);
    knopf.addEventListener("click", () => waehleLand(land));
    knoepfe.append(knopf);
  }
  return laender;
}

async function start() {
  try {
    alleBiere = rangliste(await ladeBiere());
    const laender = baueKnoepfe();

    // Klick auf eine Landfläche oder Flagge in der Karte
    document.querySelector(".europa").addEventListener("click", (event) => {
      const land = event.target.closest("[data-land]")?.dataset.land;
      if (land) waehleLand(land);
    });

    // karte.html?land=de wählt Deutschland direkt aus (Link aus der Länder-Wertung)
    const code = new URLSearchParams(window.location.search).get("land");
    const start = laender.find((land) => LAENDER[land].code === code) ?? laender[0];
    waehleLand(start);
  } catch (fehler) {
    info.textContent = `Die Biere konnten nicht geladen werden (${fehler.message}).`;
  }
}

start();
