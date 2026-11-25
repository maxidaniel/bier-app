// Reine Logik ohne React: Länder, Laden, Speichern, Auswertungen
import type { Bier, EigeneBewertungen, LandWertung } from "../types";

type LandInfo = { code: string; liter?: number; platz?: number };

// liter + platz = Bierkonsum pro Kopf 2024 (Kirin-Report), nur für die Top 10
export const LAENDER: Record<string, LandInfo> = {
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

// Länder nach Bierkonsum sortieren (Top 10 zuerst)
export function nachKonsum(a: string, b: string): number {
  return (LAENDER[a]?.platz ?? 99) - (LAENDER[b]?.platz ?? 99);
}

// ---------- Laden ----------

// Lädt biere.json (HTTP-GET, siehe Network-Tab)
export async function ladeBiere(): Promise<Bier[]> {
  const antwort = await fetch("/biere.json");
  if (!antwort.ok) {
    throw new Error(`HTTP ${antwort.status}`); // fetch wirft bei 404 keinen Fehler
  }
  return (await antwort.json()) as Bier[];
}

// ---------- Eigene Bewertungen im Browser ----------

const SPEICHER = "bierkarte-bewertungen";

export function leseBewertungen(): EigeneBewertungen {
  try {
    return JSON.parse(localStorage.getItem(SPEICHER) ?? "{}") as EigeneBewertungen;
  } catch {
    return {}; // z. B. privates Fenster
  }
}

export function schreibeBewertungen(alle: EigeneBewertungen): void {
  try {
    localStorage.setItem(SPEICHER, JSON.stringify(alle));
  } catch {
    // Speichern nicht möglich: gilt dann nur bis zum Neuladen
  }
}

// ---------- Auswertungen ----------

// Rechnet die eigenen Bewertungen in Durchschnitt und Anzahl ein (ohne das Original zu ändern)
export function mitEigenenBewertungen(biere: Bier[], eigene: EigeneBewertungen): Bier[] {
  return biere.map((bier) => {
    const meine = eigene[bier.id] ?? [];
    if (meine.length === 0) return bier;
    const summe = meine.reduce((s, b) => s + b.sterne, 0);
    return {
      ...bier,
      // neuer Schnitt = (alte Summe + meine Sterne) / (alte Anzahl + meine Anzahl)
      note: (bier.note * bier.anzahl + summe) / (bier.anzahl + meine.length),
      anzahl: bier.anzahl + meine.length,
    };
  });
}

// Alle Biere, das beste zuerst
export function rangliste(biere: Bier[]): Bier[] {
  return [...biere].sort((a, b) => b.note - a.note);
}

// Durchschnitt pro Land, bestes Land zuerst
export function laenderWertung(biere: Bier[]): LandWertung[] {
  const proLand: Record<string, number[]> = {};
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

// Suche nach Name, Land, Sorte oder Brauerei
export function filtereBiere(biere: Bier[], suchtext: string): Bier[] {
  const text = suchtext.trim().toLowerCase();
  return biere.filter((bier) =>
    `${bier.name} ${bier.land} ${bier.sorte} ${bier.brauerei}`.toLowerCase().includes(text)
  );
}

// 4.7 -> "4,7" (deutsches Komma)
export function formatZahl(zahl: number, stellen = 1): string {
  return zahl.toLocaleString("de-DE", { minimumFractionDigits: stellen, maximumFractionDigits: stellen });
}
