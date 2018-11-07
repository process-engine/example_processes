#!/usr/bin/env python
# -*- coding: utf-8 -*-

import asyncio
import sys

from external_task_api_client.external_task_api_client_service import ExternalTaskApiClientService
from external_task_api_client.external_task_finished import ExternalTaskFinished
from external_task_api_client.external_task_worker import ExternalTaskWorker


def print_task_content(task):
    """Demonstrate how to pretty print the JSON of the task"""
    import json
    print(json.dumps(task, sort_keys=True, indent=2))


async def handle_external_task(task):
    """This is used as callback, if an External Task can be processed.

    :task: The External Task object we are supposed to process.
    :returns: The ExternalTaskFinished as successful response; the
              ExternalTaskWorker will then call the corresponding end point of the
              ProcessEngine.
    """
    print_task_content(task)

    task_result = {"testprop": "Hallo"}

    return ExternalTaskFinished(task["id"], task_result)


async def main_loop(worker):
    """This will be the place to call the wait_for_handle() of the ExternalTaskWorker"""
    return await worker.wait_for_handle(
        identity={"token": "ZHVtbXlfdG9rZW4="},
        topic="TestTopic",
        max_tasks=10,
        long_polling_timeout=10_000,
        handle_action=handle_external_task
    )


def main():
    """
    This is the main() of our external task sample; we create an
    ExternalTaskApiClientService and an ExternalTaskWorker to use in the main_loop()
    """
    process_engine_location = sys.argv[1] if len(sys.argv) == 2 else 'http://localhost:8000'

    print('Using ProcessEngine at "{}"'.format(process_engine_location))
    external_task_client = ExternalTaskApiClientService(process_engine_location)

    worker = ExternalTaskWorker(external_task_client)

    loop = asyncio.get_event_loop()

    try:
        loop.run_until_complete(main_loop(worker))
    except KeyboardInterrupt:
        print("Received exit, exiting")
        exit()


if __name__ == '__main__':
    main()
