import { z } from "zod";
import {
    OpenAPIRegistry,
    OpenApiGeneratorV3,
    extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";

import { registerSchema, loginSchema } from "../validators/auth.validator";
import { userResponseSchema } from "../validators/user.validator";
import { createTaskSchema, taskResponseSchema, updateTaskSchema } from "../validators/task.validator";

// Extiende Zod para soportar metadata openapi
extendZodWithOpenApi(z);

// Crea el registry
const registry = new OpenAPIRegistry();

const listTasksQuery = z.object({ ownerId: z.string().uuid().optional() });

// Registrar schemas como components (para poder referenciarlos)
registry.registerPath({
    method: "post",
    path: "/auth/register",
    summary: "Register new user",
    tags: ["Auth"],
    request: {
        body: {
            content: {
                "application/json": { schema: registerSchema },
            },
        },
    },
    responses: {
        201: { description: "Created", content: { "application/json": { schema: userResponseSchema } } },
        400: { description: "Bad Request", content: { "application/json": { schema: z.object({ message: z.string() }) } } },
    },
});

registry.registerPath({
    method: "post",
    path: "/auth/login",
    summary: "Log in",
    tags: ["Auth"],
    request: {
        body: {
            content: {
                "application/json": { schema: loginSchema },
            },
        },
    },
    responses: {
        200: { description: "OK", content: { "application/json": { schema: z.object({ token: z.string(), user: userResponseSchema }) } } },
        401: { description: "Unauthorized", content: { "application/json": { schema: z.object({ message: z.string() }) } } },
    },
});

// Users
registry.registerPath({
    method: "get",
    path: "/api/users",
    summary: "List users",
    tags: ["Users"],
    responses: {
        200: { description: "OK", content: { "application/json": { schema: z.array(userResponseSchema) } } },
    },
});

registry.registerPath({
    method: "post",
    path: "/api/users",
    summary: "Create user",
    tags: ["Users"],
    request: {
        body: { content: { "application/json": { schema: registerSchema } } },
    },
    responses: {
        201: { description: "Created", content: { "application/json": { schema: userResponseSchema } } },
        400: { description: "Bad Request", content: { "application/json": { schema: z.object({ message: z.string() }) } } },
    },
});

registry.registerPath({
    method: "get",
    path: "/api/users/{id}",
    summary: "Get user by id",
    tags: ["Users"],
    request: { params: z.object({ id: z.string().uuid() }) },
    responses: {
        200: { description: "OK", content: { "application/json": { schema: userResponseSchema } } },
        404: { description: "Not Found", content: { "application/json": { schema: z.object({ message: z.string() }) } } },
    },
});

registry.registerPath({
    method: "delete",
    path: "/api/users/{id}",
    summary: "Delete user",
    tags: ["Users"],
    request: { params: z.object({ id: z.string().uuid() }) },
    responses: {
        204: { description: "No Content" },
        404: { description: "Not Found", content: { "application/json": { schema: z.object({ message: z.string() }) } } },
    },
});

// Tasks
registry.registerPath({
    method: "post",
    path: "/api/tasks",
    summary: "Create task",
    tags: ["Tasks"],
    security: [{ bearerAuth: [] }], // referencia a security scheme que añadiremos luego
    request: {
        body: {
            content: {
                "application/json": { schema: createTaskSchema },
            },
        },
    },
    responses: {
        201: { description: "Created", content: { "application/json": { schema: taskResponseSchema } } },
        401: { description: "Unauthorized", content: { "application/json": { schema: z.object({ message: z.string() }) } } },
    },
});

registry.registerPath({
    method: "get",
    path: "/api/tasks",
    summary: "List tasks",
    tags: ["Tasks"],
    request: { query: listTasksQuery },
    responses: {
        200: { description: "OK", content: { "application/json": { schema: z.array(taskResponseSchema) } } },
    },
});

registry.registerPath({
    method: "put",
    path: "/api/tasks/{id}",
    summary: "Update task",
    tags: ["Tasks"],
    security: [{ bearerAuth: [] }],
    request: {
        params: z.object({ id: z.string().uuid() }),
        body: { content: { "application/json": { schema: updateTaskSchema } } },
    },
    responses: {
        200: { description: "OK", content: { "application/json": { schema: taskResponseSchema } } },
        401: { description: "Unauthorized", content: { "application/json": { schema: z.object({ message: z.string() }) } } },
        404: { description: "Not Found", content: { "application/json": { schema: z.object({ message: z.string() }) } } },
    },
});

registry.registerPath({
    method: "delete",
    path: "/api/tasks/{id}",
    summary: "Delete task",
    tags: ["Tasks"],
    security: [{ bearerAuth: [] }],
    request: { params: z.object({ id: z.string().uuid() }) },
    responses: {
        204: { description: "No Content" },
        401: { description: "Unauthorized", content: { "application/json": { schema: z.object({ message: z.string() }) } } },
        404: { description: "Not Found", content: { "application/json": { schema: z.object({ message: z.string() }) } } },
    },
});

// Config básico del documento
const docConfig = {
    openapi: "3.0.0",
    info: {
        title: "Clean API - Users & Tasks",
        version: "1.0.0",
        description: "API ejemplo con Clean Architecture, Zod y OpenAPI generado automáticamente",
    },
    servers: [{ url: "/" }],
};

// Exportamos función que genera el OpenAPI object
export function generateOpenApi() {
    const generator = new OpenApiGeneratorV3(registry.definitions);
    const doc = generator.generateDocument(docConfig);

    // Añadir security scheme bearer a components (si no apoyado por la librería automáticamente)
    doc.components = doc.components || {};
    doc.components.securitySchemes = {
        ...(doc.components.securitySchemes || {}),
        bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
        },
    };

    doc.security = doc.security || [];
    // no forzamos seguridad global; cada path puede declarar security

    return doc;
}
