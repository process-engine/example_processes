# ParallelGateway

## How to use it

Before you can use this sample, you need to setup and start an instance of
the [BPMN Studio](https://github.com/process-engine/bpmn-studio).

After that, you can use the sample by doing the following:
- Checkout the Branch
- Go into the `ParallelGateway` folder
- Run `npm install && npm run build`
- Run `npm start` to start the backend application 

This sample implements its own [Skeleton Application](), which will add the
`ParallelGateway` BPMN to your local database.
So after setting up your BPMN studio and installting, building and starting
the `ParallelGateway` app, you are good to go.
You can now open `localhost:8080` and start the `ParallelGateway` process.

## What it does

It runs five exection paths that run in parallel to each other, each simulating
a different scenario.

## How to verify that it worked

All parallel execution paths return a text after they are done, which is going
to be written to the `token.history`.

The result of each parallel execution path is mapped to the response of the
parallel join gateway located at the end of the diagram.

Therefore, once the process has finished, the final token.history should contain 
entries for each of the tasks that were run in parallel.
