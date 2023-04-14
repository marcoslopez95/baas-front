<script lang="ts" setup>
import { accountUserStore } from '@/stores/AccountUserStore';
import CreateAccount from './createAccount.vue';
import DialogConfirm from '@/views/global/DialogConfirm.vue';
import DialogBase from '@/views/global/Dialog.vue';
import { helperStore } from '@/helper';

const helper = helperStore()

const { url, baseUrl } = storeToRefs(helper)
baseUrl.value = import.meta.env.VITE_API_URL

const store = accountUserStore()
const dialog = ref(false)
const dialogDelete = ref(false)
const accountSelect = ref<any>()
const { item } = storeToRefs(store)
const openModal = (element: accountUserInterfaz) => {
  item.value = element
  dialog.value = true
}

const deleteAccount = (id: number) => {
  accountSelect.value = id
  dialogDelete.value = true
}
const deleteConfirm = () => {
  store.deleteAccount(accountSelect.value)
  dialogDelete.value = false

}
interface accountUserInterfaz {
  "id": number,
  "accountNumber": string,
  "balance": number,
  "transferAccountantBalance": number,
  "rechargeAccountantBalance": number,
  "createdAt": Date,
  "currency": currencyInterfaz,
  "accountType": accountTypeInterfaz
}


interface currencyInterfaz {
  "id": number,
  "name": string,
  "abbreviation": string,
  "symbol": string,
  "description": string,
  "createdAt"?: Date
}
interface accountTypeInterfaz {
  "id": number,
  "name": string,
  "description": string,
  "createdAt": Date,
  "updatedAt": Date
}
</script>

<template>
  <div>
    <VRow class="text-right">
      <VCol class="justify-end">
        <CreateAccount></CreateAccount>
      </VCol>
    </VRow>
    <VRow>
      <VCol v-for="data in store.items" :key="data.id" cols="12" md="6" lg="4">
        <VCard class="rounded-xl pa-4">
          <VCardTitle class="text-dark" @click="openModal(data)">
            {{ data.currency.name }} ({{ data.currency?.category?.name }})
          </VCardTitle>
          <VDivider></VDivider>

          <VCardText class="text-dark">
            <VRow>
              <VCol cols="10" md="9" lg="10">
                {{ data.accountNumber }}<br />
                {{ Intl.NumberFormat(["ban", "id"]).format(data.balance) }} {{ data.currency.abbreviation }} <br />
              </VCol>
              <VCol cols="2" md="3" lg="2" v>
                <VBtn class="" icon variant="tonal" color="primary" v-if="!(data.balance > 0)">
                  <VIcon size="20px" color="bg-primary" icon="mdi-delete" @click="deleteAccount(data.id)"></VIcon>
                </VBtn>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
      <DialogConfirm :title="'Eliminar cuenta'" :content="'¿Estas seguro de eliminar la cuenta?'" :dialog="dialogDelete"
        @close="dialogDelete = false" @cancel="dialogDelete = false" @ok="deleteConfirm" />

      <DialogBase v-if="dialog" :dialog="dialog" @close="dialog = false">
        <template #title> Datos de la cuenta {{ item?.accountNumber }}</template>
        <template #content>
          Monto recargado: {{ Intl.NumberFormat(["ban", "id"]).format(item?.rechargeAccountantBalance) }} {{
            item?.currency.abbreviation }}<br>
          Monto transferido: {{ Intl.NumberFormat(["ban", "id"]).format(item?.transferAccountantBalance) }} {{
            item?.currency.abbreviation }}
        </template>
      </DialogBase>
    </VRow>
  </div>
</template>
