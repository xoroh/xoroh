// Scaffold self-check for repositories adopted from the Xoroh template.
// Fails on missing files, unresolved placeholders, secret patterns, broken
// internal links, and unpinned Actions. Structural checks only.
// Run from the adopted repository root: node scripts/check-scaffold.mjs
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, normalize, dirname } from "node:path";

const root = process.cwd();
const errors = [];
const check = (cond, msg) => { if (!cond) errors.push(msg); };

// 1. Required files.
const required = [
  "README.md", "AGENTS.md", "CONTRIBUTING.md", "SECURITY.md", "SUPPORT.md",
  "CODE_OF_CONDUCT.md", "LICENSE", "STANDARDS.md", "ADOPTED_STANDARDS.md",
  ".github/workflows/ci.yml", ".github/PULL_REQUEST_TEMPLATE.md",
  ".github/ISSUE_TEMPLATE/bug_report.yml",
  ".github/ISSUE_TEMPLATE/feature_request.yml",
  ".github/ISSUE_TEMPLATE/config.yml", ".github/dependabot.yml",
  ".editorconfig", ".gitignore", "scripts/check-scaffold.mjs",
];
for (const f of required) {
  check(existsSync(join(root, f)), "missing required file: " + f);
}

// Collect text files (skip .git, node_modules, and obvious binaries).
function textFiles(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name === ".git" || e.name === "node_modules") continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) textFiles(p, out);
    else if (/\.(md|yml|yaml|json|mjs|js|ts|txt|gitignore|editorconfig)$/.test(e.name) || !/\./.test(e.name)) {
      try {
        const s = readFileSync(p, "utf8");
        if (!s.includes("\0")) out.push(p);
      } catch { /* unreadable: skip */ }
    }
  }
  return out;
}
const files = textFiles(root);
check(files.length > 0, "no readable files found (wrong working directory?)");

const markerRe = new RegExp("__[A-Z][A-Z0-9_]*__", "g");
const secretRes = [/ghp_[A-Za-z0-9]+/, /gho_[A-Za-z0-9]+/, /BEGIN [A-Z ]*PRIVATE KEY/, /AKIA[0-9A-Z]{16}/];
let markers = 0;
for (const f of files) {
  const rel = normalize(f).replace(normalize(root) + "/", "");
  const s = readFileSync(f, "utf8");
  const hits = s.match(markerRe) ?? [];
  if (hits.length > 0) { markers += hits.length; errors.push(rel + ": unresolved placeholders: " + [...new Set(hits)].join(", ")); }
  for (const re of secretRes) {
    if (re.test(s)) errors.push(rel + ": possible secret pattern (" + re.source.slice(0, 24) + "...)");
  }
  if (/ADOPTED_STANDARDS\.md$/.test(f)) {
    check(/[0-9a-f]{40}/.test(s), "ADOPTED_STANDARDS.md: no 40-hex Xoroh commit SHA pin recorded");
  }
  if (/\.github\/workflows\/.+\.yml$/.test(f)) {
    const uses = [...s.matchAll(/uses:\s*(\S+)/g)].map((m) => m[1]);
    for (const u of uses) {
      check(/@[0-9a-f]{40}(\s|$)/.test(u + " "), rel + ": action '" + u + "' is not SHA-pinned");
    }
    check(/contents:\s*read/.test(s), rel + ": missing least-privilege 'contents: read' permissions");
    check(/timeout-minutes:\s*\d+/.test(s), rel + ": jobs must set timeout-minutes");
  }
  if (f.endsWith(".md")) {
    for (const m of s.matchAll(/\]\(([^)#]+)(?:#[^)]*)?\)/g)) {
      const t = m[1].trim();
      if (!t || t.startsWith("http") || t.startsWith("mailto:") || t.startsWith("#")) continue;
      if (!existsSync(join(dirname(f), t))) errors.push(rel + ": broken link -> " + t);
    }
  }
}

if (errors.length > 0) {
  console.error("check-scaffold FAILED (" + errors.length + " error(s), " + markers + " unresolved markers):");
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}
console.log("check-scaffold OK (" + files.length + " files, no placeholders, no secrets, links resolve)");
