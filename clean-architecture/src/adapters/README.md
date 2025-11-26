Propósito

- Adaptar el mundo externo (HTTP/CLI/queues) a la capa de aplicación.
- Validar y tipar requests con Zod (v4).
- Generar documentación OpenAPI y servir Swagger UI.
- Mantener la lógica de negocio fuera de controladores y rutas.
- Comunicar con la capa de aplicación para ejecutar casos de uso.

Estructura

- `controllers/`: controladores que llaman a casos de uso.
- `validators/`: esquemas Zod para requests/responses.
- `middleware/`: `auth.middleware.ts` que valida JWT.
- `openapi/`: `registry.ts` y `docs/openapi.json` para Swagger UI.

Principios

- Delgados y deterministas: solo reciben, delegan y responden.
- Manejo de errores: capturan excepciones de aplicación y ajustan códigos HTTP.
- Sin lógica de negocio: todo vive en `application`/`domain`.
- Documentación automática: los esquemas Zod alimentan OpenAPI.

OpenAPI

- Registro en `openapi/registry.ts` usando `OpenAPIRegistry`.
- Generación con `npm run gen:openapi` que produce `openapi.json`.
- Swagger UI montado en `/docs` por `src/main.ts`.
