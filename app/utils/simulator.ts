export const RATES = {
  bvc: 0.09,
  immo: 0.06,
  epargne: 0.035,
} as const

export type ScenarioKey = keyof typeof RATES

export interface SimulationParams {
  monthlyDeposit: number
  initialCapital: number
  years: number
}

export interface YearlySnapshot {
  year: number
  bvc: number
  immo: number
  epargne: number
  invested: number
}

export interface ScenarioResult {
  finalAmount: number
  totalInvested: number
  gains: number
  multiplier: number
  gainPercent: number
}

export interface SimulationResults {
  bvc: ScenarioResult
  immo: ScenarioResult
  epargne: ScenarioResult
  yearlyData: YearlySnapshot[]
}

function simulateScenario(
  initialCapital: number,
  monthlyDeposit: number,
  years: number,
  annualRate: number
): number[] {
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

function buildResult(finalBalance: number, totalInvested: number): ScenarioResult {
  const gains = finalBalance - totalInvested
  const multiplier = totalInvested > 0 ? finalBalance / totalInvested : 1
  return {
    finalAmount: Math.round(finalBalance),
    totalInvested: Math.round(totalInvested),
    gains: Math.round(gains),
    multiplier: Math.round(multiplier * 10) / 10,
    gainPercent: Math.round(totalInvested > 0 ? (gains / totalInvested) * 100 : 0),
  }
}

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
      invested: Math.round(initialCapital + monthlyDeposit * 12 * y),
    })
  }

  const totalInvested = initialCapital + monthlyDeposit * 12 * years

  return {
    bvc: buildResult(bvcBalances[years], totalInvested),
    immo: buildResult(immoBalances[years], totalInvested),
    epargne: buildResult(epargneBalances[years], totalInvested),
    yearlyData,
  }
}
