<template>
    <v-card>
        <v-layout>
            <!-- Sidebar Component -->
            <Sidebar v-model:drawer="drawer" />

            <!-- Main Content -->
            <v-main class="h-[100vh]">

                <!-- Top Bar Component -->
                <TopbarMenu :drawer="drawer" @toggle-drawer="drawer = !drawer" />

                <!-- Page Content -->
                <div class="px-2 py-2 h-[calc(100vh-60px)]">
                    <router-view />
                </div>

            </v-main>
        </v-layout>
    </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Sidebar from "@/components/Sidebar.vue"
import TopbarMenu from "@/components/Topbar.vue"

const drawer = ref(true)
</script>
