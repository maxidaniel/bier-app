import { useEffect, useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import type { Bier, EigeneBewertungen } from "./types";
import { ladeBiere, leseBewertungen, mitEigenenBewertungen, rangliste, schreibeBewertungen } from "./lib/daten";
import Layout from "./components/Layout";
import Start from "./pages/Start";
import BiereSeite from "./pages/BiereSeite";
import BierDetail from "./pages/BierDetail";
import KarteSeite from "./pages/KarteSeite";
import LaenderSeite from "./pages/LaenderSeite";
import Bewerten from "./pages/Bewerten";
import About from "./pages/About";
import NichtGefunden from "./pages/NichtGefunden";

// App hält den gemeinsamen Zustand und gibt ihn per Props an die Seiten weiter.
export default function App() {
  const [rohBiere, setRohBiere] = useState<Bier[]>([]);
  const [laedt, setLaedt] = useState(true);
  const [fehler, setFehler] = useState<string | null>(null);
  // Eigene Bewertungen: Startwert aus localStorage
  const [eigene, setEigene] = useState<EigeneBewertungen>(leseBewertungen);

  // Einmal beim Start: biere.json laden
  useEffect(() => {
    ladeBiere()
      .then(setRohBiere)
      .catch((e: Error) => setFehler(e.message))
      .finally(() => setLaedt(false));
  }, []);

  // Bei jeder neuen Bewertung: im Browser speichern
  useEffect(() => {
    schreibeBewertungen(eigene);
  }, [eigene]);

  // Abgeleitete Daten: eigene Bewertungen einrechnen und sortieren (beste zuerst)
  const biere = useMemo(() => rangliste(mitEigenenBewertungen(rohBiere, eigene)), [rohBiere, eigene]);

  function bewerte(id: string, sterne: number, kommentar: string) {
    // Zustand nie direkt ändern, sondern neues Objekt bauen
    setEigene((alt) => ({ ...alt, [id]: [...(alt[id] ?? []), { sterne, kommentar }] }));
  }

  const status = { laedt, fehler };

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Start biere={biere} {...status} />} />
        <Route path="biere" element={<BiereSeite biere={biere} {...status} />} />
        <Route path="biere/:id" element={<BierDetail biere={biere} eigene={eigene} {...status} />} />
        <Route path="karte" element={<KarteSeite biere={biere} {...status} />} />
        <Route path="laender" element={<LaenderSeite biere={biere} {...status} />} />
        <Route path="bewerten" element={<Bewerten biere={biere} onBewerten={bewerte} {...status} />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NichtGefunden />} />
      </Route>
    </Routes>
  );
}
