<template>

  <VRow class="match-height">

    <VCol cols="12">
      <TopContentMember />
    </VCol>

    <VCol cols="12">
      <MemberTable />
    </VCol>
  </VRow>
</template>

<script setup lang="ts">
import MemberTable from '@/views/member/MemberTable.vue';
import TopContentMember from '@/views/member/TopContentMember.vue';
</script>