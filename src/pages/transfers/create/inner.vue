
<script setup lang="ts">
import formTransfers from '@/views/transfers/FormTransfers.vue'
import CreateBeneficiary from '@/views/transfers/CreateBeneficiary.vue'
import { transfersStore } from '@/stores/TransfersStore';
const transfer = transfersStore()
const { dialogBeneficiary } = storeToRefs(transfer)


const createBeneficiary = () =>{
  dialogBeneficiary.value = true
}
</script>

<template>
    <div>
      <VCard class="mb-4">
        <VCardTitle>Crear transferencia interna</VCardTitle>
      </VCard>
      <VCard min-height="300px" class="pt-4">
        <VCardText class="pa-4">
         <formTransfers @createBeneficiary="createBeneficiary" />
        </VCardText>
        <VCardActions>
        </VCardActions>
      </VCard>
      <CreateBeneficiary v-if="createBeneficiary" />
    </div>
  </template>