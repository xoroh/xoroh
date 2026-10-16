# Onboarding checklist

Follow in order; check off each with evidence (command + exit code or file).

- [ ] Xoroh source recorded: repo URL + commit SHA (+ tag if available).
- [ ] Standards read: `AGENTS.md`, baseline, fitting profiles, versioning,
      ADRs, adoption format.
- [ ] Target inspected read-only: stack, package manager, layout, CI +
      permissions, protection (if authorized), lockfiles, security posture,
      existing conventions.
- [ ] Baseline gaps listed; MUST vs SHOULD vs MAY classified.
- [ ] Template files selected (not blindly copied); every placeholder filled
      deliberately; license confirmed.
- [ ] Toolchain, build/test commands, and CI jobs added for the real stack.
- [ ] Scaffold self-check passes; project validators pass; negative check
      performed for new validation.
- [ ] YAML parses; internal links resolve; `git diff --check` clean.
- [ ] `ADOPTED_STANDARDS.md` written with all required fields.
- [ ] Index entry proposed via PR when applicable (never edited live state
      without authorization).
- [ ] Deviations recorded with justification; owner decisions left open.
- [ ] Report: commands, results, failures, limitations, remaining gaps.
