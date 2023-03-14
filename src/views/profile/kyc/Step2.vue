<script lang="ts" setup>
import { helperStore } from '@/helper';
import { authStore } from '@/stores/AuthStore';
import { useRoute } from 'vue-router';

const emit = defineEmits(['stepValue', 'send'])
const props = defineProps({
    formData: {
        type: Object,
        required: true,
    },
    loading:{
        type: Boolean,
        default: false
    }
})
const route = useRoute()
const store = authStore()
const helper = helperStore()
const formStep2 = ref<any>()
const refFile = ref<any>()
const refFileBack = ref<any>()
const refFileSelfie = ref<any>()
const loadingBtn =  ref(props.loading)
const form = ref(props.formData)

const imgFront = form.value.front_document ? ref(URL.createObjectURL(form.value.front_document)) : ref('')
const imgBack = form.value.reverse_document ? ref(URL.createObjectURL(form.value.reverse_document)) : ref('')
const imgSelfie = form.value.selfie ? ref(URL.createObjectURL(form.value.selfie)) : ref('')

const uploadFile = (e: any, type: string) => {
    let acceptTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if (acceptTypes.includes(e.target.files[0].type)) {
        switch (type) {
            case 'front':
                form.value.front_document = e.target.files[0]
                console.log(URL.createObjectURL(e.target.files[0]))
                imgFront.value = URL.createObjectURL(e.target.files[0])
                break
            case 'back':
                form.value.reverse_document = e.target.files[0]
                imgBack.value = URL.createObjectURL(e.target.files[0])
                break
            case 'selfie':
                form.value.selfie = e.target.files[0]
                imgSelfie.value = URL.createObjectURL(e.target.files[0])
                break
            default:
                break
        }
    } else helper.showNotify('Invalid format', { type: 'warning' })
}
const sendData = () => {
    console.log('send')
    emit('send')
}
</script>

<template>
    <VForm @submit.prevent="sendData" ref="formStep2">
        <VRow>
            <VCol cols="12" md="4" class="text-center">
                <VCard min-height="220px">
                    <VCardText>
                        <p class="font-weight-semibold text-lg">Front</p>
                        <div v-if="!imgFront" class="px-16 text-center">
                            <VAlert color="warning" variant="tonal"
                                title="Cargue una foto de su documento de identidad frontal" class="text-center"></VAlert>
                        </div>
                        <VImg v-else :src="imgFront" class="mx-auto" style="width: 200px !important"></VImg>

                        <input ref="refFile" type="file" accept="image/png, image/jpeg, image/jpg" name="file" hidden
                            @input="uploadFile($event, 'front')" />

                        <VBtn variant="tonal" class="mt-4" @click="refFile?.click()" prepend-icon="mdi-upload-outline">
                            {{ imgFront ? 'Change' : 'Upload' }}
                        </VBtn>
                    </VCardText>
                </VCard>
            </VCol>
            <VCol cols="12" md="4" class="text-center">
                <VCard min-height="220px">
                    <VCardText>
                        <p class="font-weight-semibold text-lg">Reverso</p>
                        <div v-if="!imgBack" class="px-16">
                            <VAlert color="warning" variant="tonal"
                                title="Cargue una foto de su documento de identidad reverso" class="text-center"></VAlert>
                        </div>
                        <VImg v-else :src="imgBack" class="mx-auto" style="width: 200px !important"></VImg>

                        <input ref="refFileBack" type="file" name="file" hidden accept="image/png, image/jpeg, image/jpg"
                            @input="uploadFile($event, 'back')" />

                        <VBtn class="mt-4" variant="tonal" @click="refFileBack?.click()" prepend-icon="mdi-upload-outline">
                            {{ imgBack ? 'Change' : 'Upload' }}
                        </VBtn>
                    </VCardText>
                </VCard>
            </VCol>
            <VCol cols="12" md="4" class="text-center">
                <VCard min-height="220px">
                    <VCardText>
                        <p class="font-weight-semibold text-lg">Selfie</p>
                        <div v-if="!imgSelfie" class="px-16">
                            <VAlert color="warning" variant="tonal" title="Cargue una selfie" class="text-center"></VAlert>
                        </div>

                        <VImg v-else :src="imgSelfie" class="mx-auto" style="width: 200px !important"></VImg>

                        <input ref="refFileSelfie" type="file" name="file" accept="image/png, image/jpeg, image/jpg" hidden
                            @input="uploadFile($event, 'selfie')" />

                        <VBtn class="mt-4" variant="tonal" @click="refFileSelfie?.click()"
                            prepend-icon="mdi-upload-outline">
                            {{ imgSelfie ? 'Change' : 'Upload' }}
                        </VBtn>
                    </VCardText>
                </VCard>
            </VCol>
        </VRow>
    </VForm>
    <div class="mt-4 text-end">
        <VBtn class="mr-2" min-width="150px" variant="tonal" @click="$emit('stepValue', 1)">Back</VBtn>
        <VBtn @click="sendData" :loading="store.loading" :disabled="!form.front_document || !form.reverse_document || !form.selfie" min-width="150px">Send</VBtn>
    </div>
</template>
