#!/bin/bash

# # Double check Kafka
# until node /usr/src/init/dist/src/index.js -c kafka
# do
#     echo 'Waiting for Kafka...\n'
#     sleep 2
# done

# # Wait for Auth to be ready
# until node /usr/src/init/dist/src/index.js -c service -s auth
# do
#     echo 'Waiting for Auth...\n'
#     sleep 2
# done

# start node based on ENV
if [ $NODE_ENV == "production" ]; then
  echo "Running in production..."
  node /usr/src/app/dist/main.js
else
  echo "Running in development..."
  npm run start:dev
fi
