<script lang="ts" setup>
import { accountUserStore } from '@/stores/AccountUserStore';
import CreateAccount from './createAccount.vue';

const store = accountUserStore()
const dialog = ref(false)

const {item} = storeToRefs(store)
const openModal = (element: accountUserInterfaz) => {
  item.value = element
  dialog.value = true
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

  
  interface currencyInterfaz{
    "id": number,
    "name": string,
    "abbreviation": string,
    "symbol": string,
    "description": string,
    "createdAt"?: Date
  }
  interface accountTypeInterfaz{
    "id": number,
    "name": string,
    "description": string,
    "createdAt": Date,
    "updatedAt": Date
  }
</script>

<template>
  <VRow>
  <VCol>
    <CreateAccount></CreateAccount>
  </VCol>
  </VRow>
  <VRow>
    <VCol
      v-for="data in store.items"
      :key="data.id"
      cols="12"
      md="6"
      lg="4"
    >
      <VCard color="#ffffff" class="rounded-xl">
        <VCardItem>
          <!-- <template #prepend>
            <VIcon
              size="1.9rem"
              color="white"
              :icon="data.icon"
            />
          </template> -->
          <VCardTitle class="text-dark"  @click="openModal(data)">
            {{ data.accountType.name }}
          </VCardTitle>
        </VCardItem>

        <VCardText class="text-dark">
          {{ data.accountNumber }}<br />
          {{ data.balance }} {{ data.currency.abbreviation }} <br />
        </VCardText>

        <VRow>
        <VCol cols="8"></VCol>
        <VCol>
          <!-- <VBtn class="" style="width: 22px; height: 22px;"> -->
          <VIcon
            size="20px"
            color="bg-primary"
            icon="mdi-delete"
            @click="store.deleteAccount(data.id)"
            ></VIcon>
          <!-- </VBtn> -->
        </VCol>
        </VRow>
      </VCard>
    </VCol>

    <v-dialog
        v-if="dialog"
        v-model="dialog"
        max-width="500px"
        class=""
      >
        <v-card
        class="rounded-xl px-4 py-3">
          <v-card-title>
            Datos de la cuenta {{ item?.accountType.name }} {{ item?.currency.symbol }}
          </v-card-title>
          <v-card-text>
           Monto recargado: {{ item?.rechargeAccountantBalance }} <br>
           Monto transferido: {{ item?.transferAccountantBalance }} {{ item?.currency.symbol }}
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              variant="text"
              @click="dialog = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </VRow>
</template>
