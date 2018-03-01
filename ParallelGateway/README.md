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
