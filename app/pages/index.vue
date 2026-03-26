<script setup lang="ts">
const { t } = useI18n()
const { monthlyDeposit, initialCapital, years, results, copied, copyLink } = useSimulator()

useSeoMeta({
  title: 'Wafr — Simulateur d\'investissement marocain',
  description: 'Comparez BVC, immobilier et épargne bancaire. Calculez vos intérêts composés sur le marché marocain.',
  ogTitle: 'Wafr وفر — Simulateur d\'investissement',
  ogDescription: 'Comparez BVC, immobilier et épargne bancaire. Calculez vos intérêts composés.'
})
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
    <!-- Hero -->
    <div class="mb-10 text-center">
      <div class="mb-2 flex items-center justify-center gap-3">
        <h1 class="text-4xl font-extrabold tracking-tight text-highlighted sm:text-5xl">
          Wafr
        </h1>
        <span class="text-3xl font-bold text-muted sm:text-4xl">وفر</span>
      </div>
      <p class="text-base text-muted sm:text-lg">
        {{ t('app.description') }}
      </p>
    </div>

    <!-- Simulateur -->
    <SimulatorForm
      v-model:monthly-deposit="monthlyDeposit"
      v-model:initial-capital="initialCapital"
      v-model:years="years"
      class="mb-6"
    />

    <!-- Zone d'export (cartes + graphique) -->
    <div
      id="simulator-export"
      class="space-y-6 rounded-2xl bg-white p-6 ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800"
    >
      <!-- Watermark pour l'export -->
      <div class="flex items-center justify-between">
        <span class="text-xs font-semibold tracking-widest text-muted uppercase">
          wafr.ma
        </span>
        <span class="text-xs text-muted">
          {{ new Date().toLocaleDateString('fr-MA') }}
        </span>
      </div>

      <ResultCards
        :results="results"
        :years="years"
      />
      <InvestmentChart
        :results="results"
        :years="years"
      />
    </div>

    <!-- Actions -->
    <div class="mt-6 flex flex-wrap items-center gap-3">
      <ExportButton
        :copied="copied"
        @copy-link="copyLink"
      />
    </div>

    <!-- Disclaimer -->
    <p class="mt-8 text-center text-xs leading-relaxed text-muted">
      {{ t('app.disclaimer') }}
    </p>
  </div>
</template>
