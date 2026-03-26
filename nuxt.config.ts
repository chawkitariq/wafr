// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@vite-pwa/nuxt',
    'nuxt-echarts',
    '@nuxt/test-utils/module'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  ui: {
    colorMode: false
  },

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  vite: {
    optimizeDeps: {
      include: ['html-to-image']
    }
  },

  echarts: {
    charts: ['LineChart'],
    components: ['GridComponent', 'TooltipComponent', 'LegendComponent']
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  i18n: {
    locales: [
      {
        code: 'fr',
        language: 'fr-MA',
        dir: 'ltr',
        file: 'fr.json',
        name: 'Français'
      },
      {
        code: 'ar',
        language: 'ar-MA',
        dir: 'rtl',
        file: 'ar.json',
        name: 'العربية'
      }
    ],
    defaultLocale: 'fr',
    langDir: 'locales/',
    strategy: 'no_prefix',
    detectBrowserLanguage: false
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Wafr — Simulateur d\'investissement',
      short_name: 'Wafr',
      description:
        'Simulateur d\'épargne et d\'investissement pour le marché marocain',
      theme_color: '#00C16A',
      background_color: '#ffffff',
      display: 'standalone',
      orientation: 'portrait',
      lang: 'fr',
      icons: [
        { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
        {
          src: '/icons/icon-512-maskable.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,ico,svg}']
    },
    devOptions: {
      enabled: false
    }
  }
})
