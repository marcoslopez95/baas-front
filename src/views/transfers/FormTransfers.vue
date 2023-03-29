
<script setup lang="ts">
import { trasnfersStore } from '@/stores/TransferStore';
import { requiredAmount,required, amountFormat } from '@/validator';
const validator = { required,requiredAmount  }

const transfer = trasnfersStore()

const {formInner} = storeToRefs(transfer)
const moneyInput = (event: string) => {
  formInner.value.amount = amountFormat(event);
}
const accountsDetination = ref([])
const accountsOrigin = ref([])
</script>

<template>
    <VRow>
      <VCol cols="12" md="6" >
        <VCol cols="12" md="9" class="mx-auto">
            <v-select v-model="formInner.destination_account_id" :rules="[validator.required]" :items="accountsDetination" item-title="bank"
              item-value="id" label="Account destino"></v-select>

          </VCol>
          <VCol cols="12" md="9" class="mx-auto">
            <v-select v-model="formInner.origin_account_id" :rules="[validator.required]" :items="accountsOrigin" item-title="bank"
              item-value="id" label="Account origin"></v-select>

          </VCol>
          <VCol cols="12" md="9" class="mx-auto">
            <VTextField v-model="formInner.amount" @keyup="moneyInput($event)"  :rules="[validator.requiredAmount]"
              onkeypress="return (event.charCode >= 48 && event.charCode <= 57)" type="text" label="Amount" />

          </VCol>
          <VCol cols="12" md="9" class="mx-auto">
            <VTextarea v-model="formInner.comments" label="Comments (optional)" />
          </VCol>
      </VCol>
    </VRow>
  </template>