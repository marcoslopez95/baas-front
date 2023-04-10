<script lang="ts" setup>
import CreateModal from '@/views/deposit/CreateModal.vue';
import TableFixedHeader from '@/views/deposit/dataTable.vue';
import { depositStore } from '@/stores/depositStore';

const deposit = depositStore()

</script>

<template>
  <VRow>

    <VCol cols="12" class="text-end">
      <CreateModal></CreateModal>
    </VCol>
    <!-- fixed header -->
    <VCol cols="12">
      <VCard title="Deposits" :loading="deposit.loadingList">
        <VCardText>
        <TableFixedHeader />
     
      </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
