import { z } from "zod";
import { OpenAPIRegistry, OpenApiGeneratorV3, extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { registerSchema, loginSchema } from "../../validators/auth.validator";
import { createTaskSchema, updateTaskSchema } from "../../validators/task.validator";

extendZodWithOpenApi(z);
const registry = new OpenAPIRegistry();

const idParam = z.object({ id: z.string().uuid() });
const listTasksQuery = z.object({ ownerId: z.string().uuid().optional() });

const userResponse = z.object({ id: z.string().uuid(), name: z.string(), email: z.string().email(), createdAt: z.string() });
const taskResponse = z.object({ id: z.string().uuid(), title: z.string(), description: z.string().optional(), done: z.boolean(), ownerId: z.string().uuid().optional(), createdAt: z.string() });

registry.registerPath({ method: "post", path: "/auth/register", tags: ["Auth"], request: { body: { content: { "application/json": { schema: registerSchema } } } }, responses: { 201: { description: "Created", content: { "application/json": { schema: userResponse } } }, 400: { description: "Bad Request", content: { "application/json": { schema: z.object({ message: z.string() }) } } } } });

registry.registerPath({ method: "post", path: "/auth/login", tags: ["Auth"], request: { body: { content: { "application/json": { schema: loginSchema } } } }, responses: { 200: { description: "OK", content: { "application/json": { schema: z.object({ token: z.string(), user: userResponse }) } } }, 401: { description: "Unauthorized", content: { "application/json": { schema: z.object({ message: z.string() }) } } } } });

registry.registerPath({ method: "post", path: "/users", tags: ["Users"], request: { body: { content: { "application/json": { schema: registerSchema } } } }, responses: { 201: { description: "Created", content: { "application/json": { schema: userResponse } } }, 400: { description: "Bad Request", content: { "application/json": { schema: z.object({ message: z.string() }) } } } } });

registry.registerPath({ method: "get", path: "/users", tags: ["Users"], responses: { 200: { description: "OK", content: { "application/json": { schema: z.array(userResponse) } } } } });

registry.registerPath({ method: "get", path: "/users/{id}", tags: ["Users"], request: { params: idParam }, responses: { 200: { description: "OK", content: { "application/json": { schema: userResponse } } }, 404: { description: "Not Found", content: { "application/json": { schema: z.object({ message: z.string() }) } } } } });

registry.registerPath({ method: "delete", path: "/users/{id}", tags: ["Users"], request: { params: idParam }, responses: { 204: { description: "No Content" }, 404: { description: "Not Found", content: { "application/json": { schema: z.object({ message: z.string() }) } } } } });

registry.registerPath({ method: "post", path: "/tasks", tags: ["Tasks"], security: [{ bearerAuth: [] }], request: { body: { content: { "application/json": { schema: createTaskSchema } } } }, responses: { 201: { description: "Created", content: { "application/json": { schema: taskResponse } } }, 401: { description: "Unauthorized", content: { "application/json": { schema: z.object({ message: z.string() }) } } } } });

registry.registerPath({ method: "put", path: "/tasks/{id}", tags: ["Tasks"], security: [{ bearerAuth: [] }], request: { params: idParam, body: { content: { "application/json": { schema: updateTaskSchema } } } }, responses: { 200: { description: "OK", content: { "application/json": { schema: taskResponse } } }, 401: { description: "Unauthorized", content: { "application/json": { schema: z.object({ message: z.string() }) } } }, 404: { description: "Not Found", content: { "application/json": { schema: z.object({ message: z.string() }) } } } } });

registry.registerPath({ method: "delete", path: "/tasks/{id}", tags: ["Tasks"], security: [{ bearerAuth: [] }], request: { params: idParam }, responses: { 204: { description: "No Content" }, 401: { description: "Unauthorized", content: { "application/json": { schema: z.object({ message: z.string() }) } } }, 404: { description: "Not Found", content: { "application/json": { schema: z.object({ message: z.string() }) } } } } });

registry.registerPath({ method: "get", path: "/tasks", tags: ["Tasks"], request: { query: listTasksQuery }, responses: { 200: { description: "OK", content: { "application/json": { schema: z.array(taskResponse) } } } } });

const docConfig = { openapi: "3.0.0", info: { title: "Onion API", version: "1.0.0" }, servers: [{ url: "/" }] };

export function generateOpenApi() {
  const generator = new OpenApiGeneratorV3(registry.definitions);
  const doc = generator.generateDocument(docConfig as any);
  (doc as any).components = (doc as any).components || {};
  (doc as any).components.securitySchemes = (doc as any).components.securitySchemes || {};
  (doc as any).components.securitySchemes.bearerAuth = { type: "http", scheme: "bearer", bearerFormat: "JWT" };
  return doc;
}
