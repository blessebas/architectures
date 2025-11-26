Propósito

- Implementar detalles técnicos y proveedores: base de datos, clientes externos, utilidades.
- Concretar contratos del dominio (repositorios) y componer la aplicación.

Estructura

- `repositories/`: `PrismaUserRepository`, `PrismaTaskRepository`, `InMemory*`.
- `adapters/`: `BcryptPasswordHasher`, `JwtTokenService`.
- `prisma.config.ts`: configuración de Prisma v7 (lee `DATABASE_URL`).
- Composition root en `src/main.ts`.

Principios

- Sustituible: puedes cambiar la tecnología manteniendo interfaces del dominio.
- Configuración centralizada: lectura de variables de entorno y clientes.
- Composición explícita: wiring en un punto de entrada único.

Variables de entorno

- `DATABASE_URL` (MariaDB): `mysql://USER:PASS@HOST:PORT/DB`
- `JWT_SECRET`: secreto para firmar tokens
- `JWT_EXPIRES_IN`: duración (por ejemplo `"1h"`)
