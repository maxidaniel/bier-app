// Gemeinsame Bausteine für die Seiten "Biere" und "Bier": Daten laden, Karten bauen.

// Flaggen-Datei pro Land: img/flaggen/<code>.svg
const FLAGGEN = {
  "Tschechien": "cz", "Litauen": "lt", "Österreich": "at", "Irland": "ie",
  "Kroatien": "hr", "Estland": "ee", "Spanien": "es", "Slowenien": "si",
  "Rumänien": "ro", "Deutschland": "de", "Belgien": "be", "USA": "us",
  "Japan": "jp", "Mexiko": "mx",
};

// Lädt die Bierliste aus biere.json (HTTP-GET, siehe Network-Tab).
export async function ladeBiere() {
  const antwort = await fetch("biere.json");
  if (!antwort.ok) {
    // fetch wirft bei 404/500 keinen Fehler, deshalb selbst prüfen
    throw new Error(`HTTP ${antwort.status}`);
  }
  return antwort.json();
}

// Alle Biere, das beste zuerst
export function rangliste(biere) {
  return [...biere].sort((a, b) => b.note - a.note);
}

// 4.7 -> "4,7" (deutsches Komma, immer eine Nachkommastelle)
export function formatZahl(zahl) {
  return zahl.toLocaleString("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

// <img> mit der Flagge eines Landes
export function flagge(land) {
  const img = document.createElement("img");
  img.className = "flagge";
  img.src = `img/flaggen/${FLAGGEN[land]}.svg`;
  img.alt = ""; // Landname steht daneben als Text
  img.width = 24;
  img.height = 18;
  return img;
}

// Baut aus EINEM Bier-Objekt eine klickbare Karte
export function karte(bier) {
  const article = document.createElement("article");
  article.className = "beer-card beer-card-link";

  const farbe = document.createElement("div");
  farbe.className = `beer-color ebc-${bier.ebc}`;
  farbe.setAttribute("aria-hidden", "true");

  const h2 = document.createElement("h2");
  const link = document.createElement("a");
  link.href = `bier.html?id=${encodeURIComponent(bier.id)}`;
  link.textContent = bier.name; // textContent, nie innerHTML (XSS)
  h2.append(link);

  const meta = document.createElement("p");
  meta.className = "beer-meta";
  meta.append(flagge(bier.land), ` ${bier.land} · ${bier.sorte}`);

  const bewertung = document.createElement("p");
  bewertung.className = "beer-rating";
  const score = document.createElement("span");
  score.className = "score";
  score.textContent = formatZahl(bier.note);
  bewertung.append(score, ` von 5 · ${bier.anzahl} Bewertungen`);

  article.append(farbe, h2, meta, bewertung);
  return article;
}
