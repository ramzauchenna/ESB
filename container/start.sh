#!/bin/bash
export NODE_PATH=/home/ubuntu/ESB/
export SWARM_NODE_TYPE='demo'
export SWARM_PATH=/home/ubuntu/ESB/
nohup redis-server &
node /home/ubuntu/ESB/Adapters/Launcher.js