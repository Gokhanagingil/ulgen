#!/bin/bash
cd "$(dirname "$0")/.."
if [ -f .backend.pid ]; then
  kill $(cat .backend.pid) && rm .backend.pid && echo "Backend stopped"
fi
if [ -f .frontend.pid ]; then
  kill $(cat .frontend.pid) && rm .frontend.pid && echo "Frontend stopped"
fi
