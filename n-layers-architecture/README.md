# N Layers Architecture — Users & Tasks

## Qué es N Layers
- Organización por capas: `presentation`, `application`, `domain`, `infrastructure`.
- Cada capa tiene responsabilidades claras y depende solo de capas internas.

## Capas y responsabilidades
- `presentation`
  - Rutas HTTP, controladores, middlewares, validación Zod, Swagger UI en `/docs`.
- `application`
  - Casos de uso (orquestación), DTOs, mappers; no depende de Express/Prisma.
- `domain`
  - Entidades y contratos (repositorios, servicios). Reglas de negocio.
- `infrastructure`
  - Prisma client y repositorios, JWT, bcrypt; detalles técnicos.

## Ejecutar
- Variables: `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`.
- Comandos: `npm install` → `npm run gen:openapi` → `npm run prisma:generate` → `npm run dev`.

## Ideas clave
- Flujos claros y testables al separar responsabilidades.
- Dependencias apuntan al dominio; infraestructura reemplazable.

