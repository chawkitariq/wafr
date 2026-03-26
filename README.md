# Wafr — وفر

A bilingual (FR/AR) savings & investment simulator for the Moroccan market. Compare two investment vehicles — Casablanca Stock Exchange and real estate — and visualize the power of compound interest over time.

**Live:** [wafr.chawkitariq.fr](https://wafr.chawkitariq.fr) &nbsp;|&nbsp; **Stack:** Nuxt 3, TypeScript, Nuxt UI, ECharts, PWA

---

## What it does

- Input your monthly deposit, initial capital, and time horizon using sliders
- See real-time projections across 2 scenarios (BVC 9%, Immobilier 6%)
- Switch between French and Arabic (RTL) with one click
- Export results as a PNG image to share on WhatsApp/Instagram
- Share your simulation via URL (query params, no account needed)
- Install as a PWA on mobile for offline access

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)

---

## Setup

```bash
# Clone the repo
git clone https://github.com/your-username/wafr.git
cd wafr

# Install dependencies
pnpm install
```

---

## Running locally

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Other commands

| Command | Description |
|---------|-------------|
| `pnpm build` | Build for production |
| `pnpm preview` | Preview the production build locally |
| `pnpm vitest run` | Run unit tests |
| `pnpm playwright test` | Run end-to-end tests |
