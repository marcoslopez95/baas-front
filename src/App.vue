<script setup lang="ts">
import { authStore } from './stores/AuthStore';
import { helperStore } from '@/helper';

const helper = helperStore()
console.log('helper',helper.isAutenticated())

const auth = authStore()
if(helper.isAutenticated())
auth.getUser()
if(auth.user.name == ''){
  auth.setUser()
}


localStorage.setItem('primary','#8c1c7f')
localStorage.setItem('secondary','#8c1c7f')
</script>

<template>
  <VApp>
    <VLayout class="layout-wrapper layout-nav-type-vertical">
      <RouterView />
      <!-- <BuyNow /> -->
    </VLayout>
  </VApp>
</template>
