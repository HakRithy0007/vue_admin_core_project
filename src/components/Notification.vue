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
                        <h6 class="text-h6 text-info poppins text-high-emphasis">
                            Notifications
                        </h6>
                        <VChip v-if="unreadCount > 0" color="warning" size="small" class="notification-badge poppins">
                            {{ unreadCount }} new
                        </VChip>
                    </div>
                    <VBtn icon size="small" variant="text" color="white" @click="markAllAsRead">
                        <VIcon icon="ri-mail-open-line" size="20" class="text-high-emphasis"/>
                    </VBtn>
                </div>
            </VCardItem>

            <VDivider />

            <!-- Notification Items -->
            <VList class="notification-list">
                <template v-if="notifications.length > 0">
                    <VListItem v-for="(notification, index) in notifications" :key="notification.id"
                        class="notification-item" @click="markAsRead(notification.id)">
                        <template #prepend>
                            <VAvatar :color="notification.avatarColor" size="40" class="notification-avatar">
                                <span class="text-body-1">{{ notification.avatar }}</span>
                            </VAvatar>
                        </template>

                        <div class="notification-content poppins text-high-emphasis">
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
                        <div class="text-body-2 text-grey poppins">
                            <span class="text-lg">No notifications</span>
                        </div>
                    </div>
                </VListItem>
            </VList>

            <!-- Footer Button -->
            <VCardActions class="notification-footer" v-if="notifications.length > 0">
                <VBtn block color="warning" variant="flat" size="large"
                    class="text-none font-weight-medium poppins text-high-emphasis">
                    View All Notifications
                </VBtn>
            </VCardActions>
        </VCard>
    </VMenu>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { Icon } from "@iconify/vue"

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
    {
        id: 2,
        title: 'Cecilia Becker',
        message: 'Accepted your connection',
        time: '12h ago',
        read: false,
        avatar: 'CB',
        avatarColor: '#FFA726'
    },
    {
        id: 3,
        title: 'New message received 👋',
        message: 'You have 10 unread messages',
        time: '11 Aug',
        read: true,
        avatar: '💬',
        avatarColor: '#E3F2FD'
    },
    {
        id: 4,
        title: 'Monthly report generated',
        message: 'July month financial report is generated',
        time: 'Apr 24, 10:30 AM',
        read: false,
        avatar: '📊',
        avatarColor: '#1976D2'
    },
    {
        id: 5,
        title: 'Application has been approved 🎉',
        message: 'Your application has been approved',
        time: 'Apr 20, 09:15 AM',
        read: false,
        avatar: 'MG',
        avatarColor: '#4CAF50'
    },
    {
        id: 5,
        title: 'Application has been approved 🎉',
        message: 'Your application has been approved',
        time: 'Apr 20, 09:15 AM',
        read: false,
        avatar: 'MG',
        avatarColor: '#4CAF50'
    },
    {
        id: 5,
        title: 'Application has been approved 🎉',
        message: 'Your application has been approved',
        time: 'Apr 20, 09:15 AM',
        read: false,
        avatar: 'MG',
        avatarColor: '#4CAF50'
    },
    {
        id: 5,
        title: 'Application has been approved 🎉',
        message: 'Your application has been approved',
        time: 'Apr 20, 09:15 AM',
        read: false,
        avatar: 'MG',
        avatarColor: '#4CAF50'
    },
    {
        id: 5,
        title: 'Application has been approved 🎉',
        message: 'Your application has been approved',
        time: 'Apr 20, 09:15 AM',
        read: false,
        avatar: 'MG',
        avatarColor: '#4CAF50'
    },
    {
        id: 5,
        title: 'Application has been approved 🎉',
        message: 'Your application has been approved',
        time: 'Apr 20, 09:15 AM',
        read: false,
        avatar: 'MG',
        avatarColor: '#4CAF50'
    },
    {
        id: 5,
        title: 'Application has been approved 🎉',
        message: 'Your application has been approved',
        time: 'Apr 20, 09:15 AM',
        read: false,
        avatar: 'MG',
        avatarColor: '#4CAF50'
    },
    {
        id: 5,
        title: 'Application has been approved 🎉',
        message: 'Your application has been approved',
        time: 'Apr 20, 09:15 AM',
        read: false,
        avatar: 'MG',
        avatarColor: '#4CAF50'
    },
    {
        id: 5,
        title: 'Application has been approved 🎉',
        message: 'Your application has been approved',
        time: 'Apr 20, 09:15 AM',
        read: false,
        avatar: 'MG',
        avatarColor: '#4CAF50'
    },
    {
        id: 5,
        title: 'Application has been approved 🎉',
        message: 'Your application has been approved',
        time: 'Apr 20, 09:15 AM',
        read: false,
        avatar: 'MG',
        avatarColor: '#4CAF50'
    },
    {
        id: 5,
        title: 'Application has been approved 🎉',
        message: 'Your application has been approved',
        time: 'Apr 20, 09:15 AM',
        read: false,
        avatar: 'MG',
        avatarColor: '#4CAF50'
    },
    {
        id: 5,
        title: 'Application has been approved 🎉',
        message: 'Your application has been approved',
        time: 'Apr 20, 09:15 AM',
        read: false,
        avatar: 'MG',
        avatarColor: '#4CAF50'
    },
    {
        id: 5,
        title: 'Application has been approved 🎉',
        message: 'Your application has been approved',
        time: 'Apr 20, 09:15 AM',
        read: false,
        avatar: 'MG',
        avatarColor: '#4CAF50'
    },
    {
        id: 5,
        title: 'Application has been approved 🎉',
        message: 'Your application has been approved',
        time: 'Apr 20, 09:15 AM',
        read: false,
        avatar: 'MG',
        avatarColor: '#4CAF50'
    },
    {
        id: 5,
        title: 'Application has been approved 🎉',
        message: 'Your application has been approved',
        time: 'Apr 20, 09:15 AM',
        read: false,
        avatar: 'MG',
        avatarColor: '#4CAF50'
    },
    {
        id: 5,
        title: 'Application has been approved 🎉',
        message: 'Your application has been approved',
        time: 'Apr 20, 09:15 AM',
        read: false,
        avatar: 'MG',
        avatarColor: '#4CAF50'
    },
    {
        id: 5,
        title: 'Application has been approved 🎉',
        message: 'Your application has been approved',
        time: 'Apr 20, 09:15 AM',
        read: false,
        avatar: 'MG',
        avatarColor: '#4CAF50'
    },
    {
        id: 5,
        title: 'Application has been approved 🎉',
        message: 'Your application has been approved',
        time: 'Apr 20, 09:15 AM',
        read: false,
        avatar: 'MG',
        avatarColor: '#4CAF50'
    },
    {
        id: 5,
        title: 'Application has been approved 🎉',
        message: 'Your application has been approved',
        time: 'Apr 20, 09:15 AM',
        read: false,
        avatar: 'MG',
        avatarColor: '#4CAF50'
    },
    {
        id: 5,
        title: 'Application has been approved 🎉',
        message: 'Your application has been approved',
        time: 'Apr 20, 09:15 AM',
        read: false,
        avatar: 'MG',
        avatarColor: '#4CAF50'
    },
    {
        id: 5,
        title: 'Application has been approved 🎉',
        message: 'Your application has been approved',
        time: 'Apr 20, 09:15 AM',
        read: false,
        avatar: 'MG',
        avatarColor: '#4CAF50'
    },
    {
        id: 5,
        title: 'Application has been approved 🎉',
        message: 'Your application has been approved',
        time: 'Apr 20, 09:15 AM',
        read: false,
        avatar: 'MG',
        avatarColor: '#4CAF50'
    },
    {
        id: 5,
        title: 'Application has been approved 🎉',
        message: 'Your application has been approved',
        time: 'Apr 20, 09:15 AM',
        read: false,
        avatar: 'MG',
        avatarColor: '#4CAF50'
    },
    {
        id: 5,
        title: 'Application has been approved 🎉',
        message: 'Your application has been approved',
        time: 'Apr 20, 09:15 AM',
        read: false,
        avatar: 'MG',
        avatarColor: '#4CAF50'
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

<style lang="scss" scoped>
.notification-card {
    border-radius: 8px;
    overflow: hidden;
}

.notification-header {
    padding: 16px 20px;

    .text-h6 {
        font-size: 1.125rem !important;
        font-weight: 500;
    }
}

.notification-badge {
    background-color: rgb(254, 156, 9) !important;
    color: rgb(255, 255, 255) !important;
    text-transform: lowercase;
}

.notification-list {
    max-height: 420px;
    overflow-y: auto;
    padding: 0 !important;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 3px;

        &:hover {
            background: rgba(255, 255, 255, 0.3);
        }
    }
}

