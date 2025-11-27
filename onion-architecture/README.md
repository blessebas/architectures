# Onion Architecture — Users & Tasks

## Qué es Onion
- El dominio ocupa el centro; dependencias apuntan siempre hacia adentro.
- Capas concéntricas: dominio → aplicación → infraestructura/presentación.
- Aisla reglas de negocio del detalle técnico.

## Capas y responsabilidades
- `domain`
  - `entities` y `ports`: comportamiento y contratos del núcleo.
- `application`
  - `use-cases`, `dtos`, `mappers`: orquestación de reglas, formatos de intercambio.
- `infrastructure`
  - Implementaciones concretas (Prisma, JWT, bcrypt) que dependen de puertos del dominio.
- `presentation`
  - Controladores, rutas, middlewares, validación Zod; Swagger UI en `/docs`.

## Ejecutar
- Variables: `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`.
- Comandos: `npm install` → `npm run gen:openapi` → `npm run prisma:generate` → `npm run dev`.

## Ideas clave
- El dominio no conoce frameworks ni bases de datos.
- Dependencias hacia el centro; la periferia es reemplazable.
- Validación y transporte ocurren fuera del núcleo.

