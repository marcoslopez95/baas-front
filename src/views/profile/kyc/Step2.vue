<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute()
</script>

<template>
  <div>
    <h1>step2</h1>

    <VBtn @click="$emit('stepValue', 1)">back</VBtn>

  </div>
</template>
