<script setup lang="ts">
import { useTheme } from 'vuetify'
import type { ThemeSwitcherTheme } from '@/@layouts/types'
import { watch, onMounted } from 'vue';
import { useCycleList } from '@vueuse/core';

const THEME_STORAGE_KEY = 'admin-poker-theme'
const { name: themeName, global: globalTheme } = useTheme()
const props = defineProps<{
  themes: ThemeSwitcherTheme[]
}>()

const getStoredTheme = (): string => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored && props.themes.some(theme => theme.name === stored)) {
      return stored
    }
  }
  return themeName.value
}

const { state: currentThemeName, next: getNextThemeName, index: currentThemeIndex } = useCycleList(
  props.themes.map(t => t.name),
  { initialValue: getStoredTheme() }
)

const saveThemeToStorage = (theme: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }
}

const changeTheme = () => {
  const nextTheme = getNextThemeName()
  globalTheme.name.value = nextTheme
  saveThemeToStorage(nextTheme)
}

onMounted(() => {
  const storedTheme = getStoredTheme()
  if (storedTheme !== globalTheme.name.value) {
    globalTheme.name.value = storedTheme
    currentThemeName.value = storedTheme
  }
})

watch(() => globalTheme.name.value, (val: any) => {
  currentThemeName.value = val
  saveThemeToStorage(val)
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