<script lang="ts" setup>
import DialogBase from '@/views/global/Dialog.vue'
import { Deposit } from '@/Types';
import dayjs from 'dayjs';
import db from '@/db';

const dialog = ref(false)
const props = defineProps<Props>()

const { item, showDetail } = toRefs(props)

interface Props {
    item: Deposit,
    showDetail: Boolean,
}
const statusText = ((text: string | boolean) => {
    let status: string = ''
    console.log(text)
    switch (text) {
        case true:
            status = "Active"
            break;
        case false:
            status = "Inactive"
            break;
        case "EN VERIFICACION":
            status = "Verification"
            break;
        case "EN ESPERA DE COMPROBANTE":
            status = "Awaiting"
            break;
        case "ACEPTADO":
            status = "Accept"
            break;
        case "RECHAZADO":
            status = "Reject"
            break;

        default:
            break;
    }
    return status
})

</script>

<template>
    <DialogBase :dialog="showDetail" :widthDialog="'1000px'" @close="$emit('showDetail', false)">
        <template #title>
            {{ $t('commons.Details') }}
        </template>
        <template #content>
            <VRow>
                <VCol cols="12" md="6" class="rounded-lg border" >

                    <VRow>
                      
                        <VCol cols="12">
                            <h3>{{ $t('views.deposits.origin') }}</h3>
                            <p>{{ $t('views.deposits.account_holder') }}: {{ item?.origin.accountHolder }}</p>
                            <p>{{ $t('views.deposits.account_number') }}: {{ item?.origin.accountNumber }}</p>
                            <p>{{ $t('views.deposits.address') }}: {{ item?.origin.address }}</p>
                            <p>{{ $t('views.deposits.bank') }}: {{ item?.origin.bank }}</p>
                            <p>{{ $t('views.deposits.swift_code') }}: {{ item?.origin.swiftCode }}</p>
                        </VCol>
                        <VCol cols="12">
                            <h3>{{ $t('views.deposits.destiny') }}</h3>
                            <p>{{ $t('views.deposits.account_number') }}: {{ item?.destination.accountNumber }}</p>
                            <p>Moneda: {{ item?.destination?.currency?.name }}</p>
                            <p>Tipo de moneda: {{ item?.destination?.currency?.category?.name }}</p>
                        </VCol>
                       
                    </VRow>
                </VCol>
                <VCol cols="12" md="6"  class="rounded-lg border" >
                    <VRow>

                    <VCol cols="12">
                            <h3>{{ $t('views.deposits.deposit-data') }}</h3>
                            <p>{{ $t('views.deposits.date') }}: {{ dayjs(item?.createdAt).format('DD/MM/YYYY H:m') }}</p>
                            <p>Transaction: {{ item?.transactionNumber }}</p>
                            <p>Monto: {{ Intl.NumberFormat(["ban", "id"]).format(item?.amount) }}</p>
                            <p>{{ $t('views.operation-categories.singular') }}: {{ item?.operationCategory.name }}</p>
                            <p>{{ $t('views.operation-status.singular') }}:
                            <VChip  small
                                :color="db.statusColor[statusText(item?.operationStatus.name)]" class="font-weight-medium">
                                {{ db.status[statusText(item?.operationStatus.name)] }}
                            </VChip>
                        </p>
                        </VCol>
                    <VCol cols="12" class=" text-center" v-if="item.voucher">
                        <h3>Voucher</h3>

                    <img  class="rounded-lg" style="max-width: 200px;" :src="item.voucher.url" alt="" srcset="">
                    
                </VCol>

                </VRow>

                </VCol>
            </VRow>

        </template>
    </DialogBase>
</template>