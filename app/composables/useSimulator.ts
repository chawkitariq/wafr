import { calculateResults } from '~/utils/simulator'
import type { SimulationResults } from '~/utils/simulator'

export const useSimulator = () => {
  const route = useRoute()
  const router = useRouter()

  const monthlyDeposit = ref(1000)
  const initialCapital = ref(10000)
  const years = ref(10)

  // Init from URL query params on mount
  onMounted(() => {
    const s = Number(route.query.s)
    const c = Number(route.query.c)
    const y = Number(route.query.y)
    if (s >= 100 && s <= 20000) monthlyDeposit.value = s
    if (c >= 0 && c <= 200000) initialCapital.value = c
    if (y >= 1 && y <= 30) years.value = y
  })

  // Sync params to URL
  watch([monthlyDeposit, initialCapital, years], ([s, c, y]) => {
    router.replace({ query: { s, c, y } })
  })

  const results = computed<SimulationResults>(() =>
    calculateResults({
      monthlyDeposit: monthlyDeposit.value,
      initialCapital: initialCapital.value,
      years: years.value
    })
  )

  const copied = ref(false)
  const copyLink = async () => {
    if (import.meta.client) {
      await navigator.clipboard.writeText(window.location.href)
      copied.value = true
      setTimeout(() => { copied.value = false }, 2500)
    }
  }

  return {
    monthlyDeposit,
    initialCapital,
    years,
    results,
    copied,
    copyLink
  }
}
