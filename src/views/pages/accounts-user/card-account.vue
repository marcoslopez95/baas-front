<script lang="ts" setup>
import { accountUserStore } from '@/stores/AccountUserStore';
import CreateAccount from './createAccount.vue';
import DialogConfirm from '@/views/global/DialogConfirm.vue';
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
        <VCard color="#ffffff" class="rounded-xl pa-4">
          <VCardTitle class="text-dark" @click="openModal(data)">
            {{ data.accountType.name }}
          </VCardTitle>
          <VDivider></VDivider>

          <VCardText class="text-dark">
            <VRow>
              <VCol cols="10">
                {{ data.accountNumber }}<br />
                {{ data.balance }} {{ data.currency.abbreviation }} <br />
              </VCol>
              <VCol cols="2">
                <VBtn class="" icon variant="tonal" color="primary">
                  <VIcon size="20px" color="bg-primary" icon="mdi-delete" @click="deleteAccount(data.id)"></VIcon>
                </VBtn>
              </VCol>
            </VRow>
          </VCardText>


        </VCard>
      </VCol>
      <DialogConfirm :title="'Eliminar cuenta'" :content="'¿Estas seguro de eliminar la cuenta?'" :dialog="dialogDelete"
        @close="dialogDelete = false" @ok="deleteConfirm" />

      <v-dialog v-if="dialog" v-model="dialog" max-width="500px" class="" persistent>
        <v-card class="rounded-xl px-4 py-3">
          <v-card-title>
            Datos de la cuenta {{ item?.accountType.name }} {{ item?.currency.symbol }}
          </v-card-title>
          <v-card-text>
            Monto recargado: {{ item?.rechargeAccountantBalance }} <br>
            Monto transferido: {{ item?.transferAccountantBalance }} {{ item?.currency.symbol }}
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" variant="text" @click="dialog = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </VRow>
  </div>
</template>
