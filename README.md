# WeatherNow

WeatherNow är en väderapplikation byggd med React som hämtar data från OpenWeather API. Projektet är responsivt, enkelt att använda och ger en snabb överblick över aktuellt väder, prognoser och personliga favoritstäder.

---

## Funktioner och utvecklingssteg

1. **Sökfunktion**
   - Sök på valfri stad och visa aktuellt väder.
   - Validering: om fältet är tomt visas ett felmeddelande “ange stad”.
   - E2E-test med Cypress: sök på ‘Lund’ och verifiera resultat.
   
2. **Favoriter**
   - Lägg till städer som favoriter för snabb åtkomst.
   - Klicka på en favoritstad för att visa vädret utan att söka.
   - E2E-testet för favoriter blev godkänt.

3. **Väderinformation**
   - Aktuell temperatur, “känns som”, väderbeskrivning och ikon.
   - Detaljer: vind, soluppgång, solnedgång.
   - Väderprognos: timvis och 5-dagars vy.

4. **Styling**
   - Sökfält, knappar och lista med favoritstäder har egen styling.
   - Responsiv design för mobil, tablet och desktop.
   - På mobila enheter staplas detaljerna under aktuell väderinformation.

5. **Responsivitet**
   - Använder media queries för att anpassa layouten på mobila enheter.
   - Högerdelen med vind, soluppgång och solnedgång flyttas under vänsterdelen på små skärmar.

6. **Git och commits**
   - Projektet utvecklades med små, logiska commits:
     - Sökfunktion
     - Favoriter
     - Väderprognos
     - Responsiv design
     - Validering av input
   - Detta gör det lätt att följa utvecklingen steg för steg.

---

## Teknologier

- React
- CSS för styling och responsivitet
- OpenWeather API
- Cypress för end-to-end tester
- LocalStorage för att spara favoritstäder
