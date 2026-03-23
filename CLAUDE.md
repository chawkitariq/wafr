# CLAUDE.md — Wafr

## Ce fichier
Ce fichier est lu automatiquement par Claude Code à chaque
session. Il contient le contexte permanent du projet.

## Documents de référence
- PLANNING.md → vision, roadmap, features, architecture
- TASKS.md    → tâches en cours, faites, bloqueurs

## Règle de synchronisation
Quand PLANNING.md évolue → TASKS.md évolue en conséquence.
Quand toutes les tâches d'une feature sont [x] → la feature
passe à "Terminé" dans PLANNING.md.
Cette synchronisation est faite par Claude Code à chaque
fin de session ou dès qu'un changement survient.

## Projet
Wafr (وفر) — simulateur d'épargne et d'investissement
pour le marché marocain. Bilingue FR/AR, PWA, export PNG.

## Stack
Nuxt 3 · TypeScript · @nuxt/ui · nuxt-echarts · @nuxtjs/i18n
@vite-pwa/nuxt · html2canvas · vitest · playwright · pnpm · Vercel

## Règles absolues (ne jamais enfreindre)
1. utils/simulator.ts = fonctions pures, zéro Vue/Nuxt
2. html2canvas = dynamic import client uniquement, jamais SSR
3. VChart dans ClientOnly
4. Toutes les strings UI via useI18n(), jamais hardcodées
5. Tous les montants affichés passent par Math.round()
6. Aucune logique de calcul dans les composants Vue
7. Les tests vitest passent avant chaque commit
8. TASKS.md mis à jour dès qu'une tâche change de statut

## Taux financiers (hardcodés, révision annuelle)
- BVC (Bourse Casablanca) : 9%/an
- Immobilier Casablanca : 6%/an
- Épargne bancaire : 3.5%/an

## Commandes utiles
pnpm dev          → serveur local
pnpm build        → build production
pnpm vitest run   → tests unitaires
pnpm playwright test → tests e2e
vercel --prod     → deploy  