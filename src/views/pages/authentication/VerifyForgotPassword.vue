<script setup lang="ts">
import { authStore } from '@/stores/AuthStore';
import { required, email, password, confirmPassword } from '@/validator';

const props = defineProps({
  type: {
    type: String,
    default: 'Recover'
  }
})
const auth = authStore()
const formPasswordSecond = ref<any>()
const validator = { required, email, password, confirmPassword }
const form = ref({
  token: '',
  password: '',
  password_confirmation: '',
})
const passwordRequirements = [
  'Mínimo 8 caracteres',
  'Al menos un carácter en minúscula',
  'Al menos un carácter en mayúscula',
  'Al menos un número, símbolo',
]
const isPasswordVisible = ref(false)
const isPasswordVisible2 = ref(false)

const nextPassword = async () => {
  const { valid } = await formPasswordSecond.value.validate()
  console.log(valid)
  if (!valid) return
  auth.confirmForgotPassword(form.value, type)
}
</script>

<template>
  <VForm @submit.prevent="nextPassword" ref="formPasswordSecond">
    <VRow>
      <VCol cols="12" :md="type == 'Change' ? '6' : '12'">
        <VTextField v-model="form.token" label="Code" type="text" :rules="[validator.required]" />
      </VCol>
      <VCol cols="12" :md="type == 'Change' ? '6' : '12'">
        <VTextField :rules="[validator.required, validator.password]" v-model="form.password" label="Password"
          :type="isPasswordVisible2 ? 'text' : 'password'"
          :append-inner-icon="isPasswordVisible2 ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
          @click:append-inner="isPasswordVisible2 = !isPasswordVisible2" />
      </VCol>
      <VCol cols="12" :md="type == 'Change' ? '6' : '12'">
        <VTextField v-model="form.password_confirmation"
          :rules="[validator.required, validator.confirmPassword(form.password, form.password_confirmation)]"
          label="Confirm Password" :type="isPasswordVisible ? 'text' : 'password'"
          :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
          @click:append-inner="isPasswordVisible = !isPasswordVisible" />
      </VCol>

      <!-- 👉 Password Requirements -->
      <VCol cols="12">
        <p class="text-base font-weight-semibold mt-2">
          Password Requirements:
        </p>

        <ul class="d-flex flex-column gap-y-3">
          <li v-for="item in passwordRequirements" :key="item" class="d-flex">
            <div>
              <VIcon size="7" icon="mdi-circle" class="me-3" />
            </div>
            <span class="font-weight-medium">{{ item }}</span>
          </li>
        </ul>
      </VCol>
      <!-- password -->
      <VCol cols="12">
        <VBtn style="margin-top: 5px" :block="type != 'Change'" type="submit">
          Submit
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>

<style lang="scss">
@use '@core/scss/pages/page-auth.scss';
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
