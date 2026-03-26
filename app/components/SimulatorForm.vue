<script setup lang="ts">
import { formatMAD } from '~/utils/formatting'
import { SIMULATOR_BOUNDS } from '~/utils/constants'

const props = defineProps<{
  monthlyDeposit: number
  initialCapital: number
  years: number
}>()

const emit = defineEmits<{
  'update:monthlyDeposit': [value: number]
  'update:initialCapital': [value: number]
  'update:years': [value: number]
}>()

const { t } = useI18n()
</script>

<template>
  <UCard class="w-full">
    <template #header>
      <h2 class="text-lg font-semibold text-highlighted">
        {{ t('simulator.title') }}
      </h2>
    </template>

    <div class="space-y-8">
      <!-- Épargne mensuelle -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <label class="text-sm font-medium text-default">
            {{ t('simulator.monthlyDeposit') }}
          </label>
          <span class="text-sm font-bold text-primary tabular-nums">
            {{ formatMAD(props.monthlyDeposit) }}
          </span>
        </div>
        <USlider
          :model-value="props.monthlyDeposit"
          :min="SIMULATOR_BOUNDS.monthly.min"
          :max="SIMULATOR_BOUNDS.monthly.max"
          :step="SIMULATOR_BOUNDS.monthly.step"
          color="primary"
          @update:model-value="v => emit('update:monthlyDeposit', v ?? props.monthlyDeposit)"
        />
        <div class="flex justify-between text-xs text-muted">
          <span>{{ formatMAD(SIMULATOR_BOUNDS.monthly.min) }}</span>
          <span>{{ formatMAD(SIMULATOR_BOUNDS.monthly.max) }}</span>
        </div>
      </div>

      <!-- Capital de départ -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <label class="text-sm font-medium text-default">
            {{ t('simulator.initialCapital') }}
          </label>
          <span class="text-sm font-bold text-primary tabular-nums">
            {{ formatMAD(props.initialCapital) }}
          </span>
        </div>
        <USlider
          :model-value="props.initialCapital"
          :min="SIMULATOR_BOUNDS.capital.min"
          :max="SIMULATOR_BOUNDS.capital.max"
          :step="SIMULATOR_BOUNDS.capital.step"
          color="primary"
          @update:model-value="v => emit('update:initialCapital', v ?? props.initialCapital)"
        />
        <div class="flex justify-between text-xs text-muted">
          <span>{{ formatMAD(SIMULATOR_BOUNDS.capital.min) }}</span>
          <span>{{ formatMAD(SIMULATOR_BOUNDS.capital.max) }}</span>
        </div>
      </div>

      <!-- Durée -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <label class="text-sm font-medium text-default">
            {{ t('simulator.years') }}
          </label>
          <span class="text-sm font-bold text-primary tabular-nums">
            {{ props.years }} {{ t('simulator.yearsUnit', props.years) }}
          </span>
        </div>
        <USlider
          :model-value="props.years"
          :min="SIMULATOR_BOUNDS.years.min"
          :max="SIMULATOR_BOUNDS.years.max"
          :step="SIMULATOR_BOUNDS.years.step"
          color="primary"
          @update:model-value="v => emit('update:years', v ?? props.years)"
        />
        <div class="flex justify-between text-xs text-muted">
          <span>{{ SIMULATOR_BOUNDS.years.min }} {{ t('simulator.yearsUnit', SIMULATOR_BOUNDS.years.min) }}</span>
          <span>{{ SIMULATOR_BOUNDS.years.max }} {{ t('simulator.yearsUnit', SIMULATOR_BOUNDS.years.max) }}</span>
        </div>
      </div>
    </div>
  </UCard>
</template>
