<template>
  <VForm @submit.prevent="() => { }">
    <VRow class="mx-4 " style="gap: 80px;">
      <VCol cols="12">
        <VRow>
          <VCol cols="12" md="9">
            <VRow class="d-flex gap-4">
              <VBtn min-width="200px" :class="form.payment_method_id == item.id ? 'text-white' : ''"
                :variant="form.payment_method_id == item.id ? 'flat' : 'tonal'" v-for="item in deposit.payment_methods"
                @click="selectPaymentMethod(item)" :color="form.payment_method_id == item.id ? '#774488' : '#D684F1'">
                {{ item.name }}
              </VBtn>
            </VRow>
          </VCol>
        </VRow>
      </VCol>
      <!-- 👉 submit and reset button -->
      <VCol cols="12" md="9" class="d-flex mt-16 justify-center">
        <VBtn min-width="150px" type="button" :disabled="!form.payment_method_id" @click="goSecondStep">
          Next
        </VBtn>

      </VCol>
    </VRow>
  </VForm>
</template>
 
<script setup lang="ts">
import { depositStore } from '@/stores/depositStore';

const deposit = depositStore()
const { form, steps } = storeToRefs(deposit)
deposit.getBussinessBank()

const selectPaymentMethod = (element: any) => {
  form.value.payment_method_id = element.id
}

const goSecondStep = () => {
  steps.value++
}
</script>
 
 