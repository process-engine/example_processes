# Registration

In dem hier vorgestellten Beispiel erstellen wir Diagramme zur
Registrierung von Nutzern. Es geht darum ein Verständnis für
unerwartetes Verhalten und das Behandeln dessen zu erlangen.

In den vorherigen Tutorial wurden viele Bauteile vorgestellt, die als
Grundlage zur Erstellung komplexer und mächtiger Prozessarchitekturen
dienen. Aber auch mit gekonntem Umgang dieser Werkzeuge ist es oft
schwierig oder umständlich gewisse Probleme zu modellieren. Manchmal
treten Probleme auf; verursacht durch menschlichen Irrtum oder
technisches Fehlverhalten. Es bleibt die Frage, wie wir unerwartete
Verhalten in unseren Diagrammen modellieren.

Wenn wir bei einem klaren, geradlinigen Prozess jedes Fehlverhalten
durch einen neuen Entscheidungspfad modellieren, wird der Prozess
deutlich komplexer und es wird schwieriger ersichtlich wohin der
Prozess führen soll.

## Lernziele

- Umgang mit ErrorEndEvents und BoundaryEvents
- Verständnis für Unterschied / Anwendungsgebiete von ExclusiveGateways und BoundaryEvents

## Aufbau

Wir erstellen zwei Diagramme: `Registration` und `Registration User
Input`.  `Registration` ist hierbei der grundlegende Prozess zur
Erstellung von Nutzern, in dessen Rahmen `Registration User Input`
aufgerufen wird.

Hier sind die Anleitungen zum Nachbau der Diagramme:

- [Registration](./registration.md) beschreibt den grundlegenden
  Ablauf zum Registrieren von Nutzern und
- [Registration User Input](./registration_user_input.md) behandelt
  die Nutzereingabe bei der Registration und kann bei Fehleingabe
  scheitern.
