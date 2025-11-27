# Arquitecturas Backend en Node/TypeScript

Este repositorio reúne diferentes estilos de arquitectura aplicados a un backend en Node.js con TypeScript, con el objetivo de estudiar y comparar enfoques y sus implicancias prácticas sobre el diseño del dominio (entidades), casos de uso, puertos/adaptadores y la integración con infraestructura (Prisma, Express, JWT, Swagger/OpenAPI).

## Objetivos
- Presentar implementaciones completas y consistentes de cada arquitectura.
- Resaltar cómo se modelan las entidades del dominio y sus invariantes.
- Mostrar la separación de responsabilidades entre dominio, aplicación y capa de infraestructura.
- Facilitar la exploración mediante endpoints documentados con OpenAPI/Swagger.

## Estructura del repositorio
- `clean-architecture/`: Implementación basada en Clean Architecture
  - Capas bien definidas: `domain`, `application`, `adapters` (HTTP, validación, OpenAPI), `infrastructure` (Prisma, repositorios).
  - Casos de uso expresados en `application/useCases` y repositorios en `infrastructure/repositories`.
  - Documentación de endpoints en `src/adapters/openapi/registry.ts` y Swagger UI.
- `hexagonal-architecture/`: Implementación estilo Arquitectura Hexagonal (Ports & Adapters)
  - Dominio expresado en `src/domain/entities` y `src/domain/ports`.
  - Adaptadores inbound (HTTP) y outbound (Prisma, JWT, Bcrypt) en `src/adapters`.
  - Casos de uso en `src/application/use-cases` con mappers/DTOs.
  - OpenAPI/Swagger en `src/docs/openapi`.
- `ddd-architecture/`: Implementación siguiendo DDD (Domain-Driven Design)
  - Value Objects y Aggregates en `src/*/domain/*` (p. ej. `Email`, `TaskTitle`, `User`, `Task`).
  - Puertos del dominio en `src/*/domain/ports` y servicios de aplicación en `src/*/application/services`.
  - Adaptadores inbound/outbound (HTTP, Prisma, JWT, Bcrypt) en `src/*/adapters`.
  - OpenAPI/Swagger en `src/docs/openapi` y servidor Express en `src/main.ts`.
 - `mvc-architecture/`: Implementación clásica MVC
   - Separación por `controllers`, `models`, `routes`, middlewares y validadores.
   - Ideal para comprender patrones básicos antes de capas/puertos.
 - `n-layers-architecture/`: Implementación por N capas
   - División por `presentation`, `application`, `domain`, `infrastructure` con repositorios y casos de uso.
   - Útil para entender dependencias y límites entre capas.
 - `onion-architecture/`: Implementación Onion (dominio en el centro)
   - Capas concéntricas, dominio independiente; puertos en el dominio, adaptadores en la periferia.
 - `screaming-architecture/`: Enfatiza el lenguaje del dominio
   - Estructura por conceptos del dominio, puertos/adaptadores y casos de uso organizados por contexto.

## Entidades del dominio
- `User`
  - Campos: `id`, `name`, `email`, `passwordHash?`, `createdAt`.
  - Invariantes destacadas: `email` válido (Value Object), `name` con longitud mínima.
- `Task`
  - Campos: `id`, `title`, `description?`, `done`, `ownerId?`, `createdAt`.
  - Invariantes destacadas: `title` no vacío (Value Object), métodos de dominio para `rename`, `complete`, `reopen`.

Estas entidades están presentes en todas las arquitecturas para permitir comparaciones concretas de cómo se modelan y evolucionan.

## Orden sugerido de estudio
1. MVC
   - Punto de partida para patrón básico controlador-modelo-ruta.
2. N Layers
   - Evoluciona a separación por capas y contratos internos.
3. Clean Architecture
   - Dependencias hacia el dominio, aislamiento de infraestructura.
4. Onion Architecture
   - Capas concéntricas, dominio en el centro y puertos claros.
5. Arquitectura Hexagonal (Ports & Adapters)
   - Puertos/adaptadores explícitos, límites y contratos del dominio.
6. Screaming Architecture
   - Estructura que “grita” el dominio: módulos por conceptos.
7. DDD (Domain-Driven Design)
   - Modelado rico del dominio con Aggregates y Value Objects.

Este orden permite construir progresivamente el entendimiento: primero separación de capas, luego límites/puertos, y finalmente riqueza del modelo de dominio.

## Tecnologías comunes
- `Express` para HTTP y middlewares (`auth`, `validate`, `error`).
- `Prisma` para acceso a datos (MariaDB/MySQL), con schemas y repositorios.
- `JWT` para autenticación y `bcrypt` para hash de contraseñas.
- `Zod` para validación y `@asteasolutions/zod-to-openapi` para documentación.
- Swagger UI para explorar endpoints (`/docs`).

## Ejecución (general)
- Requisitos previos: Node.js 18+, una base de datos MariaDB/MySQL accesible.
- Variables de entorno (ejemplos):
  - `DATABASE_URL="mysql://USER:PASS@HOST:PORT/DB"`
  - `JWT_SECRET="changeme"` y `JWT_EXPIRES_IN="1h"`
- Pasos típicos en cada arquitectura:
  - `npm install`
  - Generar OpenAPI si corresponde: `npm run gen:openapi`
  - Generar Prisma Client: `npm run prisma:generate`
  - Levantar servidor: `npm run dev` (revisar `main.ts`/rutas por arquitectura)

## Endpoints comunes (conceptual)
- Autenticación: `POST /auth/register`, `POST /auth/login`.
- Usuarios: `GET /users`, `GET /users/:id`, `POST /users`, `DELETE /users/:id`.
- Tareas: `POST /tasks`, `PUT /tasks/:id`, `DELETE /tasks/:id`, `GET /tasks`.

Explora `/docs` en cada arquitectura para ver los esquemas de entrada/salida y probar rápidamente.

## Cómo comparar arquitecturas
- Observa dónde viven las entidades y sus invariantes.
- Revisa cómo se declaran puertos y se implementan adaptadores (Prisma/JWT/Bcrypt).
- Analiza la ubicación y forma de los casos de uso.
- Verifica cómo se integra la validación y generación de OpenAPI.

Este repositorio está pensado para experimentación y aprendizaje, priorizando claridad sobre abstracciones innecesarias. Si deseas profundizar en uno de los enfoques, comienza por la carpeta respectiva y sigue su `main.ts` y rutas para navegar el flujo completo.
