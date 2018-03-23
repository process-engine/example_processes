# ErrorBoundaryEvent

## How to use it

- Checkout the Branch
- Go into your Process Engine skeleton and start the database
- Go into the `ErrorBoundaryEvent` folder
- ```npm install && npm run build && npm start```
- Set up BPMN-Studio and start it
- Open `localhost:8080` and start the `ErrorBoundaryEvent` process

## What it does

This example adds a class and a function which simply throws an error when
it gets called. 
You can find the class in `src/boundary_error/error_boundary_test.ts`

## How to verify that it worked

You can run a test by typing `npm test`. 
Then you can see whether it worked by looking in the console.
The output should be:

```javascript
{ message: 'testError', errorCode: undefined }
```
