
<script setup lang="ts">
import FormTransferCrypto from '@/views/transfers/FormTransferCrypto.vue'
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
        <VCardTitle>Crear transferencia crypto</VCardTitle>
      </VCard>
      <VCard min-height="300px" class="pt-4">
        <VCardText class="pa-4">
         <FormTransferCrypto @createBeneficiary="createBeneficiary" />
        </VCardText>
        <VCardActions>
        </VCardActions>
      </VCard>
      <CreateBeneficiary v-if="createBeneficiary" />
    </div>
  </template>