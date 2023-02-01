<script lang="ts" setup>
import CreateModal from '@/views/deposit/CreateModal.vue';
import TableFixedHeader from '@/views/deposit/dataTable.vue';
</script>

<template>
  <VRow>

    <VCol cols="12" class="text-end">
      <CreateModal></CreateModal>
    </VCol>
    <!-- fixed header -->
    <VCol cols="12">
      <VCard title="Deposits">
        <TableFixedHeader />
      </VCard>
    </VCol>
  </VRow>
</template>
