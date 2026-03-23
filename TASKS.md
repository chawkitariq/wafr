# TASKS.md — Wafr V1

## Vue d'ensemble

| Statut | Nombre |
|--------|--------|
| Total  | 43     |
| Faites [x] | 37 |
| En cours [~] | 0 |
| À faire [ ] | 6 |

---

## F0 — Infrastructure & configuration

| ID | Tâche | Statut | Taille | Fichiers |
|----|-------|--------|--------|----------|
| T001 | Vérifier les dépendances installées (nuxt-echarts, i18n, pwa, etc.) | [x] | S | package.json |
| T002 | Configurer nuxt.config.ts (modules : i18n, echarts, pwa, ui) | [x] | M | nuxt.config.ts |
| T003 | Créer la structure de dossiers (composables/, utils/, locales/, tests/) | [x] | S | — |
| T004 | Configurer @nuxtjs/i18n (fr défaut, ar, lazy loading) | [x] | M | nuxt.config.ts, i18n/locales/ |
| T005 | Configurer @vite-pwa/nuxt (manifest, icônes, offline) | [x] | M | nuxt.config.ts, public/icons/ |

---

## F1 — Simulateur principal

| ID | Tâche | Statut | Taille | Fichiers |
|----|-------|--------|--------|----------|
| T006 | Créer utils/simulator.ts avec les constantes RATES | [x] | S | app/utils/simulator.ts |
| T007 | Implémenter simulateMonth() — formule intérêts composés | [x] | S | app/utils/simulator.ts |
| T008 | Implémenter simulateYears() — tableau complet année par année | [x] | M | app/utils/simulator.ts |
| T009 | Implémenter calculateResults() — résultats des 3 scénarios | [x] | M | app/utils/simulator.ts |
| T010 | Créer composable useSimulator.ts (state réactif, params URL) | [x] | M | app/composables/useSimulator.ts |
| T011 | Créer SimulatorForm.vue (3 sliders : épargne, capital, durée) | [x] | M | app/components/SimulatorForm.vue |

---

## F2 — Graphique interactif

| ID | Tâche | Statut | Taille | Fichiers |
|----|-------|--------|--------|----------|
| T012 | Configurer nuxt-echarts dans nuxt.config.ts | [x] | S | nuxt.config.ts |
| T013 | Créer InvestmentChart.vue dans ClientOnly | [x] | L | app/components/InvestmentChart.vue |
| T014 | Implémenter les 3 courbes (BVC, immo, épargne) + zone capital investi | [x] | L | app/components/InvestmentChart.vue |
| T015 | Configurer tooltip MAD avec formatage fr-MA | [x] | M | app/components/InvestmentChart.vue |
| T016 | Adapter le graphique au RTL (grid inversé en AR) | [x] | M | app/components/InvestmentChart.vue |

---

## F3 — Cartes résultats

| ID | Tâche | Statut | Taille | Fichiers |
|----|-------|--------|--------|----------|
| T017 | Créer ResultCards.vue (3 cartes : BVC, immo, épargne) | [x] | M | app/components/ResultCards.vue |
| T018 | Afficher montant final, gains, multiplicateur (×N), % gain | [x] | M | app/components/ResultCards.vue |
| T019 | Formater tous les montants en fr-MA avec Math.round() | [x] | S | app/components/ResultCards.vue |
| T020 | Mise en évidence de la meilleure option | [x] | S | app/components/ResultCards.vue |

---

## F4 — Bilingue FR/AR + RTL

