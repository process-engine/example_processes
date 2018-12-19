## Programmierteil (nodejs)

Das Registrieren von Workern mit NodeJS wurde bereits in dem
Chatbot-Beispiel erklärt. Die Grundlagen aus dem Chatbot-Beispiel
werden hier vorausgesetzt.

Hier ist eine Übersicht der Tasks, die für die Prozessmodellierung
gefordert werden:

| Task         | erwartet als Payload       | gibt zurück                | Seiteneffekt                        |
|--------------|----------------------------|----------------------------|-------------------------------------|
| TakeElement  | Index eines Turms          | Oberstes Element des Turms | Entfernt oberstes Element des Turms |
| PutElement   | Element; Index eines Turms |                            | Legt Element oben auf einen Turm ab |
| CheckIfEmpty | Index eines Turms          | `true` oder `false`        |                                     |

## Worker registrieren

In einer Datei `start.js` ergibt sich folgender Code zum Registrieren
der Worker.

```js
const {HttpClient} = require('@essential-projects/http');
const {
  ExternalTaskApiClientService,
  ExternalTaskApiExternalAccessor,
  ExternalTaskWorker,
} = require('@process-engine/external_task_api_client');

const {TowerService} = require('./tower-service');

const httpClient = new HttpClient();
httpClient.config = {
  url: 'http://localhost:8000',
}

const externalAccessor = new ExternalTaskApiExternalAccessor(httpClient);
const externalTaskAPIService = new ExternalTaskApiClientService(externalAccessor);
const externalTaskWorker = new ExternalTaskWorker(externalTaskAPIService);

const identity = {
  token: 'ZHVtbXlfdG9rZW4=',
};

const maxNumberOfTasksToGet = 1;
const longPollingTimeoutInMs = 10000;

const towerService = new TowerService();

function registerTask(topicName, callback) {

  externalTaskWorker.waitForAndHandle(
    identity,
    topicName,
    maxNumberOfTasksToGet,
    longPollingTimeoutInMs,
    callback.bind(towerService));
}

registerTask('TakeElement', towerService.takeElement);
registerTask('PutElement', towerService.putElement);
registerTask('CheckIfEmpty', towerService.checkIfEmpty);
```

Hier wird den Methoden `takeElement`, `putElement` und `checkIfEmpty`
einer Klasse `TowerService` die Funktionalität zu Tasks mit den
gleichnamigen Topics zugeschrieben.

## TowerService

Die Klasse zum Bearbeiten der Tasks erstellen wir in einer
gesonderten Datei `tower-service.js`.

### Konstruktor

```js
constructor() {
  this.towers = [['A', 'B', 'C'], [], []];
  this._displayTowers('This is the start position.');
}
```

In dem Konstruktor wird der Startzustand der Türme in der
Instanzvariable `towers` gespeichert.

Zu Beginn soll der Startzustand der Türme in der Konsole dargestellt
werden. Der Aufruf `this._displayTowers('This is the start
position.');` stellt die Türme mit der übergebenen Beschreibung dar.

Mit dem Erstellen des TowerService erhalten wir in der Konsole folgende Ausgabe:

```
 A
 B
 C
 -----
 0 1 2
This is the start position.
```

### takeElement

```js
async takeElement(externalTask) {

  const fromIndex = externalTask.payload;
  const element = this.towers[fromIndex].shift();

  await this._sleepOneSecond();
  this._displayTowers(`Take element ${element} from ${fromIndex}.`);

  return new ExternalTaskFinished(externalTask.id, element);
}
```

TakeElement soll einem Turm ein Element entnehmen und das Element als
Payload zurückgeben. `externalTask.payload` repräsentiert beim Aufruf
dieses Tasks den Index des Turms und wird daher in der Variable
`fromIndex` zwischengespeichert.

Die Operation auf dem Turm geschieht mit der Anweisung `const element
= this.towers[fromIndex].shift();`.

Damit wir den Progress langsam mitverfolgen können wird mittels `await
this._sleepOneSecond();` die Funktion für eine Sekunde angehalten. Wir
stellen wieder den Turmzustand mit einer Beschreibung der Aktion mittels
`_displayTowers` dar.

Zuletzt wird das Element als Payload zurückgegeben.


### putElement

```js
async putElement(externalTask) {

  const {element, toIndex} = externalTask.payload;
  this.towers[toIndex].unshift(element);

  await this._sleepOneSecond();
  this._displayTowers(`Put element ${element} to ${toIndex}.`);

  return new ExternalTaskFinished(externalTask.id);
}
```

Diese Funktion ähnelt `takeElement` sehr.

Es bestehen folgende Unterschiede:

- die übergebende Payload ist hier ein Objekt und liefert Element und
  Zielturm,
- es wird die Arrayfunktion `unshift` genutzt um das element auf den Zielturm abzulegen und
- es wird kein Wert als Payload zurückgegeben.


### checkIfEmpty

```js
async checkIfEmpty(externalTask) {

  const towerIndex = externalTask.payload;
  const towerIsEmpty = this.towers[towerIndex].length === 0;

  return new ExternalTaskFinished(externalTask.id, towerIsEmpty);
}
```

Auch `checkIfEmpty` weist keine neuen Konzepte auf.

In der übergebenden Payload steht der Index des zu kontrollierenden Turms.
Der Worker gibt `true` oder `false` zurück; je nachdem, ob der Turm leer ist.

### _sleepOneSecond

```js
async _sleepOneSecond() {

  return new Promise((resolve) => setTimeout(resolve, 1000));
}
```

Diese Hilfsfunktion wird genutzt um den Ablauf zu verzögern.

### _displayTowers

```js
_displayTowers(subtitle) {
  const maxHeight = this.towers.reduce((size, tower) =>
                             Math.max(tower.length, size), 0);

  const sameLengthTowers = this.towers.map((tower) => {
    const emptySlotsLength = maxHeight - tower.length;
    const emptySlots = Array(emptySlotsLength).fill(' ');
    return emptySlots.concat(tower);
  });

  let lines = '';
  for (let i = 0; i < maxHeight; i++) {

    const newLine = sameLengthTowers
          .reduce((text, tower) => `${text} ${tower[i]}`, '');
    lines = `${lines}\n${newLine}`
  }

  const underscore =' ' + '-'.repeat(sameLengthTowers.length * 2 - 1);
  const numbers = Array.from(sameLengthTowers.keys())
        .reduce((acc, cur) => acc + ' ' + cur);

  let output = lines + '\n'
      + underscore + '\n '
      + numbers + '\n'
      + subtitle + '\n\n';

  console.log(output)
}
```

`_displayTowers` dient der Darstellung der Türme.

Im ersten Schritt werden die Türme auf diesselbe Lange gebracht, indem
kürzere Türme mit Leerzeichen gefüllt werden. Aus `[['B', 'C'],
['A'], []]` entsteht so `[['B', 'C'], [' ', 'A'], [' ', ' ']]`.

Dann werden die einzelnen Zeilen der Turmdarstellung generiert. Die
Elemente aller Türme am Index `i` ergeben eine Zeile.

`underscore` und `numbers` repräsentieren den Unterstrich und
`subtitle` beschreibt den Vorgang.

Eine mögliche Ausgabe dieser Funktion sieht so aus:

```
 B
 C A
 -----
 0 1 2
Put element A to 1.
```

### Export

```js
module.exports.TowerService = TowerService;
```

Um die Klasse in `start.js` verwenden zu können, muss sie noch
exportiert werden.
