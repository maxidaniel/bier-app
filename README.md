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
| `/about.html` | Über das Projekt |
| `/css/style.css` | Gemeinsames Stylesheet für alle Seiten |

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

## Hinweis

Statischer HTML/CSS-Prototyp ohne JavaScript. Alle Bewertungen sind Beispieldaten.