| ID | Tâche | Statut | Taille | Fichiers |
|----|-------|--------|--------|----------|
| T021 | Créer locales/fr.json avec toutes les clés | [x] | M | i18n/locales/fr.json |
| T022 | Créer locales/ar.json avec toutes les traductions (MSA) | [x] | L | i18n/locales/ar.json |
| T023 | Créer LanguageSwitcher.vue (bouton FR ↔ AR) | [x] | S | app/components/LanguageSwitcher.vue |
| T024 | Configurer RTL automatique via i18n (dir="rtl" sur html) | [x] | M | app/app.vue |
| T025 | Vérifier que tous les composants respectent RTL | [ ] | M | app/components/*.vue |

---

## F5 — Export PNG

| ID | Tâche | Statut | Taille | Fichiers |
|----|-------|--------|--------|----------|
| T026 | Créer ExportButton.vue avec dynamic import html2canvas | [x] | M | app/components/ExportButton.vue |
| T027 | Définir la zone de capture (#simulator-export) | [x] | M | app/pages/index.vue |
| T028 | Configurer résolution 2x, nom de fichier avec date | [x] | S | app/components/ExportButton.vue |
| T029 | Tester l'export sur mobile Safari iOS et Chrome Android | [ ] | M | — |

---

## F6 — Partage via URL

| ID | Tâche | Statut | Taille | Fichiers |
|----|-------|--------|--------|----------|
| T030 | Synchronisation URL dans useSimulator (encode/decode query params) | [x] | M | app/composables/useSimulator.ts |
| T031 | Synchroniser les sliders avec l'URL (?s=500&c=10000&y=10) | [x] | M | app/composables/useSimulator.ts |
| T032 | Ajouter bouton "Copier le lien" | [x] | S | app/components/ExportButton.vue |

---

## F7 — PWA

| ID | Tâche | Statut | Taille | Fichiers |
|----|-------|--------|--------|----------|
| T033 | Générer icônes PWA (192x192, 512x512, maskable) | [ ] | S | public/icons/ |
| T034 | Configurer workbox (cache offline des assets) | [x] | M | nuxt.config.ts |
| T035 | Tester l'installation PWA sur Android et iOS | [ ] | S | — |

---

## Page principale

| ID | Tâche | Statut | Taille | Fichiers |
|----|-------|--------|--------|----------|
| T036 | Créer pages/index.vue (assemblage composants + SEO meta) | [x] | M | app/pages/index.vue |
| T037 | Ajouter mention légale (simulation indicative) | [x] | S | app/pages/index.vue |

---

## Tests

| ID | Tâche | Statut | Taille | Fichiers |
|----|-------|--------|--------|----------|
| T038 | Tests vitest : simulateMonth(), simulateYears(), calculateResults() | [x] | M | test/unit/simulator.test.ts |
| T039 | Tests vitest : cas limites (capital=0, durée=1, taux=0, max) | [x] | M | test/unit/simulator.test.ts |
| T040 | Tests playwright : simulation complète (saisie → résultats → graphique) | [ ] | L | test/e2e/simulator.spec.ts |
| T041 | Tests playwright : export PNG | [ ] | M | test/e2e/simulator.spec.ts |
| T042 | Tests playwright : changement de langue FR → AR | [ ] | M | test/e2e/simulator.spec.ts |
| T043 | Tests playwright : partage URL (params → simulation reconstituée) | [ ] | M | test/e2e/simulator.spec.ts |

---

## Fait aujourd'hui

- T001–T005 : Infrastructure, nuxt.config.ts avec i18n, echarts, PWA
- T006–T009 : utils/simulator.ts — fonctions pures, formule intérêts composés
- T010–T011 : useSimulator.ts + SimulatorForm.vue (sliders)
- T012–T016 : InvestmentChart.vue (ECharts SVG, 4 séries, tooltip MAD, RTL)
- T017–T020 : ResultCards.vue (3 cartes, badge meilleure option)
- T021–T024 : Locales FR + AR (MSA), LanguageSwitcher, RTL dans app.vue
- T026–T028 : ExportButton.vue (html2canvas dynamic import, 2x, date)
- T030–T032 : URL sync dans useSimulator, bouton copier lien
- T034 : workbox offline configuré
- T036–T037 : pages/index.vue + mention légale
- T038–T039 : 15 tests vitest (cas normaux + cas limites) — tous ✓
- Build production : ✓

---

## Bloqueurs

*(aucun bloqueur pour l'instant)*

---

## Restant (6 tâches)

- T025 : Vérification RTL visuelle (test manuel)
- T029 : Test export PNG sur mobile (test manuel)
- T033 : Créer les icônes PWA réelles (images PNG)
- T035 : Test installation PWA sur mobile (test manuel)
- T040–T043 : Tests playwright e2e (à écrire)
