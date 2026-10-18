MARIS AI — nowa scena słowniczka, wersja 2 (18.10.2026)

URUCHOMIENIE
Rozpakuj całą paczkę, następnie otwórz index.html dwuklikiem.
Możesz od razu otworzyć bazaWiedzy/slowniczek.html lub bazaWiedzy/quiz.html.
Nie potrzeba Pythona, localhost ani połączenia z internetem.
Wymagana współczesna przeglądarka z WebGL 2 i akceleracją sprzętową.
Pliki można również umieścić na zwykłym hostingu statycznym.

ZAWARTOŚĆ
index.html — dotychczasowy statek, satelita i zielona ściana pluginów (I–III).
bazaWiedzy/slowniczek.html — scena przebudowana na bazie modelu, oświetlenia,
ciemnego morza, siatki i sposobu konstrukcji ściany ze strony głównej.
Materiały statku mają ciepłą, żółtawą kolorystykę. Ściana LED jest pomarańczowa:
14 wierszy × 7 kolumn, 98 kwadratowych kafli. Szerokość ściany wynosi dokładnie
2 długości kadłuba. Kwadratowe kafle przy tym układzie dają wysokość ściany
około 4 długości kadłuba (z obramowaniem i pasem tytułu). Odstęp od kadłuba:
1 długość kadłuba. Domyślny widok skupia się na statku.
Przyciski pozwalają przejść do całej ściany i całej sceny. Pasek pod sceną
przybliża fragmenty: wiersze 1–4, 5–8, 9–12 i 13–14.
Środek ściany jest na wysokości środka kadłuba na rufie; niemal połowa
ściany znajduje się pod powierzchnią wody.
Kliknięcie kafla otwiera pełną definicję z ikoną oraz prostokątną ilustracją,
w układzie okna pluginu ze strony głównej. Ramka świeci na pomarańczowo,
a tekst LED jest niebieski. Dostępny czytelniejszy font i przycisk zamknięcia.
Wyszukiwarka obejmuje nazwy i definicje; kategorie filtrują katalog i ścianę.
Katalog pod sceną daje alternatywny dostęp do wszystkich definicji.
bazaWiedzy/quiz.html — 35 pytań ABCD, po jednej poprawnej odpowiedzi (VIII–IX).
„Sprawdź wynik” pokazuje wynik X/35, poprawne odpowiedzi, definicje i linki
do słowniczka. Brak odpowiedzi daje 0 punktów. Można zmienić odpowiedzi,
ponownie obliczyć wynik lub zacząć od nowa.

OBSŁUGA SCENY
Przeciąganie — obracanie. Kółko myszy / gest szczypania — przybliżenie.
Prawy przycisk myszy — przesuwanie. Kliknięcie kafla — definicja.
Przyciski „Cała scena”, „Statek”, „Ściana pojęć” — kadrowanie.
Pełny ekran zależy od obsługi tego trybu przez przeglądarkę.
ESC / przycisk × zamyka okno; „Poprzednie” / „Następne” zmienia definicję.

ZALEŻNOŚCI I ŹRÓDŁA
Jeden lokalny skrypt skryptymariswww.js zawiera kod wszystkich trzech stron,
Three.js 0.180.0 i OrbitControls. Nie zawiera importów CDN.
Źródła aplikacji: _work/src/. Plik wejściowy: _work/src/main.js.
Budowanie: esbuild 0.25.11, bundle, format=iife, target=es2020, minify.
Zależności Three.js: _work/vendor/three-0.180.0.tgz. Licencja: LICENSE-three.txt.
Lokalny font Doto i licencja OFL są w grafiki/.
Cztery realistyczne ilustracje tematyczne AI pochodzą z dotychczasowej paczki.
Nie są zdjęciami rzeczywistych wdrożeń ani schematami technicznymi.
Źródłowy słowniczek: bazaWiedzy/Slowniczek_MARIS_AI.pdf.
Dane definicji pochodzą z ekstrakcji tego PDF-u i zachowują pełne opisy.
Katalog _work zawiera źródła i historyczne materiały robocze; nie publikować go.

STATUS KONTROLI
Nową scenę zaimplementowano i złożono do paczki. Katalog pojęć i quiz zachowano. Zgodnie z prośbą użytkownika
nie wykonywano testów, kontroli kompletności ani kontroli nawigacji tej wersji.
Etapy VI, VII i X pozostawiono do samodzielnej kontroli użytkownika.
Historyczne raporty w _work/qa odnoszą się do wcześniejszych wersji.

KOD NOWEJ SCENY
_work/src/home-scene-copy.js — kopia podstawy sceny 3D ze strony głównej,
z żółtawą paletą materiałów.
_work/src/glossary-scene.js — ściana 7 × 14, kwadratowe kafle i kadrowanie.
bazaWiedzy/scena-slowniczka.css — style sceny i okien pojęć; ładowane tylko
na stronie słowniczka. Katalog pojęć i quiz zachowują swoje dotychczasowe style.

Aktualizacja: ze strony słowniczka usunięto widoczne przypisy, numery stron
i odnośnik do źródłowego PDF-u. Treści definicji oraz quiz pozostały bez zmian.
