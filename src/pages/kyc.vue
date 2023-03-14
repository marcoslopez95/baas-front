<script lang="ts" setup>
import Step1 from '@/views/profile/kyc/Step1.vue';
import Step2 from '@/views/profile/kyc/Step2.vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const valueStep = ref(1)
const componentStep = computed(() => {
  let comp = Step1
  switch (valueStep.value) {
    case 1:
      comp = Step1
      break
    case 2:
      console.log('2')
      comp = Step2
      break
    default:
      break
  }
  return comp
})
</script>

<template>
  <div>
    <Component
      :is="componentStep"
      @stepValue="valueStep = $event"
    />
  </div>
</template>
