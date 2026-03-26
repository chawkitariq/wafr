import type { ScenarioKey } from './simulator'

/** Slider min/max/step constraints used by SimulatorForm and URL param validation. */
export const SIMULATOR_BOUNDS = {
  monthly: { min: 100, max: 20000, step: 100 },
  capital: { min: 0, max: 200000, step: 1000 },
  years: { min: 1, max: 30, step: 1 }
} as const

/** Tailwind + hex colour tokens and icon for each investment scenario. */
export interface ScenarioStyle {
  color: string // Text colour class
  bg: string // Background colour class
  ring: string // Ring/outline colour class
  border: string // Border colour class
  hex: string // Raw hex used by Chart.js (can't use Tailwind classes there)
  icon: string // Lucide icon name
}

export const SCENARIO_CONFIG: Record<ScenarioKey, ScenarioStyle> = {
  bvc: {
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    ring: 'ring-emerald-200 dark:ring-emerald-800',
    border: 'border-emerald-200 dark:border-emerald-800',
    hex: '#10b981',
    icon: 'i-lucide-trending-up'
  },
  immo: {
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    ring: 'ring-blue-200 dark:ring-blue-800',
    border: 'border-blue-200 dark:border-blue-800',
    hex: '#3b82f6',
    icon: 'i-lucide-building-2'
  }

}

export const LOCALES = { FR: 'fr', AR: 'ar' } as const

/** How long (ms) the "Copied!" feedback state stays visible after copying the share URL. */
export const COPY_FEEDBACK_MS = 2500
