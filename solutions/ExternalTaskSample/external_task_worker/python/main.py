import asyncio
import json

from external_task_api_client.external_task_api_client_service import ExternalTaskApiClientService
from external_task_api_client.external_task_finished import ExternalTaskFinished
from external_task_api_client.external_task_worker import ExternalTaskWorker


async def handle(externalTask):
    print(externalTask)
    return ExternalTaskFinished(externalTask["id"], {"testprop": "Hallo"})


async def main():
    identity = {"token": "ZHVtbXlfdG9rZW4="}
    topicName = "TestTopic"

    externalTaskApi = ExternalTaskApiClientService(
        "http://localhost:8000")

    worker = ExternalTaskWorker(externalTaskApi)

    await worker.waitForHandle(identity, topicName, 10, 10000, handle)

asyncio.run(main())
