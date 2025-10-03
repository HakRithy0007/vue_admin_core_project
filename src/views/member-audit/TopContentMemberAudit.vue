<template>
    <div class="top-content-user grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="(item, index) in statsData" :key="index">
            <VCard class="position-relative w-full h-full">
                <VCardText class="p-4">
                    <div class="flex justify-between items-center">
                        <!-- Title -->
                        <span class="text-[24px]">
                            {{ t(item.title) }}
                        </span>
                    </div>

                    <div class="flex justify-between items-center">
                        <!-- Count -->
                        <h4 class="text-[24px] text-primary" :class="item.textClass">
                            {{ item.count }}
                        </h4>
                        <VAvatar :color="item.color" :variant="item.variant" rounded size="50" class="elevation-2">
                            <VIcon size="24" :icon="item.icon" />
                        </VAvatar>
                    </div>

                    <!-- Subtitle -->
                    <h4 class="text-[16px]" :class="item.subtitleClass">
                        {{ t(item.subtitle) }}
                    </h4>
                </VCardText>
            </VCard>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

interface StatsItem {
    title: string
    count: number | string
    subtitle: string
    icon: string
    color: string
    variant?: 'tonal' | 'outlined' | 'flat' | 'text' | 'plain' | 'elevated'
    textClass?: string
    subtitleClass?: string
}

interface Props {
    statsData?: StatsItem[]
}

const props = withDefaults(defineProps<Props>(), {
    statsData: () => [
        {
            title: 'TOTAL',
            count: 42,
            subtitle: 'TOTAL_MEMBER_AUDIT',
            icon: 'ri-group-line',
            color: 'success',
            variant: 'tonal',
        },
        {
            title: 'LOGIN',
            count: 42,
            subtitle: 'ROLE_ADMIN',
            icon: 'ri-group-line',
            color: 'info',
            variant: 'tonal',
            textClass: 'font-bold',
            subtitleClass: 'opacity-80'
        },
        {
            title: 'TOTAL_MODERATOR',
            count: 42,
            subtitle: 'MODERATOR',
            icon: 'ri-group-line',
            color: 'error',
            variant: 'tonal',
        },
        {
            title: 'TOTAL_OPERATOR',
            count: 42,
            subtitle: 'OPERATOR',
            icon: 'ri-group-line',
            color: 'warning',
            variant: 'tonal',
        }
    ]
})

</script>

<style scoped></style>