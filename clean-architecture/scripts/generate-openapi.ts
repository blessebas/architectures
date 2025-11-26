import fs from "fs";
import path from "path";
import { generateOpenApi } from "../src/adapters/openapi/registry";

async function main() {
  const doc = generateOpenApi();
  const outDir = path.join(__dirname, "../src/adapters/openapi/docs");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const outPath = path.join(outDir, "openapi.json");
  fs.writeFileSync(outPath, JSON.stringify(doc, null, 2), { encoding: "utf8" });
  console.log("OpenAPI generated at:", outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
