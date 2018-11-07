# ExternalTaskWorker sample written in python

This is an ExternalTaskWorker sample written in python.

### Requirements

- pipenv >= `2018.10.13`
- Python 3.7.x

### Setup/Installation

Install all Dependencies

```bash
pipenv install
```

## How do I use this project?

Start the sample worker on your machine with

```bash
pipenv run python main.py
```

This will contact a ProcessEngine at `http://localhost:8000`; you can specify
other locations as first argument of the call:

**Using other ProcessEngines**

```bash
pipenv run python main.py 'http://localhost:56639'
```

There is a demo ProcessEngine available at:

`https://testidentityserver.westeurope.cloudapp.azure.com`

If you use the BPMN-Studio you can configure it for this ProcessEngine and
use the URL above for the external task worker; you can conveniently use the
ProcessEngine, as it has the external-task sample process deployed and ready.

**Expected output**

If you use a ProcessEngine with the sample diagram provided in this repository,
this the output we expect:

```
$ pipenv run python main.py 'http://localhost:8000'
Using ProcessEngine at "http://localhost:8000"
{
  "correlationId": "3235f097-cce8-4895-80ff-e7a54486b415",
  "createdAt": "2018-11-07T15:08:52.829Z",
  "finishedAt": null,
  "flowNodeInstanceId": "ff4a860f-e8e5-4f7e-85fe-7276ae9a0143",
  "id": "f8b47de4-de0a-452c-a746-5c42ea8e9791",
  "identity": {
    "token": "ZHVtbXlfdG9rZW4="
  },
  "lockExpirationTime": "2018-11-07T15:09:22.846Z",
  "payload": "Input",
  "processInstanceId": "ef2d5394-57a5-4db1-be71-762480c8294b",
  "state": "pending",
  "topic": "TestTopic",
  "workerId": "c348c0fe-c53b-4c74-b925-91925b010565"
}
```

You can see the information, you will get from the ProcessEngine for the
subscribed topic; the topic is set in the worker and is called: `TestTopic`.
