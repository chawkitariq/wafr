# PLANNING.md — Wafr

## Vision

Wafr (وفر) est un simulateur d'épargne et d'investissement pédagogique
pour le marché marocain. Il aide les Marocains à comprendre la puissance
des intérêts composés en comparant trois véhicules accessibles : Bourse
de Casablanca, immobilier, épargne bancaire. Bilingue FR/AR, installable
comme PWA, exportable en image pour une viralité WhatsApp/Instagram.

---

## Roadmap

### V1 — MVP (sprint actuel)
**Objectif business :** 1 000 utilisateurs en 30 jours via viralité WhatsApp/Instagram.
**Livrable :** Application déployée sur wafr.ma, fonctionnelle, exportable.

| Feature | Description | Statut |
|---------|-------------|--------|
| F1 | Simulateur principal (sliders, calcul temps réel) | Terminé |
| F2 | Graphique interactif ECharts | Terminé |
| F3 | Cartes résultats (3 scénarios) | Terminé |
| F4 | Bilingue FR/AR avec RTL | Terminé |
| F5 | Export PNG (html2canvas) | Terminé |
| F6 | Partage via URL (query params) | Terminé |
| F7 | PWA installable + offline | En cours (icônes manquantes, tests mobiles) |

### V2 — Extension (2-3 mois)
**Objectif business :** Monétisation freemium, 79 MAD/mois premium.

| Feature | Description | Statut |
|---------|-------------|--------|
| F8 | Module FOMO ("si j'avais investi avant") | À planifier |
| F9 | Mode retraite (calcul inversé, règle des 4%) | À planifier |
| F10 | Calculateur appart Casablanca | À planifier |
| F11 | Premium 79 MAD/mois | À planifier |

### V3 — Plateforme (6-12 mois)
**Objectif business :** Licences B2B banques marocaines, expansion Afrique francophone.

| Feature | Description | Statut |
|---------|-------------|--------|
| F12 | Plateforme éducation financière | À planifier |
| F13 | Partenariats B2B (CIH, Attijariwafa, Wafa Assurance) | À planifier |
| F14 | Expansion Afrique francophone | À planifier |

---

## Stack technique

| Technologie | Rôle | Justification |
|-------------|------|---------------|
| Nuxt 3 | Framework fullstack | SSR/SSG, SEO, file-based routing |
| TypeScript | Typage | Sécurité, maintenabilité |
| @nuxt/ui | Composants UI | Accessibilité, Tailwind, cohérence |
| nuxt-echarts + VChart | Graphiques | ECharts = SVG natif, parfait pour export PNG |
| @nuxtjs/i18n | Internationalisation | RTL automatique, lazy loading locales |
| @vite-pwa/nuxt | PWA | Installable mobile, offline first |
| html2canvas | Export PNG | Client-only, dynamic import, pas de serveur |
| vitest | Tests unitaires | Compatible Vite, rapide |
| playwright | Tests e2e | Cross-browser, simule mobile |
| pnpm | Package manager | Performances, workspace |
| Vercel | Déploiement | Edge network, preview deployments |

---

## Architecture des fichiers

```
wafr/
├── app/
│   ├── components/
│   │   ├── SimulatorForm.vue      # Sliders de saisie
│   │   ├── ResultCards.vue        # 3 cartes résultats
│   │   ├── InvestmentChart.vue    # Graphique ECharts
│   │   ├── ExportButton.vue       # Bouton export PNG
│   │   └── LanguageSwitcher.vue   # Bascule FR/AR
│   ├── composables/
│   │   ├── useSimulator.ts        # State réactif + calculs
│   │   └── useShareUrl.ts         # Encode/decode query params
│   ├── pages/
│   │   └── index.vue              # Page principale (assemblage)
│   └── utils/
│       └── simulator.ts           # Fonctions pures (zéro Vue)
├── locales/
│   ├── fr.json                    # Traductions françaises
│   └── ar.json                    # Traductions arabes (MSA)
├── public/
│   └── icons/                     # Icônes PWA
├── tests/
│   ├── unit/
│   │   └── simulator.test.ts      # Tests vitest
│   └── e2e/
│       └── simulator.spec.ts      # Tests playwright
├── nuxt.config.ts
├── CLAUDE.md
├── PLANNING.md
└── TASKS.md
```

---

## Règles d'architecture

1. **utils/simulator.ts** : fonctions pures uniquement, zéro import Vue/Nuxt, testées par vitest
2. **composables/** : logique réactive (useState, computed, watchers), consomme utils/
3. **components/** : présentation uniquement, consomme les composables
4. **pages/** : assemblage des composants, SEO meta uniquement
5. **html2canvas** : dynamic import `() => import('html2canvas')` côté client uniquement
6. **VChart** : toujours dans `<ClientOnly>` pour éviter les erreurs SSR
7. **i18n** : toutes les strings via `useI18n()`, jamais hardcodées dans les templates
8. **Montants** : tous les montants affichés passent par `Math.round()`

### Formule de calcul

```typescript
// Intérêts composés mensuels
function simulateMonth(balance: number, monthlyRate: number, monthlyDeposit: number): number {
  return balance * (1 + monthlyRate) + monthlyDeposit
}
// Taux annuel → mensuel : annualRate / 12
```

### Taux hardcodés (révision annuelle)

```typescript
export const RATES = {
  bvc: 0.09,          // Bourse de Casablanca — moyenne historique 2015-2024
  immo: 0.06,         // Immobilier Casablanca — moyenne historique 2015-2024
  epargne: 0.035,     // Épargne bancaire — taux moyen Maroc 2024
}
```

---

## KPIs de succès

### V1
- 1 000 utilisateurs uniques en 30 jours
- Score Lighthouse PWA ≥ 90
- Score Lighthouse Performance ≥ 85
- Score Lighthouse Accessibilité ≥ 90
- 100% des tests vitest passent
- Export PNG fonctionnel sur iOS Safari et Android Chrome

### V2
- 50 abonnés premium (79 MAD/mois) en 60 jours
- Taux de conversion free → premium ≥ 5%

### V3
- 1 contrat B2B signé avec une banque marocaine
- Présence dans 3 pays Afrique francophone

---

## Décisions techniques importantes

| Décision | Justification |
|----------|---------------|
| ECharts en SVG (pas canvas) | Export PNG propre via html2canvas sur un SVG |
| Taux hardcodés (pas d'API BVC) | Simplicité MVP, pas de dépendance externe, révision manuelle annuelle |
| Arabe MSA (pas darija) | Portabilité international, accessibilité aux non-marocains |
| Query params pour le partage | Pas de base de données nécessaire, URL courte, fonctionne offline |
| pnpm workspace | Préparation future monorepo si extension en packages |
| Pas de compte utilisateur V1 | Frein à l'adoption réduit, RGPD simplifié, viralité maximale |
