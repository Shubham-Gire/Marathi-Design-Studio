# Docker Deployment Specification

The microservices cluster is configured for container orchestration via `docker-compose.yml`.

### Services:
- `mysql`: MySQL 8.4 Server with persistent volume and UTF8mb4 Devanagari collation.
- `redis`: Redis 7 Alpine for rate limiting and distributed caching.
- `minio`: S3 compatible object storage with web console on port 9001.
- `api-gateway`: Spring Cloud Gateway (Port 8080) reverse proxy.
- `identity-service`: Spring Boot 3.3 (Port 8081).
- `template-service`: Spring Boot 3.3 (Port 8082).
- `project-service`: Spring Boot 3.3 (Port 8083).
- `media-service`: Spring Boot 3.3 (Port 8084).
- `ai-service`: Spring Boot 3.3 (Port 8085).
- `billing-service`: Spring Boot 3.3 (Port 8086).
- `web`: Vite production preview container (Port 5173 / 80).

### Launching:
```bash
docker-compose up -d --build
```
