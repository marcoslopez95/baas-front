
  
  <script setup lang="ts">
  import { accountUserStore } from '@/stores/AccountUserStore';
  import { required } from '@/validator';
  import DialogBase from '@/views/global/Dialog.vue'
  const validator = { required }
  
  const account = accountUserStore()
  account.getCurrencies()
  const formCreateAccount = ref<any>()
  const form = ref({code:null})
  
  const createStore = async () => {
    const { valid } = await formCreateAccount.value.validate()
    console.log(valid, account.currency_id)
    if (!valid) return
    account.createAccount(account.currency_id)
  }
  
  </script>
  <template>
      <DialogBase :dialog="account.openModal" :widthDialog="'400px'" @close="account.openModal = false">
        <template #title><span>Change email</span></template>
        <template #content>
          <VForm ref="formCreateAccount" @submit.prevent="createStore()">
            <VAlert :title="'Ingresa el codigo que fue enviado a tu correo electronico para su confirmacion'"></VAlert>
            
            <VTextField  v-model="form.code" label="Name" />

          </VForm>
        </template>
        <template #actions>
          <VRow class="mx-auto text-center justify-center">
              <VBtn @click="createStore()" variant="flat">Store</VBtn>
          </VRow>
        </template>
  
      </DialogBase>
  </template>

  