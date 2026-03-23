# TASKS.md — Wafr V1

## Vue d'ensemble

| Statut | Nombre |
|--------|--------|
| Total  | 35     |
| Faites [x] | 0 |
| En cours [~] | 0 |
| À faire [ ] | 35 |

---

## F0 — Infrastructure & configuration

| ID | Tâche | Statut | Taille | Fichiers |
|----|-------|--------|--------|----------|
| T001 | Vérifier les dépendances installées (nuxt-echarts, i18n, pwa, etc.) | [ ] | S | package.json |
| T002 | Configurer nuxt.config.ts (modules : i18n, echarts, pwa, ui) | [ ] | M | nuxt.config.ts |
| T003 | Créer la structure de dossiers (composables/, utils/, locales/, tests/) | [ ] | S | — |
| T004 | Configurer @nuxtjs/i18n (fr défaut, ar, lazy loading) | [ ] | M | nuxt.config.ts, locales/ |
| T005 | Configurer @vite-pwa/nuxt (manifest, icônes, offline) | [ ] | M | nuxt.config.ts, public/icons/ |

---

## F1 — Simulateur principal

| ID | Tâche | Statut | Taille | Fichiers |
|----|-------|--------|--------|----------|
| T006 | Créer utils/simulator.ts avec les constantes RATES | [ ] | S | utils/simulator.ts |
| T007 | Implémenter simulateMonth() — formule intérêts composés | [ ] | S | utils/simulator.ts |
| T008 | Implémenter simulateYears() — tableau complet mois par mois | [ ] | M | utils/simulator.ts |
| T009 | Implémenter calculateResults() — résultats des 3 scénarios | [ ] | M | utils/simulator.ts |
| T010 | Créer composable useSimulator.ts (state réactif, params URL) | [ ] | M | composables/useSimulator.ts |
| T011 | Créer SimulatorForm.vue (3 sliders : épargne, capital, durée) | [ ] | M | components/SimulatorForm.vue |

---

## F2 — Graphique interactif

| ID | Tâche | Statut | Taille | Fichiers |
|----|-------|--------|--------|----------|
| T012 | Configurer nuxt-echarts dans nuxt.config.ts | [ ] | S | nuxt.config.ts |
| T013 | Créer InvestmentChart.vue dans ClientOnly | [ ] | L | components/InvestmentChart.vue |
| T014 | Implémenter les 3 courbes (BVC, immo, épargne) + zone capital investi | [ ] | L | components/InvestmentChart.vue |
| T015 | Configurer tooltip MAD avec formatage fr-MA | [ ] | M | components/InvestmentChart.vue |
| T016 | Adapter le graphique au RTL (labels inversés en AR) | [ ] | M | components/InvestmentChart.vue |

---

## F3 — Cartes résultats

| ID | Tâche | Statut | Taille | Fichiers |
|----|-------|--------|--------|----------|
| T017 | Créer ResultCards.vue (3 cartes : BVC, immo, épargne) | [ ] | M | components/ResultCards.vue |
| T018 | Afficher montant final, gains, multiplicateur (×N), % gain | [ ] | M | components/ResultCards.vue |
| T019 | Formater tous les montants en fr-MA avec Math.round() | [ ] | S | components/ResultCards.vue |
| T020 | Mise en évidence de la meilleure option | [ ] | S | components/ResultCards.vue |

---

## F4 — Bilingue FR/AR + RTL

