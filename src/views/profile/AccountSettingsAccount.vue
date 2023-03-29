<script lang="ts" setup>
import { authStore } from '@/stores/AuthStore';
import { configStore } from '@/stores/configsStore';
import { required } from '@/validator';
import updateEmail from './update/updateEmail.vue';
import updatePhone from './update/updatePhone.vue';

const formUpdateProfile = ref<any>()

const store = authStore()
const config = configStore()
const statusKyc = computed(() => {
  return store.statusKyc
}
)
const validator = { required }
const dialogCode = ref<boolean>(false)
const country_id = ref<number>()
const formUser = ref({
  name: store.user.name,
  email: store.user.email,
  birthdate: store.user.profile?.birthdate,
  city: store.user.profile?.city,
  address: store.user.profile?.address,
  country_id: store.user.profile?.country?.id,

})
const phoneNumber = ref(`+${store.user.profile?.phoneNumber}`)

const refInputEl = ref<HTMLElement>()

const isAccountDeactivated = ref(false)

const updateProfile = async () => {
  const { valid } = await formUpdateProfile.value.validate()

  if (!valid) return
  console.log('pasa')
  store.updateProfile(formUser.value)
}
const validateUpdate = async () => {
  const { valid } = await formUpdateProfile.value.validate()

  if (!valid) return
  if (formUser.value.email == store.user.email)
    updateProfile()
  else dialogCode.value = true
}
config.getCountries()

</script>

<template>
  <VRow>
    <!-- VERIFICACION DE IDENTIDAD -->
    <VCol cols="12">
      <VCard>
        <VCardTitle class="d-flex">
          <VIcon size="30" color="primary" class="mr-4">mdi-account-card-details</VIcon>
          <span>{{ $t('views.profile.verifity-identity') }}</span> 
          </VCardTitle>
        <VDivider />
        <VCardText v-if="!statusKyc || statusKyc == 'RECHAZADO'">
          <VAlert :color="statusKyc == 'RECHAZADO' ? 'error' : 'warning'"
            :icon="statusKyc == 'RECHAZADO' ? 'mdi-cancel' : 'mdi-alert'" variant="tonal" class="mb-4">
            <VAlertTitle class="mb-1">
              {{ statusKyc == 'RECHAZADO' ? $t('views.profile.reject-kyc') : $t('views.profile.no-kyc')
              }}
            </VAlertTitle>
          </VAlert>
          <VBtn to="/kyc" color="primary" class="mt-3">
            {{ $t('views.profile.verify-identity') }}
          </VBtn>
        </VCardText>
        <VCardText v-else-if="statusKyc == 'ACEPTADO' || statusKyc == 'EN VERIFICACION'">
          <VAlert :icon="statusKyc == 'ACEPTADO' ? 'mdi-check' : 'mdi-clock-time-four-outline'"
            :color="statusKyc == 'ACEPTADO' ? 'success' : 'warning'" variant="tonal" class="mb-4">
            <VAlertTitle class="mb-1">
              {{ statusKyc == 'ACEPTADO' ? $t('views.profile.ok-kyc') : $t('views.profile.wait-kyc') }}
            </VAlertTitle>
          </VAlert>
        </VCardText>
      </VCard>
    </VCol>
    <VCol cols="12">
      <VCard>
        <VCardTitle class="d-flex">
          <!-- 👉 Avatar -->
          <!-- <VAvatar rounded="xl" class="mr-4" size="40" variant="tonal" color="primary"> -->
            <VIcon size="30"  color="primary" class="mr-4">mdi-user</VIcon>
          <!-- </VAvatar> -->
          <span>{{$t('views.profile.account-details')}}</span> 
          <!-- 👉 Upload Photo
          <form ref="refForm" class="d-flex flex-column justify-center gap-5">
            <div class="d-flex flex-wrap gap-2">
              <VBtn color="primary" @click="refInputEl?.click()">
                <VIcon icon="mdi-cloud-upload-outline" class="d-sm-none" />
                <span class="d-none d-sm-block">Upload new photo</span>
              </VBtn>

              <input ref="refInputEl" type="file" name="file" accept=".jpeg,.png,.jpg,GIF" hidden @input="changeAvatar">

              <VBtn type="reset" color="error" variant="tonal" @click="resetAvatar">
                <span class="d-none d-sm-block">Reset</span>
                <VIcon icon="mdi-refresh" class="d-sm-none" />
              </VBtn>
            </div>

            <p class="text-body-1 mb-0">
              Allowed JPG, GIF or PNG. Max size of 800K
            </p>
          </form> -->
        </VCardTitle>

        <VDivider />
        <!-- ACTUALIZAR PERFIL-->
        <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6" ref="formUpdateProfile" @submit.prevent="validateUpdate">
            <VRow>
              <!-- 👉 First Name -->
              <VCol md="6" cols="12">
                <VTextField readonly v-model="formUser.name" :label="$t('commons.name')" />
              </VCol>
              <!-- 👉 Email -->
              <VCol cols="12" md="6">
                <VTextField readonly v-model="formUser.email" :label="$t('commons.email')" type="email" />
              </VCol>
              <VCol cols="12" md="6">
                <VTextField readonly v-model="phoneNumber" :label="$t('commons.phone')" />
              </VCol>
              <!-- 👉 Phone -->
              <VCol cols="12" md="6">
                <VTextField readonly :rules="[validator.required]" append-inner-icon="mdi-calendar"
                  v-model="formUser.birthdate" :label="$t('views.profile.birthday')" />
              </VCol>
              <!-- 👉 Country -->
              <VCol cols="12" md="6">
                <VSelect item-title="name" item-value="id" :rules="[validator.required]" :items="config.countries"
                  v-model="formUser.country_id" :label="$t('views.countries.singular')" />
              </VCol>
              <!-- 👉 City -->
              <VCol cols="12" md="6">
                <VTextField :rules="[validator.required]" v-model="formUser.city" :label="$t('commons.city')" />
              </VCol>
              <!-- 👉 Address -->
              <VCol cols="12" md="6">
                <VTextField :rules="[validator.required]" v-model="formUser.address" :label="$t('commons.address')" />
              </VCol>

              <!-- 👉 Form Actions -->
              <VCol cols="12" class="d-flex flex-wrap gap-4">
                <VBtn type="submit" :loading="store.loadingProfile" min-width="100px">{{$t('commons.save-changes')}}</VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <updateEmail></updateEmail>
    <updatePhone></updatePhone>

  </VRow>
</template>
