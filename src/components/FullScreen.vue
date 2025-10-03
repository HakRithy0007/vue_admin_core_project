<template>
    <div class="full-screen hidden lg:block">
        <VBtn icon variant="text" @click="toggleFullscreen">
            <Icon :icon="isFullscreen ? 'tdesign:fullscreen-exit-1' : 'tdesign:fullscreen-2'" class="text-[25px]" />
        </VBtn>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const isFullscreen = ref(false);

const toggleFullscreen = () => {
    if (!isFullscreen.value) {
        document.documentElement.requestFullscreen();
    } else if (document.fullscreenElement) {
        document.exitFullscreen();
    }
};

document.addEventListener('fullscreenchange', () => {
    isFullscreen.value = !!document.fullscreenElement;
});
</script>
