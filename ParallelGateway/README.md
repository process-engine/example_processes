# ParallelGateway

## How to use it

- Checkout the Branch
- Go into your Process Engine skeleton and start the database
- Go into the `ParallelGateway` folder
- ```npm install && npm run build && npm start```
- Open `localhost:9000` and start the `ParallelGateway` process

## What it does

It starts the parallel execution of two functions. One should take 1 second, the other 3 seconds.
When everything is done, an inclusive parallel gateway finishes the process.

## How to verify that it worked

Both parallel running functions return a text after they are done, which is going to be written to `token.history`.

The result of both tasks is mapped to the response of the inclusive parallel gateway that follows these tasks.

Therefore, once the process has finished, you should be able to retrieve the following two entries from the result:
- `st_longTask: 'longRunningFunction has finished'`
- `st_veryLongTask: 'veryLongRunningFunction has finished'`
