# Clean Architecture API — Users & Tasks (Node + TypeScript + Express)

Stack principal:

- Node.js + TypeScript + Express
- Prisma v7 con adapter MariaDB
- Zod v4 para validación
- `@asteasolutions/zod-to-openapi` para generar OpenAPI
- JWT (jsonwebtoken) y bcrypt

Dominios:

- 👤 Users
- 📝 Tasks

---

# 🧠 Filosofía del proyecto

- Separación estricta entre **Domain**, **Application**, **Adapters**, **Infrastructure**
- Casos de uso sin dependencias externas (testables y puros)
- Infraestructura reemplazable sin romper el dominio
- Controladores delgados, sin lógica de negocio
- DTOs y Entities separados; tipos pueden inferirse desde Zod

---

# 📦 Requisitos

- Node.js >= 18
- npm / yarn / pnpm

---

# � Variables de entorno

Crear `.env` en la raíz con:

```
DATABASE_URL="mysql://root:root123@localhost:3306/clean_architecture"
JWT_SECRET="changeme"
JWT_EXPIRES_IN="1h"
```

`prisma.config.ts` lee `DATABASE_URL` y Prisma usará MariaDB (driver adapter instalado).

---

# �📥 Instalación

```bash
git clone https://github.com/blessebas/clean-architecture.git
cd clean-arquitecture
npm install
```

Nota: hay un script que libera el puerto `3000` automáticamente en `postinstall`, `predev` y `prestart`.

---

# ▶️ Ejecutar en modo desarrollo

```bash
npm run dev
```

- API: `http://localhost:3000`
- Docs Swagger UI: `http://localhost:3000/docs`

---

# 🏗 Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Levanta el servidor con ts-node-dev |
| `npm run build` | Compila TypeScript a `/dist` |
| `npm start` | Ejecuta la versión compilada |
| `npm run gen:openapi` | Genera `src/adapters/openapi/docs/openapi.json` |

---

# 🗂 Estructura del proyecto (Clean Architecture)

```
src/
  domain/
    entities/
      User.ts
      Task.ts
    repositories/
      IUserRepository.ts
      ITaskRepository.ts
    errors/
      DomainError.ts

  application/
    useCases/
      users/
        CreateUserUseCase.ts
        GetUserUseCase.ts
        ListUsersUseCase.ts
        DeleteUserUseCase.ts
      tasks/
        CreateTaskUseCase.ts
        UpdateTaskUseCase.ts
        DeleteTaskUseCase.ts
        ListTasksUseCase.ts
    dtos/
      UpdateTaskDTO.ts

  adapters/
    controllers/
      AuthController.ts
      UserController.ts
      TaskController.ts
    validators/
      auth.validator.ts
      user.validator.ts
      task.validator.ts
    middleware/
      auth.middleware.ts
    openapi/
      registry.ts
      docs/openapi.json

  infrastructure/
    adapters/
      BcryptPasswordHasher.ts
      JwtTokenService.ts
    repositories/
      PrismaUserRepository.ts
      PrismaTaskRepository.ts

  main.ts
```

---

# 🔍 Explicación de las capas

### 🟧 1. DOMAIN
- Entidades y reglas (validaciones en constructor)
- Contratos (interfaces de repositorios)
- Sin dependencias de frameworks

### 🟦 2. APPLICATION (Use Cases)
- Orquestan lógica de negocio
- No conocen Express ni Prisma
- Retornan datos serializables (fechas en ISO)

### 🟩 3. ADAPTERS
- Puertos de entrada/salida: controladores, validación (Zod), middleware
- Generación de OpenAPI con `registry.ts`
- Swagger UI en `/docs`

### 🟨 4. INFRASTRUCTURE
- Implementaciones concretas (Prisma, bcrypt, JWT)
- Configuración (`prisma.config.ts`, variables de entorno)
- Composition Root en `src/main.ts`

---

# 🌐 Endpoints disponibles

## � AUTH

| Método | Ruta | Descripción |
|--------|----------------------|-------------|
| POST   | `/auth/register`     | Registrar usuario |
| POST   | `/auth/login`        | Login y token JWT |

### Ejemplo REGISTER
```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "supersecret123"
}
```

## 👤 USERS

| Método | Ruta | Descripción |
|--------|---------------------|-------------|
| GET    | `/api/users`        | Listar usuarios |
| GET    | `/api/users/:id`    | Obtener usuario por ID |
| DELETE | `/api/users/:id`    | Eliminar usuario |

## 📝 TASKS

| Método | Ruta | Descripción |
|--------|----------------------------|-------------|
| POST   | `/api/tasks`               | Crear tarea (Bearer) |
| PUT    | `/api/tasks/:id`           | Actualizar tarea (Bearer) |
| DELETE | `/api/tasks/:id`           | Eliminar tarea (Bearer) |
| GET    | `/api/tasks`               | Listar tareas |
| GET    | `/api/tasks?ownerId=UUID`  | Filtrar por propietario |

---

# 📚 Documentación OpenAPI

- Extensiones `zod` con metadatos via `.meta(...)`
- Registro de paths en `src/adapters/openapi/registry.ts`
- Generación:

```bash
npm run gen:openapi
```

Genera `src/adapters/openapi/docs/openapi.json`, consumido por Swagger UI en `/docs`.

---

# 🔒 Autenticación

- Login devuelve `{ token, user }`
- Middleware `auth.middleware.ts` valida `Authorization: Bearer <token>`
- Seguridad documentada en OpenAPI con `bearerAuth`

---

# 🧪 Testing

- Casos de uso son testeables con repositorios in-memory
- Recomendada librería Jest

---

# ⚙️ Utilidades

- `scripts/kill-port.sh` libera puertos ocupados (por defecto 3000)
- Integrado en `predev`, `prestart`, `postinstall`

---

# 📄 Licencia

MIT

---

# 🙌 Contribuciones

Abre un PR o issue para mejoras.
