# Emails versenden

In diesem Beispiel wird ein Prozess für den Versand von Emails modelliert.

Dazu muss der Prozess um die folgenden drei
[Tasks](../../GLOSSARY.md#task) erweitert werden:

1. Die Abfrage der Email-Adresse
1. Die Anforderung einer Bestätigung
1. Den Versand einer Email mit dem Wechselkurs

## Prozessschritte anlegen

Wir erstellen ein Diagramm mit folgenden Bestandteilen:

1. Startevent
1. User Task: `Enter Email Address`
1. User Task: `Confirm Email Address`
1. XOR-Gateway, welches unterscheidet, ob im vorherigen Usertask
   bestätigt wurde
1. Servicetask `Send Email`
1. Endevent

Im Folgenden wird Erstellung und Konfiguration dieser Elemente gezeigt.

### User Task zur Eingabe der Emailadresse

Zu Beginn erstellt man einen [User Task](../../GLOSSARY.md#user-task)
mit dem Namen `Get Email Address`. Dieser fordert den User per UI dazu
auf eine E-Mail anzugeben.

Da wir auf die Eingabe des Nutzers zugreifen werden, lohnt es sich den
User Task und das Formularfeld zu benennen.  Wir bezeichnen den User
Task als `usertask_enter_email` und das Formularfeld als `email`.

<img src="./images/create_task_get_email_address.gif" />

Es ergibt sich mit folgender Konfiguration:

<img src="./images/create_task_get_email_address.png" width="70%" />

### Usertask für Bestätigungsdialog

Ein weiterer User Task soll dem Nutzer die Möglichkeit geben, den
Prozess abzubrechen.

### XOR-Gate

Als Nächstes wird eine Überprüfung angelegt.

Es ist zu prüfen, ob in dem `Confirm Data`-[Task](../../GLOSSARY.md#task)
Confirm oder Cancel ausgewählt wurde; wir benutzen ein `Gateway` dafür.

Diese Auswahl hat Einfluss auf den weiteren Prozessweg. Cancel beendet den
Prozess; Confirm löst den `Send email`-[Task](../../GLOSSARY.md#task)
aus.

### Servicetask für Versand der Email

Der letzte Prozessschritt ist der `Send
email`-[Task](../../GLOSSARY.md#task). Dieser muss die folgenden
Eigenschaften erhalten:

```
module  MailService
method  send
params  [null, token.history.UserTask_GetEmailAddress.email, "EUR to USD conversion rate", "1 EUR = " + token.history.ServiceTask_FetchData.result.EUR_USD.val + " USD"]
```

Nach diesem [Task](../../GLOSSARY.md#task) muss der Prozess beendet
werden.

<img src="./images/confirm-and-send-email.gif" />
