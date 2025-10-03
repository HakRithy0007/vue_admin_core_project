<template>
    <div class="top-content-user grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="(item, index) in statsData" :key="index">
            <VCard class="position-relative w-full h-full">
                <VCardText class="p-4">
                    <div class="flex justify-between items-center">
                        <span class="text-h4 poppins">
                            {{ item.title }}
                        </span>
                    </div>
                    <div class="flex justify-between items-center">
                        <h4 class="text-h3 text-primary poppins" :class="item.textClass">
                            {{ item.count }}
                        </h4>
                        <VAvatar :color="item.color" :variant="item.variant" rounded size="50" class="elevation-2">
                            <VIcon size="24" :icon="item.icon" />
                        </VAvatar>
                    </div>

                    <h4 class="text-h6 poppins" :class="item.subtitleClass">
                        {{ item.subtitle }}
                    </h4>
                </VCardText>
            </VCard>
        </div>
    </div>
</template>

<script setup lang="ts">
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

// Define props with default data
const props = withDefaults(defineProps<Props>(), {
    statsData: () => [
        {
            title: 'Total',
            count: 42,
            subtitle: 'Total Member Audit log',
            icon: 'ri-group-line',
            color: 'success',
            variant: 'tonal',
        },
        {
            title: 'Login',
            count: 42,
            subtitle: 'Role Administrator',
            icon: 'ri-group-line',
            color: 'info',
            variant: 'tonal',
            textClass: 'font-bold',
            subtitleClass: 'opacity-80'
        },
        {
            title: 'Total Moderator',
            count: 42,
            subtitle: 'Moderator',
            icon: 'ri-group-line',
            color: 'error',
            variant: 'tonal',
        },
        {
            title: 'Total Operator',
            count: 42,
            subtitle: 'Operator',
            icon: 'ri-group-line',
            color: 'warning',
            variant: 'tonal',
        }
    ]
})
</script>

<style scoped></style>