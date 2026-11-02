#!/usr/bin/env bash
# Marathi Design Studio Service Cluster Health Monitor

SERVICES=(
  "API Gateway:8080:/actuator/health"
  "Identity Service:8081:/actuator/health"
  "Template Service:8082:/actuator/health"
  "Project Service:8083:/actuator/health"
  "Media Service:8084:/actuator/health"
  "AI Service:8085:/actuator/health"
  "Billing Service:8086:/actuator/health"
)

echo "🔍 Probing Marathi Design Studio Health Endpoints..."
for item in "${SERVICES[@]}"; do
  IFS=":" read -r name port path <<< "$item"
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:${port}${path}")
  if [ "$STATUS" -eq 200 ]; then
    echo "✅ [ONLINE] $name on port $port"
  else
    echo "⚠️ [WARN] $name returned HTTP $STATUS"
  fi
done
