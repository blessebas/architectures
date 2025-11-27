# Screaming Architecture — Users & Tasks

## Qué es Screaming
- La estructura del proyecto “grita” el dominio: los directorios muestran conceptos del negocio.
- Evita clasificaciones técnicas genéricas; prioriza módulos y bounded contexts.

## Capas y responsabilidades
- Dominio por contextos (p. ej. `users`, `tasks`), con entidades y puertos cercanos al lenguaje del negocio.
- Casos de uso organizados por contexto; mappers/DTOs cuando hacen falta.
- Adaptadores inbound/outbound por contexto: HTTP, Prisma, JWT, bcrypt.
- Validación Zod y OpenAPI por contexto; Swagger UI en `/docs`.

## Ejecutar
- Variables: `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`.
- Comandos: `npm install` → `npm run gen:openapi` → `npm run prisma:generate` → `npm run dev`.

## Ideas clave
- La estructura guía a nuevos lectores hacia el dominio, no hacia tecnología.
- Alta coherencia por módulo; fácil de escalar con nuevos contextos.

