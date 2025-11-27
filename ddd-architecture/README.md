# DDD Architecture — Users & Tasks (Node + TypeScript)

## Qué es DDD
- Enfoque de diseño centrado en el dominio: el código refleja el lenguaje del negocio.
- Construcción con Aggregates, Value Objects, Repositorios (como puertos), Servicios de Dominio y Aplicación.
- Aislamiento del dominio respecto a frameworks (Express/Prisma son detalles de infraestructura).

## Capas y responsabilidades
- `domain`
  - `aggregates`: consistencia de invariantes y reglas (p. ej. `User`, `Task`).
  - `value-objects`: validaciones y semántica inmutable (p. ej. `Email`, `TaskTitle`).
  - `ports`: contratos del dominio (`UserRepository`, `TaskRepository`).
- `application`
  - `services`: orquestan casos de uso; coordinan entidades y repositorios, sin lógica de I/O.
- `adapters`
  - `inbound/http`: controladores y rutas; validación Zod; autenticación.
  - `outbound`: implementaciones de puertos (Prisma repos, JWT, bcrypt).
- `shared`
  - Middlewares comunes y Prisma client.
- `docs/openapi`
  - Registro zod-to-openapi y Swagger UI en `/docs`.

## Ejecutar
- Variables: `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`.
- Comandos: `npm install` → `npm run gen:openapi` → `npm run prisma:generate` → `npm run dev`.
- API en `http://localhost:3000` y documentación en `http://localhost:3000/docs`.

## Ideas clave
- Reglas en el agregado; casos de uso coordinan, no guardan estado.
- Validación en Value Objects; entidades exponen métodos del lenguaje del dominio.
- Infraestructura sustituible: Prisma/JWT/Bcrypt detrás de puertos.

