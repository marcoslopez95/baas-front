<script setup  lang="ts">
import { getComputedNavLinkToProp } from '@layouts/utils'
import { VerticalListItem } from '@layouts'

const props = defineProps({
  item: {
    type: null,
    required: true,
  },
})
</script>

<template>
  <VListGroup :value="item.title">
    <template v-slot:activator="{ props }">
      <VListItem class="nav-list-item-group"  :prepend-icon="item.icon.icon" v-bind="props" :title="item.title"></VListItem>
    </template>
    <div v-for="(chil, i) in item.children" :key="i" >
    <VerticalListItem v-if="chil.permission ? isPermitted(chil.permission) :true"  :item="chil"></VerticalListItem>
    </div>
  </VListGroup>
</template>

<style lang="scss">
.layout-vertical-nav {
  .nav-list-item a {
    display: flex;
    align-items: center;
  }
}
</style>
