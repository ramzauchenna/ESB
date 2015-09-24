#!/bin/bash
export NODE_PATH=/ESB/
export SWARM_NODE_TYPE='demo'
export SWARM_PATH=/ESB/
nohup redis-server &
node /ESB/Adapters/Luancher.js