<script setup lang="ts">
import type { SimulationResults } from '~/utils/simulator'

const props = defineProps<{
  results: SimulationResults
  years: number
}>()

const { t, locale } = useI18n()

const isRtl = computed(() => locale.value === 'ar')

function formatNumber(value: number) {
  if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + 'M'
  if (value >= 1_000) return Math.round(value / 1_000) + 'k'
  return String(value)
}

function formatMAD(value: number) {
  return new Intl.NumberFormat('fr-MA').format(Math.round(value)) + ' MAD'
}

const chartOption = computed(() => {
  const data = props.results.yearlyData
  const years = data.map(d => d.year)

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      confine: true,
      formatter: (params: any[]) => {
        const year = params[0].axisValue
        let html = `<div style="font-size:12px;font-weight:600;margin-bottom:6px">${t('chart.year', { n: year })}</div>`
        params.forEach((p: any) => {
          html += `<div style="display:flex;justify-content:space-between;gap:16px;margin:2px 0">
            <span>${p.marker}${p.seriesName}</span>
            <span style="font-weight:700">${formatMAD(p.value)}</span>
          </div>`
        })
        return html
      }
    },
    legend: {
      bottom: 0,
      itemWidth: 14,
      itemHeight: 3,
      textStyle: { fontSize: 11 }
    },
    grid: {
      top: 16,
      bottom: 56,
      left: isRtl.value ? 20 : 16,
      right: isRtl.value ? 16 : 20,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: years,
      axisLabel: {
        fontSize: 11,
        formatter: (val: number) => val === 0 ? '0' : `${val}`
      },
      axisLine: { lineStyle: { color: '#e5e7eb' } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        fontSize: 10,
        formatter: formatNumber
      },
      splitLine: { lineStyle: { color: '#f3f4f6', type: 'dashed' } }
    },
    series: [
      {
        name: t('scenarios.bvc'),
        type: 'line',
        data: data.map(d => d.bvc),
        smooth: true,
        color: '#10b981',
        lineStyle: { width: 2.5 },
        symbol: 'none',
        emphasis: { focus: 'series' }
      },
      {
        name: t('scenarios.immo'),
        type: 'line',
        data: data.map(d => d.immo),
        smooth: true,
        color: '#3b82f6',
        lineStyle: { width: 2.5 },
        symbol: 'none',
        emphasis: { focus: 'series' }
      },
      {
        name: t('scenarios.epargne'),
        type: 'line',
        data: data.map(d => d.epargne),
        smooth: true,
        color: '#f59e0b',
        lineStyle: { width: 2.5 },
        symbol: 'none',
        emphasis: { focus: 'series' }
      },
      {
        name: t('chart.invested'),
        type: 'line',
        data: data.map(d => d.invested),
        smooth: false,
        color: '#9ca3af',
        lineStyle: { width: 1.5, type: 'dashed' },
        areaStyle: { color: 'rgba(156,163,175,0.08)' },
        symbol: 'none',
        emphasis: { focus: 'series' }
      }
    ]
  }
})
</script>

<template>
  <div class="w-full">
    <h3 class="mb-3 text-base font-semibold text-muted">
      {{ t('chart.title') }}
    </h3>
    <ClientOnly>
      <VChart
        :option="chartOption"
        :init-options="{ renderer: 'svg' }"
        autoresize
        class="h-72 w-full sm:h-96"
      />
      <template #fallback>
        <div class="flex h-72 items-center justify-center">
          <UIcon
            name="i-lucide-loader-circle"
            class="size-6 animate-spin text-muted"
          />
        </div>
      </template>
    </ClientOnly>
  </div>
</template>
