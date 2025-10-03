<template>

  <VRow class="match-height">

    <VCol cols="12">
      <TopContentMember />
    </VCol>

    <VCol cols="12">
      <UserTable />
    </VCol>
  </VRow>
</template>

<script setup lang="ts">
import UserTable from '@/views/users/UserTable.vue'
import TopContentMember from '@/views/member/TopContentMember.vue';
</script>