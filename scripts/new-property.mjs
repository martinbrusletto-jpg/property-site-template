import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
const dir = path.dirname(fileURLToPath(import.meta.url));
const r = spawnSync("python3", [path.join(dir, "new-property.py"), ...process.argv.slice(2)], { stdio: "inherit" });
process.exit(r.status ?? 1);
