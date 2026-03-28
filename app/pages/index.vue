<script setup lang="ts">
const { t, locale } = useI18n()
const { monthlyDeposit, initialCapital, years, results, copied, copyLink } = useSimulator()

useSeoMeta({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
  ogTitle: () => t('seo.ogTitle'),
  ogDescription: () => t('seo.ogDescription')
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': 'Wafr وفر',
        'url': 'https://wafr.chawkitariq.fr',
        'description': 'Simulateur d\'épargne et d\'investissement pour le marché marocain. Comparez la Bourse de Casablanca et l\'immobilier grâce aux intérêts composés.',
        'applicationCategory': 'FinanceApplication',
        'operatingSystem': 'Web, iOS, Android',
        'inLanguage': ['fr-MA', 'ar-MA'],
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'MAD'
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Wafr',
          'url': 'https://wafr.chawkitariq.fr'
        }
      })
    }
  ]
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
          wafr.chawkitariq.fr
        </span>
        <span class="text-xs text-muted">
          {{ new Date().toLocaleDateString(locale === 'ar' ? 'ar-MA' : 'fr-MA') }}
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
