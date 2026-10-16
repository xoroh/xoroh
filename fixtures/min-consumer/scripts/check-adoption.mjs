// Validates that the min-consumer fixture follows the adopted Xoroh starter
// conventions. Structural local checks (not a YAML engine, not CI behavior).
// Run from fixture dir: bun run check:adoption (or from Xoroh root: check:fixture)
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const root = normalize(join(dir, ".."));
const errors = [];
const check = (cond, msg) => { if (!cond) errors.push(msg); };
const read = (rel) => readFileSync(join(root, rel), "utf8");

// 1. Adoption record: pin + file list.
const recordPath = join(root, "ADOPTED_STANDARDS.md");
check(existsSync(recordPath), "ADOPTED_STANDARDS.md: missing adoption record (copy-based adoption requires a recorded pin)");
let adopted = [];
if (existsSync(recordPath)) {
  const record = readFileSync(recordPath, "utf8");
  check(/[0-9a-f]{40}/.test(record), "ADOPTED_STANDARDS.md: no 40-hex Xoroh commit SHA pin recorded");
  adopted = [...record.matchAll(/^\s*-\s+(`?)([A-Za-z0-9_.][\w./-]*?\.\w+)\1\s+\(/gm)].map((m) => m[2]);
  check(adopted.length > 0, "ADOPTED_STANDARDS.md: no adopted files listed");
  for (const f of adopted) {
    check(existsSync(join(root, f)), `adopted file missing in consumer: ${f} (copy the pinned revision's file)`);
  }
}

// 2. Consumer manifest: private, dependency-free, check script present.
const manifestPath = join(root, "package.json");
check(existsSync(manifestPath), "package.json: missing consumer manifest");
if (existsSync(manifestPath)) {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  check(manifest.private === true, "package.json: must be \"private\": true until a release checklist removes it");
  for (const field of ["dependencies", "peerDependencies", "optionalDependencies"]) {
    check(manifest[field] === undefined, `package.json: '${field}' must be absent (fixture stays dependency-free)`);
  }
  check(typeof manifest.scripts?.["check:adoption"] === "string", "package.json: scripts.check:adoption must run this validator");
}

// 3. Consumer CI workflow: pinned, least-privilege, bounded, reproducible.
const workflowPath = join(root, ".github/workflows/ci.yml");
check(existsSync(workflowPath), ".github/workflows/ci.yml: missing adopted starter workflow");
if (existsSync(workflowPath)) {
  const workflow = read(".github/workflows/ci.yml");
  const uses = [...workflow.matchAll(/uses:\s*(\S+)/g)].map((m) => m[1]);
  check(uses.length > 0, ".github/workflows/ci.yml: no third-party actions found");
  for (const u of uses) {
    check(/@[0-9a-f]{40}(?:\s|$)/.test(u + " "), `ci.yml: action '${u}' is not SHA-pinned (universal baseline: immutable pins with version comments)`);
  }
  check(/permissions:\s*\n\s*contents:\s*read/.test(workflow), "ci.yml: missing least-privilege 'contents: read' permissions");
  const excessive = [...workflow.matchAll(/^\s*(contents|actions|packages|pull-requests|checks|deployments|issues|pages|security-events|statuses)\s*:\s*write\b/gm)].map((m) => m[0].trim());
  check(excessive.length === 0, `ci.yml: permission exceeds least-privilege baseline: ${excessive.join(", ")}`);
  check(/timeout-minutes:\s*\d+/.test(workflow), "ci.yml: jobs must set timeout-minutes");
  check(/bun install --frozen-lockfile/.test(workflow), "ci.yml: installs must use 'bun install --frozen-lockfile'");
  check(!/workflow_call/.test(workflow), "ci.yml: must not introduce a callable workflow_call interface yet (deferred until a real consumer validates it)");
}

// 4. Adopted agent instructions present with safe defaults.
const agentsPath = join(root, "AGENTS.md");
check(existsSync(agentsPath), "AGENTS.md: missing adopted agent instructions");
if (existsSync(agentsPath)) {
  const agents = read("AGENTS.md");
  check(/Human approval/i.test(agents), "AGENTS.md: must require human approval for irreversible actions");
  check(/destructive Git/i.test(agents), "AGENTS.md: must prohibit destructive Git operations");
}

if (errors.length > 0) {
  console.error(`check:adoption FAILED (${errors.length} error(s)):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`check:adoption OK (pin + ${adopted.length} adopted files + manifest + workflow + agent instructions)`);
