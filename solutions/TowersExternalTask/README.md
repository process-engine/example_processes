# Towers mit ExternalTasks

In dem vorherigen Beispiel haben wir es uns zur Aufgabe gemacht
Turmstapel auf den Kopf zu drehen. Die Komplexität konnten wir
erfolgreich verringern, indem wir mehrere Diagramme erstellt und mit
CallActivities verbunden haben.

Ein Faktor hat das Beispiel blieb jedoch verwirrend: der Zustand der
Türme wurde innerhalb des Prozesses erstellt und gepflegt. Es wurde
immer nur im Token festgehalten, wie die Türme aussehen. Es bestand
keine Kommunikation nach außen. In einer richtigen Lagerhalle hat der
Prozess so keinen Wert.

Wir erweitern das Beispiel so, dass der Zustand der Türme extern
verwaltet wird. Dies erreichen wir mit ExternalTasks.

## Programmierteil

### TurmService


### Konfiguration der Tasks
