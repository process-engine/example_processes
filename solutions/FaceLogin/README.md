# FaceLogin

Mit diesem Projekt wird eine ProcessEngine-Instanz mitsamt lauffähigem
Beispieldiagramm gestartet.

Bei dem Beispiel wird die [Microsoft Azure
Gesichtserkennungs-API](https://azure.microsoft.com/de-de/services/cognitive-services/face/)
für ein Login genutzt.

![Screenshot](diagram_screenshot.png)

Neben dem BPMN-Diagramm und der ProcessEngine beinhaltet dieses
Projekt eine Aurelia- und eine Server-Applikation, welche in dem
Beispieldiagramm genutzt werden.

Der Nutzer wird auf eine lokal gehostete Webseite verwiesen, wo er einen [Account anlegen](http://localhost:3000/static/#/user-registration) und seine [FaceId generieren](http://localhost:3000/static/#/generate-face-id) kann (Seiten sind erst nach Ausführen des Setups erreichbar).

Der erste UserTask präsentiert dem Nutzer ein Formular zur Eingabe der Kenndaten.
Der ServiceTask kontrolliert ob die FaceId des Nutzers zum Eintrag passt.
Anschließend wird dem Nutzer mittels UserTask Erfolg oder Misserfolg des Logins gemeldet.

## Voraussetzungen

- API-Schlüssel für Gesichtserkennung, sowie Endpoint bei [Microsoft
  Azure](https://azure.microsoft.com/de-de/try/cognitive-services/?api=face-api)
  abrufen und in der Datei
  `config/development/face-login/azure-options.json` eintragen. Beim
  Eintrag `endpoint` wird hierbei der Wert `westus`, `westeurope`,
  `southeastasia`, `eastus2`, `westcentralus`, `westus2`, `eastus`,
  `southcentralus`, `northeurope`, `eastasia`, `australiaeast` oder
  `brazilsouth` erwartet.
- [BPMN-Studio](https://github.com/process-engine/bpmn-studio) installiert & gestartet. Das BPMN-Studio muss die auf `localhost:8000` bereitstehende ProcessEngine nutzen.
- Webkamera und Browser mit Zugriff auf diese
- Datenbank aus [ProcessEngine
Skeleton](https://github.com/process-engine/skeleton/tree/develop/database)
gestartet

## Setup

- Herunterladen des Repositorys: ```git clone git@github.com:process-engine/example_processes.git```
- Navigieren zum Projektordner: ```cd example_processes/solutions/FaceLogin```
- Installieren von Fremdbibliotheken und Transpilieren des Projektes: ```npm install && npm run build```
- Starten der Applikation `npm start`:
- Das Beispieldiagramm steht nun unter dem Namen `FaceLogin` in dem
  BPMN-Studio zur Verfügung.
