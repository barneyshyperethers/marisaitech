# Etap II — wynik

Zbudowano rzeczywistą kwadratową ścianę LED w scenie Three.js. Wspólną miarą L jest długość kadłuba z Box3: **15,934558 jednostki**. Szerokość ściany, jej wysokość i odstęp od zewnętrznej burty do płaszczyzny odniesienia ściany wynoszą L. „Za statkiem” oznacza tło sceny, oś -Z, nie rufę (+X jest dziobem). Niewielkie odsunięcia obudowy i kafli wynikają z grubości geometrii.

Cztery kafle: Maritime SOAR Content Pack (s. 3), SDR-AIS Fusion Edge Appliance (s. 4), LLM-SOC Maritime Alert Triage API (s. 4–5), Maritime Voice Intelligence Layer (s. 5–6). Opisy to funkcjonalne skróty z dostarczonego PDF; bez cen, procedur i chronionej metody. PNT-Trust pozostaje warstwą wspólną, a nie piątym produktem.

Każdy kafel ma ikonę SVG/Canvas i własną realistyczną ilustrację AI w grafiki/plugin-*.png. Dialog ma czarne tło, zieloną ramkę LED, niebieską czcionkę Doto i przełącznik czytelniejszego tekstu. Doto wraz z OFL jest zasobem lokalnym; potwierdzono obecność polskich znaków. Źródło fontu: oficjalne repozytorium Google Fonts, ofl/doto. Wszystkie projekty graficzne utworzono wbudowanym imagegen; obrazy oznaczone jako ilustracje koncepcyjne, nie wdrożenia.

Zachowano satelitę i siedem stref. Ustawiono dopasowanie kamery do całej sceny, statku lub ściany, także dla wąskich proporcji. Autoobrót jest domyślnie wyłączony dla czytelności ściany; przycisk pozostaje dostępny. Dodano równoległe przyciski HTML, natywne dialogi, obsługę zamknięcia, powrót fokusu i opisy działające przy błędzie CDN/WebGL.

## Weryfikacja

- Sprawdzono składnię JS, unikalność ID, odwołania DOM i pojedynczy publiczny skrypt.
- W Node uruchomiono kod aplikacji z rzeczywistą biblioteką Three.js 0.180.0 oraz atrapami DOM, Canvas2D, WebGLRenderer i OrbitControls. Potwierdzono wymiary, kadrowanie ośmiu narożników zakresu sceny dla 1200/1000/360/320 px szerokości oraz faktyczny raycasting z kamery do wszystkich czterech kafli. Sprawdzono otwieranie właściwych opisów i źródeł, przełącznik tekstu, zamknięcie i powrót fokusu, a także zachowanie po symulowanej awarii importu CDN.
- PNG mają po 1536 × 1024 i poprawne bajty; ich zgodność tematyczną oceniono z wyników imagegen.
- Oryginalne źródła i wcześniejsze materiały w _work zachowano bajt w bajt.

**To nie jest kontrola wizualna ani test w przeglądarce.** Nie zweryfikowano GPU/WebGL, rzeczywistego rysowania tekstu Canvas, CSS, natywnego Tab/ESC ani gestów dotykowych. Środowisko managed Sites nie udostępnia control-browser, więc nie uruchamiano serwera podglądu ani zastępczej przeglądarki. Kod testów i wyniki: _work/qa/verify-stage-II.mjs oraz stage-II-results.json. Wewnętrzna kopia Three.js w qa/vendor służy wyłącznie testom; nie jest zasobem publicznej strony.

## Dalej

Wykonano I–II. Najwcześniejszy pozostały etap to III: przycisk „chcę wiedzieć więcej” i szkielet bazaWiedzy/slowniczek.html. Słowniczek i quiz nie są jeszcze zrealizowane. Silnik strony nadal pobierany jest z esm.sh.
