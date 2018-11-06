#!/usr/bin/env python
# -*- coding: utf-8 -*-

import asyncio
import json

from external_task_api_client.external_task_api_client_service import ExternalTaskApiClientService
from external_task_api_client.external_task_finished import ExternalTaskFinished
from external_task_api_client.external_task_worker import ExternalTaskWorker


async def handle_external_task(task):
    """This is used as callback, if an External Task can be processed.

    :task: The External Task object we are supposed to process.
    :returns: The ExternalTaskFinished as successful response.
    """
    print(task)

    task_result = {"testprop": "Hallo"}

    return ExternalTaskFinished(task["id"], task_result)


async def main():
    """This is the main() of our external task sample."""
    external_task_client = ExternalTaskApiClientService("http://localhost:8000")

    worker = ExternalTaskWorker(external_task_client)

    await worker.waitForHandle(
        identity={"token": "ZHVtbXlfdG9rZW4="},
        topic="TestTopic",
        maxTasks=10,
        longPollingTimeout=10_000,
        handleAction=handle_external_task
    )

asyncio.run(main())
