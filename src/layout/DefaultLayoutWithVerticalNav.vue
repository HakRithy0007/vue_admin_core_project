<script lang="ts" setup>
import NavItems from '@/components/NavItems.vue'
import logo from '@images/logo.svg?raw'
import VerticalNavLayout from '@/@layouts/components/VerticalNavLayout.vue'
import ChangeLanguage from '@/components/ChangeLanguage.vue'
import NavbarThemeSwitcher from '@/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/components/UserProfile.vue'
import FullScreen from '@/components/FullScreen.vue'
import Notification from '@/components/Notification.vue'
import type { ThemeSwitcherTheme } from '@/@layouts/types'

const themes: ThemeSwitcherTheme[] = [
  {
    name: 'light',
    icon: 'ri-sun-line',
  },
  {
    name: 'dark',
    icon: 'ri-moon-clear-line',
  },
]
</script>

<template>
  <VerticalNavLayout>

    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center gap-1">
        <IconBtn class="ms-n3 d-lg-none" @click="toggleVerticalOverlayNavActive(true)">
          <VIcon icon="ri-menu-line" />
        </IconBtn>

        <VSpacer />

        <!-- Full Screen -->
        <IconBtn>
          <FullScreen />
        </IconBtn>

        <!-- Change Language -->
        <IconBtn>
          <ChangeLanguage />
        </IconBtn>

        <!-- Notification -->
        <IconBtn>
          <Notification />
        </IconBtn>

        <!-- Change Theme -->
        <IconBtn>
          <NavbarThemeSwitcher class="me-2" :themes="themes" />
        </IconBtn>

        <!-- User Profile -->
        <IconBtn>
          <UserProfile />
        </IconBtn>

      </div>
    </template>

    <template #vertical-nav-header="{ toggleIsOverlayNavActive }">
      <RouterLink to="/" class="app-logo app-title-wrapper">
        <div class="d-flex" v-html="logo" />
        <h1 class="font-weight-medium leading-normal text-xl text-uppercase">
          ADMIN POKER
        </h1>
      </RouterLink>

      <IconBtn class="d-block d-lg-none" @click="toggleIsOverlayNavActive(false)">
        <VIcon icon="ri-close-line" />
      </IconBtn>
    </template>

    <template #vertical-nav-content>
      <NavItems />
    </template>
    <slot />
  </VerticalNavLayout>
</template>

<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}

.app-logo {
  display: flex;
  align-items: center;
  column-gap: 0.75rem;

  .app-logo-title {
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.75rem;
    text-transform: uppercase;
  }
}
</style>