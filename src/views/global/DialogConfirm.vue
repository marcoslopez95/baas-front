<template>
      <DialogBase :dialog="dialog" :widthDialog="widthDialog" @close="$emit('close')">
        <template #title>{{ title }}</template>
        <template #content>
            {{ content }}
        </template>
        <template #actions>
          <VRow class="mx-auto text-center justify-center">
              <VBtn @click="$emit('close')" min-width="100px" variant="tonal">{{ btnCancelText }}</VBtn>
              <VBtn @click="$emit('ok')" min-width="100px"  variant="flat">{{ btnAcceptText }}</VBtn>
          </VRow>
        </template>
  
      </DialogBase>
  </template>
  
  <script setup lang="ts">
  import DialogBase from '@/views/global/Dialog.vue'
  const props = defineProps({
    dialog: {
        type: Boolean,
        default: false,
    },
    fullscreen: {
        type: Boolean,
        default: false,
    },
    widthDialog: {
        type: String,
        default: "400px",
    },
    title: {
        type: String,
        default: "",
    },
    content: {
        type: String,
        default: "",
    },
    btnCancelText: {
        type: String,
        default: "Cancel",
    },
    btnAcceptText: {
        type: String,
        default: "Accept",
    },
});

  </script>
  