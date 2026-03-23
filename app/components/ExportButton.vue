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
    const html2canvas = (await import('html2canvas')).default
    const el = document.getElementById('simulator-export')
    if (!el) return
    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
    })
    const link = document.createElement('a')
    const date = new Date().toISOString().split('T')[0]
    link.download = `wafr-simulation-${date}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }
  finally {
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
