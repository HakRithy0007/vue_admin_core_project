<template>
    <v-navigation-drawer :model-value="drawer" location="left" :permanent="false" app
        @update:model-value="val => emit('update:drawer', val)">
        <template v-slot:prepend>
            <div class="flex h-[70px] justify-center items-center">
                <h1 class="text-[1.64rem]">ADMIN</h1>
            </div>
        </template>

        <v-list density="compact" nav>
            <!-- Dashboard -->
            <v-list-item :to="{ name: 'dashboard' }" router link min-height="50"
                class="!bg-[#323232] !text-white rounded-md" active-class="!bg-pink-500 !text-black" :ripple="false">
                <div class="flex justify-center items-center px-6">
                    <span>
                        <Icon icon="ri:dashboard-horizontal-fill" width="24" height="24" />
                    </span>
                    <span class="flex justify-center w-full">DASHBOARD</span>
                </div>
            </v-list-item>

            <!-- Users -->
            <v-list-item :to="{ name: 'user' }" router link min-height="50"
                class="mt-2 !bg-[#323232] !text-white rounded-md" active-class="!bg-pink-500 !text-black"
                :ripple="false">
                <div class="flex justify-center items-center px-6">
                    <span>
                        <Icon icon="ri:dashboard-horizontal-fill" width="24" height="24" />
                    </span>
                    <span class="flex justify-center w-full">USERS</span>
                </div>
            </v-list-item>

            <!-- user audit -->
            <v-list-item :to="{ name: 'user-audit' }" router link min-height="50"
                class="mt-2 !bg-[#323232] !text-white rounded-md" active-class="!bg-pink-500 !text-black"
                :ripple="false">
                <div class="flex justify-center items-center px-6">
                    <span>
                        <Icon icon="ri:dashboard-horizontal-fill" width="24" height="24" />
                    </span>
                    <span class="flex justify-center w-full">USER AUDITLOG</span>
                </div>
            </v-list-item>
        </v-list>


    </v-navigation-drawer>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue"
const props = defineProps<{ drawer: boolean }>()
const emit = defineEmits<{ (e: 'update:drawer', value: boolean): void }>()
</script>
