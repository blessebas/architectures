# bash ./scripts/kill-port.sh 3000
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

# Si siguen vivos, forzar -9
for pid in $pids; do
  if ps -p "$pid" > /dev/null 2>&1; then
    echo "Proceso $pid sigue vivo, enviando SIGKILL"
    kill -9 "$pid" || true
  fi
done

# Comprobación final
if lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Advertencia: el puerto $PORT sigue ocupado"
  exit 1
else
  echo "Puerto $PORT liberado"
fi