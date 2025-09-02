<template>
    <div class="h-[60px] px-2 border-b flex justify-between items-center">
        <!-- Left -->
        <div class="left-content flex justify-center items-center h-full">
            <v-btn height="50px" color="primary" @click="$emit('toggle-drawer')">
                <Icon v-if="drawer" icon="line-md:close" width="30" height="30" />
                <Icon v-else icon="gg:menu-grid-r" width="30" height="30" />
            </v-btn>
        </div>

        <!-- Right -->
        <div class="right-content flex justify-center items-center gap-1">

            <!-- Real-time clock -->
            <div class="time flex justify-center items-center gap-2">
                <span class="time-icon">
                    <Icon icon="noto:alarm-clock" width="24" height="24" />
                </span>
                <span v-if="!smAndDown" class="text-white font-medium mr-2">
                    {{ currentTime }}
                </span>

            </div>

            <!-- Notification button dialog -->
            <v-dialog max-width="500" transition="dialog-bottom-transition">
                <template v-slot:activator="{ props: activatorProps }">
                    <v-btn height="50px" color="teal" v-bind="activatorProps" variant="flat"
                        class="rounded-full shadow-md">
                        <Icon icon="famicons:notifications-sharp" width="28" height="28" />
                    </v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                    <v-card class="rounded-md shadow-lg">

                        <!-- Header -->
                        <v-card-title class="w-full border-b text-lg font-semibold">
                            <div class="title-notification flex justify-between items-center">
                                <span class="">NOTIFICATIONS</span>
                                <span class="">
                                    <v-btn icon variant="text" size="small" @click="isActive.value = false">
                                        <Icon icon="mdi:close" width="20" height="20" />
                                    </v-btn>
                                </span>
                            </div>
                        </v-card-title>

                        <!-- Notifications List -->
                        <v-card-text class="max-h-[500px] overflow-y-auto space-y-3">
                            <v-alert v-for="(n, index) in notifications" :key="index" :type="n.type"
                                density="comfortable" class="rounded-md shadow-sm my-2">
                                <div class="font-medium">{{ n.title }}</div>
                                <div class="text-sm opacity-80">{{ n.message }}</div>
                            </v-alert>
                        </v-card-text>

                        <!-- Footer -->
                        <v-card-actions class="py-4 border-t">
                            <v-btn text="Mark all as read" color="blue" variant="flat" class="text-sm text-gray-600" />
                            <v-btn color="red" variant="flat" text="Close" @click="isActive.value = false"></v-btn>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>

            <!-- Fullscreen button -->
            <v-btn v-show="!smAndDown" height="50px" color="teal" @click="toggleFullscreen">
                <Icon v-if="!isFullscreen" icon="ix:full-screen" width="30" height="30" />
                <Icon v-else icon="material-symbols:fullscreen-exit" width="30" height="30" />
            </v-btn>

            <!-- World button dialog -->
            <v-dialog max-width="400" transition="dialog-bottom-transition">
                <!-- Activator Button -->
                <template v-slot:activator="{ props: activatorProps }">
                    <v-btn height="50px" color="teal" v-bind="activatorProps">
                        <Icon icon="subway:world" width="30" height="30" />
                    </v-btn>
                </template>

                <!-- Dialog Content -->
                <template v-slot:default="{ isActive }">
                    <v-card class="rounded-md shadow-lg">
                        <!-- Title -->
                        <v-card-title class="text-center text-lg font-semibold border-b">
                            LANGUAGE
                        </v-card-title>

                        <!-- Language Buttons -->
                        <v-card-text class="flex justify-center items-center gap-4 py-6">
                            <v-btn variant="tonal" max-width="10" height="50" class="text-white text-lg" @click="selectLanguage('en');
                            isActive.value = false">
                                <img src="/src/assets/images/flag/america.png">
                            </v-btn>
                            <v-btn variant="tonal" max-width="10" height="50" class="text-white text-lg"
                                @click="selectLanguage('kh'); isActive.value = false">
                                <img src="/src/assets/images/flag/cambodia.png">
                            </v-btn>
                        </v-card-text>

                        <!-- Close Option -->
                        <v-card-actions class="justify-center border-t">
                            <v-btn text="Close" color="red" variant="flat" @click="isActive.value = false"></v-btn>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>

            <!-- Avatar button dialog -->
            <v-dialog max-width="500">
                <template v-slot:activator="{ props: activatorProps }">
                    <v-btn height="50px" color="teal" v-bind="activatorProps">
                        <v-avatar color="surface-variant" size="45">
                            <img src="/src/assets/images/users/user1.webp" alt="user avatar" />
                        </v-avatar>
                    </v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                    <v-card title="User Dialog">
                        <v-card-text>
                            User profile or settings content goes here.
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text="Close" @click="isActive.value = false"></v-btn>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>

        </div>
    </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue"
import { ref, onMounted, onBeforeUnmount } from "vue"
import { useDisplay } from 'vuetify'

type NotificationType = "success" | "info" | "warning" | "error";

interface Notification {
    type: NotificationType;
    title: string;
    message: string;
}

defineProps<{ drawer: boolean }>()
defineEmits<{ (e: "toggle-drawer"): void }>()

const { smAndDown } = useDisplay()
const isFullscreen = ref(false)
const currentTime = ref(new Date().toLocaleTimeString())
let intervalId: number
const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
    } else {
        await document.exitFullscreen()
    }
}

const notifications = ref<Notification[]>([
    { type: "success", title: "Welcome!", message: "Your account has been created successfully." },
    { type: "info", title: "System Update", message: "A new update is available." },
    { type: "warning", title: "Storage", message: "You are running low on storage space." },
    { type: "warning", title: "Storage", message: "You are running low on storage space." },
    { type: "warning", title: "Storage", message: "You are running low on storage space." },
    { type: "warning", title: "Storage", message: "You are running low on storage space." },
    { type: "warning", title: "Storage", message: "You are running low on storage space." },
    { type: "error", title: "Failed Payment", message: "Your last transaction was declined." }
]);

const selectLanguage = (lang: string) => {
    console.log("Selected language:", lang)
}

const handleFullscreenChange = () => {
    isFullscreen.value = !!document.fullscreenElement
}

onMounted(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    intervalId = window.setInterval(() => {
        currentTime.value = new Date().toLocaleTimeString()
    }, 1000)
})

onBeforeUnmount(() => {
    document.removeEventListener("fullscreenchange", handleFullscreenChange)
    clearInterval(intervalId)
})
</script>
