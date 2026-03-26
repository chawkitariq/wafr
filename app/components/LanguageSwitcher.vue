<script setup lang="ts">
import { LOCALES } from '~/utils/constants'

const { locale, setLocale } = useI18n()

function toggle() {
  setLocale(locale.value === LOCALES.FR ? LOCALES.AR : LOCALES.FR)
}
</script>

<template>
  <UButton
    color="neutral"
    variant="ghost"
    size="sm"
    class="font-medium tracking-wide"
    @click="toggle"
  >
    {{ locale === LOCALES.FR ? 'العربية' : 'Français' }}
  </UButton>
</template>
