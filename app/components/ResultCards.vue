<script setup lang="ts">
import type { SimulationResults } from '~/utils/simulator'

const props = defineProps<{
  results: SimulationResults
  years: number
}>()

const { t } = useI18n()

function formatMAD(value: number) {
  return new Intl.NumberFormat('fr-MA').format(Math.round(value))
}

const scenarios = computed(() => [
  {
    key: 'bvc',
    label: t('scenarios.bvc'),
    rate: t('scenarios.bvcRate'),
    result: props.results.bvc,
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'ring-emerald-200 dark:ring-emerald-800',
    icon: 'i-lucide-trending-up'
  },
  {
    key: 'immo',
    label: t('scenarios.immo'),
    rate: t('scenarios.immoRate'),
    result: props.results.immo,
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'ring-blue-200 dark:ring-blue-800',
    icon: 'i-lucide-building-2'
  },
  {
    key: 'epargne',
    label: t('scenarios.epargne'),
    rate: t('scenarios.epargneRate'),
    result: props.results.epargne,
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'ring-amber-200 dark:ring-amber-800',
    icon: 'i-lucide-piggy-bank'
  }
])

const bestKey = computed(() => {
  const r = props.results
  if (r.bvc.finalAmount >= r.immo.finalAmount && r.bvc.finalAmount >= r.epargne.finalAmount) return 'bvc'
  if (r.immo.finalAmount >= r.epargne.finalAmount) return 'immo'
  return 'epargne'
})
</script>

<template>
  <div class="space-y-3">
    <h2 class="text-base font-semibold text-muted">
      {{ t('results.title', { years }) }}
    </h2>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div
        v-for="s in scenarios"
        :key="s.key"
        class="relative rounded-xl p-4 ring-1 transition-all"
        :class="[s.bg, s.border]"
      >
        <!-- Badge meilleure option -->
        <div
          v-if="s.key === bestKey"
          class="absolute -top-2.5 start-4 rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-white"
        >
          {{ t('results.bestOption') }}
        </div>

        <!-- Header scénario -->
        <div class="mb-3 flex items-center gap-2">
          <UIcon
            :name="s.icon"
            class="size-4 shrink-0"
            :class="s.color"
          />
          <div class="min-w-0">
            <p class="truncate text-xs font-semibold text-default">
              {{ s.label }}
            </p>
            <p
              class="text-xs font-medium"
              :class="s.color"
            >
              {{ s.rate }}
            </p>
          </div>
        </div>

        <!-- Montant final -->
        <p
          class="mb-1 text-2xl font-bold tabular-nums text-highlighted"
          :class="s.color"
        >
          {{ formatMAD(s.result.finalAmount) }}
        </p>
        <p class="mb-3 text-xs text-muted">
          {{ t('results.finalAmount') }} · MAD
        </p>

        <!-- Métriques secondaires -->
        <div
          class="space-y-1.5 border-t pt-3"
          :class="s.border.replace('ring-', 'border-')"
        >
          <div class="flex justify-between text-xs">
            <span class="text-muted">{{ t('results.invested') }}</span>
            <span class="font-medium tabular-nums text-default">
              {{ formatMAD(s.result.totalInvested) }} MAD
            </span>
          </div>
          <div class="flex justify-between text-xs">
            <span class="text-muted">{{ t('results.gains') }}</span>
            <span
              class="font-semibold tabular-nums"
              :class="s.color"
            >
              +{{ formatMAD(s.result.gains) }} MAD
            </span>
          </div>
          <div class="flex justify-between text-xs">
            <span class="text-muted">{{ t('results.multiplier') }}</span>
            <span
              class="font-bold"
              :class="s.color"
            >×{{ s.result.multiplier }}</span>
          </div>
          <div class="flex justify-between text-xs">
            <span class="text-muted">{{ t('results.gainPercent') }}</span>
            <span
              class="font-semibold"
              :class="s.color"
            >+{{ s.result.gainPercent }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
