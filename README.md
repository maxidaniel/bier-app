# Bierkarte der Welt

**Repository:** https://github.com/maxidaniel/bier-app

> Name und Matrikelnummer stehen nur in der Textabgabe in Moodle (öffentliches Repository).

## Projektidee

Die Bierkarte der Welt sammelt Bewertungen von Bieren aus vielen Ländern und rechnet aus, welches Land im Durchschnitt das beliebteste Bier braut. Sie ist für alle gedacht, die gern neue Biere probieren und wissen wollen, was andere davon halten. Nutzer können Biere ansehen, nach Ländern vergleichen und selbst bewerten.

## Seiten und URL-Struktur

| Pfad | Ressource |
|---|---|
| `/` bzw. `/index.html` | Startseite mit den drei bestbewerteten Bieren |
| `/biere.html` | Alle Biere mit Farbe, Land, Sorte und Bewertung |
| `/laender.html` | Länder-Wertung (Durchschnitt pro Land) |
| `/bewerten.html` | Formular zum Bewerten eines Biers |
| `/bier.html?id=…` | Detailseite zu einem Bier (z. B. `bier.html?id=tegernseer-hell`) |
| `/about.html` | Über das Projekt |
| `/css/style.css` | Gemeinsames Stylesheet für alle Seiten |
| `/biere.json` | Bier-Daten (werden per `fetch` geladen) |
| `/js/daten.js` | Gemeinsames Modul: Daten laden, sortieren, Karten bauen |
| `/js/biere.js` | Bierliste aufbauen + Live-Suche |
| `/js/bier.js` | Detailseite füllen |
| `/img/flaggen/` | Flaggen als SVG |

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

## Lokal starten

```
python -m http.server 8000
```
Dann http://localhost:8000 öffnen.

## JavaScript

Auf der Seite „Biere“ werden alle Biere aus `biere.json` geladen und als Karten angezeigt. Über das Suchfeld filtert man sie live nach Name, Land, Sorte oder Brauerei. Ein Klick auf ein Bier öffnet seine Detailseite (`bier.html?id=…`).

Wichtig: Wegen `fetch` und JavaScript-Modulen nicht per Doppelklick öffnen, sondern über den lokalen Server starten (siehe oben).

## Daten und Quellen

- Die Länder sind die zehn Länder mit dem höchsten Bierkonsum pro Kopf 2024 (Kirin Holdings, Global Beer Consumption by Country) plus die Länder aus dem ersten Prototyp.
- Flaggen: flag-icons von Panayiotis Lipiridis (MIT-Lizenz).
- Bewertungen sind Beispieldaten, Alkoholwerte sind Richtwerte.
