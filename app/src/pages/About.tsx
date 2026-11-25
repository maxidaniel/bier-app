export default function About() {
  return (
    <article className="prose">
      <h1>Über die Bierkarte der Welt</h1>
      <p>Die Bierkarte der Welt sammelt Bewertungen von Bieren aus vielen Ländern und zeigt, welches Land im Durchschnitt das beliebteste Bier braut.</p>
      <section aria-labelledby="ziel-titel">
        <h2 id="ziel-titel">Für wen ist das?</h2>
        <p>Für alle, die gern neue Biere probieren und wissen wollen, was andere davon halten.</p>
      </section>
      <section aria-labelledby="stand-titel">
        <h2 id="stand-titel">Stand des Projekts</h2>
        <p>Meilenstein 2: Die App ist eine React-App mit TypeScript. Eigene Bewertungen werden im Browser gespeichert. Ein eigenes Backend mit Datenbank und Accounts folgt in Meilenstein 3.</p>
      </section>
    </article>
  );
}
