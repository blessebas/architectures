# MVC Architecture — Users & Tasks

## Qué es MVC
- Separación en `Models`, `Views` (no aplican aquí), y `Controllers`.
- Para API REST: `controllers`, `routes`, `models`, middlewares y validación.
- Enfoque clásico, útil como punto de partida antes de capas/puertos.

## Capas y responsabilidades
- `models`
  - Representación de datos y reglas básicas; en este proyecto se apoyan en Prisma.
- `controllers`
  - Reciben requests, validan (Zod), invocan servicios/repositorios; sin lógica de negocio compleja.
- `routes`
  - Declaración de endpoints y middlewares (`auth`, `validate`, `error`).
- `infrastructure`
  - Prisma client y servicios (JWT, bcrypt).
- `docs/openapi`
  - Registro de endpoints y Swagger UI en `/docs`.

## Ejecutar
- Variables: `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`.
- Comandos: `npm install` → `npm run gen:openapi` → `npm run prisma:generate` → `npm run dev`.

## Ideas clave
- Controladores delgados; la lógica de negocio se delega a servicios.
- Validación en el borde; los modelos encapsulan reglas de datos.

