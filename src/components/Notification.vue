<template>
    <VMenu location="bottom end" offset="10px">
        <template #activator="{ props }">
            <VBadge :content="unreadCount" :model-value="unreadCount > 0" color="error" offset-x="1" offset-y="1">
                <VIcon icon="ri-notification-line" v-bind="props" />
            </VBadge>
        </template>

        <VCard class="notification-card" max-width="380px" min-width="360px">
            <!-- Header -->
            <VCardItem class="notification-header">
                <div class="d-flex justify-space-between align-center w-100">
                    <div class="d-flex align-center gap-2">
                        <h6 class="text-h6 text-info text-high-emphasis"
                            :class="isKhmer(t('NOTIFICATIONS')) ? 'khmer' : 'poppins'">
                            {{ t('NOTIFICATIONS') }}
                        </h6>
                        <VChip v-if="unreadCount > 0" color="warning" size="small" class="notification-badge"
                            :class="isKhmer(t('NEW')) ? 'khmer' : 'poppins'">
                            {{ unreadCount }} {{ t('NEW') }}
                        </VChip>
                    </div>
                    <VBtn icon size="small" variant="text" color="white" @click="markAllAsRead">
                        <VIcon icon="ri-mail-open-line" size="20" class="text-high-emphasis" />
                    </VBtn>
                </div>
            </VCardItem>

            <VDivider />

            <!-- Notification Items -->
            <VList class="notification-list pa-4">
                <template v-if="notifications.length > 0">
                    <VListItem v-for="(notification, index) in notifications" :key="notification.id"
                        class="notification-item" @click="markAsRead(notification.id)">
                        <template #prepend>
                            <VAvatar :color="notification.avatarColor" size="40" class="notification-avatar">
                                <span class="text-body-1">{{ notification.avatar }}</span>
                            </VAvatar>
                        </template>

                        <div class="notification-content text-high-emphasis"
                            :class="isKhmer(notification.title) ? 'khmer' : 'poppins'">
                            <VListItemTitle class="notification-title">
                                {{ notification.title }}
                            </VListItemTitle>
                            <VListItemSubtitle class="notification-message">
                                {{ notification.message }}
                            </VListItemSubtitle>
                            <VListItemSubtitle class="notification-time">
                                {{ notification.time }}
                            </VListItemSubtitle>
                        </div>

                        <template #append>
                            <div class="notification-actions">
                                <VBtn icon size="small" variant="text" class="clear-btn"
                                    @click.stop="removeNotification(notification.id)">
                                    <Icon icon="ic:round-clear" class="text-[20px] text-high-emphasis" />
                                </VBtn>
                                <div class="notification-indicator">
                                    <VIcon v-if="!notification.read" icon="ri-checkbox-blank-circle-fill"
                                        color="warning" size="10" />
                                </div>
                            </div>
                        </template>

                        <VDivider v-if="index < notifications.length - 1" class="notification-divider" />
                    </VListItem>
                </template>

                <!-- Empty State -->
                <VListItem v-else class="notification-item">
                    <div class="text-center py-8">
                        <VIcon icon="ri-notification-off-line" size="48" color="grey" class="mb-2" />
                        <div class="text-body-2 text-grey"
                            :class="isKhmer(t('NO_NOTIFICATIONS')) ? 'khmer' : 'poppins'">
                            <span class="text-lg">{{ t('NO_NOTIFICATIONS') }}</span>
                        </div>
                    </div>
                </VListItem>
            </VList>

            <!-- Footer Button -->
            <VCardActions class="notification-footer pa-4" v-if="notifications.length > 0">
                <VBtn block color="warning" variant="flat" size="large"
                    class="text-none font-weight-medium text-high-emphasis"
                    :class="isKhmer(t('VIEW_ALL_NOTIFICATIONS')) ? 'khmer' : 'poppins'">
                    {{ t('VIEW_ALL_NOTIFICATIONS') }}
                </VBtn>
            </VCardActions>
        </VCard>
    </VMenu>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { Icon } from "@iconify/vue"
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const isKhmer = (text: string) => {
    return /[\u1780-\u17FF]/.test(text)
}

const notifications = ref([
    {
        id: 1,
        title: 'Congratulation Flora! 🎉',
        message: 'Won the monthly best seller badge',
        time: 'Today',
        read: false,
        avatar: '👤',
        avatarColor: '#E3F2FD'
    },
])

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

const markAsRead = (id: number) => {
    const notification = notifications.value.find(n => n.id === id)
    if (notification) {
        notification.read = true
    }
}

const removeNotification = (id: number) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index !== -1) {
        notifications.value.splice(index, 1)
    }
}

const markAllAsRead = () => {
    notifications.value.forEach(n => n.read = true)
}
</script>

<style scoped>
.khmer {
    font-family: 'Kantumruy Pro', serif !important;
}

.poppins {
    font-family: 'Poppins', sans-serif !important;
}
</style>