import { describe, it, expect } from 'vitest'
import { calculateResults, RATES } from '../../app/utils/simulator'

describe('calculateResults', () => {
  describe('cas normaux', () => {
    it('calcule les montants finaux pour 10 ans', () => {
      const results = calculateResults({ monthlyDeposit: 1000, initialCapital: 10000, years: 10 })
      expect(results.bvc.finalAmount).toBeGreaterThan(results.immo.finalAmount)
      expect(results.immo.finalAmount).toBeGreaterThan(results.epargne.finalAmount)
      expect(results.epargne.finalAmount).toBeGreaterThan(results.bvc.totalInvested)
    })

    it('retourne le bon capital total investi', () => {
      const results = calculateResults({ monthlyDeposit: 1000, initialCapital: 10000, years: 10 })
      // 10000 + 1000 * 12 * 10 = 130 000
      expect(results.bvc.totalInvested).toBe(130000)
      expect(results.immo.totalInvested).toBe(130000)
      expect(results.epargne.totalInvested).toBe(130000)
    })

    it('les gains sont positifs', () => {
      const results = calculateResults({ monthlyDeposit: 500, initialCapital: 5000, years: 5 })
      expect(results.bvc.gains).toBeGreaterThan(0)
      expect(results.immo.gains).toBeGreaterThan(0)
      expect(results.epargne.gains).toBeGreaterThan(0)
    })

    it('le multiplicateur BVC est > multiplicateur immo > multiplicateur épargne', () => {
      const results = calculateResults({ monthlyDeposit: 1000, initialCapital: 0, years: 20 })
      expect(results.bvc.multiplier).toBeGreaterThan(results.immo.multiplier)
      expect(results.immo.multiplier).toBeGreaterThan(results.epargne.multiplier)
    })

    it('retourne yearlyData avec year+1 entrées', () => {
      const results = calculateResults({ monthlyDeposit: 1000, initialCapital: 0, years: 10 })
      expect(results.yearlyData).toHaveLength(11) // année 0 à 10
      expect(results.yearlyData[0].year).toBe(0)
      expect(results.yearlyData[10].year).toBe(10)
    })

    it('yearlyData[0] = capital initial (aucun dépôt effectué)', () => {
      const results = calculateResults({ monthlyDeposit: 1000, initialCapital: 5000, years: 5 })
      expect(results.yearlyData[0].bvc).toBe(5000)
      expect(results.yearlyData[0].immo).toBe(5000)
      expect(results.yearlyData[0].epargne).toBe(5000)
      expect(results.yearlyData[0].invested).toBe(5000)
    })
  })

  describe('cas limites', () => {
    it('capital initial = 0', () => {
      const results = calculateResults({ monthlyDeposit: 1000, initialCapital: 0, years: 10 })
      expect(results.bvc.finalAmount).toBeGreaterThan(0)
      expect(results.yearlyData[0].bvc).toBe(0)
      expect(results.yearlyData[0].invested).toBe(0)
    })

    it('versement mensuel = 0 (capital seul)', () => {
      const results = calculateResults({ monthlyDeposit: 0, initialCapital: 100000, years: 10 })
      // Avec BVC 9%, 100 000 MAD pendant 10 ans
      expect(results.bvc.finalAmount).toBeGreaterThan(100000)
      expect(results.bvc.totalInvested).toBe(100000)
    })

    it('durée = 1 an', () => {
      const results = calculateResults({ monthlyDeposit: 1000, initialCapital: 0, years: 1 })
      expect(results.yearlyData).toHaveLength(2)
      expect(results.bvc.finalAmount).toBeGreaterThan(12000) // > somme des versements
    })

    it('durée = 30 ans (maximum)', () => {
      const results = calculateResults({ monthlyDeposit: 1000, initialCapital: 0, years: 30 })
      expect(results.yearlyData).toHaveLength(31)
      expect(results.bvc.finalAmount).toBeGreaterThan(0)
    })

    it('tous les montants sont des entiers (Math.round)', () => {
      const results = calculateResults({ monthlyDeposit: 333, initialCapital: 7777, years: 7 })
      expect(results.bvc.finalAmount % 1).toBe(0)
      expect(results.immo.gains % 1).toBe(0)
      expect(results.epargne.finalAmount % 1).toBe(0)
      results.yearlyData.forEach((snap) => {
        expect(snap.bvc % 1).toBe(0)
        expect(snap.immo % 1).toBe(0)
        expect(snap.epargne % 1).toBe(0)
        expect(snap.invested % 1).toBe(0)
      })
    })

    it('versements et capital max', () => {
      const results = calculateResults({ monthlyDeposit: 20000, initialCapital: 200000, years: 30 })
      expect(results.bvc.finalAmount).toBeGreaterThan(0)
      expect(Number.isFinite(results.bvc.finalAmount)).toBe(true)
    })

    it('multiplicateur = 1 si capital investi = 0', () => {
      const results = calculateResults({ monthlyDeposit: 0, initialCapital: 0, years: 10 })
      expect(results.bvc.multiplier).toBe(1)
    })
  })

  describe('formule intérêts composés', () => {
    it('vérifie le taux BVC sur 1 an sans versement', () => {
      const results = calculateResults({ monthlyDeposit: 0, initialCapital: 100000, years: 1 })
      // Taux BVC = 9%/an composé mensuellement
      const expected = 100000 * Math.pow(1 + RATES.bvc / 12, 12)
      expect(results.bvc.finalAmount).toBe(Math.round(expected))
    })

    it('vérifie le taux épargne sur 1 an sans versement', () => {
      const results = calculateResults({ monthlyDeposit: 0, initialCapital: 100000, years: 1 })
      const expected = 100000 * Math.pow(1 + RATES.epargne / 12, 12)
      expect(results.epargne.finalAmount).toBe(Math.round(expected))
    })
  })
})
