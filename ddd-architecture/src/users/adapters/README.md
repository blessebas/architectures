# Users Adapters

- Inbound: HTTP (rutas/controladores) traducen requests al lenguaje del dominio.
- Outbound: implementan puertos (Prisma, JWT/bcrypt) sin filtrar detalles al dominio.
- Validación Zod en el borde; documentación vía OpenAPI.

