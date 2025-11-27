#!/usr/bin/env bash
set -euo pipefail
PORT="${1:-3000}"
pids="$(lsof -nP -iTCP:"$PORT" -sTCP:LISTEN -t || true)"
if [ -z "$pids" ]; then
  echo "No hay procesos escuchando en el puerto $PORT"
  exit 0
fi
echo "Matando procesos en puerto $PORT: $pids"
for pid in $pids; do
  kill "$pid" || true
done
sleep 0.5
for pid in $pids; do
  if ps -p "$pid" > /dev/null 2>&1; then
    kill -9 "$pid" || true
  fi
done
if lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  exit 1
else
  echo "Puerto $PORT liberado"
fi
