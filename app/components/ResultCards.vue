<script setup lang="ts">
import { getBestScenario } from '~/utils/simulator'
import type { SimulationResults, ScenarioKey } from '~/utils/simulator'
import { SCENARIO_CONFIG } from '~/utils/constants'
import { formatMAD } from '~/utils/formatting'

const props = defineProps<{
  results: SimulationResults
  years: number
}>()

const { t } = useI18n()

const scenarios = computed(() =>
  (Object.keys(SCENARIO_CONFIG) as ScenarioKey[]).map(key => ({
    key,
    label: t(`scenarios.${key}`),
    rate: t(`scenarios.${key}Rate`),
    result: props.results[key],
    ...SCENARIO_CONFIG[key]
  }))
)

const bestKey = computed(() => getBestScenario(props.results))
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
        :class="[s.bg, s.ring]"
      >
        <!-- Badge meilleure option -->
        <div
          v-if="s.key === bestKey"
          class="absolute -top-2.5 inset-s-4 rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-white"
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
          {{ t('results.finalAmount') }}
        </p>

        <!-- Métriques secondaires -->
        <div
          class="space-y-1.5 border-t pt-3"
          :class="s.border"
        >
          <div class="flex justify-between text-xs">
            <span class="text-muted">{{ t('results.invested') }}</span>
            <span class="font-medium tabular-nums text-default">
              {{ formatMAD(s.result.totalInvested) }}
            </span>
          </div>
          <div class="flex justify-between text-xs">
            <span class="text-muted">{{ t('results.gains') }}</span>
            <span
              class="font-semibold tabular-nums"
              :class="s.color"
            >
              +{{ formatMAD(s.result.gains) }}
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
