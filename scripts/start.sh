#!/bin/bash
set -e
cd "$(dirname "$0")/.."

# start backend
cd backend && npm run start:dev &
BACK_PID=$!
cd ../frontend && npm run dev &
FRONT_PID=$!
cd ..

echo $BACK_PID > .backend.pid
echo $FRONT_PID > .frontend.pid

echo "Backend PID: $BACK_PID"
echo "Frontend PID: $FRONT_PID"
wait $BACK_PID $FRONT_PID
