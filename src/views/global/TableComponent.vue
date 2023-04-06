<script lang="ts" setup >
import db from '@/db';
import { helperStore } from '@/helper';
const helper = helperStore()
const props = defineProps<Props>()

const {headers} = toRefs(props)

if(!headers.value.find(item => item.value === 'actions') && props.optionsHabilit){
  headers.value.push({
    name: 'actions',
    value: 'actions'
  })
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


const getValue = (item: any, value: string) => {
    let valueArray = value.split('.')
    let res = item;

    valueArray.forEach((pos: string) => {
        res = res[pos]
    })
    return res
}

const setNameHead = (head: string) => head.toLocaleLowerCase().replace(' ', '-')

/**
 * Interfaces
 */
 interface Headers {
    name: string,
    value: string,
}

interface Props {
    optionsHabilit: boolean
    headers: Headers[]
    items: any[]
    iconShow?: boolean
    iconUpdate?: boolean,
    iconDelete?: boolean,
    iconVoucher?: boolean,
    fixedHeader?: boolean,
    heightTable?: string
}
</script>

<template>
    <VTable :fixed-header="fixedHeader" :height="fixedHeader ? heightTable : ''" hide-default-footer disable-sort>
        <thead>
            <tr>
                <!-- <th class="text-uppercase" v-for="(item, i) in headers" :key="i">
                    {{ item }}
                </th> -->
                <slot v-for="head, i in headers" :name="setNameHead(head.value)">
                    <th class="text-center text-uppercase ">
                        {{ head.name }}
                    </th>
                </slot>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, i) in items" :key="i">
                <td v-for="(head, j) in headers" :key="j" class="text-center">
                  <slot :name="`cel-${head.value}`" :data="item" >
                  <!-- 54 6f 64 6f 20 65 73 74 6f 20 6c 6f 20 68 61 67 6f 20 70 6f 72 20 65 6c 6c 61 20 3c 33 -->
                  <VChip v-if="head.value == 'operationStatus.name'" small :color="db.statusColor[statusText(getValue(item, head.value))]" class="font-weight-medium">
                          {{ db.status[statusText(getValue(item, head.value))] }}
                      </VChip>
                      
                      <div v-else-if="optionsHabilit && head.value =='actions'" class="d-flex" style="gap: 8px">
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
                      </div>
                      <span v-else>{{ getValue(item, head.value) }}</span>

                  </slot>
                </td>
            </tr>
        </tbody>
    </VTable>
    <VRow class="mt-2 px-5 py-2">
        <VCol>
            <VRow>
                <VCol cols="4">
                    <VSelect v-model="helper.pagination.perPage" :items="helper.perPage" label="Pagination"
                        @update:modelValue="helper.index()">
                    </VSelect>
                </VCol>
            </VRow>
        </VCol>
        <VCol>
            <VPagination :total-visible="3" v-model="helper.pagination.currentPage" :length="helper.pagination.total"
                @update:model-value="helper.index"></VPagination>
        </VCol>
        <VCol></VCol>
    </VRow>
</template>
