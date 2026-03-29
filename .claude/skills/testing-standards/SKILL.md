---
name: testing-standards
description: >
  Enforces Wafr project testing standards: all test code (describe/it/test blocks,
  comments, expectations) must be written in English; test titles must be
  human-readable and follow naming best practices; both unit tests (Vitest) and
  e2e tests (Playwright) must cover meaningful scenarios.
  Use this skill whenever you write, review, or add tests — whether unit tests
  in tests/unit/ or e2e tests in tests/e2e/. Also trigger when the user asks
  to "add a test", "write tests", "check test quality", "fix test names", or
  "add e2e coverage".
---

# Testing Standards — Wafr

## Non-negotiable rules

1. **English only** — every `describe`, `it`, `test` block title, inline comment,
   and variable name in test files must be in English. No French, no Arabic.
   Rationale: tests are the living documentation of the codebase; English maximises
   readability for any contributor and for AI tools that analyse them.

2. **Human-readable titles** — test names must read as plain statements of intent,
   not as code transcriptions. A developer who has never seen the source file should
   understand *what* is being tested, *under what condition*, and *what the expected
   result is* — all from the title alone.

3. **E2E coverage for every user-facing flow** — every meaningful interaction
   available in the UI must have at least one Playwright scenario that exercises
   it end-to-end in a real browser.

---

## Naming titles well

### The pattern

```
[subject] [behaviour] [when/given optional context]
```

Or equivalently:

```
[given state or input], [action], [expected outcome]
```

The best titles are short declarative sentences (under 80 chars) written from the
user or system's perspective — not from the internal function's perspective.

### Concrete examples

| Bad (avoid) | Good (use instead) |
|---|---|
| `calcule les montants finaux pour 10 ans` | `returns higher BVC amount than immo after 10 years` |
| `retourne le bon capital total investi` | `computes total invested as initial capital + monthly deposits × months` |
| `les gains sont positifs` | `gains are positive for any non-zero input` |
| `cas limites` | `edge cases` *(describe block)* |
| `vérifie le taux BVC sur 1 an sans versement` | `applies the BVC annual rate correctly over 1 year with no deposits` |
| `canvas is rendered after hydration` | ✓ already good — keep it |

### Describe block naming

`describe` blocks name the *unit* or *feature*, not the scenario:

```ts
// ✅
describe('calculateResults', () => { … })
describe('edge cases', () => { … })
describe('compound interest formula', () => { … })

// ❌
describe('cas normaux', () => { … })
describe('formule intérêts composés', () => { … })
```

### `it` vs `test`

- In Vitest unit tests, use `it(…)` — reads as "it [does something]".
- In Playwright e2e tests, use `test(…)` — Playwright convention.

---

## Unit tests (Vitest)

**Location**: `tests/unit/*.test.ts`

**Structure**:
```ts
describe('<functionName>', () => {
  describe('<category: normal cases | edge cases | formula verification>', () => {
    it('<subject> <behaviour> [context]', () => {
      // Arrange
      const params = { … }
      // Act
      const result = functionUnderTest(params)
      // Assert
      expect(result.field).toBe(expectedValue)
    })
  })
})
```

**Rules**:
- One `expect` per logical assertion (but grouping closely related checks in one
  `it` block is fine when they test the same invariant).
- No business logic inside tests — no loops to compute expected values; derive
  expected values from the spec, not from re-implementing the function.
- Keep comments in English; use them only when the *why* is non-obvious.

---

## E2E tests (Playwright)

**Location**: `tests/e2e/*.spec.ts`

**Structure**:
```ts
test.describe('<feature or page section>', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('<verb phrase describing the user action and expected outcome>', async ({ page }) => {
    // user interaction
    // assertion
  })
})
```

**What must be covered**:

| Feature | Required scenarios |
|---|---|
| Page load | Core elements visible; default slider values correct |
| Result cards | Both scenarios displayed; rates shown; best-option badge visible |
| Simulator sliders | Changing a slider updates amounts; heading updates year count |
| Chart | Canvas renders after hydration; has non-zero dimensions |
| URL sharing | Copy button feedback; state restores from query params; out-of-range params ignored |
| Language switcher | RTL applied on Arabic switch; LTR restored on French switch |
| New features | Every new user-facing flow added to the app **must** get a corresponding e2e test |

**Selector preference** (most to least preferred):
1. `getByRole(…)` — semantic, accessible
2. `getByText(…)` — visible text
3. `locator('#id')` — stable IDs used for the export container
4. `locator('.class')` — last resort, only for structural selectors

---

## Checklist before committing tests

- [ ] All `describe`/`it`/`test` titles are in English
- [ ] Every title reads as a clear statement without needing to look at the body
- [ ] No French or Arabic words anywhere in the test file (including comments)
- [ ] New utility functions have Vitest unit tests
- [ ] New UI features have at least one Playwright e2e test
- [ ] `pnpm vitest run` passes with no failures
- [ ] `pnpm playwright test` passes (or the new tests are added and pass)

---

## Worked migration example

Converting an existing French test to English standards:

**Before:**
```ts
it('retourne yearlyData avec year+1 entrées', () => {
  const results = calculateResults({ monthlyDeposit: 1000, initialCapital: 0, years: 10 })
  expect(results.yearlyData).toHaveLength(11) // année 0 à 10
  expect(results.yearlyData[0].year).toBe(0)
  expect(results.yearlyData[10].year).toBe(10)
})
```

**After:**
```ts
it('yearlyData includes year 0 through N, giving N+1 entries total', () => {
  const results = calculateResults({ monthlyDeposit: 1000, initialCapital: 0, years: 10 })
  expect(results.yearlyData).toHaveLength(11) // year 0 to 10 inclusive
  expect(results.yearlyData[0].year).toBe(0)
  expect(results.yearlyData[10].year).toBe(10)
})
```
