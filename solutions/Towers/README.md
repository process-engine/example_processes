# Towers

Einer der wichtigsten Faktoren von BPMN ist die Modularität. Indem wir
komplexe Vorgänge auf mehrere Diagramme verteilen erreichen wir mehr
Ordnung und Austauschbarkeit.

Das hier vorgestellte Beispiel demonstriert das Zusammensetzen
mehrerer Diagramme zur Lösung eines Problemes.

In unserem Szenario wollen wir einen Stapelturm von Elementen
verschieben. Die Reihenfolge der Elemente soll gleich bleiben. Die
Ausgangssituation sieht so aus:

```
A
B
C
-  -  -
0  1  2
```

Wir wollen den Turm von der Position `0` zu Position `2` verschieben:

```
      A
      B
      C
-  -  -
0  1  2
```

Es ist jedoch nur möglich, das oberste Element des Turmes zu
bewegen. So können wir etwa `A` von `0` auf `1` verschieben:

```

B
C  A
-  -  -
0  1  2
```

Nach kurzer Betrachtung kommt man zur folgenden Lösung:

```
A       |         |         |    C    |         |         |       A
B       | B       |    B    |    B    |    B    |       B |       B
C       | C  A    | C  A    |    A    |    A  C |    A  C |       C
-  -  - | -  -  - | -  -  - | -  -  - | -  -  - | -  -  - | -  -  -
0  1  2 | 0  1  2 | 0  1  2 | 0  1  2 | 0  1  2 | 0  1  2 | 0  1  2
        ⤻         ⤻         ⤻         ⤻         ⤻         ⤻
```

Die naive BPMN-Implementierung würde einfach eine Reihe von Tasks
beinhalten, wobei jeder Task ein einzelnes Element bewegt. Dies ist
äußerst unübersichtlich und verhindert die Wiederverwendbarkeit des
Prozesses. Was wäre, wenn folgend die Aufgabe entsteht, dass der Turm
zur Position `1` verschoben werden soll?  Und wie sähe das Diagramm
aus, wenn der Turm nicht nur drei Elemente hoch wäre, sondern
hunderte?

Zur modularen Lösung erstellen wir drei Prozesse:

1. **Move Element** erlaubt das Bewegen des obersten Element eines
   Turms auf die oberste Stelle einer anderen Position.
1. **Flip Tower** dreht den Turm auf den Kopf und bewegt ihn
   dabei. Dieser Vorgang ist sehr einfach umzusetzen, da wir immer nur das
   oberste Element verschieben müssen.
1. **Move Tower** erstellt die Ausgangslage und verschiebt den Turm
   von Position `0` zu `2`. Dies erreichen wir, indem wir zweifach
   **Flip Tower** aufrufen.

## Datenrepräsentation

Im Mangel einer Lagerhalle mit Stapeltürmen voller Buchstaben brauchen
wir eine Datenrepräsentation der Türme. Wir stellen den Zustand der
Türme mit JavaScript-Arrays dar. Ein Array mit der Länge 3
repräsentiert die drei Position. Jede Position beinhaltet ein weiteres
Array mit den Elementen des Turmes.

Der folgende Zustand:
```
   B
C  A
-  -  -
0  1  2
```
wird mit `[["C"], ["B", "A"], []]` dargestellt.


# Move Element

Die technische Grundlage für das Turmproblem ist die Möglichkeit das
oberste Element eines Turmes auf einen anderen Turm (oder auf die
leere Position `[]`) zu verschieben.
Diese Funktion modellieren wir mit dem Diagramm **Move Element**.



## StartEvent

Dieses Diagramm wird über eine CallActivity aufgerufen. Normalerweise
wird bei Prozessstart ein neuer, leerer Token generiert.
Aber da dieser Prozess per CallActivity aufgerufen wird, wird das
Token beim StartEvent dieses Prozesses den letzten Tokenwert tragen,
welcher vor Aufruf der CallActivity bestand.

Für unsere Übersicht behaften wir das StartEvent mit einer
TextAnnotation, welche auf die erwarteten Startparameter verweist.

```
Expects:
{
  tower: Array<Array<string>>,
  fromIndex: number,
  toIndex: number,
}
```

Um komfortabel auf diese Startparameter zugreifen zu können, vergeben
wir eine neue ID `startevent_arguments`.


# Take Element ScriptTask

Die eigentliche Funktionalität bewältigen wir mit ScriptTasks.

Wir hängen einen neuen ScriptTask an das StartEvent mit dem Namen
`Take element of one tower` und der ID `scripttask_take_element`.


Mit der `return`-Anweisung können wir den Token um einen Wert
anreichern. Da unser Programm aus mehr als einem Ausdruck besteht,
erstellen wir eine Funktion und führen diese unmittelbar aus.

Folgender Programmcode entfernt ein Element von dem Turm an der Stelle
`fromIndex`. Sowohl der aktualisierte Zustand der Türme, als auch das
entfernte Element werden zurückgegeben.

```
return (() => {
  const {tower, fromIndex} = token.history.startevent_arguments;
  const element = tower[fromIndex].pop();
  return {
      tower: tower,
      element: element,
  };
})();
```

Der Programmcode muss in das Feld `Script` im PropertyPanel eingefügt
werden.

## Put Element ScriptTask

Wir erstellen einen weiteren ScriptTask mit dem Namen `Put element
onto another tower`. Wir müssen das zuvor entfernte Element noch auf
den Turm an der Stelle `toIndex` hinzufügen.

Hier fügen wir bei `Script` diesen Programmcode ein:

```
return (() => {
  const {tower, element} = token.history.scripttask_take_element;
  const {toIndex} = token.history.startevent_arguments;
  tower[toIndex].push(element);
  return tower;
})();
```

Der ScriptTask wird mit dem EndEvent verknüpft. Was hier als letzter
Tokenwert zurückgegeben wird, wird auch der resultierende Wert beim
Aufruf der CallActivity sein.

# Flip Tower


# Move Tower
