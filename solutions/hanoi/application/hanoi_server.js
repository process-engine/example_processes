const express = require('express');
const app = express();

const state = [
  ['A', 'B', 'C'],
  [],
  [],
];
/**
we want:
[
  [],
  [],
  ['A', 'B', 'C'],
]
*/

app.get('/is-empty/:position', function (req, res) {
  const arrayIndex = req.params.position - 1;
  const isEmpty = Array.isArray(state[arrayIndex]) && state[arrayIndex].length === 0;
  res.send(isEmpty);
});

app.post('/move/:from/:to', (req, res) => {
  const fromIndex = req.params.from - 1;
  const toIndex = req.params.to - 1;
  const item = state[fromIndex].pop();
  state[toIndex].push(item);

  prettyPrintTowers(state);
  console.log(state)
  res.send(state);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

function prettyPrintTowers(state) {
  const maxHeight = state.reduce((prev, current) => prev < current ? current : prev, 0);

  for (let i = maxHeight; i > 0; i--) {
    const line = state.reduce((prev, current) => {
      if (current[i]) {
        return prev + current[1];
      }
      return prev;
    }, '');
    console.log(line)
  }
}
