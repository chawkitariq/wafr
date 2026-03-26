import type { ScenarioKey } from './simulator'

export const SIMULATOR_BOUNDS = {
  monthly: { min: 100, max: 20000, step: 100 },
  capital: { min: 0, max: 200000, step: 1000 },
  years: { min: 1, max: 30, step: 1 }
} as const

export interface ScenarioStyle {
  color: string
  bg: string
  ring: string
  border: string
  hex: string
  icon: string
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
  },
  epargne: {
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    ring: 'ring-amber-200 dark:ring-amber-800',
    border: 'border-amber-200 dark:border-amber-800',
    hex: '#f59e0b',
    icon: 'i-lucide-piggy-bank'
  }
}

export const LOCALES = { FR: 'fr', AR: 'ar' } as const

export const COPY_FEEDBACK_MS = 2500
