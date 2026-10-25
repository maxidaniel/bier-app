// Startseite: die drei bestbewerteten Biere automatisch anzeigen
import { ladeBiere, rangliste, karte } from "./daten.js";

const liste = document.querySelector("#top-liste");

async function start() {
  try {
    const top3 = rangliste(await ladeBiere()).slice(0, 3);
    liste.replaceChildren(...top3.map((bier) => karte(bier, "h3")));
  } catch (fehler) {
    liste.textContent = `Die Biere konnten nicht geladen werden (${fehler.message}).`;
  }
}

start();
