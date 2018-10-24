#!/bin/bash

for value in {1..100}
do
echo $value
dotnet run &
done
echo done
