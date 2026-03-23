<script setup lang="ts">
const { locale, setLocale } = useI18n()

function toggle() {
  setLocale(locale.value === 'fr' ? 'ar' : 'fr')
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
    {{ locale === 'fr' ? 'العربية' : 'Français' }}
  </UButton>
</template>
