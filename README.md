# freeCodeCamp_ShowTheLocalWeather
Strona zbudowana na potrzeby kursu freeCodeCamp, pokazująca aktualną pogodę, korzystająca z funkcjonalności geolokalizacji.

Fukkcjonalność w wersji 1.0 z dnia 24.04.2017 r.

1. Pobiera współrzędne geograficzne z przeglądarki, jeśli są dostępne.
2. Pobiera wyszukane miejscowości, ich współrzędne geograficzne i czas z serwisu geonames.org.
3. Pobiera aktualną pogodę z serwisu openweathermap.org.
4. Pozwala na wyszukanie miejscowości.
5. Animowane ikonki odpowiadają stanowi atmosferycznemu oraz porze dnia, pochodzą z https://darkskyapp.github.io/skycons/
6. Strona w pełni responsywna.

--
Znane błędy w wersji 1.0

1. W niektórych przypadkach występuje błąd z doborem ikonek do pory dnia, natomiast poprawnie dobiera do warunków atmosferycznych.
2. Program wymaga zmiany API, aby komunikować się po https://

OSTRZEŻENIE

1. Google Chrome, Opera, Firefox umożliwiają użycie geolokalizacji jedynie poprzez https://. Dodałem certyfikat SSL do domeny, na której jest strona, niestety dostęp do API mam tylko po http, chyba że zapłacę 500 dolarów! Proszę używać do testów IE11, Edge po http, albo pozostałych przeglądarek po https, ale potwierdzając komunikat o potencjalnie niebezpiecznej zawartości.