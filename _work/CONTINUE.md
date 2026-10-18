# Aktualizacja sceny słowniczka — wersja 2

Na życzenie użytkownika przebudowano WYŁĄCZNIE scenę 3D słowniczka i okna
pojęć. Katalog na dole i quiz są zachowane. Punktem wyjścia sceny jest kopia
geometrii, materiałów, oświetlenia, wody, siatki, halo i satelity ze strony głównej
(_work/src/home-scene-copy.js), z żółtawą paletą.

Nowa ściana: 7 kolumn, 14 wierszy, kwadratowe kafle, szerokość 2 długości
kadłuba. Wysokość wynika z kwadratowych kafli: około 4 długości kadłuba.
Domyślny kadr statku, pełne kadry ściany/sceny oraz przybliżenia fragmentów.
Dialogi na wzór okien pluginów, pomarańczowe ramki i duże prostokątne obrazy.

Wciąż jeden lokalny bundle skryptymariswww.js (Three.js 0.180.0).
Wejście do budowania: _work/src/main.js. Scena: glossary-scene.js.
Nie przywracaj CDN / type=module. Katalog i quiz nie były zmieniane.
Na podstawie wcześniejszego polecenia użytkownika nie uruchomiono testów.
Nowa paczka jest odrębną kopią, nie nadpisuje poprzedniego pliku ZIP.

Najnowsza poprawka: środek ściany na wysokości środka kadłuba rufy;
około połowy ściany pod wodą. Z UI słowniczka usunięto numery stron,
nazwę dokumentu źródłowego i link do niego. Quiz bez zmian.
