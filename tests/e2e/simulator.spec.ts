import { test, expect } from '@playwright/test'

test.describe('Page load', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('renders hero, form and actions', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Wafr', exact: true })).toBeVisible()
    // 'وفر' appears in both hero and navbar — scope to the sibling span of h1
    await expect(page.locator('h1 + span').filter({ hasText: 'وفر' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Votre simulation' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Exporter en PNG' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Copier le lien' })).toBeVisible()
  })

  test('disclaimer is present', async ({ page }) => {
    await expect(page.getByText(/Simulation à titre indicatif/)).toBeVisible()
  })

  test('three sliders are present', async ({ page }) => {
    await expect(page.getByRole('slider')).toHaveCount(3)
  })

  test('default slider values match initial state', async ({ page }) => {
    // aria-valuenow is formatting-agnostic — no locale/separator ambiguity
    const sliders = page.getByRole('slider')
    await expect(sliders.nth(0)).toHaveAttribute('aria-valuenow', '1000')
    await expect(sliders.nth(1)).toHaveAttribute('aria-valuenow', '10000')
    await expect(sliders.nth(2)).toHaveAttribute('aria-valuenow', '10')
    await expect(page.getByText(/^10 ans$/)).toBeVisible()
  })
})

test.describe('Result cards', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('shows all three scenario cards', async ({ page }) => {
    await expect(page.getByText('Bourse de Casablanca', { exact: true })).toBeVisible()
    await expect(page.getByText('Immobilier', { exact: true })).toBeVisible()
    await expect(page.getByText('Épargne bancaire', { exact: true })).toBeVisible()
  })

  test('shows rates on each card', async ({ page }) => {
    await expect(page.getByText('9 %/an')).toBeVisible()
    await expect(page.getByText('6 %/an')).toBeVisible()
    await expect(page.getByText('3,5 %/an')).toBeVisible()
  })

  test('BVC card has "Meilleure option" badge (highest rate wins by default)', async ({ page }) => {
    await expect(page.getByText('Meilleure option')).toBeVisible()
  })

  test('cards show Capital final, Gains, Multiplicateur labels', async ({ page }) => {
    await expect(page.getByText('Capital final')).toHaveCount(3)
    await expect(page.getByText('Gains')).toHaveCount(3)
    await expect(page.getByText('Multiplicateur')).toHaveCount(3)
  })
})

test.describe('Simulator interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('increasing monthly deposit raises all card amounts', async ({ page }) => {
    // Capture all tabular-nums texts (card amounts) before change
    const amounts = page.locator('#simulator-export .tabular-nums')
    const before = await amounts.allTextContents()

    const slider = page.getByRole('slider').nth(0)
    await slider.focus()
    for (let i = 0; i < 10; i++) await page.keyboard.press('ArrowRight')

    const after = await amounts.allTextContents()
    expect(after).not.toEqual(before)
  })

  test('results heading reflects slider years value', async ({ page }) => {
    await expect(page.getByText('Résultats après 10 ans')).toBeVisible()

    const slider = page.getByRole('slider').nth(2)
    await slider.focus()
    for (let i = 0; i < 5; i++) await page.keyboard.press('ArrowRight')

    await expect(page.getByRole('slider').nth(2)).toHaveAttribute('aria-valuenow', '15')
    await expect(page.getByText('Résultats après 15 ans')).toBeVisible()
  })

  test('URL updates when sliders change', async ({ page }) => {
    const slider = page.getByRole('slider').nth(0)
    await slider.focus()
    await page.keyboard.press('ArrowRight')

    await expect(page).toHaveURL(/[?&]s=/)
  })
})

test.describe('Chart', () => {
  test('canvas is rendered after hydration', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Évolution du capital')).toBeVisible()
    const canvas = page.locator('#simulator-export canvas')
    await expect(canvas).toBeVisible({ timeout: 10_000 })
  })

  test('canvas has non-zero dimensions', async ({ page }) => {
    await page.goto('/')
    const canvas = page.locator('#simulator-export canvas')
    await expect(canvas).toBeVisible({ timeout: 10_000 })
    const box = await canvas.boundingBox()
    expect(box?.width).toBeGreaterThan(0)
    expect(box?.height).toBeGreaterThan(0)
  })
})

test.describe('URL sharing', () => {
  test('copy link button switches to "Lien copié !" then resets', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Copier le lien' }).click()
    await expect(page.getByRole('button', { name: 'Lien copié !' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Copier le lien' })).toBeVisible({ timeout: 4000 })
  })

  test('restores state from query params on load', async ({ page }) => {
    await page.goto('/?s=3000&c=50000&y=20')
    const sliders = page.getByRole('slider')
    await expect(sliders.nth(0)).toHaveAttribute('aria-valuenow', '3000')
    await expect(sliders.nth(1)).toHaveAttribute('aria-valuenow', '50000')
    await expect(sliders.nth(2)).toHaveAttribute('aria-valuenow', '20')
    await expect(page.getByText('Résultats après 20 ans')).toBeVisible()
  })

  test('ignores out-of-range query params and uses defaults', async ({ page }) => {
    await page.goto('/?s=999999&c=-100&y=0')
    const sliders = page.getByRole('slider')
    await expect(sliders.nth(0)).toHaveAttribute('aria-valuenow', '1000')
    await expect(sliders.nth(1)).toHaveAttribute('aria-valuenow', '10000')
    await expect(sliders.nth(2)).toHaveAttribute('aria-valuenow', '10')
  })
})

test.describe('Language switcher', () => {
  test('switches to Arabic: RTL direction applied', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /العربية|AR/i }).click()
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    await expect(page.locator('h1 + span').filter({ hasText: 'وفر' })).toBeVisible()
  })

  test('switches back to French: LTR direction restored', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /العربية|AR/i }).click()
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')

    await page.getByRole('button', { name: /Français|FR/i }).click()
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr')
    // exact: true — 'Bourse de Casablanca' also appears inside the description paragraph
    await expect(page.getByText('Bourse de Casablanca', { exact: true })).toBeVisible()
  })
})
