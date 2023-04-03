
<script setup lang="ts">
import FormTransfersInnerOwn from '@/views/transfers/FormTransfersInnerOwn.vue'
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
        <VCardTitle>Crear transferencia otros</VCardTitle>
      </VCard>
      <VCard min-height="300px" class="pt-4">
        <VCardText class="pa-4">
         <FormTransfersInnerOwn :type="'outer'" @createBeneficiary="createBeneficiary" />
        </VCardText>
        <VCardActions>
        </VCardActions>
      </VCard>
      <CreateBeneficiary v-if="dialogBeneficiary" />
    </div>
  </template>