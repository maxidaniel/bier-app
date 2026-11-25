import { Link, NavLink, Outlet } from "react-router-dom";

// Rahmen für alle Seiten: Kopf mit Navigation, Inhalt (Outlet), Fußzeile.
// NavLink setzt bei der aktiven Seite automatisch aria-current="page".
export default function Layout() {
  const links = [
    { to: "/", text: "Start" },
    { to: "/biere", text: "Biere" },
    { to: "/karte", text: "Karte" },
    { to: "/laender", text: "Länder" },
    { to: "/bewerten", text: "Bewerten" },
    { to: "/about", text: "Über" },
  ];

  return (
    <>
      <header className="site-header">
        <Link className="logo" to="/">Bierkarte der Welt</Link>
        <nav aria-label="Hauptnavigation">
          <ul className="nav-list">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.to === "/"}>{l.text}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>Bierkarte der Welt · Semesterprojekt Web-Applikationen, HTWG Konstanz, WS 2026/27</p>
        <p>Bewertungen sind Beispieldaten, Alkoholwerte sind Richtwerte. Genieße verantwortungsvoll.</p>
        <p>Kartendaten: Natural Earth (gemeinfrei) · Flaggen: flag-icons (MIT-Lizenz)</p>
      </footer>
    </>
  );
}
