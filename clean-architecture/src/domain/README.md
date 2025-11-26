Propósito

- Contener el núcleo del negocio: entidades, reglas e invariantes.
- Definir contratos (interfaces) que otros módulos implementan (repositorios, servicios).
- No depende de frameworks ni de IO; solo de tipos y lógica pura.

Estructura

- `entities/`: modelos de dominio como `User` y `Task` con validaciones.
- `repositories/`: interfaces como `IUserRepository`, `ITaskRepository`.
- `errors/`: errores de dominio como `DomainError`.

Principios

- Independencia tecnológica: ningún import de Express/Prisma.
- Reglas primero: las entidades validan datos en su constructor.
- Contratos claros: las interfaces guían las implementaciones externas.
- Errores del dominio se propagan y se traducen a HTTP en adapters.
