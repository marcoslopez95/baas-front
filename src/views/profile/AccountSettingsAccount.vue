<script lang="ts" setup>
import avatar1 from '@/assets/images/avatars/avatar-1.png';
import { authStore } from '@/stores/AuthStore';
import { required } from '@/validator';
import { configStore } from '@/stores/configsStore';
const formUpdateProfile = ref<any>()

const store = authStore()
const config = configStore()
const statusKyc = computed(() => {
  return store.statusKyc
}
)
const validator = { required }

const country_id = ref<number>()
const formUser = ref({
  name: store.user.name,
  email: store.user.email,
  birthdate: store.user.profile?.birthdate,
  city: store.user.profile?.city,
  address: store.user.profile?.address,
  country_id: null,

})
const accountData = {
  avatarImg: avatar1,
  firstName: 'john',
  lastName: 'Doe',
  email: 'johnDoe@example.com',
  org: 'ThemeSelection',
  phone: '+1 (917) 543-9876',
  address: '123 Main St, New York, NY 10001',
  state: 'New York',
  zip: '10001',
  country: 'USA',
  language: 'English',
  timezone: '(GMT-11:00) International Date Line West',
  currency: 'USD',
}

const refInputEl = ref<HTMLElement>()

const accountDataLocal = ref(structuredClone(accountData))
const isAccountDeactivated = ref(false)

const validateAccountDeactivation = [(v: string) => !!v || 'Please confirm account deactivation']

const resetForm = () => {
  accountDataLocal.value = structuredClone(accountData)
}

// changeAvatar function
const changeAvatar = (file: Event) => {
  const fileReader = new FileReader()
  const { files } = file.target as HTMLInputElement

  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string')
        accountDataLocal.value.avatarImg = fileReader.result
    }
  }
}

// reset avatar image
const resetAvatar = () => {
  accountDataLocal.value.avatarImg = accountData.avatarImg
}

const updateProfile = async() => {
  const { valid } = await formUpdateProfile.value.validate()

  if (!valid) return
  console.log('pasa')
  store.updateProfile(formUser.value)
}

config.getCountries()

</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Account Details">
        <VCardText class="d-flex">
          <!-- 👉 Avatar -->
          <VAvatar rounded="lg" size="100" class="me-6" :image="accountDataLocal.avatarImg" />

          <!-- 👉 Upload Photo -->
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
          </form>
        </VCardText>

        <VDivider />

        <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6" ref="formUpdateProfile" @submit.prevent="updateProfile">
            <VRow>
              <!-- 👉 First Name -->
              <VCol md="6" cols="12">
                <VTextField readonly v-model="formUser.name" label="Name" />
              </VCol>
              <!-- 👉 Email -->
              <VCol cols="12" md="6">
                <VTextField readonly v-model="formUser.email" label="E-mail" type="email" />
              </VCol>
              <!-- 👉 Phone -->
              <VCol cols="12" md="6">
                <VTextField readonly :rules="[validator.required]" append-inner-icon="mdi-calendar" v-model="formUser.birthdate"
                  label="Birthdate" />
              </VCol>
              <!-- 👉 Country -->
              <VCol cols="12" md="6">
                <VSelect item-title="name" item-value="id" :rules="[validator.required]" :items="config.countries"
                  v-model="formUser.country_id" :label="$t('views.countries.singular')" />
              </VCol>
              <!-- 👉 City -->
              <VCol cols="12" md="6">
                <VTextField :rules="[validator.required]" v-model="formUser.city" label="City" />
              </VCol>
              <!-- 👉 Address -->
              <VCol cols="12" md="12">
                <VTextField :rules="[validator.required]" v-model="formUser.address" label="Address" />
              </VCol>

              <!-- 👉 Form Actions -->
                <VCol cols="12" class="d-flex flex-wrap gap-4">
                  <VBtn type="submit" min-width="100px">Save changes</VBtn>
                </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <VCard :title="$t('views.profile.verifity-identity')">
        <VCardText v-if="!statusKyc || statusKyc == 'RECHAZADO'">
          <VAlert :color="statusKyc == 'RECHAZADO' ? 'error' : 'warning'" variant="tonal" class="mb-4">
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
          <VAlert :color="statusKyc == 'ACEPTADO' ? 'success' : 'warning'" variant="tonal" class="mb-4">
            <VAlertTitle class="mb-1">
              {{ statusKyc == 'ACEPTADO' ? $t('views.profile.ok-kyc') : $t('views.profile.wait-kyc') }}
            </VAlertTitle>
          </VAlert>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