.notification-item {
    padding: 16px 20px !important;
    min-height: auto !important;
    position: relative;
    flex-wrap: wrap;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: rgba(255, 255, 255, 0.05) !important;

        .clear-btn {
            opacity: 1;
            visibility: visible;
        }
    }
}

.notification-avatar {
    flex-shrink: 0;
    margin-right: 12px;
}

.notification-content {
    flex: 1;
    min-width: 0;
}

.notification-title {
    font-size: 0.9375rem !important;
    font-weight: 500 !important;
    line-height: 1.4 !important;
    margin-bottom: 4px !important;
    opacity: 1 !important;
}

.notification-message {
    font-size: 0.8125rem !important;
    line-height: 1.4 !important;
    margin-bottom: 4px !important;
    opacity: 1 !important;
}

.notification-time {
    font-size: 0.75rem !important;
    opacity: 1 !important;
}

.notification-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: 12px;
}

.clear-btn {
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease;
    color: rgba(255, 255, 255, 0.6) !important;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1) !important;
        color: rgba(255, 255, 255, 0.9) !important;
        transform: scale(1.1);
    }

    &:active {
        transform: scale(0.95);
    }

    :deep(.v-btn__content) {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.notification-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 10px;
}

.notification-divider {
    position: absolute;
    bottom: 0;
    left: 72px;
    right: 20px;
    width: auto;
    border-color: rgba(255, 255, 255, 0.1) !important;
}

.notification-footer {
    padding: 16px 20px;

    :deep(.v-btn) {
        background-color: rgb(255, 180, 0) !important;
        text-transform: none;
        letter-spacing: normal;
        box-shadow: none;

        &:hover {
            background-color: rgb(255, 193, 51) !important;
        }
    }
}
</style>