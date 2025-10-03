<template>

    <VRow class="match-height">

        <VCol cols="12">
            <TopContentUser />
        </VCol>


        <VCol cols="12">
            <CreateUser />
        </VCol>

        <VCol cols="12">
            <UserTable />
        </VCol>
    </VRow>
</template>

<script setup lang="ts">
import UserTable from '@/views/users/UserTable.vue'
import CreateUser from '@/views/users/CreateUser.vue'
import TopContentUser from '@/views/users/TopContentUser.vue'
</script>