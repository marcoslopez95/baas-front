<template>
  <VForm @submit.prevent="() => {}">
     <VRow>
       <VCol cols="12">
         <VRow no-gutters>
           <!-- 👉 First Name -->
           <VCol
             cols="12"
             md="3"
           >
             <label for="firstName">Payment Method</label>
           </VCol>
 
           <VCol
             cols="12"
             md="9"
            
           >
           <VRow
           class="d-flex gap-4"
           >
           <VBtn 
             class="text-white" 
             v-for="item in deposit.payment_methods"
             @click="selectPaymentMethod(item)"
             :color="form.payment_method_id == item.id ? '#774488' : '#D684F1' "
             >
             {{ item.name }}
           </VBtn>
           
         </VRow>
           </VCol>
         </VRow>
       </VCol>
       <!-- 👉 submit and reset button -->
       <VCol
         offset-md="3"
         cols="12"
         md="9"
         class="d-flex mt-5"
       >
         <VBtn 
           type="button" :disabled="!form.payment_method_id"
            @click="goSecondStep"
           >
           Next
         </VBtn>
 
       </VCol>
     </VRow>
   </VForm>
 </template>
 
 <script setup lang="ts">
 import { depositStore } from '@/stores/depositStore';
 
 const deposit = depositStore()
 const {form,steps} = storeToRefs(deposit)
 deposit.getBussinessBank()
 
 const selectPaymentMethod = (element: any) => {
   form.value.payment_method_id = element.id
 }

 const goSecondStep = () => {
  steps.value ++
 }
 </script>
 
 