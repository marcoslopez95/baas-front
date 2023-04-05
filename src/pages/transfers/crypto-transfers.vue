<script lang="ts" setup>
import { helperStore } from '@/helper';
import { transfersStore } from '@/stores/TransfersStore';
import dayjs from 'dayjs';
import { useI18n } from 'vue-i18n';
import TableComponent from '@/views/global/TableComponent.vue';

import { useRouter } from 'vue-router';
import { Head } from '@/Types';

const router = useRouter();
const redirectCreate = () => { router.push('create/crypto') }
const { t } = useI18n()
const helper = helperStore()

const { url, baseUrl } = storeToRefs(helper)
baseUrl.value = import.meta.env.VITE_RECHEARBLE_API
url.value = '/api/clients/crypto-transfers'

const transfer = transfersStore()
transfer.indexCrypto()

const { item } = storeToRefs(helper)
const headers: Head[] = [
  {
    name: t('commons.id'),
    value: 'id',
  },
  {
    name: t('views.transfers.own.header.transaction-number'),
    value: 'transactionNumber',
  },
  {
    name: t('views.transfers.own.header.amount'),
    value: 'amount',
  },
  {
    name: t('views.transfers.own.header.account-origin'),
    value: 'origin.accountNumber',
  },
  {
    name: t('views.transfers.own.header.account-destination'),
    value: 'destination.accountNumber',
  },
  {
    name: t('views.transfers.own.header.operation-status'),
    value: 'operationStatus.name',
  }
]
// const selectDeposit = (deposit: Deposit) => {
//   item.value = deposit;
//   showModal.value = true;
// }

</script>

<template>
  <VRow>
    <VCol cols="12" class="text-end">
      <VBtnPrimary @click="redirectCreate" min-width="100px">Create</VBtnPrimary>
    </VCol>
    <!-- fixed header -->
    <VCol cols="12">
      <VCard title="Transferencias otros" :loading="transfer.loadingList">
        <VCardText>
          <TableComponent :optionsHabilit="true" :iconShow="true" :items="helper.items" :headers="headers">
            <template #cel-amount="{ data }">
              <span>{{ Intl.NumberFormat(["ban", "id"]).format(data.amount) }}</span>

            </template>
          </TableComponent>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style>
.text-pending {
  color: #f37f0b
}

.text-verified {
  color: #410bf3
}

.text-success {
  color: #138104
}

.text-blocked {
  color: #b60000
}
</style>
