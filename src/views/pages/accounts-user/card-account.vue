<script lang="ts" setup>
import avatar1 from '@/assets/images/avatars/avatar-1.png';
import avatar4 from '@/assets/images/avatars/avatar-4.png';
import avatar8 from '@/assets/images/avatars/avatar-8.png';
import { accountUserStore } from '@/stores/AccountUserStore';

const store = accountUserStore()
const solidCardData = [
  {
    cardBg: '#16B1FF',
    title: 'Twitter Card',
    icon: 'mdi-twitter',
    text: '"Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."',
    avatarImg: avatar4,
    avatarName: 'Mary Vaughn',
    likes: '1.2k',
    share: '80',
  },
  {
    cardBg: '#3B5998',
    title: 'Facebook Card',
    icon: 'mdi-facebook',
    text: 'You\'ve read about the importance of being courageous, rebellious and imaginative. These are all vital ingredients in an.',
    avatarImg: avatar1,
    avatarName: 'Eugene Clarke',
    likes: '3.2k',
    share: '49',
  },
  {
    cardBg: '#007BB6',
    title: 'Linkedin Card',
    icon: 'mdi-linkedin',
    text: 'With the Internet spreading like wildfire and reaching every part of our daily life, more and more traffic is directed.',
    avatarImg: avatar8,
    avatarName: 'Anne Burke1',
    likes: '1.2k',
    share: '80',
  },
  
]

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
    <VCol
      v-for="data in store.items"
      :key="data.id"
      cols="12"
      md="6"
      lg="4"
    >
      <VCard color="#ffffff" class="rounded-xl" @click="openModal(data)">
        <VCardItem>
          <!-- <template #prepend>
            <VIcon
              size="1.9rem"
              color="white"
              :icon="data.icon"
            />
          </template> -->
          <VCardTitle class="text-dark">
            {{ data.accountType.name }}
          </VCardTitle>
        </VCardItem>

        <VCardText class="text-dark">
          {{ data.balance }} {{ data.currency.abbreviation }}
        </VCardText>

        <VCardText class="d-flex justify-space-between align-center flex-wrap">
          
        </VCardText>
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
