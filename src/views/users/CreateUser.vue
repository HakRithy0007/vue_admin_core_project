<template>
  <div class="flex justify-between grid-cols-12 items-center h-[50px]">

    <!-- Left Section -->
    <div class="left hidden lg:flex w-[50%] justify-start items-center">
      <VCard class="px-6">
        <div class="flex justify-center items-center gap-4">

          <!-- Admin -->
          <v-checkbox :label="t('ALL')" :model-value="role === 'all'"
            @update:model-value="val => role = val ? 'all' : ''" />
          <v-divider :thickness="2" vertical />

          <!-- Admin -->
          <v-checkbox :label="t('ADMIN')" :model-value="role === 'admin'"
            @update:model-value="val => role = val ? 'admin' : ''" />
          <v-divider :thickness="2" vertical />

          <!-- Moderator -->
          <v-checkbox :label="t('MODERATOR')" :model-value="role === 'moderator'"
            @update:model-value="val => role = val ? 'moderator' : ''" />
          <v-divider :thickness="2" vertical />

          <!-- Operator -->
          <v-checkbox :label="t('OPERATOR')" :model-value="role === 'operator'"
            @update:model-value="val => role = val ? 'operator' : ''" />
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
            <v-list-item v-for="(item, index) in items" :key="index" @click="selected = item">
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
        <VTextField :label="t('SEARCH_USERNAME')" type="text" />
      </VCol>

      <VBtn type="button" class="!h-[48px] bg-warning flex justify-center items-center" @click="dialog = true">
        <div class="md:inline">{{ t('ADD_NEW_USER') }}</div>
      </VBtn>
    </div>
  </div>

  <!-- Dialog -->
  <v-dialog v-model="dialog" max-width="500" opacity="0.7">
    <v-card :title="t('ADD_NEW_USER')">
      <v-card-text>
        {{ t('FORM_PLACEHOLDER') }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">{{ t('CLOSE') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue"
import { ref } from 'vue'
import type { Anchor } from 'vuetify'
import { useI18n } from 'vue-i18n'
const role = ref("")
const { t } = useI18n()

const location = ref<Anchor>('right')
const dialog = ref(false)

interface Item {
  title: string
}

const items = ref<Item[]>([
  { title: 'ADMIN' },
  { title: 'MODERATOR' },
  { title: 'OPERATOR' },
])

const selected = ref<Item>(items.value[0])
</script>
