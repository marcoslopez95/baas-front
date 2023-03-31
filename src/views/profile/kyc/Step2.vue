<script lang="ts" setup>
import { helperStore } from '@/helper';
import { authStore } from '@/stores/AuthStore';
import { configStore } from '@/stores/configsStore';
import { useRoute } from 'vue-router';

const emit = defineEmits(['stepValue', 'send'])
const props = defineProps({
    formData: {
        type: Object,
        required: true,
    },
    loading: {
        type: Boolean,
        default: false
    },
})

const route = useRoute()
const store = authStore()
const storeConfig = configStore()
const helper = helperStore()
const formStep2 = ref<any>()
const refFile = ref<any>()
const refFileBack = ref<any>()
const refFileSelfie = ref<any>()
const loadingBtn = ref(props.loading)
const form = ref(props.formData)
const document = storeConfig.documenType

const imgFront = form.value.front_document ? ref(URL.createObjectURL(form.value.front_document)) : ref('')
const imgBack = form.value.reverse_document ? ref(URL.createObjectURL(form.value.reverse_document)) : ref('')
const imgSelfie = form.value.selfie ? ref(URL.createObjectURL(form.value.selfie)) : ref('')

const uploadFile = (e: any, type: string) => {
    let acceptTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if (acceptTypes.includes(e.target.files[0].type)) {
        switch (type) {
            case 'front':
                form.value.front_document = e.target.files[0]
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
    emit('send')

    
}
</script>

<template>
    <div>
        <VForm @submit.prevent="sendData" ref="formStep2">
            <VRow>
                <VCol cols="12" md="4" class="text-center">
                    <VCard min-height="320px">
                        <VCardText class="d-flex flex-column gap-12">
                            <p class="font-weight-semibold text-lg">
                              {{document?.name != 'Passport' ? $t('views.kyc.image-front.title'): $t('views.kyc.image-front.title2')}}
                            </p>
                            <div v-if="!imgFront" class="px-md-16 text-center">
                                <VAlert color="warning" variant="tonal"
                                    :title="document?.name != 'Passport' ?$t('views.kyc.image-front.description') : $t('views.kyc.image-front.description2')" class="text-center">
                                </VAlert>
                            </div>
                            <VImg v-else :src="imgFront" class="mx-auto" style="width: 200px !important"></VImg>

                            <input ref="refFile" type="file" accept="image/png, image/jpeg, image/jpg" name="file" hidden
                                @input="uploadFile($event, 'front')" />

                            <VBtnSecondary  class="mt-4" @click="refFile?.click()" prepend-icon="mdi-upload-outline">
                                {{ imgFront ? $t('commons.change') : $t('commons.upload') }}
                            </VBtnSecondary>
                        </VCardText>
                    </VCard>
                </VCol>
                <VCol cols="12" md="4" class="text-center" v-if="document?.name != 'Passport'">
                    <VCard min-height="320px">
                        <VCardText class="d-flex flex-column  gap-12">
                            <p class="font-weight-semibold text-lg">  {{$t('views.kyc.image-back.title')}}</p>
                            <div v-if="!imgBack" class="px-md-16">
                                <VAlert color="warning" variant="tonal"
                                :title="$t('views.kyc.image-back.description')" class="text-center">

                            
                            </VAlert>
                            </div>
                            <VImg v-else :src="imgBack" class="mx-auto" style="width: 200px !important"></VImg>

                            <input ref="refFileBack" type="file" name="file" hidden
                                accept="image/png, image/jpeg, image/jpg" @input="uploadFile($event, 'back')" />

                            <VBtnSecondary class="mt-4"  @click="refFileBack?.click()"
                                prepend-icon="mdi-upload-outline">
                                {{ imgBack ? $t('commons.change') : $t('commons.upload') }}
                            </VBtnSecondary>
                        </VCardText>
                    </VCard>
                </VCol>
                <VCol cols="12" md="4" class="text-center">
                    <VCard min-height="320px">
                        <VCardText class="d-flex flex-column  gap-4">
                            <p class="font-weight-semibold text-lg">{{$t('views.kyc.image-selfie.title')}}</p>
                            <div v-if="!imgSelfie" class="px-md-16">
                                <VAlert color="warning" variant="tonal"  class="text-center">
                                   
                                        {{document?.name != 'Passport'? $t('views.kyc.image-selfie.description') : $t('views.kyc.image-selfie.description2') }}
                                   
                                    
                                </VAlert>
                                <VAlert color="warning" variant="tonal"  class=" mt-2 text-center">
                                  
                                        {{ $t('views.kyc.image-selfie.description2') }}
                                   
                                </VAlert>
                            </div>

                            <VImg v-else :src="imgSelfie" class="mx-auto" style="width: 200px !important"></VImg>

                            <input ref="refFileSelfie" type="file" name="file" accept="image/png, image/jpeg, image/jpg"
                                hidden @input="uploadFile($event, 'selfie')" />

                            <VBtnSecondary class="mt-4"  @click="refFileSelfie?.click()"
                                prepend-icon="mdi-upload-outline">
                                {{ imgSelfie  ? $t('commons.change') : $t('commons.upload') }}
                            </VBtnSecondary>
                        </VCardText>
                    </VCard>
                </VCol>
            </VRow>
        </VForm>
        <div class="mt-4 text-end">
            <VBtnSecondary class="mr-2" min-width="150px" @click="$emit('stepValue', 1)">{{$t('commons.back')}}</VBtnSecondary>
            <VBtnPrimary @click="sendData" :loading="store.loading"
                :disabled="!form.front_document || (document?.name != 'Passport' && !form.reverse_document) || !form.selfie"
                min-width="150px"> {{$t('comons.send')}} </VBtnPrimary>
        </div>
    </div>
</template>
