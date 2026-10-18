# Etap III — nawigacja do bazy wiedzy

Dodano przycisk-link „chcę wiedzieć więcej” w prawym górnym obszarze nagłówka index.html. Prowadzi do bazaWiedzy/slowniczek.html. Link pozostaje widoczny na wąskich ekranach; ma minimalną wysokość 44 px i wyraźny fokus klawiatury.

Utworzono polski szkielet słowniczka z tytułem, krótką informacją o przygotowaniu oraz powrotem do ../index.html. Oba odnośniki są natywnymi elementami a i nie zależą od JavaScript ani CDN. Oznaczono strony data-page="home" oraz data-page="glossary". Szkielet nie ładuje jeszcze skryptu sceny głównej: w etapie IV należy dodać warunkową obsługę podstrony w jednym wspólnym skryptymariswww.js, a następnie jego import ../skryptymariswww.js.

## Kontrola

- Parser HTML: poprawne ścieżki, unikalne identyfikatory i obecność linku w nagłówku.
- Zweryfikowane przejście plikowe index.html → bazaWiedzy/slowniczek.html → ../index.html.
- Wszystkie wcześniejsze źródła, grafiki, wspólny JS i testy zachowano bajt w bajt.
- Powtórzono testy integracyjne etapu II w Node z rzeczywistą geometrią/raycastingiem Three.js i atrapami DOM/Canvas/renderera.
- Wyniki szczegółowe: _work/qa/stage-III-results.json; skrypt: _work/qa/verify-stage-III.py.

Nie wykonano testu w przeglądarce ani oceny renderingu WebGL/CSS. Środowisko managed Sites nie ma control-browser, więc nie uruchamiano alternatywnego podglądu. Wygląd i natywna obsługa klawiatury pozostają do weryfikacji.

Stan: ukończono I–III. Kolejny etap: IV, rzeczywista scena WebGL słowniczka z żółtym ledowym statkiem i jasnoniebieskim morzem. Etapy IV–X nie są oznaczone jako wykonane.
