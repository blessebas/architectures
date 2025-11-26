// ... existing code ...

// CommonJS config for Prisma CLI
require('dotenv/config');

module.exports = {
  schema: 'prisma/schema.prisma',
  migrations: { path: 'prisma/migrations' },
  datasource: { url: process.env.DATABASE_URL },
};