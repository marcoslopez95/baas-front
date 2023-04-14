<script lang="ts" setup>
import { authStore } from '@/stores/AuthStore'

const auth = authStore()
const langs = [
  'es','en'
]
</script>


<template>
     <v-menu location="bottom">
      <template v-slot:activator="{ props }">
        <VBtnSecondary
          v-bind="props"
        >
          Lang({{ auth.lang }})
        </VBtnSecondary>
      </template>

      <v-list>
        <v-list-item
      
          v-for="(item, index) in langs"
          :key="index"
        >
          <v-list-item-title   style="cursor:pointer" @click="auth.changeLang(item)">{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
</template>