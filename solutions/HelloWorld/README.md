# Hello BPMN-World

Um den Umgang der ProcessEngine und des BPMN-Studios zu demonstrieren, wird ein
einfaches Beispiel-Diagramm erstellt.

Ziel ist es, ein BPMN-Diagramm mit einem
[Single User Task](https://www.process-engine.io/documentation/GLOSSARY.html#user-task)
zu erstellen.

Das Diagramm sieht folgendermaßen aus:

<img src="./images/hello-world-diagram.svg" width="100%" />

Dieser
[User Task](https://www.process-engine.io/documentation/GLOSSARY.html#user-task)
wird die folgenden Elemente enthalten:

1. die Nachricht `Hello World`
2. eine Schaltfläche zum Bestätigen

Die Schaltfläche dient dazu, den
[Task](https://www.process-engine.io/documentation/GLOSSARY.html#task)
zu beenden.

## Erstellung eines neuen Diagramms

Wir benötigen ein neues Diagramm. Wir erstellen es über den Solution Explorer.

Der Solution Explorer ermöglicht uns ein neues Diagramm innerhalb einer Solution
zu erstellen.

Dazu klickt man im Solution Explorer auf den "Open a Solution"-Button.

<img src="./images/open-a-solution-button.png" width="100%" />

Es öffnet sich ein Fenster zur Auswahl eines Ordners. Bestätigt man den
ausgewählten Ordner mit einem Klick auf "Öffnen", erscheint der Ordner als
Solution im Solution Explorer.

Jetzt kann man mit dem "Datei hinzufügen"-Button ein neues Diagramm erstellen.

<img src="./images/create-new-diagram-button.png" width="100%" />

Es erscheint ein Textfeld, in dem der Name für die Datei eingegeben wird.
In diesem Fall wird `Hello World` gewählt.

<img src="./images/create-new-diagram-input.png" width="100%" />

Nach dem Erstellen öffnet sich die Design-Ansicht automatisch mit dem gerade
erstellten Diagramm.

So sieht das Ganze aus:

<img src="./images/create-new-diagram.gif" width="100%" />

## Modellierung eines Diagramms

Die Design-Ansicht zeigt uns ein Diagramm mit einer
[Lane](https://www.process-engine.io/documentation/GLOSSARY.html#lane),
einem Startevent und einem Endevent.

Durch das Auswählen eines Elements öffnet sich ein Kontextmenü; das Menü
erlaubt es neue Elemente hinzuzufügen; diese werden direkt mit dem ausgewählten
Element verbunden.

Der Sequenzfluss vom Startevent zum Endevent wird gelöscht- im Folgenden fügen
wir weitere Elemente an dieser Stelle ein.

An dem Startpunkt wird ein
[UserTask](https://www.process-engine.io/documentation/GLOSSARY.html#user-task)
mit dem Namen `Hello Word` verbunden; an diesen `USer Task`das Endevent.

Das Ganze sollte so aussehen:

<img src="./images/hello-world-diagram.png" width="100%" />

Das folgende Video zeigt den gesamten Ablauf:

<img src="./images/create-hello-world.gif" width="100%" />

## Umsetzung eines User Task

Ein
[UserTask](https://www.process-engine.io/documentation/GLOSSARY.html#user-task)
kann so konfiguriert werden, dass dem Benutzer ein Formular präsentiert wird,
dass er ausfüllen muss oder eine Bestätigung (Confirm) abzugeben.

In diesem Beispiel wird eine Confirm-Ansicht erstellt. Um das zu erreichen,
muss der UserTask wie folgt konfiguriert werden:

1. In dem Property Panel rechts, unter dem Punkt Properties, lässt sich die
   anzuzeigende Oberfläche mittels Key-Value Paaren definieren:

   Hier fügen wir eine Property namens `preferredControl` mit dem Wert `confirm` hinzu.
   Dabei steht `preferredControl` für eine Vorauswahl

   <img src="./images/extensions-selection.png" width="100%" />

1. Ein FormField mit dem Typ Boolean wird benötigt.:w

   Das Label stellt die Nachricht, die der Benutzer bestätigen soll, dar.

   **Wichtig:** Wenn der UserTask eine Confirm Ansicht anzeigen soll, muss
   immer das **ERSTE** FormField vom Typ `boolean` sein.

   Die ID spielt dabei keine Rolle.

   <img src="./images/confirm-form-field.png" width="50%" />

**Zusammenfassung**

Was wir getan haben?

Wir haben:

1. Einen [User Task](https://www.process-engine.io/documentation/GLOSSARY.html#user-task) namens `Hello World` erstellt.
1. Den Task mit einer Konfiguration für die Oberfläche versehen.
1. Die verschiedenen Ausführungsschritte miteinander verdrahtet.

Hier ist der komplette Ablauf mit Ausführung des Prozesses zu sehen:

<img src="./images/hello-world_full_example.gif" width="100%" />
