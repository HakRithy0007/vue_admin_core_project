<template>
    <div class="flex justify-between items-center h-[50px]">
        <!-- Left Section -->
        <div class="left w-[50%] justify-start items-center gap-4">
            <VBtn icon size="small" variant="tonal" color="error">
                <Icon icon="ion:trash-outline" class="text-[20px]" />
            </VBtn>
        </div>


        <!-- Right Section -->
        <div class="right w-[50%] flex justify-end items-center">
            <!-- Username -->
            <VCol cols="5" class="hidden lg:block">
                <VTextField label="Search Username" type="text" class="poppins" />
            </VCol>
        </div>
    </div>

    <!-- Dialog -->
    <v-dialog v-model="dialog" max-width="500" opacity="0.7">
        <v-card title="Add New User">
            <v-card-text>
                Here you can put your form or any content.
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="Close" @click="dialog = false"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue"
import { ref } from 'vue'
import type { Anchor } from 'vuetify'

const location = ref<Anchor>('right')
const dialog = ref(false)

interface Item {
    title: string
}

const items = ref<Item[]>([
    { title: 'Admin' },
    { title: 'Moderator' },
    { title: 'Operator' },
])

const selected = ref<Item>(items.value[0])
</script>
