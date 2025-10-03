<template>

  <VRow class="match-height">

    <VCol cols="12">
      <TopContentMemberAudit />
    </VCol>

    <VCol cols="12">
      <DateContent />
    </VCol>

    <VCol cols="12">
      <MemberAuditTable />
    </VCol>

  </VRow>
</template>

<script setup lang="ts">
import DateContent from '@/components/DateContent.vue';
import TopContentMemberAudit from '@/views/member-audit/TopContentMemberAudit.vue';
import MemberAuditTable from '@/views/member-audit/MemberAuditTable.vue';
</script>