import { calculateResults } from '~/utils/simulator'
import { SIMULATOR_BOUNDS, COPY_FEEDBACK_MS } from '~/utils/constants'

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
    if (s >= SIMULATOR_BOUNDS.monthly.min && s <= SIMULATOR_BOUNDS.monthly.max) monthlyDeposit.value = s
    if (c >= SIMULATOR_BOUNDS.capital.min && c <= SIMULATOR_BOUNDS.capital.max) initialCapital.value = c
    if (y >= SIMULATOR_BOUNDS.years.min && y <= SIMULATOR_BOUNDS.years.max) years.value = y
  })

  // Sync params to URL
  watch([monthlyDeposit, initialCapital, years], ([s, c, y]) => {
    router.replace({ query: { s, c, y } })
  })

  const results = computed(() =>
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
      setTimeout(() => {
        copied.value = false
      }, COPY_FEEDBACK_MS)
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
