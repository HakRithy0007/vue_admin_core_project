<script lang="ts" setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import VerticalNavLink from '@/@layouts/components/VerticalNavLink.vue'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <!-- 👉 DASHBOARD -->
  <VerticalNavSectionTitle :item="{ heading: t('DASHBOARD_REPORT') }" />

  <!-- 👉 Dashboards -->
  <VerticalNavLink :item="{ title: t('DASHBOARD'), icon: 'ri-home-smile-line', to: '/dashboard' }" />
  <VerticalNavLink :item="{ title: t('REPORT'), icon: 'ri-file-chart-line', to: '/report' }" />

  <!-- 👉 USERS -->
  <VerticalNavSectionTitle :item="{ heading: t('USERS') }" />
  <VerticalNavLink :item="{ title: t('USERS'), icon: 'ri-user-add-line', to: '/user' }" />
  <VerticalNavLink :item="{ title: t('USER_AUDIT'), icon: 'ri-news-line', to: '/useraudit' }" />

  <!-- 👉 MEMBERS -->
  <VerticalNavSectionTitle :item="{ heading: t('MEMBERS') }" />
  <VerticalNavLink :item="{ title: t('MEMBERS'), icon: 'ri-user-add-line', to: '/member' }" />
  <VerticalNavLink :item="{ title: t('MEMBER_AUDIT'), icon: 'ri-news-line', to: '/memberaudit' }" />

  <!-- 👉 SETTINGS -->
  <VerticalNavSectionTitle :item="{ heading: t('SETTING') }" />
  <VerticalNavLink :item="{ title: t('COINS'), icon: 'ri-money-dollar-circle-line', to: '/coin' }" />
  <VerticalNavLink :item="{ title: t('HANDRANKING'), icon: 'ri-trophy-line', to: '/handranking' }" />

  <!-- 👉 LOGOUT -->
  <VerticalNavSectionTitle :item="{ heading: t('LOGOUT') }" />
  <VerticalNavLink :item="{ title: t('LOGOUT'), icon: 'ri-login-box-line', isLogout: true }" />
</template>