<template>

  <VRow class="match-height">

    <VCol cols="12">
      <TopContentMemberAudit />
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
import DateContent from '@/components/DateContent.vue';
import UserAuditTable from '@/views/users-audit/UserAuditTable.vue';
import TopContentMemberAudit from '@/views/member-audit/TopContentMemberAudit.vue';
</script>