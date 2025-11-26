Propósito

- Orquestar casos de uso del negocio (interacción entre entidades y repositorios).
- Exponer DTOs de entrada/salida para controlar qué datos atraviesan capas.
- No conocer detalles de infraestructura (DB, HTTP) ni frameworks.
- Son las acciones que tu aplicación puede ejecutar.

Estructura

- `useCases/`: casos de uso como `CreateUserUseCase`, `ListTasksUseCase`.
- `dtos/`: estructuras de datos como `UpdateTaskDTO`.

Principios

- Coordinación, no persistencia: delega en repositorios del dominio.
- Datos planos: retorna objetos serializables (por ejemplo, fechas en ISO).
- Validaciones de proceso: existencia, unicidad, reglas de flujo.
- Tipado práctico: algunos DTOs pueden inferirse desde Zod para evitar duplicidad.
