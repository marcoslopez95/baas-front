<script lang="ts" setup>
import { authStore } from '@/stores/AuthStore';

const store = authStore()
const emit = defineEmits(['stepValue'])

const backStep = async () => {
  emit('stepValue', 2)
}
</script>

<template>
  <VCard>
    <VCardText>
     <pre> {{ store.errorsKyc }}</pre>
    </VCardText>
    <VCardActions class="justify-end"
      ><VBtn
        min-width="150px"
        @click="backStep"
        variant="tonal"
        >Back</VBtn
      ></VCardActions
    >
  </VCard>
</template>
