# Infrastructure

- Proporciona implementaciones técnicas y servicios transversales.
- Incluye `prisma/client.ts` para acceso a datos y servicios como JWT y bcrypt.
- Depende de configuración de entorno (`DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`).
- No contiene reglas de negocio; expone utilidades usadas por controladores y modelos.
