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


            <div class="time flex justify-center items-center gap-2">
                <span class="time-icon">
                    <Icon icon="noto:alarm-clock" width="24" height="24" />
                </span>
                <span v-if="!smAndDown" class="text-white font-medium mr-2">
                    {{ currentTime }}
                </span>

            </div>
            <!-- Real-time clock -->

            <!-- Notification button dialog -->
            <v-dialog max-width="500">
                <template v-slot:activator="{ props: activatorProps }">
                    <v-btn height="50px" color="teal" v-bind="activatorProps">
                        <Icon icon="famicons:notifications-sharp" width="30" height="30" />
                    </v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                    <v-card title="Notifications">
                        <v-card-text>
                            This is your notifications content.
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text="Close" @click="isActive.value = false"></v-btn>
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
            <v-dialog max-width="500">
                <template v-slot:activator="{ props: activatorProps }">
                    <v-btn height="50px" color="teal" v-bind="activatorProps">
                        <Icon icon="subway:world" width="30" height="30" />
                    </v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                    <v-card title="World Dialog">
                        <v-card-text>
                            Your world content goes here.
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text="Close" @click="isActive.value = false"></v-btn>
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
defineProps<{ drawer: boolean }>()
defineEmits<{ (e: "toggle-drawer"): void }>()
const { smAndDown } = useDisplay()
// Fullscreen logic
const isFullscreen = ref(false)

const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
    } else {
        await document.exitFullscreen()
    }
}

const handleFullscreenChange = () => {
    isFullscreen.value = !!document.fullscreenElement
}

onMounted(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange)
})
onBeforeUnmount(() => {
    document.removeEventListener("fullscreenchange", handleFullscreenChange)
})

// Real-time clock
const currentTime = ref(new Date().toLocaleTimeString())
let intervalId: number
onMounted(() => {
    intervalId = window.setInterval(() => {
        currentTime.value = new Date().toLocaleTimeString()
    }, 1000)
})
onBeforeUnmount(() => clearInterval(intervalId))

</script>
