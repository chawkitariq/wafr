import { test, expect } from '@playwright/test'

test.describe('Simulator page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('loads with title and simulator form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Wafr' })).toBeVisible()
    await expect(page.getByText('Votre simulation')).toBeVisible()
    // Three sliders
    const sliders = page.getByRole('slider')
    await expect(sliders).toHaveCount(3)
  })

  test('shows result cards for all three scenarios', async ({ page }) => {
    await expect(page.getByText('Bourse de Casablanca', { exact: true })).toBeVisible()
    await expect(page.getByText('Immobilier', { exact: true })).toBeVisible()
    await expect(page.getByText('Épargne bancaire', { exact: true })).toBeVisible()
  })

  test('result cards update when slider changes', async ({ page }) => {
    // Get the monthly deposit slider (first slider)
    const slider = page.getByRole('slider').first()

    // Read initial BVC amount
    const bvcCard = page.locator('.ring-emerald-200, .ring-emerald-800').first()
    const initialAmount = await bvcCard.locator('.tabular-nums').first().textContent()

    // Move slider to the right (increase value)
    const box = await slider.boundingBox()
    if (box) {
      await slider.focus()
      await page.keyboard.press('ArrowRight')
      await page.keyboard.press('ArrowRight')
      await page.keyboard.press('ArrowRight')
    }

    // Amount should have changed
    const updatedAmount = await bvcCard.locator('.tabular-nums').first().textContent()
    expect(updatedAmount).not.toBe(initialAmount)
  })

  test('export and share buttons are visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Exporter en PNG/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /Copier le lien/i })).toBeVisible()
  })

  test('chart is rendered', async ({ page }) => {
    // Chart section heading is visible
    await expect(page.getByRole('heading', { name: /Évolution du capital/i })).toBeVisible()
    // ECharts/ZRender canvas is attached (confirms the chart component hydrated)
    await expect(page.locator('canvas[data-zr-dom-id]')).toBeAttached({ timeout: 10000 })
  })

  test('disclaimer is visible', async ({ page }) => {
    await expect(page.getByText(/Simulation à titre indicatif/)).toBeVisible()
  })
})

test.describe('Language switcher', () => {
  test('switches to Arabic and back', async ({ page }) => {
    await page.goto('/')

    // Find language switcher button
    const langButton = page.getByRole('button', { name: /AR|عربي|العربية/i })
      .or(page.getByLabel(/language|langue/i))

    if (await langButton.isVisible()) {
      await langButton.click()
      // After switching to AR, page should have RTL direction
      await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')

      // Switch back to FR
      const frButton = page.getByRole('button', { name: /FR|français/i })
      if (await frButton.isVisible()) {
        await frButton.click()
        await expect(page.locator('html')).toHaveAttribute('dir', 'ltr')
      }
    }
  })
})

test.describe('URL sharing', () => {
  test('copy link button updates to copied state', async ({ page }) => {
    await page.goto('/')
    const copyBtn = page.getByRole('button', { name: /Copier le lien/i })
    await copyBtn.click()
    await expect(page.getByRole('button', { name: /Lien copié/i })).toBeVisible()
  })

  test('restores state from URL query params', async ({ page }) => {
    // Navigate with preset params (s=monthly, c=initial, y=years)
    await page.goto('/?s=5000&c=50000&y=20')
    // The simulator should reflect these values
    const sliders = page.getByRole('slider')
    await expect(sliders).toHaveCount(3)
    // Verify the years label shows 20 (exact match on the slider label span)
    await expect(page.getByText('20 ans', { exact: true }).first()).toBeVisible()
  })
})
