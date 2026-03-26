# SPECS.md — Wafr

## Vision

Wafr (وفر) est un simulateur d'épargne et d'investissement pédagogique
pour le marché marocain. Il aide les Marocains à comprendre la puissance
des intérêts composés en comparant deux véhicules accessibles : Bourse
de Casablanca et immobilier. Bilingue FR/AR, installable
comme PWA, exportable en image pour une viralité WhatsApp/Instagram.

---

## Roadmap

### V1 — MVP
**Objectif :** 1 000 utilisateurs en 30 jours via viralité WhatsApp/Instagram.

| Feature | Description | Statut |
|---------|-------------|--------|
| F1 | Simulateur principal (sliders, calcul temps réel) | Terminé |
| F2 | Graphique interactif ECharts | Terminé |
| F3 | Cartes résultats (2 scénarios) | Terminé |
| F4 | Bilingue FR/AR avec RTL | Terminé |
| F5 | Export PNG (html-to-image) | Terminé |
| F6 | Partage via URL (query params) | Terminé |
| F7 | PWA installable + offline | En cours (icônes manquantes, tests mobiles) |

### V2 — Extension (2-3 mois)
**Objectif :** Monétisation freemium, 79 MAD/mois premium.

| Feature | Description |
|---------|-------------|
| F8 | Module FOMO ("si j'avais investi avant") |
| F9 | Mode retraite (calcul inversé, règle des 4%) |
| F10 | Calculateur appart Casablanca |
| F11 | Premium 79 MAD/mois |

### V3 — Plateforme (6-12 mois)
**Objectif :** Licences B2B banques marocaines, expansion Afrique francophone.

| Feature | Description |
|---------|-------------|
| F12 | Plateforme éducation financière |
| F13 | Partenariats B2B (CIH, Attijariwafa, Wafa Assurance) |
| F14 | Expansion Afrique francophone |

---

## Business rules

### Taux financiers (hardcodés, révision annuelle)

```typescript
export const RATES = {
  bvc: 0.09,   // Bourse de Casablanca — moyenne historique 2015-2024
  immo: 0.06,  // Immobilier Casablanca — moyenne historique 2015-2024
}
```

---

## Architecture

### Responsabilités par couche

| Couche | Rôle | Règle |
|--------|------|-------|
| `utils/` | Fonctions pures uniquement | Zéro import Vue/Nuxt, 100% testable par vitest |
| `composables/` | Logique réactive | useState, computed, watchers — consomme utils/ |
| `components/` | Présentation uniquement | Consomme les composables, pas de calculs |
| `pages/` | Assemblage + SEO meta | Aucune logique métier |

### Contraintes absolues

2. `html-to-image` : dynamic import `() => import('html-to-image')` côté client uniquement, jamais SSR
3. `VChart` : toujours dans `<ClientOnly>` pour éviter les erreurs SSR
4. Toutes les strings UI via `useI18n()`, jamais hardcodées dans les templates
5. Tous les montants affichés passent par `Math.round()`
6. Aucune logique de calcul dans les composants Vue
7. Les tests vitest passent avant chaque commit
8. Arabe en MSA (pas darija) — portabilité internationale

### Structure des fichiers

```
wafr/
├── app/
│   ├── components/
│   │   ├── SimulatorForm.vue      # Sliders de saisie
│   │   ├── ResultCards.vue        # 2 cartes résultats
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
└── nuxt.config.ts
```

### Décisions techniques

| Décision | Justification |
|----------|---------------|
| ECharts en SVG (pas canvas) | Export PNG propre via html-to-image sur un SVG |
| Taux hardcodés (pas d'API BVC) | Simplicité MVP, pas de dépendance externe, révision manuelle annuelle |
| Arabe MSA (pas darija) | Portabilité international, accessibilité aux non-marocains |
| Query params pour le partage | Pas de base de données nécessaire, URL courte, fonctionne offline |
| pnpm workspace | Préparation future monorepo si extension en packages |
| Pas de compte utilisateur V1 | Frein à l'adoption réduit, RGPD simplifié, viralité maximale |

---

## Stack

| Technologie | Rôle | Justification |
|-------------|------|---------------|
| Nuxt 3 | Framework fullstack | SSR/SSG, SEO, file-based routing |
| TypeScript | Typage | Sécurité, maintenabilité |
| @nuxt/ui | Composants UI | Accessibilité, Tailwind, cohérence |
| nuxt-echarts + VChart | Graphiques | ECharts = SVG natif, parfait pour export PNG |
| @nuxtjs/i18n | Internationalisation | RTL automatique, lazy loading locales |
| @vite-pwa/nuxt | PWA | Installable mobile, offline first |
| html-to-image | Export PNG | Client-only, dynamic import, pas de serveur |
| vitest | Tests unitaires | Compatible Vite, rapide |
| playwright | Tests e2e | Cross-browser, simule mobile |
| pnpm | Package manager | Performances, workspace |
| Vercel | Déploiement | Edge network, preview deployments |
