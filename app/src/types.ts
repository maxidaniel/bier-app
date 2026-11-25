// Gemeinsame Typen der App

export type Bier = {
  id: string;
  name: string;
  brauerei: string;
  land: string;
  sorte: string;
  alkohol: number;
  ebc: number;
  note: number; // Durchschnitt von 1 bis 5
  anzahl: number; // Anzahl Bewertungen
};

export type Bewertung = {
  sterne: number; // 1 bis 5
  kommentar: string;
};

// Eigene Bewertungen pro Bier-ID, z. B. { "tegernseer-hell": [ {sterne: 5, kommentar: ""} ] }
export type EigeneBewertungen = Record<string, Bewertung[]>;

export type LandWertung = {
  land: string;
  note: number;
  anzahl: number;
};
