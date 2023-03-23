<script lang="ts" setup >
import db from '@/db'
const props = defineProps({
    optionsHabilit: {
        type: Boolean,
        default: true,
    },
    headers: {
        type: Array,
        default: null,
    },
    desserts: {
        type: Array,
        default: null,
    },
    iconShow: {
        type: Boolean,
        default: false,
    },
    iconUpdate: {
        type: Boolean,
        default: false,
    },
    iconDelete: {
        type: Boolean,
        default: false,
    },
    iconVoucher: {
        type: Boolean,
        default: false,
    },
    fixedHeader: {
        type: Boolean,
        default: false,
    },
    heightTable: {
        type: String,
        default: ''
    }
})
const statusText = ((text: String | Boolean) => {
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
    <VTable :fixed-header="fixedHeader" :height="fixedHeader ? heightTable : ''" hide-default-footer disable-sort>
        <thead>
            <tr>
                <th class="text-uppercase" v-for="(item, i) in headers" :key="i">
                    {{ item }}
                </th>
            </tr>
        </thead>
        <tbody>
            <!-- <pre>{{ desserts }}</pre> -->
            <tr v-for="(item, i) in desserts" :key="i">
                <td v-for="(text, j) in item.desserts" :key="j">
                    <VChip v-if="j == 'status'" small :color="db.statusColor[statusText(text)]" class="font-weight-medium">
                        {{ db.status[statusText(text)] }}
                    </VChip>

                    <span v-else>{{ text }}</span>
                </td>
                <td v-if="optionsHabilit">
                    <div class="d-flex" style="gap: 8px">



                        <VBtn v-if="iconShow" :title="'Show'" color="transparent" size="x-small" elevation="0" icon>
                            <VIcon @click="$emit('show', item)" size="24" icon="mdi-eye-outline" />
                        </VBtn>
                        <VBtn v-if="iconUpdate" :title="'Update'" color="transparent" size="x-small" elevation="0" icon>
                            <VIcon @click="$emit('update', item)" size="24" icon="mdi-pencil-outline" />
                        </VBtn>
                        <VBtn v-if="iconDelete" :title="'Delete'" color="transparent" size="x-small" elevation="0" icon>
                            <VIcon @click="$emit('delete', item.id)" size="24"
                                :icon="item.desserts.status ? 'mdi-delete' : 'mdi-delete-restore'" />
                        </VBtn>
                        <VBtn v-if="iconVoucher && item.desserts.status == 'EN ESPERA DE COMPROBANTE'" :title="'Upload voucher'" color="transparent" size="x-small" elevation="0"
                            icon>
                            <VIcon @click="$emit('selectDeposit', item)" size="24" :icon="'mdi-upload'" />
                        </VBtn>
                    </div>
                </td>
            </tr>
        </tbody>
    </VTable>
</template>
