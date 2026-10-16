// Validates projects.json against projects.schema.json without dependencies.
// Run: bun run check:index
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(readFileSync(join(root, "projects.json"), "utf8"));
const schema = JSON.parse(readFileSync(join(root, "projects.schema.json"), "utf8"));

const errors = [];

function check(cond, msg) {
  if (!cond) errors.push(msg);
}

function checkType(value, def, path) {
  if (def.type === "object") {
    check(value !== null && typeof value === "object" && !Array.isArray(value), `${path}: expected object`);
    if (value === null || typeof value !== "object" || Array.isArray(value)) return;
    for (const key of def.required ?? []) {
      check(key in value, `${path}: missing required field '${key}'`);
    }
    if (def.additionalProperties === false) {
      for (const key of Object.keys(value)) {
        check(key in (def.properties ?? {}), `${path}: unexpected field '${key}'`);
      }
    }
    for (const [key, sub] of Object.entries(def.properties ?? {})) {
      if (key in value) checkType(value[key], sub, `${path}.${key}`);
    }
  } else if (def.type === "array") {
    check(Array.isArray(value), `${path}: expected array`);
    if (!Array.isArray(value)) return;
    if (def.minItems !== undefined) check(value.length >= def.minItems, `${path}: needs >= ${def.minItems} items`);
    value.forEach((item, i) => checkType(item, def.items, `${path}[${i}]`));
  } else if (def.type === "string") {
    check(typeof value === "string", `${path}: expected string`);
    if (typeof value !== "string") return;
    if (def.minLength !== undefined) check(value.length >= def.minLength, `${path}: too short`);
    if (def.pattern !== undefined) check(new RegExp(def.pattern).test(value), `${path}: does not match ${def.pattern}`);
    if (def.enum !== undefined) check(def.enum.includes(value), `${path}: '${value}' not in [${def.enum.join(", ")}]`);
  } else if (def.type === "boolean") {
    check(typeof value === "boolean", `${path}: expected boolean`);
  }
}

checkType(data, schema, "projects.json");

// Ecosystem rules beyond the schema.
const names = new Set();
for (const p of data.projects ?? []) {
  check(!names.has(p.name), `duplicate project '${p.name}'`);
  names.add(p.name);
  check(!/platform/i.test(p.canonical_repo ?? ""), `${p.name}: index covers public repos only`);
  for (const pkg of p.packages ?? []) {
    if (pkg.published) {
      check(pkg.private === false, `${p.name}: package '${pkg.name}' published but marked private`);
    }
  }
}

if (errors.length > 0) {
  console.error(`check:index FAILED (${errors.length} error(s)):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`check:index OK (${data.projects.length} projects)`);
