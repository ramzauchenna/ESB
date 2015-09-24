#!/bin/bash
export NODE_PATH=/ESB/
export SWARM_NODE_TYPE='demo'
export SWARM_PATH=/ESB/
http-server /ESB/public/ -p 8000&
nohup redis-server &
node /ESB/Adapters/Luancher.js