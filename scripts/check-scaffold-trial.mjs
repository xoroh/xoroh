// Trial instantiation of docs/templates/scaffold in an isolated temp dir.
// Fills every placeholder with test values, runs the scaffold self-check,
// then cleans up. Run: bun run check:scaffold-trial (no dependencies).
import { mkdtempSync, cpSync, rmSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync, execSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const scaffold = join(root, "docs/templates/scaffold");
const errors = [];
const check = (cond, msg) => { if (!cond) errors.push(msg); };

check(
  (() => { try { return readdirSync(scaffold).length > 0; } catch { return false; } })(),
  "template missing: docs/templates/scaffold/",
);

let head = "";
try {
  head = execSync("git rev-parse HEAD", { cwd: root, encoding: "utf8" }).trim();
} catch { /* reported below */ }
check(/^[0-9a-f]{40}$/.test(head), "cannot determine HEAD SHA for the trial pin (run inside the Xoroh checkout)");

const values = {
  __REPO_NAME__: "trial-widget",
  __REPO_PURPOSE__: "Trial project for scaffold validation.",
  __PROJECT_STATUS__: "scaffold",
  __MAINTAINERS__: "Trial Maintainer <trial@example.org>",
  __SETUP_INSTRUCTIONS__: "No setup yet; toolchain undecided.",
  __VALIDATION_COMMANDS__: "node scripts/check-scaffold.mjs",
  __SUPPORT_URL__: "https://example.org/trial-widget/issues",
  __SECURITY_ADVISORIES_URL__: "https://example.org/trial-widget/security/advisories/new",
  __CONDUCT_CONTACT__: "conduct@example.org",
  __LICENSE_YEAR__: "2026",
  __LICENSE_OWNER__: "Trial Owner",
  __TOOLCHAIN_LINE__: "Toolchain undecided; document it here before implementing.",
  __TOOLCHAIN_REQUIREMENTS__: "None yet (scaffold stage).",
  __INSTALL_COMMAND__: "echo 'nothing to install yet'",
  __DEV_NOTES__: "No build or test scripts yet.",
  __DEFAULT_BRANCH__: "main",
  __ADR_LOCATION__: "docs/adr (to be created if needed)",
  __XOROH_PIN__: head,
  __STANDARDS_TAG__: "none yet",
  __ADOPTION_DATE__: "2026-10-16",
  __VALIDATION_COMMAND_AND_RESULT__: "node scripts/check-scaffold.mjs, exit 0",
};

let dir = "";
try {
  dir = mkdtempSync(join(tmpdir(), "scaffold-trial-"));
  cpSync(scaffold, dir, { recursive: true });
  const walk = (d) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, e.name);
      if (e.isDirectory()) { walk(p); continue; }
      let s;
      try { s = readFileSync(p, "utf8"); } catch { continue; }
      if (s.includes("\0")) continue;
      for (const [k, v] of Object.entries(values)) { s = s.split(k).join(v); }
      writeFileSync(p, s);
    }
  };
  walk(dir);
  const leftovers = [];
  const scan = (d) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, e.name);
      if (e.isDirectory()) { scan(p); continue; }
      let s;
      try { s = readFileSync(p, "utf8"); } catch { continue; }
      if (s.includes("\0")) continue;
      for (const m of s.match(/__[A-Z][A-Z0-9_]*__/g) ?? []) leftovers.push(p + ": " + m);
    }
  };
  scan(dir);
  check(leftovers.length === 0, "unresolved placeholders after fill: " + [...new Set(leftovers)].join("; "));
  const run = spawnSync(process.execPath, ["scripts/check-scaffold.mjs"], { cwd: dir, encoding: "utf8" });
  check(run.status === 0, "trial check-scaffold.mjs failed:\n" + (run.stderr || run.stdout));
} finally {
  if (dir) rmSync(dir, { recursive: true, force: true });
}

if (errors.length > 0) {
  console.error("check:scaffold-trial FAILED (" + errors.length + " error(s)):");
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}
console.log("check:scaffold-trial OK (instantiated, placeholders filled, self-check passed, temp cleaned)");
