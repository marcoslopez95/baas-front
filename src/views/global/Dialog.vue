<script lang="ts" setup>
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
        default: "800px",
    },
});
</script>
<template>
    <div class="text-center">
        <VDialog v-model="dialog" persistent close-delay open-delay :fullscreen="fullscreen"
            :width="fullscreen ? '' : widthDialog">
            <VCard>
                <VCardTitle class="mb-0 d-flex justify-space-between ">
                    <h3>
                        <slot name="title"></slot>
                    </h3>
                    <VIcon @click="$emit('close')" icon="mdi-close-outline" size="24" />
                </VCardTitle>
                <VCardSubtitle class="text-uppercase">
                    <span >
                        <slot name="subtitle"></slot>
                    </span>
                </VCardSubtitle>

                <VCardText class="mb-0">
                    <slot name="content"></slot>
                </VCardText>
                <VCardActions class="py-8">
                    <slot name="actions"></slot>

                </VCardActions>
            </VCard>
        </VDialog>
    </div>
</template>
 