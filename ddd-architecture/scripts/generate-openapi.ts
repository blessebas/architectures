import { writeFileSync } from "fs";
import { resolve } from "path";
import { generateOpenApi } from "../src/docs/openapi/registry";

const doc = generateOpenApi();
const outPath = resolve(__dirname, "../src/docs/openapi/openapi.json");
writeFileSync(outPath, JSON.stringify(doc, null, 2), { encoding: "utf-8" });
console.log(`OpenAPI written to ${outPath}`);

