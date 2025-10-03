<script setup lang="ts">
import { useTheme } from 'vuetify'
import type { ThemeSwitcherTheme } from '@/@layouts/types'
import { watch } from 'vue';
import { useCycleList } from '@vueuse/core';

const props = defineProps<{
  themes: ThemeSwitcherTheme[]
}>()

const { name: themeName, global: globalTheme } = useTheme()
const { state: currentThemeName, next: getNextThemeName, index: currentThemeIndex } = useCycleList(props.themes.map(t => t.name), { initialValue: themeName })

const changeTheme = () => {
  globalTheme.name.value = getNextThemeName()
}

watch(() => globalTheme.name.value, (val: any) => {
  currentThemeName.value = val
})
</script>

<template>
  <IconBtn @click="changeTheme">
    <VIcon :icon="props.themes[currentThemeIndex].icon" />
    <VTooltip activator="parent" open-delay="1000" scroll-strategy="close">
      <span class="text-capitalize">{{ currentThemeName }}</span>
    </VTooltip>
  </IconBtn>
</template>
