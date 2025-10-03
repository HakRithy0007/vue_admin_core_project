<template>
    <div class="top-content-user grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="(item, index) in statsData" :key="index">
            <VCard class="position-relative w-full h-full">
                <VCardText class="p-4">
                    <div class="flex justify-between items-center">
                        <span class="text-[24px]">
                            {{ t(item.titleKey) }}
                        </span>
                    </div>
                    <div class="flex justify-between items-center">
                        <h4 class="text-[24px] text-primary" :class="item.textClass">
                            {{ item.count }}
                        </h4>
                        <VAvatar :color="item.color" :variant="item.variant" rounded size="50" class="elevation-2">
                            <VIcon size="24" :icon="item.icon" />
                        </VAvatar>
                    </div>
                    <h4 class="text-[16px]" :class="item.subtitleClass">
                        {{ t(item.subtitleKey) }}
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
    titleKey: string
    subtitleKey: string
    count: number | string
    icon: string
    color: string
    variant?: 'tonal' | 'outlined' | 'flat' | 'text' | 'plain' | 'elevated'
    textClass?: string
    subtitleClass?: string
}

interface Props {
    statsData?: StatsItem[]
}

// Default stats data with translation keys
const props = withDefaults(defineProps<Props>(), {
    statsData: () => [
        {
            titleKey: 'TOTAL',
            count: 42,
            subtitleKey: 'TOTAL_USER_AUDIT_LOG',
            icon: 'ri-group-line',
            color: 'success',
            variant: 'tonal',
            textClass: 'font-bold',
        },
        {
            titleKey: 'LOGIN',
            count: 42,
            subtitleKey: 'ROLE_ADMINISTRATOR',
            icon: 'ri-group-line',
            color: 'info',
            variant: 'tonal',
            textClass: 'font-bold',
            subtitleClass: 'opacity-80'
        },
        {
            titleKey: 'TOTAL_MODERATOR',
            count: 42,
            subtitleKey: 'MODERATOR',
            icon: 'ri-group-line',
            color: 'error',
            variant: 'tonal',
            textClass: 'font-bold',
        },
        {
            titleKey: 'TOTAL_OPERATOR',
            count: 42,
            subtitleKey: 'OPERATOR',
            icon: 'ri-group-line',
            color: 'warning',
            variant: 'tonal',
            textClass: 'font-bold',
        }
    ]
})
</script>

<style scoped></style>
