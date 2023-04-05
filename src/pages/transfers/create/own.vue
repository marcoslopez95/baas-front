
<script setup lang="ts">
import FormTransfers from '@/views/transfers/FormTransfers.vue.js'
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
        <VCardTitle>Crear transferencia propias</VCardTitle>
      </VCard>
      <VCard min-height="300px" class="pt-4">
        <VCardText class="pa-4">
         <FormTransfers @createBeneficiary="createBeneficiary"   :type="'own'"/>
        </VCardText>
        <VCardActions>
        </VCardActions>
      </VCard>
      <CreateBeneficiary v-if="dialogBeneficiary"   :type="'own'"/>
    </div>
  </template>