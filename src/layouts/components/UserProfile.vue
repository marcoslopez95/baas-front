<script setup lang="ts">
import avatar1 from '@/assets/images/avatars/avatar-1.png';
import { authStore } from '@/stores/AuthStore';
import type { Anchor } from 'vuetify/lib/components';

const avatarBadgeProps = {
  dot: true,
  location: 'bottom right' as Anchor,
  offsetX: 3,
  offsetY: 3,
  color: 'success',
  bordered: true,
}

const auth = authStore()
const rolUser = computed(() => { if (auth.user?.roles) return auth.user?.roles[0].name })
console.log(auth.user)
</script>

<template>
  <VBadge v-bind="avatarBadgeProps">
    <VAvatar style="cursor: pointer;" color="primary" variant="tonal">
      <!-- <VImg :src="avatar1" /> -->
      <VIcon>mdi-user</VIcon>


      <!-- SECTION Menu -->
      <VMenu activator="parent" width="230" location="bottom end" offset="14px">
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge v-bind="avatarBadgeProps">
                  <VAvatar color="primary" size="40" variant="tonal">
                    <!-- <VImg :src="avatar1" /> -->
                    <VIcon>mdi-user</VIcon>
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              {{ auth.user.name }}
            </VListItemTitle>
            <VListItemSubtitle class="text-disabled">
              {{ rolUser }}

            </VListItemSubtitle>
          </VListItem>

          <VDivider class="my-2" />

          <!-- 👉 Profile -->
          <VListItem link :to="{ name: 'profile' }">
            <template #prepend>
              <VIcon class="me-2" icon="mdi-account-outline" size="22" />
            </template>

            <VListItemTitle>Profile</VListItemTitle>
          </VListItem>


          <!-- Divider -->
          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem @click="auth.logout">
            <template #prepend>
              <VIcon class="me-2" icon="mdi-logout-variant" size="22" />
            </template>

            <VListItemTitle>Logout</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
