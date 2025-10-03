<template>

  <VRow class="match-height">

    <VCol cols="12">
      <TopContentUserAudit />
    </VCol>

    <VCol cols="12">
      <DateContent />
    </VCol>

    <VCol cols="12">
      <UserAuditTable />
    </VCol>

  </VRow>
</template>

<script setup lang="ts">
import TopContentUserAudit from '@/views/users-audit/TopContentUserAudit.vue';
import DateContent from '@/components/DateContent.vue';
import UserAuditTable from '@/views/users-audit/UserAuditTable.vue';
</script>