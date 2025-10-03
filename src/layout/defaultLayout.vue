<script lang="ts" setup>
import DefaultLayoutWithVerticalNav from '@/layout/DefaultLayoutWithVerticalNav.vue'
</script>

<template>
  <DefaultLayoutWithVerticalNav>
    <RouterView />
  </DefaultLayoutWithVerticalNav>
</template>

<style lang="scss">
@use "@layouts/styles/default-layout";
</style>
