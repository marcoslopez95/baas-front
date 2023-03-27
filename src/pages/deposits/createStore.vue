<template>
  <div>
    <VCard class="mb-4">
      <VCardTitle>Crear deposito</VCardTitle>
    </VCard>
    <VCard min-height="300px" class="pt-4">
      <VCardText class="pa-4">
        <SelectPaymentMethod v-if="deposit.steps === 1"></SelectPaymentMethod>
        <SecondStep v-if="deposit.steps === 2"></SecondStep>
        <!-- <ThreeStep v-if="deposit.steps === 3"></ThreeStep> -->
      </VCardText>
      <VCardActions>
      </VCardActions>
    </VCard>
  </div>
</template>

<script setup lang="ts">
import { helperStore } from '@/helper';
import { depositStore } from '@/stores/depositStore';
import SelectPaymentMethod from '@/views/deposit/Create/FirstStep.vue';
import SecondStep from '@/views/deposit/Create/SecondStep.vue';
// import ThreeStep from '@/views/deposit/Create/ThreeStep.vue';

const deposit = depositStore()
const helper = helperStore()
const dialog = ref(false)
const goSecondStep = () => {
  deposit.steps.value++
}
const titleCard = computed(() => {
  let title = ''

  switch (deposit.steps) {
    case 1:
      title = 'Select payment method'
      break;
    case 2:
      title = 'Select Bussiness bank'
      break;
    // case 3:
    //   title = 'Select Bussiness bank'
    //   break;

    default:
      break;
  }

  return title
})
</script>

