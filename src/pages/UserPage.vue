<template>
    <VRow class="match-height">
        <VCol cols="12">
            <TopContentUser 
                :total-users="userStats.totalUsers"
                :total-admin="userStats.totalAdmin"
                :total-moderator="userStats.totalModerator"
                :total-operator="userStats.totalOperator"
            />
        </VCol>

        <VCol cols="12">
            <CreateUser 
                :on-search-change="handleSearchChange"
                :on-role-change="handleRoleChange"
            />
        </VCol>

        <VCol cols="12">
            <UserTable 
                :on-stats-update="handleStatsUpdate"
                :search-query="searchQuery"
                :role-filter="roleFilter"
            />
        </VCol>
    </VRow>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UserTable from '@/views/users/UserTable.vue'
import CreateUser from '@/views/users/CreateUser.vue'
import TopContentUser from '@/views/users/TopContentUser.vue'

// Store stats data
const userStats = ref({
    totalUsers: 0,
    totalAdmin: 0,
    totalModerator: 0,
    totalOperator: 0
})

// Search and filter states
const searchQuery = ref('')
const roleFilter = ref('all')

// Handler to receive stats from UserTable
const handleStatsUpdate = (stats: {
    totalUsers: number
    totalAdmin: number
    totalModerator: number
    totalOperator: number
}) => {
    userStats.value = stats
}

// Handler for search changes from CreateUser
const handleSearchChange = (search: string) => {
    searchQuery.value = search
}

// Handler for role filter changes from CreateUser
const handleRoleChange = (role: string) => {
    roleFilter.value = role
}
</script>