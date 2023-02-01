<template>
  <VBtn @click="r_redirect">Create</VBtn>
</template>

<script setup lang="ts">
import { depositStore } from '@/stores/depositStore';
import { useRouter } from 'vue-router';

const deposit = depositStore()
const {steps,form} = storeToRefs(deposit)
const router = useRouter();
const r_redirect = () => {
  steps.value = 1
       form.value = {
        business_bank_account_id: 0,
        payment_method_id: 0,
        account_id: '',
        amount: '',
        comments: '',
       }
  router.push('/deposits/createStore');
}
</script>

