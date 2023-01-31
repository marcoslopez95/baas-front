<script lang="ts" setup>
import { helperStore } from '@/helper';
import { depositStore } from '@/stores/depositStore';
const deposit = depositStore()
deposit.getDeposits()
const helper = helperStore()
</script>

<template>
  <VTable
    height="250"
    fixed-header
  >
    <thead>
      <tr>
        <th class="text-uppercase">Transaction ID</th>
        <th class="text-center text-uppercase">Amount</th>
        <th class="text-center text-uppercase">Date</th>
        <th class="text-center text-uppercase">Currency</th>
        <th class="text-center text-uppercase">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, i) in helper.items"
        :key="i"
      >
        <td>{{ item.transactionNumber }}</td>
        <td class="text-center">
          {{ item.amount }}
        </td>
        <td class="text-center">
          {{ item.createdAt }}
        </td>
        <td class="text-center">
          {{ item.account.currency.symbol }}
        </td>
        <td class="text-center">
           -
        </td>
      </tr>
    </tbody>
  </VTable>
</template>
