<script lang="ts" setup>
import TableFixedHeader from '@/views/deposit/dataTable.vue';
</script>

<template>
  <VRow>

    <VCol cols="12" class="text-end">
      <VBtn>Create</VBtn>
    </VCol>
    <!-- fixed header -->
    <VCol cols="12">
      <VCard title="Deposits">
        <TableFixedHeader />
      </VCard>
    </VCol>
  </VRow>
</template>
