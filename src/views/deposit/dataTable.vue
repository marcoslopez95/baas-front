<script lang="ts" setup>
import { helperStore } from '@/helper';
import { depositStore } from '@/stores/depositStore';
import { useI18n } from 'vue-i18n';
import UploadVoucher from './UploadVoucher.vue';
import { Head, Deposit } from '@/Types';
import TableComponent from '@/views/global/TableComponent.vue';
import DetailDeposit from './DetailDeposit.vue';

const { t } = useI18n()
const helper = helperStore()

const { url, baseUrl, pagination } = storeToRefs(helper)
pagination.value.currentPage = 1

baseUrl.value = import.meta.env.VITE_RECHEARBLE_API
url.value = '/api/clients/recharges'

const deposit = depositStore()
deposit.index()

const { showModal } = storeToRefs(deposit)
const { item } = storeToRefs(helper)
const depositItem = ref<Deposit>({})
const headers: Head[] = [
  {
    name: t('tables.headersDeposits.Id'),
    value: 'transactionNumber',
  },
  {
    name: t('tables.headersDeposits.Date'),
    value: 'createdAt',
  },
  {
    name: t('tables.headersDeposits.Account'),
    value: 'destination.accountNumber',
  },
  {
    name: t('tables.headersDeposits.Amount'),
    value: 'amount',
  },
  {
    name: t('tables.headersDeposits.Currency'),
    value: 'destination.currency.abbreviation',
  },
  {
    name: t('tables.headersDeposits.Status'),
    value: 'operationStatus.name',
  }
]
const selectDeposit = (deposit: Deposit) => {
  item.value = deposit;
  showModal.value = true;
}
const showDetail = ref(false)
const viewDeposit = (deposit: Deposit) => {
  console.log(deposit)
  depositItem.value = deposit
  showDetail.value = true;
}



</script>

<template>
   <TableComponent :optionsHabilit="true" @selectDeposit="selectDeposit($event)" :iconVoucher="true"  :iconShow="true" @show="viewDeposit($event)" :items="helper.items" :headers="headers">
    <template #cel-amount="{ data }">
      <span>{{ Intl.NumberFormat(["ban", "id"]).format(data.amount) }}</span>

    </template>
    <template #cel-createdAt="{ data }">
      <span>{{ data.createdAt.substr(0, 10) }}</span>

    </template>
  </TableComponent>
  <DetailDeposit :showDetail="showDetail" :item="depositItem"  @showDetail="showDetail = $event"/>
  <UploadVoucher v-if="showModal">
  </UploadVoucher>
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
