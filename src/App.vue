<script setup lang="ts">
import { helperStore } from '@/helper';
import { authStore } from './stores/AuthStore';

const helper = helperStore()
console.log('helper',helper.isAutenticated())

// const loadingO = ref(false)
// provide('loading',loadingO)

const auth = authStore()
if(helper.isAutenticated())
auth.getUser()
if(auth.user.name == ''){
  auth.setUser()
  auth.setSetting()
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
    <v-overlay v-model="helper.loading" class="overl">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </VApp>
</template>
<style>

.overl {
  justify-content: center;
  top: 50%;
}
</style>
