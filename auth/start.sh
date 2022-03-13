#!/bin/bash

# Double check Kafka
until node /usr/src/init/dist/index.js -c kafka
do
  echo 'Waiting for Kafka...\n'
  sleep 2
done

# start node based on ENV
if [ $NODE_ENV == "production" ]; then
  echo "Running in production..."
  node /usr/src/app/dist/main.js
else
  echo "Running in development..."
  npm run start:dev
fi
