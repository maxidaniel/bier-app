# Bierkarte der Welt

**Repository:** https://github.com/maxidaniel/bier-app
**Git-Tag dieser Abgabe:** `Meilenstein-2`

> Name und Matrikelnummer stehen nur in der Textabgabe in Moodle (öffentliches Repository).

## Projektidee

Die Bierkarte der Welt sammelt Bewertungen von Bieren aus vielen Ländern und rechnet aus, welches Land im Durchschnitt das beliebteste Bier braut. Sie ist für alle gedacht, die gern neue Biere probieren und wissen wollen, was andere davon halten. Nutzer können Biere ansehen, suchen, auf einer Europakarte nach Ländern vergleichen und selbst mit 1 bis 5 Sternen bewerten.

## Starten (M2: React-App)

Voraussetzung: Node.js ab Version 20.

```
cd app
npm install && npm run dev
```

Dann die Adresse öffnen, die Vite anzeigt (normalerweise http://localhost:5173).
Produktions-Build: `npm run build` (prüft auch alle TypeScript-Typen).

## Aufbau des Repositorys

| Ordner / Datei | Inhalt |
|---|---|
| `app/` | **M2:** React-App mit Vite und TypeScript |
| `app/src/App.tsx` | Gemeinsamer Zustand (Biere, eigene Bewertungen) und alle Routen |
| `app/src/main.tsx` | Einstieg, `BrowserRouter` |
| `app/src/types.ts` | TypeScript-Typen `Bier`, `Bewertung`, `LandWertung` |
| `app/src/lib/daten.ts` | Logik ohne React: Laden, localStorage, Rangliste, Länder-Wertung, Suche |
| `app/src/components/` | Wiederverwendbare Komponenten: `Layout`, `BierKarte`, `BierListe`, `Flagge`, `Sterne`, `SternAuswahl`, `EuropaKarte`, `LadeStatus` |
| `app/src/pages/` | Eine Komponente pro Route |
| `app/public/biere.json` | 105 Biere (werden per `fetch` geladen) |
| `index.html`, `*.html`, `css/`, `js/` | M1-Prototyp (HTML/CSS) bzw. Vanilla-JS-Stand, bleibt zum Vergleich |

## Routen

| Pfad | Seite (Komponente) |
|---|---|
| `/` | Startseite: aktuell bestes Bier + Top 3 (`Start`) |
| `/biere` | Alle Biere mit Live-Suche (`BiereSeite`) |
| `/biere/:id` | Detailseite, z. B. `/biere/tegernseer-hell` (`BierDetail`) |
| `/karte` | Europakarte, `/karte?land=de` wählt ein Land (`KarteSeite`) |
| `/laender` | Länder-Wertung, live berechnet (`LaenderSeite`) |
| `/bewerten` | Formular mit 5 Sternen, `/bewerten?bier=…` wählt vor (`Bewerten`) |
| `/about` | Über das Projekt (`About`) |
| `*` | Seite nicht gefunden (`NichtGefunden`) |

## Kriterien-Zuordnung M2

| Kriterium | Datei | Zeile / Hinweis |
|---|---|---|
| **Tooling:** npm + Vite | app/package.json, app/vite.config.ts | Skripte `dev`/`build`; Start siehe oben |
| **Tooling:** TypeScript aktiv genutzt | app/src/types.ts | Typen ab Z. 3; überall `Props`-Typen, z. B. app/src/components/BierKarte.tsx Z. 7; `npm run build` führt `tsc` aus |
| **Komponenten:** sinnvolle Zerlegung | app/src/components/, app/src/pages/ | 8 Komponenten + 8 Seiten |
| **Komponenten:** Daten über Props | app/src/App.tsx → Seiten | Z. 47–58 (`biere`, `laedt`, `fehler`, `onBewerten` als Props) |
| | app/src/components/BierListe.tsx → BierKarte | Z. 13 (`bier` als Prop pro Karte) |
| **State:** `useState` | app/src/App.tsx | Z. 17–21 (Biere, Laden, Fehler, eigene Bewertungen) |
| | app/src/pages/BiereSeite.tsx | Z. 11 (Suchtext) |
| | app/src/pages/Bewerten.tsx | Z. 18–22 (Formularfelder) |
| | app/src/components/SternAuswahl.tsx | Z. 10 (Hover-Effekt der Sterne) |
| **Hooks:** `useEffect` | app/src/App.tsx | Z. 23–29 Daten laden; Z. 32–34 Bewertungen in localStorage speichern |
| | app/src/pages/BierDetail.tsx | Z. 18 Seitentitel setzen |
| **Durchgängige Interaktion:** Formular → Liste | Bewerten.tsx Z. 24–35 → App.tsx Z. 39 (`bewerte`) → App.tsx Z. 37 (`useMemo` rechnet neu) | Neue Bewertung ändert sofort Rangliste, Startseite, Detailseite und Länder-Wertung |
| **Durchgängige Interaktion:** Filter | app/src/pages/BiereSeite.tsx | Eingabe Z. 31 → State Z. 11 → gefilterte Liste |
| **Routing:** React Router | app/src/main.tsx Z. 9, app/src/App.tsx Z. 47–58 | 8 Routen, verschachtelt in `Layout` mit `<Outlet>` (Layout.tsx Z. 31) |
| Routen-Parameter | app/src/pages/BierDetail.tsx Z. 13 | `useParams()` für `/biere/:id` |
| Query-Parameter | app/src/pages/KarteSeite.tsx Z. 15 | `useSearchParams()`, Auswahl steht in der URL |
| Navigation | app/src/components/Layout.tsx Z. 23 | `NavLink` setzt `aria-current="page"` |
| Lade- und Fehlerzustand | app/src/components/LadeStatus.tsx Z. 8 | `fetch` mit Statusprüfung in app/src/lib/daten.ts Z. 32–37 |

## Kriterien-Zuordnung M1

| Kriterium | Datei | Zeile / Hinweis |
|---|---|---|
| Semantische HTML-Struktur (header, nav, main, section, article, footer) | index.html | header Z. 13–24, main Z. 26–60, section Z. 27, article Z. 39, footer Z. 62 |
| Formular mit `<label for>` und `name` | bewerten.html | Z. 30–62 |
| Responsives Layout: Flexbox | css/style.css | Kopfzeile Z. 89, Formular Z. 237 |
| Responsives Layout: Grid | css/style.css | Bier-Karten Z. 161 |
| Konsistente Typografie und Farben (CSS-Variablen) | css/style.css | Z. 2–22 |
| Media Queries (Mobile-First) | css/style.css | Z. 285 und Z. 298 |
| `box-sizing: border-box` | css/style.css | Z. 27 |
| Viewport-Meta-Tag | alle HTML-Dateien | Z. 5 |
| Klare URL-Struktur | alle Seiten | siehe Tabelle „Seiten und URL-Struktur“ |


> Die Zeilenangaben M1 beziehen sich auf den Stand mit Git-Tag `Meilenstein-1`.

## Bewertung mit 5 Sternen

Auf `/bewerten` wählt man ein Bier und klickt 1 bis 5 Sterne an (Komponente `SternAuswahl`, auch per Tastatur bedienbar). Die Bewertung wird im Browser gespeichert (`localStorage`) und sofort eingerechnet: neuer Schnitt = (alte Summe + neue Sterne) ÷ (alte Anzahl + 1). Die Startseite zeigt immer das aktuell bestbewertete Bier.

## Daten und Quellen

- Die Länder sind die zehn Länder mit dem höchsten Bierkonsum pro Kopf 2024 (Kirin Holdings, Global Beer Consumption by Country) plus die Länder aus dem ersten Prototyp.
- Flaggen: flag-icons von Panayiotis Lipiridis (MIT-Lizenz).
- Bewertungen sind Beispieldaten, Alkoholwerte sind Richtwerte.
