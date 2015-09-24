#!/bin/bash
export NODE_PATH=/home/c2g/ESB/
export SWARM_NODE_TYPE='demo'
export SWARM_PATH=/home/c2g/ESB/
nohup redis-server &
node /home/c2g/ESB/Adapters/Launcher.js