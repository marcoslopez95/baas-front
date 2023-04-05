<script lang="ts" setup>
import { helperStore } from '@/helper';
import { transfersStore } from '@/stores/TransfersStore';
import dayjs from 'dayjs';
import { useI18n } from 'vue-i18n';
import TableBasic from '@/views/global/Table.vue'
import CreateModal from '@/views/deposit/CreateModal.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const redirectCreate = () => {  router.push('create/own') }
const { t } = useI18n()
const helper = helperStore()

const { url, baseUrl } = storeToRefs(helper)
baseUrl.value = import.meta.env.VITE_RECHEARBLE_API
url.value = '/api/clients/crypto-transfers'

const transfer = transfersStore()
transfer.indexCrypto()

// const { showModal } = storeToRefs(transfer)
const { item } = storeToRefs(helper)
const headers = ref([
  t('tables.headersDeposits.Id'),
  t('tables.headersDeposits.Date'),
  'Cuenta origen',
  'Cuenta destino',
  t('tables.headersDeposits.Amount'),
  t('tables.headersDeposits.Currency'),
  t('tables.headersDeposits.Status'),
  t('tables.headersDeposits.Actions')

])
// const selectDeposit = (deposit: Deposit) => {
//   item.value = deposit;
//   showModal.value = true;
// }

const desserts = computed(() => {
  let array: Array<object> = []
  console.log(helper.items)
  if (helper.items)
    helper.items.map((res: Transfer) => array.push(
      {
        ...res, desserts: {
          id: res.transactionNumber,
           date: dayjs(res.createdAt).format('DD/MM/YYYY'),
            accountOrigin: res.origin?.accountNumber, 
            accountDestination: res.destination?.accountNumber, 
            amount:  Intl.NumberFormat(["ban", "id"]).format(res.amount),
             currency: res.origin?.currency?.abbreviation, 
             status: res.operationStatus?.name
        }
      }))
  return array
})

interface Transfer {
  id: number
  transactionNumber: string
  amount: string
  createdAt: Date
  origin: Account
  destination: Account
  operationStatus: OperationStatus
}


interface Account {
  id: number
  accountNumber: string
  balance: string
  transferAccountantBalance: string
  rechargeAccountantBalance: string
  createdAt: Date
  currency: Currency2
  accountType: AccountType
}
interface AccountType {
  id: number
  name: string
  description: string
  createdAt?: any
  updatedAt?: any
}
interface Currency2 {
  id: number
  name: string
  abbreviation: string
  symbol: string
  description: string
  createdAt?: any
}


interface OperationStatus {
  id: number
  name: string
  description: string
  createdAt?: any
  updatedAt?: any
}



</script>

<template>
    <VRow>

<VCol cols="12" class="text-end">
    <VBtnPrimary @click="redirectCreate" min-width="100px">Create</VBtnPrimary>

</VCol>
<!-- fixed header -->
<VCol cols="12">
  <VCard title="Transferencias propias" :loading="transfer.loadingList">
    <VCardText>
  <TableBasic  :iconShow="true" :headers="headers" :desserts="desserts" />
  <VRow class="mt-2 px-5 py-2">
    <VCol>
      <VRow>
        <VCol cols="4">
          <VSelect v-model="helper.pagination.perPage" :items="helper.perPage" label="Pagination"
            @update:modelValue="transfer.indexCrypto()">
          </VSelect>
        </VCol>
      </VRow>
    </VCol>
    <VCol>
      <VPagination v-model="helper.pagination.currentPage" :length="helper.pagination.total"
        @update:model-value="helper.index()"></VPagination>
    </VCol>
    <VCol></VCol>
  </VRow>
 
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
