<script setup lang="ts">
const { locale } = useI18n()

useHead({
  htmlAttrs: {
    lang: () => locale.value,
    dir: () => locale.value === 'ar' ? 'rtl' : 'ltr'
  },
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }]
})
</script>

<template>
  <NuxtPwaManifest />
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink
          to="/"
          class="flex items-center gap-2 text-lg font-extrabold text-highlighted"
        >
          Wafr <span class="font-bold text-muted">وفر</span>
        </NuxtLink>
      </template>

      <template #right>
        <LanguageSwitcher />
        <UColorModeButton />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <UFooter>
      <template #default>
        <p class="text-sm text-muted">
          © {{ new Date().getFullYear() }} Wafr — wafr.chawkitariq.fr
        </p>
      </template>
    </UFooter>
  </UApp>
</template>
