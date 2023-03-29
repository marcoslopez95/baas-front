<script setup  lang="ts">
import { getComputedNavLinkToProp } from '@layouts/utils'

const props = defineProps({
  item: {
    type: null,
    required: true,
  },
})
</script>

<template>
  <VListItem class="nav-list-item" :prepend-icon="item.icon.icon" :title="item.title" :to="item.to"> 
  </VListItem>
</template>

<style lang="scss">
.layout-vertical-nav {
  .nav-list-item a {
    display: flex;
    align-items: center;
  }
}
</style>
