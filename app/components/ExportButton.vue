<script setup lang="ts">
const props = defineProps<{
  copied: boolean
}>()

const emit = defineEmits<{
  copyLink: []
}>()

const { t } = useI18n()
const exporting = ref(false)

async function exportPng() {
  if (exporting.value) return
  exporting.value = true
  try {
    const { toPng } = await import('html-to-image')
    const el = document.getElementById('simulator-export')
    if (!el) return
    const dataUrl = await toPng(el, { pixelRatio: 2 })
    const link = document.createElement('a')
    const date = new Date().toISOString().split('T')[0]
    link.download = `wafr-simulation-${date}.png`
    link.href = dataUrl
    link.click()
  } finally {
    exporting.value = false
  }
}
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <UButton
      color="primary"
      :loading="exporting"
      icon="i-lucide-image"
      @click="exportPng"
    >
      {{ exporting ? t('actions.exporting') : t('actions.export') }}
    </UButton>

    <UButton
      color="neutral"
      variant="subtle"
      :icon="props.copied ? 'i-lucide-check' : 'i-lucide-link'"
      @click="emit('copyLink')"
    >
      {{ props.copied ? t('actions.copied') : t('actions.shareUrl') }}
    </UButton>
  </div>
</template>
