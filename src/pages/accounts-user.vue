<script setup lang="ts">
import { accountUserStore } from '@/stores/AccountUserStore';
import cardAccount from '@/views/pages/accounts-user/card-account.vue';
const store = accountUserStore()

store.getAccounts()
</script>

<template>
  <div>

    <cardAccount />
  </div>
</template>
