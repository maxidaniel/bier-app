// Gemeinsame Bausteine für alle Seiten: Daten laden, Bewertungen, Karten bauen.

// Länder mit Flagge (Datei img/flaggen/<code>.svg).
// liter + platz = Bierkonsum pro Kopf 2024 (Kirin-Report), nur für die Top 10.
export const LAENDER = {
  "Tschechien":  { code: "cz", liter: 148.8, platz: 1 },
  "Litauen":     { code: "lt", liter: 110.6, platz: 2 },
  "Österreich":  { code: "at", liter: 104.6, platz: 3 },
  "Irland":      { code: "ie", liter: 99.0,  platz: 4 },
  "Kroatien":    { code: "hr", liter: 95.1,  platz: 5 },
  "Estland":     { code: "ee", liter: 93.2,  platz: 6 },
  "Spanien":     { code: "es", liter: 91.8,  platz: 7 },
  "Slowenien":   { code: "si", liter: 88.4,  platz: 8 },
  "Rumänien":    { code: "ro", liter: 87.4,  platz: 9 },
  "Deutschland": { code: "de", liter: 86.9,  platz: 10 },
  "Belgien":     { code: "be" },
  "USA":         { code: "us" },
  "Japan":       { code: "jp" },
  "Mexiko":      { code: "mx" },
};

const SPEICHER = "bierkarte-bewertungen";

// ---------- Eigene Bewertungen (im Browser gespeichert) ----------

// Liest alle eigenen Bewertungen: { "tegernseer-hell": [ {sterne, kommentar}, … ], … }
export function eigeneBewertungen() {
  try {
    return JSON.parse(localStorage.getItem(SPEICHER)) ?? {};
  } catch {
    return {}; // z. B. privates Fenster: dann eben ohne gespeicherte Bewertungen
  }
}

export function speichereBewertung(id, sterne, kommentar) {
  const alle = eigeneBewertungen();
  alle[id] = alle[id] ?? [];
  alle[id].push({ sterne, kommentar });
  try {
    localStorage.setItem(SPEICHER, JSON.stringify(alle));
  } catch {
    // Speichern nicht möglich: Bewertung gilt dann nur bis zum Neuladen
  }
}

// ---------- Daten laden ----------

// Lädt biere.json und rechnet die eigenen Bewertungen in den Durchschnitt ein.
export async function ladeBiere() {
  const antwort = await fetch("biere.json");
  if (!antwort.ok) {
    throw new Error(`HTTP ${antwort.status}`); // fetch wirft bei 404 keinen Fehler
  }
  const biere = await antwort.json();
  const eigene = eigeneBewertungen();

  for (const bier of biere) {
    const meine = eigene[bier.id] ?? [];
    const summe = meine.reduce((s, b) => s + b.sterne, 0);
    // neuer Schnitt = (alte Summe + meine Sterne) / (alte Anzahl + meine Anzahl)
    bier.note = (bier.note * bier.anzahl + summe) / (bier.anzahl + meine.length);
    bier.anzahl += meine.length;
  }
  return biere;
}

// ---------- Auswertungen ----------

// Alle Biere, das beste zuerst
export function rangliste(biere) {
  return [...biere].sort((a, b) => b.note - a.note);
}

// Durchschnitt pro Land: [{ land, note, anzahl }, …], bestes Land zuerst
export function laenderWertung(biere) {
  const proLand = {};
  for (const bier of biere) {
    proLand[bier.land] = proLand[bier.land] ?? [];
    proLand[bier.land].push(bier.note);
  }
  return Object.entries(proLand)
    .map(([land, noten]) => ({
      land,
      note: noten.reduce((s, n) => s + n, 0) / noten.length,
      anzahl: noten.length,
    }))
    .sort((a, b) => b.note - a.note);
}

// ---------- Kleine Helfer fürs HTML ----------

// 4.7 -> "4,7" (deutsches Komma)
export function formatZahl(zahl, stellen = 1) {
  return zahl.toLocaleString("de-DE", { minimumFractionDigits: stellen, maximumFractionDigits: stellen });
}

// <img> mit der Flagge eines Landes
export function flagge(land) {
  const img = document.createElement("img");
  img.className = "flagge";
  img.src = `img/flaggen/${LAENDER[land]?.code ?? "xx"}.svg`;
  img.alt = ""; // Landname steht daneben als Text
  img.width = 24;
  img.height = 18;
  return img;
}

// Eine klickbare Bier-Karte (Titel-Ebene h2 oder h3, je nach Seite)
export function karte(bier, ebene = "h2") {
  const article = document.createElement("article");
  article.className = "beer-card beer-card-link";

  const farbe = document.createElement("div");
  farbe.className = `beer-color ebc-${bier.ebc}`;
  farbe.setAttribute("aria-hidden", "true");

  const titel = document.createElement(ebene);
  const link = document.createElement("a");
  link.href = `bier.html?id=${encodeURIComponent(bier.id)}`;
  link.textContent = bier.name; // textContent, nie innerHTML (XSS)
  titel.append(link);

  const meta = document.createElement("p");
  meta.className = "beer-meta";
  meta.append(flagge(bier.land), ` ${bier.land} · ${bier.sorte}`);

  const bewertung = document.createElement("p");
  bewertung.className = "beer-rating";
  const score = document.createElement("span");
  score.className = "score";
  score.textContent = formatZahl(bier.note);
  bewertung.append(score, ` von 5 · ${bier.anzahl} Bewertungen`);

  article.append(farbe, titel, meta, bewertung);
  return article;
}
