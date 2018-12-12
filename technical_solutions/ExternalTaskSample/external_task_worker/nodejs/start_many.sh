#!/bin/bash

for value in {1..1000}
do
echo $value
node index.js &
done
echo done
