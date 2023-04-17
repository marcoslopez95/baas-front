<template>
  <div>
    <VBtn @click="account.openModal = true">Create</VBtn>
    <DialogBase
      :dialog="account.openModal"
      :widthDialog="'400px'"
      @close="account.openModal = false"
    >
      <template #title><span>Create Account</span></template>
      <template #content>
        <VForm
          ref="formCreateAccount"
          @submit.prevent="createStore()"
        >
          <VSelect
            v-model="account.currency_id"
            :rules="[validator.required]"
            :items="account.currencies"
            item-title="nameCategory"
            item-value="id"
            label="Currency"
          >
          </VSelect>
        </VForm>
      </template>
      <template #actions>
        <VRow class="mx-auto text-center justify-center">
          <VBtn
            @click="createStore()"
            variant="flat"
            >Store</VBtn
          >
        </VRow>
      </template>
    </DialogBase>
  </div>
</template>

<script setup lang="ts">
import { accountUserStore } from '@/stores/AccountUserStore';
import { required } from '@/validator';
import DialogBase from '@/views/global/Dialog.vue';
import { Ref } from 'vue';
const validator = { required }
const loadingO = inject('loading') as Ref<boolean>
const account = accountUserStore()
account.getCurrencies()
const formCreateAccount = ref<any>()

const createStore = async () => {
  const { valid } = await formCreateAccount.value.validate()
  console.log(valid, account.currency_id)
  if (!valid) return
  loadingO.value = true
  console.log('true')
  await account.createAccount(account.currency_id)
  console.log('false')
  loadingO.value = false
}
</script>

<VCol></VCol>
