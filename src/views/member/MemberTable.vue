<template>
    <VCard>
        <VProgressLinear indeterminate color="primary" />
        <VDataTable :headers="headers" :items="paginatedData" item-value="id" :items-per-page-text="t('ITEMS_PER_PAGE')"
            class="text-no-wrap custom-data-table member-table">

            <!-- Avatar -->
            <template #item.avatar="{ item }">
                <VAvatar size="34" :variant="!item.avatar ? 'tonal' : undefined"
                    :color="!item.avatar ? resolveUserRoleVariant(item.role).color : undefined">
                    <VImg v-if="item.avatar" :src="item.avatar" />
                </VAvatar>
            </template>

            <!-- Username -->
            <template #item.username="{ item }">@{{ item.username }}</template>

            <!-- Status -->
            <template #item.status="{ item }">
                <VChip :color="resolveUserStatusVariant(item.status)" size="small">
                    <span :class="isKhmer(item.status) ? 'khmer' : ''">
                        {{ item.status }}
                    </span>
                </VChip>
            </template>

            <!-- Role -->
            <template #item.role="{ item }">
                <div class="d-flex gap-2 align-center justify-center">
                    <VIcon :icon="resolveUserRoleVariant(item.role).icon"
                        :color="resolveUserRoleVariant(item.role).color" />
                    {{ item.role }}
                </div>
            </template>

            <!-- Creator -->
            <template #item.creator="{ item }">
                <VChip variant="tonal" size="small">
                    <span class="w-[70px]">
                        {{ item.creator }}
                    </span>
                </VChip>
            </template>

            <!-- Action -->
            <template #item.action="{ item }">
                <div class="d-flex gap-2 justify-center">
                    <!-- Edit Button -->
                    <v-tooltip :text="t('EDIT')">
                        <template #activator="{ props }">
                            <VBtn variant="tonal" v-bind="props" icon size="small" color="warning"
                                @click="openEditDialog(item)">
                                <Icon icon="mingcute:dot-grid-line" class="text-[20px]" />
                            </VBtn>
                        </template>
                    </v-tooltip>

                    <!-- View Detail -->
                    <v-tooltip :text="t('VIEW')">
                        <template #activator="{ props }">
                            <VBtn v-bind="props" icon size="small" variant="tonal" color="info"
                                @click="openViewDialog(item)">
                                <Icon icon="flowbite:eye-outline" class="text-[20px]" />
                            </VBtn>
                        </template>
                    </v-tooltip>

                    <!-- Delete Button -->
                    <v-tooltip :text="t('DELETE')">
                        <template #activator="{ props }">
                            <VBtn v-bind="props" icon size="small" variant="tonal" color="error"
                                @click="deleteUser(item)">
                                <Icon icon="ion:trash-outline" class="text-[20px]" />
                            </VBtn>
                        </template>
                    </v-tooltip>
                </div>
            </template>
        </VDataTable>

        <!-- Edit Dialog -->
        <EditUserDialog v-model="dialogVisible" :user="selectedUser" @update="handleUserUpdate"
            @close="closeEditDialog" />

        <!-- View Audit Dialog -->
        <v-dialog v-model="viewDialogVisible" max-width="600" opacity="0.7">
            <v-card>
                <v-card-title class="text-h6">
                    {{ t('USER_AUDIT') }} - {{ selectedUserForAudit?.username }}
                </v-card-title>
                <v-divider />
                <v-card-text>
                    <div class="space-y-2">
                        <p><b>{{ t('FIRST_NAME') }}:</b> {{ selectedUserForAudit?.firstname }}</p>
                        <p><b>{{ t('LAST_NAME') }}:</b> {{ selectedUserForAudit?.lastname }}</p>
                        <p><b>{{ t('STATUS') }}:</b> {{ selectedUserForAudit?.status }}</p>
                        <p><b>{{ t('ROLE') }}:</b> {{ selectedUserForAudit?.role }}</p>
                        <p><b>{{ t('CREATOR') }}:</b> {{ selectedUserForAudit?.creator }}</p>
                        <p>
                            <b>{{ t('CREATED_DATE') }}:</b>
                            {{ new Date(selectedUserForAudit?.createdDate).toLocaleDateString() }}
                        </p>
                    </div>
                </v-card-text>
                <v-divider />
                <v-card-actions class="justify-end">
                    <v-btn color="primary" variant="outlined" @click="closeViewDialog">
                        {{ t('CLOSE') }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Delete Confirm Dialog -->
        <v-dialog v-model="deleteDialogVisible" max-width="400" opacity="0.7">
            <v-card>
                <v-card-title class="text-[16px] py-2">
                    <span class="flex justify-center items-center">
                        {{ t('CONFIRM_DELETE') }}
                    </span>
                </v-card-title>

                <VDivider />

                <v-card-text>
                    <span class="flex justify-center items-center pt-4 gap-2">
                        <span>{{ t('ARE_YOU_SURE_YOU_WANT_TO_DELETE') }}</span>
                    </span>
                </v-card-text>

                <VDivider />

                <v-card-actions class="pa-2 flex justify-center items-center">
                    <v-btn variant="outlined" color="error" class="!w-[80px] !border-2" :text="t('CANCEL')"
                        @click="deleteDialogVisible = false" />
                    <v-btn variant="outlined" color="info" class="!w-[80px] !border-2" :text="t('DELETE')"
                        @click="confirmDelete" />
                </v-card-actions>
            </v-card>
        </v-dialog>
    </VCard>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { Icon } from "@iconify/vue"
import EditUserDialog from "@/views/users/EditUser.vue"
import avatar1 from "@images/avatars/avatar-1.png"
import avatar2 from "@images/avatars/avatar-2.png"
import avatar3 from "@images/avatars/avatar-3.png"
import avatar4 from "@images/avatars/avatar-4.png"
import avatar5 from "@images/avatars/avatar-5.png"
import avatar6 from "@images/avatars/avatar-6.png"
import avatar7 from "@images/avatars/avatar-7.png"
import avatar8 from "@images/avatars/avatar-8.png"
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const page = ref(1)
const UserPerPage = ref(100)
const dialogVisible = ref(false)
const selectedUser = ref(null)
const viewDialogVisible = ref(false)
const selectedUserForAudit = ref<any>(null)
const deleteDialogVisible = ref(false)
const userToDelete = ref<any>(null)

const isKhmer = (text: string) => {
    return /[\u1780-\u17FF]/.test(text)
}

const headers = computed(() => [
    { title: t("AVATAR"), key: "avatar", align: "center" as const },
    { title: t("USERNAME"), key: "username", align: "center" as const },
    { title: t("STATUS"), key: "status", align: "center" as const },
    { title: t("ROLE"), key: "role", align: "center" as const },
    { title: t("CREATOR"), key: "creator", align: "center" as const },
    { title: t("ACTION"), key: "action", align: "center" as const },
])

const userData = ref([
    {
        id: 1,
        username: "galasasen.slixby",
        email: "galasasen@example.com",
        membername: "galasasen.slixby",
        phone: "0123456789",
        status: "inactive",
        role: "Player",
        creator: "Admin",
        avatar: avatar1,
    },
    {
        id: 2,
        username: "halsey.redmore",
        email: "halsey@example.com",
        membername: "halsey.redmore",
        phone: "0123456789",
        status: "pending",
        role: "Player",
        creator: "Manager",
        avatar: avatar2,
    },
    {
        id: 3,
        username: "marjory.sicely",
        email: "marjory@example.com",
        membername: "marjory.sicely",
        phone: "0123456789",
        status: "active",
        role: "Player",
        creator: "Admin",
        avatar: avatar3,
    },
    {
        id: 4,
        username: "cyrill.risby",
        email: "cyrill@example.com",
        membername: "cyrill.risby",
        phone: "0123456789",
        status: "inactive",
        role: "Player",
        creator: "Supervisor",
        avatar: avatar4,
    },
    {
        id: 5,
        username: "maggy.hurran",
        email: "maggy@example.com",
        membername: "maggy.hurran",
        phone: "0123456789",
        status: "pending",
        role: "Player",
        creator: "Admin",
        avatar: avatar5,
    },
    {
        id: 6,
        username: "silvain.halstead",
        email: "silvain@example.com",
        membername: "silvain.halstead",
        phone: "0123456789",
        status: "active",
        role: "Player",
        creator: "Manager",
        avatar: avatar6,
    },
    {
        id: 7,
        username: "breena.gallemore",
        email: "breena@example.com",
        membername: "breena.gallemore",
        phone: "0123456789",
        status: "pending",
        role: "Player",
        creator: "Supervisor",
        avatar: avatar7,
    },
    {
        id: 8,
        username: "kathryne.liger",
        email: "kathryne@example.com",
        membername: "kathryne.liger",
        phone: "0123456789",
        status: "pending",
        role: "Player",
        creator: "Admin",
        avatar: avatar8,
    },
])

const paginatedData = computed(() => {
    const start = (page.value - 1) * UserPerPage.value
    const end = start + UserPerPage.value
    return userData.value.slice(start, end)
})

const resolveUserRoleVariant = (role: string) => {
    const roleLower = role.toLowerCase()
    if (roleLower === "subscriber") return { color: "success", icon: "ri-user-line" }
    if (roleLower === "author") return { color: "error", icon: "ri-computer-line" }
    if (roleLower === "maintainer") return { color: "info", icon: "ri-pie-chart-line" }
    if (roleLower === "editor") return { color: "warning", icon: "ri-edit-box-line" }
    if (roleLower === "admin") return { color: "primary", icon: "ri-vip-crown-line" }
    return { color: "success", icon: "ri-user-line" }
}

const resolveUserStatusVariant = (status: string) => {
    const s = status.toLowerCase()
    if (s === "pending") return "warning"
    if (s === "active") return "success"
    if (s === "inactive") return "secondary"
    return "primary"
}

const openEditDialog = (user: any) => {
    selectedUser.value = { ...user }
    dialogVisible.value = true
}

const closeEditDialog = () => {
    dialogVisible.value = false
    selectedUser.value = null
}

const handleUserUpdate = (updatedUser: any) => {
    const index = userData.value.findIndex((u) => u.id === updatedUser.id)
    if (index !== -1) {
        Object.assign(userData.value[index], updatedUser)
    }
    closeEditDialog()
}

const openViewDialog = (user: any) => {
    selectedUserForAudit.value = { ...user }
    viewDialogVisible.value = true
}

const closeViewDialog = () => {
    viewDialogVisible.value = false
    selectedUserForAudit.value = null
}

const deleteUser = (user: any) => {
    userToDelete.value = user
    deleteDialogVisible.value = true
}

const confirmDelete = () => {
    if (userToDelete.value) {
        userData.value = userData.value.filter((u) => u.id !== userToDelete.value.id)
    }
    deleteDialogVisible.value = false
    userToDelete.value = null
}
</script>

<style scoped>
.custom-data-table :deep(.v-data-table__wrapper) {
    overflow-x: hidden;
}

.custom-data-table :deep(th) {
    text-align: center !important;
}

.custom-data-table :deep(.v-data-table__wrapper),
.custom-data-table :deep(.v-table__wrapper) {
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    cursor: pointer;
}

.custom-data-table :deep(tbody tr:hover) {
    background-color: rgba(var(--v-theme-primary), 0.08) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.custom-data-table :deep(tbody tr:hover td) {
    color: rgb(var(--v-theme-primary));
}

.custom-data-table :deep(th) {
    font-family: 'Kantumruy Pro', serif !important;
}

.custom-data-table :deep(td) {
    font-family: 'Poppins', sans-serif !important;
}

.custom-data-table :deep(td.khmer) {
    font-family: 'Kantumruy Pro', serif !important;
}

.member-table :deep(th) {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
}

.member-table :deep(th span) {
    font-size: 16px;
}
</style>