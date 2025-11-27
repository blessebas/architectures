import path from "node:path";
import fs from "node:fs";
import { generateOpenApi } from "../src/docs/openapi/registry";

const outDir = path.join(__dirname, "../src/docs/openapi");
const outFile = path.join(outDir, "openapi.json");

fs.mkdirSync(outDir, { recursive: true });
const doc = generateOpenApi();
fs.writeFileSync(outFile, JSON.stringify(doc, null, 2));
console.log(`OpenAPI generated at: ${outFile}`);
