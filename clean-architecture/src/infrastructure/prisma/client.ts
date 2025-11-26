import 'dotenv/config';
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

const url = process.env.DATABASE_URL;
if (!url) throw new Error('DATABASE_URL is not set');
const u = new URL(url);
const adapter = new PrismaMariaDb({
    host: u.hostname,
    port: Number(u.port || 3306),
    user: u.username,
    password: u.password,
    database: u.pathname.replace(/^\//, ''),
    connectionLimit: 5,
});

const prisma = new PrismaClient({
    adapter,
    log: ["query", "warn"],
});

export default prisma;