| ID | Tâche | Statut | Taille | Fichiers |
|----|-------|--------|--------|----------|
| T021 | Créer locales/fr.json avec toutes les clés | [ ] | M | locales/fr.json |
| T022 | Créer locales/ar.json avec toutes les traductions (MSA) | [ ] | L | locales/ar.json |
| T023 | Créer LanguageSwitcher.vue (bouton FR ↔ AR) | [ ] | S | components/LanguageSwitcher.vue |
| T024 | Configurer RTL automatique via i18n (dir="rtl" sur html) | [ ] | M | nuxt.config.ts, app.vue |
| T025 | Vérifier que tous les composants respectent RTL | [ ] | M | components/*.vue |

---

## F5 — Export PNG

| ID | Tâche | Statut | Taille | Fichiers |
|----|-------|--------|--------|----------|
| T026 | Créer ExportButton.vue avec dynamic import html2canvas | [ ] | M | components/ExportButton.vue |
| T027 | Définir la zone de capture (graphique + cartes) | [ ] | M | components/ExportButton.vue, pages/index.vue |
| T028 | Configurer résolution 2x, nom de fichier avec date | [ ] | S | components/ExportButton.vue |
| T029 | Tester l'export sur mobile Safari iOS et Chrome Android | [ ] | M | — |

---

## F6 — Partage via URL

| ID | Tâche | Statut | Taille | Fichiers |
|----|-------|--------|--------|----------|
| T030 | Créer composable useShareUrl.ts (encode/decode query params) | [ ] | M | composables/useShareUrl.ts |
| T031 | Synchroniser les sliders avec l'URL (?s=500&c=10000&y=10) | [ ] | M | composables/useSimulator.ts |
| T032 | Ajouter bouton "Copier le lien" | [ ] | S | components/SimulatorForm.vue |

---

## F7 — PWA

| ID | Tâche | Statut | Taille | Fichiers |
|----|-------|--------|--------|----------|
| T033 | Générer icônes PWA (192x192, 512x512, maskable) | [ ] | S | public/icons/ |
| T034 | Configurer workbox (cache offline des assets) | [ ] | M | nuxt.config.ts |
| T035 | Tester l'installation PWA sur Android et iOS | [ ] | S | — |

---

## Page principale

| ID | Tâche | Statut | Taille | Fichiers |
|----|-------|--------|--------|----------|
| T036 | Créer pages/index.vue (assemblage composants + SEO meta) | [ ] | M | pages/index.vue |
| T037 | Ajouter mention légale (simulation indicative) | [ ] | S | pages/index.vue |

---

## Tests

| ID | Tâche | Statut | Taille | Fichiers |
|----|-------|--------|--------|----------|
| T038 | Tests vitest : simulateMonth(), simulateYears(), calculateResults() | [ ] | M | tests/unit/simulator.test.ts |
| T039 | Tests vitest : cas limites (capital=0, durée=1, taux=0, max) | [ ] | M | tests/unit/simulator.test.ts |
| T040 | Tests playwright : simulation complète (saisie → résultats → graphique) | [ ] | L | tests/e2e/simulator.spec.ts |
| T041 | Tests playwright : export PNG | [ ] | M | tests/e2e/simulator.spec.ts |
| T042 | Tests playwright : changement de langue FR → AR | [ ] | M | tests/e2e/simulator.spec.ts |
| T043 | Tests playwright : partage URL (params → simulation reconstituée) | [ ] | M | tests/e2e/simulator.spec.ts |

---

## Fait aujourd'hui

*(aucune tâche terminée — session initiale)*

---

## Bloqueurs

*(aucun bloqueur pour l'instant)*

---

## Ordre d'exécution recommandé

```
Phase 1 — Fondations
  T001 → T002 → T003 → T004 → T005

Phase 2 — Logique métier
  T006 → T007 → T008 → T009
  T038 → T039  (tests AVANT d'aller plus loin)

Phase 3 — UI principale
  T010 → T011 → T017 → T018 → T019 → T020 → T036

Phase 4 — Graphique
  T012 → T013 → T014 → T015 → T016

Phase 5 — i18n
  T021 → T022 → T023 → T024 → T025

Phase 6 — Features virales
  T026 → T027 → T028  (export PNG)
  T030 → T031 → T032  (partage URL)
  T033 → T034 → T035  (PWA)

Phase 7 — Finition
  T029 → T037 → T040 → T041 → T042 → T043
```
