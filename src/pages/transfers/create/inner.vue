
<script setup lang="ts">
import formTransfers from '@/views/transfers/FormTransfers/vue'
</script>

<template>
    <div>
      <VCard class="mb-4">
        <VCardTitle>Crear transferencia interna</VCardTitle>
      </VCard>
      <VCard min-height="300px" class="pt-4">
        <VCardText class="pa-4">
         <formTransfers />
        </VCardText>
        <VCardActions>
        </VCardActions>
      </VCard>
    </div>
  </template>