<template>
  <VBtn @click="account.openModal = true">Create</VBtn>

  <VDialog
    v-model="account.openModal"
    max-width="400px"
  >
    <VCard>
      <VCardTitle>
        Create Account
      </VCardTitle>

      <VCardText>
        <VSelect
          v-model="currency_id"
         :items="account.currencies"
         item-title="name"
         item-value="id"
         label="Currency"
        >
        </VSelect>

        <!-- <VCardActions> -->
        <VRow class="mt-4">
        <VCol></VCol>
        <VCol><VBtn @click="account.createAccount(currency_id)">Store</VBtn></VCol>
        <VCol></VCol>
        </VRow>
          
        <!-- </VCardActions> -->
      </VCardText>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import { accountUserStore } from '@/stores/AccountUserStore';
const account = accountUserStore()
account.getCurrencies()

const currency_id = ref<number>()
</script>


<VCol></VCol>
