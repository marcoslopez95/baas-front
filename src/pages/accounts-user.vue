<script setup lang="ts">
import { accountUserStore } from '@/stores/AccountUserStore';
import cardAccount from '@/views/pages/accounts-user/card-account.vue';
import { helperStore } from '@/helper';

const helper = helperStore()

const { url, baseUrl } = storeToRefs(helper)
baseUrl.value = import.meta.env.VITE_API_URL

const store = accountUserStore()

store.getAccounts()
</script>

<template>
  <div>

    <cardAccount />
  </div>
</template>
