<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { NavLink } from '@/@layouts/types'

const dialog = ref(false)
const router = useRouter()

defineProps<{
  item: NavLink & { isLogout?: boolean }
}>()

defineEmits<{
  (e: 'click'): void
}>()

function handleLogout() {
  dialog.value = false
  router.push('/login')
}
</script>

<template>
  <li class="nav-link" :class="{ disabled: item.disable }">
    <Component :is="item.isLogout ? 'button' : (item.to ? 'RouterLink' : 'a')"
      :to="!item.isLogout ? item.to : undefined" :href="!item.isLogout ? item.href : undefined" :target="item.target"
      @click="item.isLogout ? dialog = true : $emit('click')"
      class="flex cursor-pointer items-center gap-2 mr-2 ml-2 nav-item-button"
      :class="{ 'logout-button': item.isLogout }">
      <VIcon :icon="item.icon || 'ri-checkbox-blank-circle-line'" class="nav-item-icon" />
      <span class="nav-item-title">{{ item.title }}</span>
      <span class="nav-item-badge" :class="item.badgeClass">{{ item.badgeContent }}</span>
    </Component>
  </li>

  <v-dialog v-model="dialog" max-width="400" opacity="0.7">
    <v-card>
      <v-card-title class="text-h6 py-2">
        <span class="flex justify-center items-center poppins">
          Confirm Delete
        </span>
      </v-card-title>

      <VDivider />

      <v-card-text>
        <span class="flex justify-center items-center pt-4 gap-2">
          <span class="poppins">Are you sure you want to log out?</span>
        </span>
      </v-card-text>

      <VDivider />

      <v-card-actions class="pa-4 flex justify-center items-center">
        <v-btn variant="outlined" color="primary" class="poppins !border-2 !w-[80px]" text="CANCEL"
          @click="dialog = false" />
        <v-btn variant="outlined" color="success" class="poppins !border-2 !w-[80px]" text="SAVE"
          @click="handleLogout" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.logout-button {
  width: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  padding: 0;
  font: inherit;
  color: inherit;
}

.logout-button:hover {
  background-color: rgba(var(--v-theme-primary), 0.08);
}

.logout-button:active {
  background-color: rgba(var(--v-theme-primary), 0.12);
}
</style>