/**
 * Historical average annual returns for Moroccan investment vehicles (2015–2024).
 * Reviewed manually once a year — do not derive from a live API.
 */
export const RATES = {
  bvc: 0.09, // Bourse de Casablanca — 9% historical average
  immo: 0.06, // Casablanca real estate — 6% historical average
  epargne: 0.035 // Moroccan bank savings account — 3.5% average 2024
} as const

export type ScenarioKey = keyof typeof RATES

/** User-controlled simulation inputs. */
export interface SimulationParams {
  monthlyDeposit: number // MAD deposited each month
  initialCapital: number // MAD invested at time zero
  years: number // Investment horizon in years
}

/** Portfolio value at end of each year for all scenarios plus total invested. */
export interface YearlySnapshot {
  year: number
  bvc: number
  immo: number
  epargne: number
  invested: number // Cumulative capital injected (no compounding) — used as chart baseline
}

/** Final metrics for a single investment scenario. */
export interface ScenarioResult {
  finalAmount: number // Portfolio value at end of horizon (MAD, rounded)
  totalInvested: number // Total capital injected, no compounding (MAD, rounded)
  gains: number // finalAmount − totalInvested (MAD, rounded)
  multiplier: number // finalAmount / totalInvested, 1 decimal (e.g. 2.3×)
  gainPercent: number // gains / totalInvested × 100, rounded to nearest integer
}

/** Results for all three scenarios plus the year-by-year chart data. */
export interface SimulationResults {
  bvc: ScenarioResult
  immo: ScenarioResult
  epargne: ScenarioResult
  yearlyData: YearlySnapshot[]
}

/**
 * Compounds a portfolio month-by-month and returns the balance at the end of
 * each year (index 0 = initial capital, index N = balance after N years).
 *
 * Formula applied each month: balance = balance × (1 + monthlyRate) + monthlyDeposit
 * This is standard compound interest with monthly compounding and regular contributions.
 */
function simulateScenario(
  initialCapital: number,
  monthlyDeposit: number,
  years: number,
  annualRate: number
): number[] {
  // Divide annual rate by 12 for monthly compounding
  const monthlyRate = annualRate / 12
  const balances: number[] = [initialCapital]
  let balance = initialCapital
  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + monthlyRate) + monthlyDeposit
    }
    balances.push(balance)
  }
  return balances
}

/**
 * Derives display-ready metrics from a final balance and total invested amount.
 * Multiplier is rounded to 1 decimal place (×10 then /10) to keep the UI compact.
 * Guard against division by zero when totalInvested is 0 (pure zero-capital simulation).
 */
function buildResult(finalBalance: number, totalInvested: number): ScenarioResult {
  const gains = finalBalance - totalInvested
  const multiplier = totalInvested > 0 ? finalBalance / totalInvested : 1
  return {
    finalAmount: Math.round(finalBalance),
    totalInvested: Math.round(totalInvested),
    gains: Math.round(gains),
    multiplier: Math.round(multiplier * 10) / 10,
    gainPercent: Math.round(totalInvested > 0 ? (gains / totalInvested) * 100 : 0)
  }
}

/**
 * Returns the scenario key with the highest final amount.
 * BVC is checked first so it wins ties (highest historical risk/reward).
 */
export function getBestScenario(results: SimulationResults): ScenarioKey {
  if (results.bvc.finalAmount >= results.immo.finalAmount && results.bvc.finalAmount >= results.epargne.finalAmount) return 'bvc'
  if (results.immo.finalAmount >= results.epargne.finalAmount) return 'immo'
  return 'epargne'
}

/**
 * Runs the simulation for all three scenarios and assembles the full result set,
 * including year-by-year snapshots for the chart.
 */
export function calculateResults(params: SimulationParams): SimulationResults {
  const { monthlyDeposit, initialCapital, years } = params

  const bvcBalances = simulateScenario(initialCapital, monthlyDeposit, years, RATES.bvc)
  const immoBalances = simulateScenario(initialCapital, monthlyDeposit, years, RATES.immo)
  const epargneBalances = simulateScenario(initialCapital, monthlyDeposit, years, RATES.epargne)

  const yearlyData: YearlySnapshot[] = []
  for (let y = 0; y <= years; y++) {
    yearlyData.push({
      year: y,
      bvc: Math.round(bvcBalances[y]),
      immo: Math.round(immoBalances[y]),
      epargne: Math.round(epargneBalances[y]),
      invested: Math.round(initialCapital + monthlyDeposit * 12 * y)
    })
  }

  const totalInvested = initialCapital + monthlyDeposit * 12 * years

  return {
    bvc: buildResult(bvcBalances[years], totalInvested),
    immo: buildResult(immoBalances[years], totalInvested),
    epargne: buildResult(epargneBalances[years], totalInvested),
    yearlyData
  }
}
