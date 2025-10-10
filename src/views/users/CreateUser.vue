<template>
  <div class="flex justify-between grid-cols-12 items-center h-[50px]">

    <!-- Left Section -->
    <div class="left hidden lg:flex w-[50%] justify-start items-center">
      <VCard class="px-6">
        <div class="flex justify-center items-center gap-4">

          <!-- All -->
          <v-checkbox :label="t('ALL')" :model-value="role === 'all'"
            @update:model-value="val => handleRoleChange(val ? 'all' : '')" />
          <v-divider :thickness="2" vertical />

          <!-- Admin -->
          <v-checkbox :label="t('ADMIN')" :model-value="role === 'admin'"
            @update:model-value="val => handleRoleChange(val ? 'admin' : '')" />
          <v-divider :thickness="2" vertical />

          <!-- Moderator -->
          <v-checkbox :label="t('MODERATOR')" :model-value="role === 'moderator'"
            @update:model-value="val => handleRoleChange(val ? 'moderator' : '')" />
          <v-divider :thickness="2" vertical />

          <!-- Operator -->
          <v-checkbox :label="t('OPERATOR')" :model-value="role === 'operator'"
            @update:model-value="val => handleRoleChange(val ? 'operator' : '')" />
        </div>
      </VCard>
    </div>

    <!-- Mobile / Tablet -->
    <div class="left w-[50%] flex lg:hidden justify-start items-center gap-4">
      <div class="text-center">
        <v-menu :location="location">
          <template #activator="{ props }">
            <v-btn class="!h-[48px] !w-[60px]" color="primary" v-bind="props">
              <Icon icon="mage:filter" class="text-[20px]" />
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index" @click="handleMobileRoleChange(item)">
              <v-list-item-title class="text-center">
                {{ t(item.title) }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>

    <!-- Right Section -->
    <div class="right w-[50%] flex justify-end items-center">
      <VCol cols="5" class="hidden lg:block">
        <VTextField v-model="searchUsername" :label="t('SEARCH_USERNAME')" type="text" />
      </VCol>

      <VBtn type="button" class="!h-[48px] bg-warning flex justify-center items-center" @click="dialog = true">
        <div class="md:inline">{{ t('ADD_NEW_USER') }}</div>
      </VBtn>
    </div>
  </div>

  <AddUserDialog v-model="dialog" @submit="handleCreateUser" @close="dialog = false" />
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue"
import { ref, watch } from 'vue'
import type { Anchor } from 'vuetify'
import { useI18n } from 'vue-i18n'
import AddUserDialog from '@/views/users/AddUser.vue'
const { t } = useI18n()

// Props
interface Props {
  onSearchChange?: (search: string) => void
  onRoleChange?: (role: string) => void
}

const props = defineProps<Props>()

// State
const role = ref("all")
const searchUsername = ref('')
const debounceTimeout = ref<ReturnType<typeof setTimeout> | null>(null)
const location = ref<Anchor>('right')
const dialog = ref(false)

interface Item {
  title: string
  value: string
}

const items = ref<Item[]>([
  { title: 'ALL', value: 'all' },
  { title: 'ADMIN', value: 'admin' },
  { title: 'MODERATOR', value: 'moderator' },
  { title: 'OPERATOR', value: 'operator' },
])

const selected = ref<Item>(items.value[0])

// Handle role change
const handleRoleChange = (newRole: string) => {
  role.value = newRole
  props.onRoleChange?.(newRole)
}

// Handle mobile role change
const handleMobileRoleChange = (item: Item) => {
  selected.value = item
  role.value = item.value
  props.onRoleChange?.(item.value)
}

// Watch search input with debounce
watch(searchUsername, (newValue) => {
  if (debounceTimeout.value !== null) {
    clearTimeout(debounceTimeout.value)
  }

  debounceTimeout.value = setTimeout(() => {
    props.onSearchChange?.(newValue)
  }, 500)
})

const handleCreateUser = async (userData: any) => {
  try {
    console.log('Creating user:', userData)

    // Show success message
    // You can use a toast/snackbar here

    // Refresh the user list
    // props.onUserCreated?.()
  } catch (error) {
    console.error('Failed to create user:', error)
    // Show error message
  }
}
</script>