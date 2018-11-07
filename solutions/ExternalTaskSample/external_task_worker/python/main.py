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
    external_task_client = ExternalTaskApiClientService(
        "https://testidentityserver.westeurope.cloudapp.azure.com")

    worker = ExternalTaskWorker(external_task_client)

    await worker.wait_for_handle(
        identity={"token": "ZHVtbXlfdG9rZW4="},
        topic="TestTopic",
        max_tasks=10,
        long_polling_timeout=10_000,
        handle_action=handle_external_task
    )

asyncio.run(main())
