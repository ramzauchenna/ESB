#!/bin/bash
export NODE_PATH=/opt/aws/opsworks/current/site-cookbooks/
export SWARM_NODE_TYPE='demo'
export SWARM_PATH=/opt/aws/opsworks/current/site-cookbooks/
nohup redis-server &
node /opt/aws/opsworks/current/site-cookbooks/Adapters/Launcher.js