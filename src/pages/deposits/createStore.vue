<template>
  <SelectPaymentMethod v-if="deposit.steps === 1"></SelectPaymentMethod>
  <SecondStep v-if="deposit.steps === 2"></SecondStep>
  <ThreeStep v-if="deposit.steps === 3"></ThreeStep>
</template>

<script setup lang="ts">
import { helperStore } from '@/helper';
import { depositStore } from '@/stores/depositStore';
import SelectPaymentMethod from '@/views/deposit/Create/FirstStep.vue';
import SecondStep from '@/views/deposit/Create/SecondStep.vue';
import ThreeStep from '@/views/deposit/Create/ThreeStep.vue';

const deposit = depositStore()
const helper =  helperStore()
const dialog = ref(false)

 
</script>

