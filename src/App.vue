<template>
  <VApp>
    <VSonner position="top-right" class="!text-xs" :duration="1500" />
    <RouterView />
  </VApp>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router'
import { VSonner } from 'vuetify-sonner'
import { watch } from "vue"
import { useI18n } from "vue-i18n"

const { locale } = useI18n()

watch(locale, (newLocale) => {
  document.documentElement.lang = newLocale
  localStorage.setItem("lang", newLocale)
})
</script>
