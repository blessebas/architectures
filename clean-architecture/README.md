# Clean Architecture — Users & Tasks

## Qué es Clean Architecture
- Principio de dependencia: capas externas dependen de las internas.
- Dominio y casos de uso independientes de frameworks y base de datos.
- Límites claros que permiten testear el núcleo y cambiar adaptadores.

## Capas y responsabilidades
- `domain`: entidades, reglas e interfaces de repositorios; sin dependencias externas.
- `application`: casos de uso que orquestan el dominio; puros y serializables.
- `adapters`: controladores HTTP, validación Zod, OpenAPI, middlewares.
- `infrastructure`: Prisma/JWT/bcrypt y configuración.

## Ejecutar
- Variables: `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`.
- Comandos: `npm install` → `npm run gen:openapi` → `npm run prisma:generate` → `npm run dev`.
- API en `http://localhost:3000` y documentación en `http://localhost:3000/docs`.

## Ideas clave
- El dominio no conoce Express ni Prisma.
- Validación en el borde; casos de uso retornan datos serializables.
- Composition Root en `src/main.ts`.
