<template>
    <div class="top-content-user grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="(item, index) in statsData" :key="index">
            <VCard class="position-relative w-full h-full">
                <VCardText class="p-4">
                    <div class="flex justify-between items-center">
                        <span class="text-[24px]">
                            {{ t(item.title) }}
                        </span>
                    </div>
                    <div class="flex justify-between items-center">
                        <h4 class="text-[24px] text-primary" :class="item.textClass">
                            {{ item.count }}
                        </h4>
                        <VAvatar :color="item.color" :variant="item.variant" rounded size="50" class="elevation-4">
                            <VIcon size="24" :icon="item.icon" />
                        </VAvatar>
                    </div>

                    <h4 class="text-[16px]" :class="item.subtitleClass">
                        {{ t(item.subtitle) }}
                    </h4>
                </VCardText>
            </VCard>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
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
    totalUsers?: number
    totalAdmin?: number
    totalModerator?: number
    totalOperator?: number
}

const props = withDefaults(defineProps<Props>(), {
    totalUsers: 0,
    totalAdmin: 0,
    totalModerator: 0,
    totalOperator: 0
})

// Computed property to generate stats data from props
const statsData = computed<StatsItem[]>(() => [
    {
        title: 'TOTAL_USER',
        count: props.totalUsers,
        subtitle: 'USER',
        icon: 'ri-group-line',
        color: 'success',
        textClass: 'font-bold',
        variant: 'tonal',
    },
    {
        title: 'TOTAL_ADMIN',
        count: props.totalAdmin,
        subtitle: 'ROLE_ADMINISTRATOR',
        icon: 'ri-shield-user-line',
        color: 'info',
        variant: 'tonal',
        textClass: 'font-bold',
        subtitleClass: 'opacity-80'
    },
    {
        title: 'TOTAL_MODERATOR',
        count: props.totalModerator,
        subtitle: 'MODERATOR',
        icon: 'ri-user-settings-line',
        color: 'error',
        textClass: 'font-bold',
        variant: 'tonal',
    },
    {
        title: 'TOTAL_OPERATOR',
        count: props.totalOperator,
        subtitle: 'OPERATOR',
        icon: 'ri-user-star-line',
        color: 'warning',
        textClass: 'font-bold',
        variant: 'tonal',
    }
])
</script>