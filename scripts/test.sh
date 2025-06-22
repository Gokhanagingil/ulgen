#!/bin/bash
set -e
cd "$(dirname "$0")/.."/backend
npm install --silent
OUT=$(npm run test:e2e 2>&1)
RESULT=$?
echo "$OUT" | tail -n 20
if [ $RESULT -ne 0 ]; then
  echo "Tests failed. Please check the details above." >&2
  exit $RESULT
else
  echo "All tests passed successfully."
fi
