<template>
    <VCard>
        <VDataTable :headers="headers" :items="userData" item-value="id" :items-per-page="itemsPerPage"
            :items-per-page-text="t('ITEMS_PER_PAGE')" :items-per-page-all-text="t('ALL')"
            class="text-no-wrap custom-data-table user-table" @update:items-per-page="handleItemsPerPageChange"
            @update:page="handlePageChange" :items-length="totalItems" :page="currentPage" :loading="loading">

            <!-- Firstname -->
            <template #item.first_name="{ item }">{{ item.first_name }}</template>

            <!-- Lastname -->
            <template #item.last_name="{ item }">{{ item.last_name }}</template>

            <!-- Username -->
            <template #item.username="{ item }">{{ item.user_name }}</template>

            <!-- Email -->
            <template #item.email="{ item }">{{ item.email }}</template>

            <!-- Phone -->
            <template #item.phone="{ item }">{{ item.phone }}</template>

            <!-- Created date -->
            <template #item.created_at="{ item }">{{ formatDate(item.created_at) }}</template>

            <!-- Status -->
            <template #item.status_id="{ item }">
                <VChip :color="resolveUserStatusVariant(item.status_id)" size="small">
                    <span :class="isKhmer(getStatusText(item.status_id)) ? 'khmer' : ''">
                        {{ getStatusText(item.status_id) }}
                    </span>
                </VChip>
            </template>

            <!-- Role -->
            <template #item.user_role_name="{ item }">
                <div class="d-flex gap-2 align-center justify-center">
                    <VIcon :icon="resolveUserRoleVariant(item.user_role_name).icon"
                        :color="resolveUserRoleVariant(item.user_role_name).color" />
                    {{ item.user_role_name }}
                </div>
            </template>

            <!-- Creator -->
            <template #item.operator="{ item }">
                <VChip variant="tonal" size="small">
                    <span class="w-[70px]">
                        {{ item.operator }}
                    </span>
                </VChip>
            </template>

            <!-- Action -->
            <template #item.action="{ item }">
                <div class="d-flex gap-2 justify-center">
                    <v-tooltip :text="t('EDIT')">
                        <template #activator="{ props }">
                            <VBtn variant="tonal" v-bind="props" icon size="small" color="warning"
                                @click="openEditDialog(item)">
                                <Icon icon="mingcute:dot-grid-line" class="text-[20px]" />
                            </VBtn>
                        </template>
                    </v-tooltip>

                    <v-tooltip :text="t('VIEW')">
                        <template #activator="{ props }">
                            <VBtn v-bind="props" icon size="small" variant="tonal" color="info"
                                @click="openViewDialog(item)">
                                <Icon icon="flowbite:eye-outline" class="text-[20px]" />
                            </VBtn>
                        </template>
                    </v-tooltip>

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
        <EditUserDialog v-model="dialogVisible" :user="selectedUser" @close="closeEditDialog"
            @success="handleEditSuccess" />

        <!-- View Audit Dialog -->
        <v-dialog v-model="viewDialogVisible" max-width="600" opacity="0.7">
            <v-card>
                <v-card-title class="text-h6">
                    User Audit - {{ selectedUserForAudit?.user_name }}
                </v-card-title>
                <v-divider />
                <v-card-text>
                    <div class="space-y-2">
                        <p><b>First Name:</b> {{ selectedUserForAudit?.first_name }}</p>
                        <p><b>Last Name:</b> {{ selectedUserForAudit?.last_name }}</p>
                        <p><b>Email:</b> {{ selectedUserForAudit?.email }}</p>
                        <p><b>Phone:</b> {{ selectedUserForAudit?.phone }}</p>
                        <p><b>Status:</b> {{ selectedUserForAudit ? getStatusText(selectedUserForAudit.status_id) :
                            'N/A' }}</p>
                        <p><b>Role:</b> {{ selectedUserForAudit?.user_role_name }}</p>
                        <p><b>Creator:</b> {{ selectedUserForAudit?.operator }}</p>
                        <p><b>Created Date:</b> {{ selectedUserForAudit?.created_at ?
                            formatDate(selectedUserForAudit.created_at) : 'N/A' }}</p>
                    </div>
                </v-card-text>
                <v-divider />
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

                <v-card-actions class="pa-2 flex justify-center items-center gap-2">
                    <v-btn variant="outlined" color="error" class="!w-[80px] !border-2"
                        @click="deleteDialogVisible = false">
                        {{ t('CANCEL') }}
                    </v-btn>

                    <v-btn variant="outlined" color="info" class="!w-[80px] !border-2">
                        {{ t('DELETE') }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </VCard>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue"
import { Icon } from "@iconify/vue"
import EditUserDialog from "@/views/users/EditUser.vue"
import { useI18n } from 'vue-i18n'
import { fetchUsers } from "@/services/user"
import type { User } from "@/types/user_type"
import type { PagingOptions, FilterOptions, SortOptions } from "@/types/pagination_type"
import { formatDate } from "@/utils/formatting"

const { t } = useI18n()

// Props to receive stats update function and filters
interface Props {
    onStatsUpdate?: (stats: {
        totalUsers: number
        totalAdmin: number
        totalModerator: number
        totalOperator: number
    }) => void
    searchQuery?: string
    roleFilter?: string
}
const props = defineProps<Props>()

// State
const dialogVisible = ref(false)
const selectedUser = ref<User | null>(null)
const viewDialogVisible = ref(false)
const selectedUserForAudit = ref<User | null>(null)
const deleteDialogVisible = ref(false)
const userToDelete = ref<User | null>(null)
const currentPage = ref(1)
const itemsPerPage = ref(10)
const totalItems = ref(0)
const loading = ref(false)
const userData = ref<User[]>([])

const headers = computed(() => [
    { title: t("FIRST_NAME"), key: "first_name", align: "center" as const },
    { title: t("LAST_NAME"), key: "last_name", align: "center" as const },
    { title: t("USERNAME"), key: "username", align: "center" as const },
    { title: t("EMAIL"), key: "email", align: "center" as const },
    { title: t("PHONE"), key: "phone", align: "center" as const },
    { title: t("STATUS"), key: "status_id", align: "center" as const },
    { title: t("CREATED_DATE"), key: "created_at", align: "center" as const },
    { title: t("ROLE"), key: "user_role_name", align: "center" as const },
    { title: t("CREATOR"), key: "operator", align: "center" as const },
    { title: t("ACTION"), key: "action", align: "center" as const },
])

// Calculate role counts from ALL users (not just current page)
// This counts from the total dataset by fetching all users
const calculateRoleCounts = async () => {
    try {
        // Fetch all users to count roles accurately
        const params = {
            pagingOptions: { page: 1, per_page: 10000 } // Large number to get all users
        }
        const response = await fetchUsers(params)

        const roleCounts = {
            admin: 0,
            moderator: 0,
            operator: 0
        }

        response.data.forEach((user: User) => {
            // Count based on role_id
            // IMPORTANT: Adjust these IDs based on your backend role_id mapping
            if (user.role_id === 1) {
                roleCounts.admin++
            } else if (user.role_id === 2) {
                roleCounts.moderator++
            } else if (user.role_id === 3) {
                roleCounts.operator++
            }
        })

        return roleCounts
    } catch (err) {
        console.error("Failed to calculate role counts:", err)
        return { admin: 0, moderator: 0, operator: 0 }
    }
}

// Fetch users from API
const loadUsers = async () => {
    loading.value = true
    try {

        // Build params object - adjust based on your actual API structure
        const params: any = {
            pagingOptions: { page: currentPage.value, per_page: itemsPerPage.value },
        }

        // Add search parameter if exists
        if (props.searchQuery && props.searchQuery.trim() !== '') {

            // Option 1: If your API expects 'search' parameter
            params.search = props.searchQuery.trim()

            // OR Option 2: If your API expects it in filters array, uncomment below:
            // params.filters = params.filters || []
            // params.filters.push({
            //     field: 'user_name',
            //     operator: 'contains',
            //     value: props.searchQuery.trim()
            // })
        }

        // Add role filter if not 'all'
        if (props.roleFilter && props.roleFilter !== 'all') {
            const roleIdMap: Record<string, number> = {
                'admin': 1,
                'moderator': 2,
                'operator': 3
            }

            const roleId = roleIdMap[props.roleFilter]
            if (roleId) {
                params.filters = params.filters || []
                params.filters.push({
                    field: 'role_id',
                    operator: 'equals',
                    value: roleId
                })
            }
        }

        const response = await fetchUsers(params)
        userData.value = response.data
        totalItems.value = response.total
        const roleCounts = await calculateRoleCounts()

        // Send stats to parent component​
        props.onStatsUpdate?.({
            totalUsers: totalItems.value,
            totalAdmin: roleCounts.admin,
            totalModerator: roleCounts.moderator,
            totalOperator: roleCounts.operator
        })
    } catch (err) {
        console.error("Failed to fetch users:", err)
    } finally {
        loading.value = false
    }
}

// Pagination
const handlePageChange = (page: number) => {
    currentPage.value = page
    loadUsers()
}

const handleItemsPerPageChange = (perPage: number) => {
    itemsPerPage.value = perPage
    currentPage.value = 1
    loadUsers()
}

// Status mapping
function getStatusText(statusId: number): string {
    const statusMap: Record<number, string> = {
        1: 'Active',
        2: 'Inactive',
        3: 'Suspended',
        4: 'Deleted',
    }
    return statusMap[statusId] || 'Unknown'
}

// Status color variant
function resolveUserStatusVariant(statusId: number): string {
    const colorMap: Record<number, string> = {
        1: 'success',
        2: 'secondary',
        3: 'warning',
        4: 'error',
    }
    return colorMap[statusId] || 'default'
}

function isKhmer(text: string): boolean {
    return /[\u1780-\u17FF]/.test(text)
}

// User role variants
const resolveUserRoleVariant = (role: string) => {
    const r = role.toLowerCase()
    return r === "subscriber"
        ? { color: "success", icon: "ri-user-line" }
        : r === "author"
            ? { color: "error", icon: "ri-computer-line" }
            : r === "maintainer"
                ? { color: "info", icon: "ri-pie-chart-line" }
                : r === "editor"
                    ? { color: "warning", icon: "ri-edit-box-line" }
                    : r === "admin"
                        ? { color: "primary", icon: "ri-vip-crown-line" }
                        : { color: "success", icon: "ri-user-line" }
}

// Dialogs
const openEditDialog = (user: User) => {
    selectedUser.value = { ...user }
    dialogVisible.value = true
}

const closeEditDialog = () => {
    dialogVisible.value = false
    selectedUser.value = null
}

// Handle successful edit - refetch data
const handleEditSuccess = () => {
    loadUsers()
}

const openViewDialog = (user: User) => {
    selectedUserForAudit.value = { ...user }
    viewDialogVisible.value = true
}

const deleteUser = (user: User) => {
    userToDelete.value = user
    deleteDialogVisible.value = true
}

// Fetch users on mount
onMounted(() => loadUsers())

// Watch for search and role filter changes
watch(() => [props.searchQuery, props.roleFilter], () => {
    currentPage.value = 1 // Reset to first page on filter change
    loadUsers()
}, { deep: true })
</script>

<style scoped>
.custom-data-table :deep(.v-data-table__wrapper) {
    overflow-x: hidden;
}

.custom-data-table :deep(th) {
    text-align: center !important;
}

.custom-data-table :deep(.v-table__wrapper),
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

.user-table :deep(th) {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
}

.user-table :deep(th span) {
    font-size: 16px;
}
</style>