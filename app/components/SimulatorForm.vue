<script setup lang="ts">
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

function formatMAD(value: number) {
  return new Intl.NumberFormat('fr-MA').format(value) + ' MAD'
}
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
          :min="100"
          :max="20000"
          :step="100"
          color="primary"
          @update:model-value="emit('update:monthlyDeposit', $event)"
        />
        <div class="flex justify-between text-xs text-muted">
          <span>100 MAD</span>
          <span>20 000 MAD</span>
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
          :min="0"
          :max="200000"
          :step="1000"
          color="primary"
          @update:model-value="emit('update:initialCapital', $event)"
        />
        <div class="flex justify-between text-xs text-muted">
          <span>0 MAD</span>
          <span>200 000 MAD</span>
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
          :min="1"
          :max="30"
          :step="1"
          color="primary"
          @update:model-value="emit('update:years', $event)"
        />
        <div class="flex justify-between text-xs text-muted">
          <span>1 {{ t('simulator.yearsUnit', 1) }}</span>
          <span>30 {{ t('simulator.yearsUnit', 30) }}</span>
        </div>
      </div>
    </div>
  </UCard>
</template>
