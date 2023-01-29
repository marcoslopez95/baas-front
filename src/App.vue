<script setup lang="ts">
import { authStore } from './stores/AuthStore';


const auth = authStore()

if(auth.user.name == ''){
  auth.setUser()
}
</script>

<template>
  <VApp>
    <VLayout class="layout-wrapper layout-nav-type-vertical">
      <RouterView />
      <!-- <BuyNow /> -->
    </VLayout>
  </VApp>
</template>
