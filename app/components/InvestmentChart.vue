<script setup lang="ts">
import type { SimulationResults } from '~/utils/simulator'
import type { TooltipItem } from 'chart.js'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { SCENARIO_CONFIG } from '~/utils/constants'
import { formatMAD } from '~/utils/formatting'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler)

const props = defineProps<{
  results: SimulationResults
  years: number
}>()

const { t } = useI18n()

// Shorthand thresholds for Y-axis tick formatting (see callback below)
const K = 1_000
const M = 1_000_000

const chartData = computed(() => {
  const data = props.results.yearlyData
  return {
    labels: data.map(d => d.year),
    datasets: [
      {
        label: t('scenarios.bvc'),
        data: data.map(d => d.bvc),
        borderColor: SCENARIO_CONFIG.bvc.hex,
        borderWidth: 2.5,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4
      },
      {
        label: t('scenarios.immo'),
        data: data.map(d => d.immo),
        borderColor: SCENARIO_CONFIG.immo.hex,
        borderWidth: 2.5,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4
      },
      {
        label: t('scenarios.epargne'),
        data: data.map(d => d.epargne),
        borderColor: SCENARIO_CONFIG.epargne.hex,
        borderWidth: 2.5,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4
      },
      {
        // Dashed "total invested" baseline — fill shades the area below it so users
        // can visually compare compounded growth against simple capital injection
        label: t('chart.invested'),
        data: data.map(d => d.invested),
        borderColor: '#9ca3af',
        borderWidth: 1.5,
        borderDash: [6, 3],
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 4,
        fill: true,
        backgroundColor: 'rgba(156,163,175,0.08)'
      }
    ]
  }
})

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'index' as const, intersect: false },
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: { boxWidth: 14, boxHeight: 3, font: { size: 11 } }
    },
    tooltip: {
      callbacks: {
        title: (items: TooltipItem<'line'>[]) => t('chart.year', { n: items[0]?.label }),
        label: (item: TooltipItem<'line'>) => ` ${item.dataset.label}: ${formatMAD(item.raw as number)}`
      }
    }
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { font: { size: 11 } },
      border: { color: '#e5e7eb' }
    },
    y: {
      grid: { color: '#f3f4f6' },
      ticks: {
        font: { size: 10 },
        callback: (value: number | string) => {
          const v = Number(value)
          if (v >= M) return (v / M).toFixed(1) + 'M'
          if (v >= K) return Math.round(v / K) + 'k'
          return String(v)
        }
      }
    }
  }
}))
</script>

<template>
  <div class="w-full">
    <h3 class="mb-3 text-base font-semibold text-muted">
      {{ t('chart.title') }}
    </h3>
    <ClientOnly>
      <div class="h-72 w-full sm:h-96">
        <Line
          :data="chartData"
          :options="chartOptions"
        />
      </div>
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
