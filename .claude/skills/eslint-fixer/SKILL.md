---
name: eslint-fixer
description: Run ESLint to check and fix code lint issues. Use this skill whenever you've just edited or created files, when the user asks to lint or fix lint issues, when ESLint errors are reported in the conversation, or proactively after any code change to keep the codebase well-linted. Always invoke this after modifying .vue, .ts, .js, or .mjs files.
---

# ESLint Fixer

Run ESLint to check for lint issues, auto-fix what's possible, then manually fix whatever remains.

## Workflow

### Step 1: Auto-fix with ESLint

Run ESLint with `--fix` on the changed file(s). If no specific file is known, run on the whole project:

```bash
# On a specific file
pnpm exec eslint --fix <file_path>

# Or on the whole project
pnpm exec eslint . --fix
```

### Step 2: Check for remaining issues

After auto-fix, check what ESLint could not fix automatically:

```bash
# Check a specific file
pnpm exec eslint <file_path> --format=compact

# Or the whole project
pnpm exec eslint . --format=compact
```

If the exit code is 0 and output is empty or shows "0 problems" → done, no action needed.

### Step 3: Fix remaining issues manually

For each remaining issue, read the file and fix it directly:

- **Unused variables** (`no-unused-vars`): Remove the variable or use it
- **Missing imports** (`import/no-unresolved`): Add or correct the import
- **Type errors** (`@typescript-eslint/*`): Fix the TypeScript type
- **Vue template issues** (`vue/*`): Fix the template structure
- **i18n hardcoded strings**: Replace with `t('key')` and add to locales
- **Any other rule**: Read the rule message, understand it, apply the minimal fix

### Step 4: Verify

After manual fixes, re-run to confirm zero issues:

```bash
pnpm exec eslint <file_path>
```

## Key rules for this project

- All UI strings via `useI18n()` — never hardcode strings in templates
- All amounts through `Math.round()` — never display raw floats
- No calculation logic in Vue components — belongs in `utils/simulator.ts`
- `html-to-image` is client-only — always use dynamic import
- `VChart` always inside `<ClientOnly>`

## Notes

- ESLint config is `eslint.config.mjs` — Nuxt's flat config via `@nuxt/eslint`
- Run command: `pnpm lint` (= `eslint .`)
- Fix command: `pnpm exec eslint . --fix`
- If a rule violation is intentional (e.g., a known exception), add an inline `// eslint-disable-next-line <rule>` comment — never disable globally
