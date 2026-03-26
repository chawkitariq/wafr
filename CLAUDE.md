# CLAUDE.md — Wafr

@SPECS.md

## Règles absolues (ne jamais enfreindre)
2. `html-to-image` : dynamic import `() => import('html-to-image')` client uniquement, jamais SSR
3. `VChart` : toujours dans `<ClientOnly>`
4. Toutes les strings UI via `useI18n()`, jamais hardcodées dans les templates
5. Tous les montants affichés passent par `Math.round()`
6. Aucune logique de calcul dans les composants Vue
7. Les tests vitest passent avant chaque commit

## Conventions de nommage
- Composants Vue : PascalCase (`SimulatorForm.vue`, `ResultCards.vue`)
- Composables : préfixe `use` + camelCase (`useSimulator.ts`)
- Interfaces TypeScript : PascalCase (`SimulationParams`, `ScenarioResult`)
- Constantes exportées : SCREAMING_SNAKE_CASE (`RATES`)
- Clés i18n : dot notation en camelCase (`simulator.monthlyDeposit`, `results.finalAmount`)
- Fonctions internes à `simulator.ts` : camelCase non exportées (`simulateScenario`, `buildResult`)

## Workflows courants
- **Ajouter un scénario** : 1) `RATES` dans `simulator.ts` → 2) `SimulationResults` interface → 3) `calculateResults()` → 4) clés i18n fr.json + ar.json → 5) `ResultCards.vue` + `InvestmentChart.vue`
- **Ajouter une string UI** : clé dans `fr.json` → clé miroir dans `ar.json` → `t('clé')` dans le composant
- **Modifier les taux** : uniquement dans `RATES` (`utils/simulator.ts`), répercussion automatique partout

## Commandes utiles
```
pnpm dev               → serveur local
pnpm build             → build production
pnpm vitest run        → tests unitaires
pnpm playwright test   → tests e2e
vercel --prod          → deploy
```
