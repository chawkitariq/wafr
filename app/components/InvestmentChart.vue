<script setup lang="ts">
import type { SimulationResults } from '~/utils/simulator'
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler)

const props = defineProps<{
  results: SimulationResults
  years: number
}>()

const { t } = useI18n()

function formatMAD(value: number) {
  return new Intl.NumberFormat('fr-MA').format(Math.round(value)) + ' MAD'
}

const chartData = computed(() => {
  const data = props.results.yearlyData
  return {
    labels: data.map(d => d.year),
    datasets: [
      {
        label: t('scenarios.bvc'),
        data: data.map(d => d.bvc),
        borderColor: '#10b981',
        borderWidth: 2.5,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4
      },
      {
        label: t('scenarios.immo'),
        data: data.map(d => d.immo),
        borderColor: '#3b82f6',
        borderWidth: 2.5,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4
      },
      {
        label: t('scenarios.epargne'),
        data: data.map(d => d.epargne),
        borderColor: '#f59e0b',
        borderWidth: 2.5,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4
      },
      {
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
        title: (items: any[]) => t('chart.year', { n: items[0].label }),
        label: (item: any) => ` ${item.dataset.label}: ${formatMAD(item.raw)}`
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
          if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + 'M'
          if (v >= 1_000) return Math.round(v / 1_000) + 'k'
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
        <Line :data="chartData" :options="chartOptions" />
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
