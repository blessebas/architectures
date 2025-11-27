# Hexagonal Architecture (Ports & Adapters) — Users & Tasks

## Qué es Hexagonal
- El dominio es independiente; conversa con el exterior mediante puertos.
- Adaptadores conectan los puertos con tecnologías concretas (HTTP, DB, JWT, bcrypt).
- Facilita testeo y reemplazo de infraestructura sin tocar el dominio.

## Capas y responsabilidades
- `domain`
  - `entities`: reglas y comportamiento (`user.entity.ts`, `task.entity.ts`).
  - `ports`: contratos (`user.repository.ts`, `task.repository.ts`, `password.hasher.ts`, `token.service.ts`).
- `application`
  - `use-cases`: coordinan entidades y puertos, sin depender de Express/Prisma.
  - `mappers`/`dtos`: formatos de entrada/salida.
- `adapters`
  - `inbound`: HTTP (rutas, controladores, middlewares, validación Zod).
  - `outbound`: Prisma repos, JWT, bcrypt, Prisma client.
- `docs/openapi`: generación de OpenAPI y Swagger UI en `/docs`.

## Ejecutar
- Variables: `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`.
- Comandos: `npm install` → `npm run gen:openapi` → `npm run prisma:generate` → `npm run dev`.

## Ideas clave
- Puertos son interfaces del dominio; adaptadores los implementan.
- Los casos de uso conversan solo con puertos; Express/Prisma viven fuera.
- Validación en el borde (inbound); el dominio se mantiene limpio.

